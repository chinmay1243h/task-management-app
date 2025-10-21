import React, { useState, useEffect } from "react";
import { Button, Row, Col, Container, Spinner, Alert } from "react-bootstrap";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import ToastNotification from "./Toast";
import { getTasks, addTask, updateTask, deleteTask } from "../services/taskService";

const TaskList = ({ filter = "all", sortBy = "newest", searchTerm = "" }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // ✅ Fetch Tasks from API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ Filter, sort, and search tasks
  useEffect(() => {
    let filtered = [...tasks];

    // Filter by status
    if (filter !== "all") {
      filtered = filtered.filter(task => 
        task.status === filter
      );
    }

    // Search by title
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort tasks
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "dueDate":
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredTasks(filtered);
  }, [tasks, filter, sortBy, searchTerm]);

  // ✅ Add or Edit Task
  const handleSaveTask = async (task) => {
    try {
      if (editingTask) {
        const updated = await updateTask(editingTask._id, task);
        setTasks(tasks.map((t) => (t._id === updated._id ? updated : t)));
      } else {
        const newTask = await addTask(task);
        setTasks([...tasks, newTask]);
      }
      setShowForm(false);
      setEditingTask(null);
      setToast({
        show: true,
        message: editingTask ? "Task updated successfully!" : "Task created successfully!",
        type: "success"
      });
    } catch (err) {
      console.error("Task save error:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to save task. Please try again.";
      setToast({
        show: true,
        message: errorMessage,
        type: "error"
      });
    }
  };

  // ✅ Delete Task
  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id);
        setTasks(tasks.filter((t) => t._id !== id));
        setToast({
          show: true,
          message: "Task deleted successfully!",
          type: "success"
        });
      } catch (err) {
        setToast({
          show: true,
          message: "Failed to delete task. Please try again.",
          type: "error"
        });
      }
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" /> <p>Loading tasks...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
        <Button onClick={fetchTasks}>Retry</Button>
      </div>
    );

  // Calculate task statistics
  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(task => task.status === 'pending').length,
    inProgress: tasks.filter(task => task.status === 'in-progress').length,
    completed: tasks.filter(task => task.status === 'completed').length,
    totalEstimatedTime: tasks.reduce((sum, task) => sum + (task.estimatedTime || 0), 0),
    totalActualTime: tasks.reduce((sum, task) => {
      if (task.isTimerRunning && task.timeStarted) {
        const now = new Date();
        const startTime = new Date(task.timeStarted);
        const elapsed = Math.floor((now - startTime) / 1000 / 60);
        return sum + (task.actualTime || 0) + elapsed;
      }
      return sum + (task.actualTime || 0);
    }, 0)
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3>Your Tasks</h3>
          <p className="text-muted mb-0">
            Showing {filteredTasks.length} of {tasks.length} tasks
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>
        <Button variant="dark" onClick={() => setShowForm(true)}>
          ➕ Add New Task
        </Button>
      </div>

      {/* Task Statistics */}
      <Row className="mb-4">
        <Col md={2}>
          <div className="card bg-light border">
            <div className="card-body text-center">
              <h5 className="card-title text-dark">Total Tasks</h5>
              <h3 className="mb-0 text-dark">{taskStats.total}</h3>
            </div>
          </div>
        </Col>
        <Col md={2}>
          <div className="card bg-light border">
            <div className="card-body text-center">
              <h5 className="card-title text-dark">Pending</h5>
              <h3 className="mb-0 text-dark">{taskStats.pending}</h3>
            </div>
          </div>
        </Col>
        <Col md={2}>
          <div className="card bg-light border">
            <div className="card-body text-center">
              <h5 className="card-title text-dark">In Progress</h5>
              <h3 className="mb-0 text-dark">{taskStats.inProgress}</h3>
            </div>
          </div>
        </Col>
        <Col md={2}>
          <div className="card bg-light border">
            <div className="card-body text-center">
              <h5 className="card-title text-dark">Completed</h5>
              <h3 className="mb-0 text-dark">{taskStats.completed}</h3>
            </div>
          </div>
        </Col>
        <Col md={2}>
          <div className="card bg-light border">
            <div className="card-body text-center">
              <h5 className="card-title text-dark">Estimated Time</h5>
              <h3 className="mb-0 text-dark">{taskStats.totalEstimatedTime}</h3>
            </div>
          </div>
        </Col>
        <Col md={2}>
          <div className="card bg-light border">
            <div className="card-body text-center">
              <h5 className="card-title text-dark">Actual Time</h5>
              <h3 className="mb-0 text-dark">{taskStats.totalActualTime}</h3>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        {filteredTasks.length === 0 ? (
          <Col>
            <div className="text-center py-5">
              <h4 className="text-muted">
                {searchTerm ? `No tasks found matching "${searchTerm}"` : 
                 tasks.length === 0 ? "No tasks available. Add your first one!" : 
                 "No tasks match the current filter"}
              </h4>
              {tasks.length === 0 && (
                <Button variant="dark" onClick={() => setShowForm(true)} className="mt-3">
                  ➕ Create Your First Task
                </Button>
              )}
            </div>
          </Col>
        ) : (
          filteredTasks.map((task) => (
            <Col key={task._id} md={4} sm={6} xs={12} className="mb-3">
              <TaskItem
                task={task}
                onEdit={() => {
                  setEditingTask(task);
                  setShowForm(true);
                }}
                onDelete={() => handleDeleteTask(task._id)}
                onComplete={async () => {
                  try {
                    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
                    const updatedTask = await updateTask(task._id, {
                      ...task,
                      status: newStatus
                    });
                    setTasks(tasks.map(t => t._id === task._id ? updatedTask : t));
                    
                    // Show success feedback
                    const statusText = newStatus === 'completed' ? 'completed' : 'reopened';
                    setToast({
                      show: true,
                      message: `Task ${statusText} successfully!`,
                      type: "success"
                    });
                  } catch (err) {
                    console.error("Status update error:", err);
                    setToast({
                      show: true,
                      message: "Failed to update task status. Please try again.",
                      type: "error"
                    });
                  }
                }}
                onStartTimer={async () => {
                  try {
                    const updatedTask = await updateTask(task._id, {
                      ...task,
                      isTimerRunning: true,
                      timeStarted: new Date(),
                      status: 'in-progress'
                    });
                    setTasks(tasks.map(t => t._id === task._id ? updatedTask : t));
                    setToast({
                      show: true,
                      message: "Timer started!",
                      type: "success"
                    });
                  } catch (err) {
                    console.error("Timer start error:", err);
                    setToast({
                      show: true,
                      message: "Failed to start timer. Please try again.",
                      type: "error"
                    });
                  }
                }}
                onStopTimer={async () => {
                  try {
                    const now = new Date();
                    const startTime = new Date(task.timeStarted);
                    const elapsedMinutes = Math.floor((now - startTime) / 1000 / 60);
                    const newActualTime = task.actualTime + elapsedMinutes;
                    
                    const updatedTask = await updateTask(task._id, {
                      ...task,
                      isTimerRunning: false,
                      timeStopped: now,
                      actualTime: newActualTime
                    });
                    setTasks(tasks.map(t => t._id === task._id ? updatedTask : t));
                    setToast({
                      show: true,
                      message: `Timer stopped! Added ${elapsedMinutes} minutes.`,
                      type: "success"
                    });
                  } catch (err) {
                    console.error("Timer stop error:", err);
                    setToast({
                      show: true,
                      message: "Failed to stop timer. Please try again.",
                      type: "error"
                    });
                  }
                }}
              />
            </Col>
          ))
        )}
      </Row>

      {showForm && (
        <TaskForm
          onSave={handleSaveTask}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
          existingTask={editingTask}
        />
      )}

      <ToastNotification
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ show: false, message: "", type: "success" })}
      />
    </Container>
  );
};

export default TaskList;
