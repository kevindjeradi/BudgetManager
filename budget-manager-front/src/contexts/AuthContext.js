import React, { createContext, useContext, useState } from 'react';
import { ExpensesProvider } from './ExpensesContext';
import { IncomesProvider } from './IncomeContext';
import { BalancesProvider } from './BalanceContext';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const value = {
        isAuthenticated,
        login: () => {
            setIsAuthenticated(true);
        },
        logout: () => {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
        },
    };

    return (
        <AuthContext.Provider value={value}>
            <ExpensesProvider>
                <IncomesProvider>
                    <BalancesProvider>
                        {children}
                    </BalancesProvider>
                </IncomesProvider>
            </ExpensesProvider>
        </AuthContext.Provider>
    );
};