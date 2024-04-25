const catchAsyncErorr = require("../middleware/catchAsyncErorr");
const notificationModel = require("../model/notificationModel");
const ErrorHandler = require("../utils/errorHandler");

// Create Notification API
exports.createNotification = catchAsyncErorr(async (req, res, next) => {
  const { userURL, title, description, imageURL } = req.body;

  const newNotification = await notificationModel.create({
    userURL,
    title,
    description,
    imageURL,
  });

  res.status(201).json({ status: "success", data: newNotification });
});
// Update Notification API
exports.updateNotification = catchAsyncErorr(async (req, res, next) => {
  const { notificationId, title, description, imageURL } = req.body;

  const updatedNotification = await notificationModel.findByIdAndUpdate(
    notificationId,
    { title, description, imageURL },
    { new: true }
  );

  if (!updatedNotification) {
    return next(new ErrorHandler("Notification not found", 404));
  }

  res.status(200).json({ status: "success", data: updatedNotification });
});
// Delete Notification API
exports.deleteNotification = catchAsyncErorr(async (req, res, next) => {
  const { notificationId } = req.body;

  const deletedNotification = await notificationModel.findByIdAndDelete(
    notificationId
  );
  if (!deletedNotification) {
    return next(new ErrorHandler("Notification not found", 404));
  }

  res
    .status(200)
    .json({ status: "success", message: "Notification deleted successfully" });
});
// Add Comment API
exports.addComment = catchAsyncErorr(async (req, res, next) => {
  const { notificationId, newComment } = req.body;

  const updatedNotification = await notificationModel.findByIdAndUpdate(
    notificationId,
    { $push: { comments: newComment } },
    { new: true }
  );

  if (!updatedNotification) {
    return next(new ErrorHandler("Notification not found", 404));
  }

  res.status(200).json({ status: "success", data: updatedNotification });
});
// Remove Comment API
exports.removeComment = catchAsyncErorr(async (req, res, next) => {
  const { notificationId, commentId } = req.body;

  const updatedNotification = await notificationModel.findByIdAndUpdate(
    notificationId,
    { $pull: { comments: { _id: commentId } } },
    { new: true }
  );

  if (!updatedNotification) {
    return next(new ErrorHandler("Notification not found", 404));
  }

  res.status(200).json({ status: "success", data: updatedNotification });
});
// Add Like API
exports.addLike = catchAsyncErorr(async (req, res, next) => {
  const { notificationId } = req.body;

  const updatedNotification = await notificationModel.findByIdAndUpdate(
    notificationId,
    { $inc: { like_count: 1 } },
    { new: true }
  );

  if (!updatedNotification) {
    return next(new ErrorHandler("Notification not found", 404));
  }

  res.status(200).json({ status: "success", data: updatedNotification });
});
// Remove Like API
exports.removeLike = catchAsyncErorr(async (req, res, next) => {
  const { notificationId } = req.body;

  const updatedNotification = await notificationModel.findByIdAndUpdate(
    notificationId,
    { $inc: { like_count: -1 } },
    { new: true }
  );

  if (!updatedNotification) {
    return next(new ErrorHandler("Notification not found", 404));
  }

  res.status(200).json({ status: "success", data: updatedNotification });
});
// Get Notifications in Order API
exports.getNotificationsInOrder = catchAsyncErorr(async (req, res, next) => {
    let notifications = await notificationModel.find().sort({ createdAt: -1 });
  
    const notis = [];
  
    notifications.forEach((noti) => {
      let a = JSON.parse(JSON.stringify(noti)) ; // Create a copy of the notification
      a.commentsCount = a.comments.length; // Calculate comments count
      a.comments = []; // Set comments to an empty array
      notis.push(a); // Push the modified notification to the array
    });
  
    res.status(200).json({ status: "success", data: notis });
  });
  
// Get Notifications in Order API
exports.getTheNotification = catchAsyncErorr(async (req, res, next) => {

    let notifications = await notificationModel.findById(req.body.notificationId)

  res.status(200).json({ status: "success", data: notifications });
});
