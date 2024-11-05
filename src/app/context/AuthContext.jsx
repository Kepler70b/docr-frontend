"use client";

import React, { createContext, useState, useContext,useEffect } from 'react';
import Cookie from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username,setUsername] = useState("")

  useEffect(() => {
    // Check if access token exists in cookies on mount
    const token = Cookie.get('access_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  const login = ({access_token,username}) => {
    Cookie.set('access_token',access_token);
    setUsername(username);
    setIsAuthenticated(true);
  }
  const logout = () =>{
    Cookie.remove('access_token');
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ username,isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
