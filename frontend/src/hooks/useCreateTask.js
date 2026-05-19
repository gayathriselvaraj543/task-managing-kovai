import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useTaskStore } from '../store/taskStore';
import { createTask as createTaskApi } from '../api/taskService';
import { normalizeTask } from '../utils/taskUtils';

export default function useCreateTask() {
  const addTaskLocal = useTaskStore((state) => state.addTaskLocal);
  const replaceTask = useTaskStore((state) => state.replaceTask);
  const setTasks = useTaskStore((state) => state.setTasks);

  const tasks = useTaskStore((state) => state.tasks);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);


  const createTask = useCallback(
    async (taskInput) => {
      const previousTasks = tasks;
      const temporaryTask = {
        id: `temp-${Date.now()}`,
        ...taskInput,
        createdAt: new Date().toISOString(),
        optimistic: true,
      };

      addTaskLocal(temporaryTask);
      setIsCreating(true);
      setError(null);

      try {
        const created = await createTaskApi(taskInput);
        const task = normalizeTask(created);
        replaceTask(task, temporaryTask.id);
        toast.success('Task added successfully');
        return task;
      } catch (error) {
        setTasks(previousTasks);
        setError(error.message || 'Unable to create task');
        toast.error(error.message || 'Unable to create task');
        throw error;
      } finally {
        setIsCreating(false);
      }
    },
    [addTaskLocal, replaceTask, setTasks, tasks]
  );

  return { createTask, isCreating, error };
}
