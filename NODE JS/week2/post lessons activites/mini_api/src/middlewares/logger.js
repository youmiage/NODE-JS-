// src/middlewares/logger.middleware.js
const morgan = require('morgan');

// Définir le format de log (par exemple: 'dev' ou un format personnalisé)
// 'dev' est simple w mzyan f phase de développement.
const logger = morgan('dev');

module.exports = logger;

// bDarija: Hadha howa l-middleware li kaysjjel koulchi (logger). 
// Kankhdmou b 'morgan' bach ybayan lina les requêtes li kayjiw, 
// b7al GET /api/info 200...