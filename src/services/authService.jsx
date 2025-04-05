import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL; // reads from .env

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_URL}/account/login`, {
    email,
    password
  });
  return res.data;
};

export const registerUser = async (formData) => {
  const res = await axios.post(`${API_URL}/account/register`, formData);
  return res.data;
};
