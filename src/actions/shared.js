import { getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api'
import { getUsers, addQuestionAnswer, addUserQuestion} from './users'
import { getQuestions, addVote, addQuestion } from './questions'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function handleIntitialData() {
    return (dispatch) => {
        dispatch(showLoading())

        return getInitialData()
        .then ( ({users, questions}) => {
            dispatch(getUsers(users))
            dispatch(getQuestions(questions))
            dispatch(hideLoading())
        })
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())
        
        return saveQuestion({ author: authedUser, optionOneText, optionTwoText })
        .then((question) => {
            const qid = question.id
            const { authedUser } = getState()

            dispatch(addQuestion(question))
            dispatch(addUserQuestion(authedUser, qid))
            dispatch(hideLoading())
        })
    }
}

export function handleAddQuestionAnswer(qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())
        
        return saveQuestionAnswer({authedUser, qid, answer})
        .then ( () => {
            dispatch(addVote(authedUser, qid, answer)) 
            dispatch(addQuestionAnswer(authedUser, qid, answer)) 
            dispatch(hideLoading())
         })
    }
}