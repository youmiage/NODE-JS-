const express = require('express');
const router = express.Router();
const controller = require('../controllers/resourceController');
const validateResource = require('../middlewares/validateResource');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validateResource, controller.create);
router.put('/:id', validateResource, controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
