import { useCallback } from 'react';
import { useTaskStore } from '../store/taskStore';
import { fetchTasks } from '../api/taskService';
import { normalizeTask } from '../utils/taskUtils';

export default function useFetchTasks() {
  const setTasks = useTaskStore((state) => state.setTasks);
  const setLoading = useTaskStore((state) => state.setLoading);
  const setError = useTaskStore((state) => state.setError);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const tasks = await fetchTasks();
      setTasks(tasks.map(normalizeTask));
    } catch (error) {
      setError(error.message || 'Unable to load tasks');
    } finally {
      setLoading(false);
    }
  }, [setTasks, setLoading, setError]);

  return { loadTasks };
}
