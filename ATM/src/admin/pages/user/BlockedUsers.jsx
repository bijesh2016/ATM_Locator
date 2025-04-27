import React from 'react';
import { FaSearch, FaUserCheck, FaTrash } from 'react-icons/fa';

const BlockedUsers = () => {
  // Sample blocked users data - replace with real API calls
  const blockedUsers = [
    { id: 1, name: 'Alice Brown', email: 'alice@example.com', blockedDate: '2023-05-15', reason: 'Violation of terms' },
    { id: 2, name: 'Charlie Davis', email: 'charlie@example.com', blockedDate: '2023-06-22', reason: 'Suspicious activity' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Blocked Users</h2>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative max-w-md">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search Blocked Users..." 
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blocked Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blockedUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.blockedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-green-600 hover:text-green-900 mr-4">
                      <FaUserCheck className="mr-1" /> Unblock
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing 1 to {blockedUsers.length} of {blockedUsers.length} entries
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded-md bg-gray-100 text-gray-700">Previous</button>
            <button className="px-3 py-1 border rounded-md bg-blue-600 text-white">1</button>
            <button className="px-3 py-1 border rounded-md bg-gray-100 text-gray-700">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockedUsers;