const { getInfo } = require('../services/infoService');

const infoController = (req, res) => {
  const info = getInfo();
  res.json(info);
};

module.exports = infoController;
