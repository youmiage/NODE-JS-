// server.js - Serveur HTTP pour afficher les logs
// had l'fichier howa serveur li ghadi y-afficher les logs f navigateur

// kan-importiw module http bach n3emlo serveur web
const http = require('http');
// kan-importiw fs bach n9raw fichier log.txt
const fs = require('fs');
// kan-importiw os bach njibo stats dyal système
const os = require('os');

// numero dyal port li serveur ghadi yekdem 3lih
const PORT = 3000;

// kan-créiw serveur HTTP (koul requête kat-exécuti had la fonction)
const server = http.createServer((req, res) => {
    // route principale / (page d'accueil)
    if (req.url === '/') {
        // kan-siftou header bli status 200 (OK) o content howa HTML
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        // kan-siftou page HTML
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Node System Logger</title>
                <style>
                    /* kan-stylew body dyal page */
                    body {
                        font-family: Arial, sans-serif;
                        max-width: 800px;
                        margin: 50px auto;
                        padding: 20px;
                        background-color: #f5f5f5;
                    }
                    /* titre principal */
                    h1 {
                        color: #333;
                    }
                    /* div li fih les liens */
                    .links {
                        margin-top: 20px;
                    }
                    /* style dyal les liens */
                    a {
                        display: block;
                        margin: 10px 0;
                        padding: 10px;
                        background-color: #007bff;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                        text-align: center;
                    }
                    /* effet ila mchit 3la lien b souris */
                    a:hover {
                        background-color: #0056b3;
                    }
                </style>
            </head>
            <body>
                <h1>🖥️ Bienvenue sur le Node System Logger</h1>
                <p>Ce serveur permet de surveiller l'activité du système et de consulter les logs.</p>
                <div class="links">
                    <a href="/logs">📄 Voir les Logs</a>
                    <a href="/stats">📊 Statistiques Système (JSON)</a>
                </div>
            </body>
            </html>
        `);
    }
    
    // route /logs (bach nchofou les logs)
    else if (req.url === '/logs') {
        // kan-9raw fichier log.txt
        fs.readFile('log.txt', 'utf8', (err, data) => {
            // ila kan erreur (fichier ma9in walo)
            if (err) {
                // kan-siftou 404 (not found)
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Fichier log.txt introuvable. Assurez-vous que monitor.js est en cours d\'exécution.');
                return;
            }
            
            // ila l9ina l'fichier, kan-siftou 200 OK
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            // kan-afficherou contenu dyal l'fichier (ila khawi kan-siftou message)
            res.end(data || 'Aucun log disponible pour le moment.');
        });
    }
    
    // route /stats (stats f format JSON - bonus)
    else if (req.url === '/stats') {
        // kan-jibo mémoire libre
        const freeMem = os.freemem();
        // kan-jibo mémoire totale
        const totalMem = os.totalmem();
        // kan-jibo uptime
        const uptime = os.uptime();
        // kan-7esbo pourcentage
        const freeMemPercent = (freeMem / totalMem) * 100;

        // kan-créiw objet stats
        const stats = {
            // wa9t dyal daba f format ISO
            timestamp: new Date().toISOString(),
            // info 3la mémoire
            memory: {
                free: `${(freeMem / 1024 / 1024 / 1024).toFixed(2)} GB`,
                total: `${(totalMem / 1024 / 1024 / 1024).toFixed(2)} GB`,
                freePercent: `${freeMemPercent.toFixed(2)}%`
            },
            // info 3la uptime
            uptime: {
                seconds: uptime,
                minutes: Math.floor(uptime / 60),
                hours: (uptime / 3600).toFixed(2)
            },
            // système li khadam (Windows, Linux, etc.)
            platform: os.platform(),
            // smiya dyal machine
            hostname: os.hostname(),
            // ch7al mn CPU cores 3endek
            cpus: os.cpus().length
        };

        // kan-siftou JSON
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        // kan-convertiw stats l JSON o kan-formatiwhom mezyan
        res.end(JSON.stringify(stats, null, 2));
    }
    
    // route khra ma3erfinhach - 404
    else {
        // kan-siftou 404
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 - Page non trouvée');
    }
});

// kan-lancew serveur 3la port 3000
server.listen(PORT, () => {
    // messages f console bach n3erfou bli serveur bda
    console.log(`🌐 Serveur HTTP démarré sur http://localhost:${PORT}`);
    console.log(`   📄 Logs disponibles sur: http://localhost:${PORT}/logs`);
    console.log(`   📊 Stats JSON sur: http://localhost:${PORT}/stats`);
});