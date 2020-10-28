import React, {Component, createRef} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import API from "../../api/auth";
import {setUser} from "../../redux/actions/user";


class SignIn extends Component {
    constructor(props){
        super(props);
        this.loginInput = createRef();
        this.passwordInput = createRef();
    }
    state = {
        login: "",
        password: "",
        error: null
    };

    componentDidMount(){
        this.loginInput.current.focus();
    }

    handleSubmit = () => {
        if(!this.state.login || !this.state.password){
            return this.setState({error: "Fill gaps!"});
        }
        //loader turn on
        API.login(this.state)
            .then(resp => {
                localStorage.token = resp.data.token;
                this.setState({error: null});
                this.props.setUser(resp.data.user);
            })
            .catch(error => {
                let errorText = error.response.data || "Error query!";
                console.error(errorText);
                this.setState({error: errorText});
            });
    };

    onLoginChange = e => {
        let login = e.target.value;
        this.setState({login});
    };

    onPasswordChange = e => {
        let password = e.target.value;
        this.setState({password});
    };

    onPasswordKeyPress = e => {
        e.key === 'Enter' ? this.handleSubmit() : null;
    };

    onPasswordKeyDown = e => {
        console.log(e.key);
    };

    render () {
        return (
            <div className="auth">
                <div className="auth-form-wrapper">
                    <div className="auth-form">
                        <img src="/img/logo.svg" className="auth-logo" />
                        <div className="auth-step-form">
                            <input type="text"
                                   placeholder="login"
                                   ref={this.loginInput}
                                   value={this.state.value}
                                   onChange={this.onLoginChange}
                                   className="auth-form-input"/>
                            <input type="password"
                                   ref={this.passwordInput}
                                   placeholder="password"
                                   value={this.state.password}
                                   onChange={this.onPasswordChange}
                                   onKeyPress={this.onPasswordKeyPress}
                                   onKeyDown={this.onPasswordKeyDown}
                                   className="auth-form-input"/>
                            <button onClick={this.handleSubmit} className="auth-form-submit-btn">Sign In</button>
                            <div className="auth-btn-link">
                                <Link to="/signup">Create new account</Link>
                                {/*<Link to="/signup">Forgot password</Link>*/}
                            </div>
                        </div>
                        {this.state.error && <div className="auth-error">{this.state.error}</div>}
                    </div>
                    <div className="auth-cloud"></div>
                </div>
                <div className="auth-right-image">
                    <img src="/img/login.png" alt="cloud" className="auth-image"/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: data => dispatch(setUser(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
