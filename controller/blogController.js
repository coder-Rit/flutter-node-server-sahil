const catchAsyncErorr = require("../middleware/catchAsyncErorr");
const blogModel = require("../model/blogModel");
const ErrorHandler = require("../utils/errorHandler");

// Create Blog API
exports.createBlog = catchAsyncErorr(async (req, res, next) => {
  const { userURL, title, description, imageURL } = req.body;

  const newBlog = await blogModel.create({
    userURL,
    title,
    description,
    imageURL,
  });

  res.status(201).json({ status: "success", data: newBlog });
});

// Update Blog API
exports.updateBlog = catchAsyncErorr(async (req, res, next) => {
  const { blogId, title, description, imageURL } = req.body;

  const updatedBlog = await blogModel.findByIdAndUpdate(
    blogId,
    { title, description, imageURL },
    { new: true }
  );

  if (!updatedBlog) {
    return next(new ErrorHandler("blog not found", 404));
  }

  res.status(200).json({ status: "success", data: updatedBlog });
});
// Delete Blog API
exports.deleteBlog = catchAsyncErorr(async (req, res, next) => {
  const { blogId } = req.body;

  const deletedBlog = await blogModel.findByIdAndDelete(blogId);
  if (!deletedBlog) {
    return next(new ErrorHandler("blog not found", 404));
  }

  res
    .status(200)
    .json({ status: "success", message: "blog deleted successfully" });
});
// Add Comment API
exports.addComment = catchAsyncErorr(async (req, res, next) => {
  const { blogId, newComment } = req.body;

  const updatedBlog = await blogModel.findByIdAndUpdate(
    blogId,
    { $push: { comments: newComment } },
    { new: true }
  );

  if (!updatedBlog) {
    return next(new ErrorHandler("blog not found", 404));
  }

  res.status(200).json({ status: "success", data: updatedBlog });
});
// Remove Comment API
exports.removeComment = catchAsyncErorr(async (req, res, next) => {
  const { blogId, commentId } = req.body;

  const updatedBlog = await blogModel.findByIdAndUpdate(
    blogId,
    { $pull: { comments: { _id: commentId } } },
    { new: true }
  );

  if (!updatedBlog) {
    return next(new ErrorHandler("blog not found", 404));
  }

  res.status(200).json({ status: "success", data: updatedBlog });
});
 
// Get blogs in Order API
exports.getBlogInOrder = catchAsyncErorr(async (req, res, next) => {
  let bolgs = await blogModel.find().sort({ createdAt: -1 });

  const notis = [];

  bolgs.forEach((noti) => {
    let a = JSON.parse(JSON.stringify(noti)); // Create a copy of the blog
    a.commentsCount = a.comments.length; // Calculate comments count
    a.comments = []; // Set comments to an empty array
    notis.push(a); // Push the modified blog to the array
  });

  res.status(200).json({ status: "success", data: notis });
});

// Get blogs in Order API
exports.getTheBlog = catchAsyncErorr(async (req, res, next) => {
  let blogs = await blogModel.findById(req.body.blogId);

  res.status(200).json({ status: "success", data: blogs });
});
