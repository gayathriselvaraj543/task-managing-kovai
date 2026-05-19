import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createTask, getTasks, updateTask } from '../controllers/task.controller.js';
import { validateTaskCreation, validateTaskUpdate, validateTaskFilter } from '../validations/task.validation.js';
import validateRequest from '../middleware/validateRequest.js';

const router = express.Router();

router.use(authMiddleware);
router.post('/', validateTaskCreation, validateRequest, createTask);
router.get('/', validateTaskFilter, validateRequest, getTasks);
router.patch('/:id', validateTaskUpdate, validateRequest, updateTask);

export default router;
