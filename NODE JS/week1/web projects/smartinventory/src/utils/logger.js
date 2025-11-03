
// activite dyal server reponse request 
const EventEmitter = require('events'); // kanjibo module events bach nst3mlo système dyal les événements

class Logger extends EventEmitter {
  constructor() {
    super(); // kan3ayto l constructeur dyal EventEmitter bach nwrtho les fonctionnalités dyal events

    // Écouteur pour l'événement de réception d'une requête
    this.on('request:received', ({ method, url }) => {
      // hna mlli kaytji request, kanlogiw wa9t + method + url
      console.log(`[${new Date().toISOString()}] REQ  | ${method} ${url}`);
    });

    // Écouteur pour l'événement d'envoi d'une réponse
    this.on('response:sent', ({ statusCode, route, method, url }) => {
      // hna mlli kanrslou réponse, kanlogiw statut + method + url + route
      console.log(`[${new Date().toISOString()}] RESP | ${statusCode} - ${method} ${url} -> ${route}`);
    });
  }
}

// Exporter une seule instance (singleton) du logger
module.exports = new Logger(); // kan exportiw instance wa7da mn Logger bach nst3mloha f ga3 l'app
