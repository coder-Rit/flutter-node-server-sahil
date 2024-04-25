const catchAsyncErorr = require("../middleware/catchAsyncErorr");
const attendaceModel = require("../model/attendaceModel");

//  get attendence
exports.getAttendnce = catchAsyncErorr(async (req, res, next) => {

  const {subjectId, from, to} = req.body;

  const fromDate = new Date(parseInt(from));
  const toDate = new Date(parseInt(to));

  const attendanceRecords = await attendaceModel.find({
    subjectId,
    date: {
      $gte: fromDate,
      $lte: toDate,
    },
  });
  res
    .status(200)
    .json({ status: "success", data: attendanceRecords });
});

// create update attendence
exports.updateAttendence = catchAsyncErorr(async (req, res, next) => {
  const { subjectId, class: className, date, attendenceStatusList } = req.body;

  // Check if attendance already exists for the given subjectId, class, and date
  let existingAttendance = await attendaceModel.findOne({
    subjectId,
    class: className,
    date,
  });

  if (existingAttendance) {
    // Attendance already exists, update it
    existingAttendance.attendenceStatusList = attendenceStatusList;
    await existingAttendance.save();
    res.status(200).json({
      status: "success",
      data: existingAttendance,
    });
  } else {
    // Attendance doesn't exist, create a new one
    const newAttendance = await attendaceModel.create(req.body);
    res.status(201).json({
      status: "success",
      data: newAttendance,
    });
  }
});

// delete attendence
exports.deleteAttendence = catchAsyncErorr(async (req, res, next) => {
  const {attendanceId} = req.body;
  await attendaceModel.findByIdAndDelete(attendanceId);
  res
    .status(200)
    .json({ status: "success", data: {} });
});
