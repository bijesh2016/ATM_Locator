import React from "react";

const ATMs = [
  { id: 1, atmName: "Nepal Rastra Bank ATM", atmLocation: "Kathmandu", transactionFee: "NPR 20" },
  { id: 2, atmName: "Nabil Bank ATM", atmLocation: "Pokhara", transactionFee: "NPR 18" },
  { id: 3, atmName: "Himalayan Bank ATM", atmLocation: "Lalitpur", transactionFee: "NPR 25" },
  { id: 4, atmName: "Kumari Bank ATM", atmLocation: "Bhaktapur", transactionFee: "NPR 15" },
  { id: 5, atmName: "Standard Chartered Bank ATM", atmLocation: "Biratnagar", transactionFee: "NPR 30" }
];

const Home = ({ searchQuery }) => {
  const filteredATMs = ATMs.filter(ATM =>
    ATM.atmName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-center text-2xl font-bold">Find Your Perfect ATM</h1>
      <div className="mt-4">
        {filteredATMs.length > 0 ? (
          filteredATMs.map(ATM => (
            <div key={ATM.id} className="border p-4 rounded-md shadow-md mt-4">
              <h2 className="text-xl font-bold">{ATM.atmName}</h2>
              <p>Location: {ATM.atmLocation}</p>
            </div>
          ))
        ) : (
          <p className="text-center mt-4 text-red-500">No ATMs found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
