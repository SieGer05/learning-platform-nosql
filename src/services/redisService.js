// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : Pour gérer efficacement le cache avec Redis, il est recommandé de :
// 1. Utiliser des temps d'expiration (TTL) pour éviter de stocker des données obsolètes.
// 2. Structurer les clés de manière logique et descriptive.
// 3. Minimiser la taille des données stockées en utilisant des formats compressés ou en ne stockant que les données nécessaires.
// 4. Implémenter une stratégie de cache cohérente (par exemple, cache-aside, write-through, etc.).

// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Les bonnes pratiques pour les clés Redis incluent :
// 1. Utiliser des noms de clés descriptifs et structurés (ex: "user:123:profile").
// 2. Éviter les clés trop longues pour optimiser les performances.
// 3. Utiliser des espaces de noms pour organiser les clés (ex: "app:cache:user:123").
// 4. Ne pas utiliser de caractères spéciaux ou d'espaces dans les clés.

const { redisClient } = require("../config/db"); // Importe le client Redis configuré

// Fonctions utilitaires pour Redis

/**
 * Stocke des données dans le cache Redis avec une durée de vie (TTL).
 * @param {string} key - La clé sous laquelle les données seront stockées.
 * @param {Object} data - Les données à stocker dans le cache.
 * @param {number} ttl - La durée de vie des données en secondes (Time To Live).
 * @returns {Promise<void>} - Une promesse qui résout une fois les données stockées.
 */
async function cacheData(key, data, ttl) {
  await redisClient.set(key, JSON.stringify(data), { EX: ttl }); // Stocke les données avec un TTL
}

/**
 * Récupère des données du cache Redis à partir d'une clé.
 * @param {string} key - La clé associée aux données en cache.
 * @returns {Promise<Object|null>} - Une promesse qui résout avec les données en cache ou null si la clé n'existe pas.
 */
async function getCachedData(key) {
  const data = await redisClient.get(key); // Récupère les données associées à la clé
  return data ? JSON.parse(data) : null; // Parse les données JSON ou retourne null si elles n'existent pas
}

// Export des fonctions utilitaires
module.exports = {
  cacheData,
  getCachedData,
};