import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import GraphCard from 'components/GraphCard';
import NumberCard from 'components/NumberCard';
import PieCard from 'components/PieCard';
import { IncomesContext } from 'contexts/IncomeContext';
import 'style/EntreesPage.css';

function EntreesPage() {
  const { incomes } = useContext(IncomesContext);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="entrees-page">
      <h1 className="page-title">Entrées</h1>
        <Grid container spacing={3} className="grid-container">
            <Grid item xs={12} md={6}>
              <NumberCard title="Entrées ce mois" number={incomes.monthlyIncomes.total} />
            </Grid>
            <Grid item xs={12} md={6}>
              <NumberCard title="Entrées ce trimestre" number={incomes.quarterlyIncomes.total} />
            </Grid>
            <Grid item xs={12} md={6}>
              <PieCard title="Entrées du mois" data={incomes.monthlyIncomes.pieData} colors={COLORS} />
            </Grid>
            <Grid item xs={12} md={6}>
              <PieCard title="Entrées du trimestre" data={incomes.quarterlyIncomes.pieData} colors={COLORS} />
            </Grid>
            <Grid item xs={12}>
              <GraphCard title="Graphique des entrées" data={incomes.lineData} />
          </Grid>
          </Grid>
    </div>
  );
}

export default EntreesPage;