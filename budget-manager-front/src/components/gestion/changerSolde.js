import React, { useState, useContext } from 'react';
import { Card, TextField, Button, Box, Typography } from '@mui/material';
import 'style/gestion/changerSolde.css';  // You might need to create this CSS file or replace with an appropriate one
import { BalancesContext } from 'contexts/BalanceContext';  // Assuming you'll have a BalancesContext

function ChangerSolde() {
  const [montant, setMontant] = useState('');
  const { refreshBalances } = useContext(BalancesContext);
  const token = localStorage.getItem('token');

  const handleAddBalance = () => {
    const date = new Date();
    fetch('http://localhost:5000/balance/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        balances: {
          montant,
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
      refreshBalances();  // Call the refreshBalances function after adding a balance
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <Card className="balance-card">
      <Typography variant="h5" gutterBottom className="balance-title">
        Changer le solde
      </Typography>
      <Box className="margin-bottom">
        <TextField 
          fullWidth
          label="Montant" 
          value={montant} 
          onChange={e => setMontant(e.target.value)} 
        />
      </Box>
      <Box className="text-center">
        <Button variant="contained" color="primary" onClick={handleAddBalance}>
          Modifier
        </Button>
      </Box>
    </Card>
  );
}

export default ChangerSolde;