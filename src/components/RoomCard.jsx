import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { truncate, formatCurrency } from '../utils/helpers';

const RoomCard = ({ room, index = 0 }) => {
  const amenities = room.amenities || [];
  const visible = amenities.slice(0, 3);
  const extra = amenities.length - visible.length;

  return (
    <motion.article
      className="card-surface group flex h-full flex-col overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-2.5 py-1 text-xs font-semibold text-brand-dark shadow-sm dark:bg-slate-900/90 dark:text-teal-300">
          {formatCurrency(room.hourlyRate)}/hr
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-ink dark:text-white">{room.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted dark:text-slate-400">
          {truncate(room.description, 100)}
        </p>

        <div className="mt-4 flex flex-wrap gap-3 text-xs font-medium text-ink-muted dark:text-slate-400">
          <span className="inline-flex items-center gap-1">
            <span className="text-brand">▣</span> {room.floor}
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="text-brand">◎</span> {room.capacity} seats
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {visible.map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
          {extra > 0 && <span className="chip">+{extra} more</span>}
        </div>

        <div className="mt-auto pt-5">
          <Link to={`/rooms/${room._id}`} className="btn-primary w-full">
            View Details
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default RoomCard;
