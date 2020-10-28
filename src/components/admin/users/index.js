import React, {Component, createRef} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {cloneDeep} from 'lodash';

import moment from "moment";
import {sendNotification} from "../../../redux/actions/notifications";
import API from "../../../api/admin";
import {getUsers, getGroups} from "../../../redux/actions/admin";
import {Table, Switch, Button, Modal, notification, Select, Menu, Dropdown, Icon} from 'antd';
import {setAdmin, deleteUser} from "../../../api/admin";

const confirm = Modal.confirm;
const Option = Select.Option;

class UsersTable extends Component {

    state = {
        users: this.props.admin.usersList && this.props.admin.usersList.length && this.props.admin.usersList || [],
        visible: false,
        confirmLoading: false,
        selectedUser: {}
    };
    
    componentDidMount() {
        this.props.getUsers();
        this.props.getGroups();
    };
    
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.admin.usersList) !== JSON.stringify(nextProps.admin.usersList)) {
            this.setState({users: nextProps.admin.usersList});
        }
    };
    
    onChange = (row) => {
        let userId = row.id;
        let isAdmin = !row.isAdmin;
        API.setAdmin(userId, isAdmin)
            .then(() => {
                this.openNotification('info', 'User rights were changed', `The User rights were changed for user ${row.login}. The current status is ${isAdmin ?
                                                                                                                                                       'Admin' :
                                                                                                                                                       'Not Admin'}`, 5)
            })
            .catch(error => console.log(error));
        this.modifyRow(row, isAdmin);
    };
    
    modifyRow(row, isAdmin) {
        const newUsers = cloneDeep(this.state.users).map(user => {
            if (user.id === row.id) user.isAdmin = isAdmin;
            return user;
        });
        
        this.setState({users: newUsers});
    }
    
    modifyTableData(row) {
        const newUsers = cloneDeep(this.state.users).filter(user => user.id !== row.id);
        this.setState({users: newUsers});
    }

    modifyUserGroups(row, groups) {
        const newUsers = cloneDeep(this.state.users).map(user => {
            if (user.id === row.id) user.groups = groups;
            return user;
        });

        this.setState({users: newUsers});
    }

    deleteUser = (row) => {
        let userId = row.id;
        API.deleteUser(userId)
            .then(() => {
//                this.props.sendNotification({notificationMessage: `The User ${row.login} has been successfully deleted.`, time: 5000});
                this.openNotification('success', 'User has been deleted', `The User ${row.login} has been successfully deleted.`, 5)
            })
            .catch(error => console.log(error));
        this.modifyTableData(row);
    };
    
    openManageGroupsModal = (row) => {
        this.setState({
            visible: true,
            selectedUser: row,
            editingGroups: row.groups
        });
    };

    handleModalOk = () => {
        let currentUser = this.state.selectedUser;
        this.setState({
            confirmLoading: true,
        });
        API.updateUserGroups(this.state.editingGroups, currentUser.id)
            .then(() => {
                this.modifyUserGroups(this.state.selectedUser, this.state.editingGroups);
                this.openNotification('success', 'User"s groups were changed', `The User ${currentUser.login} has been successfully updated with the new group list.`, 5);
                this.setState({
                    visible: false,
                    confirmLoading: false,
                    selectedUser: {},
                    editingGroups: []
                });
                this.props.getGroups();
            })
            .catch(err => {
                this.openNotification('error', 'Error while changing the group', `Something went wront with user"s ${currentUser.login} groups.`, 3);
                this.setState({
                    visible: false,
                    confirmLoading: false,
                    selectedUser: {},
                    editingGroups: []
                });
            });
    };

    handleModalCancel = () => {
        this.setState({
            visible: false,
            selectedUser: {},
            editingGroups: []
        });
    };

    handleTagChange = value => {
        this.setState({editingGroups: value});
    };

    showDeleteConfirm = (row) => {
        const deleteUserFunc = this.deleteUser.bind(this, row);
        confirm({
            title: 'Are you sure want to delete this user?',
            content: `The user ${row.login} will be permanently deleted.`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteUserFunc();
            },
            onCancel() {},
        });
    };
    
    openNotification = (type, msg, description, time) => {
        notification.config({
            duration: time
        });
        notification[type]({
            message: msg,
            description: description,
        });
    };

    setCurrentUser = row => {
        this.setState({currentRow: row});
        console.log(row);
    };

    render() {
        let groups = this.props.admin.groupsList && this.props.admin.groupsList.length && this.props.admin.groupsList.map(item => <Option key={item}>{item}</Option>) || null;
        const dateFormat = "DD.MM.YYYY";
        const menu = (
            <Menu>
                <Menu.Item>
                    <a onClick={()=>this.openManageGroupsModal(this.state.currentRow)}>Manage groups</a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={()=>this.showDeleteConfirm(this.state.currentRow)}>Delete</a>
                </Menu.Item>
            </Menu>
        );
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                width: 50,
            }, {
                title: 'Login',
                dataIndex: 'login',
                width: 150,
            }, {
                title: 'Registration date',
                dataIndex: 'dateCreate',
                width: 200,
                render: (text, row) => <span>{moment(row.dateCreate).format(dateFormat)}</span>
            },
            {
                title: 'Last Activity',
                dataIndex: 'dateLastEnter',
                width: 250,
                render: (text, row) => <span>{moment(row.dateLastEnter).format("DD.MM.YYYY HH:mm:ss")}</span>
            },
            {
                title: 'Groups',
                dataIndex: 'groups',
                width: 250,
                render: item => item ? item.join(", ") : ""
            },
            {
                title: 'User Rights',
                dataIndex: 'isAdmin',
                width: 200,
                render: (text, row) => <div>Admin <Switch disabled={row.id === this.props.user.id} checked={row.isAdmin}
                                                          onChange={() => this.onChange(row)}/></div>
            },
            {
                title: '',
                dataIndex: '',
                key: 'menu',
                width: 70,
                render: (text, row) => <Dropdown overlay={menu} trigger={['click']}>
                                            <a className="ant-dropdown-link" href="#">
                                                <Icon type="ellipsis" className="vertical-ellipsis-icon" onClick={() => this.setCurrentUser(row)}/>
                                            </a>
                                        </Dropdown>
            },
        ];
        
        return (
            <div className="admin-users-table">
                <h1>Users</h1>
                <Table pagination={false}
                       columns={columns}
                       dataSource={this.state.users}
                       rowKey='id'
                />
                <Modal title={`Please select the group for user ${this.state.selectedUser.login}`}
                       visible={this.state.visible}
                       onOk={this.handleModalOk}
                       confirmLoading={this.state.confirmLoading}
                       onCancel={this.handleModalCancel}
                >
                    <Select
                        mode="tags"
                        style={{ width: '100%' }}
                        placeholder="Tags Mode"
                        onChange={this.handleTagChange}
                        value={this.state.editingGroups}
                    >
                        {groups}
                    </Select>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        admin: state.adminReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => dispatch(getUsers()),
        getGroups: () => dispatch(getGroups()),
        sendNotification: (data) => dispatch(sendNotification(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable)
