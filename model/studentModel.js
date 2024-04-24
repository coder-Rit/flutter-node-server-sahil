const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    unique: [true, "Phone number already in use"],
    match: /^[0-9]{10}$/,
  },
  password: {
    type: String,
    required: true,
    select: false,
    minLength: [6, "Password is too short"],
    maxLength: [12, "Password is too big"],
  },
  type: {
    type: String,
    require: true,
  },
  followedClass:{
    type: String,
  },
  grade: {
    type: String,
  },
  stream: {
    type: String,
  },
  checkBoxDaata: {
    acadmics: {
      type: Boolean,
      default: false,
    },
    competitiveExams: {
      type: Boolean,
      default: false,
    },
    skillDevelopment: {
      type: Boolean,
      default: false,
    },
    digitalCompetancy: {
      type: Boolean,
      default: false,
    },
    mentoringGuidance: {
      type: Boolean,
      default: false,
    },
    examUpdate: {
      type: Boolean,
      default: false,
    },
  },
});

// converting password into hash
studentSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// compairing password
studentSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//josn web token genrator
studentSchema.methods.getJWTtoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECREATE, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("student", studentSchema);
