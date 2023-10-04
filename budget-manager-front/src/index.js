// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.css';
import App from 'views/App';
import { AuthProvider } from 'auth/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);