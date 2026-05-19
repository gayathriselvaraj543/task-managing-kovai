import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { signInWithGoogle } from '../api/authService';
import { useAuthStore } from '../app/store/authStore';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ErrorBanner from '../components/feedback/ErrorBanner';
import StatusBadge from '../components/ui/StatusBadge';

function LoginPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setError = useAuthStore((state) => state.setError);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      await signInWithGoogle();
      toast.success('Signed in with Google');
      navigate('/');
    } catch (error) {
      setError(error.message || 'Unable to sign in with Google.');
      toast.error(error.message || 'Unable to sign in with Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3 text-center">
        <p className="inline-flex items-center rounded-full bg-slate-800 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
          Task manager
        </p>
        <h1 className="text-4xl font-semibold text-white sm:text-5xl">Sign in to continue</h1>
        <p className="text-sm text-slate-400 sm:text-base">Use Google to authenticate securely and access your tasks.</p>
      </div>

      <Card className="space-y-6 bg-slate-950/95 text-slate-100">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Google sign in</h2>
          <p className="text-sm text-slate-400">Authenticate using your Google account for persistent access.</p>
        </div>

        <div className="space-y-5">
          <ErrorBanner message={error} />
          <Button type="button" onClick={handleGoogleSignIn} disabled={isLoading} className="w-full">
            {isLoading ? 'Signing in...' : 'Continue with Google'}
          </Button>
        </div>
      </Card>

      <div className="rounded-3xl bg-white/10 p-5 text-sm text-slate-300 shadow-lg shadow-slate-950/10 ring-1 ring-slate-700/60">
        <p className="font-medium">Task status</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <StatusBadge status="Planned" />
          <StatusBadge status="In Progress" />
          <StatusBadge status="Complete" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
