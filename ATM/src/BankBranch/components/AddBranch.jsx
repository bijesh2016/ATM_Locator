import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AddBranch = () => {
  const [formData, setFormData] = useState({
    bank: '',
    branchName: '',
    branchCode: '',
    address: '',
    phone: '',
    email: '',
    latitude: '',
    longitude: '',
    status: 'Active'
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send data to your API
    console.log('Branch data submitted:', formData);
    setSuccess(true);
    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({
        bank: '',
        branchName: '',
        branchCode: '',
        address: '',
        phone: '',
        email: '',
        latitude: '',
        longitude: '',
        status: 'Active'
      });
      setSuccess(false);
    }, 2000);
  };

  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title className="mb-4">Add New Branch</Card.Title>
        
        {success && <Alert variant="success">Branch added successfully!</Alert>}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Bank Name *</Form.Label>
                <Form.Select 
                  name="bank" 
                  value={formData.bank} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Select Bank</option>
                  <option value="National Bank">National Bank</option>
                  <option value="City Bank">City Bank</option>
                  <option value="Global Bank">Global Bank</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Branch Name *</Form.Label>
                <Form.Control 
                  type="text" 
                  name="branchName" 
                  value={formData.branchName} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Branch Code *</Form.Label>
                <Form.Control 
                  type="text" 
                  name="branchCode" 
                  value={formData.branchCode} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Address *</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Latitude *</Form.Label>
                    <Form.Control 
                      type="number" 
                      name="latitude" 
                      step="0.000001"
                      value={formData.latitude} 
                      onChange={handleChange} 
                      required 
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Longitude *</Form.Label>
                    <Form.Control 
                      type="number" 
                      name="longitude" 
                      step="0.000001"
                      value={formData.longitude} 
                      onChange={handleChange} 
                      required 
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number *</Form.Label>
                <Form.Control 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label>Status</Form.Label>
            <Form.Select 
              name="status" 
              value={formData.status} 
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Link to="/bank/branches" className="btn btn-secondary">
              Cancel
            </Link>
            <Button variant="primary" type="submit">
              Save Branch
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddBranch;