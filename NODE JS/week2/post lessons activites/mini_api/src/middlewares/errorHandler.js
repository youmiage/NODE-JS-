const errorHandler = (err, req, res, next) => {
  // si l’erreur est une instance de AppError → on utilise ses propriétés
  if (err instanceof require('./AppError')) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      code: err.statusCode,
      timestamp: err.timestamp
    });
  }

  // sinon erreur générique
  res.status(500).json({
    status: 'error',
    message: err.message || 'Erreur serveur',
    code: 500,
    timestamp: new Date().toISOString()
  });
};

module.exports = errorHandler;
