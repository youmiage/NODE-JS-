// src/services/weatherService.js
// Wahd service simple li kayread data mn data/observations.json w kaydir filters, sort, pagination
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const crypto = require('crypto');
const DATA_PATH = path.join(__dirname, '..', '..', 'data', 'observations.json');

function readAll() {
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  return JSON.parse(raw);
}

function toCelsius(v) { return Number(v); }
function toFahrenheit(c) { return Number((c * 9/5 + 32).toFixed(2)); }

// parse ISO date (yyyy-mm-dd)
function parseDate(s) {
  if (!s) return null;
  const d = new Date(s + 'T00:00:00');
  if (isNaN(d)) return null;
  return d;
}

// check overlaps helper - not used heavily here but provided
exports.getAll = (filters) => {
  let data = readAll();

  // filters: city, country, from, to, conditions (csv), minTemp, maxTemp, q
  if (filters.city) data = data.filter(d => d.city.toLowerCase() === String(filters.city).toLowerCase());
  if (filters.country) data = data.filter(d => d.country && d.country.toLowerCase() === String(filters.country).toLowerCase());

  if (filters.from && filters.to) {
    const f = parseDate(filters.from);
    const t = parseDate(filters.to);
    if (!f || !t || f >= t) throw Object.assign(new Error('Invalid date range'), { status: 400 });
    data = data.filter(d => {
      const ts = new Date(d.timestamp);
      return ts >= f && ts < t;
    });
  }

  if (filters.conditions) {
    const arr = String(filters.conditions).split(',').map(s => s.trim().toLowerCase());
    data = data.filter(d => arr.includes(String(d.condition).toLowerCase()));
  }

  if (filters.minTemp) data = data.filter(d => d.tempC >= Number(filters.minTemp));
  if (filters.maxTemp) data = data.filter(d => d.tempC <= Number(filters.maxTemp));

  if (filters.q) {
    const q = String(filters.q).toLowerCase();
    data = data.filter(d => (d.city + ' ' + (d.country||'')).toLowerCase().includes(q));
  }

  // sort
  if (filters.sort) {
    const order = filters.order === 'desc' ? -1 : 1;
    const key = filters.sort;
    data.sort((a,b) => (a[key] > b[key] ? 1*order : -1*order));
  }

  // units conversion
  const units = filters.units === 'imperial' ? 'imperial' : 'metric';
  const converted = data.map(d => {
    const copy = { ...d };
    if (units === 'imperial') {
      copy.tempF = toFahrenheit(copy.tempC);
    }
    return copy;
  });

  // pagination
  const page = Math.max(1, Number(filters.page) || 1);
  const limit = Math.min(200, Number(filters.limit) || 50);
  const total = converted.length;
  const pages = Math.ceil(total / limit);
  const start = (page -1) * limit;
  const pageData = converted.slice(start, start + limit);

  return { data: pageData, meta: { total, page, pages, limit } };
};

exports.getById = (id) => {
  const data = readAll();
  return data.find(d => d.id === id);
};

// exportFiltered: create gziped JSON and send as response (stream)
exports.exportFiltered = async (filters, res) => {
  const all = exports.getAll(filters);
  const json = JSON.stringify(all);
  // gzip
  const gzip = zlib.gzipSync(Buffer.from(json, 'utf8'));
  // optional HMAC signature
  const secret = process.env.HMAC_SECRET;
  if (secret) {
    const h = crypto.createHmac('sha256', secret).update(gzip).digest('hex');
    res.setHeader('X-Signature', h);
  }
  res.setHeader('Content-Type', 'application/gzip');
  res.setHeader('Content-Encoding', 'gzip');
  res.send(gzip);
};
