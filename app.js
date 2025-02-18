const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Connect to database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));
app.use(cors());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/vote', require('./routes/vote'));
app.use('/api/election', require('./routes/election'));

// WebSocket connection
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('vote', (data) => {
        // Logic to handle vote
        io.emit('voteUpdate', { candidateId: data.candidateId });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`)); 