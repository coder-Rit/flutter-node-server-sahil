const catchAsyncErorr = require("../middleware/catchAsyncErorr");
const classModel = require("../model/classModel"); // Assuming the course model is in a "models" directory

//get class assignment

exports.getClasses = catchAsyncErorr(async (req, res, next) => {
  const classes = await classModel.find({
  }).populate("subjects", "subjectName");

  res.status(200).json({
    status: "success",
    data: classes,
  });
});

exports.createClass = catchAsyncErorr(async (req, res, next) => {
  const { className, subjects } = req.body;

  const newClass = await classModel.create({
    class: className,
    subjects,
  });

  res.status(201).json({
    status: "success",
    data: newClass,
  });
});



exports.addSubjectToClass = catchAsyncErorr(async (req, res, next) => {
  const { classId, subjectId } = req.body;

  const updatedClass = await classModel.findByIdAndUpdate(
    classId,
    { $addToSet: { subjects: subjectId } },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: updatedClass,
  });
});

exports.removeSubjectFromClass = catchAsyncErorr(async (req, res, next) => {
  const { classId, subjectId } = req.body;

  const updatedClass = await classModel.findByIdAndUpdate(
    classId,
    { $pull: { subjects: subjectId } },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: updatedClass,
  });
});

exports.deleteClass = catchAsyncErorr(async (req, res, next) => {
  const { classId } = req.body;

  const deletedClass = await classModel.findByIdAndDelete(classId);

  res.status(200).json({
    status: "success",
    message: "Class deleted successfully",
    data: deletedClass,
  });
});
