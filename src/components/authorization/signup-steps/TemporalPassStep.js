import React, { Component } from "react";

import LoginLink from "./LoginLink";


export default class TemporalPassStep extends Component {
    render () {
        return (
            <div className="auth-step-form">
                <input type="text" placeholder="Temp password" className="auth-form-input" value={this.props.tempPassword} onChange={this.props.change} />
                <button className="auth-form-submit-btn" onClick={this.props.onSubmitTempPassword}>Send</button>
                <LoginLink/>
                <div className="auth-info">Type password which was sent to your work email ({this.props.login}@work.com).</div>
            </div>
        )
    }
}

