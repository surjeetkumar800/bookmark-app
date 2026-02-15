const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
const dotenv = require('dotenv');
const socketIo = require('socket.io');

dotenv.config();

// Models must be required before passport
require('./models/User');
require('./models/Bookmark');
require('./config/passport');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Trust proxy (Required for Render/Vercel cross-site cookies)
app.set('trust proxy', 1);

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
app.use(express.json());
app.use(cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY || 'secret_key'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax', // Allow cross-site in production
    secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
    httpOnly: true
}));
app.use((req, res, next) => {
    if (req.session && !req.session.regenerate) {
        req.session.regenerate = (cb) => {
            cb();
        };
    }
    if (req.session && !req.session.save) {
        req.session.save = (cb) => {
            cb();
        };
    }
    next();
});
app.use(passport.initialize());
app.use(passport.session());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Socket.io Setup
const server = require('http').createServer(app);
const io = socketIo(server, {
    cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('New client connected', socket.id);

    // Join a room based on userId for private updates if we wanted (optional)
    // socket.on('join', userId => socket.join(userId));

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Pass io to routes (middleware)
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Routes
require('./routes/authRoutes')(app);
require('./routes/bookmarkRoutes')(app);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.use(express.static(path.join(__dirname, '../client/dist')));

    // Express 5 wildcard fix: use /:any* or /(.*)/ or just match everything not handled
    app.get(/(.*)/, (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
    });
} else {
    // Basic Route for development
    app.get('/', (req, res) => {
        res.send('Server is running (Development Mode)');
    });
}

// Start Server
if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
