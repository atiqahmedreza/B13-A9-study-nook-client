import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

const NotFound = () => (
  <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
    <PageTitle title="StudyNook – Page Not Found" />
    <p className="font-display text-7xl font-extrabold text-brand">404</p>
    <h1 className="mt-4 font-display text-2xl font-bold text-ink dark:text-white">
      Page not found
    </h1>
    <p className="mt-2 text-sm text-ink-muted dark:text-slate-400">
      The page you are looking for does not exist or may have been moved.
    </p>
    <Link to="/" className="btn-primary mt-8">
      Back to Home
    </Link>
  </div>
);

export default NotFound;
