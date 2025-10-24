# 📰 Blogify — Full Stack Blog Application

A modern **Full Stack Blogging Platform** built with **React (Vite)** on the frontend and **Django REST Framework (DRF)** on the backend.  
It allows users to **register, login, create, edit, and delete blog posts**, manage profiles, and view other users’ blogs — all with **JWT authentication** and **React Query** for smooth API integration.

---

## 🚀 Features

### 👤 User Management
- User Registration and Login with JWT authentication  
- Update profile details and social links  
- View other users’ public profiles  

### ✍️ Blog Features
- Create, Read, Update, and Delete (CRUD) blog posts  
- Slug-based URLs for SEO-friendly blog pages  
- Pagination and detailed blog view  
- Author-specific blog filtering  

### 🎨 UI/UX
- Responsive design using **Tailwind CSS**  
- Dark/Light Mode toggle  
- Toast notifications for actions  
- Dynamic Navbar and Protected Routes  

---

## 🏗️ Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React (Vite) |
| **State Management** | React Query |
| **Routing** | React Router DOM |
| **UI** | Tailwind CSS + ShadCN UI Components |
| **Backend** | Django REST Framework |
| **Database** | SQLite (default Django DB) |
| **Auth** | JWT (access + refresh tokens) |
| **HTTP Client** | Axios |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/blogify.git
cd blogify
```

### 2️⃣ Backend Setup (Django)
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
Backend will start at 👉 **http://127.0.0.1:8001**

---

### 3️⃣ Frontend Setup (React)
```bash
cd ../Frontend
npm install
npm run dev
```
Frontend will start at 👉 **http://localhost:5173**

---

## 📡 API Endpoints (Examples)

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/register_user/` | Register a new user |
| POST | `/create_blog/` | Create a new blog post |
| GET | `/blog_list/` | List all blogs |
| GET | `/blogs/<slug>/` | Get blog details |
| PUT | `/update_blog/<id>/` | Update existing blog |
| DELETE | `/delete_blog/<id>/` | Delete blog |
| PUT | `/update_user_profile/` | Update user profile |
| GET | `/get_userinfo/<username>/` | Get user details |

---

## 🔒 Authentication Flow
- JWT tokens are stored in **localStorage**
- Access token auto-attached to requests via **Axios Interceptor**
- React Query handles caching, revalidation, and API calls

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

## 🧑‍💻 Developer

**👋 Shivam Chaurasiya**  
🎓 B.Tech (Information Technology), CSJMU Kanpur  
💻 Passionate about Full Stack Development, APIs, and Scalable Systems  
🌐 [Portfolio Coming Soon]

---

## ⭐ Support

If you like this project, don’t forget to **⭐ star** the repo and share it with fellow developers!
