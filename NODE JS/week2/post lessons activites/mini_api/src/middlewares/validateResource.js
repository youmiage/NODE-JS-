const validateResource = (req, res, next) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ message: "Les champs 'name' et 'description' sont obligatoires" });
  }
  next();
};

module.exports = validateResource;
