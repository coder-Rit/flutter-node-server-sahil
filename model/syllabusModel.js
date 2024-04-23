const mongoose = require("mongoose");
 

const syllabusSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Types.ObjectId,
    ref: "course",
    unique:true,
    require: true,
  },
  modules: [
    {
      name: {
        type: String,
        unique:true,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      lessons: [
        {
          name: {
            type: String,
            unique:true,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          completed: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("syllabus", syllabusSchema);
