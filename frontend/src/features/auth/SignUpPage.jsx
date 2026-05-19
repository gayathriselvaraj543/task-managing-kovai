import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpWithEmail } from '../../api/authService';
import { useAuthStore } from '../../app/store/authStore';
import Button from '../../components/ui/Button';
import FormField from '../../components/ui/FormField';
import Card from '../../components/ui/Card';
import ErrorBanner from '../../components/feedback/ErrorBanner';

function SignUpPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const setLoading = useAuthStore((state) => state.setLoading);
  const setError = useAuthStore((state) => state.setError);
  const error = useAuthStore((state) => state.error);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await signUpWithEmail(form);
      navigate('/');
    } catch (error) {
      setError(error.message || 'Unable to sign up, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Create your account</h1>
        <p className="mt-2 text-sm text-slate-500">Register using email and password to access the dashboard.</p>
      </div>

      <Card>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <ErrorBanner message={error} />
          <FormField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="hello@example.com"
          />
          <FormField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a strong password"
          />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit">Create account</Button>
            <Link className="text-sm text-brand-600 hover:underline" to="/login">
              Already have an account?
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default SignUpPage;
