import ApiService from "../services/ApiService";
import TokenService from "../services/TokenService";
import {push} from 'connected-react-router';
import {addNotification} from "./snackbarActions";

// Action types
const authSuccessAction =  (user) => ({
    type: 'AUTH_SUCCESS',
    payload: user
});

const authFailureAction = (error) => ({
    type: 'AUTH_FAILURE',
    payload: error
});

const userLogoutAction = () => ({
    type: 'USER_LOGOUT'
})

// Action creators
export function userRegister(data){
    return (dispatch) => {
        ApiService.registerUser(data)
            .then(result => {
                dispatch(authSuccessAction(result.user));
                TokenService.setToken(result.token);
                dispatch(push('/'));
            }).catch(err => {
                dispatch(authFailureAction(err.error));
            });
    }
}

export function userLogin(data, previousUrl = '/'){
    return (dispatch) => {
        ApiService.loginUser(data)
            .then(result => {
                dispatch(authSuccessAction(result.user));
                TokenService.setToken(result.token);
                dispatch(push(previousUrl));

                dispatch(addNotification({
                    key: 'login',
                    type: 'success',
                    message: `Welcome back!`,
                    duration: 3000
                }));
            }).catch(err => {
                dispatch(authFailureAction(err.message));
            });
    }
}

export function userLogout(){
    return (dispatch) => {
        TokenService.removeToken();
        dispatch(userLogoutAction())
        dispatch(push('/'))

        dispatch(addNotification({
            key: 'logout',
            type: 'success',
            message: `Successfully logged out`,
            duration: 3000
        }));
    }
}

export function verifyToken(){
    return async (dispatch) => {
        // if(!TokenService.getToken()){
        //     dispatch(userLoginFailureAction('Token not valid'));
        // }

        try {
            const user = await ApiService.verifyToken();
            dispatch(authSuccessAction(user));
        } catch(e) {
            dispatch(authFailureAction('Could not verify token'));
            TokenService.removeToken();
            dispatch(push('/login'));
        }
    }
}
