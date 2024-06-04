import React from 'react';
import KenyaFlag from '../../assets/kenya.png';
import UsaFlag from '../../assets/usa.png';
import { useData } from '../../context/DataContext';

const DonationsSummary = () => {
  const { totalDonations, loading, error } = useData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error}</div>;

  // Check if totalDonations is available
  if (!totalDonations) return <div>No donation data available</div>;

  const {
    today: { KES: todayKES, USD: todayUSD },
    weekly: { KES: weeklyKES, USD: weeklyUSD },
    monthly: { KES: monthlyKES, USD: monthlyUSD },
    allTime: { KES: allTimeKES, USD: allTimeUSD },
  } = totalDonations;

  return (
    <div className="px-2 py-4 ">
      <div className='border-b border-gray-400 pb-4 pl-2'>
      <h3 className='font-bold'>Donations</h3>
      <p className='italic text-sm'>Donations Summary</p>
      </div>
      <div className="flex flex-wrap justify-around pt-4">
        <div className="bg-white w-80 h-24 mb-2 border rounded-xl shadow-lg flex flex-col justify-center items-center text-center">
          <h2 className="font-bold text-xl mb-2">Today's Donations</h2>
          <div className='flex gap-2'>
            <div>
              <img src={KenyaFlag} className="inline-block w-6 h-6 mr-2" alt="Kenya Flag" />
              <span>KES {todayKES}</span>
            </div>
            <div>
              <img src={UsaFlag} className="inline-block w-6 h-6 mr-2" alt="USA Flag" />
              <span>USD {todayUSD}</span>
            </div>
          </div>
        </div>
        <div className="bg-white w-80 h-24 mb-2 border rounded-xl shadow-lg flex flex-col justify-center items-center text-center">
          <h2 className="font-bold text-xl mb-2">Weekly Donations</h2>
          <div className='flex gap-2'>
            <div>
              <img src={KenyaFlag} className="inline-block w-6 h-6 mr-2" alt="Kenya Flag" />
              <span>KES {weeklyKES}</span>
            </div>
            <div>
              <img src={UsaFlag} className="inline-block w-6 h-6 mr-2" alt="USA Flag" />
              <span>USD {weeklyUSD}</span>
            </div>
          </div>
        </div>
        <div className="bg-white w-80 h-24 mb-2 border rounded-xl shadow-lg flex flex-col justify-center items-center text-center">
          <h2 className="font-bold text-xl mb-2">Monthly Donations</h2>
          <div className='flex gap-2'>
            <div>
              <img src={KenyaFlag} className="inline-block w-6 h-6 mr-2" alt="Kenya Flag" />
              <span>KES {monthlyKES}</span>
            </div>
            <div>
              <img src={UsaFlag} className="inline-block w-6 h-6 mr-2" alt="USA Flag" />
              <span>USD {monthlyUSD}</span>
            </div>
          </div>
        </div>
        <div className="bg-white w-80 h-24 mb-2 border rounded-xl shadow-lg flex flex-col justify-center items-center text-center">
          <h2 className="font-bold text-xl mb-2">All Time Donations</h2>
          <div className='flex gap-2'>
            <div>
              <img src={KenyaFlag} className="inline-block w-6 h-6 mr-2" alt="Kenya Flag" />
              <span>KES {allTimeKES}</span>
            </div>
            <div>
              <img src={UsaFlag} className="inline-block w-6 h-6 mr-2" alt="USA Flag" />
              <span>USD {allTimeUSD}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationsSummary;