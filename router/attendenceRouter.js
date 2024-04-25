const express = require('express')
const { getAttendnce, updateAttendence, deleteAttendence } = require('../controller/attendenceContorller')
 

const Router = express.Router()

 

// attendence
Router.route("/all/attendance/get").post(getAttendnce)

Router.route("/educator/attendance/update").post(updateAttendence) 
Router.route("/educator/attendance/delete").put(deleteAttendence)

module.exports =Router