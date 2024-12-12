require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const ticketsRoutes = require('./routes/tickets');
const ticketPurchaseRoutes = require('./routes/ticketRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:5174', // Your frontend URL
  methods: ['GET', 'POST'], // Allow GET and POST
  credentials: true, // For cookies if needed in the future
}));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketsRoutes);
app.use('/api/ticketsPurchase', ticketPurchaseRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));