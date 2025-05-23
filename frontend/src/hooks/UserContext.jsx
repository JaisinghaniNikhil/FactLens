import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if user session exists on mount
  useEffect(() => {
    axios.get('http://localhost/factlens-backend/checksession.php', {
      withCredentials: true
    }).then(res => {
      if (res.data.loggedIn) {
        setUser(res.data.user);
      }
    }).catch(err => console.error('Session check failed:', err));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
