import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import PageTitle from '../components/PageTitle';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      setSubmitting(true);
      await login(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || 'Invalid email or password');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setSubmitting(true);
      await googleLogin();
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || 'Google sign-in failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <PageTitle path="/login" />
      <div className="card-surface p-8">
        <h1 className="font-display text-3xl font-bold text-ink dark:text-white">Welcome back</h1>
        <p className="mt-2 text-sm text-ink-muted dark:text-slate-400">
          Sign in to book rooms and manage your listings.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="label-field" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="input-field"
              placeholder="you@university.edu"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="label-field" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="input-field"
              placeholder="••••••••"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-rose-600">{errors.password.message}</p>
            )}
          </div>
          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Login'}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-line dark:bg-slate-700" />
          <span className="text-xs text-ink-muted">or</span>
          <div className="h-px flex-1 bg-line dark:bg-slate-700" />
        </div>

        <button
          type="button"
          className="btn-secondary w-full"
          onClick={handleGoogle}
          disabled={submitting}
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-ink-muted dark:text-slate-400">
          Don’t have an account?{' '}
          <Link to="/register" className="font-semibold text-brand hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
