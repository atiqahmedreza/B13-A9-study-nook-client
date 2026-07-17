const RoomCardSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="card-surface overflow-hidden">
        <div className="h-48 animate-pulse bg-slate-200 dark:bg-slate-700" />
        <div className="space-y-3 p-5">
          <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          <div className="flex gap-2 pt-2">
            <div className="h-6 w-16 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
            <div className="h-6 w-16 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default RoomCardSkeleton;
