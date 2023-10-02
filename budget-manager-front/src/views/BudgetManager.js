import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideMenu from 'components/SideMenu';
import ResumePage from 'views/Resume';
import DepensesPage from 'views/Depenses';
import EntreesPage from 'components/EntreesPage';
import HistoriquesPage from 'components/HistoriquesPage';
import 'style/BudgetManager.css';
import { Grid } from '@mui/material';

function BudgetManager() {
    return (
    <Router>
        <Grid container className="budget-manager">
            <Grid item xs={12} md={2} className="side-menu">
                <SideMenu />
            </Grid>

            <Grid item xs={12} md={10} className="pages">
                <Routes>
                    <Route path="" element={<ResumePage />} />
                    <Route path="resume" element={<ResumePage />} />
                    <Route path="depenses" element={<DepensesPage />} />
                    <Route path="entrees" element={<EntreesPage />} />
                    <Route path="historiques" element={<HistoriquesPage />} />
                </Routes>
            </Grid>
        </Grid>
    </Router>
    );
}

export default BudgetManager;