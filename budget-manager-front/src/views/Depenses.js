import { Grid } from '@mui/material';
import GraphCard from 'components/GraphCard';
import NumberCard from 'components/NumberCard';
import PieCard from 'components/PieCard';
import React from 'react';
import 'style/DepensesPage.css';

function DepensesPage() {
  // Sample data for the line charts
  const lineData = [
    { name: 'Week 1', value: 400 },
    { name: 'Week 2', value: 300 },
    { name: 'Week 3', value: 200 },
    { name: 'Week 4', value: 278 },
    { name: 'Week 5', value: 189 },
  ];

  // Sample data for the pie charts
  const pieData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 200 },
    { name: 'Group D', value: 100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="depenses-page">
      <h1 className="page-title">Dépenses</h1>
      <Grid container spacing={3} className="grid-container">
        <Grid item xs={12} md={4}>
          <NumberCard title="Dépenses cette semaine" number={500} />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberCard title="Dépenses ce mois" number={1000} />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberCard title="Dépenses ce trimestre" number={3000} />
        </Grid>
        <Grid item xs={12} md={4}>
          <PieCard title="Dépenses de la semaine" data={pieData} colors={COLORS} />
        </Grid>
        <Grid item xs={12} md={4}>
          <PieCard title="Dépenses du mois" data={pieData} colors={COLORS} />
        </Grid>
        <Grid item xs={12} md={4}>
          <PieCard title="Dépenses du trimestre" data={pieData} colors={COLORS} />
        </Grid>
        <Grid item xs={12}>
          <GraphCard title="Graphique des dépenses" data={lineData} />
        </Grid>
      </Grid>
    </div>
  );
}

export default DepensesPage;