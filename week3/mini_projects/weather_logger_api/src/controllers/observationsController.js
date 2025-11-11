// src/controllers/observationsController.js
// controllers dyal observations - comments b darija
const weatherService = require('../services/weatherService');

exports.list = (req, res, next) => {
  try {
    // query params kaymchiw l service
    const filters = req.query || {};
    const result = weatherService.getAll(filters);
    // response with pagination meta if present
    if (result.meta) {
      res.json({ data: result.data, meta: result.meta });
    } else {
      res.json(result);
    }
  } catch (err) {
    next(err);
  }
};

exports.getById = (req, res, next) => {
  try {
    const id = req.params.id;
    const obs = weatherService.getById(id);
    if (!obs) return res.status(404).json({ status: 'error', message: 'Not found', code: 404, timestamp: new Date().toISOString() });
    res.json(obs);
  } catch (err) {
    next(err);
  }
};

exports.exportObservations = (req, res, next) => {
  // handled in service as a separate endpoint /api/export
  const weatherService = require('../services/weatherService');
  weatherService.exportFiltered(req.query, res).catch(next);
};
