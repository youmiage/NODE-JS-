// Importation dyal module 'fs' bach nkatbo fchi  fichier
const fs = require("fs");

// importation dyal classe EventEmitter dyal module events

const EventEmitter = require("events");

// definition dyal classe Logger kadir  heritage man  EventEmitter
class Logger extends EventEmitter {
  
  // Méthode log katakhod message comme paramètre
  log(message) {

    // kankatbou message fi lfichier 'log.txt'
    // appendFileSync katzid falakhar dyal fichier 
    fs.appendFileSync("log.txt", message + "\n");

    // Émet un événement personnalisé appelé 'messageLogged'
    // avec un objet contenant le message et la date actuelle
    this.emit("messageLogged", { 
      message: message, 
      date: new Date() 
    });
  }
}

// Exportation dyal la  classe bach nkhadmoha fi app.js
module.exports = Logger;
