import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useTaskStore } from '../store/taskStore';
import { updateTaskStatus as updateTaskStatusApi } from '../api/taskService';
import { normalizeTask } from '../utils/taskUtils';

export default function useUpdateTask() {
  const updateTaskLocal = useTaskStore((state) => state.updateTaskLocal);
  const replaceTask = useTaskStore((state) => state.replaceTask);
  const setTasks = useTaskStore((state) => state.setTasks);
  const tasks = useTaskStore((state) => state.tasks);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const updateStatus = useCallback(
    async (taskId, status) => {
      const previousTasks = tasks;

      updateTaskLocal(taskId, status);
      setIsUpdating(true);
      setError(null);

      try {
        const updated = await updateTaskStatusApi(taskId, status);
        const task = normalizeTask(updated);
        replaceTask(task);
        toast.success('Task status updated');
        return task;
      } catch (error) {
        setTasks(previousTasks);
        setError(error.message || 'Unable to update task');
        toast.error(error.message || 'Unable to update task');
        throw error;
      } finally {
        setIsUpdating(false);
      }
    },
    [updateTaskLocal, replaceTask, setTasks, tasks]
  );

  return { updateStatus, isUpdating, error };
}
