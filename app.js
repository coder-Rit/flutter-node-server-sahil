const express = require('express')
const error = require('./middleware/error')
const connectTODatabase = require('./config/dataBase')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors  = require("cors")
const app = express()


if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "config/config.env" });
  }
 
app.use(cors({
  credentials: true,
  origin:[process.env.ORIGIN_1,process.env.ORIGIN_2,process.env.ORIGIN_]
  
}))

 

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))

 

//connection to the data base 
connectTODatabase()


 
app.get("/",(req,res,next)=>{
  res.send("🐲🐲 Working fine 🐲🐲")
    console.log("🐲🐲 Working fine 🐲🐲")
})

const userRouter = require('./router/userRouter') 
const messageRouter = require('./router/messageRouter') 
const courseRouter = require('./router/courseRouter') 
const assignmentRouter = require('./router/assignmentRouter') 
const syllabusRouter = require('./router/syllabusRouter') 
const videoLectureRouter = require('./router/videoLectureRouter') 
const enrolledCourseRouter = require('./router/enrolledCourseRouter') 
const classRouter = require('./router/classRouter') 
 

app.use("/api/v1", userRouter)
app.use("/api/v1", messageRouter)
app.use("/api/v1", courseRouter)
app.use("/api/v1", assignmentRouter)
app.use("/api/v1", syllabusRouter)
app.use("/api/v1", videoLectureRouter)
app.use("/api/v1", enrolledCourseRouter)
app.use("/api/v1", classRouter)
 

 
 
 
 app.use(error)
module.exports = app
