import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser'
import { Redirect, Link } from 'react-router-dom'

class Login extends Component {
    state = {
        user: '',
        redirectTo: false,
        showError: false
    }

    handleChange = (e) => {
        const user = e.target.value
        
        this.setState(() => ({
            user
        }))
    }

    handleLogin = (e) => {
        e.preventDefault()

        const { user } = this.state
        const { dispatch, existingUsers} = this.props
        
        if(existingUsers.includes(user)) {
            dispatch(handleSetAuthedUser(user))
            
            this.setState(() => ({
                user : '',
                redirectTo: true
            }))
        } else {
            this.setState(() => ({
                user : '',
                showError: true
            }))
        }

        
    }

    render() {
        const { redirectTo, showError } = this.state
        const { users } = this.props
        const { from } = this.props.location.state || { from: { pathname: '/' } }

        if( redirectTo ) {
            return <Redirect to={from} />
        }

        return (
            <div className="center login-container">
                <h1 >Would You Rather App </h1>
                <p >Please sign in to continue </p>
                <div className="login">
                    <h3 >Sign in</h3>
                    <form onSubmit={this.handleLogin}>
                        { showError &&
                        <div className="error-message">
                            Please select a user
                        </div>
                        }
                        <div className="select-options">
                            <select 
                             onChange={this.handleChange}
                            >
                                <option value="">Select User</option>
                                {
                                    users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
                                }
                            </select>
                        </div>
                    
                        <button className="btn">
                            Log In
                        </button>
                    </form>
                    <div>
                        <Link to="/create-user" className="new-user">
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    users: PropTypes.array.isRequired,
    existingUsers: PropTypes.array.isRequired
}

function mapStateToProps({users}) {
    return {
        users : Object.keys(users).map(k => users[k]),
        existingUsers: Object.keys(users)
    }
}

export default connect(mapStateToProps)(Login)