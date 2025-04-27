import { Dropdown } from 'react-bootstrap';

const NavProfile = () => {
  return (
    <Dropdown className="nav-profile">
      <Dropdown.Toggle variant="link">
        <div className="profile-avatar">
          <i className="bi bi-person-circle"></i>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu align="end">
        <Dropdown.Header>Admin User</Dropdown.Header>
        <Dropdown.Item>
          <i className="bi bi-person me-2"></i> View Profile
        </Dropdown.Item>
        <Dropdown.Item>
          <i className="bi bi-gear me-2"></i> Settings
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item className="text-danger">
          <i className="bi bi-box-arrow-left me-2"></i> Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavProfile;