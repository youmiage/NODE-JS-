// server.js
// bootstrap Express
const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();

const carsRouter = require('./routes/cars');
const rentalsRouter = require('./routes/rentals');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// body parser
app.use(express.json());

// custom logger middleware (prints: [ISO] METHOD URL -> STATUS in Xms)
app.use(logger);

// mount routers
app.use('/api/cars', carsRouter);
app.use('/api/rentals', rentalsRouter);

// health
app.get('src/health', (req, res) => {
  res.json({status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString()});
});

// static optional
app.use(express.static(path.join(__dirname, '..', 'public')));

// error handler (final middleware)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});