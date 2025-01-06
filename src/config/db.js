// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : Créer un module séparé permet de centraliser la logique de connexion aux bases de données.
// Cela améliore la réutilisation du code, facilite la maintenance et permet une gestion centralisée des erreurs.
// De plus, cela suit le principe de séparation des responsabilités (SOLID).

// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : Il est essentiel de fermer les connexions aux bases de données lorsque l'application s'arrête
// pour éviter les fuites de mémoire et les connexions orphelines. Cela se fait en écoutant les événements
// de fermeture (comme SIGTERM) et en appelant les méthodes de fermeture appropriées.

const { MongoClient } = require('mongodb'); // Importe le client MongoDB
const redis = require('redis'); // Importe le client Redis
const config = require('./env'); // Importe la configuration des variables d'environnement

// Variables pour stocker les clients et la base de données
let mongoClient, redisClient, db;

// Fonction pour se connecter à MongoDB
async function connectMongo() {
  try {
    // Crée une nouvelle instance de MongoClient avec l'URI de MongoDB
    mongoClient = new MongoClient(config.mongodb.uri);
    
    // Établit la connexion à MongoDB
    await mongoClient.connect();
    
    // Sélectionne la base de données à utiliser
    db = mongoClient.db(config.mongodb.dbName);
    
    // Log de succès
    console.log('MongoDB connected');
  } catch (error) {
    // Log d'erreur en cas d'échec de la connexion
    console.error('MongoDB connection error:', error);
    throw error; // Propage l'erreur pour la gestion ultérieure
  }
}

// Fonction pour se connecter à Redis
async function connectRedis() {
  try {
    // Crée une nouvelle instance de Redis Client avec l'URI de Redis
    redisClient = redis.createClient({ url: config.redis.uri });
    
    // Établit la connexion à Redis
    await redisClient.connect();
    
    // Log de succès
    console.log('Redis connected');
  } catch (error) {
    // Log d'erreur en cas d'échec de la connexion
    console.error('Redis connection error:', error);
    throw error; // Propage l'erreur pour la gestion ultérieure
  }
}

// Fonction pour fermer les connexions aux bases de données
async function closeConnections() {
  // Ferme la connexion MongoDB si elle existe
  if (mongoClient) {
    await mongoClient.close();
    console.log('MongoDB connection closed');
  }
  
  // Ferme la connexion Redis si elle existe
  if (redisClient) {
    await redisClient.quit();
    console.log('Redis connection closed');
  }
}

// Export des fonctions et clients pour les utiliser dans d'autres modules
module.exports = {
  connectMongo, // Fonction pour se connecter à MongoDB
  connectRedis, // Fonction pour se connecter à Redis
  closeConnections, // Fonction pour fermer les connexions
  db, // Instance de la base de données MongoDB
  redisClient // Instance du client Redis
};