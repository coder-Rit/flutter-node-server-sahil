const express = require('express')
const { updateVideoLecture, removeVideoLecture, getVideoLecture, completeVideoLecture } = require('../controller/videoLectureController')
 

const Router = express.Router()

// user --> Student
Router.route("/syllabus/modules/lessons/video/get").post(getVideoLecture) 
Router.route("/syllabus/modules/lessons/video/add").post(updateVideoLecture) 
Router.route("/syllabus/modules/lessons/video/remove").delete(removeVideoLecture) 
Router.route("/syllabus/modules/lessons/video/completed").patch(completeVideoLecture) 
 
 
 

module.exports =Router