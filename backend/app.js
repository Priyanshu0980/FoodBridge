const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const donationRoutes = require('./routes/donationRoutes');

const app = express();

app.use(cors('http://localhost:5173', 'https://food-bridge-phi-one.vercel.app/'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'API is running perfectly' });
});

module.exports = app;