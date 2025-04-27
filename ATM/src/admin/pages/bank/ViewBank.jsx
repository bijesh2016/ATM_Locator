import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const ViewBank = () => {
  // Sample bank data - replace with real API calls
  const banks = [
    { id: 1, name: 'City Bank', code: 'CITI', branches: 24, status: 'Active' },
    { id: 2, name: 'National Bank', code: 'NATL', branches: 42, status: 'Active' },
    { id: 3, name: 'Global Bank', code: 'GLBL', branches: 15, status: 'Inactive' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Bank Management</h2>
        <Link 
          to="/admin/banks/add" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <FaPlus className="mr-2" /> Add New Bank
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex items-center">
          <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search Banks..." 
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="ml-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branches</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {banks.map((bank) => (
                <tr key={bank.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{bank.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{bank.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{bank.branches}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      bank.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {bank.status}
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
            Showing 1 to {banks.length} of {banks.length} entries
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

export default ViewBank;