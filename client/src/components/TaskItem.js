import React from "react";
import { Card, Button, Badge } from "react-bootstrap";

const TaskItem = ({ task, onEdit, onDelete, onComplete, onStartTimer, onStopTimer }) => {
  // Timer functionality is handled in the backend

  const getStatusVariant = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "in-progress":
        return "info";
      case "completed":
        return "success";
      default:
        return "secondary";
    }
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center">
          {task.title}
          <Badge bg={getStatusVariant(task.status)} className="fs-6">
            {getStatusDisplay(task.status)}
          </Badge>
        </Card.Title>
        <Card.Text>{task.description || "No description provided"}</Card.Text>
        
        {/* Timer indicator */}
        {task.isTimerRunning && (
          <div className="d-flex align-items-center mb-3">
            <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <small className="text-primary fw-bold">Timer Running</small>
          </div>
        )}

        {task.dueDate && (
          <Card.Text className="text-muted">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </Card.Text>
        )}
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex gap-2">
            <Button variant="outline-primary" size="sm" onClick={onEdit}>
              ✏️ Edit
            </Button>
            {task.status !== 'completed' && (
              <Button 
                variant={task.isTimerRunning ? 'outline-danger' : 'outline-success'} 
                size="sm" 
                onClick={task.isTimerRunning ? onStopTimer : onStartTimer}
              >
                {task.isTimerRunning ? '⏹️ Stop' : '▶️ Start'}
              </Button>
            )}
            <Button 
              variant={task.status === 'completed' ? 'outline-warning' : 'outline-success'} 
              size="sm" 
              onClick={onComplete}
            >
              {task.status === 'completed' ? '↩️ Reopen' : '✅ Complete'}
            </Button>
          </div>
          <Button variant="outline-danger" size="sm" onClick={onDelete}>
            🗑️ Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskItem;
