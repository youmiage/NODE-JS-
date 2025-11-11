// src/middlewares/errorHandler.js
// error handler b darija comments
module.exports = (err, req, res, next) => {
  // ila l'erreur ja m3aha status
  const status = err.status || 500;
  const payload = {
    status: 'error',
    message: err.message || 'Internal Error',
    code: status,
    timestamp: new Date().toISOString()
  };
  res.status(status).json(payload);
};
