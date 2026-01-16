# 📰 Blogify — Full Stack Blog Application

> A modern and fully functional blogging platform for creators.

### 🚀 Live Demo
🔗 **[https://myblogifyapp.netlify.app/](https://myblogifyapp.netlify.app/)**

---

## 🧭 Overview
**Blogify** is a **Full Stack Blogging Platform** built using **React (Vite)** and **Django REST Framework (DRF)**. It allows users to **create, edit, and share blogs**, manage their profiles, and explore other users’ content with a clean, responsive UI. The app features **JWT authentication**, **React Query caching**, and a seamless frontend-backend integration.

---

## ✨ Key Features

### 👤 User Management
- Secure **JWT Authentication** (login/register)
- Edit profile details and social links
- View and interact with other user profiles

### ✍️ Blogging Features
- Full **CRUD** (Create, Read, Update, Delete) functionality
- SEO-friendly **slug-based URLs** for blog posts
- **Pagination** for better navigation
- Filter blogs by author

### 🎨 UI/UX Experience
- Fully responsive design with **Tailwind CSS**
- **Dark/Light mode toggle**
- **Toast notifications** for actions
- Protected routes & dynamic navigation

---

## 🏗️ Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React (Vite) |
| **State Management** | React Query |
| **Routing** | React Router DOM |
| **UI Components** | Tailwind CSS + ShadCN UI |
| **Backend** | Django REST Framework |
| **Database** | SQLite (Default Django DB) |
| **Authentication** | JWT (Access + Refresh Tokens) |
| **HTTP Client** | Axios |

---

## ⚙️ Local Setup Guide

### 🔹 1. Clone Repository
```bash
git clone https://github.com/your-username/blogify.git
cd blogify
```

### 🔹 2. Backend Setup (Django)
```bash
cd Backend
python -m venv env
env\Scripts\activate  # (Windows)
# OR
source env/bin/activate  # (Mac/Linux)

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```


### 🔹 3. Frontend Setup (React)
```bash
cd ../Frontend
npm install
npm run dev
```


---

## 📡 API Endpoints (Examples)

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/register_user/` | Register a new user |
| POST | `/create_blog/` | Create a blog post |
| GET | `/blog_list/` | Get all blogs |
| GET | `/blogs/<slug>/` | Get a single blog post |
| PUT | `/update_blog/<id>/` | Update an existing blog |
| DELETE | `/delete_blog/<id>/` | Delete a blog post |
| PUT | `/update_user_profile/` | Update user profile |
| GET | `/get_userinfo/<username>/` | Get user details |

---

## 🔒 Authentication Workflow
- JWT tokens are stored securely in **localStorage**
- **Axios Interceptors** attach the access token automatically
- **React Query** manages data fetching, caching, and revalidation

---

## 🧠 Folder Structure
```
02_Blog App/
│
├── Backend/
│   ├── Blog_api/
│   ├── users/
│   ├── db.sqlite3
│   └── manage.py
│
└── Frontend/
    ├── src/
    │   ├── pages/
    │   ├── services/
    │   ├── ui_components/
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

---

## 👨‍💻 Developer
**👋 Shivam Chaurasiya**  
🎓 *B.Tech (Information Technology), CSJMU Kanpur*  
💻 Passionate about Full Stack Development, REST APIs, and Scalable Web Systems.  
🌐 **Live Project:** [https://myblogifyapp.netlify.app/](https://myblogifyapp.netlify.app/)

---

## ⭐ Support
If you like **Blogify**, don’t forget to **⭐ star** the repository and share it with your developer community!

---

> _"Write. Share. Inspire." — Blogify_
