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

// get video lecuters  API
exports.getVideoLecture = catchAsyncErorr(async (req, res, next) => {
  const { lessonId } = req.body;

  const videoLectureData = await videoLectureModel.findOne({lessonId});

  if (!videoLectureData) {
    return next(new ErrorHandler("Unable to find lesson details", 404));
  }

  res.status(200).json({
    status: "success",
    data: videoLectureData,
  });
});


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


// set complete true
exports.completeVideoLecture = catchAsyncErorr(async (req, res, next) => {
  const { videoLecuterId, chapterName } = req.body;

  const videoLectureData = await videoLectureModel.findOneAndUpdate(
    { _id:videoLecuterId, "chapters.chapterName": chapterName },
    {
      $set: {
        "chapters.$.completed": true,
      },
    },
    { new: true }
  );

  if (!videoLectureData) {
    return next(new ErrorHandler("Unable to update module", 404));
  }
  res.status(200).json({
    status: "success",
    data: videoLectureData,
  });
});