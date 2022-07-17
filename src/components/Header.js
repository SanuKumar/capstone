import React from 'react'
import { Container, Nav, Navbar, NavDropdown, Form, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { BiLogOut } from 'react-icons/bi';

const Header = ({ handleProductSearch, isUserLoggedIn }) => {
  let history = useHistory()
  const UserMenu = (
    <>
      {isUserLoggedIn ?
        <>
          <Image
            src={'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png'}
            alt="UserName profile image"
            roundedCircle
            style={{ width: '40px' }}
          />
          <span style={{ color: "white" }}>
            {isUserLoggedIn.firstname}
          </span>
        </> : <span style={{ color: "white" }}>Login/Register</span>}
    </>
  )

  const handleLogout = () => {
    sessionStorage.clear();
    history.push('/')
    window.location.reload();
  }

  return (
    <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand onClick={() => history.push('/')} style={{ cursor: "pointer" }}>Product Inventory</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => history.push("/about")}>About</Nav.Link>
            <Nav.Link onClick={() => history.push("/chart")} style={{ marginRight: "2rem" }}>Product's Chart</Nav.Link>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => handleProductSearch(e.target.value)}
              />
            </Form>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <NavDropdown
            title={UserMenu}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item onClick={() => history.push("/about")}>About</NavDropdown.Item>
            <NavDropdown.Item onClick={() => history.push('/register')}>Register <NavDropdown.Divider /></NavDropdown.Item>
            {isUserLoggedIn
              ? <NavDropdown.Item onClick={handleLogout}>Logout <BiLogOut /></NavDropdown.Item>
              : <NavDropdown.Item onClick={() => history.push('/login')}>Login <FiLogIn /></NavDropdown.Item>
            }
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header