import { Grid } from '@mui/material';
import AjouterDepenseCard from 'components/gestion/ajouterDepense';
import AjouterEntree from 'components/gestion/ajouterEntree';
import ChangerSolde from 'components/gestion/changerSolde';
import DeleteExpenseCard from 'components/gestion/supprimerDepense';
import SupprimerEntree from 'components/gestion/supprimerEntree';
import React from 'react';
import 'style/gestion/gestionPage.css';

function Gestion() {

  return (
    <div className="gestion-page">
      <h1 className="page-title">Gestion</h1>
      <Grid container spacing={3} className="grid-container">
        <Grid item xs={12}>
          <ChangerSolde />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AjouterDepenseCard />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AjouterEntree />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DeleteExpenseCard />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SupprimerEntree />
        </Grid>
      </Grid>
    </div>
  );
}

export default Gestion;