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

 