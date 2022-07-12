import React from 'react'
import { Container, Nav, Navbar, NavDropdown, Form, Image } from 'react-bootstrap';

const Header = ({ handleProductSearch }) => {

  const UserMenu = (
    <Image
      src={'https://github.com/sanukumar.png'}
      alt="UserName profile image"
      roundedCircle
      style={{ width: '40px' }}
    />
  )

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/">Product Inventory</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#/">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
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
            <NavDropdown.Item href="#action/3.1">About <NavDropdown.Divider /></NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Login</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header