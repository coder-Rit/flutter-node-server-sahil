const express = require('express');
const { createBanner, updateBanner, deleteBanner, getBanners } = require('../controller/bannerController');
 

const Router = express.Router();

// Banners API endpoints
Router.route('/banners/get').get(getBanners);

Router.route('/banners/create').post(createBanner);
Router.route('/banners/update').patch(updateBanner);
Router.route('/banners/delete').put(deleteBanner);

module.exports = Router;
