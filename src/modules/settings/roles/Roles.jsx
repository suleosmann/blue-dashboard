import React, { useState } from 'react';

// Dummy data for roles
const initialRoles = [
  { id: 1, name: 'Admin', restrictions: 'Full Access' },
  { id: 2, name: 'Editor', restrictions: 'Create, Edit Posts; No Delete' },
  { id: 3, name: 'Viewer', restrictions: 'View Only' }
];

const Roles = () => {
  const [roles] = useState(initialRoles);

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Roles</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead className="bg-custom-red text-white">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Role Name</th>
              <th className="px-4 py-3 text-left">Restrictions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {roles.map(role => (
              <tr key={role.id}>
                <td className="px-4 py-3 border-b border-gray-200">{role.id}</td>
                <td className="px-4 py-3 border-b border-gray-200">{role.name}</td>
                <td className="px-4 py-3 border-b border-gray-200">{role.restrictions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Roles;
