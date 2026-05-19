import { useMemo } from 'react';
import { useTaskStore } from '../store/taskStore';

export default function useTasks() {
  const tasks = useTaskStore((state) => state.tasks);
  const filter = useTaskStore((state) => state.filter);
  const isLoading = useTaskStore((state) => state.isLoading);
  const error = useTaskStore((state) => state.error);
  const setFilter = useTaskStore((state) => state.setFilter);

  const filteredTasks = useMemo(() => {
    if (filter === 'All') {
      return tasks;
    }

    return tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

  return {
    allTasks: tasks,
    tasks: filteredTasks,
    filter,
    isLoading,
    error,
    setFilter,
  };
}
