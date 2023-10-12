import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import SideMenu from 'components/SideMenu';
import ResumePage from 'views/Resume';
import DepensesPage from 'views/Depenses';
import EntreesPage from 'views/Entrees';
import HistoriquesPage from 'views/HistoriquesPage';
import 'style/BudgetManager.css';
import 'style/SideMenu.css';
import { Grid } from '@mui/material';
import AuthPage from 'views/Auth';
import { useAuth } from 'contexts/AuthContext';
import GestionPage from './gestion';
import forestImage from '../images/forest.jpg';
import forest2Image from '../images/forest2.jpg';
import waterImage from '../images/water.jpg';
import dogImage from '../images/dog.jpg';

function Content() {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    const [currentRoute, setCurrentRoute] = useState(location.pathname);

    useEffect(() => {
        setCurrentRoute(location.pathname);
    }, [location]);

    const getBackgroundImage = () => {
        switch (currentRoute) {
            case '/':
                return `url(${forestImage})`;
            case '/resume':
                return `url(${forestImage})`;
            case '/depenses':
                return `url(${forest2Image})`;
            case '/entrees':
                return `url(${waterImage})`;
            case '/historique':
            case '/gestion':
            default:
                return `url(${dogImage})`;
        }
    };

    const backgroundImageStyle = {
        backgroundImage: getBackgroundImage(),
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    };

    return (
        <Grid container className="budget-manager" style={backgroundImageStyle}>
            <Grid item xs={12} md={2} className="side-menu">
                <SideMenu />
            </Grid>

            <Grid item xs={12} md={10} className="pages">
                <Routes>
                    <Route path="" element={<AuthPage />} />
                    <Route path="resume" element={isAuthenticated ? <ResumePage /> : <Navigate to="/" replace />} />
                    <Route path="depenses" element={isAuthenticated ? <DepensesPage /> : <Navigate to="/" replace />} />
                    <Route path="entrees" element={isAuthenticated ? <EntreesPage /> : <Navigate to="/" replace />} />
                    <Route path="historique" element={isAuthenticated ? <HistoriquesPage /> : <Navigate to="/" replace />} />
                    <Route path="gestion" element={isAuthenticated ? <GestionPage /> : <Navigate to="/" replace />} />
                </Routes>
            </Grid>
        </Grid>
    );
}

function BudgetManager() {
    return (
        <Router>
            <Content />
        </Router>
    );
}

export default BudgetManager;
