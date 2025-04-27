import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { 
  FaMapMarkerAlt, 
  FaUniversity, 
  FaUsers, 
  FaChartLine,
  FaCalendarCheck,
  FaExclamationTriangle
} from 'react-icons/fa';

const Dashboard = () => {
  // Sample data - replace with real data from your API
  const stats = [
    { title: 'Total ATMs', value: '1,245', icon: <FaMapMarkerAlt size={24} />, color: 'primary' },
    { title: 'Banks', value: '42', icon: <FaUniversity size={24} />, color: 'success' },
    { title: 'Active Users', value: '3,789', icon: <FaUsers size={24} />, color: 'info' },
    { title: 'This Month', value: '+12%', icon: <FaChartLine size={24} />, color: 'warning' }
  ];

  const recentActivities = [
    { id: 1, action: 'New ATM added', location: 'Downtown Branch', time: '2 mins ago' },
    { id: 2, action: 'User registered', user: 'john.doe@example.com', time: '15 mins ago' },
    { id: 3, action: 'Maintenance scheduled', atm: 'ATM-2456', time: '1 hour ago' },
    { id: 4, action: 'Issue reported', location: 'Central Park ATM', time: '3 hours ago' }
  ];

  const alerts = [
    { id: 1, severity: 'high', message: 'ATM-1245 low on cash', time: '30 mins ago' },
    { id: 2, severity: 'medium', message: 'Network connectivity issue at Main Branch', time: '2 hours ago' }
  ];

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">Dashboard Overview</h2>
      
      <Row className="mb-4">
        {stats.map((stat, index) => (
          <Col key={index} xs={12} sm={6} md={3} className="mb-3">
            <Card className={`border-0 bg-${stat.color}-light`}>
              <Card.Body className="d-flex align-items-center">
                <div className={`icon-shape icon-lg bg-${stat.color} text-white rounded-circle me-3`}>
                  {stat.icon}
                </div>
                <div>
                  <h6 className="mb-1">{stat.title}</h6>
                  <h3 className="mb-0">{stat.value}</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        <Col lg={8} className="mb-4">
          <Card className="h-100">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Activities</h5>
              <small className="text-muted">Last updated 5 mins ago</small>
            </Card.Header>
            <Card.Body>
              <div className="list-group list-group-flush">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="list-group-item d-flex align-items-center px-0">
                    <div className="icon-shape icon-sm bg-light-primary text-primary rounded-circle me-3">
                      <FaCalendarCheck />
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between">
                        <h6 className="mb-0">{activity.action}</h6>
                        <small className="text-muted">{activity.time}</small>
                      </div>
                      <small className="text-muted">
                        {activity.location || activity.user || activity.atm}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} className="mb-4">
          <Card className="h-100">
            <Card.Header>
              <h5 className="mb-0">System Alerts</h5>
            </Card.Header>
            <Card.Body>
              <div className="list-group list-group-flush">
                {alerts.map(alert => (
                  <div key={alert.id} className="list-group-item px-0">
                    <div className="d-flex align-items-center">
                      <div className="icon-shape icon-sm bg-light-danger text-danger rounded-circle me-3">
                        <FaExclamationTriangle />
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{alert.message}</h6>
                        <small className="text-muted">{alert.time}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">ATM Locations Map</h5>
            </Card.Header>
            <Card.Body>
              <div className="ratio ratio-16x9 bg-light rounded">
                {/* Placeholder for map - integrate with your map library */}
                <div className="d-flex align-items-center justify-content-center text-muted">
                  <span>Map Visualization Will Appear Here</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;