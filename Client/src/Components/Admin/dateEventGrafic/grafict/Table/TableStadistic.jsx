import React from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

const data = [
  { name: 'January', sales: 2040, 
purchaser: 5, Events: 15 },
  { name: 'February', sales: 2550, 
purchaser: 7, Events: 10 },
  { name: 'March', sales: 5045, 
purchaser: 10, Events: 30 },
  { name: 'April', sales: 7460, 
purchaser: 8, Events: 32 },
  { name: 'May', sales: 2510, 
purchaser: 12, Events: 8 },
  { name: 'June', sales: 5300, 
purchaser: 15, Events: 15 },
  { name: 'July', sales: 3040, 
purchaser: 15, Events: 15 },
  { name: 'August ', sales: 3160, 
purchaser: 15, Events: 15 },
  { name: 'September', sales: 9430, 
purchaser: 15, Events: 35 },
  { name: 'October', sales: 4530, 
purchaser: 15, Events: 25 },
  { name: 'November', sales: 6340, 
purchaser: 15, Events: 45 },
  { name: 'December', sales: 10030, 
purchaser: 15, Events: 50 },
];

export default function StackedBarChart() {
  return (
    <BarChart width={1100} height={700} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="sales" stackId="a" fill="#8884d8" />
      <Bar dataKey="purchaser" stackId="a" fill="#82ca9d" />
      <Bar dataKey="Events" stackId="a" fill="#ffc658" />
    </BarChart>
  );
}
