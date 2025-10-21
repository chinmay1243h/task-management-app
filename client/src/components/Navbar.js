import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";

const AppNavbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("authToken");

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <Navbar bg="light" variant="light" expand="lg" sticky="top" className="border-bottom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-dark">
          📋 Task Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && (
              <Nav.Link as={Link} to="/tasks" className="fw-semibold text-dark">
                📝 My Tasks
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <Button variant="outline-secondary" onClick={handleLogout}>
                🚪 Logout
              </Button>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="fw-semibold text-dark">
                  🔑 Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="fw-semibold text-dark">
                  📝 Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
