import { useMemo, useState } from 'react';
import RoomCard from '../components/RoomCard';
import RoomCardSkeleton from '../components/RoomCardSkeleton';
import PageTitle from '../components/PageTitle';
import { useRooms } from '../hooks/useRooms';
import { AMENITIES } from '../constants';

const Rooms = () => {
  const [search, setSearch] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [floor, setFloor] = useState('');
  const [minRate, setMinRate] = useState('');
  const [maxRate, setMaxRate] = useState('');
  const [applied, setApplied] = useState({});

  const params = useMemo(() => {
    const p = {};
    if (applied.search) p.search = applied.search;
    if (applied.amenities?.length) p.amenities = applied.amenities.join(',');
    if (applied.floor) p.floor = applied.floor;
    if (applied.minRate) p.minRate = applied.minRate;
    if (applied.maxRate) p.maxRate = applied.maxRate;
    return p;
  }, [applied]);

  const { data: rooms = [], isLoading, isError, error, isFetching } = useRooms(params);

  const toggleAmenity = (item) => {
    setSelectedAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const applyFilters = (e) => {
    e.preventDefault();
    setApplied({
      search: search.trim(),
      amenities: selectedAmenities,
      floor: floor.trim(),
      minRate,
      maxRate,
    });
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedAmenities([]);
    setFloor('');
    setMinRate('');
    setMaxRate('');
    setApplied({});
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageTitle path="/rooms" />
      <div className="mb-8">
        <h1 className="section-heading">Available Rooms</h1>
        <p className="mt-2 text-ink-muted dark:text-slate-400">
          Search by name and refine with amenities, floor, and rate filters.
        </p>
      </div>

      <form
        onSubmit={applyFilters}
        className="card-surface mb-8 grid gap-4 p-5 md:grid-cols-2 lg:grid-cols-4"
      >
        <div className="lg:col-span-2">
          <label className="label-field" htmlFor="search">
            Search by name
          </label>
          <input
            id="search"
            className="input-field"
            placeholder="e.g. Quiet Corner"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <label className="label-field" htmlFor="floor">
            Floor
          </label>
          <input
            id="floor"
            className="input-field"
            placeholder="3rd Floor"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="label-field" htmlFor="minRate">
              Min $/hr
            </label>
            <input
              id="minRate"
              type="number"
              min="0"
              className="input-field"
              value={minRate}
              onChange={(e) => setMinRate(e.target.value)}
            />
          </div>
          <div>
            <label className="label-field" htmlFor="maxRate">
              Max $/hr
            </label>
            <input
              id="maxRate"
              type="number"
              min="0"
              className="input-field"
              value={maxRate}
              onChange={(e) => setMaxRate(e.target.value)}
            />
          </div>
        </div>

        <div className="md:col-span-2 lg:col-span-4">
          <p className="label-field">Amenities</p>
          <div className="flex flex-wrap gap-2">
            {AMENITIES.map((item) => (
              <label
                key={item}
                className={`cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                  selectedAmenities.includes(item)
                    ? 'border-brand bg-brand-soft text-brand-dark dark:bg-teal-950 dark:text-teal-300'
                    : 'border-line text-ink-muted dark:border-slate-600 dark:text-slate-400'
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={selectedAmenities.includes(item)}
                  onChange={() => toggleAmenity(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-2 md:col-span-2 lg:col-span-4">
          <button type="submit" className="btn-primary">
            Apply Filters
          </button>
          <button type="button" className="btn-secondary" onClick={clearFilters}>
            Clear
          </button>
        </div>
      </form>

      {(isLoading || isFetching) && <RoomCardSkeleton count={6} />}

      {isError && (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error.message}
        </p>
      )}

      {!isLoading && !isFetching && rooms.length === 0 && (
        <div className="card-surface px-6 py-16 text-center">
          <p className="font-display text-xl font-bold text-ink dark:text-white">No rooms found</p>
          <p className="mt-2 text-sm text-ink-muted dark:text-slate-400">
            Try adjusting your search or filters.
          </p>
        </div>
      )}

      {!isLoading && !isFetching && rooms.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, i) => (
            <RoomCard key={room._id} room={room} index={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Rooms;
