function TaskSkeleton() {
  return (
    <div className="animate-pulse rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200">
      <div className="h-5 w-32 rounded-full bg-slate-200" />
      <div className="mt-4 h-6 w-2/3 rounded-full bg-slate-200" />
      <div className="mt-3 space-y-2">
        <div className="h-4 w-full rounded-full bg-slate-200" />
        <div className="h-4 w-5/6 rounded-full bg-slate-200" />
      </div>
      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="h-8 w-28 rounded-full bg-slate-200" />
        <div className="h-10 w-24 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}

export default TaskSkeleton;
