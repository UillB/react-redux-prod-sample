import {CLOSE_NOTIFICATION, SEND_NOTIFICATION, CLEAR_NOTIFICATIONS} from "../constants/notifications";

const initState = {
    notificationMessages: []
};

export default (state = initState, action) => {
    switch(action.type) {
        case SEND_NOTIFICATION :
            return {
                ...state,
                notificationMessages: state.notificationMessages.concat(action.payload)
            };
        case CLOSE_NOTIFICATION:
            return {
                ...state,
                notificationMessages: state.notificationMessages.filter(notification => notification.notificationMessage !== action.payload.notificationMessage)
            };
        case CLEAR_NOTIFICATIONS:
            return {
                ...state,
                notificationMessages: []
            };
        default :
            return state
    }
}
