// rentalService.js
// had lfile fih lfonctions li kay3amlo gestion dyal llocations (location dyal tomobilates)


const fs = require('fs'); // module dyal Node.js bach nqraw/nktbou f les fichiers
const path = require('path'); // bach n3refou chemin dyal fichier
const { v4: uuidv4 } = require('uuid'); // bach ndir ID unique lkol location
const carService = require('./carService'); // kandkhlo service dyal voitures bach n9adro n3ayto lih
const RENTAL_PATH = path.join(__dirname, '../data/rentals.json'); // chemin dyal fichier li fih data dyal rentals


// ---- fonctions de base bach nqraw w nktbou f fichier JSON ----
function read() { return JSON.parse(fs.readFileSync(RENTAL_PATH, 'utf8')); } // katqra contenu dyal fichier w kat7awlo JSON
function write(data) { fs.writeFileSync(RENTAL_PATH, JSON.stringify(data, null, 2)); } // katconverti data l JSON w katkhdm write


// ---- fonction bach ndir conversion dyal date mn string ----
function parseDate(s) { return new Date(s + 'T00:00:00'); }

// ---- fonction katsift ch7al mn nhar bin deux dates ----
function daysBetween(from, to) {
  const f = parseDate(from);
  const t = parseDate(to);
  const diff = Math.ceil((t - f) / (1000*60*60*24)); // lfar9 binat'hom b nharat
  return Math.max(1, diff); // khass minimum nhar wa7ed
}

// ---- fonction katsift wach deux locations kayt9at3o f date ----
function overlaps(aFrom, aTo, bFrom, bTo) {
  // intervals [from, to) - ma kay7sebch nhar li kayrd ltomobile
  const aF = parseDate(aFrom);
  const aT = parseDate(aTo);
  const bF = parseDate(bFrom);
  const bT = parseDate(bTo);
  return aF < bT && bF < aT; // ila kayna intersection f les dates katrja3 true
}

// ---- fonction katsift kol les rentals (b filtres optionnels) ----
exports.getAll = (filters) => {
  let rentals = read(); // nqraw data mn fichier
  if (filters.status) rentals = rentals.filter(r => r.status === filters.status); // filter b status (active, returned...)
  if (filters.carId) rentals = rentals.filter(r => r.carId === filters.carId); // filter b carId
  // filtre b dates: ila 3tina from o to
  if (filters.from && filters.to) {
    rentals = rentals.filter(r => overlaps(r.from, r.to, filters.from, filters.to));
  }
  return rentals;
};

// ---- fonction katsift location b id ----
exports.getById = (id) => read().find(r => r.id === id);

// ---- fonction bach ndir location jdida ----
exports.create = (body) => {
  // validation: les champs li khasin ykounou 3andna
  if (!body.carId || !body.customer || !body.customer.name || !body.customer.email || !body.from || !body.to)
    throw Object.assign(new Error('Missing fields'), {status:400});

  // validation dyal dates
  const from = new Date(body.from);
  const to = new Date(body.to);
  if (isNaN(from) || isNaN(to) || from >= to)
    throw Object.assign(new Error('Invalid dates: from < to required'), {status:400});

  // nshouf wach voiture kayna o disponible
  const car = carService.getById(body.carId);
  if (!car) throw Object.assign(new Error('Car not found'), {status:404});
  if (!car.available) throw Object.assign(new Error('Car not available'), {status:409});

  // nshouf wach voiture deja mkriya f had la période
  const rentals = read();
  const conflict = rentals.some(r => 
    r.carId === body.carId && 
    r.status === 'active' && 
    overlaps(r.from, r.to, body.from, body.to)
  );
  if (conflict) throw Object.assign(new Error('Car already booked for these dates'), {status:409});

  // ---- calcul dyal prix ----
  const days = daysBetween(body.from, body.to);
  const total = Number((days * car.pricePerDay).toFixed(2));

  // ---- création dyal location jdida ----
  const newRental = {
    id: uuidv4(), // id unique
    carId: body.carId,
    customer: { name: body.customer.name, email: body.customer.email },
    from: body.from,
    to: body.to,
    days,
    dailyRate: car.pricePerDay,
    total,
    status: 'active', // location mazal active
    createdAt: new Date().toISOString()
  };

  rentals.push(newRental);
  write(rentals);
  // mlli tmchi voiture, kandirha non disponible
  carService.update(car.id, { available: false });
  return newRental;
};

// ---- fonction katrj3 location (mlli client yrdd ltomobile) ----
exports.returnRental = (id) => {
  const rentals = read();
  const idx = rentals.findIndex(r => r.id === id);
  if (idx === -1) throw Object.assign(new Error('Rental not found'), {status:404});
  const r = rentals[idx];
  if (r.status !== 'active') throw Object.assign(new Error('Rental not active'), {status:409});

  // kandirha returned
  r.status = 'returned';
  r.returnedAt = new Date().toISOString();
  rentals[idx] = r;
  write(rentals);

  // nrdjou voiture disponible 3awd tani
  carService.update(r.carId, { available: true });
  return r;
};

// ---- fonction kansakhso location (annulation) ----
exports.cancel = (id) => {
  const rentals = read();
  const idx = rentals.findIndex(r => r.id === id);
  if (idx === -1) throw Object.assign(new Error('Rental not found'), {status:404});
  const r = rentals[idx];
  if (r.status !== 'active') throw Object.assign(new Error('Only active rentals can be cancelled'), {status:409});

  // kansift status "cancelled"
  r.status = 'cancelled';
  r.cancelledAt = new Date().toISOString();
  rentals[idx] = r;
  write(rentals);

  // nrdjou voiture disponible 3awd tani
  carService.update(r.carId, { available: true });
};
