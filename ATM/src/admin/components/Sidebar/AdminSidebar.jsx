import { useState } from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaUsers,
  FaCheck,
  FaTimes,
  FaCircle,
  FaUserCog,
  FaUserSlash,
  FaPlus,
  FaListUl
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import './AdminSidebar.css';

const AdminSidebar = ({ isOpen }) => {
  const location = useLocation();

  const [expandedSections, setExpandedSections] = useState({
    atms: location.pathname.includes('/admin/atms'),
    banks: location.pathname.includes('/admin/banks'),
    users: location.pathname.includes('/admin/users')
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const isActive = (path) => location.pathname === path;
  const isSectionActive = (section) => location.pathname.includes(`/admin/${section}`);

  return (
    <aside className={`admin-sidebar ${isOpen ? 'open' : 'collapsed'} fixed-left`} aria-label="Admin navigation">
      <div className="sidebar-header p-3">
        <h5 className="mb-0 fw-bold">ATM Locator Admin</h5>
        <small className="text-muted">ATM Locator</small>
      </div>

      <Nav className="flex-column p-2">
        {/* Dashboard */}
        <Nav.Link as={Link} to="/admin/dashboard" className={`sidebar-link ${isActive('/admin/dashboard') ? 'active-link' : ''}`}>
          <div className="d-flex align-items-center">
            {isActive('/admin/dashboard') ? (
              <FaCheck className="me-2 text-success" />
            ) : (
              <FaCircle className="me-2 text-secondary" size={10} />
            )}
            <MdDashboard className="me-2" />
            <span>Dashboard</span>
          </div>
        </Nav.Link>

        {/* ATMs Section */}
        <Nav.Link 
          href="#"
          className="sidebar-link"
          onClick={() => toggleSection('atms')}
        >
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              {isSectionActive('atms') ? (
                <FaCheck className="me-2 text-success" />
              ) : (
                <FaTimes className="me-2 text-secondary" />
              )}
              <FaMapMarkerAlt className="me-2" />
              <span>ATMs</span>
            </div>
            <i className={`bi bi-chevron-${expandedSections.atms ? 'down' : 'right'}`}></i>
          </div>
        </Nav.Link>
        {expandedSections.atms && (
          <div className="ms-4">
            <Nav.Link as={Link} to="/admin/atms/add" className={`sidebar-sublink ${isActive('/admin/atms/add') ? 'active-link' : ''}`}>
              <FaPlus className="me-2" size={12} />
              Add New ATM
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/atms" className={`sidebar-sublink ${isActive('/admin/atms') ? 'active-link' : ''}`}>
              <FaListUl className="me-2" size={12} />
              View ATMs
            </Nav.Link>
          </div>
        )}

        {/* Banks Section */}
        <Nav.Link 
          href="#"
          className="sidebar-link"
          onClick={() => toggleSection('banks')}
        >
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              {isSectionActive('banks') ? (
                <FaCheck className="me-2 text-success" />
              ) : (
                <FaTimes className="me-2 text-secondary" />
              )}
              <FaMapMarkerAlt className="me-2" />
              <span>Banks</span>
            </div>
            <i className={`bi bi-chevron-${expandedSections.banks ? 'down' : 'right'}`}></i>
          </div>
        </Nav.Link>
        {expandedSections.banks && (
          <div className="ms-4">
            <Nav.Link as={Link} to="/admin/banks/add" className={`sidebar-sublink ${isActive('/admin/banks/add') ? 'active-link' : ''}`}>
              <FaPlus className="me-2" size={12} />
              Add New Bank
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/banks" className={`sidebar-sublink ${isActive('/admin/banks') ? 'active-link' : ''}`}>
              <FaListUl className="me-2" size={12} />
              View Banks
            </Nav.Link>
          </div>
        )}

        {/* Users Section */}
        <Nav.Link 
          href="#"
          className="sidebar-link"
          onClick={() => toggleSection('users')}
        >
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              {isSectionActive('users') ? (
                <FaCheck className="me-2 text-success" />
              ) : (
                <FaTimes className="me-2 text-secondary" />
              )}
              <FaUsers className="me-2" />
              <span>Users</span>
            </div>
            <i className={`bi bi-chevron-${expandedSections.users ? 'down' : 'right'}`}></i>
          </div>
        </Nav.Link>
        {expandedSections.users && (
          <div className="ms-4">
            <Nav.Link as={Link} to="/admin/users/manage" className={`sidebar-sublink ${isActive('/admin/users/manage') ? 'active-link' : ''}`}>
              <FaUserCog className="me-2" size={12} />
              Manage Users
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/users/blocked" className={`sidebar-sublink ${isActive('/admin/users/blocked') ? 'active-link' : ''}`}>
              <FaUserSlash className="me-2" size={12} />
              Blocked Users
            </Nav.Link>
          </div>
        )}
      </Nav>
    </aside>
  );
};

export default AdminSidebar;
