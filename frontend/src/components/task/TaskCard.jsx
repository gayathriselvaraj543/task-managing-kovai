import useUpdateTask from '../../hooks/useUpdateTask';
import StatusBadge from '../ui/StatusBadge';
import StatusDropdown from './StatusDropdown';
import { formatTaskTimestamp } from '../../utils/dateUtils';

function TaskCard({ task }) {
  const { updateStatus, isUpdating } = useUpdateTask();

  const handleStatusChange = async (event) => {
    await updateStatus(task.id, event.target.value);
  };

  return (
    <article
      className={`rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200 transition duration-200 hover:-translate-y-1 hover:shadow-md ${
        task.optimistic ? 'opacity-80' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">Task</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">{task.title}</h3>
        </div>
        <StatusBadge status={task.status} />
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">{task.description}</p>

      <div className="mt-6 flex items-center justify-between gap-3 text-sm">
        <div>
          <p className="text-slate-500">Created</p>
          <p className="mt-1 text-slate-700">{formatTaskTimestamp(task.createdAt)}</p>
        </div>
        <StatusDropdown
          id={`status-${task.id}`}
          value={task.status}
          onChange={handleStatusChange}
          disabled={isUpdating}
        />
      </div>
    </article>
  );
}

export default TaskCard;
