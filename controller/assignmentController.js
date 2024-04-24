
const catchAsyncErorr = require("../middleware/catchAsyncErorr");
const assignmentModel = require("../model/assignmentModel");
const enrolledCoursesModel = require("../model/enrolledCoursesModel");
const ErrorHandler = require("../utils/errorHandler");
 
 
 

//get assingment all assignment 

exports.getAllAssingment = catchAsyncErorr(async (req, res, next) => {

    const {courseId} = req.body

    const assignments = await assignmentModel.find({courseId});
    res.status(200).json({
        status: "success",
        data:assignments
      });
});
 
// create assingment
exports.createAssingment = catchAsyncErorr(async (req, res, next) => {
    const assignment = await assignmentModel.create(req.body);
    res.status(201).json({
        status: "success",
        data:assignment
      });
});
// Updated assingment
exports.updateAssingment = catchAsyncErorr(async (req, res, next) => {

    const { _id } = req.body;
    let newBody = req.body 
    delete newBody._id

    const assignment = await assignmentModel.findByIdAndUpdate(_id, newBody, {
      new: true,
    });
    if (!assignment) {
        return next( new ErrorHandler('Assignment not found',404))
    }
    res.status(200).json({
        status: "success",
        data:assignment
      });

});

// delete assingment
exports.deleteAssingment = catchAsyncErorr(async (req, res, next) => {

    const { _id } = req.body;
    const assignment = await assignmentModel.findByIdAndDelete(_id);
    if (!assignment) {
        return next( new ErrorHandler('Assignment not found',404))

    }
    
    res.status(200).json({
        status: "success",
        data:{}
      });

});




exports.assignmentCompletionMark = catchAsyncErorr(async (req, res, next) => {
  const { courseId, student_id, studentId, moduleId, lessonId, assignmentCompletionBody } = req.body;
  const { assignmentId, assignmentUrl } = assignmentCompletionBody;

  if (!courseId || !student_id || !studentId || !moduleId || !lessonId || !assignmentId || !assignmentUrl) {
    return next(new ErrorHandler("Incomplete data provided", 400));
  }

  let enrolledCourse = await enrolledCoursesModel.findOne({
    courseId,
    student_id,
    studentId,
   });

  if (!enrolledCourse) {
    return next(new ErrorHandler("Enrolled course not found or module not completed", 404));
  }

  // Find the index of the module within completedAssignments array
  const moduleIndex = enrolledCourse.completedAssignments.findIndex(
    (module) => module.moduleId.toString() === moduleId
  );

  // If module not found, create a new module
  if (moduleIndex === -1) {
    const newModule = {
      moduleId,
      completedAssignment: [{ lessonId, assignmentId, assignmentUrl }],
    };

    enrolledCourse.completedAssignments.push(newModule);
  } else {
    // Check if assignmentId already exists in completedAssignment array
    const assignmentExists = enrolledCourse.completedAssignments[moduleIndex].completedAssignment.some(
      (assignment) => assignment.assignmentId.toString() === assignmentId
    );

    if (assignmentExists) {
      return next(new ErrorHandler("Assignment already marked as completed", 400));
    }

    // Add assignment details to completedAssignment array for the existing module
    enrolledCourse.completedAssignments[moduleIndex].completedAssignment.push({
      lessonId,
      assignmentId,
      assignmentUrl,
    });
  }

  // Save the updated document back to the database
  enrolledCourse = await enrolledCourse.save();

  res.status(200).json({
    status: "success",
    data: enrolledCourse,
  });
});

exports.removeCompletedAssignment = catchAsyncErorr(async (req, res, next) => {
  const { courseId, student_id, studentId, moduleId, assignmentId } = req.body;

  if (!courseId || !student_id || !studentId || !moduleId || !assignmentId) {
    return next(new ErrorHandler("Incomplete data provided", 400));
  }

  let enrolledCourse = await enrolledCoursesModel.findOne({
    courseId,
    student_id,
    studentId,
  });

  if (!enrolledCourse) {
    return next(new ErrorHandler("Enrolled course not found", 404));
  }

  // Find the index of the module within completedAssignments array
  const moduleIndex = enrolledCourse.completedAssignments.findIndex(
    (module) => module.moduleId.toString() === moduleId
  );

  if (moduleIndex === -1) {
    return next(new ErrorHandler("Module not found or assignment not completed", 404));
  }

  // Find the index of the assignment within completedAssignment array
  const assignmentIndex = enrolledCourse.completedAssignments[moduleIndex].completedAssignment.findIndex(
    (assignment) => assignment.assignmentId.toString() === assignmentId
  );

  if (assignmentIndex === -1) {
    return next(new ErrorHandler("Assignment not found or assignment not completed", 404));
  }

  // Remove the assignment from completedAssignment array
  enrolledCourse.completedAssignments[moduleIndex].completedAssignment.splice(assignmentIndex, 1);

  // Save the updated document back to the database
  enrolledCourse = await enrolledCourse.save();

  res.status(200).json({
    status: "success",
    message: "Completed assignment removed successfully",
    data: enrolledCourse,
  });
});


 