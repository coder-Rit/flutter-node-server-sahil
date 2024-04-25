const mongoose = require("mongoose");

const attendenceSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.ObjectId,
    ref: "course",
    required: true,
  },
  class:{
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  attendenceStatusList: [
    {
      studentId: {
        type: mongoose.Schema.ObjectId,
        ref: "student",
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("attendence", attendenceSchema);
