import { motion, AnimatePresence } from 'framer-motion';

const ConfirmationModal = ({
  open,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  danger = false,
  loading = false,
}) => (
  <AnimatePresence>
    {open && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.button
          type="button"
          aria-label="Close overlay"
          className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        />
        <motion.div
          role="dialog"
          aria-modal="true"
          className="card-surface relative z-10 w-full max-w-md p-6"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
        >
          <h3 className="font-display text-xl font-bold text-ink dark:text-white">{title}</h3>
          {message && (
            <p className="mt-2 text-sm leading-relaxed text-ink-muted dark:text-slate-400">
              {message}
            </p>
          )}
          <div className="mt-6 flex justify-end gap-3">
            <button type="button" className="btn-secondary" onClick={onCancel} disabled={loading}>
              {cancelLabel}
            </button>
            <button
              type="button"
              className={
                danger
                  ? 'inline-flex items-center justify-center rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-rose-700 disabled:opacity-60'
                  : 'btn-primary'
              }
              onClick={onConfirm}
              disabled={loading}
            >
              {loading ? 'Please wait…' : confirmLabel}
            </button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default ConfirmationModal;
