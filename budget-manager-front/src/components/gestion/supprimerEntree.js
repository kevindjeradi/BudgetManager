import React, { useContext, useState } from 'react';
import { Card, Select, MenuItem, FormControl, InputLabel, Box, Typography, Button } from '@mui/material';
import 'style/gestion/supprimerEntree.css'; 
import { IncomesContext } from 'contexts/IncomeContext';
import { BalancesContext } from 'contexts/BalanceContext';

function SupprimerEntree() {
    const { incomes, refreshIncomes } = useContext(IncomesContext);
    const { balances, refreshBalances } = useContext(BalancesContext);
    const [selectedIncome, setSelectedIncome] = useState(null);

    const handleDeleteIncome = () => {
        const currentBalance = balances.length > 0 ? balances[0].balances[balances[0].balances.length - 1].montant : 0;
        const incomeToDelete = incomes.lineData.find(income => income._id === selectedIncome);
        const newBalance = currentBalance + incomeToDelete.montant;

        const token = localStorage.getItem('token');
        fetch(`http://localhost:5000/income/${selectedIncome}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete income');
            }
            return response.json();
        })
        .then(data => {
            console.log('Deleted income:', data);
            setSelectedIncome(null);
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
        <Card className="delete-income-card">
            <Typography variant="h5" gutterBottom className="income-title">
                Supprimer une entrée
            </Typography>
            <Box className="margin-bottom">
                <FormControl fullWidth>
                    <InputLabel id="delete-income-label">Entrée</InputLabel>
                    {incomes.lineData && incomes.lineData.length > 0 && (
                        <Select
                            labelId="delete-income-label"
                            label="Entrée"
                            value={selectedIncome || ""}
                            onChange={e => setSelectedIncome(e.target.value)}
                        >
                            {incomes.lineData.map(income => (
                                <MenuItem key={income._id} value={income._id}>
                                    {income.categorie} - {income.montant}€
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                </FormControl>
            </Box>
            <Box className="text-center">
                <Button variant="contained" color="secondary" onClick={handleDeleteIncome}>
                    Supprimer
                </Button>
            </Box>
        </Card>
    );
}
export default SupprimerEntree;
