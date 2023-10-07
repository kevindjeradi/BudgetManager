import React, { useState, useContext } from 'react';
import { Card, TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography } from '@mui/material';
import 'style/gestion/ajouterEntree.css';  
import { IncomesContext } from 'contexts/IncomeContext';
import { BalancesContext } from 'contexts/BalanceContext';

function AjouterEntree() {
  const [montant, setMontant] = useState('');
  const [categorie, setCategorie] = useState('');
  const { refreshIncomes } = useContext(IncomesContext);
  const { balances, refreshBalances } = useContext(BalancesContext);
  const token = localStorage.getItem('token');

  const handleAddIncome = () => {
    const date = new Date();
    const currentBalance = balances.length > 0 ? balances[0].balances[balances[0].balances.length - 1].montant : 0;
    const newBalance = currentBalance - parseFloat(montant);

    fetch('http://localhost:5000/income/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        incomes: {
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
      refreshIncomes();
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
    <Card className="income-card">
      <Typography variant="h5" gutterBottom className="income-title">
        Ajouter une entrée
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
          <InputLabel id="categorie-income-label">Catégorie</InputLabel>
          <Select
            labelId="categorie-income-label"
            label="Catégorie"
            value={categorie}
            onChange={e => setCategorie(e.target.value)}
          >
            <MenuItem value="Salaire">Salaire</MenuItem>
            <MenuItem value="Investissement">Investissement</MenuItem>
            <MenuItem value="Autres">Autres</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className="text-center">
        <Button variant="contained" color="primary" onClick={handleAddIncome}>
          Ajouter
        </Button>
      </Box>
    </Card>
  );
}
export default AjouterEntree;