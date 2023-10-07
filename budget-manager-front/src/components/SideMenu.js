import React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import 'style/SideMenu.css';
import { Grid } from '@mui/material';
import { useAuth } from 'contexts/AuthContext';
import Stack from '@mui/material/Stack'
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HistoryIcon from '@mui/icons-material/History';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function SideMenu() {
    const { logout } = useAuth();

    return (
        <div className="side-menu">
            <List>
                <Grid container spacing={3}>
                    <Grid item xs={4} md={12}>
                        <ListItem component={Link} to="resume" className="menu-item">
                            <Stack spacing={1} alignItems="center">
                                <DashboardIcon />
                                Résumé
                            </Stack>
                        </ListItem>
                    </Grid>
                    <Grid item xs={4} md={12}>
                        <ListItem component={Link} to="gestion" className="menu-item">
                            <Stack spacing={1} alignItems="center">
                                <SettingsIcon />
                                Gérer
                            </Stack>
                        </ListItem>
                    </Grid>
                    <Grid item xs={4} md={12}>
                        <ListItem component={Link} to="depenses" className="menu-item">
                            <Stack spacing={1} alignItems="center">
                                <ShoppingCartIcon />
                                Dépenses
                            </Stack>
                        </ListItem>
                    </Grid>
                    <Grid item xs={4} md={12}>
                        <ListItem component={Link} to="entrees" className="menu-item">
                            <Stack spacing={1} alignItems="center">
                                <AccountBalanceWalletIcon />
                                Entrées
                            </Stack>
                        </ListItem>
                    </Grid>
                    <Grid item xs={4} md={12}>
                        <ListItem component={Link} to="historiques" className="menu-item">
                            <Stack spacing={1} alignItems="center">
                                <HistoryIcon />
                                Historiques
                            </Stack>
                        </ListItem>
                    </Grid>
                    <Grid item xs={4} md={12}>
                        <ListItem onClick={logout} component={Link} to="/" className="menu-item">
                            <Stack spacing={1} alignItems="center">
                                <ExitToAppIcon />
                                Déconnexion
                            </Stack>
                        </ListItem>
                    </Grid>
                </Grid>
            </List>
        </div>
    );
}
export default SideMenu;