import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import PageTitle from '../components/PageTitle';
import LoadingSpinner from '../components/LoadingSpinner';
import BookingModal from '../components/BookingModal';
import ConfirmationModal from '../components/ConfirmationModal';
import { useAuth } from '../context/AuthContext';
import { useDeleteRoom, useRoom } from '../hooks/useRooms';
import { formatCurrency } from '../utils/helpers';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { data: room, isLoading, isError, error } = useRoom(id);
  const deleteRoom = useDeleteRoom();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const isOwner =
    isAuthenticated &&
    room &&
    (room.owner?._id === user?.id || room.owner === user?.id);

  const handleDelete = async () => {
    try {
      await deleteRoom.mutateAsync(id);
      toast.success('Room deleted successfully');
      setDeleteOpen(false);
      navigate('/my-listings');
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (isLoading) return <LoadingSpinner label="Loading room…" />;
  if (isError) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700">
          {error.message}
        </p>
        <Link to="/rooms" className="btn-secondary mt-4 inline-flex">
          Back to Rooms
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageTitle title={`StudyNook – ${room.name}`} />

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl shadow-lg">
          <img
            src={room.image}
            alt={room.name}
            className="h-72 w-full object-cover sm:h-96"
            loading="lazy"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            {room.floor}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-ink dark:text-white md:text-4xl">
            {room.name}
          </h1>
          <p className="mt-4 leading-relaxed text-ink-muted dark:text-slate-400">
            {room.description}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-4">
            <div className="card-surface p-4">
              <dt className="text-xs uppercase tracking-wide text-ink-muted">Capacity</dt>
              <dd className="mt-1 font-display text-xl font-bold">{room.capacity} seats</dd>
            </div>
            <div className="card-surface p-4">
              <dt className="text-xs uppercase tracking-wide text-ink-muted">Hourly Rate</dt>
              <dd className="mt-1 font-display text-xl font-bold">
                {formatCurrency(room.hourlyRate)}/hr
              </dd>
            </div>
            <div className="card-surface p-4">
              <dt className="text-xs uppercase tracking-wide text-ink-muted">Bookings</dt>
              <dd className="mt-1 font-display text-xl font-bold">{room.bookingCount}</dd>
            </div>
            <div className="card-surface p-4">
              <dt className="text-xs uppercase tracking-wide text-ink-muted">Owner</dt>
              <dd className="mt-1 truncate font-medium">{room.owner?.name || 'Library'}</dd>
            </div>
          </dl>

          <div className="mt-5 flex flex-wrap gap-2">
            {(room.amenities || []).map((a) => (
              <span key={a} className="chip">
                {a}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {isAuthenticated ? (
              <button type="button" className="btn-primary" onClick={() => setBookingOpen(true)}>
                Book Now
              </button>
            ) : (
              <Link to="/login" state={{ from: { pathname: `/rooms/${id}` } }} className="btn-primary">
                Login to Book
              </Link>
            )}

            {isOwner && (
              <>
                <Link to={`/update-room/${id}`} className="btn-secondary">
                  Edit
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-700"
                  onClick={() => setDeleteOpen(true)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <BookingModal open={bookingOpen} room={room} onClose={() => setBookingOpen(false)} />
      <ConfirmationModal
        open={deleteOpen}
        title="Delete this room?"
        message="This permanently removes the listing and related booking records. This cannot be undone."
        confirmLabel="Delete Room"
        danger
        loading={deleteRoom.isPending}
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </div>
  );
};

export default RoomDetails;
