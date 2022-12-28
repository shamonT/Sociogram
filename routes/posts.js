import express  from "express";
import {commentPost, getFeedPosts,getUserPosts,likePost} from "../controllers/controller/posts.js"
import { verifyToken } from "../controllers/middleware/auth.js";

const router=express.Router()

//READ

router.get("/",verifyToken,getFeedPosts)
router.get("/:userId/posts",verifyToken,getUserPosts)

//update

router.patch("/:id/like",verifyToken,likePost)
router.patch('/:id/comment-post', commentPost)
export default router;