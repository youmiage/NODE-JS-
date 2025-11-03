const productsService = require('../services/productsService'); // kan3ayto l service li kayt3amel m3a produits
const sendJson = require('../utils/sendJson'); // fonction li kat3awnna nb3to les réponses f format JSON

async function listProducts(req, res) {
  const { query } = req; // kanakhdo les query params men request (b7al minPrice, maxPrice, category...)
  // Validation simple
  if (query.minPrice && query.maxPrice && parseFloat(query.minPrice) > parseFloat(query.maxPrice)) {
    // ila kan minPrice akbar men maxPrice, kandir erreur 400
    return sendJson(res, 400, { error: "Query invalide: minPrice ne peut pas être supérieur à maxPrice." });
  }
  try {
    const products = await productsService.getAllProducts(query); // kanjibo ga3 les produits b hasab les filtres
    sendJson(res, 200, products); // kanrj3o les produits b statut 200 (succès)
  } catch (error) {
    sendJson(res, 500, { error: error.message }); // ila wa9a chi erreur, kanrj3o message d’erreur b 500
  }
}

async function getProduct(req, res) {
  const { id } = req.params; // kanakhdo id dyal produit men l’URL
  try {
    const product = await productsService.getProductById(id); // kanjibo produit b id
    if (!product) {
      // ila ma l9ach chi produit b dak id
      return sendJson(res, 404, { error: "Produit non trouvé." });
    }
    sendJson(res, 200, product); // ila l9a produit, kanrj3o b 200
  } catch (error) {
    sendJson(res, 500, { error: error.message }); // erreur serveur ila wa9a chi mochkil
  }
}

async function getProductBySku(req, res) {
    const { sku } = req.params; // kanakhdo sku (référence unique dyal produit)
    try {
      const product = await productsService.getProductBySku(sku); // kanjibo produit b sku
      if (!product) {
        // ila ma l9ach chi produit b had sku
        return sendJson(res, 404, { error: "Produit non trouvé pour ce SKU." });
      }
      sendJson(res, 200, product); // kanrj3o produit ila l9a
    } catch (error) {
      sendJson(res, 500, { error: error.message }); // erreur serveur f cas dyal mochkil
    }
  }

module.exports = { listProducts, getProduct, getProductBySku }; // kan exportiw les fonctions باش nst3mlohom f routes okhra
