import React, { useContext, useState } from 'react';
import { Card, Select, MenuItem, FormControl, InputLabel, Box, Typography, Button } from '@mui/material';
import 'style/gestion/supprimerDepense.css';
import { ExpensesContext } from 'contexts/ExpensesContext';
import { BalancesContext } from 'contexts/BalanceContext';

function SupprimerDepense() {
  const { expenses, refreshExpenses } = useContext(ExpensesContext);
  const { balances, refreshBalances } = useContext(BalancesContext);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const handleDeleteExpense = () => {
    const currentBalance = balances.length > 0 ? balances[0].balances[balances[0].balances.length - 1].montant : 0;
    const expenseToDelete = expenses.lineData.find(expense => expense._id === selectedExpense);
    const newBalance = currentBalance + expenseToDelete.montant;

    const token = localStorage.getItem('token');
    fetch(`http://localhost:5000/expense/${selectedExpense}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }
      return response.json();
    })
    .then(data => {
      console.log('Deleted expense:', data);
      setSelectedExpense(null);
      refreshExpenses();
      return fetch('http://localhost:5000/balance/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          balances: {
            montant: newBalance,
            date: new Date(),
          }
        }),
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok for balance update');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      refreshBalances();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <Card className="delete-expense-card">
      <Typography variant="h5" gutterBottom className="expense-title">
        Supprimer une dépense
      </Typography>
      <Box className="margin-bottom">
        <FormControl fullWidth>
          <InputLabel id="delete-expense-label">Dépense</InputLabel>
          {expenses.lineData.length > 0 && (
              <Select
                  labelId="delete-expense-label"
                  label="Dépense"
                  value={selectedExpense || ""}
                  onChange={e => setSelectedExpense(e.target.value)}
              >
                  {expenses.lineData.map(expense => (
                      <MenuItem key={expense._id} value={expense._id}>
                          {expense.categorie} - {expense.montant}€
                      </MenuItem>
                  ))}
              </Select>
          )}
        </FormControl>
      </Box>
      <Box className="text-center">
        <Button variant="contained" color="secondary" onClick={handleDeleteExpense}>
          Supprimer
        </Button>
      </Box>
    </Card>
  );
}

export default SupprimerDepense;
