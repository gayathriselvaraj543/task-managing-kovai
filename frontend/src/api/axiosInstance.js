import axios from 'axios';
import { toast } from 'react-hot-toast';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const TOKEN_KEY = 'intern_kovai_auth_token';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || 'An error occurred';

    // If unauthorized, clear stored token and redirect to login to force re-auth
    if (status === 401) {
      console.warn('Received 401 from API — clearing local auth and redirecting to login');
      try {
        attachAuthHeader(null);
      } catch (e) {
        localStorage.removeItem(TOKEN_KEY);
      }
      // Give toast feedback then redirect
      toast.error('Session expired. Redirecting to login...');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    toast.error(message);
    return Promise.reject(error);
  }
);

export function attachAuthHeader(token) {
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    delete axiosInstance.defaults.headers.common.Authorization;
    localStorage.removeItem(TOKEN_KEY);
  }
}

export default axiosInstance;
