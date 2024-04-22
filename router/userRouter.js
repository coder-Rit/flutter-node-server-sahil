const express = require('express')
const { student_signUp, student_login, student_resetPassword } = require('../controller/studentContoller')
const { educator_signUp, educator_login, educator_resetPassword } = require('../controller/educatorController')
 

const Router = express.Router()

// user --> Student
Router.route("/student/signup").post(student_signUp) 
Router.route("/student/login").post(student_login)
Router.route("/student/resetPass").post(student_resetPassword)

// user --> educator
Router.route("/educator/signup").post(educator_signUp) 
Router.route("/educator/login").post(educator_login)
Router.route("/educator/resetPass").post(educator_resetPassword)
 

module.exports =Router