const express = require('express')
const { createCourse, updateCourse, incrementReview, decrementReview, updateRating, deleteCourse, incrementEnrolement, decrementEnrolement, searchCourse, searchCourseByCategory } = require('../controller/courseController')
const { createCourseDetail, updateCourseDetail, deleteCourseDetail } = require('../controller/courseDetailContorller')
 

const Router = express.Router()

 

// course
Router.route("/educator/createCourse").post(createCourse) 
Router.route("/educator/updateCourse").put(updateCourse)
Router.route("/educator/deleteCourse").put(deleteCourse)
Router.route("/educator/incrementReview").put(incrementReview)
Router.route("/educator/decrementReview").put(decrementReview)
Router.route("/educator/incrementEnrolement").put(incrementEnrolement)
Router.route("/educator/decrementEnrolement").put(decrementEnrolement)
Router.route("/educator/updateRating").put(updateRating)
Router.route("/student/searchCourse").post(searchCourse) 
Router.route("/student/searchCourseByCategory").post(searchCourseByCategory) 


// course details
Router.route("/educator/createCourseDetails").post(createCourseDetail) 
Router.route("/educator/updateCourseDetails").put(updateCourseDetail)
Router.route("/educator/deleteCourseDetails").put(deleteCourseDetail)
 
 


module.exports =Router