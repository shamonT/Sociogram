import express  from "express";
import { login, resetPassword } from "../controllers/controller/auth.js";

const router=express.Router();

router.post("/login",login)
router.post('/reset-password/:id',resetPassword);
export default router