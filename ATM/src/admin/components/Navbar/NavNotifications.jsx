import { Dropdown } from 'react-bootstrap';

const NavNotifications = () => {
  return (
    <Dropdown className="nav-notifications">
      <Dropdown.Toggle variant="link">
        <i className="bi bi-bell"></i>
        <span className="notification-badge">3</span>
      </Dropdown.Toggle>

      <Dropdown.Menu align="end">
        <Dropdown.Header>Notifications (3)</Dropdown.Header>
        <Dropdown.Item>
          <i className="bi bi-atm text-primary"></i>
          <div>
            <strong>New ATM Reports</strong>
            <small>10 minutes ago</small>
          </div>
        </Dropdown.Item>
        <Dropdown.Item>
          <i className="bi bi-exclamation-triangle text-warning"></i>
          <div>
            <strong>Feedback Alerts</strong>
            <small>1 hour ago</small>
          </div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavNotifications;