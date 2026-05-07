# 🚀 Tech Blog Website

A full-stack tech blog platform where developers, writers, and tech enthusiasts can share knowledge, ideas, and updates on various technology topics. The platform provides a smooth experience for both content creators and readers.

---

## 🌐 Live Demo

- Frontend: https://tech-blogs-somalia-re2b.vercel.ap 
- Backend: https://dazzling-spontaneity-production-04e3.up.railway.app/api/posts

---

## 📸 Screenshots

### 🏠 Home Page
![Home Page](./screenshots/home.png)

---

### 📝 Blogs List Page
Displays all published blogs with search and category filtering.

![Blogs List](./screenshots/blogs-list.png)

---

### 🧑‍💼 Dashboard
User dashboard for managing posts (Create, Update, Delete).

![Dashboard](./screenshots/dashboard.png)

---

### 🔐 User Management (Admin Panel)
Admin panel for managing users, roles, and account status.

![User Management](./screenshots/user-management.png)

---

### 🚫 Blocked Account View
Displayed when a user account is blocked by the admin.

![Blocked Account](./screenshots/block_Acount.png)

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Atlas)

---

## ✨ Features

- 🔐 JWT Authentication (Login / Signup)
- 🧑‍💼 Role-based Access (User / Admin)
- 📝 Full CRUD operations for blogs
- 🔍 Search & Filter system
- 📱 Fully responsive UI (Mobile + Desktop)
- 🔒 Secure authorization (users manage only their own posts)
- ⚙️ Admin dashboard for user control

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/cabdalle8180/TechBlogs-Somalia.git
cd TechBlogs-Somalia


### 2️⃣ Backend Setup
cd backend
npm install
npm start


### 3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

### 🔐 Environment Variables

mongodbUrl=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
cloudinary_cloud_name=YourCloudname
cloudinary_api_key=Cloud_API
cloudinary_api_secret=Cloud_API_Secret