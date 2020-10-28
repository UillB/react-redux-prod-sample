import {CLOSE_NOTIFICATION, SEND_NOTIFICATION, CLEAR_NOTIFICATIONS} from '../constants/notifications';

export const sendNotification = data => {
    return dispatch => {
        setTimeout(()=>{
            dispatch({
                type: CLOSE_NOTIFICATION,
                payload: data
            })
        }, data.time || 10000);
        dispatch({
            type: SEND_NOTIFICATION,
            payload: data
        })
    }
};

export const closeNotification = data => {
    return dispatch => {
        dispatch({
            type: CLOSE_NOTIFICATION,
            payload: data
        })
    }
};

export const clearNotifications = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_NOTIFICATIONS,
        })
    }
};
