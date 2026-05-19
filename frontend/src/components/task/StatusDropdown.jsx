import { STATUS_OPTIONS } from '../../utils/statusOptions';

function StatusDropdown({ id, name, label, value, onChange, disabled, className }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-slate-900 mb-2" htmlFor={id}>
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
}

export default StatusDropdown;
