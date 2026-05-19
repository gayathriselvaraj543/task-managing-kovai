import { STATUS_OPTIONS } from '../../utils/statusOptions';

function TaskFilterBar({ currentFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {['All', ...STATUS_OPTIONS].map((status) => (
        <button
          key={status}
          type="button"
          onClick={() => onFilterChange(status)}
          className={`rounded-full border px-4 py-2 text-sm transition ${
            currentFilter === status
              ? 'border-brand-500 bg-brand-500 text-white'
              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
}

export default TaskFilterBar;
