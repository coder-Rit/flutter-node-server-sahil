
const catchAsyncErorr = require("../middleware/catchAsyncErorr");
const assignmentModel = require("../model/assignmentModel");
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

 