const express = require("express");
const router = express.Router();
const resultsModel = require("../model/resultsModel");
const catchAsyncErorr = require("../middleware/catchAsyncErorr");
const practiceModel = require("../model/practiceModel");
 


// Get Result API
exports.getResult = catchAsyncErorr(async (req, res) => {
  const { practiceSetId } = req.body;

  const result = await resultsModel.findOne({practiceSetId});

  if (!result) {
    return res.status(404).json({ status: "error", message: "Result not found" });
  }

  res.status(200).json({ status: "success", data: result });
});


// Create Result API
exports.createResult = catchAsyncErorr(async (req, res) => {
  const { practiceSetId, studentId } = req.body;

  const newResult = await resultsModel.create({
    practiceSetId,
    studentId
  });

  res.status(201).json({ status: "success", data: newResult });
});


// Add Answer API
exports.addAnswer = catchAsyncErorr(async (req, res) => {
  const { resultId, questionId, submited_answers } = req.body;

  const updatedResult = await resultsModel.findByIdAndUpdate(
    resultId,
    { $push: { submited_answers: { questionId, submited_answers } } },
    { new: true }
  );

  if (!updatedResult) {
    return res.status(404).json({ status: "error", message: "Result not found" });
  }

  res.status(200).json({ status: "success", data: updatedResult });
});


// Remove Answer API
exports.removeAnswer = catchAsyncErorr(async (req, res) => {
  const { resultId, questionId } = req.body;

  const updatedResult = await resultsModel.findByIdAndUpdate(
    resultId,
    { $pull: { submited_answers: { questionId } } },
    { new: true }
  );

  if (!updatedResult) {
    return res.status(404).json({ status: "error", message: "Result not found" });
  }

  res.status(200).json({ status: "success", data: updatedResult });
});


// Final Update API
exports.finalUpdate = catchAsyncErorr(async (req, res) => {
  const { resultId } = req.body;

  const result = await resultsModel.findById(resultId);
  if (!result) {
    return res.status(404).json({ status: "error", message: "Result not found" });
  }

  const practiceSet = await practiceModel.findById(result.practiceSetId);
  if (!practiceSet) {
    return res.status(404).json({ status: "error", message: "Practice set not found" });
  }

  let correctCount = 0;
  let wrongCount = 0;
  let unattemptedCount = 0;

  for (const submittedAnswer of result.submited_answers) {
    const question = practiceSet.questions.find(q => q._id.toString() === submittedAnswer.questionId.toString());
    if (!question) {
      unattemptedCount++;
      continue;
    }

    if (submittedAnswer.submited_answers === question.answer) {
      correctCount++;
    } else {
      wrongCount++;
    }
  }

  result.result = { currect: correctCount, wrong: wrongCount, unattempted: unattemptedCount };
  await result.save();

  res.status(200).json({ status: "success", data: result });
});


// Delete Result API
exports.deleteResult = catchAsyncErorr(async (req, res) => {
  const { resultId } = req.body;

  const deletedResult = await resultsModel.findByIdAndDelete(resultId);
  if (!deletedResult) {
    return res.status(404).json({ status: "error", message: "Result not found" });
  }

  res.status(200).json({ status: "success", message: "Result deleted successfully" });
});
