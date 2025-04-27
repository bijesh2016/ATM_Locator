import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaTimes, FaMapMarkerAlt } from 'react-icons/fa';

const AddATM = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    bank: '',
    status: 'active',
    cashLimit: '',
    location: { lat: '', lng: '' }
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      // Submit form to API
      console.log('Form submitted:', formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/atms'); 
      }, 1500);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'ATM name is required';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.bank) errors.bank = 'Bank selection is required';
    if (!formData.location.lat || !formData.location.lng) {
      errors.location = 'Location coordinates are required';
    }
    return errors;
  };

  return (
    <Container fluid className="py-4">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <FaMapMarkerAlt className="me-2" />
                Add New ATM
              </h5>
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={() => navigate(-1)}
              >
                <FaTimes className="me-1" /> Cancel
              </Button>
            </Card.Header>
            <Card.Body>
              {success && (
                <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
                  ATM added successfully! Redirecting...
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="name">
                      <Form.Label>ATM Name*</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="bank">
                      <Form.Label>Bank*</Form.Label>
                      <Form.Select
                        name="bank"
                        value={formData.bank}
                        onChange={handleChange}
                        isInvalid={!!errors.bank}
                      >
                        <option value="">Select Bank</option>
                        <option value="bank1">Bank One</option>
                        <option value="bank2">Bank Two</option>
                        <option value="bank3">Bank Three</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.bank}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Address*</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    isInvalid={!!errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="status">
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="active">Active</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="out_of_service">Out of Service</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="cashLimit">
                      <Form.Label>Cash Limit ($)</Form.Label>
                      <Form.Control
                        type="number"
                        name="cashLimit"
                        value={formData.cashLimit}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <h6 className="mb-3">Location Coordinates</h6>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="lat">
                      <Form.Label>Latitude*</Form.Label>
                      <Form.Control
                        type="text"
                        name="lat"
                        value={formData.location.lat}
                        onChange={handleLocationChange}
                        isInvalid={!!errors.location}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="lng">
                      <Form.Label>Longitude*</Form.Label>
                      <Form.Control
                        type="text"
                        name="lng"
                        value={formData.location.lng}
                        onChange={handleLocationChange}
                        isInvalid={!!errors.location}
                      />
                    </Form.Group>
                  </Col>
                  {errors.location && (
                    <div className="text-danger mt-1">{errors.location}</div>
                  )}
                </Row>

                <div className="d-flex justify-content-end mt-4">
                  <Button variant="primary" type="submit">
                    <FaSave className="me-2" />
                    Save ATM
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddATM;