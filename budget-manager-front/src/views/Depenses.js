import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import GraphCard from 'components/GraphCard';
import NumberCard from 'components/NumberCard';
import PieCard from 'components/PieCard';
import { ExpensesContext } from 'contexts/ExpensesContext';
import 'style/DepensesPage.css';

function DepensesPage() {
  const { expenses } = useContext(ExpensesContext);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="depenses-page">
      <h1 className="page-title">Dépenses</h1>
        <Grid container spacing={3} className="grid-container">
          <Grid item xs={12} md={4}>
            <NumberCard title="Dépenses cette semaine" number={expenses.weeklyExpenses.total} />
          </Grid>
          <Grid item xs={12} md={4}>
            <NumberCard title="Dépenses ce mois" number={expenses.monthlyExpenses.total} />
          </Grid>
          <Grid item xs={12} md={4}>
            <NumberCard title="Dépenses ce trimestre" number={expenses.quarterlyExpenses.total} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PieCard title="Dépenses de la semaine" data={expenses.weeklyExpenses.pieData} colors={COLORS} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PieCard title="Dépenses du mois" data={expenses.monthlyExpenses.pieData} colors={COLORS} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PieCard title="Dépenses du trimestre" data={expenses.quarterlyExpenses.pieData} colors={COLORS} />
          </Grid>
          <Grid item xs={12}>
            <GraphCard title="Graphique des dépenses" data={expenses.lineData} />
          </Grid>
        </Grid>
    </div>
  );
}

export default DepensesPage;