import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import 'style/PieCard.css';

function PieCard({ title, data, colors }) {
  return (
    <Card className="card">
      <CardContent className="card-content">
        <Typography variant="h6" className="card-title">{title}</Typography>
        <ResponsiveContainer width="99%" height={200}>
          <PieChart className="chart">
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={10} layout="horizontal" align='center'/>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default PieCard;