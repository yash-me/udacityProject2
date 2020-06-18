import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ScoreCard from './ScoreCard'

class Leaderboard extends Component {
    render() {
        const { users } = this.props

        return (
            <div className="leaderboard">
                <div className="scores">
                <div></div>
                <div>
                </div>
                <div className="result">
                    <div className="score-title">Answered questions</div>
                </div>
                <div className="result">
                    <div className="score-title">Created questions</div>
                </div>
                <div className="result">
                    <div className="score-title">Score</div>
                </div>
            </div>
                {
                    users.map((user, index) => (
                        <ScoreCard key={user.id} userId={user.id} rank={index+1} />
                    ))
                }
            </div>
        )
    }
}

Leaderboard.propTypes = {
    users: PropTypes.array.isRequired
}

function mapStateToProp({ users }) {
    const sortedUsers = Object.keys(users).map(k => users[k])
        .sort((a,b) => {
            return (
                (Object.keys(b.answers).length + b.questions.length) - (Object.keys(a.answers).length + a.questions.length)
            )
        })

    return {
        users : sortedUsers,
    }
}


export default connect(mapStateToProp)(Leaderboard)