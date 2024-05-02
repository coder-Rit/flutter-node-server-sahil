const express = require('express');
const { addsearchCategory } = require('../controller/searchCategoryControllerjs');
const { removesearchCategory } = require('../controller/searchCategoryControllerjs');
const { getAllsearchCategories } = require('../controller/searchCategoryControllerjs');

const Router = express.Router();

// Admin - search Categories
Router.route("/admin/searchCategory/add").post(addsearchCategory);
Router.route("/admin/searchCategory/remove").put(removesearchCategory);
Router.route("/admin/searchCategory/all").get(getAllsearchCategories);

module.exports = Router;
