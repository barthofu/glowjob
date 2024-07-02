# Spécifications

## Concept

Le but de ce projet est de créer un site web permettant de gérer un cinéma. Il doit permettre de gérer les films, les séances et les réservations.

## Fonctionnalités

Ci-dessous les fonctionnalités classées par rôle du client. Chaque role hérite des fonctionnalités du role précédent.

- **Administrateur**
  - Films
    - [x] Créer
    - [x] Modifier
    - [x] Supprimer
  - Séances
    - [x] Créer
    - [x] Modifier
    - [x] Supprimer
  - Réservations
    - [x] Consulter réservations sur une séance donnée

- **Utilisateur authentifié**
  - [x] Réserver une séance
  - [x] Modifier son profil
  - [x] Consulter ses réservations
  - [x] Se déconnecter

- **Utilisateur non authentifié**
  - [x] Consulter les films à l'affiche
  - [x] Consulter les détails d'un film
  - [x] Rechercher un film
  - [x] Consulter les séances d'un film
  - [x] S'inscrire
  - [x] Se connecter

- **Autres**
  - [x] Envoi de mail
  - [x] Sécurisé