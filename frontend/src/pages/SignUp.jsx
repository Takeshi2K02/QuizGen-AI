import React, { useState } from 'react';
import { signupUser } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await signupUser(formData);
      setSuccess('Account created successfully. Redirecting...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="w-full max-w-md bg-[var(--bg-subtle)] rounded-2xl shadow-lg p-10 transition-all duration-300 ease-in-out border border-[var(--border)]">
        <h2 className="text-3xl font-bold text-center text-[var(--text)] mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[var(--border)] rounded-md bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
          <input
            type="email"
            name="email"
            placeholder="Email (optional)"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[var(--border)] rounded-md bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[var(--border)] rounded-md bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center mt-6 text-[var(--text-muted)]">
          Already have an account?{' '}
          <Link to="/login" className="text-[var(--primary)] font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
