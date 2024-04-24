const express = require('express')
const { createCourse, updateCourse, incrementReview, decrementReview, updateRating, deleteCourse, incrementEnrolement, decrementEnrolement, searchCourse, searchCourseByCategory, findSubjects } = require('../controller/courseController')
const { createCourseDetail, updateCourseDetail, deleteCourseDetail, getCourseDetails } = require('../controller/courseDetailContorller')
 

const Router = express.Router()

 

// course

Router.route("/student/searchCourse").post(searchCourse) 
Router.route("/student/searchCourseByCategory").post(searchCourseByCategory) 

Router.route("/educator/createCourse").post(createCourse) 
Router.route("/educator/updateCourse").put(updateCourse)
Router.route("/educator/deleteCourse").put(deleteCourse)
Router.route("/educator/incrementReview").put(incrementReview)
Router.route("/educator/decrementReview").put(decrementReview)
Router.route("/educator/incrementEnrolement").put(incrementEnrolement)
Router.route("/educator/decrementEnrolement").put(decrementEnrolement)
Router.route("/educator/updateRating").put(updateRating)




// course details
Router.route("/educator/courseDetails/get").post(getCourseDetails) 

Router.route("/educator/createCourseDetails").post(createCourseDetail) 
Router.route("/educator/updateCourseDetails").put(updateCourseDetail)
Router.route("/educator/deleteCourseDetails").put(deleteCourseDetail)
 
 


module.exports =Router