import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BankSidebar.css';

const BankSidebar = ({ isOpen }) => {
  const location = useLocation();

  const menuItems = [
    {
      title: 'Branch Management',
      icon: 'bi bi-bank',
      subItems: [
        { title: 'Add Branch', path: '/bank/branches/add', icon: 'bi bi-plus-circle' },
        { title: 'View Branches', path: '/bank/branches', icon: 'bi bi-list-ul' }
      ]
    }
  ];

  return (
    <div className={`bank-sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <div className="sidebar-header">
        <h3>Bank Portal</h3>
      </div>
      
      <div className="sidebar-menu">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-group">
            <div className="menu-title">
              <i className={item.icon}></i>
              {isOpen && <span>{item.title}</span>}
            </div>
            
            <ul className="submenu">
              {item.subItems.map((subItem, subIndex) => (
                <li 
                  key={subIndex} 
                  className={location.pathname === subItem.path ? 'active' : ''}
                >
                  <Link to={subItem.path}>
                    <i className={subItem.icon}></i>
                    {isOpen && <span>{subItem.title}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BankSidebar;