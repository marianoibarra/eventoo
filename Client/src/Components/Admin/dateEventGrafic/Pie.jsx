import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919'];

const CustomLegend = ({ payload }) => (
  <ul>
    {
      payload.map((entry, index) => (
        <li key={`item-${index}`}>
          <span style={{ backgroundColor: entry.color, width: '16px', height: '16px', display: 'inline-block', marginRight: '8px' }}></span>
          {entry.value}
        </li>
      ))
    }
  </ul>
);

const PieChartWithLegend = ({ data }) => {
  return (
    <PieChart width={400} height={400}>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
        {
          data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))
        }
      </Pie>
      <Legend layout="vertical" verticalAlign="middle" align="right" content={CustomLegend} />
    </PieChart>
  );
};

export default PieChartWithLegend;