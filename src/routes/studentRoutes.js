// Importe le framework Express
const express = require('express');

// Crée un nouveau routeur Express
const router = express.Router();

// Importe les contrôleurs pour les étudiants
const studentController = require('../controllers/studentController');

// Routes pour les étudiants

// Route POST pour créer un étudiant
router.post('/', studentController.createStudent);

// Route GET pour récupérer un étudiant par son ID
router.get('/:id', studentController.getStudent);

// Route GET pour récupérer les statistiques des étudiants
router.get('/stats', studentController.getStudentStats);

// Exporte le routeur pour l'utiliser dans l'application principale
module.exports = router;