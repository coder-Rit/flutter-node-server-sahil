const catchAsyncError = require("../middleware/catchAsyncErorr");
const courseModel = require("../model/courseModel"); // Assuming the course model is in a "models" directory

// Reference to the provided educator APIs for context
const ErrorHandler = require("../utils/errorHandler");

// find Course by search API
exports.searchCourse = catchAsyncError(async (req, res, next) => {
  const { regexValue } = req.body;

  const regex = new RegExp(regexValue, "i");
  const courses = await courseModel.find({
    $or: [{ title: { $regex: regex } }, { category: { $regex: regex } }],
  }).exec();

  res.status(200).json({
    status: "success",
    data: courses,
  });
});

// find Course by catorgy API
exports.searchCourseByCategory = catchAsyncError(async (req, res, next) => {
  const { category } = req.body;
  const regex = new RegExp(category, "i");
  const courses = await courseModel.find({  category: { $regex: regex }  }).exec();

  res.status(200).json({
    status: "success",
    data: courses,
  });
});


// Create Course API
exports.createCourse = catchAsyncError(async (req, res, next) => {
  const course = await courseModel.create(req.body);
  res.status(201).json({
    status: "success",
    data: course,
  });
});

// Update Course API
exports.updateCourse = catchAsyncError(async (req, res, next) => {
  const { _id } = req.body;
  let newBody = req.body;
  delete newBody._id;
  const course = await courseModel.findByIdAndUpdate(_id, newBody, {
    new: true,
  });
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: course,
  });
});

// Delete Course API
exports.deleteCourse = catchAsyncError(async (req, res, next) => {
  const { _id } = req.body;
  const course = await courseModel.findByIdAndDelete(_id);
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: course,
  });
});

// Increment Review API
exports.incrementReview = catchAsyncError(async (req, res, next) => {
  const { _id } = req.body;
  const course = await courseModel.findByIdAndUpdate(
    _id,
    { $inc: { reviews: 1 } },
    { new: true }
  );
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: course,
  });
});

// Decrement Review API
exports.decrementReview = catchAsyncError(async (req, res, next) => {
  const { _id } = req.body;
  const course = await courseModel.findByIdAndUpdate(
    _id,
    { $inc: { reviews: -1 } },
    { new: true }
  );
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: course,
  });
});

// Increment enrolement API
exports.incrementEnrolement = catchAsyncError(async (req, res, next) => {
  const { _id } = req.body;
  const course = await courseModel.findByIdAndUpdate(
    _id,
    { $inc: { enrolement: 1 } },
    { new: true }
  );
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: course,
  });
});

// Decrement enrolement API
exports.decrementEnrolement = catchAsyncError(async (req, res, next) => {
  const { _id } = req.body;
  const course = await courseModel.findByIdAndUpdate(
    _id,
    { $inc: { enrolement: -1 } },
    { new: true }
  );
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: course,
  });
});

// Update Rating API
exports.updateRating = catchAsyncError(async (req, res, next) => {
  const { _id, newRating } = req.body;
  const course = await courseModel.findByIdAndUpdate(
    _id,
    { rating: newRating },
    { new: true }
  );
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: course,
  });
});
