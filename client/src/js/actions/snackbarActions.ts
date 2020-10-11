// Action types
const addNotificationAction = (data) => ({
    type: "ADD_NOTIFICATION",
    payload: data
});

const removeNotificationAction = (data) => ({
    type: "REMOVE_NOTIFICATION",
    payload: data
});

// Action creators
export function addNotification(data){
    return (dispatch, getState) => {
        const list = [...getState().snackbarReducer.list];
        list.unshift(data);
        dispatch(addNotificationAction(list));

        setTimeout(() => {
            let nextList = getState().snackbarReducer.list;
            nextList = nextList.filter(item => item.key !== data.key);
            dispatch(removeNotificationAction(nextList));
        }, data.duration);
    }
}

export function removeNotification(key){
    return (dispatch, getState) => {
        let list = getState().snackbarReducer.list;
        list = list.filter(item => item.key !== key);

        dispatch(removeNotificationAction(list));
    }
}
