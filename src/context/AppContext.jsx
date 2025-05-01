import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  //localStorage	Keeps user logged in after refresh

  const login = (userData, token) => {
    const decoded = jwtDecode(token); // decode JWT payload

    const user = {
      id: decoded.nameid || decoded.sub, // adjust based on your token
      fullName: decoded.fullName || decoded.name,
      email: decoded.email,
      roles: decoded.roles || [],
      // add any other claims you use
    };

    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const updateUser = (newUserData) => {
    const updatedUser = { ...user, ...newUserData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AppContext.Provider value={{ user, token, login, logout, updateUser }}>
      {children}
    </AppContext.Provider>
  );
};
