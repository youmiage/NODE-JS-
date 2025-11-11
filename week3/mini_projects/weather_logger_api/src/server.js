// src/server.js
// server principal: middleware, routes, error handler
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(compression()); // compress responses
app.use(cors()); // basic CORS
app.use(helmet()); // headers security

// simple rate limit
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60000),
  max: Number(process.env.RATE_LIMIT_MAX || 100),
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// event logger
const logger = require('./utils/logger');

// mount routes
const obsRoutes = require('./routes/observations');
app.use('/api/observations', obsRoutes);

// export and health routes
const exportRoute = require('./routes/observations'); // export is inside same module via query param /api/export
app.get('/api/export', require('./controllers/observationsController').exportObservations);
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// error handler
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// simple request/response logging
app.use((req, res, next) => {
  const start = Date.now();
  logger.emit('request:received', { method: req.method, url: req.originalUrl, query: req.query });
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.emit('response:sent', { statusCode: res.statusCode, route: req.originalUrl, durationMs: duration });
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Weather Logger API running on http://localhost:${PORT}`);
});
