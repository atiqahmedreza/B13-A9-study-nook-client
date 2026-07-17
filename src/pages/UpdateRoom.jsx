import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import PageTitle from '../components/PageTitle';
import LoadingSpinner from '../components/LoadingSpinner';
import { AMENITIES } from '../constants';
import { useRoom, useUpdateRoom } from '../hooks/useRooms';
import { useAuth } from '../context/AuthContext';

const UpdateRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: room, isLoading, isError, error } = useRoom(id);
  const updateRoom = useUpdateRoom();
  const [amenities, setAmenities] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (room) {
      reset({
        name: room.name,
        description: room.description,
        image: room.image,
        floor: room.floor,
        capacity: room.capacity,
        hourlyRate: room.hourlyRate,
      });
      setAmenities(room.amenities || []);
    }
  }, [room, reset]);

  useEffect(() => {
    if (room && user) {
      const ownerId = room.owner?._id || room.owner;
      if (ownerId !== user.id) {
        toast.error('You can only edit your own rooms');
        navigate('/my-listings');
      }
    }
  }, [room, user, navigate]);

  const toggleAmenity = (item) => {
    setAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const onSubmit = async (values) => {
    try {
      await updateRoom.mutateAsync({
        id,
        data: {
          ...values,
          capacity: Number(values.capacity),
          hourlyRate: Number(values.hourlyRate),
          amenities,
        },
      });
      toast.success('Room updated successfully');
      navigate(`/rooms/${id}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <p className="text-rose-600">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <PageTitle title="StudyNook – Update Room" />
      <h1 className="section-heading">Update Room</h1>
      <p className="mt-2 text-ink-muted dark:text-slate-400">Adjust listing details for {room.name}.</p>

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
        </div>

        <div>
          <label className="label-field" htmlFor="image">
            Image URL
          </label>
          <input id="image" className="input-field" {...register('image', { required: true })} />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="label-field" htmlFor="floor">
              Floor
            </label>
            <input id="floor" className="input-field" {...register('floor', { required: true })} />
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
              {...register('capacity', { required: true })}
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
              {...register('hourlyRate', { required: true })}
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

        <button type="submit" className="btn-primary" disabled={updateRoom.isPending}>
          {updateRoom.isPending ? 'Updating…' : 'Update Room'}
        </button>
      </form>
    </div>
  );
};

export default UpdateRoom;
