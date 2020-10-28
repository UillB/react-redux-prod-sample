import React, {Component} from "react";
import {connect} from "react-redux";

import {createVote, getVotes} from "../../../redux/actions/votes";
import {sendNotification} from "../../../redux/actions/notifications";
import { Button, Menu, Dropdown, Modal, Icon, notification } from 'antd';
import {cloneDeep, toArray, values} from 'lodash';
import moment from "moment";
import {Link} from "react-router-dom"
import API from "../../../api/admin";

const confirm = Modal.confirm;


class Vote extends Component {

    state = {
      currentVote: {},
      votesList: this.props.votes || []
    };

    componentDidMount(){
        this.props.getVotes();
    };

    componentDidUpdate(prevProps) {
        if (JSON.stringify(this.props.votes) !== JSON.stringify(prevProps.votes)){
            this.setState({votesList: this.props.votes});
        }
    };
    
    deleteVote = () => {
        let selectedVote = this.state.currentVote;
        API.deleteVote(selectedVote)
            .then(() => {
//                this.props.sendNotification({notificationMessage: `The Vote ${selectedVote.title} has been successfully deleted.`, time: 5000});
                this.openNotification('success', 'The Vote has been deleted',`The Vote ${selectedVote.title} has been successfully deleted.`, 5);
                this.modifyVoteData(selectedVote);
                this.setState({currentVote: {}});
            })
            .catch(error => console.log(error));
    };
    
    showDeleteConfirm = () => {
        const deleteVoteFunc = this.deleteVote.bind(this);
        confirm({
            title: 'Are you sure want to delete this vote?',
            content: `The vote ${this.state.currentVote.title} will be permanently deleted.`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteVoteFunc();
            },
            onCancel() {},
        });
    };
    
    setCurrentVote = (item) => {
      this.setState({currentVote: item});
    };

    modifyVoteData(row) {
        const newVotesList = this.state.votesList.filter(vote => vote.id !== row.id);
        this.setState({votesList: newVotesList});
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
    
    getLinks = () => {
        const dateFormat = "DD.MM.YYYY";
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a href="#" onClick={this.showDeleteConfirm}>Delete this vote</a>
                </Menu.Item>
            </Menu>
        );

        return this.state.votesList.length ? this.state.votesList.map(item => {
            let dateNow = + new Date();
            let isActiveVote = item.dateStart && item.dateEnd ? (item.dateStart < dateNow && item.dateEnd > dateNow) : false;
            let isArchive = item.dateEnd ? item.dateEnd < dateNow : false;
            let isPased = item.answersCount > 0;

            return (
                <div className="vote-child" key={item.id}>
                    <h1>{item.title}</h1>
                    <div className="vote-dropdown">
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a className="ant-dropdown-link" href="#">
                                <Icon type="ellipsis" className="vertical-ellipsis-icon" onClick={() => this.setCurrentVote(item)}/>
                            </a>
                        </Dropdown>
                    </div>
                    <div className="vote-author">Created by: {item.userLogin}</div>
                    <div className="vote-content-separator"></div>
                    <div className="vote-details">
                        <div className="vote-detail-row">
                            <div className="vote-detail-title">ID:</div>
                            <div className="vote-detail-info">{item.id}</div>
                        </div>
                        <div className="vote-detail-row">
                            <div className="vote-detail-title">Questions quantity:</div>
                            <div className="vote-detail-info">{item.questionCount}</div>
                        </div>
                        <div className="vote-detail-row">
                            <div className="vote-detail-title">Description:</div>
                            <div className="vote-detail-info">{item.description}</div>
                        </div>
                        <div className="vote-detail-row">
                            <div className="vote-detail-title">Created at:</div>
                            <div className="vote-detail-info">{moment(item.dateCreate).format(dateFormat)}</div>
                        </div>
                        <div className="vote-detail-row">
                            <div className="vote-detail-title">Time frame:</div>
                            <div className="vote-detail-info">{`${item.dateStart ? moment(item.dateStart).format(dateFormat) : "no chosen"} - ${item.dateEnd ? moment(item.dateEnd).format(dateFormat) : "no chosen"}`}</div>
                        </div>
                        <div className="vote-detail-row">
                            <div className="vote-detail-title">Status:</div>
                            <div className="vote-detail-info">{(isPased ? "passed" : "not passed") + (isActiveVote ? ", active" : ", no active")}</div>
                        </div>
                        <div className="vote-detail-row">
                            <div className="vote-detail-title">Groups:</div>
                            <div className="vote-detail-info">{item.concatenated || "-"}</div>
                        </div>
                    </div>
                    {!isArchive && !isActiveVote && <Button type="primary" className="vote-submit-btn">
                        <Link to={`/votes/edit/${item.id}`}>Edit</Link></Button> || null}
                    {isActiveVote && !isPased &&  <Button type="primary" className="vote-submit-btn">
                        <Link to={`/votes/vote/${item.id}`}>Vote</Link></Button> || null}
                    {(isPased || isArchive) && <Button type="primary" className="vote-submit-btn">
                        <Link to={`/votes/view/${item.id}`}>View</Link></Button> || null}
                </div>
            )
        }) : <div className="info-text">List is empty</div>;
    };
    
    render(){
        return this.getLinks()
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        votes: state.votesReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createVote: () => dispatch(createVote()),
        getVotes: () => dispatch(getVotes()),
        sendNotification: (data) => dispatch(sendNotification(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Vote)
