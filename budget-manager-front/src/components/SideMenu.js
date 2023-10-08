import React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
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
        <div>
            <List>
                <Grid container spacing={3}>
                    <Grid item xs={4} md={12}>
                        <ListItem component={Link} to="resume" className="menu-item">
                            <Stack spacing={1} alignItems="center">
                                <DashboardIcon />
                                <span className='stack-text'>Résumé</span>
                            </Stack>
                        </ListItem>
                    </Grid>
                    <Grid item xs={4} md={12}>
                        <ListItem component={Link} to="gestion" className="menu-item">
                            <Stack spacing={1} alignItems="center">
                                <SettingsIcon />
                                <span className='stack-text'>Gérer</span>
                            </Stack>
                        </ListItem>
                    </Grid>
                    <Grid item xs={4} md={12}>
                        <ListItem component={Link} to="depenses" className="menu-item">
                            <Stack spacing={1} alignItems="center">
                                <ShoppingCartIcon />
                                <span className='stack-text'>Dépenses</span>
                            </Stack>
                        </ListItem>
                    </Grid>
                    <Grid item xs={4} md={12}>
                        <ListItem component={Link} to="entrees" className="menu-item">
                            <Stack spacing={1} alignItems="center">
                                <AccountBalanceWalletIcon />
                                <span className='stack-text'>Entrées</span>
                            </Stack>
                        </ListItem>
                    </Grid>
                    <Grid item xs={4} md={12}>
                        <ListItem component={Link} to="historiques" className="menu-item">
                            <Stack spacing={1} alignItems="center">
                                <HistoryIcon />
                                <span className='stack-text'>Historiques</span>
                            </Stack>
                        </ListItem>
                    </Grid>
                    <Grid item xs={4} md={12}>
                        <ListItem onClick={logout} component={Link} to="/" className="menu-item">
                            <Stack spacing={1} alignItems="center">
                                <ExitToAppIcon />
                                <span className='stack-text'>Déconnexion</span>
                            </Stack>
                        </ListItem>
                    </Grid>
                </Grid>
            </List>
        </div>
    );
}
export default SideMenu;