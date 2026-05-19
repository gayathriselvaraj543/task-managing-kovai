import { useAuthStore } from '../../app/store/authStore';
import { logoutUser } from '../../api/authService';
import Button from '../ui/Button';

function Navbar({ onToggleSidebar }) {
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  async function handleLogout() {
    await logoutUser();
    clearAuth();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm px-4 py-3 shadow-sm shadow-slate-100 sm:px-6 lg:px-0">
      <div className="mx-auto flex items-center justify-between gap-4 max-w-7xl px-4 lg:px-8">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 lg:hidden"
        >
          <span className="text-xl">☰</span>
        </button>

        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600">Good work, {user?.email?.split('@')[0] || 'user'}.</p>
          <h2 className="text-xl font-semibold text-slate-900">Build your best day</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-600 hidden sm:block">{user?.email}</div>
          <Button className="rounded-xl px-4 py-2" onClick={handleLogout}>Sign out</Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
