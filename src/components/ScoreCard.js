import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import avatar from '../images/nopic.png'

class ScoreCard extends Component {
    render() {
        const { user, rank } = this.props
        const { avatarURL, name, answers, questions } = user

        return (
            <div className="scores">
                <div>#{rank}</div>
                <div className="user">
                    <img  src={avatarURL || avatar } alt={`Avatar of ${name}`} />
                    <div className="user-name">{name}</div>
                </div>
                <div className="result">
                    <div className="score"> {Object.keys(answers).length}</div>
                </div>
                <div className="result">
                     <div className="score">{questions.length}</div>
                </div>
                <div className="result">
                    <div className="score total-score">
                        <div>
                            {Object.keys(answers).length + questions.length}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ScoreCard.propTypes = {
    user: PropTypes.object.isRequired,
    rank: PropTypes.number.isRequired
}

function mapStateToProp({ users }, {userId, rank}) {

    return {
        user : users[userId],
        rank
    }
}

export default connect(mapStateToProp)(ScoreCard)