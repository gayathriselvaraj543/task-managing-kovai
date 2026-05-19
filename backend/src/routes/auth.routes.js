import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { verifyAuth } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/verify', authMiddleware, verifyAuth);

export default router;
