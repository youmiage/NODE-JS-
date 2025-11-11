const fs = require('fs/promises'); // kanst3mlo fs/promises bach nkhdmo b les fonctions dyal fichiers b promises
const path = require('path'); // module path bach n9dro nkhdmo b les chemins dyal fichiers

const dataPath = path.join(__dirname, '..', '..', 'data', 'orders.json'); // hna kan3ayno chemin dyal fichier orders.json
let ordersCache = null; // variable cache bach ma nqrawch fichier kol mara, ila deja 3amar

async function readOrdersFile() {
  if (ordersCache) {
    // ila deja 3mrna cache, kanrj3o menha bla ma nqraw fichier
    return ordersCache;
  }
  try {
    const data = await fs.readFile(dataPath, 'utf-8'); // kanqraw contenu dyal fichier orders.json
    ordersCache = JSON.parse(data); // kan7awlo l data men texte l JSON
    return ordersCache; // kanrj3o data
  } catch (error) {
    console.error("Erreur de lecture ou de parsing du fichier orders.json:", error); // kanprintiw erreur f console
    throw new Error("Impossible de charger les données des commandes."); // kanrmiw erreur bach n3rfou blli kayn mochkil
  }
}

async function getAllOrders(query) {
  let orders = await readOrdersFile(); // kanjibo data dyal commandes men fichier

  // Filtrage
  if (query.status) {
    // ila l'utilisateur 3tana status, kanfiltriw les commandes b dak status
    orders = orders.filter(o => o.status.toLowerCase() === query.status.toLowerCase());
  }
  if (query.from) {
    // ila 3tana date "from", kanjibo ghira commandes b date kbira menha
    orders = orders.filter(o => new Date(o.date) >= new Date(query.from));
  }
  if (query.to) {
    // ila 3tana date "to", kanjibo ghira commandes b date sghira menha
    orders = orders.filter(o => new Date(o.date) <= new Date(query.to));
  }

  const total = orders.length; // ch7al men commande b9at ba3d filtrage

  // Pagination
  const page = parseInt(query.page, 10) || 1; // num dyal page (ila ma kaynach, 1 par défaut)
  const limit = parseInt(query.limit, 10) || 10; // ch7al men commande f kol page
  const startIndex = (page - 1) * limit; // index dyal lbdya
  const endIndex = page * limit; // index dyal l’akhir

  const paginatedOrders = orders.slice(startIndex, endIndex); // kanqta3o array bach ndir pagination

  return {
    total, // ch7al men commande kayna f total
    page, // num dyal page
    pages: Math.ceil(total / limit), // ch7al men page kaynin f total
    data: paginatedOrders, // les commandes dyal had page
  };
}

async function getOrderById(id) {
  const orders = await readOrdersFile(); // kanjibo ga3 commandes
  return orders.find(o => o.id === parseInt(id, 10)); // kanqelbo 3la commande b id
}

async function getOrderByNumber(orderNumber) {
  const orders = await readOrdersFile(); // kanjibo data men fichier
  return orders.find(o => o.orderNumber === orderNumber); // kanqelbo 3la commande b numéro dyalha
}

module.exports = { getAllOrders, getOrderById, getOrderByNumber }; // kan exportiw les fonctions باش nst3mlohom f services okhra
