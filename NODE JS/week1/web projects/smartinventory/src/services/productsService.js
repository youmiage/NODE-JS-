const fs = require('fs/promises'); // kanst3mlo module fs/promises bach nqraw fichiers b promises
const path = require('path'); // module path bach ndiro chemin dyal fichier b tariqa sahla

const dataPath = path.join(__dirname, '..', '..', 'data', 'products.json'); // chemin li fih fichier products.json

// Cache simple en mémoire pour éviter les lectures disque répétées
let productsCache = null; // variable cache bach ma nqrawch fichier kol mara ila deja m3mr

async function readProductsFile() {
  if (productsCache) {
    // ila deja 3mr cache, kanrj3o menha bla ma nqraw fichier 3awd tani
    return productsCache;
  }
  try {
    const data = await fs.readFile(dataPath, 'utf-8'); // kanqraw contenu dyal fichier products.json
    productsCache = JSON.parse(data); // kan7awlo l data men texte l JSON
    return productsCache; // kanrj3o liste dyal produits
  } catch (error) {
    // Si le fichier n'existe pas ou est corrompu, on lance une erreur
    console.error("Erreur de lecture ou de parsing du fichier products.json:", error); // kanprintiw erreur f console
    throw new Error("Impossible de charger les données des produits."); // kanrmiw erreur bach n3rfou kayn mochkil
  }
}

async function getAllProducts(query) {
  let products = await readProductsFile(); // kanjibo produits men fichier

  // Filtrage
  if (query.q) {
    // ila l'utilisateur 3tana mot clé (search), kanfiltriw smiya w description
    const searchTerm = query.q.toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) || 
      p.description.toLowerCase().includes(searchTerm)
    );
  }
  if (query.category) {
    // filtrage b catégorie
    products = products.filter(p => p.category.toLowerCase() === query.category.toLowerCase());
  }
  if (query.minPrice) {
    // filtrage b prix minimum
    products = products.filter(p => p.price >= parseFloat(query.minPrice));
  }
  if (query.maxPrice) {
    // filtrage b prix maximum
    products = products.filter(p => p.price <= parseFloat(query.maxPrice));
  }
  if (query.inStock) {
    // filtrage wach produit kayn f stock ola la
    const inStock = query.inStock === 'true';
    products = products.filter(p => p.inStock === inStock);
  }

  const total = products.length; // ch7al men produit b9a ba3d filtrage

  // Pagination
  const page = parseInt(query.page, 10) || 1; // numéro dyal page (ila ma kaynach, 1)
  const limit = parseInt(query.limit, 10) || 10; // ch7al men produit f kol page
  const startIndex = (page - 1) * limit; // index dyal lbdya
  const endIndex = page * limit; // index dyal l’akhir

  const paginatedProducts = products.slice(startIndex, endIndex); // kanqta3o produits bach ndir pagination

  return {
    total, // ch7al men produit kayna f total
    page, // numéro dyal page
    pages: Math.ceil(total / limit), // ch7al men page kaynin f total
    data: paginatedProducts, // les produits dyal had page
  };
}

async function getProductById(id) {
  const products = await readProductsFile(); // kanjibo ga3 les produits
  return products.find(p => p.id === parseInt(id, 10)); // kanqelbo 3la produit b id
}

async function getProductBySku(sku) {
  const products = await readProductsFile(); // kanjibo produits men fichier
  return products.find(p => p.sku === sku); // kanqelbo 3la produit b SKU (référence unique)
}

module.exports = { getAllProducts, getProductById, getProductBySku }; // kan exportiw les fonctions باش nst3mlohom f services okhra
