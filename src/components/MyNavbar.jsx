import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function MyNavbar() {
  return (
    <Navbar bg="light" variant="light" className="shadow py-4">
      <Container>
        <Navbar.Brand href="/">Reading Store</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/master-data">Master Data</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
