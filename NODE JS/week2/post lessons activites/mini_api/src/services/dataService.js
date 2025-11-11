const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '../data/products.json');

const getProducts = async (filters = {}) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    let products = JSON.parse(data);

    // Filtrage dynamique
    if (filters.category) {
      products = products.filter(p => p.category === filters.category);
    }
    if (filters.minPrice) {
      products = products.filter(p => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      products = products.filter(p => p.price <= Number(filters.maxPrice));
    }

    // Tri
    if (filters.sort) {
      products.sort((a, b) => {
        if (filters.sort === 'asc') return a.price - b.price;
        else return b.price - a.price;
      });
    }

    console.log(`Filtrage: ${JSON.stringify(filters)}, résultats: ${products.length}`);
    return products;

  } catch (err) {
    throw err;
  }
};

module.exports = { getProducts };
