const express = require('express')
const { sendOTP_phone, verfiyPhoneusingOTP } = require('../controller/sendotpController')
 
 

const Router = express.Router()

Router.route("/sendOTP_phone").post(sendOTP_phone) 
Router.route("/verfiyPhoneusingOTP").post(verfiyPhoneusingOTP) 
 
 
 


module.exports =Router