const express = require('express')
const { createCourse, updateCourse, incrementReview, decrementReview, updateRating, deleteCourse, incrementEnrolement, decrementEnrolement } = require('../controller/courseController')
const { createCourseDetail, updateCourseDetail, deleteCourseDetail } = require('../controller/courseDetailContorller')
const { createAssingment, updateAssingment, deleteAssingment, getAllAssingment } = require('../controller/assignmentController')
 

const Router = express.Router()

 

// Assignment
Router.route("/educator/getAllAssignment").get(getAllAssingment)

Router.route("/educator/createAssignment").post(createAssingment) 
Router.route("/educator/updateAssignment").put(updateAssingment)
Router.route("/educator/deleteAssignment").put(deleteAssingment)
 
 
 


module.exports =Router