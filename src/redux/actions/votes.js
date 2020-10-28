import { CREATE_VOTE } from '../constants/votes';
import { SAVE_VOTE } from '../constants/votes';
import { GET_VOTES } from '../constants/votes';
import { GET_USER_VOTES } from '../constants/votes';
import { GET_USER_VOTE } from '../constants/votes';
import {RESET_REDUX} from "../constants/votes";

import API from "../../api/admin";
import UserApi from "../../api/user";


export const getVotes = () => {
    return dispatch => {
        return API.getVotes()
            .then(resp => {
                return dispatch({
                    type: GET_VOTES,
                    payload: resp
                })
            })
            .catch(error => {
                console.log(error)
            });
    };
};

export const getUserVotes = () => {
    return dispatch => {
        return UserApi.getUserVotes()
            .then(resp => {
                return dispatch({
                    type: GET_USER_VOTES,
                    payload: resp
                })
            })
            .catch(error => {
                console.log(error)
            });
    };
};

export const createVote = () => {
    return dispatch => {
        dispatch({
            type: CREATE_VOTE
        })
    }
};

export const saveVote = (id, data, cb) => {
    return dispatch => {
        if(id === "new"){
            API.createVote(data)
                .then(resp => {
                    console.log("response save:", resp.id);
                    cb(resp.id);
                    data.id = resp.id;
                    return dispatch({
                        type: SAVE_VOTE,
                        payload: data
                    })
                })
                .catch(error => {
                    console.log(error);
                })

        } else {
            API.updateVote(data)
                .then(resp => {
                    console.log("response save:", resp);

                    return dispatch({
                        type: SAVE_VOTE,
                        payload: { id, data, cb }
                    })
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
};

export const resetReduxVotes = () => {
    return dispatch => {
        dispatch({
            type: RESET_REDUX
        })
    }
};