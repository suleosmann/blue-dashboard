import React, { useState, useMemo } from "react";
import { useData } from "../../context/DataContext";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Transactions = () => {
  const { donations, donors, campaigns, loading, error } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    reference: "",
    donorType: "",
    paymentMethod: "",
    paymentStatus: "",
    amount: "",
    date: "",
  });

  const itemsPerPage = 20;

  // Mapping for donor details
  const transactionsMap = useMemo(
    () =>
      donors.reduce(
        (map, donor) => ({
          ...map,
          [donor.DonorID]: {
            fullName:
              `${donor.FirstName || ""} ${donor.LastName || ""}`.trim() ||
              "Anonymous",
            donorType: donor.DonorType || "Unknown",
            typeColor:
              donor.DonorType === "Individual" ? "text-black" : "text-black",
          },
        }),
        [donors]
      ),
    [donors]
  );

  // Mapping for campaign titles
  const campaignMap = useMemo(
    () =>
      campaigns.reduce(
        (map, campaign) => ({
          ...map,
          [campaign.CampaignID]: campaign.Title,
        }),
        [campaigns]
      ),
    [campaigns]
  );

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
    setCurrentPage(1); // Reset to first page
  };

  const filteredDonations = useMemo(
    () =>
      donations
        .map((donation) => ({
          ...donation,
          ...transactionsMap[donation.DonorID],
          campaignTitle: campaignMap[donation.CampaignID] || "Unknown Campaign",
          statusColor:
            donation.PaymentStatus === "Paid" ? "text-black" : "text-red-500",
        }))
        .filter((donation) => {
          return (
            (filters.reference
              ? donation.Reference.includes(filters.reference)
              : true) &&
            (filters.donorType
              ? donation.donorType === filters.donorType
              : true) &&
            (filters.paymentMethod
              ? donation.PaymentMethod === filters.paymentMethod
              : true) &&
            (filters.paymentStatus
              ? donation.PaymentStatus === filters.paymentStatus
              : true) &&
            (!filters.Currency || donation.Currency === filters.Currency) &&
            (filters.amount
              ? parseFloat(donation.Amount) >= parseFloat(filters.amount)
              : true) &&
            (filters.date
              ? new Date(donation.DateOfDonation).toLocaleDateString() ===
                new Date(filters.date).toLocaleDateString()
              : true)
          );
        }),
    [donations, filters]
  );

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumns = [
      "#",
      "Reference",
      "Donor Names",
      "Donor Type",
      "Payment Method",
      "Payment Status",
      "Amount",
      "Campaign",
      "Date and Time",
    ];
    const tableRows = [];

    filteredDonations.forEach((donation, index) => {
      const rowData = [
        (currentPage - 1) * itemsPerPage + index + 1,
        donation.Reference,
        donation.fullName,
        donation.donorType,
        donation.PaymentMethod,
        donation.PaymentStatus,
        `${donation.Currency} ${donation.Amount.toLocaleString()}`,
        donation.campaignTitle,
        new Date(donation.DateOfDonation).toLocaleString(),
      ];
      tableRows.push(rowData);
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
    doc.save("transactions_report.pdf");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!donations.length) return <div>No data available.</div>;

  const totalItems = filteredDonations.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentPageData = filteredDonations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => {
      return direction === "next"
        ? Math.min(prev + 1, totalPages)
        : Math.max(1, prev - 1);
    });
  };

  return (
    <div className="p-4">
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
          <option value="">Payment Method</option>
          <option value="Mpesa">Mpesa</option>
          <option value="Card">Card</option>
        </select>
        <select
          value={filters.paymentStatus}
          onChange={(e) => handleFilterChange("paymentStatus", e.target.value)}
        >
          <option value="">Payment Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
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
          placeholder="Amount"
          className="p-2 border rounded shadow-sm"
        />
        <input
          type="date"
          value={filters.date}
          onChange={(e) => handleFilterChange("date", e.target.value)}
          placeholder="Date"
          className="p-2 border rounded shadow-sm"
        />
        <button
          onClick={exportPDF}
          className="bg-custom-red hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Export as PDF
        </button>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="text-xs font-semibold text-white uppercase bg-custom-red">
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
              #
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
              Reference
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
              Donor Names
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
              Donor Type
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
              Payment Method
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
              Payment Status
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
              Amount
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
              Campaign
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
              Date and Time
            </th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((donation, index) => (
            <tr key={index}>
              <td className="px-5 py-2 border-b">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="px-5 py-2 border-b">{donation.Reference}</td>
              <td className="px-5 py-2 border-b">{donation.fullName}</td>
              <td className={`px-5 py-2 border-b ${donation.typeColor}`}>
                {donation.donorType}
              </td>
              <td className="px-5 py-2 border-b">{donation.PaymentMethod}</td>
              <td className={`px-5 py-2 border-b ${donation.statusColor}`}>
                {donation.PaymentStatus}
              </td>
              <td className="px-5 py-2 border-b">
                {donation.Currency} {donation.Amount.toLocaleString()}
              </td>
              <td className="px-5 py-2 border-b">{donation.campaignTitle}</td>
              <td className="px-5 py-2 border-b">
                {new Date(donation.DateOfDonation).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default Transactions;
