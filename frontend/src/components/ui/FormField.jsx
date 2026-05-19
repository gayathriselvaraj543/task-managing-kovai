function FormField({ label, type = 'text', value, onChange, name, placeholder, error }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-900" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default FormField;
