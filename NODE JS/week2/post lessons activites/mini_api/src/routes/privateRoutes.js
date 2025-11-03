const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const timeLimiter = require('../middlewares/timeLimiter');

router.get('/', auth, timeLimiter, (req, res) => {
  res.json({ message: "Bienvenue dans la zone privée !" });
});

module.exports = router;
