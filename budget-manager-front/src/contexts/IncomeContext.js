import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export const IncomesContext = createContext();

export const IncomesProvider = ({ children }) => {
    const [incomes, setIncomes] = useState({
        monthlyIncomes: { total: 0, pieData: [] },
        quarterlyIncomes: { total: 0, pieData: [] },
        lineData: []
    });
    const { isAuthenticated } = useAuth();
    const [reload, setReload] = useState(true);

    useEffect(() => {
        if (isAuthenticated && reload) {
            const token = localStorage.getItem('token');
            fetch('http://localhost:5000/income/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
            .then(response => response.json())
            .then(incomeData => {
                const processedData = processIncomes(incomeData[0].incomes);
                setIncomes(processedData);
                setReload(prevState => !prevState);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }, [isAuthenticated, reload]);

    const refreshIncomes = () => {
        setReload(prevState => !prevState);
    };

    const processIncomes = (incomes) => {
        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());

        const monthlyIncomes = incomes.filter(income => new Date(income.date) >= oneMonthAgo && new Date(income.date) <= now);
        const quarterlyIncomes = incomes.filter(income => new Date(income.date) >= threeMonthsAgo && new Date(income.date) <= now);

        const monthlyTotal = monthlyIncomes.reduce((acc, curr) => acc + curr.montant, 0);
        const quarterlyTotal = quarterlyIncomes.reduce((acc, curr) => acc + curr.montant, 0);

        return {
            monthlyIncomes: {
                total: monthlyTotal,
                pieData: monthlyIncomes
            },
            quarterlyIncomes: {
                total: quarterlyTotal,
                pieData: quarterlyIncomes
            },
            lineData: incomes
        };
    }

    return (
        <IncomesContext.Provider value={{ incomes, setIncomes, refreshIncomes }}>
            {children}
        </IncomesContext.Provider>
    );
};