import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import 'style/PieCard.css';

function PieCard({ title, data = [], colors }) {

  const createPieData = (data) => {
    const categories = {};
    data.forEach(expense => {
      if (!categories[expense.categorie]) {
        categories[expense.categorie] = 0;
      }
      categories[expense.categorie] += expense.montant;
    });
    return Object.keys(categories).map(key => ({ name: key, value: categories[key] }));
  };

  const pieData = createPieData(data);
  if (!data.length) return null;


  return (
    <Card className="pie-card">
      <CardContent className="pie-card-content">
        <Typography variant="h6" className="pie-card-title">{title}</Typography>
        <ResponsiveContainer width="99%" height={200}>
          <PieChart className="pie-chart">
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
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