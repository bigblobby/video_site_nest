const initialState = {
    user: null,
    error: null,
    authenticated: false,
}

function userReducer(state = initialState, action){
    switch(action.type){
        case "AUTH_SUCCESS":
            return {
                ...state,
                error: null,
                user: action.payload,
                authenticated: true
            };
        case "AUTH_FAILURE":
            return {
                ...state,
                error: action.payload,
                user: null,
                authenticated: false
            };
        case "USER_LOGOUT":
            return {
                ...state,
                error: null,
                user: null,
                authenticated: false
            }
        default:
            return state;
    }
}

export default userReducer;
