import { RESET_REDUX, GET_VOTES, GET_USER_VOTES } from '../constants/votes';


const initState = [];

export default (state = initState, action) => {
    switch(action.type) {
        case GET_VOTES:
            return [...action.payload];
        case GET_USER_VOTES:
            return [...action.payload];
        case RESET_REDUX:
            return [...initState];
    default :
        return state
    }
}
