import { SET_ACTIVE_INPUT } from '../constants/admin';
import { RESET_ACTIVE_INPUT } from '../constants/admin';
import { GET_USERS } from '../constants/admin';
import { GET_GROUPS } from '../constants/admin';
import { RESET_REDUX } from '../constants/admin';


const initState = {
    activeInput: null,
    usersList: []
};

export default (state = initState, action) => {
    switch(action.type) {
        case SET_ACTIVE_INPUT :
            return {...state, activeInput: action.payload};
        case RESET_ACTIVE_INPUT :
            return {...state, activeInput: null};
        case GET_USERS :
            return {...state, usersList: action.payload};
        case GET_GROUPS :
            return {...state, groupsList: action.payload};
        case RESET_REDUX :
            return {...initState};
    default :
        return state
    }
}