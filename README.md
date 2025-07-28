# A food ordering web application with separate user and admin panels. Built with React, Node.js, MongoDB, and Tailwind CSS.

✅ Features
🔒 User Authentication (Login/Register)

🛒 Place Orders (user)

📦 Track Order Status (user)

🧑‍💼 Admin Login

📋 Admin: View & Update Orders (status)

📦 Admin: Add/Edit/Delete Products

👥 Admin: View Users

📈 Real-time UI updates

✅ Tech Stack
Frontend: React + Tailwind CSS

Backend: Node.js + Express.js

Database: MongoDB + Mongoose

✅ How to Run
bash
Copy
Edit
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev

## 💻 UI Preview

![UI Preview](./assets/AdminDashboard.png)
![UI Preview](./assets/AdminMangeOrder.png)
![UI Preview](./assets/AdminManageProduct.png)
![UI Preview](./assets/AdminMangeUser.png)
![UI Preview](./assets/homePage1.png)
![UI Preview](./assets/homePage2.png)
![UI Preview](./assets/MyOrder.png)
![UI Preview](./assets/MyOrder.png)

# folder stucture Fronetend 
frontend/
│
├── components/
│   ├── Header.jsx
│   └── UserLayout.jsx
│
├── pages/
│   ├── CreateOrder.jsx
│   ├── HomePage.jsx
│   ├── Login.jsx
│   ├── Products.jsx
│   ├── Register.jsx
│   ├── trackOrder.jsx
│   ├── ViewOrder.jsx
│   │
│   └── admin/
│       ├── AdminDashboard.jsx
│       ├── AdminLogin.jsx
│       ├── AdminOrders.jsx
│       ├── AdminProducts.jsx
│       └── AdminUsers.jsx
│
├── sockets/
│   └── (socket related files)
│
└── utils/
    ├── apiPaths.js
    └── axiosInstance.js
# folder structure backend
    backend/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   └── index.js
│
├── logs/
├── .env
├── .gitignore
├── package.json
├── README.md
└── (other config files)

 # 🗂️ ER Diagram (Entities & Relationships)
 [User]
- _id (PK)
- name
- email (unique)
- password
- role (user/admin)
- createdAt

[Product]
- _id (PK)
- name
- description
- price
- imageUrl
- stock
- createdAt

[Order]
- _id (PK)
- userId (FK → User._id)
- status
- totalAmount
- createdAt

[OrderItem]
- _id (PK)
- orderId (FK → Order._id)
- productId (FK → Product._id)
- quantity
- price
# 📑 API Contracts
oute	Method	Request Body	Success Response Example	Error Response Example
/api/auth/register	POST	{ name, email, password }	{ "message": "User registered" }	{ "error": "Email already exists" }
/api/auth/login	POST	{ email, password }	{ "token": "...", "user": {...} }	{ "error": "Invalid credentials" }
/api/products	GET	-	[ { product fields... }, ... ]	{ "error": "Unauthorized" }
/api/products	POST	{ name, description, price, stock, ...}	{ "message": "Product added" }	{ "error": "Validation error" }
/api/orders	POST	{ items: [{productId, quantity}], ...}	{ "message": "Order placed" }	{ "error": "Invalid data" }
/api/orders	GET	-	[ { order fields... }, ... ]	{ "error": "Unauthorized" }
/api/orders/:id	GET	-	{ order fields... }	{ "error": "Order not found" }
/api/orders/:id	PATCH	{ status }	{ "message": "Order updated" }	{ "error": "Update failed" }
/api/users	GET	-	[ { user fields... }, ... ]	{ "error": "Unauthorized" }
Sample Success & Error Responses
Success:

or

Error:

Note:

# Protected routes require Authorization: Bearer <token> header.
# Response fields can be customized as per your implementation.

# full setup place holder 
 | 1. Clicks "Place Order" button
 v
Frontend (React)
 |
 | 2. Sends POST /api/orders with order data (items, user info, etc.)
 v
Backend (Express.js)
 |
 | 3. Auth middleware verifies JWT token
 v
Order Controller
 |
 | 4. Validates order data
 | 5. Creates Order document in MongoDB
 | 6. Creates OrderItem documents for each item
 v
MongoDB
 |
 | 7. Saves Order & OrderItems
 v
Order Controller
 |
 | 8. Returns success response to frontend
 v
Frontend
 |
 | 9. Shows confirmation to user
 Short Explanation:

User clicks "Place Order".
Frontend sends order data to backend API.
Backend verifies user (JWT).
Backend validates and saves order in DB.
Backend responds with success/failure.
Frontend shows result to user.

User -> Frontend: Click "Place Order"
Frontend -> Backend: POST /api/orders (order data)
Backend -> Backend: Verify JWT
Backend -> Backend: Validate & Save Order
Backend -> MongoDB: Insert Order, OrderItems
MongoDB --> Backend: Success/Fail
Backend --> Frontend: Response (success/error)
Frontend --> User: Show confirmation
