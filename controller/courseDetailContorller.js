const catchAsyncError = require("../middleware/catchAsyncErorr");
const courseDetailsModel = require("../model/courseDetailsModel");
const ErrorHandler = require("../utils/errorHandler");

// Create CourseDetail API
exports.createCourseDetail = catchAsyncError(async (req, res, next) => {
  const courseDetail = await courseDetailsModel.create(req.body);
  res.status(201).json({
    status: "success",
    data: courseDetail,
  });
});

// Update CourseDetail API
exports.updateCourseDetail = catchAsyncError(async (req, res, next) => {
  const { _id } = req.body;
  let newBody = req.body;
  delete newBody._id;
  const courseDetail = await courseDetailsModel.findByIdAndUpdate(
    _id,
    newBody,
    { new: true }
  );
  if (!courseDetail) {
    return next(new ErrorHandler("CourseDetail not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: courseDetail,
  });
});

// Delete CourseDetail API
exports.deleteCourseDetail = catchAsyncError(async (req, res, next) => {
  const { _id } = req.body;
  const courseDetail = await courseDetailsModel.findByIdAndDelete(_id);
  if (!courseDetail) {
    return next(new ErrorHandler("CourseDetail not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: courseDetail,
  });
});
