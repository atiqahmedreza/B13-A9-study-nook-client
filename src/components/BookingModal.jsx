import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { TIME_SLOTS } from '../constants';
import { calculateBookingCost, formatCurrency, getTodayISO } from '../utils/helpers';
import { useCreateBooking } from '../hooks/useRooms';

const BookingModal = ({ open, room, onClose }) => {
  const createBooking = useCreateBooking();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: getTodayISO(),
      startTime: '09:00',
      endTime: '10:00',
      specialNote: '',
    },
  });

  const startTime = watch('startTime');
  const endTime = watch('endTime');
  const [submitting, setSubmitting] = useState(false);

  const endOptions = useMemo(
    () => TIME_SLOTS.filter((slot) => slot > startTime),
    [startTime]
  );

  const totalCost = calculateBookingCost(startTime, endTime, room?.hourlyRate || 0);

  const onSubmit = async (values) => {
    try {
      setSubmitting(true);
      await createBooking.mutateAsync({
        roomId: room._id,
        date: values.date,
        startTime: values.startTime,
        endTime: values.endTime,
        specialNote: values.specialNote,
      });
      toast.success('Room booked successfully!');
      reset();
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && room && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.button
            type="button"
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-label="Close booking modal"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="card-surface relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto p-6"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-bold text-ink dark:text-white">
                  Book {room.name}
                </h3>
                <p className="mt-1 text-sm text-ink-muted dark:text-slate-400">
                  {formatCurrency(room.hourlyRate)}/hr · {room.floor}
                </p>
              </div>
              <button type="button" className="btn-ghost" onClick={onClose}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="label-field" htmlFor="date">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  min={getTodayISO()}
                  className="input-field"
                  {...register('date', { required: 'Date is required' })}
                />
                {errors.date && (
                  <p className="mt-1 text-xs text-rose-600">{errors.date.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-field" htmlFor="startTime">
                    Start Time
                  </label>
                  <select id="startTime" className="input-field" {...register('startTime')}>
                    {TIME_SLOTS.slice(0, -1).map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label-field" htmlFor="endTime">
                    End Time
                  </label>
                  <select id="endTime" className="input-field" {...register('endTime')}>
                    {endOptions.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="label-field" htmlFor="specialNote">
                  Special Note (optional)
                </label>
                <textarea
                  id="specialNote"
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Any preferences for setup or access?"
                  {...register('specialNote')}
                />
              </div>

              <div className="rounded-xl bg-brand-soft/70 px-4 py-3 dark:bg-teal-950/50">
                <p className="text-sm font-medium text-brand-dark dark:text-teal-200">
                  Total Cost:{' '}
                  <span className="font-display text-lg font-bold">
                    {formatCurrency(totalCost)}
                  </span>
                </p>
              </div>

              <button type="submit" className="btn-primary w-full" disabled={submitting}>
                {submitting ? 'Booking…' : 'Confirm Booking'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
