require('dotenv').config();
const express = require('express');
const app = express();

const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const resourceRoutes = require('./routes/resourceRoutes');
const privateRoutes = require('./routes/privateRoutes');

const dataRoutes = require('./routes/dataRoutes');

app.use(express.json());
app.use(logger);

app.use('/api/resources', resourceRoutes);

app.use(errorHandler);
app.use('/api/private', privateRoutes);
app.use('/api/products', dataRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
