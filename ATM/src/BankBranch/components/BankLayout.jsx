import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form } from 'react-bootstrap';
import { Outlet, useLocation, Link } from 'react-router-dom';
import BankNavbar from './BankNavbar';
import BankSidebar from './BankSidebar';
import './BankLayout.css';

const BankLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const [branches, setBranches] = useState([
    { id: 1, name: 'Main Branch', code: 'MB001', bank: 'National Bank', status: 'Active' },
    { id: 2, name: 'Downtown Branch', code: 'DT002', bank: 'National Bank', status: 'Active' },
    { id: 3, name: 'Westside Branch', code: 'WS003', bank: 'City Bank', status: 'Inactive' },
  ]);

  const [newBranch, setNewBranch] = useState({
    bank: '',
    name: '',
    code: '',
    address: '',
    phone: '',
    latitude:'',
    longitude:'',
    status: 'Active'
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBranch({ ...newBranch, [name]: value });
  };

  const handleAddBranch = (e) => {
    e.preventDefault();
    const addedBranch = { ...newBranch, id: branches.length + 1 };
    setBranches([...branches, addedBranch]);
    setNewBranch({
      bank: '',
      name: '',
      code: '',
      address: '',
      phone: '',
      status: 'Active'
    });
  };

  return (
    <div className="bank-layout">
      <BankNavbar toggleSidebar={toggleSidebar} />
      
      <div className="bank-content-wrapper">
        <BankSidebar isOpen={sidebarOpen} />
        
        <main className={`bank-main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
          <Container fluid>
            <div className="dashboard-header">
              <h1>Bank Branch Management</h1>
              {location.pathname === "/bank/branches" && (
                <div className="last-updated">
                  Showing {branches.length} branches | <span className="alert-badge">Last updated: {new Date().toLocaleTimeString()}</span>
                </div>
              )}
            </div>

{/* Add Branch View */}
{location.pathname === "/bank/branches/add" && (
  <Card className="mt-4">
    <Card.Body>
      <Card.Title>Add New Branch</Card.Title>
      <Form onSubmit={handleAddBranch}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Bank*</Form.Label>
              <Form.Select name="bank" value={newBranch.bank} onChange={handleInputChange} required>
                <option value="">Select Bank</option>
                <option value="National Bank">National Bank</option>
                <option value="City Bank">City Bank</option>
                <option value="Global Bank">Global Bank</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Branch Name*</Form.Label>
              <Form.Control type="text" name="name" value={newBranch.name} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Branch Code*</Form.Label>
              <Form.Control type="text" name="code" value={newBranch.code} onChange={handleInputChange} required />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Address*</Form.Label>
              <Form.Control as="textarea" rows={3} name="address" value={newBranch.address} onChange={handleInputChange} required />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Latitude*</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="latitude" 
                    step="0.000001"
                    value={newBranch.latitude} 
                    onChange={handleInputChange} 
                    required 
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Longitude*</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="longitude" 
                    step="0.000001"
                    value={newBranch.longitude} 
                    onChange={handleInputChange} 
                    required 
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Contact Number*</Form.Label>
              <Form.Control type="tel" name="phone" value={newBranch.phone} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={newBranch.status} onChange={handleInputChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-2">
          <Link to="/bank/branches" className="btn btn-secondary">Cancel</Link>
          <Button variant="primary" type="submit">Save Branch</Button>
        </div>
      </Form>
    </Card.Body>
  </Card>
)}
            {/* View Branches List */}
            {location.pathname === "/bank/branches" && (
              <Card className="mt-4">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Card.Title>Branch List</Card.Title>
                    <Link to="/bank/branches/add" className="btn btn-primary">
                      <i className="bi bi-plus-lg me-2"></i>Add New Branch
                    </Link>
                  </div>

                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Branch Name</th>
                        <th>Branch Code</th>
                        <th>Bank</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {branches.map(branch => (
                        <tr key={branch.id}>
                          <td>{branch.name}</td>
                          <td>{branch.code}</td>
                          <td>{branch.bank}</td>
                          <td>
                            <span className={`badge ${branch.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                              {branch.status}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button variant="outline-primary" size="sm">
                                <i className="bi bi-pencil-square"></i> Edit
                              </Button>
                              <Button variant="outline-danger" size="sm">
                                <i className="bi bi-trash"></i> Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            )}

            <Outlet />
          </Container>
        </main>
      </div>
    </div>
  );
};

export default BankLayout;