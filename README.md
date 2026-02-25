# 🌳 TreeViz – Interactive Data Structures & Algorithms Learning Platform

**Live Demo:** [[https://treeviz.onrender.com](https://treeviz.onrender.com)]

DSA Visualizer Suite is an interactive web application that helps students and developers understand data structures and algorithms through real-time visualizations of trees and graphs. 
Built with Node.js, Express.js, and MongoDB, it features step-by-step execution, auto-play mode, and secure user authentication for an engaging learning experience.

---

## 🖼️ Project Screenshots

Below are some screenshots of the TreeViz website:

![Screenshot_25-2-2026_7142_treeviz onrender com](https://github.com/user-attachments/assets/369db19d-4459-4bc5-9c5c-fa521371bb9c)

---

![Screenshot_25-2-2026_71514_treeviz onrender com](https://github.com/user-attachments/assets/2588020d-3402-4aab-884a-be79349ef795)

---

![Screenshot_25-2-2026_74146_localhost](https://github.com/user-attachments/assets/ca85f3e0-6424-455c-a05a-8d4a87ebeb89)

---


## ✨ Platform Features

* 🌲 Tree and graph visualizations
* ▶️ Step-by-step algorithm execution
* 🔐 User authentication
* 💾 Data persistence with MongoDB Atlas
* 🌐 Full-stack deployment on Render
* 🌲 Tree Visualizer (6 Tree Types)
```
Simple Tree (N-ary)

Binary Tree (with traversals)

Binary Search Tree (BST)

AVL Tree (with rotation visualization)

Max/Min Heap (heapify steps shown)

Trie (Prefix Tree)
```

* 📊 Graph Visualizer
```
DFS (Depth-First Search)

BFS (Breadth-First Search)
```
---

## 🧑‍💻 Tech Stack

* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Rendering:**	HTML5 Canvas, SVG
* **Backend Runtime:** Node.js + Express.js
* **Database:** MongoDB Atlas
* **ODM:** Mongoose
* **Authentication:**	bcryptjs
* **Deployment:** Render

---

## 📁 Project Structure

```
TreeViz/
├── backend/                      # Backend (Node.js + Express)
│   ├── node_modules/              # Backend dependencies
│   ├── server.js                   # Main server entry point
│   ├── package.json                # Backend dependencies & scripts
│   ├── .env                        # Environment variables (local only)
│   └── models/                     # Mongoose schemas
│       └── User.js                  # User model with authentication
│
├── index.html                   # Landing page
├── tree.html                     # Tree visualizer page
├── graph.html                    # Graph visualizer page
├── signup.html                   # User registration page
├── login.html                    # User login page
├── style.css                     # Main stylesheet
├── tree.css                       # Tree visualizer styles
├── graph.css                      # Graph visualizer styles
├── signup.css                     # Signup page styles
├── login.css                      # Login page styles
├── tree.js                        # Tree visualization logic
├── graph.js                       # Graph visualization logic
├── signup.js                      # Signup form handling
└── login.js                       # Login form handling
└── README.md                       # Project documentation

```

---


## ⚙️ Environment Variables

Create the following environment variables in the **Render Dashboard** (do not commit `.env` to GitHub):

```
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

> Render automatically assigns the `PORT`, so ensure your server uses:

```js
const PORT = process.env.PORT || 5000;
```

---

## 🛠️ Installation & Local Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Ashishkumar18m/TreeViz.git
cd TreeViz
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start the server:

```bash
npm start
```
---

You should see the following output in the terminal:

```text
============================================================
🚀 DSA VISUALIZER BACKEND STARTED!
📍 Port: 5000
🌐 URL: http://localhost:5000
🔗 Test: http://localhost:5000/api/test
============================================================
📋 AVAILABLE ENDPOINTS:
   📝 Signup: http://localhost:5000/api/signup (POST)
   🔐 Login: http://localhost:5000/api/login (POST)
   👤 User: http://localhost:5000/api/user (POST)
   ✅ Check Email: http://localhost:5000/api/check-email (POST)
   🔧 Debug: http://localhost:5000/api/debug/users (GET)
   💓 Health: http://localhost:5000/health (GET)
============================================================
📁 AVAILABLE PAGES:
   🏠 Home: http://localhost:5000/
   🌳 Tree Visualizer: http://localhost:5000/tree.html
   📊 Graph Visualizer: http://localhost:5000/graph.html
   📝 Sign Up: http://localhost:5000/signup.html
   🔑 Log In: http://localhost:5000/login.html
============================================================
💾 DATA SAVED TO MONGODB ATLAS:
   • users - User accounts
============================================================
✅ Connected to MongoDB Atlas!
📁 Database: dsa_visualizer
```

---

After this, open the following URL in your browser:

**🌐 URL: http://localhost:5000**

---

## ☁️ Deployment (Render)

* **Language:** Node
* **Branch:** main
* **Root Directory:** backend
* **Build Command:** npm install
* **Start Command:** node server.js or npm start

### MongoDB Atlas Configuration

* Network Access → Allow access from anywhere (`0.0.0.0/0`)

---

## 👨‍💻 Author

**Ashish Kumar**

TreeViz Project

---

Built with ❤️ for the coding community.

⭐ If you find this project helpful, consider giving it a star on GitHub!
