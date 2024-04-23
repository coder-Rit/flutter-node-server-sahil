const express = require('express')
const { updateVideoLecture, removeVideoLecture } = require('../controller/videoLectureController')
 

const Router = express.Router()

// user --> Student
Router.route("/syllabus/modules/lessons/video/add").post(updateVideoLecture) 
Router.route("/syllabus/modules/lessons/video/remove").delete(removeVideoLecture) 
 
 
 

module.exports =Router