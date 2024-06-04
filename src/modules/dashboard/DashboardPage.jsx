import React from 'react';
import DonationsSummary from './DonationsSummary';
import DashboardGraph from './DonationGraph';
import TopDonorCounties from "./TopDonorCounties";
import DonationTable from './DonationTable';
import DonorCountryPieChart from './DonorCountryPieChart';

const DashboardPage = () => {
  return (
    <div className='border-2 shadow-lg'>
        <DonationsSummary/>
        <div className='flex flex-col md:flex-row px-2'>
          <div className='md:w-2/3 h-[60vh] md:pr-6 max-sm:mb-24'><DashboardGraph/></div>
          <div className='md:w-1/3 h-[60vh] '><TopDonorCounties/></div>
        </div>
        <div className='flex flex-col md:flex-row px-2'>
          <div className='md:w-2/3 h-[65vh] md:pr-6 max-sm:mb-64'><DonationTable/></div>
          <div className='md:w-1/3'><DonorCountryPieChart/></div>
        </div>
    </div>
  )
}

export default DashboardPage;
