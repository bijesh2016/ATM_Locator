import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaPlusCircle, 
  FaListAlt,
  FaMapMarkerAlt 
} from 'react-icons/fa';

const BankSubMenu = () => {
  return (
    <div className="submenu">
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/banks/add" className="sidebar-link">
          <div className="d-flex align-items-center">
            <FaPlusCircle className="me-2" />
            <span>Add New Bank</span>
          </div>
        </Nav.Link>
        <Nav.Link as={Link} to="/banks/view" className="sidebar-link">
          <div className="d-flex align-items-center">
            <FaListAlt className="me-2" />
            <span>View Banks</span>
          </div>
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default BankSubMenu;