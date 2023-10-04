import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SideMenu from 'components/SideMenu';
import ResumePage from 'views/Resume';
import DepensesPage from 'views/Depenses';
import EntreesPage from 'components/EntreesPage';
import HistoriquesPage from 'components/HistoriquesPage';
import 'style/BudgetManager.css';
import { Grid } from '@mui/material';
import AuthPage from 'views/Auth';
import { useAuth } from 'auth/AuthContext';

function BudgetManager() {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        console.log('Is Authenticated:', isAuthenticated);
      }, [isAuthenticated]);

    return (
    <Router>
        <Grid container className="budget-manager">
            <Grid item xs={12} md={2} className="side-menu">
                <SideMenu />
            </Grid>

            <Grid item xs={12} md={10} className="pages">
                <Routes>
                    <Route path="" element={<AuthPage />} />
                    <Route path="resume" element={isAuthenticated ? <ResumePage /> : <Navigate to="/" replace />} />
                    <Route path="depenses" element={isAuthenticated ? <DepensesPage /> : <Navigate to="/" replace />} />
                    <Route path="entrees" element={isAuthenticated ? <EntreesPage /> : <Navigate to="/" replace />} />
                    <Route path="historiques" element={isAuthenticated ? <HistoriquesPage /> : <Navigate to="/" replace />} />
                </Routes>
            </Grid>
        </Grid>
    </Router>
    );
}

export default BudgetManager;