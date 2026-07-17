import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import PageTitle from '../components/PageTitle';
import { AMENITIES } from '../constants';
import { useCreateRoom } from '../hooks/useRooms';

const AddRoom = () => {
  const navigate = useNavigate();
  const createRoom = useCreateRoom();
  const [amenities, setAmenities] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      floor: '1st Floor',
      capacity: 4,
      hourlyRate: 5,
    },
  });

  const toggleAmenity = (item) => {
    setAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const onSubmit = async (values) => {
    try {
      await createRoom.mutateAsync({
        ...values,
        capacity: Number(values.capacity),
        hourlyRate: Number(values.hourlyRate),
        amenities,
      });
      toast.success('Room added successfully');
      navigate('/my-listings');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <PageTitle path="/add-room" title="StudyNook – Add Room" />
      <h1 className="section-heading">Add Room</h1>
      <p className="mt-2 text-ink-muted dark:text-slate-400">
        List a study space you manage. You can edit details later.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="card-surface mt-8 space-y-4 p-6">
        <div>
          <label className="label-field" htmlFor="name">
            Room Name
          </label>
          <input
            id="name"
            className="input-field"
            {...register('name', { required: 'Room name is required' })}
          />
          {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>}
        </div>

        <div>
          <label className="label-field" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="input-field resize-none"
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-rose-600">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="label-field" htmlFor="image">
            Image URL
          </label>
          <input
            id="image"
            className="input-field"
            placeholder="https://…"
            {...register('image', { required: 'Image URL is required' })}
          />
          {errors.image && <p className="mt-1 text-xs text-rose-600">{errors.image.message}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="label-field" htmlFor="floor">
              Floor
            </label>
            <input
              id="floor"
              className="input-field"
              {...register('floor', { required: 'Floor is required' })}
            />
          </div>
          <div>
            <label className="label-field" htmlFor="capacity">
              Capacity
            </label>
            <input
              id="capacity"
              type="number"
              min="1"
              className="input-field"
              {...register('capacity', { required: true, min: 1 })}
            />
          </div>
          <div>
            <label className="label-field" htmlFor="hourlyRate">
              Hourly Rate ($)
            </label>
            <input
              id="hourlyRate"
              type="number"
              min="0"
              step="0.5"
              className="input-field"
              {...register('hourlyRate', { required: true, min: 0 })}
            />
          </div>
        </div>

        <div>
          <p className="label-field">Amenities</p>
          <div className="flex flex-wrap gap-2">
            {AMENITIES.map((item) => (
              <label
                key={item}
                className={`cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-medium ${
                  amenities.includes(item)
                    ? 'border-brand bg-brand-soft text-brand-dark'
                    : 'border-line text-ink-muted dark:border-slate-600'
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={amenities.includes(item)}
                  onChange={() => toggleAmenity(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={createRoom.isPending}>
          {createRoom.isPending ? 'Saving…' : 'Add Room'}
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
