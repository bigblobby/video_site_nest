const setPrevUrlAction = (url: string) => ({
    type: "CHANGE_PREV_LOCATION",
    payload: url
})

export function setPrevUrl(url: string){
    return (dispatch) => {
        dispatch(setPrevUrlAction(url));
    }
}
