import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import userReducer from "./userReducer";
import appReducer from "./appReducer";
import snackbarReducer from "./snackbarReducer";

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    userReducer: userReducer,
    appReducer: appReducer,
    snackbarReducer: snackbarReducer,
})

export default rootReducer;
