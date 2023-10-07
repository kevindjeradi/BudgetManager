import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import 'style/GraphCard.css';

function GraphCard({ title, data = []}) {
  const lineData = data.map(expense => ({ name: expense.date, value: expense.montant }));
  if (!data.length) return null;

  return (
    <Card className="card">
      <CardContent className="card-content">
        <Typography variant="h6" className="card-title">{title}</Typography>
        <ResponsiveContainer width="99%" height={200}>
          <LineChart data={lineData} className="chart">
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default GraphCard;