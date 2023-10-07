import React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import 'style/SideMenu.css';
import { Grid } from '@mui/material';
import { useAuth } from 'contexts/AuthContext';

function SideMenu() {
    const { logout } = useAuth();

    return (
        <div className="side-menu">
            <List>
                <Grid container columns={10} spacing={3}>
                    <Grid item xs={2} md={10}>
                        <ListItem component={Link} to="resume">Résumé</ListItem>
                    </Grid>
                    <Grid item xs={2} md={10}>
                        <ListItem component={Link} to="gestion">Gérer</ListItem>
                    </Grid>
                    <Grid item xs={2} md={10}>
                        <ListItem component={Link} to="depenses">Dépenses</ListItem>
                    </Grid>
                    <Grid item xs={2} md={10}>
                        <ListItem component={Link} to="entrees">Entrées</ListItem>
                    </Grid>
                    <Grid item xs={2} md={10}>
                        <ListItem component={Link} to="historiques">Historiques</ListItem>
                    </Grid>
                    <Grid item xs={2} md={10}>
                        <ListItem onClick={logout} component={Link} to="/">Déconnexion</ListItem>
                    </Grid>
                </Grid>
            </List>
        </div>
    );
}

export default SideMenu;