import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Login'
import Dashboard from './Dashboard'
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import Nav from './Nav'
import PageNotFound from './PageNotFound'
import PrivateRoute from './PrivateRoute'
import LoadingBar from 'react-redux-loading-bar'
import CreateUser from './CreateUser';
import { handleIntitialData } from '../actions/shared'

class App extends Component {

  componentDidMount () {
    this.props.dispatch(handleIntitialData())
  }

 render() {
   const { authedUser, loading } = this.props

   return (
     <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            <div className="App">
                
                <div>
                    <Switch>
                      <Route path='/login' component={Login} />
                      <Route path='/create-user' component={CreateUser} />
                      <PrivateRoute path='/' exact component={Dashboard} authedUser={authedUser} />
                      <PrivateRoute path='/question/:id' component={QuestionPage} authedUser={authedUser}  />
                      <PrivateRoute path='/add' component={NewQuestion} authedUser={authedUser} />
                      <PrivateRoute path='/leaderboard' component={Leaderboard} authedUser={authedUser} />
                      <PrivateRoute path='/page-not-found' component={PageNotFound} authedUser={authedUser} />
                      <PrivateRoute path='*' component={PageNotFound} authedUser={authedUser}/>
                    </Switch> 
                </div>
                {loading ? <div><h3>Loading....</h3></div> : ''}
            </div>
          </div>
        </Fragment>
     </Router>
    
  );
 } 
}

App.propTypes = {
  authedUser: PropTypes.string
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App);
