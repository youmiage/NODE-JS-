require('dotenv').config();
const app = require('./app');
const { connectToDatabase } = require('./config/database');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/smart_inventory_db';


async function start() {
  try {
    // 1. Connexion à MongoDB
    await connectToDatabase(MONGO_URI);

    // 2. Lancer le serveur HTTP seulement après la connexion
    app.listen(PORT, () => {
      console.log(`Smart Inventory API démarrée sur http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Échec du démarrage de l’application :', err.message);
    process.exit(1);
  }
}

start();