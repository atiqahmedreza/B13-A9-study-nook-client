const LoadingSpinner = ({ label = 'Loading…' }) => (
  <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3" role="status">
    <div className="h-11 w-11 animate-spin rounded-full border-[3px] border-brand/25 border-t-brand" />
    <p className="text-sm text-ink-muted dark:text-slate-400">{label}</p>
  </div>
);

export default LoadingSpinner;
