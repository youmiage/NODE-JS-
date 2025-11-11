
// envoie dyal reponse http bextension json a partir du server 
/**
 * Envoie une réponse JSON  a partir du server standardisée.
 * @param {http.ServerResponse} res - L'objet de réponse.
 * @param {number} statusCode - Le code de statut HTTP.
 * @param {object} data - L'objet de données à envoyer en JSON.
 */
function sendJson(res, statusCode, data) {
  // hna kan7ddo l type dyal contenu b JSON w charset UTF-8 bach maytla3ch chi mochkil f les caractères
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });

  // kan7awlo l objet "data" l JSON string w kanrslouha l client
  res.end(JSON.stringify(data));
}

// kan exportiw l fonction bach n9dro nst3mloha f blayass akhrin
module.exports = sendJson;
