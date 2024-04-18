const express = require('express')
const {  sendOTP_phone } = require('../controller/sendotpController')
const { verfiyPhoneusingOTP } = require('../controller/userContoller')
 
 

const Router = express.Router()

Router.route("/sendOTP_phone").post(sendOTP_phone) 
Router.route("/verfiyPhoneusingOTP").post(verfiyPhoneusingOTP) 
 
 
 


module.exports =Router