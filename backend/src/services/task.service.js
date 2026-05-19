import Task from '../models/task.model.js';
import ApiError from '../utils/apiError.js';
import { TASK_STATUSES } from '../models/task.model.js';

export async function createTask(payload) {
  return Task.create(payload);
}

export async function listTasksForUser(userId, status) {
  const filter = { userId };

  if (status) {
    if (!TASK_STATUSES.includes(status)) {
      throw new ApiError(400, `Status must be one of: ${TASK_STATUSES.join(', ')}`);
    }
    filter.status = status;
  }

  return Task.find(filter).sort({ createdAt: -1 }).lean();
}

export async function updateTaskForUser(taskId, userId, updates) {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, userId },
    updates,
    {
      new: true,
      runValidators: true,
    }
  ).lean();

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  return task;
}
