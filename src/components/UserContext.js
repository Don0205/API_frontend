import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from './apiService'; // Adjust path as necessary

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiService.get('/auth/user'); // Example endpoint
        setUser(response.data);
        console.log(`response.data ${response.data._id}; set user ${response.data._id}`);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); // Empty dependency array to ensure it only runs once



  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};
