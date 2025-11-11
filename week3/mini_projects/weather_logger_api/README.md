Installer les dépendances :

npm install


Copier le fichier .env.example vers .env puis le modifier si nécessaire.

Lancer le serveur en mode développement :

npm run dev
# ou
npm start


Le serveur sera accessible à l’adresse :
👉 http://localhost:3000

🌤️ Endpoints (aperçu)

GET /api/observations — Liste toutes les observations météo (avec filtres, tri et pagination).
Paramètres de requête possibles :
city, from, to, conditions (séparés par des virgules), minTemp, maxTemp,
sort (champ), order (asc ou desc), page, limit, units (metric ou imperial), tz.

GET /api/observations/:id — Récupère une seule observation par son ID.

GET /api/export — Exporte les observations filtrées au format JSON compressé (.gz)
(avec signature HMAC optionnelle si la variable HMAC_SECRET est définie).

GET /health — Vérifie l’état de santé du serveur (simple “health check”).

# Filtrer par ville
http://localhost:3000/api/observations?city=Casablanca

# Filtrer par plage de dates
http://localhost:3000/api/observations?from=2025-11-01&to=2025-11-03

# Filtrer par température minimale et maximale
http://localhost:3000/api/observations?minTemp=19&maxTemp=25

# Filtrer par condition météo (pluie, soleil, nuages...)
http://localhost:3000/api/observations?conditions=clear

# Montre uniquement les jours où le ciel est dégagé.
http://localhost:3000/api/observations?conditions=clear,clouds,rain

# Recherche texte (q)
http://localhost:3000/api/observations?q=ma

# Pagination
http://localhost:3000/api/observations?page=1&limit=2


➡️ Retourne la première page avec 2 éléments.
Tu peux tester la page suivante avec :

http://localhost:3000/api/observations?page=2&limit=2

# Tri (sort / order)
http://localhost:3000/api/observations?sort=tempC&order=desc

# Trie les résultats par température du plus chaud au plus froid.
http://localhost:3000/api/observations?sort=humidity&order=asc

# Changer les unités
http://localhost:3000/api/observations?units=imperial
➡️ Retourne la température en Fahrenheit (°F) au lieu de Celsius (°C).

# Combinaison complète (multi-filtres)
http://localhost:3000/api/observations?city=Casablanca&from=2025-11-01&to=2025-11-05&minTemp=18&maxTemp=23&conditions=clear,clouds&sort=tempC&order=asc&page=1&limit=3


⚙️ Ce qui est inclus

Middlewares de base : cors, helmet, compression, express-rate-limit

Le fichier weatherService gère : les filtres, le tri, la pagination et la conversion d’unités (°C ↔ °F)

L’endpoint /api/export compresse les résultats en gzip et ajoute l’en-tête Content-Encoding: gzip

Un logger d’événements simple (basé sur EventEmitter) journalise :

les requêtes reçues (request:received)

et les réponses envoyées (response:sent)

Des données d’exemple se trouvent dans data/observations.json