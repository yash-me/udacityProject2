export const SET_AUTH_USER = 'SET_AUTH_USER'

function setAuthedUser (authedUser) {
    return {
        type: SET_AUTH_USER,
        authedUser
    }
}

export function handleSetAuthedUser (id) {
    return (dispatch) => {
        return dispatch(setAuthedUser(id))
    }
}

export function handleUserLogout () {
    return (dispatch) => {
        return dispatch(setAuthedUser(null))
    }
}