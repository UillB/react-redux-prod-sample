import React, { Component } from "react";

import LoginLink from "./LoginLink";


export default class LoginStep extends Component {
    render () {
        return (
            <div className="auth-step-form">
                <input type="text" placeholder="login" value={this.props.login} onChange={this.props.change} className="auth-form-input"/>
                <button onClick={this.props.onSubmitLogin} className="auth-form-submit-btn">Send</button>
                <LoginLink/>
                <div className="auth-info">In order to log you should type your work login. The system will automatically generate the password for you and send it to the email.</div>
            </div>
        )
    }
}
