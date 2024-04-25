const express = require("express");
const { getBlogInOrder, getTheBlog, createBlog, updateBlog, deleteBlog, addComment, removeComment } = require("../controller/blogController");
 

const router = express.Router();

router.route("/blogs/order").post(getBlogInOrder);
router.route("/blog/sigle/get").post(getTheBlog);
router.route("/blogs/create").post(createBlog);
router.route("/blogs/update").patch(updateBlog);
router.route("/blogs/delete").put(deleteBlog);
router.route("/blogs/comment/add").patch(addComment);
router.route("/blogs/comment/remove").patch(removeComment);


module.exports = router;
