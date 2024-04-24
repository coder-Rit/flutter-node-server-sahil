const mongoose = require('mongoose')
 
const courseSchema = new mongoose.Schema({
    thumbnailUrl:{
        type: String,
        required:true
    },
    title:{
        type:String,
        unique:[true, "This course title is already taken"],
        require:true,
    },
    category:{
        type:String,
        require:true,
    },
    rating:{
        type:String,
        require:true,
        max:[5,"Rating canot be more than 5"],
        min:[0,"Rating canot be less than 0"],
        default:0
    },
    reviews:{
        type:Number,
        require:true,
        min:[0,"reviews canot be negative"],
        default:0
    },
    enrolement:{
        type:Number,
        require:true,
        min:[0,"enrollement canot be negative"],
        default:0
    },
    type:{
        type:String,
        require:true,
        enum:["free","paid"]
    },
    language:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
        min:[0,"Rating canot be less than 0"], // if course is free put price =  0
    },
    recommended:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('course', courseSchema)

