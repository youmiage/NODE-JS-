const express = require('express');
const router = express.Router();
const { fetchProducts } = require('../controllers/dataController');

router.get('/', fetchProducts);

module.exports = router;
