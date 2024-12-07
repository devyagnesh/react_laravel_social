import React, { createContext, useState, useEffect } from 'react';
import { getCurrentLoggedUserProfile } from '../services/profile/profileService';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const initAuth = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const userData = await getCurrentLoggedUserProfile();
        setUser(userData);
      } catch {
        localStorage.removeItem('authToken');
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    initAuth();
  }, []);

  const login = (data) => {
    localStorage.setItem('authToken', data.token);
    initAuth();
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
