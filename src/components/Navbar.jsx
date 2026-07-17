import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { NAV_LINKS, PRIVATE_NAV_LINKS } from '../constants';

const linkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-brand-soft text-brand-dark dark:bg-teal-950 dark:text-teal-300'
      : 'text-ink-muted hover:bg-mist hover:text-ink dark:text-slate-300 dark:hover:bg-slate-800'
  }`;

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white shadow-md shadow-brand/30">
            SN
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-ink dark:text-white">
            StudyNook
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClass} end={link.path === '/'}>
              {link.label}
            </NavLink>
          ))}
          {isAuthenticated &&
            PRIVATE_NAV_LINKS.map((link) => (
              <NavLink key={link.path} to={link.path} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {!isAuthenticated ? (
            <div className="hidden items-center gap-2 sm:flex">
              <Link to="/login" className="btn-ghost">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Register
              </Link>
            </div>
          ) : (
            <div className="relative hidden sm:block">
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-line bg-white px-2 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-900"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="h-8 w-8 rounded-lg object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="max-w-[100px] truncate font-medium text-ink dark:text-slate-100">
                  {user.name}
                </span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-line bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900">
                  <Link
                    to="/my-listings"
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-mist dark:hover:bg-slate-800"
                    onClick={() => setMenuOpen(false)}
                  >
                    My Listings
                  </Link>
                  <Link
                    to="/my-bookings"
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-mist dark:hover:bg-slate-800"
                    onClick={() => setMenuOpen(false)}
                  >
                    My Bookings
                  </Link>
                  <button
                    type="button"
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            className="btn-ghost md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line px-4 py-3 md:hidden dark:border-slate-800">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={linkClass}
                onClick={() => setOpen(false)}
                end={link.path === '/'}
              >
                {link.label}
              </NavLink>
            ))}
            {isAuthenticated &&
              PRIVATE_NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={linkClass}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="btn-secondary mt-2" onClick={() => setOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="btn-primary" onClick={() => setOpen(false)}>
                  Register
                </Link>
              </>
            ) : (
              <button type="button" className="btn-secondary mt-2 text-rose-600" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
