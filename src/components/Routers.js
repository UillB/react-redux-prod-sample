import React, {Component} from "react";
import {connect} from "react-redux";
import {Switch, Route, Redirect} from 'react-router-dom';

import io from "socket.io-client";
import SignIn from "./authorization/SignIn";
import SingUp from "./authorization/SignUp";
import UsersTable from "./admin/users";
import VotingPage from "./vote/voting/VotingPage";
import ViewVote from "./vote/view/index";
import NotFound from "./404";
import Builder from "./admin/votes/builder";
import HeaderNav from "./navigation/Header";
import ListVotes from "./admin/votes/listVotes";
import UserListVotes from "./user/votes/listVotes";
import Notification from "../components/general/notification/Notification";

import API from "../api/user";
import {setUser} from "../redux/actions/user"
import {closeNotification} from "../redux/actions/notifications";


class Routers extends Component {
    constructor(props){
        super(props);
        let isLoading = true;

        if(localStorage.token){
            API.profile()
                .then(resp => {
                    this.props.setUser(resp);
                    this.setState({isLoading: false});
                })
                .catch(error => {
                    this.setState({isLoading: false});
                    //some action
                })
        } else {
            isLoading = false;
        }
        this.state = {
            isLoading
        };
    }

    componentDidMount(){
        this.setSocket();
    }

    setSocket = () => {
        console.log('socket is connecting...');
        if(window.socket && this.io.connected){
            return;
        }
        if(location.hostname == "localhost"){
            window.socket = io("http://localhost:3031", {
                transports: ["websocket"],
                forceNew: true,
                timeout: 5000
            });
        } else {
            window.socket = io({
                transports: ["websocket"],
                forceNew: true,
                timeout: 5000
            });
        }

        window.socket.on('connect', () => {
            console.log('Socket is connected');
        });

        window.socket.on('disconnect', () => {
            console.log('Socket is disconnected');
        });

        window.socket.on('connect_timeout', timeout => {
            console.log("connect_timeout ", timeout);
        });

        window.socket.on('reconnect', Number => {
            console.log("reconnect ", Number);
        });

        window.socket.on('connect_error', error => {
            console.log("connect_error ", error);
        });
    };

    AuthWrap = function AuthWrap() {
        return(
            <Switch>
                <Route exact path="/" component={SignIn}/>
                <Route path="/signin" component={SignIn}/>
                <Route path="/signup" component={SingUp}/>
                <Redirect to={"/"}/>
            </Switch>
        )
    };

    AdminWrap = function AdminWrap() {
        return(
            <div className="app-wrap">
                <HeaderNav />
                <div className="app-body">
                    <Switch>
                        {/*<Route path="/" exact render={()=><Redirect to={"/admin"} />} />*/}
                        <Route path="/" exact component={ListVotes} />
                        <Route path="/signin" exact render={()=><Redirect to={"/"} />} />
                        <Route path="/signup" exact render={()=><Redirect to={"/"} />} />
                        <Route path="/users" exact component={UsersTable} />
                        <Route path="/votes" exact component={ListVotes} />
                        <Route path="/votes/edit/:id" component={Builder} />
                        <Route path="/votes/vote/new" component={Builder} />
                        <Route path="/votes/vote/:id" component={VotingPage} />
                        <Route path="/votes/view/:id" component={ViewVote} />
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </div>
            </div>
        )
    };

    UserWrap = function UserWrap() {
        return(
            <div className="app-wrap">
                <HeaderNav />
                <div className="app-body">
                    <Switch>
                        <Route path="/" exact component={UserListVotes} />
                        <Route path="/signin" exact render={()=><Redirect to={"/"} />} />
                        <Route path="/signup" exact render={()=><Redirect to={"/"} />} />
                        <Route path="/votes" exact component={UserListVotes} />
                        <Route path="/votes/vote/:id" component={VotingPage} />
                        <Route path="/votes/view/:id" component={ViewVote} />
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </div>
            </div>
        )
    };

    render(){
        let userReducer = this.props.userReducer;
        let notificationsReducer = this.props.notificationsReducer;
        let role = userReducer.id && (userReducer.isAdmin ? "admin" : "user") || "auth";
        const Wraps = {
            "auth": this.AuthWrap,
            "admin": this.AdminWrap,
            "user": this.UserWrap
        };
        const Component = Wraps[role];
        let notificationMessages = notificationsReducer.notificationMessages;

        return (
            <div>
                {this.state.isLoading ? <div>Loading</div> : <Component />}
                {notificationMessages.length && <Notification /> || null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userReducer: state.userReducer,
        notificationsReducer: state.notificationsReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: resp => dispatch(setUser(resp)),
        closeNotification: action => dispatch(closeNotification())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Routers)
