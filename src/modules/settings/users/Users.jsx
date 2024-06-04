import React, { useState, useMemo } from "react";
import { useData } from "../../../context/DataContext";
import { FaCaretLeft, FaCaretRight, FaEye, FaPencilAlt, FaTrash } from 'react-icons/fa';


const Users = () => {
  const { staff, loading, error } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const filteredStaff = useMemo(() => {
    return staff.filter(staffMember =>
      (staffMember.firstName && staffMember.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (staffMember.lastName && staffMember.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (staffMember.email && staffMember.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (staffMember.phone && staffMember.phone.includes(searchTerm)) || // Assuming 'phone' is the correct field name
      (staffMember.role && staffMember.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (staffMember.status && staffMember.status.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [staff, searchTerm]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!filteredStaff.length) return <div>No staff members available.</div>;

  const handlePageChange = (direction) => {
    setCurrentPage(prev => {
      if (direction === "next" && prev < totalPages) {
        return prev + 1;
      } else if (direction === "prev" && prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  };

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
  const currentPageData = filteredStaff.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-4">
      <div className="flex justify-end items-center space-x-2 mb-4 p-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="p-2 border rounded shadow-sm"
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="text-xs font-semibold text-white uppercase bg-custom-red">
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left">Full Name</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left">Email</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left">Phone Number</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left">Role</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left">Status</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentPageData.map((staffMember) => (
            <tr key={staffMember.id}>
              <td className="px-5 py-2 border-b">{`${staffMember.firstName} ${staffMember.lastName}`}</td>
              <td className="px-5 py-2 border-b">{staffMember.email}</td>
              <td className="px-5 py-2 border-b">{staffMember.phone}</td>
              <td className="px-5 py-2 border-b">{staffMember.role}</td>
              <td className="px-5 py-2 border-b">{staffMember.status || 'N/A'}</td>
              <td className="px-5 py-2 border-b">
                <div className="flex space-x-2">
                  <button className="p-1 rounded bg-gray-200 hover:bg-black hover:text-white">
                    <FaPencilAlt />
                  </button>
                  <button className="p-1 rounded bg-gray-200 hover:bg-black hover:text-white">
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center space-x-2 items-center mt-4">
        <button onClick={() => handlePageChange("prev")}
                disabled={currentPage === 1}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          <FaCaretLeft />
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange("next")}
                disabled={currentPage * itemsPerPage >= filteredStaff.length}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          <FaCaretRight />
        </button>
      </div>
    </div>
  );
};

export default Users;
