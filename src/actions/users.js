import { saveUser, fetchUsers } from "../utils/api";
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const GET_USERS = 'GET_USERS'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION'
export const ADD_USER = 'ADD_USER'

export function getUsers(users) {
    return {
        type: GET_USERS,
        users
    }
}

export function addQuestionAnswer(userId, qid, answer) {
    return {
        type: ADD_QUESTION_ANSWER,
        userId,
        qid,
        answer
    }
}

export function addUserQuestion(userId, qid) {
    return {
        type: ADD_USER_QUESTION,
        userId,
        qid
    }
}

function addUser(user) {
    return {
        type: ADD_USER,
        user
    }
}

export function handleAddUser (userId, name, avatarURL) {
    return (dispatch) => {
        dispatch(showLoading())

         return saveUser({userId, name, avatarURL})
         .then( (user) => {
             dispatch(addUser(user))
             dispatch(hideLoading())
         })
         
    }
}

export function handleGetUsers() {
    return (dispatch) => {
        dispatch(showLoading())

        return fetchUsers()
        .then ( (users) => {
            dispatch(getUsers(users))
            dispatch(hideLoading())
        })
    }
}
