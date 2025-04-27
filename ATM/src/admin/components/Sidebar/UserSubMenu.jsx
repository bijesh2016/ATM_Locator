import { Nav } from 'react-bootstrap';

const UserSubmenu = () => {
  return (
    <Nav className="flex-column ps-3">
      <Nav.Link href="#" className="sidebar-link">
        <i className="bi bi-person-gear"></i>
        <span>Manage Users</span>
      </Nav.Link>
      <Nav.Link href="#" className="sidebar-link">
        <i className="bi bi-person-x"></i>
        <span>Blocked Users</span>
      </Nav.Link>
    </Nav>
  );
};

export default UserSubmenu;