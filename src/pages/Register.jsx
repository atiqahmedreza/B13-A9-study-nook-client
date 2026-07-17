import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import PageTitle from '../components/PageTitle';
import { useAuth } from '../context/AuthContext';
import { validatePassword } from '../utils/helpers';

const Register = () => {
  const { register: registerUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    const pwdError = validatePassword(values.password);
    if (pwdError) {
      setPasswordError(pwdError);
      return;
    }
    setPasswordError('');

    try {
      setSubmitting(true);
      await registerUser(values);
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setSubmitting(true);
      await googleLogin();
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Google sign-in failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <PageTitle path="/register" />
      <div className="card-surface p-8">
        <h1 className="font-display text-3xl font-bold text-ink dark:text-white">Create account</h1>
        <p className="mt-2 text-sm text-ink-muted dark:text-slate-400">
          Join StudyNook to list rooms and reserve study space.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="label-field" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="input-field"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>}
          </div>
          <div>
            <label className="label-field" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="input-field"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>}
          </div>
          <div>
            <label className="label-field" htmlFor="photoURL">
              Photo URL
            </label>
            <input
              id="photoURL"
              className="input-field"
              placeholder="https://…"
              {...register('photoURL', { required: 'Photo URL is required' })}
            />
            {errors.photoURL && (
              <p className="mt-1 text-xs text-rose-600">{errors.photoURL.message}</p>
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
              {...register('password', {
                required: 'Password is required',
                onChange: () => setPasswordError(''),
              })}
            />
            {(errors.password || passwordError) && (
              <p className="mt-1 text-xs text-rose-600">
                {passwordError || errors.password.message}
              </p>
            )}
            <p className="mt-1 text-xs text-ink-muted dark:text-slate-500">
              At least 6 characters with one uppercase and one lowercase letter.
            </p>
          </div>
          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting ? 'Creating…' : 'Register'}
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
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
