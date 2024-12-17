import React, { createContext, useState, useEffect } from "react";
import { getToken, setToken, removeToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      // Simulate user fetching from token
      setUser({ name: "User" }); // Replace with actual user fetching logic
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    setToken(token);
    setUser({ name: "User" }); // Replace with actual user data
    navigate("/tasks");
  };

  const logout = () => {
    removeToken();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
