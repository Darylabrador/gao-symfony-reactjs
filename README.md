# Projet de gestion d'attribution de poste information

La conception et le développement de ce projet s'est effectué dans le cadre de la formation de Simplon. 

Ce projet utilise les technologies suivantes :

- backend : Symfony 5.1.8 (API)
- frontend : Reactjs


Identifiant du compte admin : 

- identifiant : admin@gmail.com
- mot de passe : password


## Initialisation du projet

Après avoir fait un git clone de ce projet, vous devez effectué les commandes suivantes : 

- composer install
- npm install
- php bin/console doctrine:database:create
- php bin/console doctrine:migrations:migrate
- php bin/console doctrine:fixtures:load

## Lancement du projet 

En mode développment vous devez utiliser les commandes suivantes : 

- symfony server:start
- npm run watch


### Ressources :

- https://symfony.com/
- https://h-benkachoud.medium.com/symfony-rest-api-without-fosrestbundle-using-jwt-authentication-part-2-be394d0924dd