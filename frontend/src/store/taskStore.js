import { create } from 'zustand';

export const useTaskStore = create((set) => ({
  tasks: [],
  filter: 'All',
  isLoading: false,
  error: null,
  setTasks: (tasks) => set({ tasks }),
  setFilter: (filter) => set({ filter }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  addTaskLocal: (task) =>
    set((state) => ({
      tasks: [task, ...state.tasks],
    })),
  updateTaskLocal: (taskId, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === taskId ? { ...task, status } : task)),
    })),
  replaceTask: (updatedTask, previousId) =>
    set((state) => {
      const matchId = previousId ?? updatedTask.id;
      return {
        tasks: state.tasks.map((task) => (task.id === matchId ? updatedTask : task)),
      };
    }),
}));
