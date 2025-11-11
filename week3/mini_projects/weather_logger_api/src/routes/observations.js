// src/routes/observations.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/observationsController');

// list with filters, sort, pagination
router.get('/', ctrl.list);

// get one
router.get('/:id', ctrl.getById);

module.exports = router;
