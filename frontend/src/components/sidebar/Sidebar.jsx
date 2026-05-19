import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', path: '/' },
];

function Sidebar({ isOpen, onClose }) {
  const containerClasses = useMemo(
    () =>
      `fixed inset-y-0 left-0 z-40 w-full transform bg-white shadow-xl transition duration-300 lg:relative lg:translate-x-0 lg:shadow-none lg:w-64 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`,
    [isOpen]
  );

  return (
    <aside className={containerClasses}>
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 lg:hidden">
        <p className="font-semibold text-slate-900">Navigation</p>
        <button type="button" onClick={onClose} className="text-slate-500 hover:text-slate-900">
          Close
        </button>
      </div>
      <div className="space-y-6 px-4 py-6 sm:px-6 lg:space-y-8 lg:px-5 lg:w-64">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Workspace</p>
          <p className="mt-3 text-lg font-semibold text-slate-900">Task board</p>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `block rounded-3xl px-4 py-3 text-sm font-medium transition ${
                  isActive ? 'bg-brand-500 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
              onClick={onClose}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
