const mongoose = require("mongoose");

const practiceSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  timer: {
    type: Number, // timestamp
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      option_1: {
        type: String,
        required: true,
      },
      option_2: {
        type: String,
        required: true,
      },
      option_3: {
        type: String,
        required: true,
      },
      option_4: {
        type: String,
        required: true,
      },
      answer:{
        type: String,
        required: true,
        select:false,
      }
    },
  ],
});

module.exports = mongoose.model("practiceSet", practiceSchema);
