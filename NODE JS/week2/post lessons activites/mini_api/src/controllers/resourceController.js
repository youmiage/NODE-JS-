const service = require('../services/resourceService');
const AppError = require('../middlewares/AppError');

const getAll = (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const start = (page - 1) * limit;
    const end = start + Number(limit);
    const paginated = service.getAllResources().slice(start, end);
    res.json(paginated);
  } catch (err) {
    next(err); // envoi l'erreur au middleware central
  }
};

const getById = (req, res, next) => {
  try {
    const resource = service.getResourceById(Number(req.params.id));
    if (!resource) {
      return next(new AppError('Resource non trouvée', 404));
    }
    res.json(resource);
  } catch (err) {
    next(err);
  }
};

const create = (req, res, next) => {
  try {
    const newResource = service.createResource(req.body);
    res.status(201).json(newResource); // 201 = Created
  } catch (err) {
    next(err);
  }
};

const update = (req, res, next) => {
  try {
    const updated = service.updateResource(Number(req.params.id), req.body);
    if (!updated) {
      return next(new AppError('Resource non trouvée', 404));
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const remove = (req, res, next) => {
  try {
    const deleted = service.deleteResource(Number(req.params.id));
    if (!deleted) {
      return next(new AppError('Resource non trouvée', 404));
    }
    res.status(204).send(); // 204 = No Content
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, update, remove };

