const mongoose = require("mongoose");

const resultsSchema = new mongoose.Schema({
  practiceSetId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  studentId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  result: {
    currect: {
      type: Number,
      default:0,
      required: true,
    },
    wrong: {
      type: Number,
      default:0,
      required: true,
    },
    unattempted: {
      type: Number,
      default:0,
      required: true,
    },
  },
  submited_answers: [
    {
      questionId: { type: mongoose.Schema.ObjectId, required: true },
      submited_answers: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("results", resultsSchema);
