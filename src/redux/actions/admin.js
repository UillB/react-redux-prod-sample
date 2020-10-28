import { SET_ACTIVE_INPUT } from '../constants/admin';
import { RESET_ACTIVE_INPUT } from '../constants/admin';
import { GET_USERS } from '../constants/admin';
import { GET_GROUPS } from '../constants/admin';
import { RESET_REDUX } from '../constants/admin';

import API from "../../api/admin"


export const setActiveInput = name => {
    return dispatch => {
        dispatch({
            type: SET_ACTIVE_INPUT,
            payload: name
        })
    }
};

export const resetActiveInput = () => {
    return dispatch => {
        dispatch({
            type: RESET_ACTIVE_INPUT
        })
    }
};

export const getUsers = () => {
    return dispatch => {
        return API.getUsers()
            .then(resp => {
                dispatch({
                    type: GET_USERS,
                    payload: resp
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const getGroups = () => {
    return dispatch => {
        return API.getGroups()
            .then(resp => {
                dispatch({
                    type: GET_GROUPS,
                    payload: resp
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const resetReduxAdmin = () => {
    return dispatch => {
        dispatch({
            type: RESET_REDUX
        })
    }
};
