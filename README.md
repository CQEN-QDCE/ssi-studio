[![img](https://img.shields.io/badge/Cycle%20de%20Vie-Phase%20d%C3%A9couverte-339999)](https://www.quebec.ca/gouv/politiques-orientations/vitrine-numeriqc/accompagnement-des-organismes-publics/demarche-conception-services-numeriques)
[![License](https://img.shields.io/badge/Licence-LiLiQ--R-blue)](LICENSE)

## SSI Studio

Outils et services qui facilitent l'émission, la vérification et la gestion d'attestations d'identité numérique basé sur [Hyperledger Aries](https://www.hyperledger.org/use/aries) et [Hyperledger Indy](https://www.hyperledger.org/use/hyperledger-indy).

### Développé avec

* [Angular](https://angular.io/)
* [NestJS](https://nestjs.com/)

## Démarrage

### Prérequis

* npm
  ```sh
  npm install npm@latest -g
  ```
* NestJS CLI
  ```sh
  npm install @nestjs/cli@latest -g
  ```
* Angular CLI
  ```sh
  npm install @angular/cli@latest -g
  ```

### Installation

1. Cloner le dépôt
   ```sh
   git clone https://github.com/CQEN-QDCE/ssi-studio.git
   ```
2. Installer les paquets NPM
   ```sh
   npm install
   ```
3. Construire et démarrer les images Docker (PostgreSql, Keycloak, pgAdmin 4, interface Angular et API NestJs)
   ```sh
   docker-compose build
   docker-compose up
   ```

## Développement avec VSCode
1. Assurez-vous d'avoir VSCode d'installé;
2. Ouvrir l'espace de travail ssi-studio.workspace situé dans le répertoire .vscode;
3. Démarrez les images Docker avec docker-compose up;
4. Exécutez le débogage en sélectionnant "Launch Server & Client";
## Licence
Distribué sous Licence Libre du Québec – Réciprocité (LiLiQ-R). Voir [LICENCE](LICENSE) pour plus d'informations.
