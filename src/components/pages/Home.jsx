import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container mt-4">
      <h1 className="text-center mb-4">Find Your Perfect ATM</h1>
      <div className="row">
        {filteredATMs.length > 0 ? (
          filteredATMs.map(ATM => (
            <div key={ATM.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{ATM.atmName}</h5>
                  <p className="card-text">Location: {ATM.atmLocation}</p>
                  <p className="card-text">Transaction Fee: {ATM.transactionFee}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No ATMs found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
