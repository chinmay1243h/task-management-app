import React, { useState, useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastNotification = ({ show, message, type = "success", onClose }) => {
  const [showToast, setShowToast] = useState(show);

  useEffect(() => {
    setShowToast(show);
    if (show) {
      const timer = setTimeout(() => {
        setShowToast(false);
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={showToast} onClose={() => {
        setShowToast(false);
        onClose();
      }}>
        <Toast.Header>
          <strong className="me-auto">
            {type === "success" ? "✅ Success" : "❌ Error"}
          </strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastNotification;

