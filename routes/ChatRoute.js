import express from 'express';  
// import {login} from '../controllers/auth.js'
import { createChat ,userChats,findChat} from '../controllers/controller/ChatController.js';
import { verifyToken } from '../controllers/middleware/auth.js';

const router =express.Router();


router.post('/', createChat);
router.get('/:userId', verifyToken,userChats);
router.get('/find/:firstId/:secondId',verifyToken, findChat);

export default router