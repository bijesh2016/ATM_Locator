import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';

const ViewATM = () => {
  // Sample ATM data - replace with real API calls
  const atms = [
    { id: 1, name: 'Main Street ATM', location: '123 Main St', bank: 'City Bank', status: 'Active' },
    { id: 2, name: 'Mall ATM', location: '456 Mall Rd', bank: 'National Bank', status: 'Active' },
    { id: 3, name: 'Airport ATM', location: '789 Airport Blvd', bank: 'Global Bank', status: 'Maintenance' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">ATM Management</h2>
        <Link 
          to="/admin/atms/add" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <FaPlus className="mr-2" /> Add New ATM
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex items-center">
          <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search ATMs..." 
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="ml-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Maintenance</option>
            <option>Offline</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {atms.map((atm) => (
                <tr key={atm.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{atm.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{atm.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{atm.bank}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      atm.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {atm.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">
                      <FaEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing 1 to {atms.length} of {atms.length} entries
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

export default ViewATM;