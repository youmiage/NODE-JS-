// carService.js
// had lfile fih les fonctions li kayqraw w yktbou f fichier JSON (b7al base de données b simple fichier)
const fs = require('fs'); // module dyal Node.js bach nqraw w nktbou f les fichiers
const path = require('path'); // module bach n7ddu chemin (path) dyal fichier
const { v4: uuidv4 } = require('uuid'); // library bach ndir id unique lkol voiture

// chemin (path) dyal fichier li fih data dyal cars
const DATA_PATH = path.join(__dirname, '../data/cars.json');

// ---- fonction katqra contenu dyal fichier JSON ----
function read() {
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  // katqra contenu f format texte w kat7awlo JSON bach yb9a object js
}

// ---- fonction katkhedm bach tktb data jdida f fichier ----
function write(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  // katconverti data mn object → texte JSON w katkhdm write f fichier
}

// ---- fonction katsift cars kamlin m3a filtres (category, prix, etc.) ----
exports.getAll = (filters) => {
  let cars = read(); // nqraw data mn fichier

  // ----- Filtrage -----
  if (filters.category) cars = cars.filter(c => c.category === filters.category);
  if (filters.available) cars = cars.filter(c => String(c.available) === String(filters.available));
  if (filters.minPrice) cars = cars.filter(c => c.pricePerDay >= Number(filters.minPrice));
  if (filters.maxPrice) cars = cars.filter(c => c.pricePerDay <= Number(filters.maxPrice));
  if (filters.q) {
    // kan9albou 3la voiture b plate, brand, ola model
    const q = filters.q.toLowerCase();
    cars = cars.filter(c => c.plate.toLowerCase().includes(q) || `${c.brand} ${c.model}`.toLowerCase().includes(q));
  }

  // ----- TRI (order by) -----
  if (filters.sort) {
    const order = filters.order === 'desc' ? -1 : 1;
    cars.sort((a, b) => (a[filters.sort] > b[filters.sort] ? 1*order : -1*order));
  }

  // ----- PAGINATION (bch nkhdmo pages) -----
  const page = Number(filters.page) || 1; // page li bghina
  const limit = Number(filters.limit) || cars.length; // ch7al mn voiture f page
  const start = (page - 1) * limit; // index dyal louwla
  const end = start + limit; // index dyal lakhra

  return cars.slice(start, end); // nrdjou seulement les voitures dyal had la page
};

// ---- fonction katsift voiture b id ----
exports.getById = (id) => {
  const cars = read();
  return cars.find(c => c.id === id); // kat9lb 3la voiture li 3andha had id
};

// ---- fonction katsift voiture jdida ----
exports.create = (body) => {
  const cars = read();

  // validation dyal données
  const allowed = ['eco','sedan','suv','van']; // les catégories li m9bolin
  if (!body.brand || !body.model || !body.category || !body.plate || !body.pricePerDay)
    throw Object.assign(new Error('Missing fields'), {status:400}); // lma3loumat na9sa

  if (!allowed.includes(body.category))
    throw Object.assign(new Error('Invalid category'), {status:400}); // catégorie ghalta

  if (Number(body.pricePerDay) <= 0)
    throw Object.assign(new Error('pricePerDay must be > 0'), {status:400}); // prix khaso ykoun positif

  if (cars.some(c => c.plate === body.plate))
    throw Object.assign(new Error('plate must be unique'), {status:409}); // plate deja kayna

  // création dyal voiture jdida
  const newCar = {
    id: uuidv4(), // id unique
    brand: body.brand,
    model: body.model,
    category: body.category,
    plate: body.plate,
    pricePerDay: Number(body.pricePerDay),
    available: body.available === undefined ? true : Boolean(body.available)
  };

  cars.push(newCar); // kanzidouha f liste
  write(cars); // nktbouha f fichier
  return newCar;
};

// ---- fonction katsupprimé (update dyal voiture) ----
exports.update = (id, body) => {
  const cars = read();
  const idx = cars.findIndex(c => c.id === id);
  if (idx === -1) throw Object.assign(new Error('Car not found'), {status:404}); // makaynach had voiture

  // ntchkkou men uniqueness dyal plate
  if (body.plate && cars.some((c,i)=>c.plate===body.plate && i!==idx))
    throw Object.assign(new Error('plate must be unique'), {status:409});

  const updated = {...cars[idx], ...body}; // ndir merge bin l9dim w ljadid
  cars[idx] = updated;
  write(cars); // nktbou data jdida
  return updated;
};

// ---- fonction kat3mel delete ----
exports.remove = (id) => {
  const cars = read();
  const filtered = cars.filter(c => c.id !== id);

  if (cars.length === filtered.length)
    throw Object.assign(new Error('Car not found'), {status:404});

  write(filtered);
};

