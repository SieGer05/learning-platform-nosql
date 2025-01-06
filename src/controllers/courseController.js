// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse : 
// - **Contrôleur** : Un contrôleur contient la logique métier de l'application. Il gère les requêtes,
//   interagit avec les services (comme MongoDB ou Redis), et renvoie les réponses appropriées.
// - **Route** : Une route définit les points d'entrée de l'API (URL) et associe chaque point d'entrée
//   à un contrôleur spécifique. Les routes agissent comme un pont entre les requêtes HTTP et les contrôleurs.

// Question : Pourquoi séparer la logique métier des routes ?
// Réponse : Séparer la logique métier des routes permet :
// - Une meilleure organisation du code (séparation des responsabilités).
// - Une réutilisation facile de la logique métier dans d'autres parties de l'application.
// - Une meilleure testabilité des composants (les contrôleurs peuvent être testés indépendamment des routes).
// - Une maintenance plus facile, car les modifications dans la logique métier n'affectent pas les routes.

const { ObjectId } = require('mongodb'); // Importe ObjectId pour manipuler les IDs MongoDB
const db = require('../config/db'); // Importe la configuration de la base de données
const mongoService = require('../services/mongoService'); // Importe le service MongoDB
const redisService = require('../services/redisService'); // Importe le service Redis

// Contrôleur pour créer un cours
async function createCourse(req, res) {
  try {
    const course = req.body; // Récupère les données du corps de la requête
    const result = await db.db.collection('courses').insertOne(course); // Insère le cours dans MongoDB
    res.status(201).json(result.ops[0]); // Renvoie le cours créé avec un statut 201 (Created)
  } catch (error) {
    res.status(500).json({ error: error.message }); // Gère les erreurs avec un statut 500 (Internal Server Error)
  }
}

// Contrôleur pour récupérer un cours par son ID
async function getCourse(req, res) {
  try {
    const courseId = req.params.id; // Récupère l'ID du cours depuis les paramètres de la requête
    const course = await mongoService.findOneById('courses', courseId); // Recherche le cours dans MongoDB
    if (course) {
      res.status(200).json(course); // Renvoie le cours trouvé avec un statut 200 (OK)
    } else {
      res.status(404).json({ message: 'Course not found' }); // Renvoie une erreur 404 si le cours n'est pas trouvé
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Gère les erreurs avec un statut 500 (Internal Server Error)
  }
}

// Contrôleur pour récupérer les statistiques des cours
async function getCourseStats(req, res) {
  try {
    // Utilise l'agrégation MongoDB pour compter le nombre total de cours
    const stats = await db.db.collection('courses').aggregate([
      { $group: { _id: null, totalCourses: { $sum: 1 } } }
    ]).toArray();
    res.status(200).json(stats[0]); // Renvoie les statistiques avec un statut 200 (OK)
  } catch (error) {
    res.status(500).json({ error: error.message }); // Gère les erreurs avec un statut 500 (Internal Server Error)
  }
}

// Export des contrôleurs pour les utiliser dans les routes
module.exports = {
  createCourse, // Exporte la fonction pour créer un cours
  getCourse, // Exporte la fonction pour récupérer un cours
  getCourseStats // Exporte la fonction pour récupérer les statistiques des cours
};