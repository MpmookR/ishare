// src/api.js
import axios from 'axios';

// Create a reusable Axios instance for the entire app
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Loaded from .env
  headers: {
    'Content-Type': 'application/json', // Standard content type
  },
});

// Automatically attach the JWT token (if available) to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Read token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add Authorization header
    }
    return config;
  },
  (error) => {
    // In case of request error, reject it
    return Promise.reject(error);
  }
);

export default api; // You can now use `api.get()`, `api.post()`, etc.
