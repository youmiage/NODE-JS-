const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token !== "1234") {
    return res.status(403).json({
      error: "acces refuse",
      reason: "token invalide ou horaire interdit"
    });
  }

  next(); // token correct → passe au middleware suivant ou à la route
};

module.exports = auth;
