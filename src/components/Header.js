import React, { useEffect } from 'react'
import { Container, Nav, Navbar, NavDropdown, Form, Image } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';

const Header = ({ handleProductSearch, isUserLoggedIn }) => {
  let history = useHistory()
  const UserMenu = (
    <>
      <Image
        src={'https://github.com/sanukumar.png'}
        alt="UserName profile image"
        roundedCircle
        style={{ width: '40px' }}
      />
      {isUserLoggedIn && <span>{isUserLoggedIn.firstname}</span>}
    </>
  )

  useEffect(() => {

  }, [isUserLoggedIn])

  const handleLogout = () => {
    localStorage.clear();
    history.push('/')
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand onClick={() => history.push('/')} style={{ cursor: "pointer" }}>Product Inventory</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => history.push("/about")}>About</Nav.Link>
            <Nav.Link onClick={() => history.push("/chart")}>Product Chart</Nav.Link>
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
            <NavDropdown.Item onClick={() => history.push("/about")}>About <NavDropdown.Divider /></NavDropdown.Item>
            <NavDropdown.Item onClick={() => history.push('/register')}>Register</NavDropdown.Item>
            {isUserLoggedIn
              ? <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              : <NavDropdown.Item onClick={() => history.push('/login')}>Login</NavDropdown.Item>
            }
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header