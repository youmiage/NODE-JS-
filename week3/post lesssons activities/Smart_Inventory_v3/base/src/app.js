require('dotenv').config();
const express = require('express');
const productsRouter = require('./routes/products.routes');
const ordersRouter = require('./routes/orders.routes');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const authRouter = require('./routes/taarif.routes');
const dashboardRouter = require('./routes/dashboard.routes');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');




const app = express();
//Sécuriser les en-têtes HTTP
app.use(helmet());

//  Limiter les requêtes répétées
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // 100 requêtes max / 15 min / IP
  message: 'Trop de requêtes, réessayez plus tard (429).'
});
app.use(limiter);

//Configurer CORS
const allowedOrigins = [process.env.CORS_ORIGIN || 'http://localhost:5173'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));



app.use(express.json());
app.use(logger);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/auth', authRouter);
app.use('/api/dashboard', dashboardRouter);
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

app.use(errorHandler);
module.exports = app;
