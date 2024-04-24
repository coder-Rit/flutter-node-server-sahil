const mongoose = require("mongoose");

const enrolledCourseSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  studentId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  student_id: {
    type: String,
    required: true,
  },
  completedModules: [
    {
      moduleId: {
        type: mongoose.Schema.ObjectId,
        required: true,
      },
      completedLessonsId: [
        {
          type: mongoose.Schema.ObjectId,
          required: true,
        },
      ],
    },
  ],
  completedAssignments: [
    {
      moduleId: {
        type: mongoose.Schema.ObjectId,
        required: true,
      },
      completedAssignment: [
        {
          lessonId: {
            type: mongoose.Schema.ObjectId,
            required: true,
          },
          assignmentId: {
            type: mongoose.Schema.ObjectId,
            required: true,
          },
          assignmentUrl: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("enrolledCourse", enrolledCourseSchema);
