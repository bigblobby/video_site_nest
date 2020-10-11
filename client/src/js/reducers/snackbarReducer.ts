const state = {
    list: []
};

function snackbarReducer(initialState = state, action){
    console.log(action);
    switch(action.type){
        case "ADD_NOTIFICATION":
            return {
                ...state,
                list: action.payload
            }
        case "REMOVE_NOTIFICATION":
            return {
                ...state,
                list: action.payload
            }
        case "REMOVE_ALL_NOTIFICATIONS":
            return {
                ...state,
                list: []
            }
        default:
            return state;
    }
}

export default snackbarReducer;
