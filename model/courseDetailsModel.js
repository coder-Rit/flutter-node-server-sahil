const mongoose = require('mongoose')
 
const courseDetailSchema = new mongoose.Schema({
    courseId:{
        type:mongoose.Types.ObjectId,
        ref:"course",
        require:true,
    },
    discription:{
        type: String,
        required:true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"educator",
        require:true,
    },
    level:{
        type:String,
        require:true,
        enum:["beginner","moderate","advance"]
    },
    skills:[{
        type:String,
        require:true,
    }],
})

module.exports = mongoose.model('courseDetail', courseDetailSchema)

