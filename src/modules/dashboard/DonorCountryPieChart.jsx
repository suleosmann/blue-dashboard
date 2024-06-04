import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useData } from '../../context/DataContext'; // Adjust path as needed

const DonorCountryPieChart = () => {
  const { donors, donations, loading, error } = useData();

  const data = useMemo(() => {
    const amountsByCountry = donations.reduce((acc, donation) => {
      const donor = donors.find(d => d.DonorID === donation.DonorID);
      const country = donor?.Country || 'Anonymous';
      acc[country] = (acc[country] || 0) + donation.Amount;
      return acc;
    }, {});

    return Object.keys(amountsByCountry).map(country => ({
      name: country,
      value: amountsByCountry[country]
    }));
  }, [donors, donations]);

  const COLORS = {
    'Kenya': '#ED1B24', 
    'USA': '#981003', // Red
    'Anonymous': '#FFBB28' // Gold
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data.length) return <div>No data available.</div>;

  return (
    <div className='bg-white shadow-lg pb-10 px-2 sm:px-6 md:px-12'> 
        <div className='text-center pt-6 pb-4 text-lg md:text-xl border-b-2'>
            <h1>Top Donor Countries</h1>
        </div>
    
        <ResponsiveContainer width="100%" height={500}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="40%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#8884d8'} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
    </div>
  );
};

export default DonorCountryPieChart;
