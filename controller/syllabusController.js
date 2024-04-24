const { default: mongoose } = require("mongoose");
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
  
  res.status(200).json({
    status: "success",
    data: Syllabus,
  });
});



// get module API
exports.getModule = catchAsyncErorr(async (req, res, next) => {
  const { syllabusId, ModuleName } = req.body;

  const Syllabus = await SyllabusModel.findOne(
    { _id:syllabusId , "modules.name": ModuleName},
  );

  if (!Syllabus) {
    return next(new ErrorHandler("Unable to find module", 500));
  }
  res.status(200).json({
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
    { new: true }
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
  const { moduleName, courseId } = req.body;
  const Syllabus = await SyllabusModel.findOneAndUpdate(
    { courseId },
    { $pull: { modules: { name: moduleName } } },
    { new: true }
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
  const { courseId, moduleName, newModuleDetails } = req.body;
  const { newName, newDescription } = newModuleDetails;

  await idModuleFound(courseId, moduleName, next);

  const Syllabus = await SyllabusModel.findOneAndUpdate(
    { courseId, "modules.name": moduleName },
    {
      $set: {
        "modules.$.name": newName,
        "modules.$.description": newDescription,
      },
    },
    { new: true }
  );

  if (!Syllabus) {
    return next(new ErrorHandler("Unable to update module", 404));
  }
  res.status(200).json({
    status: "success",
    data: Syllabus,
  });
});





// get module API
exports.getLesson = catchAsyncErorr(async (req, res, next) => {
  const { syllabusId, lessonName } = req.body;

  const Syllabus = await SyllabusModel.findOne(
    { _id:syllabusId , "modules.lessons.name": lessonName},
  );

  if (!Syllabus) {
    return next(new ErrorHandler("Unable to find lessons", 500));
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
    { new: true }
  );

  let lessonId = 0;

  Syllabus.modules.map((mod) => {
    if (mod.name === moduleName) {
      mod.lessons.map((less) => {
        if (less.name === newLesson.name) {
          lessonId = less._id;
        }
        return less;
      });
    }
    return mod;
  });

  if (!lessonId) {
    return next(new ErrorHandler("Unable to create lesson", 500));
  }

   await videoLectureModel.create({
    lessonId:lessonId,
    videoUrl:"/"
   })

  
  res.status(200).json({
    status: "success",
    data: Syllabus,
  });
});

// Remove Lesson API
exports.removeLesson = catchAsyncErorr(async (req, res, next) => {
  const { courseId, moduleName, lessonName } = req.body;

  const Syllabus = await SyllabusModel.findOneAndUpdate(
    { courseId, "modules.name": moduleName },
    { $pull: { "modules.$.lessons": { name: lessonName } } },
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
  const { moduleName, courseId, lessonName, newLessonObject } = req.body;
  const { name, description } = newLessonObject;

  // Ensure courseId is an ObjectId
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return next(new ErrorHandler("Invalid courseId", 400));
  }

  const Syllabus = await SyllabusModel.findOne({
    courseId
  });

  if (!Syllabus) {
    return next(new ErrorHandler("Syllabus not found", 404));
  }

  let moduleInd = -1;
  let lessonInd = -1;

  Syllabus.modules.map((mod, idx) => {
    if (mod.name === moduleName) {
      moduleInd = idx;
      mod.lessons.map((less, lessIdx) => {
        if (less.name === lessonName) {
          lessonInd = lessIdx;
          less.name = name;
          less.description = description;
        }
        return less;
      });
    }
    return mod;
  });

  // Check if both module and lesson indices were found
  if (moduleInd !== -1 && lessonInd !== -1) {
    Syllabus.markModified('modules'); // Mark the 'modules' array as modified
    await Syllabus.save(); // Save the updated Syllabus
  }

  res.status(200).json({
    status: "success",
    data: Syllabus,
  });
});

// Lesson Completed API
exports.completeLesson = catchAsyncErorr(async (req, res, next) => {
  const { courseId, moduleName, lessonName } = req.body;

  let Syllabus = await SyllabusModel.findOne({
    courseId,
  });

  if (!Syllabus) {
    return next(new ErrorHandler("Syllabus not found", 404));
  }

  let moduleInd = -1; // Initialize moduleInd outside the map function

  Syllabus.modules.map((mod, idx) => {
    if (mod.name === moduleName) {
      moduleInd = idx;
      mod.lessons.map((less) => {
        if (less.name === lessonName) {
          less.completed = true; // Fix the typo here
        }
        return less;
      });
    }

    return mod;
  });

  // Check if the module index was found
  if (moduleInd !== -1) {
    Syllabus.markModified('modules'); // Mark the 'modules' array as modified
    await Syllabus.save(); // Save the updated Syllabus
  }

  res.status(200).json({
    status: "success",
    data: Syllabus,
  });
});

