const ordersService = require('../services/ordersService'); // kan3ayto l service li kayt3amel m3a les commandes
const sendJson = require('../utils/sendJson'); // fonction li kat3awnna nsendiw json f response

async function listOrders(req, res) {
    const { query } = req; // kanakhdo query params men request (par ex: from, to, etc.)
    // Validation des dates
    if (query.from && query.to && new Date(query.from) > new Date(query.to)) {
        // ila kanet date "from" kbira men "to", kandir error 400
        return sendJson(res, 400, { error: "Query invalide: la date 'from' ne peut pas être postérieure à la date 'to'." });
    }
  try {
    const orders = await ordersService.getAllOrders(query); // kanjibo toutes les commandes b hasab les filtres li f query
    sendJson(res, 200, orders); // kanrj3o resultat b statut 200
  } catch (error) {
    sendJson(res, 500, { error: error.message }); // ila wa9a chi error, kanrj3o message d’erreur b 500
  }
}

async function getOrder(req, res) {
  const { id } = req.params; // kanakhdo id men paramètre dyal URL
  try {
    const order = await ordersService.getOrderById(id); // kanjibo commande b id
    if (!order) {
      // ila ma l9ach chi commande b dak id
      return sendJson(res, 404, { error: "Commande non trouvée." });
    }
    sendJson(res, 200, order); // ila l9aha, kanrj3o commande b 200
  } catch (error) {
    sendJson(res, 500, { error: error.message }); // ila wa9a chi mochkil, kanrj3o erreur serveur
  }
}

async function getOrderByNumber(req, res) {
    const { orderNumber } = req.params; // kanakhdo numéro dyal commande men paramètre
    try {
      const order = await ordersService.getOrderByNumber(orderNumber); // kanjibo commande b numéro
      if (!order) {
        // ila ma l9ach chi commande b had numéro
        return sendJson(res, 404, { error: "Commande non trouvée pour ce numéro." });
      }
      sendJson(res, 200, order); // kanrj3o commande ila l9aha
    } catch (error) {
      sendJson(res, 500, { error: error.message }); // erreur serveur ila wa9a chi problème
    }
  }

module.exports = { listOrders, getOrder, getOrderByNumber }; // kan exportiw les fonctions باش nst3mlohom f routes okhra
