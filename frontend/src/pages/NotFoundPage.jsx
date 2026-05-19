import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <Card className="w-full max-w-xl text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-brand-600">404</p>
        <h1 className="mt-4 text-5xl font-semibold text-slate-900">Page not found</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          The page you’re looking for doesn’t exist. Return home and keep planning your tasks.
        </p>
        <Link to="/">
          <Button className="mt-8">Back to dashboard</Button>
        </Link>
      </Card>
    </div>
  );
}

export default NotFoundPage;
