const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // to serve images

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/products', require('./routes/products'));

const PORT = process.env.PORT || 5000;

connectDB()
.then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log(err));
