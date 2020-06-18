import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Question from './Question'
import QuestionResult from './QuestionResult'

class QuestionPage extends Component {
    render() {
        const { qid, hasVoted } = this.props

        if( !qid ) {
            return <Redirect to="/page-not-found" />
        }

        return (
            <div>
                {
                hasVoted
                ? <QuestionResult qid={qid}/>
                : <Question qid={qid} />
                }
            </div>
        )
    }
}

QuestionPage.propTypes = {
    qid: PropTypes.string.isRequired,
    hasVoted: PropTypes.bool.isRequired
}

function mapStateToProps( { questions, authedUser, users}, props) {
    const { id } = props.match.params
    const question = !questions[id] ? '' : questions[id]
    const qid = !question ? '' : question['id']
    const currentUser = users[authedUser]
    const hasVoted = Object.keys(currentUser['answers']).indexOf(question.id) > -1

    return {
        qid,
        hasVoted
    }
}

export default connect(mapStateToProps)(QuestionPage)