import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export const BalancesContext = createContext();

export const BalancesProvider = ({ children }) => {
  const [balances, setBalances] = useState([]);
  const { isAuthenticated } = useAuth();
  const [reload, setReload] = useState(true);

  useEffect(() => {
    if (isAuthenticated && reload) {
      const token = localStorage.getItem('token');
      fetch('http://localhost:5000/balance/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      .then(response => response.json())
      .then(balancesData => {
        setBalances(balancesData);
        setReload(prevState => !prevState); // Toggle reload back to its original state
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }, [isAuthenticated, reload]);

  const refreshBalances = () => {
    setReload(prevState => !prevState); // Toggle the reload state
  };

  return (
    <BalancesContext.Provider value={{ balances, setBalances, refreshBalances }}>
      {children}
    </BalancesContext.Provider>
  );
};