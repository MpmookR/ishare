import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios"; 

const API_URL = import.meta.env.VITE_API_BASE_URL;

// Create the context
export const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  // Restore session on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!storedToken || !storedUser) return;

    try {
      const decoded = jwtDecode(storedToken);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        console.warn("Token expired on reload. Logging out.");
        logout();
        return;
      }

      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    } catch (err) {
      console.error("Invalid token on reload:", err);
      logout();
    }
  }, []);

  // Login function stores token and user, sets logout timeout
  const login = (token, user) => {
    try {
      const decoded = jwtDecode(token);
      const expirationTime = decoded.exp * 1000;
      const currentTime = Date.now();
      const timeoutDuration = expirationTime - currentTime;

      if (timeoutDuration > 0) {
        setTimeout(() => {
          alert("Session expired. Please log in again.");
          logout();
        }, timeoutDuration);
      }

      setUser(user);
      setToken(token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } catch (err) {
      console.error("Token decode failed:", err);
      logout();
    }
  };

  // Logout function clears all state and storage
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  // Update user info (e.g., profile update)
  const updateUser = (newUserData) => {
    const updatedUser = { ...user, ...newUserData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const updateUserFromServer = async () => {
    if (!token || !user?.Id) return;
    try {
      const res = await axios.get(`${API_URL}/account/users/${user.Id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error("Failed to refresh user data:", err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        updateUser,
        updateUserFromServer, 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
