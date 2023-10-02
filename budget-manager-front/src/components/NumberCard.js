import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import EuroIcon from '@mui/icons-material/Euro';
import 'style/NumberCard.css';

function NumberCard({ title, number }) {
  return (
    <Card className="number-card">
      <CardContent className="card-content">
        <Typography variant="h6" className="card-title">{title}</Typography>
        <Typography variant="h2" className="number">
          {number}<EuroIcon fontSize="inherit" />
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NumberCard;