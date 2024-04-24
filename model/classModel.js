const mongoose = require('mongoose')
 
const classSchema = new mongoose.Schema({
    class:{
        type: String,
        unique:true,
        required:true
    },
    subjects:[{
        type:mongoose.Schema.ObjectId,
        ref:"course",
        require:true
    }]
})

module.exports = mongoose.model('class', classSchema)

