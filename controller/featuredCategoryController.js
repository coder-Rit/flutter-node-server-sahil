
const featuredCategoryModel = require("../model/featuredCategoryModel");
const catchAsyncErorr = require("../middleware/catchAsyncErorr");
const ErrorHandler = require("../utils/errorHandler");


exports.addFeaturedCategory = catchAsyncErorr(async (req, res, next) => {
  const { categoryName } = req.body;

  const newFeaturedCategory = await featuredCategoryModel.create({
    categoryName,
  });

  res.status(201).json({ status: "success", data: newFeaturedCategory });
});



exports.removeFeaturedCategory = catchAsyncErorr(async (req, res, next) => {
  const { categoryId } = req.body;

  const deletedFeaturedCategory = await featuredCategoryModel.findByIdAndDelete(
    categoryId
  );

  if (!deletedFeaturedCategory) {
    return next(new ErrorHandler("Featured Category not found", 404));
  }

  res.status(200).json({ status: "success", data: deletedFeaturedCategory });
});


exports.getAllFeaturedCategories = catchAsyncErorr(async (req, res, next) => {
  const featuredCategories = await featuredCategoryModel.find();

  res.status(200).json({ status: "success", data: featuredCategories });
});
