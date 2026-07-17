import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import LoadingSpinner from '../components/LoadingSpinner';
import RoomCard from '../components/RoomCard';
import { useMyListings } from '../hooks/useRooms';

const MyListings = () => {
  const { data: rooms = [], isLoading, isError, error } = useMyListings();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageTitle path="/my-listings" />
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="section-heading">My Listings</h1>
          <p className="mt-2 text-ink-muted dark:text-slate-400">
            Rooms you own and manage on StudyNook.
          </p>
        </div>
        <Link to="/add-room" className="btn-primary">
          Add Room
        </Link>
      </div>

      {isLoading && <LoadingSpinner label="Loading your listings…" />}
      {isError && <p className="text-rose-600">{error.message}</p>}

      {!isLoading && rooms.length === 0 && (
        <div className="card-surface px-6 py-16 text-center">
          <p className="font-display text-xl font-bold text-ink dark:text-white">
            You have no listings yet
          </p>
          <p className="mt-2 text-sm text-ink-muted">Publish your first study room to get started.</p>
          <Link to="/add-room" className="btn-primary mt-6 inline-flex">
            Add Room
          </Link>
        </div>
      )}

      {!isLoading && rooms.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, i) => (
            <RoomCard key={room._id} room={room} index={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;
