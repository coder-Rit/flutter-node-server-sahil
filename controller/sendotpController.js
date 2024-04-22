var unirest = require("unirest");
const catchAsyncErorr = require("../middleware/catchAsyncErorr");
const fs = require("fs");
const ErrorHandler = require("../utils/errorHandler");
const path = require("path");

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000);
}

function saveOpt(way, otp, res, next) {
  const otpData = { way, otp, createdAt: new Date().getTime() };

  const directoryPath = path.join(__dirname, "../otp-storage");
  const filePath = path.join(directoryPath, `${way}.json`);

  console.log(filePath);

  // Store OTP with email in a file
  fs.writeFile(filePath, JSON.stringify(otpData), (err) => {
    if (err) {
      return next(new ErrorHandler("Failed to store OTP", 500));
    }
  });
} 

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


// send OTP using phone
exports.sendOTP_phone = catchAsyncErorr(async (req, res, next) => {
  // Replace 'YOUR_API_KEY' with your actual Fast2SMS API key i
  const otp = generateOTP();

  // Define the message and phone number

  const apiEndpoint = "https://www.fast2sms.com/dev/bulkV2";

  const apikey = process.env.FAST2SMS_API;

  const route = "otp";
  const phone = req.body.phone;

  var req = unirest("GET", apiEndpoint);

  req.query({
    authorization: apikey,
    variables_values: otp,
    route: route,
    numbers: phone,
  });

  req.headers({
    "cache-control": "no-cache",
  });

  req.end(function (res) {
    if (res.error) throw new Error(res.error);
    saveOpt(phone, otp, res, next);
  });

  res.status(200).json({
    msg: "OPT sended",
    status:"success"
  });
});

// verfy a phone number
exports.verfiyPhoneusingOTP = catchAsyncErorr(async (req, res, next) => {
  verifyOTP(req, res, async (err) => {
    if (err) {
      return next(err); // Pass any errors from verifyOTP to the error handler
    }
    res.status(200).json({
      msg: "OTP Verified successfully",
      status: "success",
    });
  });
});