const fs = require("fs");

const catchAsyncErorr = require("../middleware/catchAsyncErorr");
const userModel = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendJwt = require("../utils/sendJwt");

function verifyOTP(req, res, next) {
  const { email, phone, otp } = req.body;

  if (!(email || phone) || !otp) {
    return next(new ErrorHandler("Email and OTP are required", 400));
  }

  const way = email || phone;

  console.log(way);

  // Read the OTP file
  fs.readFile(`./otp-storage/${way}.json`, (err, data) => {
    if (err) {
      return next(new ErrorHandler("OTP Expired", 500));
    }
    const otpData = JSON.parse(data);
    console.log(otpData);
    // Check if OTP is correct and not expired (e.g., 5 minutes)
    if (
      otpData.otp === otp &&
      new Date().getTime() - otpData.createdAt < 800000
    ) {
      fs.unlink(`./otp-storage/${way}.json`, (err) => {
        // Delete the OTP file after verification
        if (err) {
          return next(new ErrorHandler("Failed to delete OTP", 500));
        }
      });
    } else {
      return next(new ErrorHandler("Invalid or expired OTP", 400));
    }
  });
}

// signUp
exports.signUp = catchAsyncErorr(async (req, res, next) => {
  verifyOTP(req, res, next);

  let a = req.body;
  delete a.OTP;

  const newAcc = await userModel.create(a);
  sendJwt(newAcc, res, "Account is crated successfully", 201, req);
});

// loged in
exports.login = catchAsyncErorr(async (req, res, next) => {
  const { email, password, phone } = req.body;

  let way;

  if (email) {
    way = {
      type: "email",
      selector: email,
    };
  } else if (phone) {
    way = {
      type: "email",
      selector: email,
    };
  } else {
    return next(new ErrorHandler(`Please provide credentials`, 400));
  }

  const user = await userModel.findOne({ [way.type]:way.selector }).select("+password");
  if (!user) {
    return next(new ErrorHandler("User does not exist", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Wrong Password", 404));
  }
  console.log(user);

  sendJwt(user, res, "LogeIn Successfully", 200, req);
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
    });
});
