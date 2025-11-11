// monitor.js - Script de surveillance système
// had l'fichier howa li ghadi y9alleb 3la les infos dyal système

// kan-importiw module os (operating system) bach njibo info 3la système
const os = require('os');
// kan-importiw Logger li 3melnah f l'fichier lokher
const Logger = require('./logger');

// kan-créiw instance jdida mn Logger (objet mn classe Logger)
const logger = new Logger('log.txt');

// kan-écouter l'événement messageLogged (koul merra kat-t'enregistra message)
logger.on('messageLogged', (message) => {
    // kan-afficher f console message m3a ✅
    console.log('✅ Message enregistré:', message.trim());
});

// kan-écouter l'événement lowMemory (ila kan mémoire 9lila)
logger.on('lowMemory', (data) => {
    // kan-afficher alerte f console
    console.log('⚠️  ALERTE: MÉMOIRE FAIBLE!');
    // kan-afficher pourcentage dyal mémoire libre
    console.log(`   Mémoire libre: ${data.freeMemPercent.toFixed(2)}%`);
    // kan-afficherkem bqa mn mémoire (b GB)
    console.log(`   Mémoire disponible: ${(data.freeMem / 1024 / 1024 / 1024).toFixed(2)} GB`);
});

// fonction li kat-je3 les statistiques dyal système
function collectSystemStats() {
    // kan-jibo mémoire libre (b bytes)
    const freeMem = os.freemem();
    // kan-jibo mémoire totale (b bytes)
    const totalMem = os.totalmem();
    // kan-jibo uptime (ch7al mn wa9t système khadam)
    const uptime = os.uptime();
    // kan-7esbo pourcentage dyal mémoire libre
    const freeMemPercent = (freeMem / totalMem) * 100;

    // kan-formatiw les données bach tkoun 9raya mezyana
    const stats = {
        // mémoire libre convertie mn bytes l GB (÷ 1024 ÷ 1024 ÷ 1024)
        freeMem: (freeMem / 1024 / 1024 / 1024).toFixed(2),
        // mémoire totale b GB
        totalMem: (totalMem / 1024 / 1024 / 1024).toFixed(2),
        // uptime b minutes (÷ 60 7it kol 60 secondes = 1 minute)
        uptime: Math.floor(uptime / 60),
        // pourcentage m3a 2 chiffres mor virgule
        freeMemPercent: freeMemPercent.toFixed(2)
    };

    // kan-créiw message li ghadi nektboh f log
    const logMessage = `Mémoire libre: ${stats.freeMem} GB / ${stats.totalMem} GB (${stats.freeMemPercent}%) | Uptime: ${stats.uptime} min`;
    
    // kan-ektbo le message f log.txt
    logger.log(logMessage);

    // kan-checkiw wach mémoire 9lila (a9el mn 20%)
    if (freeMemPercent < 20) {
        // ila kan mémoire 9lila, kan-émittiw événement lowMemory
        logger.emit('lowMemory', {
            freeMem,
            totalMem,
            freeMemPercent
        });
    }

    // kan-reje3o stats ila bghina nest3emlohom
    return stats;
}

// message f console ila bdina l'programme
console.log('🚀 Node System Logger - Surveillance démarrée');
// kan-3lmo user bli ghadi nje3o stats kol 5 secondes
console.log('📊 Collecte des statistiques toutes les 5 secondes...\n');

// kan-je3o stats merra lo9dam fach ybda l'programme
collectSystemStats();

// setInterval kat-exécuti fonction kol 5000 milliseconds (5 secondes)
setInterval(() => {
    // kan-je3o stats kol 5 secondes
    collectSystemStats();
}, 5000);

// kan-exportiw logger o collectSystemStats bach nest3emlohom f fichiers khorin
module.exports = { logger, collectSystemStats };