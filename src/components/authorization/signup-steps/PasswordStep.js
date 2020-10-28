import React, { Component } from "react";

import LoginLink from "./LoginLink";


export default class PasswordStep extends Component {
    render () {
        return (
            <div className="auth-step-form">
                <input type="password" className="auth-form-input" value={this.props.password1} onChange={this.props.changePassword1} />
                <input type="password" className="auth-form-input" value={this.props.password2} onChange={this.props.changePassword2} />
                <button className="auth-form-submit-btn" onClick={this.props.onSubmitPassword}>Send</button>
                <LoginLink/>
                <div className="auth-info">Fill two times your new constant password.</div>
            </div>
        )
    }
}
