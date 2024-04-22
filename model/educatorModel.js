const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const educatorSchema = new mongoose.Schema({
    educator_id:{
        type: String,
        unique:[true,"Something went wrong please try again"],
        required:true
    },
    name:{
        type: String, 
        required:true
    },
    phone: {
        type: Number, 
        unique:[true,"Phone number already in use"],
        match: /^[0-9]{10}$/
    },
    password: {
        type: String,
        required: true,
        select: false,
        minLength: [6, "Password is too short"],
        maxLength: [12, "Password is too big"],
    }, 
})

// converting password into hash
educatorSchema.pre("save", async function () {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// compairing password
educatorSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

//josn web token genrator
educatorSchema.methods.getJWTtoken =  function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECREATE, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

module.exports = mongoose.model('educator', educatorSchema)

