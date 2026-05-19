import Card from '../ui/Card';

function AuthLayout({ children }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-white px-4 py-12">
      <Card className="w-full max-w-md">
        {children}
      </Card>
    </main>
  );
}

export default AuthLayout;
