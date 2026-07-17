import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import RoomCard from '../components/RoomCard';
import RoomCardSkeleton from '../components/RoomCardSkeleton';
import PageTitle from '../components/PageTitle';
import { useLatestRooms } from '../hooks/useRooms';
import { fadeUp, staggerContainer } from '../animations/variants';

const testimonials = [
  {
    quote:
      'I stopped double-booking the media room by accident. StudyNook shows real availability and locks the slot instantly.',
    name: 'Aisha Rahman',
    role: 'Graduate Researcher',
  },
  {
    quote:
      'Listing our quiet pods took minutes. Students book after hours without emailing the front desk.',
    name: 'Marcus Chen',
    role: 'Library Operations Lead',
  },
  {
    quote:
      'The hourly cost calculator and conflict checks make group project planning far less stressful.',
    name: 'Priya Nair',
    role: 'CS Undergraduate',
  },
];

const reasons = [
  {
    title: 'Conflict-free scheduling',
    body: 'Overlapping bookings are blocked server-side so confirmed slots stay exclusive.',
  },
  {
    title: 'Owner-first controls',
    body: 'List rooms you manage, update amenities and rates, and remove listings anytime.',
  },
  {
    title: 'Session that sticks',
    body: 'JWT cookies keep you signed in across reloads—private pages never bounce you out.',
  },
  {
    title: 'Search that scales',
    body: 'Filter by name, amenities, floor, and hourly rate without leaving the rooms grid.',
  },
];

const Home = () => {
  const { data: rooms = [], isLoading, isError, error } = useLatestRooms();

  return (
    <>
      <PageTitle path="/" description="Find and book quiet library study rooms with StudyNook." />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-700 via-teal-600 to-sky-700" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1600&q=70')] bg-cover bg-center opacity-25 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />

        <div className="relative mx-auto flex min-h-[72vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl"
          >
            <p className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.2em] text-teal-100">
              StudyNook
            </p>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Find Your Perfect Study Room
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-teal-50/95 sm:text-lg">
              Browse and book quiet, private study rooms in your library. List your own room and
              earn.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/rooms"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-teal-800 shadow-lg transition hover:bg-teal-50"
              >
                Explore Rooms
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                List a Room
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="section-heading">Available Study Rooms</h2>
            <p className="mt-2 text-ink-muted dark:text-slate-400">
              Fresh listings from the library network—updated as rooms go live.
            </p>
          </div>
          <Link to="/rooms" className="btn-secondary">
            View all rooms
          </Link>
        </div>

        {isLoading && <RoomCardSkeleton count={6} />}
        {isError && (
          <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error.message}
          </p>
        )}
        {!isLoading && !isError && rooms.length === 0 && (
          <p className="text-center text-ink-muted">No rooms available yet. Check back soon.</p>
        )}
        {!isLoading && rooms.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room, i) => (
              <RoomCard key={room._id} room={room} index={i} />
            ))}
          </div>
        )}
      </section>

      <section id="why-studynook" className="border-y border-line bg-white/60 py-16 dark:border-slate-800 dark:bg-slate-950/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-center">Why Choose StudyNook</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-ink-muted dark:text-slate-400">
            Built for libraries and learners who need reliable space—not another messy group chat.
          </p>
          <motion.div
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {reasons.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={fadeUp}
                className="card-surface p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="font-display text-lg font-bold text-ink dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted dark:text-slate-400">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="section-heading text-center">What Learners Say</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-ink-muted dark:text-slate-400">
          Real feedback from students and staff who book StudyNook every week.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              className="card-surface p-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-sm leading-relaxed text-ink dark:text-slate-200">“{t.quote}”</p>
              <footer className="mt-5 border-t border-line pt-4 dark:border-slate-700">
                <p className="font-semibold text-ink dark:text-white">{t.name}</p>
                <p className="text-xs text-ink-muted dark:text-slate-400">{t.role}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
