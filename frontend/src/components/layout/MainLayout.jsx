import { Link, useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import useResponsiveNav from '../../hooks/useResponsiveNav';
import { useAuthStore } from '../../app/store/authStore';
import { logoutUser } from '../../api/authService';

function MainLayout({ children }) {
  const { pathname } = useLocation();
  const { isMobile, isOpen, toggleNav, closeNav } = useResponsiveNav();
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  async function handleLogout() {
    await logoutUser();
    clearAuth();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <Link to="/" className="text-xl font-semibold text-slate-900">
              Intern Kovai
            </Link>
          </div>

          <nav className="flex items-center gap-3">
            {isMobile ? (
              <button
                type="button"
                onClick={toggleNav}
                className="rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-700"
              >
                {isOpen ? 'Close' : 'Menu'}
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <Link className={`text-sm ${pathname === '/' ? 'font-semibold text-brand-600' : 'text-slate-600'}`} to="/">
                  Dashboard
                </Link>
                <Link className={`text-sm ${pathname === '/profile' ? 'font-semibold text-brand-600' : 'text-slate-600'}`} to="/profile">
                  Profile
                </Link>
                <Button onClick={handleLogout}>Sign out</Button>
              </div>
            )}
          </nav>
        </div>
      </header>

      {isMobile && isOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-4">
          <div className="space-y-2">
            <Link to="/" onClick={closeNav} className="block text-sm text-slate-700">
              Dashboard
            </Link>
            <Link to="/profile" onClick={closeNav} className="block text-sm text-slate-700">
              Profile
            </Link>
            <button type="button" onClick={handleLogout} className="text-sm font-semibold text-brand-600">
              Sign out
            </button>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {user && <p className="mb-6 text-sm text-slate-500">Signed in as {user.email}</p>}
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
