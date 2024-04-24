const express = require('express')
const { getClasses, createClass, deleteClass, addSubjectToClass, removeSubjectFromClass } = require('../controller/classController')
 

const Router = express.Router()

 

// Assignment
Router.route("/all/class/get").post(getClasses)

Router.route("/educator/class/create").post(createClass) 
Router.route("/educator/class/delete").put(deleteClass)

Router.route("/educator/class/subject/add").put(addSubjectToClass)
Router.route("/educator/class/subject/remove").put(removeSubjectFromClass)


 


module.exports =Router