require("dotenv").config();

const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require("./middleware/errorHandler");

connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/edumy', require('./routes/edumyRoutes'));

// ErrorHandler
app.use(errorHandler);

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))