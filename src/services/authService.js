import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL; // reads from .env

// LOGIN FLOW
export const loginUser = async (email, password) => {

  // Step 1: Get token response from backend
  const res = await axios.post(`${API_URL}/account/login`, {
      email,
      password,
      
    });

  // Step 2: Extract the token (handle string or object format)
    const token = typeof res.data === 'string' ? res.data : res.data.token;


  // Step 3: Decode token to extract user ID (nameid)
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = JSON.parse(atob(base64));
    const userId = decodedPayload.nameid;

  // Step 4: Fetch full user profile
  const userRes = await axios.get(`${API_URL}/account/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userData = userRes.data;

    //debugging
    // console.log("🧠 Final userData received:", userRes.data); 
  
    // Step 5: Return both user data and token to store in AppContext
    return { userData, token };  
  };

// REGISTER FLOW
export const registerUser = async (formData) => {
  const res = await axios.post(`${API_URL}/account/register`, formData);
  return res.data;
};

