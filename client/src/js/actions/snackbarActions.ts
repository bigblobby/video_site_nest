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
export function addNotification(data, duration = 3000){
    return (dispatch, getState) => {
        const list = [...getState().snackbarReducer.list];
        const key = Math.random().toString(36).substr(2, 9);
        const newData = {...data, key: key};

        list.push(newData);
        dispatch(addNotificationAction(list));

        setTimeout(() => {
            let nextList = getState().snackbarReducer.list;
            nextList = nextList.filter(item => item.key !== key);
            dispatch(removeNotificationAction(nextList));
        }, duration);
    }
}

export function removeNotification(key){
    return (dispatch, getState) => {
        let list = getState().snackbarReducer.list;
        list = list.filter(item => item.key !== key);

        dispatch(removeNotificationAction(list));
    }
}
