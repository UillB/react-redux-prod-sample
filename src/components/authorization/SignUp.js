import React, { Component } from "react";
import {connect} from "react-redux";

import API from "../../api/auth";
import {setUser} from "../../redux/actions/user"
import {sendNotification, clearNotifications} from "../../redux/actions/notifications"
import LoginStep from "./signup-steps/LoginStep";
import TemporalPassStep from "./signup-steps/TemporalPassStep";
import PasswordStep from "./signup-steps/PasswordStep";
import { notification } from 'antd';


class SignUp extends Component {
    state = {
        login: "",
        tempPassword: "",
        password1: "",
        password2: "",
        error: "",
        notification: {},
        step: 0,
        isLoading: false
    };

    changeLogin = e => {
        let login = e.target.value;
        this.setState({login});
    };
    
    changeTempPassword = e => {
//        this.props.clearNotifications();
        notification.destroy();
        let tempPassword = e.target.value;
        this.setState({tempPassword});
    };
    
    changePassword1 = e => {
        let password1 = e.target.value;
        this.setState({password1});
    };
    
    changePassword2 = e => {
        let password2 = e.target.value;
        this.setState({password2});
    };
    
    submitLogin = () => {
        let login = this.state.login;
        if(!login){
            return this.setState({error: "Fill login!"});
        }
        this.setState({isLoading: true});
        API.singUpLogin(login)
            .then(() => {
//                this.props.sendNotification({notificationMessage: `Password was sent on your email: ${this.state.login}@work.com`, time: 999999999});
//                this.openNotificationWithIcon('info', `Password was sent on your email: ${this.state.login}@work.com`);
                this.openNotification('Please check your work email',`Password was sent on your email: ${this.state.login}@work.com`);
                this.setState({error: "", step: 1, isLoading: false});
            })
            .catch(error => {
                let errorText = error.response.data || "Error query!";
                console.error(errorText);
                this.setState({error: errorText, isLoading: false});
            })
    };

    submitTempPassword = () => {
        this.setState({error: ""});
        let {login, tempPassword} = this.state;
        if(!login || !tempPassword){
            return this.setState({error: "Fill temp password!"});
        }
        this.setState({isLoading: true});
        API.singUpTempPassword({login, password: tempPassword})
            .then(() => {
                this.setState({error: "", step: 2, isLoading: false});
            })
            .catch(error => {
                let errorText = error.response.data || "Error query!";
                console.error(errorText);
                this.setState({error: errorText, isLoading: false});
            })
    };

    submitPassword = () => {
        let {login, password1, password2} = this.state;
        if(!login || !password2){
            return this.setState({error: "Fill temp password!"});
        }
        if(password1 !== password2){
            return this.setState({error: "First and second passwords aren't matched!"});
        }
        this.setState({isLoading: true});
        API.singUpPassword({login, password: password2})
            .then(res => {
                localStorage.token = res.token;
                this.props.setUser(res.user);
                this.props.history.push("/");
            })
            .catch(error => {
                this.setState({isLoading: false});
                console.error(error);
            })
    };

    boxLogin = () => {
        return (
            <LoginStep login={this.state.login} change={this.changeLogin} onSubmitLogin={this.submitLogin}/>
        )
    };

    boxTempPassword = () => {
        return (
            <TemporalPassStep login={this.state.login} tempPassword={this.state.tempPassword} change={this.changeTempPassword} onSubmitTempPassword={this.submitTempPassword} />
        )
    };

    boxPassword = () => {
        return (
            <PasswordStep password1={this.state.password1}
                          password2={this.state.password2}
                          onSubmitPassword={this.submitPassword}
                          changePassword1={this.changePassword1}
                          changePassword2={this.changePassword2}/>
        )
    };
    
    openNotification = (msg, description) => {
        notification.config({
            duration: 300
        });
        notification.info({
            message: msg,
            description: description,
        });
    };
    

    render () {
        let {error, step} = this.state;
        let steps = [this.boxLogin, this.boxTempPassword, this.boxPassword];
        let Box = steps[step];

        return (
            <div className="auth">
                <div className="auth-form-wrapper">
                    <div className="auth-form">
                        <img src="/img/logo.svg" className="auth-logo" />
                        <Box />
                        {error && <div className="auth-error">{error}</div>}
                    </div>
                    <div className="auth-cloud" />
                </div>
                <div className="auth-right-image">
                    <img src="/img/login.png" alt="cloud" className="auth-image"/>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (data) => dispatch(setUser(data)),
        sendNotification: (data) => dispatch(sendNotification(data)),
        clearNotifications: data => dispatch(clearNotifications())
    }
};

export default connect(null, mapDispatchToProps)(SignUp)
