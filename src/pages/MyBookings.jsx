import { useState } from 'react';
import toast from 'react-hot-toast';
import PageTitle from '../components/PageTitle';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmationModal from '../components/ConfirmationModal';
import { useCancelBooking, useMyBookings } from '../hooks/useRooms';
import { canCancelBooking, formatCurrency } from '../utils/helpers';

const MyBookings = () => {
  const { data: bookings = [], isLoading, isError, error } = useMyBookings();
  const cancelBooking = useCancelBooking();
  const [selected, setSelected] = useState(null);

  const handleCancel = async () => {
    try {
      await cancelBooking.mutateAsync(selected._id);
      toast.success('Booking cancelled');
      setSelected(null);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageTitle path="/my-bookings" />
      <h1 className="section-heading">My Bookings</h1>
      <p className="mt-2 text-ink-muted dark:text-slate-400">
        Review upcoming reservations and cancel future confirmed bookings.
      </p>

      {isLoading && <LoadingSpinner label="Loading bookings…" />}
      {isError && <p className="mt-6 text-rose-600">{error.message}</p>}

      {!isLoading && bookings.length === 0 && (
        <div className="card-surface mt-8 px-6 py-16 text-center">
          <p className="font-display text-xl font-bold text-ink dark:text-white">
            You have no bookings yet.
          </p>
          <p className="mt-2 text-sm text-ink-muted">Browse rooms and reserve a quiet slot.</p>
        </div>
      )}

      {!isLoading && bookings.length > 0 && (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-line bg-mist/80 text-xs uppercase tracking-wide text-ink-muted dark:border-slate-700 dark:bg-slate-800/80">
              <tr>
                <th className="px-4 py-3">Room</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Cost</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b border-line/70 last:border-0 dark:border-slate-800"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {booking.room?.image && (
                        <img
                          src={booking.room.image}
                          alt=""
                          className="h-12 w-12 rounded-lg object-cover"
                          loading="lazy"
                        />
                      )}
                      <span className="font-medium text-ink dark:text-slate-100">
                        {booking.room?.name || 'Deleted room'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-muted dark:text-slate-400">{booking.date}</td>
                  <td className="px-4 py-3 text-ink-muted dark:text-slate-400">
                    {booking.startTime} – {booking.endTime}
                  </td>
                  <td className="px-4 py-3 font-medium">{formatCurrency(booking.totalCost)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-semibold capitalize ${
                        booking.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {canCancelBooking(booking) ? (
                      <button
                        type="button"
                        className="text-sm font-semibold text-rose-600 hover:underline"
                        onClick={() => setSelected(booking)}
                      >
                        Cancel
                      </button>
                    ) : (
                      <span className="text-xs text-ink-muted">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmationModal
        open={Boolean(selected)}
        title="Cancel this booking?"
        message={
          selected
            ? `Cancel ${selected.room?.name} on ${selected.date} (${selected.startTime}–${selected.endTime})?`
            : ''
        }
        confirmLabel="Cancel Booking"
        danger
        loading={cancelBooking.isPending}
        onConfirm={handleCancel}
        onCancel={() => setSelected(null)}
      />
    </div>
  );
};

export default MyBookings;
