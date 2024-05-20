import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    const admin = JSON.parse(localStorage.getItem('isAdmin'));
    setIsLoggedIn(loggedIn);
    setIsAdmin(admin);
  }, []);

  const login = (isAdminUser = false) => {
    setIsLoggedIn(true);
    setIsAdmin(isAdminUser);
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
    localStorage.setItem('isAdmin', JSON.stringify(isAdminUser));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
  };

  const value = {
    isLoggedIn,
    isAdmin,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
