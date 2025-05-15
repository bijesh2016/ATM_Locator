import React from 'react';
import NavProfile from '../../admin/components/Navbar/NavProfile';

const BankNavbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div className="container-fluid px-4" style={{ maxWidth: '100%' }}>
        <div className="d-flex align-items-center">
          <button 
            className="navbar-toggler me-2" 
            type="button" 
            onClick={toggleSidebar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <span className="navbar-brand mb-0 h1">Bank Branch Management</span>
        </div>

        <div className="d-flex align-items-center">
          <NavProfile showLoginLogout={true} />
        </div>
      </div>
    </nav>
  );
};

export default BankNavbar;