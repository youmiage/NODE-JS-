const sendJson = require('../utils/sendJson'); // kanjibu l fonction sendJson men dossier utils باش nba3to json l client
const serverStartTime = Date.now(); // hna kan7fdo waqt fach tbda server باش n3rfou ch7al 3ando kaykhdem

function getHealth(req, res) { // had l fonction kat3ti l etat dyal server
    const uptime = (Date.now() - serverStartTime) / 1000; // kan7seb ch7al men seconde dak server kaykhdem
    const healthStatus = {
        status: "ok", // katban blli server khdam mzyan
        uptime: `${uptime.toFixed(2)}s`, // ch7al 3ando kaykhdem, b sifra m9ad
        timestamp: new Date().toISOString() // waqt daba f format ISO
    };
    sendJson(res, 200, healthStatus); // kanrj3o l response b statut 200 w data f json
}

module.exports = { getHealth }; // kan exportiw l fonction باش n9dro nst3mloha f blassa okhra
