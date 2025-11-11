const rentalService = require('../services/rentalService');
// kanjibo l service li fih l'opérations l logic dyal location (création, affichage, etc.)

// 🔹 afficher la liste dyal les locations b les filtres
exports.listRentals = (req, res, next) => {
  try {
    const filters = req.query; // les filtres li kayna f URL (status, from, to, carId)
    const list = rentalService.getAll(filters); // kanjibo liste selon les filtres
    res.json(list); // kanrjja3ha f format JSON
  } catch (err) { 
    next(err); // ila t3taha error, kanmchi l middleware dyal errors
  }
};

// 🔹 afficher wa7d location b ID
exports.getRental = (req, res, next) => {
  try {
    const r = rentalService.getById(req.params.id); // kanjibo location b id
    if (!r) 
      // ila ma lqahach, kayrjja3 message d’erreur 404
      return res.status(404).json({
        status: 'error',
        message: 'Rental not found',
        code: 404,
        timestamp: new Date().toISOString()
      });
    res.json(r); // ila l9aha, kanrjja3 l location
  } catch (err) { next(err); }
};

// 🔹 créer location jdida
exports.createRental = (req, res, next) => {
  try {
    const created = rentalService.create(req.body); // kanst3mlo les données li jayo f body
    res.status(201).json(created); // kanrjja3 status 201 (created)
  } catch (err) { next(err); }
};

// 🔹 retourner (terminer) location
exports.returnRental = (req, res, next) => {
  try {
    const returned = rentalService.returnRental(req.params.id); // kanmchi n3ayet 3la fonction returnRental
    res.json(returned); // kanrjja3ha f JSON
  } catch (err) { next(err); }
};

// 🔹 annuler location
exports.cancelRental = (req, res, next) => {
  try {
    rentalService.cancel(req.params.id); // kansaft l id bach ytal cancella
    res.status(204).end(); // 204 = ma kayrjja3 walo (success bla data)
  } catch (err) { next(err); }
};
