const initialState = {
    prevUrl: ''
}

function appReducer(state = initialState, action){
    switch(action.type){
        case "CHANGE_PREV_LOCATION":
            return {
                ...state,
                prevUrl: action.payload
            }
        default:
            return state;
    }
}

export default appReducer;
