import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import 'style/GraphCard.css';

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}-${month}-${year} à ${hours}:${minutes}`;
}

function GraphCard({ title, data = []}) {
  const lineData = data.map(expense => ({ date: formatDate(expense.date), Montant: expense.montant }));
  if (!data.length) return null;

  return (
    <Card className="graph-card">
      <CardContent className="graph-card-content">
        <Typography variant="h6" className="graph-card-title">{title}</Typography>
        <ResponsiveContainer width="99%" height={200}>
          <LineChart data={lineData} className="line-chart">
            <Line type="monotone" dataKey="Montant" stroke="white" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" stroke="white" tick={{ fill: 'white' }} />
            <YAxis stroke="white" tick={{ fill: 'white' }} />
            <Tooltip
              labelStyle={{ color: 'black' }} 
              itemStyle={{ color: 'black', fontWeight:'bold' }} 
              formatter={(value) => `${value} euros`} 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default GraphCard;