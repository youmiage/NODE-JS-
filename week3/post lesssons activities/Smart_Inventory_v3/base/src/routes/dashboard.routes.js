const express = require('express');
const auth = require('../middlewares/taarif'); // ton middleware JWT
const authorize = require('../middlewares/authorize'); // ton middleware de rôle

const router = express.Router();

// 🧩 Route GET /api/dashboard
// Accessible seulement aux rôles admin et manager
router.get('/', auth, authorize('admin', 'manager'), (req, res) => {
  res.json({
    status: 'success',
    message: `Bienvenue ${req.user.role} sur le tableau de bord sécurisé.`,
    user: req.user,
  });
});

module.exports = router;
