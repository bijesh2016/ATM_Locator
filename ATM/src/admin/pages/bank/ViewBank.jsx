import React from "react";
import { Link ,useNavigate} from "react-router-dom";
import { FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const ViewBank = () => {

  const navigate = useNavigate();
  
  const handleEdit = (bank) => {
    navigate(`/admin/bank/edit/${bank.id}`);
  };
  // Sample bank data - replace with real API calls
  const banks = [
    { id: 1, name: "City Bank", code: "CITI", branches: 24, status: "Active" },
    {
      id: 2,
      name: "National Bank",
      code: "NATL",
      branches: 42,
      status: "Active",
    },
    {
      id: 3,
      name: "Global Bank",
      code: "GLBL",
      branches: 15,
      status: "Inactive",
    },
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

        <div className="space-y-4">
          {banks.map((bank) => (
            <div
              key={bank.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-medium text-gray-900 truncate">
                      {bank.name}
                    </h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {bank.code}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {bank.branches} branches
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`px-2.5 py-1 text-xs leading-4 font-medium rounded-full ${
                      bank.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {bank.status}
                  </span>

                  <button
                    className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors"
                    aria-label="Edit bank"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing 1 to {banks.length} of {banks.length} entries
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded-md bg-gray-100 text-gray-700">
              Previous
            </button>
            <button className="px-3 py-1 border rounded-md bg-blue-600 text-white">
              1
            </button>
            <button className="px-3 py-1 border rounded-md bg-gray-100 text-gray-700">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBank;
