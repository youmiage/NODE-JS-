// src/routes/orders.routes.js
const express = require('express');
const ordersController = require('../controllers/orders.controller');
const auth = require('../middlewares/taarif'); // ajoute ceci pour protéger les routes
const router = express.Router();

// 🔹 Seules les personnes connectées peuvent créer des commandes
router.post('/', auth, ordersController.createOrder);

// 🔹 Les autres routes peuvent être accessibles à tous ou protégées selon ton besoin
router.get('/', auth, ordersController.listOrders);
router.get('/:id', auth, ordersController.getOrder);
router.put('/:id', auth, ordersController.updateOrder);
router.delete('/:id', auth, ordersController.deleteOrder);

module.exports = router;
