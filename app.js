const express = require("express");
const url = require('url');
const fs = require('fs');
const app = express();// Création d'une application Express

// Servir les fichiers statiques à partir du dossier 'public'
app.use(express.static('public'));

// Configuration du moteur de vue (EJS) et du dossier des vues
app.set("views", "./views");// Définit le dossier des vues EJS
app.set("view engine", "ejs"); // Définit EJS comme moteur de rendu

app.get("/accueil", (req, res) => {
    let date = new Date();
    let salutation = "Bonjour";
    
    // Affiche "Bonjour" si c'est le matin, "Bonsoir" pour le soir
    if (date.getHours() > 14) {
        salutation = "Bonsoir";
    }

    let utilisateur = {
        nom: ["ALI MDAHOMA"],
        prenom: "Tatyana",
        maSalutation: salutation
    };

    // Rendu de la vue "accueil.ejs" avec l'objet utilisateur
    res.render("accueil", utilisateur);
});

app.get('/equipe', (req, res) => {
    // Liste des membres de l'équipe à afficher
    const equipe = [
        { nom: 'Abdallah Chanfi', poste: 'Chef de cuisine' },
        { nom: 'Zaki Said', poste: 'Serveur' },
        { nom: 'Maissara Boura', poste: 'Commis de cuisine' },
        { nom: 'Momo Kadafi', poste: 'Sommelier' },
    ];

    // Rendu de la vue "equipe.ejs" avec les données de l'équipe
    res.render('equipe', { equipe });
});


app.get('/menu', (req, res) => {
    // Liste des plats à afficher
    const plats = [
        {
            nom: 'Spaghetti Carbonara',
            prix: '12,99',
            image: 'spaghetticarbo.jpg'
        },
        {
            nom: 'Pizza Margherita',
            prix: '10,50',
            image: 'pizza.jpg'
        },
        {
            nom: 'Salade César',
            prix: '8,90',
            image: 'saladecesar.jpg'
        },
        {
            nom: 'Steak Frites',
            prix: '18,50',
            image: 'STEAKFRITES.jpg'
        }
    ];
    // Rendu de la vue "menu.ejs" avec les plats
    res.render('menu', { plats });
});

app.get('/contact', (req, res) => {
    // Données des horaires d'ouverture
    const horaires = [
        { jour: 'Lundi - Vendredi', heure: '12h00 - 22h00' },
        { jour: 'Samedi - Dimanche', heure: '18h00 - 23h00' }
    ];

    // Données de contact
    const contact = {
        telephone: '0123456789',
        telephoneAffichage: '01 01 01 01 01'
    };

    // Rendu de la vue "contact.ejs" avec les données
    res.render('contact', { horaires, contact });
});

app.listen(2020, () => {
    console.log("Le serveur est à l'écoute sur le port 2002");
});

module.exports = app;
