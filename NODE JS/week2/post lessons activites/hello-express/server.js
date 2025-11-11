
const express = require('express');
const path = require('path');
const { promises: fs } = require('fs'); 


const app = express();
const PORT = 3000;

// ==============================================
// 1️⃣ Servir des fichiers statiques (HTML, CSS, images...)
// ==============================================
// Tous les fichiers placés dans le dossier "public" seront servis automatiquement
// tels quels (sans modification)
app.use(express.static(path.join(__dirname, 'public')));

// ==============================================
// 2️⃣ Route racine /  →  envoie la page index.html
// ==============================================
app.get('/', (req, res) => {
  // Envoie du fichier HTML statique
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ==============================================
// 3️⃣ Route API asynchrone pour lire un fichier JSON
// ==============================================
// Ici, le serveur lit le contenu du fichier products.json
// puis renvoie le contenu en format JSON
app.get('/api/products', async (req, res) => {
  try {
    // Lecture du fichier (version asynchrone, non bloquante)
    const data = await fs.readFile(path.join(__dirname, 'data', 'products.json'), 'utf8');

    // Conversion du texte JSON en tableau JavaScript
    const products = JSON.parse(data);

    // Réponse en JSON envoyée au client
    res.json(products);
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier JSON :', error.message);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// ==============================================
// 4️⃣ Démarrage du serveur
// ==============================================
app.listen(PORT, () => {
  console.log(` Serveur en écoute sur http://localhost:${PORT}`);
});
