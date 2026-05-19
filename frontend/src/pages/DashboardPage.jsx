import { useEffect } from 'react';
import useTasks from '../hooks/useTasks';
import useFetchTasks from '../hooks/useFetchTasks';
import TaskForm from '../components/task/TaskForm';
import TaskList from '../components/task/TaskList';
import TaskFilterBar from '../components/task/TaskFilterBar';
import Card from '../components/ui/Card';
import EmptyState from '../components/ui/EmptyState';
import Loader from '../components/ui/Loader';
import TaskSkeleton from '../components/task/TaskSkeleton';

function DashboardPage() {
  const { allTasks, tasks, filter, setFilter, isLoading, error } = useTasks();
  const { loadTasks } = useFetchTasks();

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const counters = {
    planned: allTasks.filter((task) => task.status === 'Planned').length,
    inProgress: allTasks.filter((task) => task.status === 'In Progress').length,
    complete: allTasks.filter((task) => task.status === 'Complete').length,
    total: allTasks.length,
  };

  return (
    <div className="space-y-8">
      <div className="mx-auto w-full max-w-7xl px-2 sm:px-4 lg:px-0">
      <header className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Your tasks</p>
            <h1 className="text-3xl font-semibold text-slate-900">Productivity dashboard</h1>
            <p className="max-w-2xl text-sm text-slate-600">Manage your tasks, track progress, and move work forward with a clean responsive layout.</p>
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-5">
          <div className="space-y-5">
            <TaskForm />
            <Card title="Activity stats" className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-5 shadow-sm">
                <p className="text-sm text-slate-500">Planned</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{counters.planned}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5 shadow-sm">
                <p className="text-sm text-slate-500">In Progress</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{counters.inProgress}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5 shadow-sm">
                <p className="text-sm text-slate-500">Complete</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{counters.complete}</p>
              </div>
            </Card>
          </div>
        </div>

        <div className="space-y-5">
          <Card title="Task workspace" className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-slate-500">Filter tasks by status and focus on what matters.</div>
              <TaskFilterBar currentFilter={filter} onFilterChange={setFilter} />
            </div>

            {error && (
              <div className="rounded-3xl bg-rose-50 p-4 text-sm text-rose-700">{error}</div>
            )}

            {isLoading ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <TaskSkeleton key={index} />
                ))}
              </div>
            ) : tasks.length ? (
              <TaskList tasks={tasks} />
            ) : (
              <EmptyState
                title="No tasks yet"
                description="Add a card to your task list and start tracking your workflow."
                buttonLabel="Refresh"
                onButtonClick={loadTasks}
              />
            )}
          </Card>
        </div>
      </section>
    </div>
</div>
  );
}


export default DashboardPage;
