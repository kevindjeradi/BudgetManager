import React, { useState, useContext } from 'react';
import { Card, TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography } from '@mui/material';
import 'style/gestion/ajouterDepense.css';
import { ExpensesContext } from 'contexts/ExpensesContext';
import { BalancesContext } from 'contexts/BalanceContext';

function AjouterDepense() {
  const [montant, setMontant] = useState('');
  const [categorie, setCategorie] = useState('');
  const { refreshExpenses } = useContext(ExpensesContext);
  const { balances, refreshBalances } = useContext(BalancesContext);
  const token = localStorage.getItem('token');

  const handleAddExpense = () => {
    const date = new Date();
    const currentBalance = balances.length > 0 ? balances[0].balances[balances[0].balances.length - 1].montant : 0;
    const newBalance = currentBalance - parseFloat(montant);

    fetch('http://localhost:5000/expense/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        expenses: {
          montant,
          categorie,
          date,
        }
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
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
            date,
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
    <Card className="expense-card">
      <Typography variant="h5" gutterBottom className="expense-title">
        Ajouter une dépense
      </Typography>
      <Box className="margin-bottom">
        <TextField 
          fullWidth
          label="Montant" 
          value={montant} 
          onChange={e => setMontant(e.target.value)} 
        />
      </Box>
      <Box className="margin-bottom">
        <FormControl fullWidth>
          <InputLabel id="categorie-label">Catégorie</InputLabel> {/* Step 1: Add an id */}
          <Select
            labelId="categorie-label"
            label="Catégorie"
            value={categorie}
            onChange={e => setCategorie(e.target.value)}
          >
            <MenuItem value="Charges">Charges</MenuItem>
            <MenuItem value="Nourriture">Nourriture</MenuItem>
            <MenuItem value="Transport">Transport</MenuItem>
            <MenuItem value="Loisirs">Loisirs</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className="text-center">
        <Button variant="contained" color="primary" onClick={handleAddExpense}>
          Ajouter
        </Button>
      </Box>
    </Card>
  );
}

export default AjouterDepense;