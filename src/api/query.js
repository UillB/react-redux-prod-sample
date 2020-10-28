import config from "./config";
import axios from "axios";

const options = {
    timeout: 500
}

const query = (url="", options=options) => {
    return axios(config.domain + url, Object.assign({},{
        headers: {
            'Authorization': `Bearer ${config.token()}`
        }
    }, options))
        .then(resp => resp.data)
};

export default query;