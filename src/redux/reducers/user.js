import {GET_USERS} from "../constants/user";
import {GET_USER} from "../constants/user";
import {SET_USER} from "../constants/user";
import {SIGN_OUT} from "../constants/user";


const initState = {};

export default (state = initState, action) => {
    switch(action.type) {
        case SET_USER :
            return {...state, ...action.payload};
        case GET_USER :
            return {...state, data: action.payload.data};
        case GET_USERS :
            return {...state, data: action};
        case SIGN_OUT :
            delete localStorage.token;
            return {...initState};
    default :
        return state
    }
}