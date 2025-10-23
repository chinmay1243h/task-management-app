import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/tasks`;

// ✅ Function to get the token from localStorage
const getAuthConfig = () => {
  const token = localStorage.getItem("authToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ✅ Get all tasks
export const getTasks = async () => {
  const config = getAuthConfig();
  const response = await axios.get(API_URL, config);
  return response.data;
};

// ✅ Add a new task
export const addTask = async (taskData) => {
  const config = getAuthConfig();
  const response = await axios.post(API_URL, taskData, config);
  return response.data;
};

// ✅ Update task (this was missing)
export const updateTask = async (taskId, updatedData) => {
  const config = getAuthConfig();
  const response = await axios.put(`${API_URL}/${taskId}`, updatedData, config);
  return response.data;
};

// ✅ Delete task
export const deleteTask = async (taskId) => {
  const config = getAuthConfig();
  const response = await axios.delete(`${API_URL}/${taskId}`, config);
  return response.data;
};
