import api from './api';

export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const signupUser = (data) => api.post('/auth/signup', data);