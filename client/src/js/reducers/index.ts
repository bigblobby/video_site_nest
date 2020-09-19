import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import userReducer from "./userReducer";

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    userReducer: userReducer,
})

export default rootReducer;
