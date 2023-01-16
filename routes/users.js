import express from "express";

import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateUser,
  searchUser,
  editprofilepic,
  
  
  
} from "../controllers/controller/users.js";

import { verifyToken } from "../controllers/middleware/auth.js";

const router = express.Router();

//read

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

router.patch("/:id/:friendId", addRemoveFriend);
router.put('/edit-user/:id', updateUser)

router.get('/search/user/:search', searchUser)
// router.get('/search',verifyToken,searchUser)
router.post("/profilepic-user/:id", editprofilepic)
export default router;
