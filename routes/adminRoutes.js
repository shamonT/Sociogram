import express from "express";
import { protect } from "../controllers/middleware/auth.js";
const router = express.Router();
import { registerAdmin,loginAdmin } from "../controllers/controller/adminController.js";
router.post('/register',registerAdmin)
router.post('/adminlogin',loginAdmin)


export default router;