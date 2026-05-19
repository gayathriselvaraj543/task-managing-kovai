function Card({ title, children, className = '' }) {
  return (
    <section className={`rounded-[2rem] bg-white p-6 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.25)] ${className}`}>
      {title && <h2 className="mb-5 text-xl font-semibold text-slate-900">{title}</h2>}
      {children}
    </section>
  );
}

export default Card;
