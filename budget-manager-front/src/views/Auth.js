import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Grid, Card } from '@mui/material';
import axios from 'axios';
import { useAuth } from 'contexts/AuthContext';
import 'style/auth.css';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? 'http://localhost:5000/user/login' : 'http://localhost:5000/user/register';
      const response = await axios.post(endpoint, formData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log(response.data.token);
        login(); // Call the login method to update isAuthenticated state
        navigate('/resume');
      }
    } catch (error) {
      console.error('Error during the authentication', error.response?.data || error.message);
    }
  };

  return (
    <div className='auth-page'>
      <Grid container className='grid-container'>
        <Card elevation={3} className='auth-card' style={{ padding: '20px' }}>
          <h1 className='page-title'>{isLogin ? 'Connexion' : 'Inscription'} </h1>
            <form onSubmit={handleSubmit}>
            {!isLogin && (
              <TextField
                label="Pseudo"
                name="username"
                value={formData.username}
                onChange={handleChange}
                margin="normal"
                fullWidth
                required
              />
            )}
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="Mot de passe"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
            />
            <Button type="submit" variant="contained" fullWidth>
              {isLogin ? 'Se connecter' : "S'inscrire"}
            </Button>
          </form>
          <Button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Créer son compte' : "J'ai déjà un compte"}
          </Button>
        </Card>
      </Grid>
    </div>
  );
}

export default AuthPage;