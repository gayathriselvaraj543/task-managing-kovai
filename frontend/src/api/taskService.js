import { get, post, patch } from './apiService';

const TASKS_ENDPOINT = '/tasks';

export async function fetchTasks() {
  return get(TASKS_ENDPOINT);
}

export async function createTask(payload) {
  return post(TASKS_ENDPOINT, payload);
}

export async function updateTaskStatus(taskId, status) {
  return patch(`${TASKS_ENDPOINT}/${taskId}`, { status });
}
