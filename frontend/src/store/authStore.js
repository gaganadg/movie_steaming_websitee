import { create } from 'zustand';
import API from '../api/axios';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: true,
  error: null,

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      set({ 
        user: res.data.user, 
        token: res.data.token, 
        isAuthenticated: true, 
        loading: false 
      });
      return true;
    } catch (error) {
      set({ 
        error: error.response?.data?.error || 'Login failed', 
        loading: false 
      });
      return false;
    }
  },

  register: async (name, email, password) => {
    try {
      set({ loading: true, error: null });
      const res = await API.post('/auth/register', { name, email, password });
      localStorage.setItem('token', res.data.token);
      set({ 
        user: res.data.user, 
        token: res.data.token, 
        isAuthenticated: true, 
        loading: false 
      });
      return true;
    } catch (error) {
      set({ 
        error: error.response?.data?.error || 'Registration failed', 
        loading: false 
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ loading: false });
      return;
    }
    
    try {
      const res = await API.get('/auth/me');
      set({ 
        user: res.data.data, 
        isAuthenticated: true, 
        loading: false 
      });
    } catch (error) {
      localStorage.removeItem('token');
      set({ 
        user: null, 
        token: null, 
        isAuthenticated: false, 
        loading: false 
      });
    }
  }
}));

export default useAuthStore;
