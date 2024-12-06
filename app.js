const express = require("express"); // Framework pour construire des applications web
const mysql2 = require("mysql2"); // Bibliothèque pour interagir avec MySQL
const myConnection = require("express-myconnection"); // Middleware pour gérer les connexions MySQL
const bodyParser = require("body-parser"); // Middleware pour lire les données des formulaires
const app = express(); // Création de l'application Express

// Configuration de connexion à la base de données MySQL
const dbOptions = {
    host: "localhost",         // Adresse du serveur MySQL
    user: "tatyanat055",       // Nom d'utilisateur MySQL
    password: "Tatatamk8",     // Mot de passe MySQL
    database: "restaurant"     // Nom de la base de données
};

// Middleware pour gérer les connexions MySQL via `express-myconnection`
app.use(myConnection(mysql2, dbOptions, "pool")); // Mode "pool" pour une gestion efficace des connexions

// Middleware pour gérer les données de formulaires (POST)
app.use(express.urlencoded({ extended: true })); // Analyse les requêtes avec 'application/x-www-form-urlencoded'
app.use(express.json()); // Permet de lire les données JSON

// Configuration du moteur de vue EJS pour le rendu des pages dynamiques
app.set("views", "./views"); // Définit le dossier contenant les vues EJS
app.set("view engine", "ejs"); // Déclare EJS comme moteur de rendu

// Middleware pour servir les fichiers statiques (CSS, images)
app.use(express.static("public"));

// *** ROUTES ***

// Route pour la page d'accueil
app.get("/accueil", (req, res) => {
    let date = new Date();
    let salutation = date.getHours() > 14 ? "Bonsoir" : "Bonjour"; // Choix de la salutation en fonction de l'heure

    res.render("accueil", {
        prenom: "Tatyana",         // Variables passées à la vue
        nom: "ALI MDAHOMA",
        maSalutation: salutation
    });
});

// Route pour afficher l'équipe
app.get("/equipe", (req, res) => {
    const equipe = [
        { nom: "Abdallah Chanfi", poste: "Chef de cuisine" },
        { nom: "Zaki Said", poste: "Serveur" },
        { nom: "Maissara Boura", poste: "Commis de cuisine" },
        { nom: "Momo Kadafi", poste: "Sommelier" }
    ];
    res.render("equipe", { equipe }); // Rendu de la vue "equipe.ejs" avec les données de l'équipe
});

// Route pour afficher le formulaire d'ajout de plat
app.get("/formulaire", (req, res) => {
    res.render("formulaire"); // Rendu du formulaire pour ajouter un plat
});

// Traitement du formulaire d'ajout de plat
app.post("/ajouter-plat", (req, res) => {
    const { nom, prix, description } = req.body; // Extraction des données du formulaire

    req.getConnection((err, connection) => {
        if (err) {
            console.error("Erreur de connexion : ", err);
            return res.status(500).send("Erreur de connexion à la base de données");
        }

        const query = `INSERT INTO plats (nom, prix, description) VALUES (?, ?, ?)`; // Requête SQL pour insérer un plat
        connection.query(query, [nom, prix, description], (err, results) => {
            if (err) {
                console.error("Erreur d'insertion : ", err);
                return res.status(500).send("Erreur lors de l'insertion du plat");
            }
            res.redirect("/menu"); // Redirection vers la page du menu après ajout
        });
    });
});

// Route pour afficher le menu avec les plats
app.get("/menu", (req, res) => {
    req.getConnection((err, connection) => {
        if (err) {
            console.error("Erreur de connexion : ", err);
            return res.status(500).send("Erreur interne");
        }

        connection.query("SELECT * FROM plats", (err, plats) => {
            if (err) {
                console.error("Erreur lors de la récupération des plats : ", err);
                return res.status(500).send("Erreur interne du serveur");
            }
            res.render("menu", { plats }); // Affichage des plats dans la vue "menu.ejs"
        });
    });
});

// Route pour supprimer un plat
app.post("/supprimer-plat/:id", (req, res) => {
    const platId = req.params.id; // Récupération de l'ID du plat à supprimer
    req.getConnection((err, connection) => {
        if (err) {
            console.error("Erreur de connexion : ", err);
            return res.status(500).send("Erreur interne du serveur");
        }

        connection.query("DELETE FROM plats WHERE id = ?", [platId], (err, results) => {
            if (err) {
                console.error("Erreur lors de la suppression du plat : ", err);
                return res.status(500).send("Erreur lors de la suppression du plat");
            }
            res.redirect("/menu"); // Redirection vers le menu après suppression
        });
    });
});

// Route pour la page de contact
app.get("/contact", (req, res) => {
    const horaires = [
        { jour: "Lundi - Vendredi", heure: "12h00 - 22h00" },
        { jour: "Samedi - Dimanche", heure: "18h00 - 23h00" }
    ];
    const contact = { telephone: "0123456789", telephoneAffichage: "01 01 01 01 01" };
    res.render("contact", { horaires, contact }); // Affichage des horaires et du contact
});

// Démarrage du serveur sur le port 2002
const PORT = 2002;
app.listen(PORT, () => {
    console.log(`Le serveur est à l'écoute sur le port ${PORT}`); // Confirmation du démarrage du serveur
});

module.exports = app; // Exportation de l'application pour d'autres modules
