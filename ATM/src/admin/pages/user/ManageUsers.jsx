import React from 'react';
import { FaSearch, FaEdit, FaTrash, FaUserShield, FaUserCheck, FaUserTimes } from 'react-icons/fa';

const ManageUsers = () => {
  // Sample user data - replace with real API calls
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Pending' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex items-center">
          <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search Users..." 
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="ml-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Roles</option>
            <option>Admin</option>
            <option>Manager</option>
            <option>User</option>
          </select>
          <select className="ml-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Blocked</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 
                      user.role === 'Manager' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <FaEdit />
                    </button>
                    {user.status === 'Active' ? (
                      <button className="text-red-600 hover:text-red-900 mr-3">
                        <FaUserTimes />
                      </button>
                    ) : (
                      <button className="text-green-600 hover:text-green-900 mr-3">
                        <FaUserCheck />
                      </button>
                    )}
                    <button className="text-purple-600 hover:text-purple-900">
                      <FaUserShield />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing 1 to {users.length} of {users.length} entries
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

export default ManageUsers;