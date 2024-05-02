const express = require('express');
const { addFeaturedCategory, removeFeaturedCategory, getAllFeaturedCategories } = require('../controller/featuredCategoryController');

const Router = express.Router();

// Admin - Featured Categories
Router.route("/admin/featuredCategory/add").post(addFeaturedCategory);
Router.route("/admin/featuredCategory/remove").put(removeFeaturedCategory);
Router.route("/admin/featuredCategory/all").get(getAllFeaturedCategories);

module.exports = Router;
