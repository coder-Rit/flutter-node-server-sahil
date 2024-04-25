const express = require("express");
const router = express.Router();
const bannerModel = require("../model/bannerModel"); // Assuming your banner model is imported correctly
const catchAsyncErorr = require("../middleware/catchAsyncErorr");

// Create new banner
exports.createBanner = catchAsyncErorr(async (req, res, next) => {
  const { Title, description, imgUrl } = req.body;
  const newBanner = await bannerModel.create({ Title, description, imgUrl });
  res.status(201).json({ status: "success", data: newBanner });
});

// Delete banner
exports.deleteBanner = catchAsyncErorr(async (req, res, next) => {
  const bannerId = req.body.bannerId;
  await bannerModel.findByIdAndDelete(bannerId);
  res
    .status(200)
    .json({ status: "success", message: "Banner deleted successfully" });
});

// Update banner
exports.updateBanner = catchAsyncErorr(async (req, res, next) => {
  const { Title, description, imgUrl,bannerId } = req.body;
  const updatedBanner = await bannerModel.findByIdAndUpdate(
    bannerId,
    { Title, description, imgUrl },
    { new: true }
  );
  res.status(200).json({ status: "success", data: updatedBanner });
});

// Get banners
exports.getBanners = catchAsyncErorr(async (req, res, next) => {
  const banners = await bannerModel.find();
  res.status(200).json({ status: "success", data: banners });
});

 
