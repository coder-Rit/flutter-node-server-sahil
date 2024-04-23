const mongoose = require("mongoose");
 

const videoLectureSchema = new mongoose.Schema({
  lessonId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  videoTitle:{
    type:String,
    default:"null",
    required:true,
  },
  videoUrl:{
    type:String,
    default:"/",
    required:true,
  },
  chapters: [
    {
      chapterName: {
        type: String,
        required: true,
      },
      videoTimeStamp: {
        type: String,
        required: true,
      },
      completed: {
        type: Boolean,
        default:false
      },
    },
  ],
});

module.exports = mongoose.model("videoLecture", videoLectureSchema);
