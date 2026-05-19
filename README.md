# Intern Kovai App

A production-ready MERN-style task management application with AI-assisted architecture and authentication.

The app uses a React + Vite frontend with Firebase Google Authentication, and a Node.js + Express backend with MongoDB Atlas and Firebase Admin SDK.

---

## Project Overview

Intern Kovai is a task management dashboard designed for modern workflows. It supports secure user authentication, protected task APIs, responsive layouts, task filtering, optimistic UI updates, and clean module separation across frontend and backend.

---

## Features

- Google sign-in with Firebase Authentication
- Persistent authentication state using Firebase SDK and Zustand
- Protected React routes for authenticated users only
- Create, list, and update task status
- Task filtering by status
- Responsive task grid and mobile-first UI
- Reusable form, card, dropdown, and skeleton components
- Optimistic client updates for fast interactions
- Centralized backend validation and error handling
- MongoDB Atlas storage via Mongoose
- Firebase Admin token verification middleware

---

## Tech Stack

- Frontend
  - React
  - Vite
  - Tailwind CSS
  - Zustand
  - Firebase SDK
  - Axios
  - React Router DOM
  - react-hot-toast

- Backend
  - Node.js
  - Express
  - MongoDB Atlas
  - Mongoose
  - Firebase Admin SDK
  - express-validator
  - dotenv
  - morgan

---

## Architecture Decisions

- Monorepo workspace for frontend and backend packages
- Frontend uses feature-driven component organization
- Global Zustand store for auth and task state
- Axios interceptor for authenticated API requests
- Custom hooks for reusable task and auth logic
- Backend separates controllers, services, routes, middleware, and validation
- Firebase Admin middleware handles token verification and user provisioning
- Central error handler enforces consistent API responses
- Environment-driven configuration for security and portability

---

## Folder Structure

```text
intern-kovai-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validations/
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── store/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env.example
├── package.json
└── README.md
```

---

## Firebase Setup

1. Create or open a Firebase project in the Firebase Console.
2. Enable Authentication and add Google Sign-In as a provider.
3. Copy the Firebase web config values:
   - `apiKey`
   - `authDomain`
   - `projectId`
4. Generate a Firebase service account key for backend use.
5. Add the service account values to `backend/.env`.
6. Make sure the private key value preserves newlines and is wrapped in quotes.

---

## MongoDB Atlas Setup

1. Create a MongoDB Atlas cluster.
2. Create a database user with read/write permissions.
3. Create a cluster connection string.
4. Set the connection string as `MONGO_URI` in `backend/.env`.
5. Ensure the database user and IP access settings allow your backend to connect.

---

## Environment Variables

### Frontend (`frontend/.env`)

```env
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_API_BASE_URL=http://localhost:5000/api
```

### Backend (`backend/.env`)

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.example.mongodb.net/<dbname>?retryWrites=true&w=majority
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

---

## Installation Steps

1. Clone the repository:

```bash
git clone <repo-url>
cd intern-kovai-app
```

2. Install dependencies from the root:

```bash
npm install
```

3. Copy environment examples:

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

4. Fill in the required Firebase and MongoDB values.

---

## Running Locally

### Start both frontend and backend

```bash
npm run dev
```

### Run frontend only

```bash
npm --workspace frontend run dev
```

### Run backend only

```bash
npm --workspace backend run dev
```

### Build frontend for production

```bash
npm run build:frontend
```

### Start backend in production mode

```bash
npm run start
```

---

## Deployment Guide

1. Build the frontend:

```bash
npm run build:frontend
```

2. Deploy the generated `frontend/dist` folder to a static host such as Vercel, Netlify, or S3.
3. Deploy the backend to a Node.js host such as Render, Railway, Heroku, or a VPS.
4. Configure the backend environment variables in your hosting dashboard.
5. Point frontend `VITE_API_BASE_URL` to the deployed backend API URL.
6. Verify Firebase and MongoDB settings in production.

---

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/tasks` | List authenticated user tasks |
| POST | `/api/tasks` | Create a new task for the authenticated user |
| PATCH | `/api/tasks/:id` | Update task status for the authenticated user |
| GET | `/api/auth/verify` | Verify Firebase token and return user info |
| GET | `/api/users/me` | Return current user profile and auto-create user record |

All task endpoints require a Firebase ID token in the `Authorization: Bearer <token>` header.

---

## Assumptions

- Users sign in via Firebase Google Authentication.
- Task operations are scoped to the authenticated user.
- MongoDB Atlas is used as the primary data store.
- The backend verifies Firebase tokens with Firebase Admin SDK.
- The frontend and backend are run as a monorepo workspace.

---

## Known Limitations

- No task deletion endpoint is implemented.
- No team or multi-user collaboration support.
- No server-side pagination or full-text search.
- Frontend routing and UI are focused on a single dashboard experience.
- The backend does not serve static frontend assets directly.

---

## AI Usage Summary

This project was built with AI-assisted implementation guidance for both architecture and code generation. The AI helped structure reusable modules, generate backend validation middleware, add Firebase auth flows, and create a responsive task management user interface.

---

## Future Improvements

- Add task deletion and edit functionality
- Add due dates, reminders, and priorities
- Add team collaboration and user roles
- Add pagination, search, and sorting
- Serve frontend assets from the backend or a CDN
- Add unit and integration tests
- Add deployment scripts or Docker support

---

## Notes

Use the provided `.env.example` files as a starting point, and keep secrets out of source control.
