export function normalizeTask(task) {
  if (!task) {
    throw new Error('Invalid task payload from API');
  }

  return {
    id: task.id || task._id,
    title: task.title,
    description: task.description,
    status: task.status,
    createdAt: task.createdAt,
  };
}
