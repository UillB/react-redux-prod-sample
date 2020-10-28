import React from "react";
import {Link} from "react-router-dom"


const LoginLink = () => (
    <div className="auth-btn-link-back">
        <Link to="/signin">Back to login page</Link>
    </div>
);

export default LoginLink;
