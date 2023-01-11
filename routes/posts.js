import express  from "express";
import {commentPost, deletePost, getFeedPosts,getUserPosts,likePost, reportPost} from "../controllers/controller/posts.js"
import { verifyToken } from "../controllers/middleware/auth.js";

const router=express.Router()

//READ

router.get("/",verifyToken,getFeedPosts)
router.get("/:userId/posts",verifyToken,getUserPosts)

//update

router.patch("/:id/like",verifyToken,likePost)
router.patch('/comment-post', commentPost)

router.delete('/delete-post/:postId', verifyToken,deletePost)
router.post('/:postId/report-post', reportPost)

export default router;