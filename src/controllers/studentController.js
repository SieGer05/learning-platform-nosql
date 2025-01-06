// Importe ObjectId pour manipuler les IDs MongoDB
const { ObjectId } = require('mongodb');

// Importe la configuration de la base de données
const db = require('../config/db');

// Importe les services pour interagir avec MongoDB et Redis
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

// Contrôleur pour créer un étudiant
async function createStudent(req, res) {
  try {
    const student = req.body; // Récupère les données du corps de la requête
    const result = await db.db.collection('students').insertOne(student); // Insère l'étudiant dans MongoDB
    res.status(201).json(result.ops[0]); // Renvoie l'étudiant créé avec un statut 201 (Created)
  } catch (error) {
    res.status(500).json({ error: error.message }); // Gère les erreurs avec un statut 500 (Internal Server Error)
  }
}

// Contrôleur pour récupérer un étudiant par son ID
async function getStudent(req, res) {
  try {
    const studentId = req.params.id; // Récupère l'ID de l'étudiant depuis les paramètres de la requête
    const student = await mongoService.findOneById('students', studentId); // Recherche l'étudiant dans MongoDB
    if (student) {
      res.status(200).json(student); // Renvoie l'étudiant trouvé avec un statut 200 (OK)
    } else {
      res.status(404).json({ message: 'Student not found' }); // Renvoie une erreur 404 si l'étudiant n'est pas trouvé
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Gère les erreurs avec un statut 500 (Internal Server Error)
  }
}

// Contrôleur pour récupérer les statistiques des étudiants
async function getStudentStats(req, res) {
  try {
    // Utilise l'agrégation MongoDB pour compter le nombre total d'étudiants
    const stats = await db.db.collection('students').aggregate([
      { $group: { _id: null, totalStudents: { $sum: 1 } } }
    ]).toArray();
    res.status(200).json(stats[0]); // Renvoie les statistiques avec un statut 200 (OK)
  } catch (error) {
    res.status(500).json({ error: error.message }); // Gère les erreurs avec un statut 500 (Internal Server Error)
  }
}

// Export des contrôleurs pour les utiliser dans les routes
module.exports = {
  createStudent, // Exporte la fonction pour créer un étudiant
  getStudent, // Exporte la fonction pour récupérer un étudiant
  getStudentStats // Exporte la fonction pour récupérer les statistiques des étudiants
};