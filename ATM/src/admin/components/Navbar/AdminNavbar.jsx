import React from 'react';
import NavNotifications from './NavNotifications';
import NavProfile from './NavProfile';

const AdminNavbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div className="container-fluid px-4" style={{ maxWidth: '100%' }}>
        {/* Left Section */}
        <div className="d-flex align-items-center">
          <button 
            className="navbar-toggler me-2" 
            type="button" 
            onClick={toggleSidebar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <span className="navbar-brand mb-0 h1">ATM Locator Admin</span>
        </div>

        <div className="d-flex align-items-center">
          <div className="me-3">
            <NavNotifications />
          </div>
          
          <NavProfile />
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;