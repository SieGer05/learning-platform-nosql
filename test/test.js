// Import du module axios pour effectuer des requêtes HTTP
const axios = require("axios");

/**
 * Fonction pour tester l'API en effectuant une série de requêtes.
 * - Crée un cours.
 * - Récupère le cours créé par son ID.
 * - Récupère les statistiques des cours.
 */
async function testAPI() {
  try {
    // Étape 1 : Créer un cours
    const createResponse = await axios.post("http://localhost:3000/courses", {
      title: "Introduction to NoSQL",
      description: "Learn the basics of NoSQL databases",
      instructor: "Prof DAIF",
      duration: 60,
    });
    console.log("Course created:", createResponse.data); // Affiche les données du cours créé

    // Étape 2 : Récupérer le cours par son ID
    const courseId = createResponse.data._id; // Récupère l'ID du cours créé
    const getResponse = await axios.get(
      `http://localhost:3000/courses/${courseId}`
    );
    console.log("Course retrieved:", getResponse.data); // Affiche les données du cours récupéré

    // Étape 3 : Récupérer les statistiques des cours
    const statsResponse = await axios.get(
      "http://localhost:3000/courses/stats"
    );
    console.log("Course stats:", statsResponse.data); // Affiche les statistiques des cours
  } catch (error) {
    // Gestion des erreurs
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    ); // Affiche l'erreur rencontrée (si disponible)
  }
}

// Appel de la fonction pour tester l'API
testAPI();