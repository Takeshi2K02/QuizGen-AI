import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/slices/authSlice';
import { loginUser } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      dispatch(setCredentials(res.data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="w-full max-w-md bg-[var(--secondary)] rounded-2xl shadow-xl p-10">
        <h2 className="text-3xl font-extrabold text-center text-[var(--accent)] mb-6">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[var(--tertiary)] rounded-md bg-[var(--bg)] text-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[var(--tertiary)] rounded-md bg-[var(--bg)] text-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center text-[var(--accent)]">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <Link to="/forgot-password" className="text-[var(--primary)] hover:underline">Forgot Password?</Link>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-[var(--primary)] text-white font-medium hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-center mt-6 text-[var(--accent)]">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-[var(--primary)] font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;