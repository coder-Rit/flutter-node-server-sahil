const express = require('express');
const { 
  createModule,
  deleteModule,
  addLesson,
  removeLesson,
  editLesson,
  completeLesson,
  editModule,
  createSyllabus,
  addModule,
  removeModule,
  getSyllabus,
  getModule,
  getLesson
} = require('../controller/syllabusController');

const router = express.Router();

// Module routes
router.route('/syllabus/get').post(getSyllabus);
router.route('/syllabus/create').post(createSyllabus);


router.route('/syllabus/modules/get').post(getModule);
router.route('/syllabus/modules/add').post(addModule);
router.route('/syllabus/modules/edit').put(editModule);
router.route('/syllabus/modules/remove').delete(removeModule);


router.route('/syllabus/modules/lessons/get') .post(getLesson);
router.route('/syllabus/modules/lessons/add').post(addLesson);
router.route('/syllabus/modules/lessons/remove').delete(removeLesson);
router.route('/syllabus/modules/lessons/edit').put(editLesson);
router.route('/syllabus/modules/lessons/complete').patch(completeLesson);

module.exports = router;
