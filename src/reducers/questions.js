import { GET_QUESTIONS, ADD_QUESTION, ADD_VOTE} from '../actions/questions'

export default function questions( state={}, action ) {
    switch (action.type) {
        case GET_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id] : action.question
            }
        case ADD_VOTE:
            const question = {
                [action.qid]: {
                    ...state[action.qid],
                    [action.option]: {
                        ...state[action.qid][action.option],
                        votes: state[action.qid][action.option].votes.concat([action.uid])
                    }
                }
            }
            
            return {
                ...state,
                ...question
            }
        default:
            return state
    }
}