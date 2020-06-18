import { fetchQuestions } from "../utils/api";
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const GET_QUESTIONS = 'GET_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_VOTE = 'ADD_VOTE'

export function getQuestions(questions) {
    return {
        type: GET_QUESTIONS,
        questions
    }
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function addVote(uid,qid, option) {
    return {
        type: ADD_VOTE,
        uid,
        qid,
        option
    }
}

export function handleGetQuestions() {
    return (dispatch) => {
        dispatch(showLoading())

        return fetchQuestions()
        .then ( (questions) => {
            dispatch(getQuestions(questions))
            dispatch(hideLoading())
        })
    }
}