const timeLimiter = (req, res, next) => {
  const hour = new Date().getHours(); // heure locale
  if (hour >= 22 || hour < 6) { // entre 22h et 6h
    return res.status(403).json({
      error: "acces refuse",
      reason: "token invalide ou horaire interdit"
    });
  }
  next(); // horaire autorisé
};

module.exports = timeLimiter;
