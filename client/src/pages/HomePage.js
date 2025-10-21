import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../components/Navbar";

const HomePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("authToken");

  return (
    <div className="min-vh-100 bg-light">
      <AppNavbar />
      
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold text-dark mb-3">
                📋 Task Manager
              </h1>
              <p className="lead text-muted mb-4">
                Organize your life, boost your productivity, and achieve your goals with our powerful task management system.
              </p>
              
              {isAuthenticated ? (
                <Button 
                  variant="dark" 
                  size="lg" 
                  onClick={() => navigate("/tasks")}
                  className="me-3"
                >
                  📝 Go to My Tasks
                </Button>
              ) : (
                <div>
                  <Button 
                    variant="dark" 
                    size="lg" 
                    onClick={() => navigate("/login")}
                    className="me-3"
                  >
                    🔑 Login
                  </Button>
                  <Button 
                    variant="outline-dark" 
                    size="lg" 
                    onClick={() => navigate("/register")}
                  >
                    📝 Register
                  </Button>
                </div>
              )}
            </div>
          </Col>
        </Row>

        {/* Features Section */}
        <Row className="mt-5">
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center">
                <div className="display-6 mb-3">📝</div>
                <h4 className="card-title">Easy Task Creation</h4>
                <p className="card-text">
                  Create, edit, and manage your tasks with our intuitive interface. 
                  Add descriptions, due dates, and status updates effortlessly.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center">
                <div className="display-6 mb-3">🔍</div>
                <h4 className="card-title">Smart Filtering</h4>
                <p className="card-text">
                  Find your tasks quickly with advanced filtering, sorting, and search capabilities. 
                  Organize by status, due date, or any other criteria.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center">
                <div className="display-6 mb-3">📊</div>
                <h4 className="card-title">Progress Tracking</h4>
                <p className="card-text">
                  Monitor your productivity with detailed statistics and progress tracking. 
                  See how many tasks you've completed and stay motivated.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Call to Action */}
        {!isAuthenticated && (
          <Row className="mt-5">
            <Col className="text-center">
              <Card className="bg-light border">
                <Card.Body className="py-5">
                  <h2 className="mb-3 text-dark">Ready to Get Started?</h2>
                  <p className="lead mb-4 text-muted">
                    Join thousands of users who are already boosting their productivity with Task Manager.
                  </p>
                  <Button 
                    variant="dark" 
                    size="lg" 
                    onClick={() => navigate("/register")}
                    className="me-3"
                  >
                    📝 Create Free Account
                  </Button>
                  <Button 
                    variant="outline-dark" 
                    size="lg" 
                    onClick={() => navigate("/login")}
                  >
                    🔑 Sign In
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default HomePage;
