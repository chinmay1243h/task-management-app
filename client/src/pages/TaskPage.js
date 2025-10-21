import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, InputGroup, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import AppNavbar from "../components/Navbar";

const TaskPage = () => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }
    setIsAuthenticated(true);
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <Spinner animation="border" variant="primary" />
        <span className="ms-2">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-vh-100 bg-light">
      <AppNavbar />
      
      <Container className="py-4">
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h1 className="fw-bold text-dark">📋 My Tasks</h1>
                <p className="text-muted">Manage and organize your tasks efficiently</p>
              </div>
            </div>

            {/* Search and Filter Controls */}
            <Row className="mb-4">
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text>🔍</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md={3}>
                <Form.Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Tasks</option>
                  <option value="pending">⏳ Pending</option>
                  <option value="in-progress">🔄 In Progress</option>
                  <option value="completed">✅ Completed</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">📅 Newest First</option>
                  <option value="oldest">📅 Oldest First</option>
                  <option value="dueDate">⏰ Due Date</option>
                  <option value="title">🔤 Title A-Z</option>
                </Form.Select>
              </Col>
            </Row>

            {/* Task Statistics */}
            <Row className="mb-4">
              <Col md={3}>
                <div className="card bg-primary text-white">
                  <div className="card-body text-center">
                    <h5 className="card-title">Total Tasks</h5>
                    <h3 className="mb-0">0</h3>
                  </div>
                </div>
              </Col>
              <Col md={3}>
                <div className="card bg-warning text-white">
                  <div className="card-body text-center">
                    <h5 className="card-title">Pending</h5>
                    <h3 className="mb-0">0</h3>
                  </div>
                </div>
              </Col>
              <Col md={3}>
                <div className="card bg-info text-white">
                  <div className="card-body text-center">
                    <h5 className="card-title">In Progress</h5>
                    <h3 className="mb-0">0</h3>
                  </div>
                </div>
              </Col>
              <Col md={3}>
                <div className="card bg-success text-white">
                  <div className="card-body text-center">
                    <h5 className="card-title">Completed</h5>
                    <h3 className="mb-0">0</h3>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Task List Component */}
        <TaskList 
          filter={filter}
          sortBy={sortBy}
          searchTerm={searchTerm}
        />
      </Container>
    </div>
  );
};

export default TaskPage;
