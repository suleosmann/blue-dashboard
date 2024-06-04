import React, { useState, useMemo } from "react";
import { useData } from "../../context/DataContext";
import { FaCaretLeft, FaCaretRight, FaEye } from "react-icons/fa";
import KenyaFlag from "../../assets/kenya.png";
import UsaFlag from "../../assets/usa.png";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Pledges = () => {
  const { donations, donors, campaigns, loading, error } = useData();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    donorType: "",
    paymentMethod: "",
    amount: "",
    date: "",
  });

  const itemsPerPage = 20;

  // Create donor and campaign maps
  const donorMap = useMemo(
    () =>
      donors.reduce(
        (map, donor) => ({
          ...map,
          [donor.DonorID]: {
            fullName:
              `${donor.FirstName || ""} ${donor.LastName || ""}`.trim() ||
              "Anonymous",
            donorType: donor.DonorType || "Unknown",
          },
        }),
        [donors]
      ),
    [donors]
  );

  const campaignMap = useMemo(
    () =>
      campaigns.reduce(
        (map, campaign) => ({
          ...map,
          [campaign.CampaignID]: campaign.Title,
        }),
        {}
      ),
    [campaigns]
  );

  // Filter and prepare donations
  const filteredDonations = useMemo(() => {
    return donations
      .filter((donation) => donation.DonationOption === "Pledge")
      .map((donation) => ({
        ...donation,
        ...donorMap[donation.DonorID],
        campaignTitle: campaignMap[donation.CampaignID] || "Unknown Campaign",
        flag:
          donation.Currency === "KES"
            ? KenyaFlag
            : donation.Currency === "USD"
            ? UsaFlag
            : null,
      }))
      .filter((donation) => {
        const searchMatches =
          donation.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donation.campaignTitle
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          donation.Amount.toString().includes(searchTerm) ||
          new Date(donation.DateOfDonation)
            .toLocaleDateString()
            .includes(searchTerm);
        const filterMatches =
          (!filters.donorType || donation.donorType === filters.donorType) &&
          (!filters.paymentMethod ||
            donation.PaymentMethod === filters.paymentMethod) &&
          (!filters.Currency || donation.Currency === filters.Currency) &&
          (!filters.amount ||
            parseFloat(donation.Amount) >= parseFloat(filters.amount)) &&
          (!filters.date ||
            new Date(donation.DateOfDonation).toISOString().slice(0, 10) ===
              filters.date);
        return searchMatches && filterMatches;
      });
  }, [donations, searchTerm, donorMap, campaignMap, filters]);

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => {
      if (direction === "next" && prev < totalPages) {
        return prev + 1;
      } else if (direction === "prev" && prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    const tableColumns = [
      "#",
      "Donation ID",
      "Full Names",
      "Donor Type",
      "Campaign Name",
      "Payment Method",
      "Currency",
      "Amount",
      "Created At",
    ];
    const tableRows = [];

    currentPageData.forEach((donation, index) => {
      const donationData = [
        index + 1, // Adjust index to match visual representation
        donation.DonationID,
        donation.fullName,
        donation.donorType,
        donation.campaignTitle,
        donation.PaymentMethod,
        donation.Currency,
        donation.Amount.toLocaleString(),
        new Date(donation.DateOfDonation).toLocaleString(),
      ];
      tableRows.push(donationData);
    });

    autoTable(doc, {
      head: [tableColumns],
      body: tableRows,
      styles: { font: "helvetica", fontSize: 8, fontStyle: 'normal' },
      headStyles: {
          fillColor: [255, 0, 0],
          textColor: [255, 255, 255], 
          fontSize: 11
      },
      columnStyles: {
          0: { cellWidth: 15 },
          
      },
      margin: { top: 40 },
      theme: 'grid'
  });
    doc.save("pledge_report.pdf");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const totalItems = filteredDonations.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPageData = filteredDonations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="p-2 border rounded shadow-sm"
        />
        <select
          value={filters.donorType}
          onChange={(e) => handleFilterChange("donorType", e.target.value)}
          className="p-2 border rounded shadow-sm"
        >
          <option value="">Donor Type</option>
          <option value="Individual">Individual</option>
          <option value="Organization">Organization</option>
        </select>
        <select
          value={filters.paymentMethod}
          onChange={(e) => handleFilterChange("paymentMethod", e.target.value)}
          className="p-2 border rounded shadow-sm"
        >
          <option value=""> Payment Method</option>
          <option value="Mpesa">Mpesa</option>
          <option value="Card">Card</option>
        </select>
        <select
          value={filters.Currency}
          onChange={(e) => handleFilterChange("Currency", e.target.value)}
          className="p-2 border rounded shadow-sm"
        >
          <option value="">Currency</option>
          <option value="KES">KES</option>
          <option value="USD">USD</option>
        </select>
        <input
          type="number"
          value={filters.amount}
          onChange={(e) => handleFilterChange("amount", e.target.value)}
          placeholder="Enter Amount"
          className="p-2 border rounded shadow-sm"
        />
        <input
          type="date"
          value={filters.date}
          onChange={(e) => handleFilterChange("date", e.target.value)}
          className="p-2 border rounded shadow-sm"
        />
        <button
          onClick={exportPDF}
          className="bg-custom-red hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Export as PDF
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead className="text-xs font-semibold text-white uppercase bg-custom-red">
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
                #
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
                Donation ID
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
                Full Names
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
                Donor Type
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
                Campaign Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
                Payment Method
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
                Currency
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
                Amount
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
                Created At
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.length > 0 ? (
              currentPageData.map((donation, index) => (
                <tr key={index}>
                  <td className="px-5 py-2 border-b">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-5 py-2 border-b">{donation.DonationID}</td>
                  <td className="px-5 py-2 border-b">{donation.fullName}</td>
                  <td className="px-5 py-2 border-b">{donation.donorType}</td>
                  <td className="px-5 py-2 border-b">
                    {donation.campaignTitle}
                  </td>
                  <td className="px-5 py-2 border-b">
                    {donation.PaymentMethod}
                  </td>
                  <td className="px-5 py-2 border-b">
                    <img
                      src={donation.flag}
                      alt={donation.Currency}
                      className="w-6 h-4"
                    />
                  </td>
                  <td className="px-5 py-2 border-b">
                    {donation.Amount.toLocaleString()}
                  </td>
                  <td className="px-5 py-2 border-b">
                    {new Date(donation.DateOfDonation).toLocaleString()}
                  </td>
                  <td className="px-5 py-2 border-b">
                    <button className="p-1 rounded bg-gray-200 hover:bg-black hover:text-white">
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-3">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center space-x-2 items-center mt-4">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          className="bg-custom-red hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <FaCaretLeft />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
          className="bg-custom-red hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <FaCaretRight />
        </button>
      </div>
    </div>
  );
};

export default Pledges;
