import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export const ExpensesContext = createContext();

export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState({
    weeklyExpenses: { total: 0, pieData: [] },
    monthlyExpenses: { total: 0, pieData: [] },
    quarterlyExpenses: { total: 0, pieData: [] },
    lineData: [],
});

  const { isAuthenticated } = useAuth();
  const [reload, setReload] = useState(true);

  useEffect(() => {
    if (isAuthenticated && reload) {
      const token = localStorage.getItem('token');
      fetch('http://localhost:5000/expense/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      .then(response => response.json())
      .then(expensesData => {
        const processedData = processExpenses(expensesData[0].expenses);
        setExpenses(processedData);
        setReload(prevState => !prevState); // Toggle reload back to its original state
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }, [isAuthenticated, reload]);

  const refreshExpenses = () => {
    setReload(prevState => !prevState); // Toggle the reload state
  };

  const processExpenses = (expenses) => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
  
    const weeklyExpenses = expenses.filter(expense => new Date(expense.date) >= oneWeekAgo && new Date(expense.date) <= now);
    const monthlyExpenses = expenses.filter(expense => new Date(expense.date) >= oneMonthAgo && new Date(expense.date) <= now);
    const quarterlyExpenses = expenses.filter(expense => new Date(expense.date) >= threeMonthsAgo && new Date(expense.date) <= now);

    const weeklyTotal = weeklyExpenses.reduce((acc, curr) => acc + curr.montant, 0);
    const monthlyTotal = monthlyExpenses.reduce((acc, curr) => acc + curr.montant, 0);
    const quarterlyTotal = quarterlyExpenses.reduce((acc, curr) => acc + curr.montant, 0);

    return {
      weeklyExpenses: {
        total: weeklyTotal,
        pieData: weeklyExpenses,
      },
      monthlyExpenses: {
        total: monthlyTotal,
        pieData: monthlyExpenses,
      },
      quarterlyExpenses: {
        total: quarterlyTotal,
        pieData: quarterlyExpenses,
      },
      lineData: expenses
    };
  }

  return (
    <ExpensesContext.Provider value={{ expenses, setExpenses, refreshExpenses }}>
      {children}
    </ExpensesContext.Provider>
  );
};