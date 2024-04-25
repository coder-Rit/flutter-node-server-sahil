const express = require('express');
const { getPracticeSet, createPracticeSet, updatePracticeSet, deletePracticeSet, addQuestions, removeQuestions } = require('../controller/practiceController');
 

const Router = express.Router();

// pracitce set API endpoints
Router.route('/subjects/practiceSet/get').post(getPracticeSet);

Router.route('/subjects/practiceSet/create').post(createPracticeSet);
Router.route('/subjects/practiceSet/update').put(updatePracticeSet);
Router.route('/subjects/practiceSet/delete').put(deletePracticeSet);

Router.route('/subjects/practiceSet/question/add').patch(addQuestions);
Router.route('/subjects/practiceSet/question/remove').patch(removeQuestions);

module.exports = Router;
