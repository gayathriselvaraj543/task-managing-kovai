function AuthenticationLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6">
      <div className="mx-auto max-w-md rounded-[2rem] bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-lg ring-1 ring-slate-700">
        {children}
      </div>
    </div>
  );
}

export default AuthenticationLayout;
