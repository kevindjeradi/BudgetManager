import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import 'style/ResumePage.css';
import PieCard from 'components/PieCard';
import GraphCard from 'components/GraphCard';
import NumberCard from 'components/NumberCard';
import { ExpensesContext } from 'contexts/ExpensesContext';
import { IncomesContext } from 'contexts/IncomeContext';
import { BalancesContext } from 'contexts/BalanceContext';

function ResumePage() {
  const { incomes } = useContext(IncomesContext);
  const { expenses } = useContext(ExpensesContext);
  const { balances } = useContext(BalancesContext);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const balanceArray = balances.length > 0 ? balances[0].balances : [];

  const currentBalance = balanceArray.length > 0 ? balanceArray[balanceArray.length - 1].montant : 0;
  const lastBalance = balanceArray.length > 0 ? balanceArray[balanceArray.length - 2].montant : 0;

  return (
    <div className="resume-page">
      <h1 className="page-title">Résumé</h1>
      <Grid container spacing={3} className="grid-container">
        <Grid item xs={12} md={6}>
          <NumberCard title="Solde actuel" number={currentBalance} />
        </Grid>
        <Grid item xs={12} md={6}>
          <NumberCard title="Dernier solde" number={lastBalance} />
        </Grid>
        <Grid item xs={12} md={6}>
          <NumberCard title="Entrées ce mois" number={incomes.monthlyIncomes.total} />
        </Grid>
        <Grid item xs={12} md={6}>
          <NumberCard title="Dépenses ce mois" number={expenses.monthlyExpenses.total} />
        </Grid>
        <Grid item xs={12} md={6}>
          <PieCard title="Entrées ce mois" data={incomes.monthlyIncomes.pieData} colors={COLORS} />
        </Grid>
        <Grid item xs={12} md={6}>
          <PieCard title="Dépenses ce mois" data={expenses.monthlyExpenses.pieData} colors={COLORS} />
        </Grid>
        <Grid item xs={12} md={6}>
          <GraphCard title="Graphique des entrées" data={incomes.lineData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <GraphCard title="Graphique des dépenses" data={expenses.lineData} />
        </Grid>
      </Grid>
    </div>
  );
}

export default ResumePage;