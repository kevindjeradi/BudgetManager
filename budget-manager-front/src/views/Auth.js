import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth } from 'auth/AuthContext';

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
        login(); // Call the login method to update isAuthenticated state
        navigate('/resume');
      }
    } catch (error) {
      console.error('Error during the authentication', error.response?.data || error.message);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5">{isLogin ? 'Login' : 'Register'}</Typography>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <TextField
              label="Username"
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
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </form>
        <Button onClick={() => setIsLogin(!isLogin)} color="secondary">
          {isLogin ? 'Create an account' : 'Already have an account'}
        </Button>
      </Paper>
    </Grid>
  );
}

export default AuthPage;