import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { FaUser } from 'react-icons/fa'
import { handleUserLogout} from '../actions/authedUser'

const Nav = (props) => {
    const handleLogout = (e) => {
        const { dispatch } = props

        dispatch(handleUserLogout())
    }

    const { authedUser, users } = props

    return (
        authedUser &&
        <div className="nav-wrapper">
            <div className="nav-container">
                <nav className='nav'>
                    <ul>
                        <li>
                            <NavLink to='/' exact activeClassName='active'>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/add' activeClassName='active'>
                                New Question
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/leaderboard' activeClassName='active'>
                                Leader Board
                            </NavLink>
                        </li>
                        
                    </ul>
                    
                </nav>
                <div className="nav-login-wrapper">
                    <ul className="nav-login">
                        <li>Hello {users[authedUser].name} <FaUser /> </li>
                        <li><Link to="/" onClick={handleLogout} > Logout </Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

Nav.propTypes = {
    authedUser: PropTypes.string,
    users: PropTypes.object.isRequired
}

function mapStateToProps ({ authedUser, users }) {
    return { 
        authedUser,
        users
    }
}

export default connect(mapStateToProps)(Nav)