const { getProducts } = require('../services/dataService');
const AppError = require('../middlewares/AppError');

const fetchProducts = async (req, res, next) => {
  try {
    const filters = {
      category: req.query.category,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      sort: req.query.sort
    };

    const products = await getProducts(filters);
    res.json(products);

  } catch (err) {
    next(new AppError('Erreur lors de la lecture des données', 500));
  }
};

module.exports = { fetchProducts };
