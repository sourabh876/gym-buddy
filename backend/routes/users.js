const express = require('express')
const { loginUser, signUpUser } = require('../controllers/usercontroller')


const Router = express.Router()


Router.post('/login',loginUser)

Router.post('/signup',signUpUser)

module.exports = Router