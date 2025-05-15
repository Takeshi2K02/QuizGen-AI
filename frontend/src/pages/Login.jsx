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
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--bg)' }}>
      <style>{`
        .card {
          background: var(--secondary);
          border-radius: 8px;
          box-shadow: var(--shadow);
          padding: 20px;
          max-width: 400px;
          width: 100%;
        }
        .input-field {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid var(--border);
          border-radius: 4px;
          font-size: 16px;
          color: var(--accent);
        }
        .input-field:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px var(--focus);
        }
        .btn {
          width: 100%;
          padding: 10px;
          background-color: var(--primary);
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
        }
        .btn:hover {
          background-color: color-mix(in srgb, var(--primary) 90%, black);
        }
        a {
          color: var(--primary);
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
      <div className="card">
        <h2 className="text-2xl font-bold mb-6 text-[var(--accent)]">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Email or Username"
            required
            className="input-field"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="input-field"
          />
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center text-[var(--accent)]">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="btn">
            Sign In
          </button>
          <p className="text-center text-sm text-[var(--accent)] mt-4">
            Don’t have an account? <Link to="/signup">Create one</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;