# Task Management System

## Project Overview
The **Task Management System** is a full-stack web application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It allows users to efficiently manage, organize, and track their daily tasks in a secure and user-friendly environment. This application replaces traditional task tracking methods such as notebooks or spreadsheets with a modern digital solution, offering real-time updates, authentication, and cloud-based access.

---

## Features
- **User Registration & Login:** Secure authentication using **JWT** and **bcrypt**.  
- **Task Management:** Create, edit, delete, and mark tasks as completed.  
- **Task Categorization:** Filter tasks by status (Pending, In Progress, Completed).  
- **Search Functionality:** Search tasks by title or description keywords.  
- **Responsive Design:** Works seamlessly on desktops, tablets, and mobile devices.  
- **Real-Time Updates:** Changes to tasks are reflected instantly.  
- **Cloud Deployment:** Backend hosted on **Render**, frontend hosted on **Vercel**.  

---

## Technologies Used

**Frontend:**  
- React.js  
- HTML5 & CSS3  
- Bootstrap / Tailwind CSS (optional)  

**Backend:**  
- Node.js  
- Express.js  

**Database:**  
- MongoDB Atlas (NoSQL)  

**Authentication & Security:**  
- JWT (JSON Web Token)  
- bcrypt  

**Development Tools:**  
- VS Code  
- Postman  
- Git & GitHub  

**Deployment Platforms:**  
- Render (Backend)  
- Vercel (Frontend)  

---

## System Requirements

**Hardware:**  
- Processor: Intel Core i3 or higher  
- RAM: 4GB minimum (8GB recommended)  
- Storage: 100GB free space  
- Display: 1366×768 resolution or higher  

**Software:**  
- OS: Windows 10 / macOS / Linux  
- Browser: Chrome / Firefox / Edge (latest versions)  
- Node.js (v16 or higher)  
- MongoDB Atlas account  

---

## Installation & Setup

1. **Clone the repository:**  
```bash
git clone https://github.com/yourusername/task-management-system.git
cd task-management-system
Backend Setup:

cd backend
npm install


Create a .env file and add the following:

MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000


Run the backend server:

npm run dev


Frontend Setup:

cd frontend
npm install
npm start


The frontend runs on http://localhost:3000 and connects to the backend API.**
