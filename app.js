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
const attendenceRouter = require('./router/attendenceRouter') 
const bannerRouter = require('./router/bannerRouter') 
const practiceRouter = require('./router/practiceRouter') 
const resultRouter = require('./router/resultRouter') 
const notificationRouter = require('./router/notificationRouter') 
const blogRouter = require('./router/blogRouter') 
const featuredCategoryRouter = require('./router/featuredCategoryRouter') 
const searchCategoryRouter = require('./router/searchCategoryRouter') 
 

app.use("/api/v1", userRouter)
app.use("/api/v1", messageRouter)
app.use("/api/v1", courseRouter)
app.use("/api/v1", assignmentRouter)
app.use("/api/v1", syllabusRouter)
app.use("/api/v1", videoLectureRouter)
app.use("/api/v1", enrolledCourseRouter)
app.use("/api/v1", classRouter)
app.use("/api/v1", attendenceRouter)
app.use("/api/v1", bannerRouter)
app.use("/api/v1", practiceRouter)
app.use("/api/v1", resultRouter)
app.use("/api/v1", notificationRouter)
app.use("/api/v1", blogRouter)
app.use("/api/v1", featuredCategoryRouter)
app.use("/api/v1", searchCategoryRouter)
 

 
 
 
 app.use(error)
module.exports = app
