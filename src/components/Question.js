import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleAddQuestionAnswer } from '../actions/shared'
import avatar from '../images/nopic.png'

class Question extends Component {
    state = {
        selectedOption : ''
    }

    handleClick = (e) => {
        const value = e.target.value

        this.setState( () => ({selectedOption : value}))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const answer = this.state.selectedOption

        const { dispatch, question } = this.props

        dispatch(handleAddQuestionAnswer(question.id, answer))
    }

    handleViewMore = (e) => {
        e.preventDefault()

        const { question } = this.props
        this.props.history.push(`/question/${question.id}`);
    }

    render() {
        const { question, user, showLess } = this.props

        const { selectedOption } = this.state

        const { name, avatarURL } = user
        const { optionOne, optionTwo }  = question
        
        return (
            <div className="card">
                <div className="card-head">
                    Asked By: {name}
                </div>
                <div className="card-body">
                    <div className='avatar'>
                         <img
                            src={avatarURL || avatar}
                            alt={`Avatar of ${name}`}
                        />
                    </div>
                   
                    <div className="card-info">
                        <h3>Would You Rather</h3>
                        {showLess
                        ? <div>
                            <div>{
                               optionOne.text.substring(0, 20) + '...'
                                }</div>
                            <button 
                                className='btn'
                                type='submit'
                                disabled=''
                                onClick={this.handleViewMore} >
                                View More
                            </button>
                        </div>
                        : <div>
                            <form className="question-options" onSubmit={this.handleSubmit}>
                                <div className="select-option">
                                    <input 
                                    type="radio" 
                                    name="options" 
                                    value="optionOne"
                                    onClick={this.handleClick} /> 
                                    <span>{optionOne.text}</span>
                                </div>
                                <div className="select-option">
                                    <input 
                                    type="radio" 
                                    name="options" 
                                    value="optionTwo"
                                    onClick={this.handleClick} /> 
                                    <span>{optionTwo.text}</span>
                                </div>
                                <button 
                                    className='btn'
                                    type='submit'
                                    disabled={selectedOption === ''?true:false}
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                        }
                    </div>

                </div>
            </div>
        )
    }
}

Question.propTypes = {
    authedUser: PropTypes.string,
    user: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    showLess: PropTypes.bool
}

function mapStateToProps ({users, questions, authedUser}, {qid, showLess}) {
    const question = !questions[qid] ? {} : questions[qid]
    const user = question.length > 0? users[question['author']] : {}
    
    return {
        authedUser,
        user,
        question,
        showLess
    }
}

export default withRouter(connect(mapStateToProps)(Question))