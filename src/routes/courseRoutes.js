// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : Séparer les routes dans différents fichiers permet :
// - Une meilleure organisation du code, en regroupant les routes liées à une même entité (par exemple, les cours).
// - Une maintenance plus facile, car les modifications dans une entité n'affectent pas les autres.
// - Une meilleure scalabilité, car l'ajout de nouvelles routes ou entités ne nécessite pas de modifier un fichier central.
// - Une meilleure lisibilité, car chaque fichier de routes est dédié à une fonctionnalité spécifique.

// Question : Comment organiser les routes de manière cohérente ?
// Réponse : Les routes doivent être organisées de manière modulaire, en regroupant les routes liées à une même entité
// ou fonctionnalité dans un fichier dédié. Par exemple :
// - Un fichier `courseRoutes.js` pour les routes liées aux cours.
// - Un fichier `studentRoutes.js` pour les routes liées aux étudiants.
// - Un fichier `authRoutes.js` pour les routes liées à l'authentification.
// Cela permet une structure claire et facile à maintenir.

const express = require('express'); // Importe le framework Express
const router = express.Router(); // Crée un nouveau routeur Express
const courseController = require('../controllers/courseController'); // Importe les contrôleurs pour les cours

// Routes pour les cours

// Route POST pour créer un cours
router.post('/', courseController.createCourse);

// Route GET pour récupérer un cours par son ID
router.get('/:id', courseController.getCourse);

// Route GET pour récupérer les statistiques des cours
router.get('/stats', courseController.getCourseStats);

// Exporte le routeur pour l'utiliser dans l'application principale
module.exports = router;