import { GET_USERS, ADD_QUESTION_ANSWER, ADD_USER_QUESTION, ADD_USER} from '../actions/users'

export default function users (state = {}, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_QUESTION_ANSWER:
            const answer = {
                [action.userId]: {
                    ...state[action.userId],
                    answers: Object.assign({}, state[action.userId].answers, {[action.qid] : action.answer})
                }
            };

            return {
                ...state,
                ...answer
            }
        case ADD_USER_QUESTION:
                const questions = {
                    [action.userId]: {
                        ...state[action.userId],
                        questions: state[action.userId].questions.concat(action.qid)
                    }
                };
        
            return {
                ...state,
                ...questions
            }
        case ADD_USER:
            return {
                ...state,
                [action.user.id]: action.user
            }
        default:
            return state
    }
}