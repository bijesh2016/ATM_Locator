import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'
const ATMs = [
  {
    id: 1,
    atmName: "Nepal Bank Limited ATM",
    atmLocation: "Kathmandu",
    transactionFee: "NPR 20",
    link: "https://example.com/nepal-bank-limited-atm",
    latitude: 27.7046,
    longitude: 85.3072
  },
  {
    id: 2,
    atmName: "Nabil Bank ATM",
    atmLocation: "Pokhara",
    transactionFee: "NPR 18",
    link: "https://example.com/nabil-bank-atm",
    latitude: 28.2096,
    longitude: 83.9856
  },
  {
    id: 3,
    atmName: "Himalayan Bank ATM",
    atmLocation: "Lalitpur",
    transactionFee: "NPR 25",
    link: "https://example.com/himalayan-bank-atm",
    latitude: 27.6667,
    longitude: 85.3167
  },
  {
    id: 4,
    atmName: "Kumari Bank ATM",
    atmLocation: "Bhaktapur",
    transactionFee: "NPR 15",
    link: "https://example.com/kumari-bank-atm",
    latitude: 27.6710,
    longitude: 85.4298
  },
  {
    id: 5,
    atmName: "Standard Chartered Bank ATM",
    atmLocation: "Biratnagar",
    transactionFee: "NPR 30",
    link: "https://example.com/standard-chartered-bank-atm",
    latitude: 26.4525,
    longitude: 87.2718
  }
];

const Home = ({ searchQuery="" }) => {
  const filteredATMs = ATMs.filter(ATM =>
    ATM.atmName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generateMapLink = (latitude, longitude) => {
    if (!latitude || !longitude) return "https://maps.google.com";
    return `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
  };
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Find Your Perfect ATM</h1>
      </div>
      
      <div className="atms-grid">
        {filteredATMs.length > 0 ? (
          filteredATMs.map(ATM => (
            <div key={ATM.id} className="atm-card">
              <div className="atm-content">
                <h3>
                  <a href={ATM.link} target="_blank" rel="noopener noreferrer">
                    {ATM.atmName}
                  </a>
                </h3>
                <div className="atm-details">
                  <p><strong>Location:</strong> {ATM.atmLocation}</p>
                  <p><strong>Transaction Fee:</strong> {ATM.transactionFee}</p>
                </div>
                <div className="atm-actions">
                  <a
                    href={generateMapLink(ATM.latitude, ATM.longitude)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-button"
                  >
                    View on Map
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No ATMs found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;