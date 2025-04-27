import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
import AdminNavbar from '../Navbar/AdminNavbar';
import AdminSidebar from '../Sidebar/AdminSidebar';
import './AdminLayout.css';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation(); // <-- ADD THIS

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-layout">
      <AdminNavbar toggleSidebar={toggleSidebar} />
      
      <div className="admin-content-wrapper">
        <AdminSidebar isOpen={sidebarOpen} />
        
        <main className={`admin-main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
          <Container fluid>
            
            {/* Show Dashboard Overview only on dashboard route */}
            {location.pathname === "/admin/dashboard" && (
              <>
                <div className="dashboard-header">
                  <h1>ATM Locator Admin</h1>
                  <div className="last-updated">
                    Last updated 5 mins ago | <span className="alert-badge">System Alerts</span>
                  </div>
                </div>

                <Row className="mt-4">
                  <Col md={4}>
                    <Card className="dashboard-card">
                      <Card.Body>
                        <Card.Title>Banks</Card.Title>
                        <Card.Text className="stat-value">42</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="dashboard-card">
                      <Card.Body>
                        <Card.Title>Active Users</Card.Title>
                        <Card.Text className="stat-value">3,789</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="dashboard-card highlight">
                      <Card.Body>
                        <Card.Title>This Month</Card.Title>
                        <Card.Text className="stat-value positive">+12%</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col md={12}>
                    <Card className="alerts-card">
                      <Card.Body>
                        <Card.Title>Recent Alerts</Card.Title>
                        <div className="alert-item">
                          <span className="alert-time">2 mins ago</span>
                          <span className="alert-message">ATM-1245 low on cash</span>
                        </div>
                        <div className="alert-item">
                          <span className="alert-time">1 hour ago</span>
                          <span className="alert-message">Network connectivity issue at Main Branch</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </>
            )}

            {/* Render Page Content */}
            <Outlet />
          </Container>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
