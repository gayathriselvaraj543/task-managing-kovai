import asyncHandler from '../utils/asyncHandler.js';
import * as taskService from '../services/task.service.js';

export const createTask = asyncHandler(async (req, res) => {
  const task = await taskService.createTask({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    userId: req.user.uid,
  });

  res.status(201).json({ status: 'success', data: task });
});

export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await taskService.listTasksForUser(req.user.uid, req.query.status);

  res.json({ status: 'success', results: tasks.length, data: tasks });
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await taskService.updateTaskForUser(req.params.id, req.user.uid, req.body);

  res.json({ status: 'success', data: task });
});
