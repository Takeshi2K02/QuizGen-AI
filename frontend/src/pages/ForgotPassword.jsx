import React, { useState } from 'react';
import { requestPasswordReset } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await requestPasswordReset({ email });
      setMessage('Password reset link sent to your email.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset link');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="w-full max-w-md bg-[var(--secondary)] rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-[var(--accent)] mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md border-[var(--tertiary)] bg-[var(--bg)] text-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          {message && <p className="text-sm text-green-600">{message}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-[var(--primary)] text-white rounded-md font-medium hover:opacity-90 transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;