// server.js - Fixed version
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware - SIMPLIFIED
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve from current directory

// Test route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/area', (req, res) => {
    res.sendFile(path.join(__dirname, 'area.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Basic API test endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!', timestamp: new Date() });
});

// Basic auth endpoint
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Simple validation
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Simple response (no actual database)
        res.json({
            success: true,
            user: { id: 1, name, email },
            message: 'User created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Start server with error handling
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server started successfully on port ${PORT}`);
    console.log(`📍 Local: http://localhost:${PORT}`);
    console.log(`📍 Network: http://0.0.0.0:${PORT}`);
}).on('error', (err) => {
    console.error('❌ Failed to start server:', err.message);
    if (err.code === 'EADDRINUSE') {
        console.log('💡 Port 3000 is busy. Try:');
        console.log('   - Kill process on port 3000');
        console.log('   - Use different port: PORT=3001 npm start');
    }
});