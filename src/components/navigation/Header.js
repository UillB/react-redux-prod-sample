import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {connect} from "react-redux";

import { Menu, Dropdown, Icon, Popconfirm } from 'antd';

import {signOut} from "../../redux/actions/user";
import {resetReduxAdmin} from "../../redux/actions/admin";
import {resetReduxVotes} from "../../redux/actions/votes";


class Header extends Component {

    signOut = () => {
        console.log("sign out");
        delete localStorage.token;
        this.props.signOut();
        this.props.resetReduxVotes();
        this.props.resetReduxAdmin();
    };

    menuUser = (
        <Menu>
            <Menu.Item>
                <div className="navigation-item" id="sign-out"><
                    Popconfirm title="Are you sure？"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={this.signOut}
                    >Sign Out</Popconfirm>
                </div>
            </Menu.Item>
        </Menu>
    );

    render () {
        let isAdmin = this.props.userReducer.isAdmin;

        return (
            <ul className="navigation">
                <li className="navigation-item">
                    <Link to="/" className="nav-logo" >
                        <div className="nav-logo-g" />
                        <div className="nav-logo-title"><span className="vote-label-word">Vote</span>Maker</div>
                    </Link>
                </li>
                {this.props.userReducer.isAdmin && <li className="navigation-item"><Link to="/users">Users</Link></li> || null}
                <li className="navigation-item"><Link to="/votes">Votes</Link></li>

                {isAdmin && <li className="navigation-item" id="sign-out"><Popconfirm title="Are you sure？"
                                                                          okText="Yes"
                                                                          cancelText="No"
                                                                          onConfirm={this.signOut}>Sign Out</Popconfirm></li> || null}

                {isAdmin && <li className="navigation-item" id="navigation-create-vote"><Link to="/votes/edit/new">
                    <button>Create new vote</button>
                </Link></li> || null}

                <Dropdown overlay={this.menuUser} trigger={['click']} >
                    <div className={"menu-user" + (isAdmin ? " menu-user-admin" : "")}>
                        <span>{this.props.userReducer.login}</span> <Icon type="down" />
                    </div>
                </Dropdown>
            </ul>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
        resetReduxAdmin: () => dispatch(resetReduxAdmin()),
        resetReduxVotes: () => dispatch(resetReduxVotes())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
