import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Question from './Question';

class Dashboard extends Component {
    state = {
        answered : false,
        unanswered: true
    }

    handleClick = (e) => {
        const className = e.target.className

        this.setState(() => ({
            answered : (className.indexOf('answered-question') > -1 && className.indexOf('unanswered-question') === -1),
            unanswered: (className.indexOf('unanswered-question') > -1)
        }))
    }

    render() {
        const { answered, unanswered } = this.state
        const answeredActive = answered === true? 'active' : ''
        const unansweredActive = unanswered === true? 'active' : ''
        const { questions, unansweredQuestions, answeredQuestions } = this.props

        return (
            <div>
                <div className="questions-tab">
                    <div 
                     className={`unanswered-questions ${unansweredActive}`}
                     onClick={this.handleClick}
                    >
                        Unanswered Questions
                    </div>
                    <div 
                     className={`answered-questions ${answeredActive}`}
                     onClick={this.handleClick}
                    >
                        Answered Questions
                    </div>
                </div>
                <div className="tab-content">
                    {
                        unanswered === true
                        ? <div className="unanswered-content">
                            {
                                unansweredQuestions.length > 0
                                   ? unansweredQuestions.map( (question) => (
                                        <div key={question.id}> 
                                            <Question qid={question.id} showLess={true} />
                                        </div>
                                    ))
                                : questions.length > 0
                                    ? <p>There are no unanswered questions</p>
                                    :  ''
                            }
                        </div>
                        : <div className="unanswered-content">
                            {
                                answeredQuestions.length > 0
                                ?   answeredQuestions.map( (question) => (
                                        <div key={question.id}> 
                                            <Question qid={question.id} showLess={true} />
                                        </div>
                                    ))
                                : questions.length > 0
                                    ? <p>There are no answered questions</p>
                                    : ''
                            }
                        </div>
                    }
                    
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    questions: PropTypes.array.isRequired,
    answeredQuestions: PropTypes.array.isRequired,
    unansweredQuestions: PropTypes.array.isRequired
}

function mapStateToProps({ questions, users, authedUser}) {
    const sortedQuestions = Object.keys(questions).map((k) => questions[k])
                .sort((a,b) => b.timestamp - a.timestamp)
    const userAnswers = (users[authedUser] && users[authedUser].answers) ? Object.keys(users[authedUser].answers) : []
    const unansweredQuestions = sortedQuestions.filter( (question) => userAnswers.indexOf(question.id) === -1 )
    const answeredQuestions = sortedQuestions.filter((question) => userAnswers.indexOf(question.id) > -1 )

    return {
        questions: sortedQuestions,
        answeredQuestions,
        unansweredQuestions
    }
}

export default connect(mapStateToProps)(Dashboard)