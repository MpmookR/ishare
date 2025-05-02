import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = import.meta.env.VITE_API_BASE_URL;

// LOGIN FLOW
export const loginUser = async (email, password) => {
  try {
    // Step 1: Send login request to API
    const res = await axios.post(`${API_URL}/account/login`, { email, password });

    // Step 2: Extract token from response
    const token =
      typeof res.data === 'string' ? res.data
      : res.data?.token || null;

    // Validate token format
    if (!token || typeof token !== 'string' || token.split('.').length !== 3) {
      throw new Error("Invalid token received from backend.");
    }

    // Step 3: Decode token to get userId
    const decoded = jwtDecode(token);
    const userId = decoded.nameid || decoded.sub;

    if (!userId) throw new Error("User ID not found in token.");

    // Step 4: Fetch full user profile from backend
    const userRes = await axios.get(`${API_URL}/account/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = userRes.data;

    // Step 5: Return user and token
    return { user, token };
  } catch (error) {
    console.error("loginUser error:", error.message);
    throw error;
  }
};

// REGISTER FLOW
export const registerUser = async (formData) => {
  const res = await axios.post(`${API_URL}/account/register`, formData);
  return res.data;
};
