# Tubeflix - Movie Discovery & Trailer Streaming

A modern, full-stack web application inspired by Netflix. It allows users to discover movies, watch YouTube trailers in a customized modal, manage their watchlist, and provides an admin panel for content management.

## Tech Stack
- **Frontend**: React (Vite), Zustand, React Router, Axios, Vanilla CSS (Netflix-inspired theme), Lucide React
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT Auth, bcryptjs
- **DevOps**: Docker, Docker Compose, GitHub Actions (CI/CD)

## Features
- **Authentication**: JWT-based secure signup and login.
- **Movie Catalog**: Beautiful interface to browse movies categorized by genre.
- **Trailer Streaming**: Integrated YouTube player within a cinematic modal.
- **Watchlist**: Users can add and remove movies from their personalized watchlist.
- **Admin Panel**: Role-based access to add or delete movies from the database.
- **Responsive Design**: Mobile-first, fluid layout with micro-animations.

---

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- Docker and Docker Compose (if running via Docker)
- MongoDB (if running locally without Docker)

### Option 1: Running with Docker (Recommended)
1. Clone the repository.
2. Run the following command from the root directory:
   ```bash
   docker-compose up --build -d
   ```
3. The application will be available at:
   - Frontend: http://localhost:80
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

### Option 2: Running Locally (Without Docker)

#### Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example` (or use the existing `.env`) with:
   - `PORT=5000`
   - `MONGO_URI=mongodb://localhost:27017/movie-streaming`
   - `JWT_SECRET=your_jwt_secret`
4. Start the backend server: `npm run dev` (if you added the dev script using nodemon) or `node server.js`.

#### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Access the app at `http://localhost:5173`

---

## API Documentation

### Base URL: `/api`

### Auth Routes
- `POST /auth/register`: Register a new user. (Body: `name`, `email`, `password`)
- `POST /auth/login`: Authenticate a user. (Body: `email`, `password`)
- `GET /auth/me`: Get current logged-in user. (Requires Auth Token)

### Movie Routes
- `GET /movies`: Get all movies. Optional query `?search=keyword`.
- `GET /movies/:id`: Get a single movie by ID.
- `POST /movies`: Add a new movie. (Admin Only) (Body: `title`, `genre`, `rating`, `description`, `thumbnail`, `trailerUrl`)
- `PUT /movies/:id`: Update a movie. (Admin Only)
- `DELETE /movies/:id`: Delete a movie. (Admin Only)

### Watchlist Routes
- `GET /watchlist`: Get the authenticated user's watchlist.
- `POST /watchlist/:movieId`: Add a movie to the watchlist.
- `DELETE /watchlist/:movieId`: Remove a movie from the watchlist.

---

## Deployment Guidelines (AWS / Render)

### Render Deployment
1. **Database**: Use MongoDB Atlas for a managed database. Update `MONGO_URI` in Render environment variables.
2. **Backend**: Connect your GitHub repo to a new Render Web Service.
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`
3. **Frontend**: Connect your GitHub repo to a new Render Static Site.
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Rewrite rules: Catch-all to `/index.html` for React Router.

### AWS Deployment
1. Use an EC2 instance or ECS.
2. Install Docker & Docker Compose.
3. Clone the repo and run `docker-compose up -d --build`.
4. Ensure security groups are configured to allow traffic on port 80 (Frontend).

## CI/CD
This project includes a GitHub Actions workflow `.github/workflows/main.yml` that automatically installs dependencies, builds the frontend, and runs basic backend tests on push/pull requests to the `main` branch.
