const catchAsyncErorr = require("../middleware/catchAsyncErorr");
const SyllabusModel = require("../model/syllabusModel");
const ErrorHandler = require("../utils/errorHandler");


async function idModuleFound(courseId,moduleName,next) {

  const isModuleExist = await SyllabusModel.findOne(
    {courseId, "modules.name": moduleName}
  )

  if (!isModuleExist) {
    return next(new ErrorHandler("Module not found", 404));
  }

  
}

// Create Module API
exports.createSyllabus = catchAsyncErorr(async (req, res, next) => {
  const { courseId } = req.body;
  const Syllabus = await SyllabusModel.create({
    courseId,
    modules: [],
  });
  res.status(201).json({
    status: "success",
    data: Syllabus,
  });
});

// get Syllabus API
exports.getSyllabus = catchAsyncErorr(async (req, res, next) => {
  const { courseId } = req.body;
  const Syllabus = await SyllabusModel.find({
    courseId,
  });
  res.status(201).json({
    status: "success",
    data: Syllabus,
  });
});

// Add module API
exports.addModule = catchAsyncErorr(async (req, res, next) => {
  const { courseId, newModule } = req.body;

  const Syllabus = await SyllabusModel.findOneAndUpdate(
    { courseId },
    { $push: { modules: newModule } },
    {new:true}
  );

  if (!Syllabus) {
    return next(new ErrorHandler("Unable to create module", 500));
  }
  res.status(200).json({
    status: "success",
    data: Syllabus,
  });
});

// Delete Module API
exports.removeModule = catchAsyncErorr(async (req, res, next) => {
  const { moduleName,courseId } = req.body;
  const Syllabus = await SyllabusModel.findOneAndUpdate(
    { courseId },
    { $pull: { "modules":{ name:moduleName }} },
    {new:true}
  );

  if (!Syllabus) {
    return next(new ErrorHandler("Module not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: Syllabus,
  });
});


// Edit Module Details API
exports.editModule = catchAsyncErorr(async (req, res, next) => {
  const { courseId,moduleName, newModuleDetails } = req.body;
  const {newName, newDescription}= newModuleDetails

  
  await idModuleFound(courseId,moduleName,next)

  const Syllabus = await SyllabusModel.findOneAndUpdate(
    {courseId, "modules.name": moduleName},
    { $set: { "modules.$.name": newName, "modules.$.description": newDescription } },
    {new:true}
  );


  if (!Syllabus) {
    return next(new ErrorHandler("Unable to update module", 404));
  }
  res.status(200).json({
    status: "success",
    data: Syllabus,
  });
});





// Add Lesson API
exports.addLesson = catchAsyncErorr(async (req, res, next) => {
  const { courseId, moduleName, newLesson } = req.body;

  const Syllabus = await SyllabusModel.findOneAndUpdate(
    { courseId, "modules.name": moduleName },
    { $push: { "modules.$.lessons": newLesson } },
    {new:true}
  );

  if (!module) {
    return next(new ErrorHandler("Module not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: Syllabus,
  });
});

// Remove Lesson API
exports.removeLesson = catchAsyncErorr(async (req, res, next) => {
  const { courseId,moduleName, lessonName } = req.body;

  const Syllabus = await SyllabusModel.findOneAndUpdate(
    {courseId,"modules.name": moduleName },
    { $pull: { "modules.$.lessons": {  name:lessonName } } },
    { new: true }
  );

  if (!Syllabus) {
    return next(new ErrorHandler("Unable to remove lesson", 500));
  }
  res.status(200).json({
    status: "success",
    data: Syllabus,
  });
});


// Edit Lesson Details API
exports.editLesson = catchAsyncErorr(async (req, res, next) => {
  const { moduleName, courseId, lessonName, lessonObject } = req.body;
  const { name, description } = lessonObject;

  // Ensure courseId is an ObjectId
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return next(new ErrorHandler("Invalid courseId", 400));
  }

  const Syllabus = await SyllabusModel.findOneAndUpdate(
    { courseId: mongoose.Types.ObjectId(courseId), "modules.name": moduleName, "modules.lessons.name": lessonName },
    {
      $set: {
        "modules.$[outer].lessons.$[inner].name": name,
        "modules.$[outer].lessons.$[inner].description": description,
      },
    },
    { arrayFilters: [{ "outer.lessons.name": lessonName }], new: true }
  );

  if (!Syllabus) {
    return next(new ErrorHandler("Unable to update lesson", 500));
  } 

  res.status(200).json({
    status: "success",
    data: Syllabus,
  });
});


// Lesson Completed API
exports.completeLesson = catchAsyncErorr(async (req, res, next) => {
  const { moduleId, lessonId, completed } = req.body;
  const Syllabus = await SyllabusModel.findOneAndUpdate(
    { _id: moduleId, "modules.lessons._id": lessonId },
    { $set: { "modules.$[outer].lessons.$[inner].completed": completed } },
    { arrayFilters: [{ "outer.lessons._id": lessonId }], new: true }
  );
  if (!Syllabus) {
    return next(new ErrorHandler("Lesson not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: Syllabus,
  });
});
