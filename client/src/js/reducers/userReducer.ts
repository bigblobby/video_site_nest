const initialState = {
    user: null,
    error: null,
    authenticated: false,
    prevUrl: ''
}

function userReducer(state = initialState, action){
    switch(action.type){
        case "REGISTER_SUCCESS":
            return {
                ...state,
                error: null,
                user: action.payload,
                authenticated: true
            };
        case "REGISTER_FAILURE":
            return {
                ...state,
                error: action.payload,
                user: null,
                authenticated: false
            };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                error: null,
                user: action.payload,
                authenticated: true
            };
        case "LOGIN_FAILURE":
            return {
                ...state,
                error: action.payload,
                user: null,
                authenticated: false
            };
        case "CHANGE_PREV_LOCATION":
            return {
                ...state,
                prevUrl: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;
