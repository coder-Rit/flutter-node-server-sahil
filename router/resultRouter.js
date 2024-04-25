const express = require('express');
const { getPracticeSet, createPracticeSet, updatePracticeSet, deletePracticeSet, addQuestions, removeQuestions } = require('../controller/practiceController');
const { addAnswer, removeAnswer, createResult, finalUpdate, getResult, deleteResult } = require('../controller/resultController');
 

const Router = express.Router();

// result API endpoints
Router.route('/subjects/practiceSet/result/get').post(getResult);

Router.route('/subjects/practiceSet/result/create').post(createResult);
Router.route('/subjects/practiceSet/result/submit').put(finalUpdate);
Router.route('/subjects/practiceSet/result/delete').put(deleteResult);

Router.route('/subjects/practiceSet/result/answer/add').patch(addAnswer);
Router.route('/subjects/practiceSet/result/answer/remove').patch(removeAnswer);

module.exports = Router;
