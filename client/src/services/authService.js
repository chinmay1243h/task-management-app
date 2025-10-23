import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/users`;

// ✅ Register user
export const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  if (res.data.token) {
    localStorage.setItem("authToken", res.data.token);
  }
  return res.data;
};

// ✅ Login user
export const loginUser = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  if (res.data.token) {
    localStorage.setItem("authToken", res.data.token);
  }
  return res.data;
};

// ✅ Logout
export const logoutUser = () => {
  localStorage.removeItem("authToken");
};
