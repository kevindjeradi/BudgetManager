import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const value = {
        isAuthenticated,
        login: () => {
            setIsAuthenticated(true)
        },
        logout: () => {
            localStorage.removeItem('token');
            setIsAuthenticated(false)
        },
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};