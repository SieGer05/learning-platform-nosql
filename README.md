# DJILI Mohamed Amine  

## Projet de fin de module NoSQL

Ce projet consiste à créer une API backend pour une plateforme d'apprentissage en ligne en utilisant MongoDB et Redis. L'application est conçue avec une architecture modulaire et suit les bonnes pratiques de développement.

---

### Réponses aux questions du code source

#### 1. Pourquoi utiliser des variables d'environnement ?
Les variables d'environnement permettent de stocker des informations sensibles (comme les URI de connexion à MongoDB et Redis) en dehors du code source. Cela améliore la sécurité et facilite la configuration de l'application dans différents environnements (développement, test, production).

#### 2. Quelles sont les informations sensibles à ne jamais commiter ?
Les informations sensibles incluent :

- Les URI de connexion à MongoDB et Redis.
- Les mots de passe et noms d'utilisateur.
- Les clés d'API ou secrets.

Ces informations doivent être stockées dans un fichier `.env` et ajoutées à `.gitignore` pour éviter d'être exposées publiquement.

#### 3. Pourquoi créer un module séparé pour les connexions aux bases de données ?
Séparer la logique de connexion aux bases de données dans un module dédié (`config/db.js`) permet :

- Une meilleure organisation du code.
- Une réutilisation facile des connexions dans toute l'application.
- Une gestion centralisée des erreurs et des retries.

#### 4. Comment gérer proprement la fermeture des connexions ?
La fermeture propre des connexions est essentielle pour éviter les fuites de mémoire et les erreurs. Dans ce projet, les connexions sont fermées lors de l'arrêt du serveur en écoutant l'événement SIGTERM :

```javascript
process.on('SIGTERM', async () => {
  await db.closeConnections();
  process.exit(0);
});
```

#### 5. Pourquoi séparer la logique métier des routes ?
Séparer la logique métier (dans les contrôleurs) des routes permet :

- Une meilleure maintenabilité du code.
- Une réutilisation facile de la logique métier dans d'autres parties de l'application.
- Une meilleure testabilité des composants.

#### 6. Pourquoi utiliser des services séparés ?
Les services (comme `mongoService.js` et `redisService.js`) encapsulent la logique spécifique à MongoDB et Redis. Cela permet :

- Une meilleure organisation du code.
- Une réutilisation facile des fonctions utilitaires.
- Une séparation claire des responsabilités.

#### 7. Comment gérer efficacement le cache avec Redis ?
Redis est utilisé pour mettre en cache les données fréquemment consultées, ce qui améliore les performances de l'application. Les bonnes pratiques incluent :

- Utiliser des clés descriptives et cohérentes.
- Définir un TTL (Time To Live) pour les données mises en cache.
- Gérer les erreurs de cache de manière appropriée.

---

### Comment utiliser l'application

#### 1. Prérequis
- Node.js (version 16 ou supérieure).
- Un compte MongoDB Atlas pour héberger la base de données.
- Un compte Redis Cloud pour héberger le cache.

#### 2. Installation

Clonez le dépôt :
```bash
git clone https://github.com/SieGer05/learning-platform-nosql.git
```

Installez les dépendances :
```bash
npm install
```

Configurez les variables d'environnement :

- Créez un fichier `.env` à la racine du projet.
- Ajoutez les variables suivantes :

```plaintext
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/learning_platform?retryWrites=true&w=majority
MONGODB_DB_NAME=learning_platform
REDIS_URI=redis://<password>@<host>:<port>
PORT=3000
```

#### 3. Démarrer l'application
Exécutez la commande suivante :
```bash
npm start
```
L'application sera disponible à l'adresse [http://localhost:3000](http://localhost:3000).

#### 4. Tester l'API

##### Créer un cours
```bash
curl -X POST http://localhost:3000/courses -H "Content-Type: application/json" -d '{"title": "Introduction to NoSQL", "description": "Learn the basics of NoSQL databases", "instructor": "John Doe", "duration": 60}'
```

##### Récupérer un cours
```bash
curl -X GET http://localhost:3000/courses/<id>
```

##### Récupérer les statistiques des cours
```bash
curl -X GET http://localhost:3000/courses/stats
```

---

### Pourquoi utiliser le cloud ?

#### 1. Problème de stockage local
Je n'ai pas assez d'espace de stockage sur mon ordinateur pour installer MongoDB et Redis localement. De plus, l'utilisation du cloud permet une meilleure scalabilité et disponibilité.

#### 2. MongoDB Atlas
**Avantages :**
- Hébergement gratuit avec un cluster de 512 Mo.
- Gestion automatique des sauvegardes et des mises à jour.
- Accès facile depuis n'importe où.

#### 3. Redis Cloud
**Avantages :**
- Hébergement gratuit avec 30 Mo de stockage.
- Performances élevées pour la mise en cache.
- Gestion simplifiée des instances Redis.

---

### Pourquoi utiliser ces technologies ?

#### 1. MongoDB
- **Base de données NoSQL :** Flexible et adapté aux données non structurées.
- **Scalabilité :** Facile à scaler horizontalement.
- **Intégration avec Node.js :** Le driver MongoDB pour Node.js est simple à utiliser.

#### 2. Redis
- **Cache rapide :** Améliore les performances en réduisant la charge sur la base de données.
- **Stockage en mémoire :** Accès aux données en temps réel.

#### 3. Express
- **Framework léger :** Idéal pour créer des API RESTful.
- **Communauté active :** Beaucoup de ressources et de modules disponibles.

#### 4. Node.js
- **Asynchrone et non bloquant :** Idéal pour les applications I/O intensives.
- **Écosystème riche :** Accès à des milliers de packages via npm.

---

### Structure du projet
```plaintext
learning-platform-nosql/
├── src/
│   ├── app.js                # Point d'entrée de l'application
│   ├── config/
│   │   ├── db.js             # Connexions aux bases de données
│   │   └── env.js            # Validation des variables d'environnement
│   ├── controllers/          # Contrôleurs pour gérer la logique métier
│   ├── routes/               # Définition des routes
│   └── services/             # Services pour interagir avec MongoDB et Redis
├── .env                      # Variables d'environnement
├── .gitignore                # Fichiers à ignorer par Git
├── package.json              # Dépendances et scripts
└── README.md                 # Documentation du projet
```

---

### Conclusion
Ce projet démontre l'utilisation de MongoDB et Redis pour créer une API backend performante et scalable. Grâce à l'utilisation du cloud, j'ai pu surmonter les limitations de stockage local tout en bénéficiant des avantages d'une infrastructure gérée.

---

**DJILI Mohamed Amine**  
*Étudiant en Ingénierie Informatique - Cybersécurité et Confiance Numérique  
Projet réalisé dans le cadre du module NoSQL, ENSET Mohammedia*