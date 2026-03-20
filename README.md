# LeaveFlow - Leave Management System
A full-stack web application where employees can apply for leave and employers can approve or reject requests.
## Live Demo
- Application: http://YOUR-EC2-IP
## Tech Stack
- Frontend: Vue.js 3, Tailwind CSS, Pinia, Vue Router, Axios
- Backend: Node.js, Express.js, JWT, bcryptjs
- Database: MongoDB Atlas
## Features
- Employee signup and login
- Apply for leave with type, dates and reason
- View leave status (Pending / Approved / Rejected)
- Employer signup and login
- View all employee leave requests
- Approve or reject leave requests
- JWT authentication
- Role-based access control
- Beautiful landing page
## Project Structure
```
leaveflow/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── leaveController.js
│   ├── middleware/authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Leave.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── leaveRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── api/index.js
    │   ├── components/
    │   ├── router/index.js
    │   ├── store/auth.js
    │   └── views/
    ├── index.html
    └── package.json
```
## Setup Instructions
### Prerequisites
- Node.js v18+
- MongoDB Atlas account
### 1. Clone the repository
```bash
git clone https://github.com/muggulameghana/leave-management-system.git
cd leave-management-system
```
### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the backend folder:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=any_long_random_secret_string_here
JWT_EXPIRE=7d
```
Start the backend:
```bash
npm run dev
```
### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
### 4. Open in browser
```
http://localhost:5173
```
## Environment Variables
| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Backend server port | 5000 |
| MONGO_URI | MongoDB Atlas connection string | your_mongodb_connection_string |
| JWT_SECRET | Secret key for JWT tokens | any_random_string |
| JWT_EXPIRE | JWT token expiry time | 7d |
## API Endpoints
### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /api/auth/signup | Register new user | Public |
| POST | /api/auth/login | Login user | Public |
### Leaves
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /api/leaves | Apply for leave | Employee |
| GET | /api/leaves | Get leaves | Both |
| PATCH | /api/leaves/:id/approve | Approve leave | Employer |
| PATCH | /api/leaves/:id/reject | Reject leave | Employer |
## Deployment on AWS EC2
### 1. Launch EC2 instance
- Go to AWS Console
- Launch t2.micro instance (free tier)
- Choose Ubuntu 22.04
- Allow ports 22, 5000, 5173 in security group
### 2. Connect to EC2
```bash
ssh -i your-key.pem ubuntu@YOUR-EC2-IP
```
### 3. Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```
### 4. Clone and run
```bash
git clone https://github.com/muggulameghana/leave-management-system.git
cd leave-management-system/backend
npm install
# Create .env file with your values
npm start
```
## Security
- Passwords hashed with bcrypt
- JWT tokens for authentication
- Environment variables for all secrets
- Role-based access control
- .env file excluded from repository