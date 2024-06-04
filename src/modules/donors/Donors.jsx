import React, { useState, useMemo } from "react";
import { useData } from "../../context/DataContext";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Donors = () => {
  const { donors, loading, error } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    country: "",
    county: "",
    donorType: "",
  });

  const itemsPerPage = 20;

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const filteredDonors = useMemo(() => {
    return donors.filter((donor) => {
      const fullName = `${donor.FirstName} ${donor.LastName}`.toLowerCase();
      const generalSearchMatch =
        !searchTerm ||
        fullName.includes(searchTerm.toLowerCase()) ||
        donor.CompanyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.Email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.PhoneNumber?.includes(searchTerm) ||
        donor.PhysicalAddress?.toLowerCase().includes(searchTerm.toLowerCase());

      return (
        !donor.IsAnonymous &&
        generalSearchMatch &&
        (filters.country
          ? donor.Country.toLowerCase().includes(filters.country.toLowerCase())
          : true) &&
        (filters.county
          ? donor.County?.toLowerCase().includes(filters.county.toLowerCase())
          : true) &&
        (filters.donorType
          ? donor.DonorType.toLowerCase() === filters.donorType.toLowerCase()
          : true)
      );
    });
  }, [donors, searchTerm, filters]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!filteredDonors.length) return <div>No donors available.</div>;

  const handlePageChange = (direction) => {
    setCurrentPage((prev) =>
      direction === "next"
        ? Math.min(prev + 1, Math.ceil(filteredDonors.length / itemsPerPage))
        : Math.max(1, prev - 1)
    );
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredDonors.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumns = ["Name", "Company", "Email", "Phone", "Address", "Country", "County", "DonorType"];
    const tableRows = [];

    filteredDonors.forEach((donor, index) => {
        const rowData = [
            `${donor.FirstName} ${donor.LastName}`,
            donor.CompanyName || 'N/A',
            donor.Email,
            donor.PhoneNumber,
            donor.PhysicalAddress,
            donor.Country,
            donor.County || 'N/A',
            donor.DonorType
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
    doc.save('donors_report.pdf');
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

        <input
          type="text"
          value={filters.country}
          onChange={(e) => handleFilterChange("country", e.target.value)}
          placeholder="Country"
          className="p-2 border rounded shadow-sm"
        />
        <input
          type="text"
          value={filters.county}
          onChange={(e) => handleFilterChange("county", e.target.value)}
          placeholder="County"
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
              ID
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
              Full Name
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
              Company Name
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
              Email
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
              Phone Number
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
              Physical Address
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
              Country
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
              County
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left">
              Donor Type
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((donor) => (
            <tr key={donor.DonorID}>
              <td className="px-5 py-2 border-b">{donor.DonorID}</td>
              <td className="px-5 py-2 border-b">
                {donor.FirstName} {donor.LastName}
              </td>
              <td className="px-5 py-2 border-b">
                {donor.CompanyName || "N/A"}
              </td>
              <td className="px-5 py-2 border-b">{donor.Email}</td>
              <td className="px-5 py-2 border-b">{donor.PhoneNumber}</td>
              <td className="px-5 py-2 border-b">{donor.PhysicalAddress}</td>
              <td className="px-5 py-2 border-b">{donor.Country}</td>
              <td className="px-5 py-2 border-b">{donor.County || "N/A"}</td>
              <td className="px-5 py-2 border-b">{donor.DonorType}</td>
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
          Page {currentPage} of{" "}
          {Math.ceil(filteredDonors.length / itemsPerPage)}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage * itemsPerPage >= filteredDonors.length}
          className="bg-custom-red hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <FaCaretRight />
        </button>
      </div>
    </div>
  );
};

export default Donors;
