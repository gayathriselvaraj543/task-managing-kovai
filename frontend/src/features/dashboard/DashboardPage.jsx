import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import Card from '../../components/ui/Card';
import LoadingSpinner from '../../components/feedback/LoadingSpinner';

function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadSummary() {
      try {
        const response = await axiosInstance.get('/users/me');
        setSummary(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Unable to load dashboard data.');
      } finally {
        setLoading(false);
      }
    }

    loadSummary();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-sm text-slate-500">A lightweight summary of your signed-in profile.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Your profile">
          <dl className="space-y-4 text-sm text-slate-700">
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <dt>Email</dt>
              <dd>{summary?.email || 'Unknown'}</dd>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <dt>User ID</dt>
              <dd>{summary?.uid || 'N/A'}</dd>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <dt>Joined</dt>
              <dd>{summary?.createdAt ? new Date(summary.createdAt).toLocaleDateString() : 'Pending'}</dd>
            </div>
          </dl>
        </Card>

        <Card title="Quick actions">
          <p className="text-sm text-slate-600">Use the navigation menu to access your profile and manage your account.</p>
        </Card>
      </div>

      {error && <p className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
    </div>
  );
}

export default DashboardPage;
