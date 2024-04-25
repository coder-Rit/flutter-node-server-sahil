const express = require("express");
const router = express.Router();
const practiceModel = require("../model/practiceModel");
const catchAsyncErorr = require("../middleware/catchAsyncErorr");

// Create practice set

exports.createPracticeSet = catchAsyncErorr(async (req, res,next) => {
  const { courseId, Title, description, imgUrl, timer, questions } = req.body;
  const newPracticeSet = await practiceModel.create({
    courseId,
    Title,
    description,
    imgUrl,
    timer,
    questions,
  });
  res.status(201).json({ status: "success", data: newPracticeSet });
});


exports.getPracticeSet = catchAsyncErorr(async (req, res) => {
    const { courseId } = req.body; // Assuming courseId is passed as a query parameter
    const practiceSet = await practiceModel.find({ courseId });

    if (!practiceSet) {
        return next(new ErrorHandler("Practice set not found", 404));

    }

    res.status(200).json({ status: 'success', data: practiceSet });
  })



// Add question to practice set
exports.addQuestions = catchAsyncErorr(async (req, res,next) => {
  const { practiceSetId, questionData } = req.body;
  const practiceSet = await practiceModel.findById(practiceSetId);

  if (!practiceSet) {
    
      return next(new ErrorHandler("Practice set not found", 404));
  }

  practiceSet.questions.push(questionData);
  await practiceSet.save();
  res.status(200).json({ status: "success", data: practiceSet });
});

// Remove question from practice set
exports.removeQuestions = catchAsyncErorr(async (req, res,next) => {
  const { questionId,practiceSetId } = req.body;
  const practiceSet = await practiceModel.findByIdAndUpdate(
    practiceSetId,
    { $pull: { questions: { _id: questionId } } },
    { new: true }
  );

  if (!practiceSet) {
   
    return next(new ErrorHandler("Practice set not found", 404));


  }

  res.status(200).json({ status: "success", data: practiceSet });
});

// Update practice set
exports.updatePracticeSet = catchAsyncErorr(async (req, res,next) => {
  const { practiceSetId, ...updateData } = req.body;
  const updatedPracticeSet = await practiceModel.findByIdAndUpdate(
    practiceSetId,
    updateData,
    { new: true }
  );

  if (!updatedPracticeSet) {
     
      return next(new ErrorHandler("Practice set not found", 404));

  }

  res.status(200).json({ status: "success", data: updatedPracticeSet });
});

// Delete practice set
exports.deletePracticeSet = catchAsyncErorr(async (req, res,next) => {
  const { id } = req.body;
  await practiceModel.findByIdAndDelete(id);
  res
    .status(200)
    .json({ status: "success", message: "Practice set deleted successfully" });
});
