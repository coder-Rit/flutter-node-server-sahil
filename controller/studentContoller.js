
const catchAsyncErorr = require("../middleware/catchAsyncErorr");
const ErrorHandler = require("../utils/errorHandler");
const studentModel = require("../model/studentModel");

const sendJwt = require("../utils/sendJwt");
const {  generateRandomString } = require("../utils/functions");

 

 
// Updated signUp function to handle errors properly
exports.student_signUp = catchAsyncErorr(async (req, res, next) => {

   
  let userData = {
    ...req.body,
    
  };

  const newAcc = await studentModel.create(userData);
  sendJwt(newAcc, res, "Account created successfully", 201, req);
});

// loged in
exports.student_login = catchAsyncErorr(async (req, res, next) => {
  const { password, phone } = req.body;

  const user = await studentModel.findOne({ phone }).select("+password");

  if (!user) {
    return next(new ErrorHandler("User does not exist", 404));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Incorrect password", 401));
  }

  sendJwt(user, res, "Logged in successfully", 200, req);
});

// Reset Password
exports.student_resetPassword = catchAsyncErorr(async (req, res, next) => {
  const user = await studentModel.findOne({ phone: req.body.phone });
  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not password", 400));
  }

  user.password = req.body.password;

  await user.save();

  sendJwt(user, res, "Password reset successfully", 200, req);
});



//  follow class belongs to student
exports.followClass = catchAsyncErorr(async (req, res, next) => {
  const { className, studentId } = req.body;

  const student = await studentModel.findByIdAndUpdate(studentId,{
    followedClass: className,
  });

  res.status(200).json({
    status: "success",
    data: student,
  });
});

 
