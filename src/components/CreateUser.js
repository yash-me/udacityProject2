import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {handleAddUser} from '../actions/users'
import { withRouter, Link } from 'react-router-dom'
import ImageInput from './ImageInput'
import serializeForm from 'form-serialize'

class CreateUser extends Component {
    state = {
        name: '',
        username: '',
        avatarUrl: '',
    }

    handleChange = (e) => {
        e.preventDefault()

        const { name, value} = e.target

        this.setState({
            [name] : value,
            showError : false
        })

    }

    handleSubmit = (e) => {
        e.preventDefault()

        const values = serializeForm(e.target, { hash: true})
        const { username, name, avatarURL } = values
        const { dispatch, existingUsers } = this.props

        if(existingUsers.includes(username)) {
            this.setState({showError: true})
            return
        }
        
        dispatch(handleAddUser(username, name, avatarURL || ''))

        this.props.history.push(`/login`);
    }

    render() {
        const { name, username, showError } = this.state

        return (
            <div className="create-user-container">
                <h1>Create Account</h1>
                <p>Fill out your details</p>
                { showError &&
                    <div className="error-message">
                        The username you entered already exists.
                    </div>
                }
                <form className="create-user-form" onSubmit={this.handleSubmit}> 
                    <ImageInput
                        className='avatar-input'
                        name='avatarURL'
                        maxHeight={140}
                    />
                    <div className='create-user-details'>
                        <input
                        className="name-input"
                        type="text" 
                        name="name" 
                        placeholder="Enter name"
                        autoComplete="off"
                        onChange={this.handleChange}
                        />
                        <input
                        className="username-input"
                        type="text" 
                        name="username"
                        placeholder="Enter username"
                        autoComplete="off"
                        onChange={this.handleChange}
                        />
                        <button
                        className="btn"
                        type='submit'
                        disabled={(name === '' || username === '')?true:false}
                        >
                            Submit
                        </button>
                    </div>
                </form>
                <div className="login-link">
                    Already have an account? &nbsp;
                    <Link to="/login" className="new-user">
                        Login
                    </Link>
                </div>
            </div>
        )
    }
}

CreateUser.propTypes = {
    existingUsers: PropTypes.array.isRequired
}

function mapStateToProps({users}) {
    return {
        existingUsers: Object.keys(users)
    }
}

export default withRouter(connect(mapStateToProps)(CreateUser))