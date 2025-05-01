import axios from 'axios';
// import {jwtDecode} from 'jwt-decode'

//This allows you to import api anywhere and use api.get(), api.post() 
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
