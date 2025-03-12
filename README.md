# Security-First Task Manager API

## Overview
A Highly Secure Task Manager API built using **Node.js, Express, Sequelize, and JWT authentication**. Users can register, log in, and manage their tasks securely.

## Features
- User authentication (Register & Login)
- Password Encryption
- Secure JWT-based authentication
- Create, read, update, and delete (CRUD) tasks
- Middleware for input validation and rate limiting
- Authirisation based access (Users can only modify their own tasks)

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (via Sequelize ORM)
- **Authentication:** JWT (JSON Web Tokens)
- **Middleware:** Express-validator, express-rate-limit, bcrypt

## Installation

### 1. Clone the Repository
```sh
git clone https://github.com/Ahmed-Sehili/Security-Focused-API.git
cd Security-Focused-API
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and set up the following:
```env
PORT=1234
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### 4. Start the Server
```sh
npm run dev
```

## API Routes

### **User Routes**
| Method | Endpoint       | Description |
|--------|---------------|-------------|
| POST   | `/register`    | Register a new user |
| POST   | `/login`       | Log in and receive a JWT token |

### **Task Routes**
| Method | Endpoint           | Description |
|--------|-------------------|-------------|
| GET    | `/tasks`           | Get all tasks of the authenticated user |
| POST   | `/tasks`           | Create a new task |
| PATCH  | `/tasks/:id`       | Update a task's completion status |
| DELETE | `/tasks/:id`       | Delete a task |

## Authentication
- The API uses **JWT tokens** for authentication.
- Tokens are stored in **cookies** (`httpOnly`, `sameSite: Strict`).
- Users must include their **JWT token** in the request headers or cookies to access protected routes.

## Security Measures
✅ **JWT Authentication** - Protects API routes.
✅ **User Authorization** - Users can only access and modify their own tasks.
✅ **Rate Limiting** - Prevents abuse of authentication routes.
✅ **Input Validation & Password Encryption** - Ensures data integrity.

## License
This project is open-source and available under the **MIT License**.

---
Made with ❤️ by Ahmed Sehili

