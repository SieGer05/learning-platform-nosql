// Question: Pourquoi créer des services séparés ?
// Réponse: Créer des services séparés permet de mieux organiser le code, de favoriser la réutilisabilité,
// et de respecter le principe de responsabilité unique. Cela facilite également les tests et la maintenance.

const { ObjectId } = require('mongodb'); // Importe l'objet ObjectId de MongoDB pour manipuler les identifiants

// Fonctions utilitaires pour MongoDB

/**
 * Recherche un document dans une collection MongoDB par son ID.
 * @param {string} collection - Le nom de la collection dans laquelle chercher.
 * @param {string} id - L'identifiant du document à rechercher.
 * @returns {Promise<Object>} - Une promesse qui résout avec le document trouvé ou null si aucun document n'est trouvé.
 */
async function findOneById(collection, id) {
  return await db.db.collection(collection).findOne({ _id: ObjectId(id) });
}

// Export des services
module.exports = {
  findOneById // Exporte la fonction findOneById pour qu'elle puisse être utilisée dans d'autres fichiers
};