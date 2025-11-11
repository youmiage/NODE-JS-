const express = require('express');
const productsController = require('../controllers/products.controller');
const auth = require('../middlewares/taarif');
const authorize = require('../middlewares/authorize');
const router = express.Router();


router.get('/',auth , authorize, productsController.getProducts);
router.get('/:id',auth , authorize, productsController.getProduct);
router.post('/',auth, authorize('admin'), productsController.createProduct);
router.put('/:id',auth, authorize('admin'), productsController.updateProduct);
router.delete('/:id', auth, authorize('admin'), productsController.deleteProduct);
module.exports = router;