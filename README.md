# AuthFlow MERN RBAC

A full-stack authentication and authorization system built with MERN stack (MongoDB, Express.js, React, Node.js) featuring Role-Based Access Control (RBAC).

## Features

- 🔐 Secure JWT-based authentication
- 👥 Role-Based Access Control (RBAC)
- 🚀 MERN Stack implementation
- 📱 Responsive design
- 🔒 Password encryption
- ✨ Clean and maintainable codebase

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/AvishkaGihan/AuthFlow-MERN-RBAC.git
cd AuthFlow-MERN-RBAC
```

2. Install dependencies for both backend and frontend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Create a .env file in the backend directory with your configuration:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## Running the Application

1. Start the backend server:

```bash
cd backend
npm run dev
```

2. Start the frontend application:

```bash
cd frontend
npm start
```

## Project Structure

```
AuthFlow-MERN-RBAC/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
└── frontend/
    ├── src/
    ├── components/
    ├── pages/
    └── services/
```

## API Endpoints

- POST /api/auth/register - Register a new user
- POST /api/auth/login - User login
- GET /api/users - Get all users (Admin only)
- GET /api/profile - Get user profile

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
