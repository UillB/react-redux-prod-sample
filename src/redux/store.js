import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import userReducer from "./reducers/user";
import adminReducer from "./reducers/admin";
import votesReducer from "./reducers/votes";
import notificationsReducer from "./reducers/notifications";


const reducer = combineReducers({
    userReducer, adminReducer, votesReducer, notificationsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

export default store;
