function Button({ children, type = 'button', className = '', ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-2xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-slate-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
