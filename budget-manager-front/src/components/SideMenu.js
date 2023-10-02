import React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import 'style/SideMenu.css';
import { Grid } from '@mui/material';

function SideMenu() {
    return (
        <div className="side-menu">
            <List>
                <Grid container spacing={3}>
                    <Grid item xs={3} md={12}>
                        <ListItem component={Link} to="resume">Résumé</ListItem>
                    </Grid>
                    <Grid item xs={3} md={12}>
                        <ListItem component={Link} to="depenses">Dépenses</ListItem>
                    </Grid>
                    <Grid item xs={3} md={12}>
                        <ListItem component={Link} to="entrees">Entrées</ListItem>
                    </Grid>
                    <Grid item xs={3} md={12}>
                        <ListItem component={Link} to="historiques">Historiques</ListItem>
                    </Grid>
                </Grid>
            </List>
        </div>
    );
}

export default SideMenu;