function ErrorBanner({ message }) {
  if (!message) return null;

  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      {message}
    </div>
  );
}

export default ErrorBanner;
