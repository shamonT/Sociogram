import express from "express";
import { protect } from "../controllers/middleware/auth.js";
const router = express.Router();
import {blockUser, getUser, loginAdmin,registerAdmin, unblockUser } from "../controllers/controller/adminController.js";

router.post('/admin',loginAdmin)
router.post('/adminregister',registerAdmin)
router.get('/getUser',getUser)
router.post('/blockUser',blockUser)
 router.post('/unblockUser',unblockUser)



export default router;