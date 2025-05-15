import React, { useState } from 'react';
import { Card, Button, Badge, Form, InputGroup, ListGroup, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ViewBranch = () => {
  const [branches, setBranches] = useState([
    {
      id: 1,
      bank: 'National Bank',
      branchName: 'Main Branch',
      branchCode: 'MB001',
      address: '123 Main St, Cityville',
      phone: '+1 555-123-4567',
      email: 'main@nationalbank.com',
      status: 'Active'
    },
    {
      id: 2,
      bank: 'City Bank',
      branchName: 'Downtown Branch',
      branchCode: 'DT002',
      address: '456 Center Ave, Townsville',
      phone: '+1 555-987-6543',
      email: 'downtown@citybank.com',
      status: 'Active'
    },
    {
      id: 3,
      bank: 'Global Bank',
      branchName: 'Westside Branch',
      branchCode: 'WS003',
      address: '789 West Rd, Villagetown',
      phone: '+1 555-456-7890',
      email: 'westside@globalbank.com',
      status: 'Inactive'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredBranches = branches.filter(branch => 
    branch.branchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.branchCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.bank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStatus = (id) => {
    setBranches(branches.map(branch => 
      branch.id === id 
        ? { ...branch, status: branch.status === 'Active' ? 'Inactive' : 'Active' } 
        : branch
    ));
  };

  return (
    <Card className="mt-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Card.Title>Branch Management</Card.Title>
          <Link to="/bank/branches/add" className="btn btn-primary">
            <i className="bi bi-plus-lg me-2"></i>Add New Branch
          </Link>
        </div>

        <InputGroup className="mb-4">
          <Form.Control
            placeholder="Search branches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-secondary">
            <i className="bi bi-search"></i>
          </Button>
        </InputGroup>

        {filteredBranches.length === 0 ? (
          <div className="text-center py-4">
            <i className="bi bi-building text-muted" style={{ fontSize: '3rem' }}></i>
            <p className="mt-3">No branches found</p>
          </div>
        ) : (
          <Row>
            {filteredBranches.map(branch => (
              <Col key={branch.id} md={6} lg={4} className="mb-4">
                <Card className="h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <Card.Title>{branch.branchName}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {branch.bank} • {branch.branchCode}
                        </Card.Subtitle>
                      </div>
                      <Badge bg={branch.status === 'Active' ? 'success' : 'secondary'}>
                        {branch.status}
                      </Badge>
                    </div>

                    <ListGroup variant="flush" className="my-3">
                      <ListGroup.Item>
                        <i className="bi bi-geo-alt me-2 text-primary"></i>
                        {branch.address}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <i className="bi bi-telephone me-2 text-primary"></i>
                        {branch.phone}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <i className="bi bi-envelope me-2 text-primary"></i>
                        {branch.email || 'N/A'}
                      </ListGroup.Item>
                    </ListGroup>

                    <div className="d-flex justify-content-between">
                      <Button 
                        variant={branch.status === 'Active' ? 'outline-danger' : 'outline-success'}
                        size="sm"
                        onClick={() => toggleStatus(branch.id)}
                      >
                        {branch.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Link 
                        to={`/bank/branches/edit/${branch.id}`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        <i className="bi bi-pencil-square me-1"></i>Edit
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Card.Body>
    </Card>
  );
};

export default ViewBranch;