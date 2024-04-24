const express = require('express')
 const { createAssingment, updateAssingment, deleteAssingment, getAllAssingment, assignmentCompletionMark, removeCompletedAssignment } = require('../controller/assignmentController')
 

const Router = express.Router()

 

// Assignment
Router.route("/all/getAllAssignment").post(getAllAssingment)

Router.route("/educator/createAssignment").post(createAssingment) 
Router.route("/educator/updateAssignment").put(updateAssingment)
Router.route("/educator/deleteAssignment").put(deleteAssingment)


Router.route("/enrollCourse/modules/lessons/assignment/completed").put(assignmentCompletionMark)
Router.route("/enrollCourse/modules/lessons/assignment/remove").put(removeCompletedAssignment)
 


module.exports =Router