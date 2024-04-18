const fs = require("fs");
const path = require("path");

const catchAsyncErorr = require("../middleware/catchAsyncErorr");
const userModel = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendJwt = require("../utils/sendJwt");

// these fuction are in

// Updated verifyOTP function
function verifyOTP(req, res, next) {
  const { phone, otp } = req.body;
  if (!otp || !phone) {
    return next(new ErrorHandler("Email or phone and OTP are required", 400));
  }

  const directoryPath = path.join(__dirname, "../otp-storage");
  const filePath = path.join(directoryPath, `${phone}.json`);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      return next(new ErrorHandler("OTP Expired or not found", 404));
    }
    const otpData = JSON.parse(data);

    console.log(otpData.otp, otp);
    console.log(new Date().getTime() - otpData.createdAt >= 300000);

    const isOtpValid = otpData.otp === otp;
    const isOtpExpired = new Date().getTime() - otpData.createdAt >= 800000; // 5 minutes

    fs.unlink(filePath, (err) => {
      if (err) {
        console.log("Failed to delete OTP file:", err);
      }
      console.log(isOtpValid, isOtpExpired);
      if (!isOtpValid || isOtpExpired) {
        return next(new ErrorHandler("Invalid or expired OTP", 400));
      }
      // Call next only if OTP is valid and not expired
      next();
    });
  });
}

function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// verfy a phone number
exports.verfiyPhoneusingOTP = catchAsyncErorr(async (req, res, next) => {
  verifyOTP(req, res, async (err) => {
    if (err) {
      return next(err); // Pass any errors from verifyOTP to the error handler
    }
    res.status(200).json({
      msg: "OTP Verified successfully",
      status:"success"
    });
  });
});

// Updated signUp function to handle errors properly
exports.signUp = catchAsyncErorr(async (req, res, next) => {

  const student_id = `${req.body.name.split(" ")[0]}_${generateRandomString(
    6
  )}`;
  let userData = {
    ...req.body,
    student_id,
  };

  const newAcc = await userModel.create(userData);
  sendJwt(newAcc, res, "Account created successfully", 201, req);
});


// loged in
exports.login = catchAsyncErorr(async (req, res, next) => {
  const { password, student_id } = req.body;

  const user = await userModel
    .findOne({  student_id })
    .select("+password");

  if (!user) {
    return next(new ErrorHandler("User does not exist", 404));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Incorrect password", 401));
  }

  sendJwt(user, res, "Logged in successfully", 200, req);
});

// log out
exports.logOut = catchAsyncErorr((req, res, next) => {
  res
    .clearCookie("token", {
      expire: new Date(Date.now() - 1000),
      httpOnly: true,
    })
    .json({
      msg: "logout successfully",
      logOut: true,
      status:"success"
    });
});
