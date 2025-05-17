import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

let token = localStorage.getItem('token');
let user = null;
let isAuthenticated = false;

if (token) {
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    if (decoded.exp > now) {
      isAuthenticated = true;
      user = { username: decoded.username };
    } else {
      token = null;
      localStorage.removeItem('token');
    }
  } catch {
    token = null;
    localStorage.removeItem('token');
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user,
    token,
    isAuthenticated,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem('token', token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;