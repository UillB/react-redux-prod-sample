import config from "./config";
import axios from "axios";


const login = data => {
    const params = new URLSearchParams();
    params.append('login', data.login);
    params.append('password', data.password);
    return axios.post(`${config.domain}/auth/enter`, params);
};

const singUpLogin = login => {
    const params = new URLSearchParams();
    params.append('login', login);
    return axios.post(`${config.domain}/auth/singup/login`, params);
};

const singUpTempPassword = data => {
    const params = new URLSearchParams();
    params.append('login', data.login);
    params.append('password', data.password);
    return axios.post(`${config.domain}/auth/singup/temp`, params);
};

const singUpPassword = data => {
    const params = new URLSearchParams();
    params.append('login', data.login);
    params.append('password', data.password);
    return axios.post(`${config.domain}/auth/singup/password`, params)
        .then(resp => resp.data)
};


export default {
    login: login,
    singUpLogin: singUpLogin,
    singUpTempPassword: singUpTempPassword,
    singUpPassword: singUpPassword
};