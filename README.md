# 🔖 Smart Marks (MERN Bookmark App)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Node](https://img.shields.io/badge/Node-18%2B-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwindcss&logoColor=white)

A **Premium**, **Real-time** bookmark manager built with the MERN stack. Organize your digital life with a stunning glassmorphism UI and instant synchronization across devices.

## ✨ Key Features

-   **🔐 Secure Authentication**: Seamless sign-in with Google OAuth 2.0 via Passport.js.
-   **⚡ Real-time Sync**: Bookmarks update instantly across all tabs and devices using **Socket.io**.
-   **🎨 Premium UI**: A modern interface featuring **Glassmorphism**, animated mesh gradients, and smooth micro-interactions.
-   **📱 Fully Responsive**: Optimized grid layout that looks perfect on mobile, tablet, and desktop.
-   **🔒 Privacy Focused**: User-specific data isolation ensuring your bookmarks remain private.

---

## 🛠️ Technology Stack

-   **Frontend**: React (Vite), Tailwind CSS, Framer Motion (Transitions), Socket.io Client
-   **Backend**: Node.js, Express.js, Passport.js, Socket.io
-   **Database**: MongoDB Atlas (Mongoose ODM)

---

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v14+)
-   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) Account
-   [Google Cloud Console](https://console.cloud.google.com/) Project (for OAuth)

### 1. clone the repository

```bash
git clone https://github.com/yourusername/smart-marks.git
cd smart-marks
```

### 2. Backend Setup

Navigate to the `server` directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
COOKIE_KEY=your_secret_cookie_key
CLIENT_URL=http://localhost:5173
```

### 3. Frontend Setup

Navigate to the `client` directory and install dependencies:

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000
```

### 4. Run the Application

Start the backend server:

```bash
# In server directory
npm start
```

Start the frontend development server:

```bash
# In client directory
npm run dev
```

Visit `http://localhost:5173` in your browser!

---

## 📁 Project Structure

```
mern-bookmark-app/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components (Dashboard, Login, etc.)
│   │   ├── context/        # React Context (Auth)
│   │   └── index.css       # Tailwind & Global Styles
│   └── ...
└── server/                 # Node.js Backend
    ├── config/             # Passport & DB Config
    ├── models/             # Mongoose Models (User, Bookmark)
    ├── routes/             # API Routes (Auth, Bookmarks)
    └── index.js            # Entry Point
```

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
