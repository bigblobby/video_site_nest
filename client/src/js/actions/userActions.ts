import ApiService from "../services/ApiService";
import TokenService from "../services/TokenService";
import {push} from 'connected-react-router';

// Action types
const userRegisterSuccessAction = (user) => ({
    type: 'REGISTER_SUCCESS',
    payload: user
});

const userRegisterFailureAction = (error) => ({
    type: 'REGISTER_FAILURE',
    payload: error
});

const userLoginSuccessAction = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user
});

const userLoginFailureAction = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: error
});

// Action creators
export function userRegister(data){
    return (dispatch) => {
        ApiService.registerUser(data)
            .then(result => {
                console.log(result);
                dispatch(userRegisterSuccessAction(result.user));
                TokenService.setToken(result.token);
                dispatch(push('/'));
            }).catch(err => {
                console.log(err);
                dispatch(userRegisterFailureAction(err.error));
            });
    }
}

export function userLogin(data, previousUrl = '/'){
    return (dispatch) => {
        ApiService.loginUser(data)
            .then(result => {
                dispatch(userLoginSuccessAction(result.user));
                TokenService.setToken(result.token);
                dispatch(push(previousUrl));
            }).catch(err => {
                console.log(err);
                dispatch(userLoginFailureAction(err.message));
            });
    }
}

export function verifyToken(){
    return async (dispatch) => {
        // if(!TokenService.getToken()){
        //     dispatch(userLoginFailureAction('Token not valid'));
        // }

        try {
            const user = await ApiService.verifyToken();
            dispatch(userLoginSuccessAction(user));
        } catch(e) {
            dispatch(userLoginFailureAction('Could not verify token'));
            TokenService.removeToken();
            dispatch(push('/login'));
        }
    }
}

export function setPrevUrl(url){
    return (dispatch) => {
        dispatch({type: "CHANGE_PREV_LOCATION", payload: url });
    }
}
