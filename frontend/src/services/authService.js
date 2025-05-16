import api from './api';

export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const signupUser = (data) => api.post('/auth/signup', data);

// 🆕 Send reset link to email
export const requestPasswordReset = ({ email }) =>
  api.post('/auth/forgot-password', { email });

// 🆕 Submit new password using token
export const resetPasswordWithToken = ({ token, newPassword }) =>
  api.post('/auth/reset-password', { token, newPassword });