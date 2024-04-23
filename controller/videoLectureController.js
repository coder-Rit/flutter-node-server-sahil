const catchAsyncErorr = require("../middleware/catchAsyncErorr");
const SyllabusModel = require("../model/syllabusModel");
const ErrorHandler = require("../utils/errorHandler");
const videoLectureModel = require("../model/videoLectureModel");

async function idModuleFound(courseId, moduleName, next) {
  const isModuleExist = await SyllabusModel.findOne({
    courseId,
    "modules.name": moduleName,
  });

  if (!isModuleExist) {
    return next(new ErrorHandler("Module not found", 404));
  }
}

// update video lecuters  API
exports.updateVideoLecture = catchAsyncErorr(async (req, res, next) => {
  const { videoLecuterId, data } = req.body;

  const videoLectureData = await videoLectureModel.findByIdAndUpdate(videoLecuterId, data);

  res.status(200).json({
    status: "success",
    data: videoLectureData,
  });
});


// delete video lecuters  API
exports.removeVideoLecture = catchAsyncErorr(async (req, res, next) => {
  
  const { videoLecuterId } = req.body;

  const videoLectureData = await videoLectureModel.findByIdAndDelete(videoLecuterId);

  res.status(200).json({
    status: "success",
    data: videoLectureData,
  });
});
