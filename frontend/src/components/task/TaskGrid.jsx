function TaskGrid({ children, className = '' }) {
  return <div className={`grid gap-4 sm:grid-cols-2 xl:grid-cols-3 ${className}`}>{children}</div>;
}

export default TaskGrid;
