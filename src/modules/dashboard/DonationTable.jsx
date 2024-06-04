import React, { useState, useMemo } from "react";
import { useData } from "../../context/DataContext";
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'; // Correct icon name


const DonationsTable = () => {
  const { donations, donors, loading, error } = useData();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;



  // Create a mapping from DonorID to donor names
  const donorMap = donors.reduce((acc, donor) => {
    const fullName = `${donor.FirstName} ${donor.LastName}`.trim();
    acc[donor.DonorID] =
      donor.FirstName || donor.LastName ? fullName : "Anonymous";
    return acc;
  }, {});

  // Filter donations based on search term and remove duplicates
  const filteredDonations = useMemo(() => {
    const seen = new Set();
    return donations.filter(donation => {
      const donorName = donorMap[donation.DonorID] || 'Unknown Donor'; // Ensuring donorName is never undefined
      const campaign = donation.Campaign || '';
      const matchSearchTerm = donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.Amount.toString().includes(searchTerm) ||
        new Date(donation.DateOfDonation).toLocaleDateString().includes(searchTerm);
  
      if (seen.has(donation.DonationID)) {
        return false;
      }
      seen.add(donation.DonationID);
      return matchSearchTerm;
    });
  }, [donations, donorMap, searchTerm]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!donations.length) return <div>No data available.</div>;
  
  // Calculate pagination
  const lastPageIndex = currentPage * itemsPerPage;
  const firstPageIndex = lastPageIndex - itemsPerPage;
  const currentItems = filteredDonations.slice(firstPageIndex, lastPageIndex);

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => (direction === "next" ? prev + 1 : prev - 1));
  };

  return (
    <div className="  mx-6  ">
      <div className="flex justify-end items-center space-x-2 mb-4 p-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="p-2 border rounded shadow-sm border-custom-red"
        />
        <button
          className="bg-custom-red text-white px-4 py-2 rounded-lg shadow hover:bg-red-700"
          onClick={() => {}}
        >
          Search
        </button>
      </div>
      {/* Wrapper div for responsive table */}
      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead className="text-xs font-semibold text-white uppercase bg-custom-red">
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left">ID</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left">Donor Name</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left">Campaign</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left">Amount</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((donation) => (
              <tr key={donation.DonationID}>
                <td className="px-5 py-2 border-b">{donation.DonationID}</td>
                <td className="px-5 py-2 border-b">{donorMap[donation.DonorID]}</td>
                <td className="px-5 py-2 border-b">{donation.Campaign}</td>
                <td className="px-5 py-2 border-b">{donation.Currency} {donation.Amount.toLocaleString()}</td>
                <td className="px-5 py-2 border-b">{new Date(donation.DateOfDonation).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center space-x-2 items-center mt-4">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          className="bg-custom-red hover:bg-custom-red text-white font-bold py-2 px-4 rounded"
        >
          <FaCaretLeft />
        </button>
        <span>Page {currentPage} of {Math.ceil(filteredDonations.length / itemsPerPage)}</span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage * itemsPerPage >= filteredDonations.length}
          className="bg-custom-red hover:bg-custom-red text-white font-bold py-2 px-4 rounded"
        >
          <FaCaretRight />
        </button>
      </div>
    </div>
  );
  
};

export default DonationsTable;
