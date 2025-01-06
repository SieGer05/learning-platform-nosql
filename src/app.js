// Import des modules nécessaires
const express = require('express'); // Framework Express pour créer le serveur
const config = require('./config/env'); // Configuration de l'environnement (ex: port, variables d'environnement)
const db = require('./config/db'); // Configuration de la base de données (MongoDB, Redis, etc.)

// Import des routes
const courseRoutes = require('./routes/courseRoutes'); // Routes pour la gestion des cours
const studentRoutes = require('./routes/studentRoutes'); // Routes pour la gestion des étudiants

// Initialisation de l'application Express
const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Définition des routes
app.use('/courses', courseRoutes); // Associe les routes des cours à l'URL de base "/courses"
app.use('/students', studentRoutes); // Associe les routes des étudiants à l'URL de base "/students"

/**
 * Démarre le serveur et établit les connexions aux bases de données.
 * @returns {Promise<void>} - Une promesse qui résout une fois le serveur démarré.
 */
async function startServer() {
  try {
    // Connexion à MongoDB
    await db.connectMongo();
    // Connexion à Redis
    await db.connectRedis();

    // Démarrage du serveur Express
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    // Gestion des erreurs lors du démarrage du serveur
    console.error('Failed to start server:', error);
    process.exit(1); // Quitte le processus avec un code d'erreur
  }
}

// Gestion de l'arrêt propre du serveur (ex: lors d'un SIGTERM)
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server and database connections');
  await db.closeConnections(); // Ferme les connexions aux bases de données
  process.exit(0); // Quitte le processus avec un code de succès
});

// Démarrage du serveur
startServer();