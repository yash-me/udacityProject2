import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProgresBar from './ProgressBar'
import avatar from '../images/nopic.png'


class QuestionResult extends Component {
    render() {
        const { question, user, authedUser } = this.props
        const { name, avatarURL } = user
        const { optionOne, optionTwo }  = question
        const totalVotes = optionOne.votes.length + optionTwo.votes.length

        return (
            <div className="card">
                <div className="card-head">
                    Added By: {name}
                </div>
                <div className="card-body">
                    <div className='avatar'>
                        <img
                            src={avatarURL || avatar}
                            alt={`Avatar of ${name}`}
                        />
                    </div>
                    
                    <div className="card-info">
                        <h3>Results:</h3>
                        <div className={`question-result ${(optionOne.votes.includes(authedUser)) ? 'voted-option' : ''}` }>
                            <p>Would you rather {optionOne.text}</p>
                            <ProgresBar percent={Math.round((optionOne.votes.length/totalVotes)*100)} />

                            <p className="votes">{optionOne.votes.length} out of {totalVotes} votes</p>
                            <div className="voted-bubble" >
                                <div>
                                    <span>Your Vote</span>
                                </div></div>
                        </div>
                        <div className={`question-result ${(optionTwo.votes.includes(authedUser)) ? 'voted-option' : ''}` }>
                            <p>Would you rather {optionTwo.text}</p>
                            <ProgresBar percent={Math.round((optionTwo.votes.length/totalVotes)*100)} />

                            <p className="votes">{optionTwo.votes.length} out of {totalVotes} votes</p>
                            <div className="voted-bubble" >
                                <div>
                                    <span>Your Vote</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProp({ questions, users, authedUser }, { qid}) {
    const question = questions[qid]
    const user = users[question['author']]

    return {
        qid,
        question,
        user,
        authedUser
    }
}

export default connect(mapStateToProp)(QuestionResult)