import { GET_USERS } from '../constants/user';
import { SET_USER } from '../constants/user';
import { SIGN_OUT } from '../constants/user';


export const getUsers = () => {
    return dispatch => {
        dispatch({
            type: GET_USERS
        })
    }
};

export const setUser = data => {
    return dispatch => {
        dispatch({
            type: SET_USER,
            payload: data
        })
    }
};

export const signOut = () => {
    return dispatch => {
        dispatch({
            type: SIGN_OUT
        })
    }
};