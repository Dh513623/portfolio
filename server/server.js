const express = require('express');
const cors = require('cors');
const fs = require('fs');
const http = require('http');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/experience', require('./routes/experience'));
app.use('/api/achievements', require('./routes/achievements'));
app.use('/api/contacts', require('./routes/contacts'));

// Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date()
    });
});

const startServer = (preferredPort, attempt = 0) => {
    const candidatePorts = [preferredPort, 5001, 5002, 5003, 5004, 5005];
    const port = candidatePorts[attempt];
    const server = http.createServer(app);

    server.once('error', (error) => {
        if (error.code === 'EADDRINUSE' && attempt < candidatePorts.length - 1) {
            console.warn(`Port ${port} is busy. Trying ${candidatePorts[attempt + 1]} instead...`);
            startServer(preferredPort, attempt + 1);
            return;
        }

        console.error(`Unable to start server: ${error.message}`);
        process.exit(1);
    });

    server.once('listening', () => {
        const address = server.address();
        const actualPort = typeof address === 'object' ? address.port : port;
        const clientEnvPath = path.join(__dirname, '..', 'client', '.env.local');

        fs.writeFileSync(clientEnvPath, `VITE_API_PORT=${actualPort}\n`, { encoding: 'utf8' });
        console.log(`✅ Server running on http://localhost:${actualPort}`);
    });

    server.listen(port, '0.0.0.0');
};

startServer(Number(process.env.PORT) || 5000);