const express = require("express");
const {
  createNotification,
  updateNotification,
  deleteNotification,
  addComment,
  removeComment,
  addLike,
  removeLike,
  getNotificationsInOrder,
  getTheNotification,
} = require("../controller/notificationController");

const router = express.Router();

router.route("/notifications/order").post(getNotificationsInOrder);
router.route("/notification/sigle/get").post(getTheNotification);
router.route("/notifications/create").post(createNotification);
router.route("/notifications/update").patch(updateNotification);
router.route("/notifications/delete").put(deleteNotification);
router.route("/notifications/comment/add").patch(addComment);
router.route("/notifications/comment/remove").patch(removeComment);
router.route("/notifications/like/add").patch(addLike);
router.route("/notifications/like/remove").patch(removeLike);

module.exports = router;
