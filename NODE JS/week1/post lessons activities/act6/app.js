// importation dyal module http bach ndirou  serveur web
const http = require("http");

// importation dyal classe Logger li sabnaha 9bal fi  fichier logger.js
const Logger = require("./logger");

// andirou wahad objet man la classe Logger
const logger = new Logger();

// On écoute l'événement 'messageLogged' émis par le Logger
// kola mara had  message  enregistre had lbloc ghadi exécuté
logger.on("messageLogged", (data) => {
  console.log("Événement capturé :", data);
});

// creation dyal serveur HTTP
const server = http.createServer((req, res) => {

  // ki tji requête on écrit un log
  logger.log(`Requête reçue : ${req.url}`);

  // kansayftou réponse  lnavigateur
  res.end(" Requête enregistrée !");
});

// Démarrage dyal serveur fi port 4000
server.listen(4000, () => 
  console.log(" Serveur en cours d’exécution sur le port 4000...")
);
