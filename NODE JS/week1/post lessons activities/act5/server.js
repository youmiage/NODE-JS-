// kanjibou module 'http' dyal  Node.js

const http = require("http");

// Création dyal serveur avec la méthode createServer()
// had fonction katakhod  fonction  (callback) avec deux paramètres :
// - req : représente la requête envoyée par le client (navigateur)
// - res : représente la réponse renvoyée par le serveur
const server = http.createServer((req, res) => {

    // ila utilisateur dkhal racine dyal site ("/")
    if (req.url === "/") {
        // kansayftou had message l navigateur
        res.write("Bienvenue sur notre serveur Node.js !");
        // kansaliw hna reponse
        res.end();

    // ila utilisateur dkhal  l’URL /api/etudiants
    } else if (req.url === "/api/etudiants") {
        // kansayftou  en-tête HTTP 200 (succès)
        
        res.writeHead(200, { "Content-Type": "application/json" });
        
        // kansayftou tableau d'étudiants sous forme de chaîne JSON
        res.end(JSON.stringify(["Asma", "Youness", "Oussama"]));

    // Pour toutes les autres URL (non définies)
    } else {
        // kansayftou code dyal erreur 404 (page non trouvée)
        res.writeHead(404);
        // ou  message dyal erreur
        res.end("Page non trouvée");
    }
});

// serveur khadam fi  port 3000
// Quand il démarre, un message s’affiche dans la console
server.listen(3000, () => console.log("Serveur en écoute sur le port 3000..."));
