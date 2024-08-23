import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import upload from "../middlewares/multer";
import { addComment, addNewPost, bookmarkPost, deletePost, dislikePost, getAllPost, getCommentOfPost, getUserPosts, likePost } from "../controllers/post.controller";

const router = express.Router();

router.route("/newpost").post(isAuthenticated, upload.single("image"), addNewPost);
router.route("/posts").get(isAuthenticated, getAllPost);
router.route("/userpost/all").get(isAuthenticated, getUserPosts);
router.route("/:id/like").get(isAuthenticated, likePost);
router.route("/:id/dislike").get(isAuthenticated, dislikePost);
router.route("/:id/comment").post(isAuthenticated, addComment);
router.route("/:id/comment/all").post(isAuthenticated, getCommentOfPost);
router.route("/delete/:id").post(isAuthenticated, deletePost);
router.route("/:id/bookmark").post(isAuthenticated, bookmarkPost);

export default router;