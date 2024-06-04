import React, { useEffect, useState } from 'react';
import { useData } from '../../context/DataContext'; // Adjust the import path as necessary

const TopDonorCounties = () => {
  const { donors } = useData();
  const [sortedCounties, setSortedCounties] = useState([]);

  useEffect(() => {
    if (donors.length > 0) {
      const countyCounts = donors.reduce((acc, donor) => {
        const county = donor.County;
        if (county) {
          acc[county] = (acc[county] || 0) + 1;
        }
        return acc;
      }, {});

      const sorted = Object.entries(countyCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([county]) => county);

      setSortedCounties(sorted);
    }
  }, [donors]);

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden relative h-[50vh]">
      <h2 className="text-lg font-semibold text-center py-4 bg-white">Top Donor Counties</h2>
      <div className="relative h-48 overflow-hidden text-center">
        {/* Gradient fade effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white via-transparent" style={{ top: '20px' }}></div>
        <ul className="animate-marquee whitespace-nowrap space-y-1">
          {sortedCounties.map((county, index) => (
            <li key={index} className="py-1">{county}</li>
          ))}
          {/* Duplicate the list to ensure smooth looping */}
          {sortedCounties.map((county, index) => (
            <li key={`duplicate-${index}`} className="py-1">{county}</li>
          ))}
          
        </ul>
      </div>
    </div>
  );
};

export default TopDonorCounties;
