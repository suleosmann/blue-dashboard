import React from 'react';

// Dummy data for the logs
const logs = [
  { id: 1, user: 'Alice', type: "Admin", action: 'Logged in', timestamp: '2023-05-08 09:00' },
  { id: 2, user: 'Bob', type: "Finance", action: 'Added a new post', timestamp: '2023-05-08 09:15' },
  { id: 3, user: 'Charlie', type: "Manager", action: 'Logged out', timestamp: '2023-05-08 09:30' },
  { id: 4, user: 'Dave', type: "Volunteer", action: 'Updated profile', timestamp: '2023-05-08 10:00' },
  { id: 5, user: 'Eve', type: "Fundraiser", action: 'Deleted a post', timestamp: '2023-05-08 10:30' }
];

const Log = () => {
  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Activity Logs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead className="bg-custom-red text-white">
            <tr>
              <th className="w-1/6 px-4 py-3 text-left">User</th>
              <th className="w-1/6 px-4 py-3 text-left">Role</th>
              <th className="w-2/6 px-4 py-3 text-left">Action</th>
              <th className="w-2/6 px-4 py-3 text-left">Timestamp</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {logs.map(log => (
              <tr key={log.id}>
                <td className="px-4 py-3 border-b border-gray-200">{log.user}</td>
                <td className="px-4 py-3 border-b border-gray-200">{log.type}</td>
                <td className="px-4 py-3 border-b border-gray-200">{log.action}</td>
                <td className="px-4 py-3 border-b border-gray-200">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Log;
