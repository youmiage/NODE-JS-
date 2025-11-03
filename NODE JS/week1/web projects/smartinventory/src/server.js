const http = require('http');
const router = require('./router');
const logger = require('./utils/logger');

// hna kanchargiw le port mn les variables d’environnement (process.env)
// ila makanch, par défaut ghaykhdem 3la le port 3000
const PORT = process.env.PORT || 3000;

// hna kancréiw serveur HTTP
// kull requête katsirvaha hadi l callback li t7tat f createServer
const server = http.createServer((req, res) => {
    // mnin katsjib requête (request) men client
    // kanemitou un événement "request:received" bach logger yktbha f console
    logger.emit('request:received', { method: req.method, url: req.url });
    
    // hna kan3aytou l router bach howa y3ref chno ydir b had requête
    router(req, res);
});

// hna kandémarrou serveur w kankhallih ytsna l requêtes f port li 3tina
server.listen(PORT, () => {
    console.log(`Serveur démarré w kaytsna f http://localhost:${PORT}`);
});
