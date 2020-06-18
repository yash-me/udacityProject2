import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
  _saveUser
} from './_DATA.js'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function fetchUsers () {
  return _getUsers()
}

export function fetchQuestions () {
  return _getQuestions()
}

export function saveQuestion (question) {
  return _saveQuestion(question)
}

export function saveQuestionAnswer (params) {
  return _saveQuestionAnswer(params)
}

export function saveUser (user) {
  return _saveUser(user)
}