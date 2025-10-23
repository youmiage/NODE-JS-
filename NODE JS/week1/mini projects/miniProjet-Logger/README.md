{le projet réaliser par :
    =>Benzeroula Ossama
    =>Hanan Amakhmouj
    =>Abdelaaziz Khouda
    =>Youness Elkhatib 
}
📋 Description
Ce projet permet de :

Surveiller l'activité du système (mémoire, CPU, uptime)
Enregistrer automatiquement les données dans un fichier log
Utiliser le système événementiel de Node.js pour les alertes
Servir les logs via un serveur HTTP local

🗂️ Structure du projet : 
miniProjet-Logger/
│
├── logger.js          # Classe Logger (EventEmitter)
├── monitor.js         # Script de surveillance système
├── server.js          # Serveur HTTP
├── log.txt            # Fichier de logs (généré automatiquement)
└── README.md          # Documentation

📖 Utilisation
Étape 1 : Démarrer la surveillance
=>node monitor.js
Ce script va :

Collecter les statistiques système toutes les 5 secondes
Enregistrer les données dans log.txt
Afficher les alertes de mémoire faible (< 20%)
Dans un autre terminal :
=>node server.js


Consulter les logs
Ouvrez votre navigateur et accédez à :

Page d'accueil : http://localhost:3000/
Voir les logs : http://localhost:3000/logs
Stats JSON : http://localhost:3000/stats

🔧 Fonctionnalités
logger.js

Classe Logger héritant de EventEmitter
Méthode log(message) pour écrire dans le fichier
Événement messageLogged déclenché à chaque écriture
Horodatage automatique (HH:MM:SS)

monitor.js

Collecte des statistiques système :

Mémoire libre / totale
Pourcentage de mémoire libre
Uptime du système


Détection de mémoire faible (< 20%)
Événement lowMemory avec alerte console
🚀 Node System Logger - Surveillance démarrée
📊 Collecte des statistiques toutes les 5 secondes...

✅ Message enregistré: [09:55:19] Mémoire libre: 2.69 GB / 7.79 GB (34.52%) | Uptime: 41 min
✅ Message enregistré: [09:55:24] Mémoire libre: 2.79 GB / 7.79 GB (35.84%) | Uptime: 41 min
✅ Message enregistré: [09:55:29] Mémoire libre: 2.79 GB / 7.79 GB (35.80%) | Uptime: 41 min

server.js

Serveur HTTP sur le port 3000
Routes :

/ : Page d'accueil
/logs : Affichage du contenu de log.txt
/stats : Statistiques système en JSON 
🌐 Serveur HTTP démarré sur http://localhost:3000 
   📄 Logs disponibles sur: http://localhost:3000/logs

🎯 Critères d'évaluation couverts

✅ Fonctionnalité : Collecte, enregistrement et affichage des infos système
✅ Structure modulaire : Code séparé en 3 modules clairs
✅ Événements : Utilisation de messageLogged et lowMemory
✅ Fichiers : Lecture/écriture avec le module fs
✅ Serveur HTTP : Routes / et /logs fonctionnelles
✅ Clarté : Code commenté et README détaillé

🌟 Fonctionnalités bonus

✅ Route /stats avec JSON
✅ Horodatage lisible (HH:MM:SS)
✅ Événement lowMemory avec alerte
✅ Interface HTML élégante

🛑 Arrêter l'application
Utilisez Ctrl+C dans chaque terminal pour arrêter les scripts.
📝 Notes

Le fichier log.txt est créé automatiquement au premier démarrage
Les logs s'accumulent dans le fichier (pas de rotation automatique)
Le seuil de mémoire faible est fixé à 20%