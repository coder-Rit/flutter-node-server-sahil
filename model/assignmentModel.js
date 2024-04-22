const mongoose = require('mongoose')
 
const assignmentSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    place:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        required:true
    },
    time:{
        type: Number, // in mili-seconds
        required:true
    },
    repeat:{
        type: Number,
        required:true,
        min: 0
    },
    url:{
        type: String,
        // match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/
    },
    note:{
        type: String,
    },
    courseId:{
        type:mongoose.Types.ObjectId,
        require:true,
    },
    stream:{
        type:String
    },
    dateOfPublish:{
        type:Date,
        default:Date.now()
    }

})

 

module.exports = mongoose.model('assignment', assignmentSchema)

