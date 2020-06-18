import React, { Component } from 'react'
import { connect } from 'react-redux'
import {handleAddQuestion} from '../actions/shared'
import { withRouter } from 'react-router-dom'

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: ''
    }

    handleChange = (e) => {
        e.preventDefault()

        const { name, value} = e.target

        this.setState({
            [name] : value
        })

    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { dispatch } = this.props
        const { optionOne, optionTwo } = this.state

        dispatch(handleAddQuestion(optionOne, optionTwo))

        this.props.history.push(`/`);
    }

    render() {
        const { optionOne, optionTwo } = this.state

        return (
            <div className="new-question-container">
                <h1>Create New Question</h1>
                <p>Enter Option One and Two question:</p>
                <form className="new-question" onSubmit={this.handleSubmit}> 
                    <p>Would you rather ...</p>
                    <input
                     type="text" 
                     name="optionOne" 
                     placeholder="Enter Option One Text"
                     autoComplete="off"
                     onChange={this.handleChange}
                      />
                     <h4>
                        <span>OR</span>
                     </h4>
                    <input
                     type="text" 
                     name="optionTwo"
                     placeholder="Enter Option Two Text"
                     autoComplete="off"
                     onChange={this.handleChange}
                      />
                    <button
                     className="btn"
                     type='submit'
                     disabled={(optionOne === '' || optionTwo === '')?true:false}
                    >
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}


export default withRouter(connect()(NewQuestion))