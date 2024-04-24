const catchAsyncErorr = require("../middleware/catchAsyncErorr");
const ErrorHandler = require("../utils/errorHandler");
const enrolledCoursesModel = require("../model/enrolledCoursesModel");

//  create enrolled cousrs  API
exports.createEnrollCourse = catchAsyncErorr(async (req, res, next) => {
  const { studentId, courseId, student_id } = req.body;

  const enrolledCourse = await enrolledCoursesModel.create({
    studentId,
    courseId,
    student_id,
    completedModules: [],
  });

  if (!enrolledCourse) {
    return next(new ErrorHandler("Unable to enrolle into a course", 500));
  }

  res.status(200).json({
    status: "success",
    data: enrolledCourse,
  });
});

// get enrolled cousrs  API
exports.getEnrolledCourses = catchAsyncErorr(async (req, res, next) => {
  const { studentId, courseId, student_id } = req.body;

  const enrolledCourses = await enrolledCoursesModel.find({
    studentId,
    courseId,
    student_id,
  });

  res.status(200).json({
    status: "success",
    data: enrolledCourses,
  });
});

// set complete true
exports.CompeletedlessonsMark = catchAsyncErorr(async (req, res, next) => {
    const { enrolledCourseId, moduleId, lessonId } = req.body;
  
    if (!enrolledCourseId) {
      return next(new ErrorHandler("Please mention enrolled course ID", 404));
    }
  
    let enrolledCourse = await enrolledCoursesModel.findById(enrolledCourseId);
  
    if (!enrolledCourse) {
      return next(new ErrorHandler("Enrolled course not found", 404));
    }
  
    // Find the index of the module within completedModules array
    const moduleIndex = enrolledCourse.completedModules.findIndex(
      (module) => module.moduleId.toString() === moduleId
    );
  
    // If module not found, create a new module
    if (moduleIndex === -1) {
      const newModule = {
        moduleId,
        completedLessonsId: [lessonId],
      };
  
      enrolledCourse.completedModules.push(newModule);
    } else {
      // Check if lessonId already exists in completedLessonsId array
      const lessonExists = enrolledCourse.completedModules[moduleIndex].completedLessonsId.includes(
        lessonId
      );
  
      if (lessonExists) {
        return next(new ErrorHandler("Lesson already marked as completed", 400));
      }
  
      // Add lessonId to completedLessonsId array for the existing module
      enrolledCourse.completedModules[moduleIndex].completedLessonsId.push(lessonId);
    }
  
    // Save the updated document back to the database
    enrolledCourse = await enrolledCourse.save();
  
    res.status(200).json({
      status: "success",
      data: enrolledCourse,
    });
  });
  
  
  