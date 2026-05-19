import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import Card from '../../components/ui/Card';
import LoadingSpinner from '../../components/feedback/LoadingSpinner';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await axiosInstance.get('/users/me');
        setProfile(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Unable to load profile data.');
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-slate-900">Profile</h1>
        <p className="mt-2 text-sm text-slate-500">Review your account details and saved preferences.</p>
      </header>

      <Card>
        <div className="space-y-4 text-sm text-slate-700">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Email</p>
              <p className="mt-2 text-base font-medium text-slate-900">{profile?.email}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Registered</p>
              <p className="mt-2 text-base font-medium text-slate-900">{profile?.createdAt ? new Date(profile.createdAt).toLocaleString() : '-'}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">User ID</p>
            <p className="mt-2 break-all text-base font-medium text-slate-900">{profile?.uid}</p>
          </div>
        </div>
      </Card>

      {error && <p className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
    </div>
  );
}

export default ProfilePage;
