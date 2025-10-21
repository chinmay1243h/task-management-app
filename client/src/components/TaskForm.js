import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

const TaskForm = ({ onSave, onCancel, existingTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
      setStatus(existingTask.status);
      setDueDate(existingTask.dueDate);
      setEstimatedTime(existingTask.estimatedTime || 0);
    }
  }, [existingTask]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = "Task title is required";
    } else if (title.trim().length < 3) {
      newErrors.title = "Task title must be at least 3 characters";
    }
    
    if (dueDate && new Date(dueDate) < new Date()) {
      newErrors.dueDate = "Due date cannot be in the past";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const newTask = {
        title: title.trim(),
        description: description.trim(),
        status,
        dueDate: dueDate || null,
        estimatedTime: parseInt(estimatedTime) || 0,
      };

      await onSave(newTask);
    } catch (error) {
      console.error("Error saving task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{existingTask ? "Edit Task" : "Add Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Task Title *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) {
                  setErrors({...errors, title: null});
                }
              }}
              isInvalid={!!errors.title}
            />
            {errors.title && (
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={dueDate}
              onChange={(e) => {
                setDueDate(e.target.value);
                if (errors.dueDate) {
                  setErrors({...errors, dueDate: null});
                }
              }}
              isInvalid={!!errors.dueDate}
            />
            {errors.dueDate && (
              <Form.Control.Feedback type="invalid">
                {errors.dueDate}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Estimated Time (minutes)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter estimated time in minutes"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
              min="0"
            />
            <Form.Text className="text-muted">
              Enter how long you think this task will take (e.g., 30 for 30 minutes)
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              <Spinner size="sm" className="me-2" />
              {existingTask ? "Updating..." : "Creating..."}
            </>
          ) : (
            existingTask ? "Update Task" : "Create Task"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskForm;
