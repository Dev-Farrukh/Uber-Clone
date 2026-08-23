# Uber Clone 🚗

A full-stack ride-booking application inspired by Uber. Users can request rides, view available vehicles, and follow ride progress on a live map. Riders can receive ride requests, manage trips, and update ride status in real time.

## Features ✨

- User and rider registration and authentication
- Users can search for pickup and destination locations
- Fare estimates for available vehicle types
- Ride request and confirmation flow
- Riders can view and accept available rides
- Live ride tracking with map integration
- Real-time ride updates powered by Socket.IO
- Ride status management from request through completion
- Protected routes for authenticated users and riders

## Technologies Used 🛠️

### Frontend 💻

- React.js
- Vite
- React Router
- Tailwind CSS
- Leaflet and React Leaflet
- Google Maps API integration
- Axios
- Socket.IO Client
- Framer Motion

### Backend ⚙️

- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.IO
- JSON Web Tokens
- bcryptjs
- Express Validator

## Project Structure 📁

```text
frontend/   React and Vite client application
backend/    Express API, database models, authentication, and sockets
```

## Installation and Setup 🚀

### Prerequisites 

- Node.js 18 or later
- MongoDB database
- A configured map/geocoding service where required by the frontend

### Clone the Repository 

```bash
git clone <repository-url>
cd Uber-Clone
```

### Install Dependencies 

Install the root, frontend, and backend dependencies:

```bash
npm install
cd frontend
npm install
cd ../backend
npm install
cd ..
```

### Configure the Backend 

Create `backend/.env` with the following values:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

Use a strong, private value for `JWT_SECRET`. Do not commit `.env` files or other secrets.

### Run the Backend 

```bash
cd backend
npm run dev
```

The API and Socket.IO server will start on the configured port.

### Run the Frontend 

Open a second terminal:

```bash
cd frontend
npm run dev
```

Open the local URL shown by Vite in your browser.

## Available Scripts 📜

### Frontend 💻

- `npm run dev` - Start the Vite development server
- `npm run build` - Create a production build
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build locally

### Backend ⚙️

- `npm run dev` - Start the backend with Nodemon

## API and Real-Time Communication 🔌

The backend provides authentication, user, rider, distance, and ride-related routes. Socket.IO is used to exchange live ride events between users and riders.

## Contact 📞

For questions or suggestions, open an issue in the project repository.
