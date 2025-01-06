// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : La validation des variables d'environnement au démarrage garantit que l'application dispose
// de toutes les configurations nécessaires pour fonctionner correctement. Cela évite des erreurs
// inattendues pendant l'exécution et permet de détecter les problèmes de configuration dès le départ.

// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : Si une variable requise est manquante, l'application ne peut pas fonctionner correctement.
// Dans ce cas, une erreur explicite est levée pour informer l'utilisateur de la variable manquante,
// ce qui permet de résoudre le problème rapidement.

const dotenv = require('dotenv'); // Importe le module dotenv pour charger les variables d'environnement
dotenv.config(); // Charge les variables d'environnement du fichier .env dans process.env

// Liste des variables d'environnement requises
const requiredEnvVars = [
  'MONGODB_URI', // URI de connexion à MongoDB
  'MONGODB_DB_NAME', // Nom de la base de données MongoDB
  'REDIS_URI' // URI de connexion à Redis
];

// Fonction pour valider les variables d'environnement
function validateEnv() {
  // Filtre les variables manquantes
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  // Si des variables manquantes sont trouvées, lève une erreur
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}

// Appelle la fonction de validation au démarrage
validateEnv();

// Exporte la configuration de l'application
module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI, // URI de MongoDB
    dbName: process.env.MONGODB_DB_NAME // Nom de la base de données MongoDB
  },
  redis: {
    uri: process.env.REDIS_URI // URI de Redis
  },
  port: process.env.PORT || 3000 // Port du serveur (par défaut 3000)
};