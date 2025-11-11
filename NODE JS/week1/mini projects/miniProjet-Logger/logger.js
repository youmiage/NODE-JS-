// logger.js - Module de journalisation
// had l'fichier howa li ghadi ykteb les logs

// kan-importiw EventEmitter bach n9dro nkhdem b les événements
const EventEmitter = require('events');
// kan-importiw fs (file system) bach nektbo f les fichiers
const fs = require('fs');

// kan-créiw class Logger li kat-hériter mn EventEmitter
class Logger extends EventEmitter {
    // constructor howa awel haja kat-t'exécuta f la classe
    constructor(filename = 'log.txt') {
        // kan-nadi super() bach n-initialisw EventEmitter
        super();
        // kan-stokiw smiya dyal l'fichier li ghadi nektbo fih
        this.filename = filename;
    }

    // méthode log() hiya li ghadi tekteb f l'fichier
    log(message) {
        // kan-jibo l'wa9t dyal daba b l'horodatage
        const timestamp = this.getTimestamp();
        // kan-formatiw le message m3a l'wa9t: [14:30:25] message
        const logMessage = `[${timestamp}] ${message}\n`;
        
        // kan-ektbo le message f l'fichier (appendFileSync kat-zid f lakher)
        fs.appendFileSync(this.filename, logMessage, 'utf8');
        
        // kan-émittiw événement bach n3erfou bli le message t'enregistra
        this.emit('messageLogged', logMessage);
    }

    // méthode getTimestamp() kat-reje3 l'wa9t dyal daba
    getTimestamp() {
        // kan-créiw objet Date jdid
        const now = new Date();
        // kan-jibo les heures o kan-formatiwhom b 2 chiffres (09 machi 9)
        const hours = String(now.getHours()).padStart(2, '0');
        // kan-jibo les minutes o nfes l7aja
        const minutes = String(now.getMinutes()).padStart(2, '0');
        // kan-jibo les secondes o nfes l7aja
        const seconds = String(now.getSeconds()).padStart(2, '0');
        // kan-reje3o f format HH:MM:SS
        return `${hours}:${minutes}:${seconds}`;
    }
}

// kan-exportiw la classe Logger bach nest3emloh f fichiers khorin
module.exports = Logger;