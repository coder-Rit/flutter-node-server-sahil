const express = require('express')
const { sendOTP_phone, verfiyPhoneusingOTP } = require('../controller/sendotpController')
const { createEnrollCourse, getEnrolledCourses, CompeletedlessonsMark } = require('../controller/enrolledCourseController')
 
 

const Router = express.Router()

Router.route("/course/enrolled/get").post(getEnrolledCourses) 
Router.route("/course/enroll/create").post( createEnrollCourse) 
Router.route("/course/enroll/modules/lessons/completed").put(CompeletedlessonsMark) 
 
 
 


module.exports =Router