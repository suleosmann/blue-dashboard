// import React, { useState, useMemo } from 'react';
// import ApexChart from 'react-apexcharts';
// import { useData } from '../../context/DataContext';

// const DonationGraph = () => {
//   const { donations, loading, error } = useData();
//   const [timeFrame, setTimeFrame] = useState('all-time');

//   const lastDonationDate = useMemo(() => {
//     return new Date(Math.max(...donations.map(d => new Date(d.DateOfDonation).getTime())));
//   }, [donations]);

//   const filteredDonations = useMemo(() => {
//     return donations.filter(donation => {
//       const donationDate = new Date(donation.DateOfDonation);
//       switch (timeFrame) {
//         case 'daily':
//           return donationDate.toISOString().slice(0, 10) === lastDonationDate.toISOString().slice(0, 10);
//         case 'weekly':
//           const weekAgo = new Date(lastDonationDate);
//           weekAgo.setDate(lastDonationDate.getDate() - 7);
//           return donationDate >= weekAgo;
//         case 'monthly':
//           const monthAgo = new Date(lastDonationDate);
//           monthAgo.setMonth(lastDonationDate.getMonth() - 1);
//           return donationDate >= monthAgo;
//         case 'yearly':
//           const yearAgo = new Date(lastDonationDate);
//           yearAgo.setFullYear(lastDonationDate.getFullYear() - 1);
//           return donationDate >= yearAgo;
//         default:
//           return true;
//       }
//     });
//   }, [donations, timeFrame, lastDonationDate]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error loading data: {error}</div>;
//   if (!filteredDonations.length) return <div>No donation data available</div>;

//   const chartData = {
//     series: [
//       {
//         name: 'KES',
//         data: filteredDonations.filter(donation => donation.Currency === 'KES').map(donation => ({ x: new Date(donation.DateOfDonation).toISOString().slice(0, 10), y: donation.Amount })),
//         type: 'area'
//       },
//       {
//         name: 'USD',
//         data: filteredDonations.filter(donation => donation.Currency === 'USD').map(donation => ({ x: new Date(donation.DateOfDonation).toISOString().slice(0, 10), y: donation.Amount })),
//         type: 'area'
//       }
//     ],
//     options: {
//       chart: {
//         height: 350,
//         type: 'area',
//         zoom: {
//           enabled: false
//         },
//         toolbar: {
//           show: false
//         }
//       },
//       dataLabels: {
//         enabled: false
//       },
//       stroke: {
//         curve: 'smooth'
//       },
//       xaxis: {
//         type: 'datetime',
//         axisBorder: {
//           show: true
//         },
//         axisTicks: {
//           show: true
//         }
//       },
//       tooltip: {
//         x: {
//           format: 'dd MMM yyyy'
//         }
//       },
//       fill: {
//         type: 'gradient',
//         gradient: {
//           shadeIntensity: 1,
//           opacityFrom: 0.7,
//           opacityTo: 0.9,
//           stops: [0, 100]
//         }
//       }
//     }
//   };

//   return (
//     <div className='p-5 bg-white shadow-lg rounded-lg'>
//       <select value={timeFrame} onChange={e => setTimeFrame(e.target.value)} className="mb-4">
//         <option value="daily">Daily</option>
//         <option value="weekly">Weekly</option>
//         <option value="monthly">Monthly</option>
//         <option value="yearly">Yearly</option>
//         <option value="all-time">All Time</option>
//       </select>
//       <ApexChart options={chartData.options} series={chartData.series} type="area" height={350} />
//     </div>
//   );
// }

// export default DonationGraph;
import React, { useState } from "react";
import ApexChart from "react-apexcharts";

const DonationGraph = () => {
  // State to manage the date inputs
  const [fromDate, setFromDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [toDate, setToDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [filteredData, setFilteredData] = useState([]);

  // Dummy data
  const allData = {
    series: [
      {
        name: "KES",
        data: [
          { x: "2024-01-01", y: 5000 },
          { x: "2024-01-15", y: 5500 },
          { x: "2024-02-01", y: 5400 },
          { x: "2024-02-15", y: 1600 },
          { x: "2024-03-01", y: 5300 },
          { x: "2024-03-15", y: 5800 },
          { x: "2024-04-01", y: 3000 },
          { x: "2024-04-15", y: 5400 },
          { x: "2024-05-01", y: 4200 },
          { x: "2024-05-15", y: 3000 },
          { x: "2024-06-01", y: 5400 },
          { x: "2024-06-15", y: 1100 },
        ],
        type: "area",
      },
      {
        name: "USD",
        data: [
          { x: "2024-01-01", y: 200 },
          { x: "2024-01-15", y: 220 },
          { x: "2024-02-01", y: 210 },
          { x: "2024-02-15", y: 230 },
          { x: "2024-03-01", y: 225 },
          { x: "2024-03-15", y: 240 },
          { x: "2024-04-01", y: 250 },
          { x: "2024-04-15", y: 260 },
          { x: "2024-05-01", y: 255 },
          { x: "2024-05-15", y: 270 },
          { x: "2024-06-01", y: 280 },
          { x: "2024-06-15", y: 290 },
        ],
        type: "area",
      },
    ],
  };

  const handleSearch = () => {
    // Filter the series data based on the date range
    const newData = allData.series.map((series) => ({
      ...series,
      data: series.data.filter(
        (dataPoint) => dataPoint.x >= fromDate && dataPoint.x <= toDate
      ),
    }));
    setFilteredData(newData);
  };

  const chartOptions = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.7,
      },
    },
    colors: ['#1434A4',"#808080"]
  };

  return (
    <div className="bg-white shadow-lg  rounded-2xl mx-6 ">
      <div className="flex flex-col sm:flex-row justify-start items-center space-x-0 sm:space-x-4 p-6">
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1">From</label>
          <input
            type="date"
            className="border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1">To</label>
          <input
            type="date"
            className="border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div className="flex space-x-3">
        <button
          className="bg-custom-red hover:bg-custom-red text-white  font-bold py-2 px-4 rounded-lg mt-7"
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          className="bg-custom-red hover:bg-custom-red text-white font-bold py-2 px-4 rounded-lg mt-7"
          onClick={() => {
            setFromDate(new Date().toISOString().slice(0, 10));
            setToDate(new Date().toISOString().slice(0, 10));
            setFilteredData([]);
          }}
        >
          Reset
        </button>
        </div>
      </div>
      <ApexChart
        options={chartOptions}
        series={filteredData.length ? filteredData : allData.series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default DonationGraph;
