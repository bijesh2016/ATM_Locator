import React from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { FaSearch, FaEdit, FaTrash,FaPlus } from 'react-icons/fa';
import EditButton from '../../components/edit';

const ViewATM = () => {
  const navigate = useNavigate();
  
  const handleEdit = (atm) => {
    navigate(`/admin/atm/edit/${atm.id}`);
  };
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

        <div className="space-y-4">
  {atms.map((atm) => (
    <div key={atm.id} className="bg-white p-4 rounded-lg shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-2 sm:mb-0">
          <h3 className="font-medium text-gray-900">{atm.name}</h3>
          <p className="text-sm text-gray-500">{atm.location}</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">{atm.bank}</span>
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            atm.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {atm.status}
          </span>
          <button 
            className="text-blue-600 hover:text-blue-900"
            aria-label="Edit"
          >
            <FaEdit />
          </button>
        </div>
      </div>
    </div>
  ))}
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