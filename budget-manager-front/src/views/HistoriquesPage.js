import React, { useState, useEffect } from 'react';
import { List, Typography, Divider } from '@mui/material';
import 'style/HistoriquesPage.css';

function HistoriquesPage() {
  const [historiques, setHistoriques] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch historiques from the backend
    fetch('http://localhost:5000/historique', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setHistoriques(data);
    })
    .catch(error => console.error('Error fetching historique', error));
  }, [token]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? "Unknown Date" : date.toLocaleString();
  };

  return (
    <div className="historiques-page">
      <Typography variant="h5" gutterBottom className="page-title">
        Historique
      </Typography>
      <div className="historiques-card">
        <List>
          {historiques.map((historique) => (
            historique.changes.map((change, index) => (
              <div key={index} className='list-item-container'>
                <Typography className='list-item-date'>{formatDate(change.timestamp)}</Typography>
                <Typography className='list-item-activity'>{change.activity}</Typography>
                <Divider />
              </div>
            ))
          ))}
        </List>
      </div>
    </div>
);
}

export default HistoriquesPage;