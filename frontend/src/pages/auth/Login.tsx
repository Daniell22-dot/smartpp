import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authAPI } from '../../Features/auth/authAPI';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const location = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const redirectPath = new URLSearchParams(location.search).get('redirect') ||
                       (location.state as any)?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormData) => {
    setError('');
    setLoading(true);

    try {
      const res = await authAPI.login({ email: data.email, password: data.password });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      localStorage.setItem('userId', String(res.data.userId));
      localStorage.setItem('userRole', res.data.role);
      localStorage.setItem('userName', res.data.fullName);

      login({
        fullName: res.data.fullName,
        role: res.data.role,
        userId: res.data.userId,
      });

      if (res.data.role === 'admin') {
        window.location.href = '/admin';
      } else if (res.data.role === 'staff') {
        window.location.href = '/staff';
      } else {
        window.location.href = `/${redirectPath}`;
      }
    } catch (err: any) {
      if (err.message.includes('credentials')) {
        setError('Invalid email or password. Please try again.');
      } else if (err.message.includes('not verified')) {
        setError('Please verify your email before logging in.');
      } else {
        setError(err.message || 'Login failed. Please try again.');
      }
      setLoading(false);
    }
  };

  const redirectPath = new URLSearchParams(location.search).get('redirect') ||
                       (location.state as any)?.from?.pathname || '/';

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-card">
          <Link to="/" className="auth-back-link">← Back to Home</Link>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-sub">Sign in to your SMARTP account</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div className="auth-field">
              <label className="auth-label">Email Address</label>
              <input
                type="email"
                className={`auth-input ${errors.email ? 'auth-input--error' : ''}`}
                placeholder="you@example.com"
                {...register('email')}
              />
              {errors.email && <span className="auth-error-message">{errors.email.message}</span>}
            </div>

            <div className="auth-field">
              <label className="auth-label">Password</label>
              <div className="auth-password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`auth-input ${errors.password ? 'auth-input--error' : ''}`}
                  placeholder="Enter your password"
                  {...register('password')}
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className="auth-error-message">{errors.password.message}</span>}
            </div>

            <div className="auth-links">
              <Link to="/forgot-password" className="auth-link">Forgot Password?</Link>
            </div>

            <button type="submit" className="btn-primary btn-full" disabled={loading}>
              {loading ? <Loader2 size={18} className="btn-spinner" /> : 'Sign In'}
            </button>

            <p className="auth-footer">
              Don't have an account? <Link to="/register" className="auth-link">Create one</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}