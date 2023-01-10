[![img](https://img.shields.io/badge/Cycle%20de%20Vie-Phase%20d%C3%A9couverte-339999)](https://www.quebec.ca/gouv/politiques-orientations/vitrine-numeriqc/accompagnement-des-organismes-publics/demarche-conception-services-numeriques)
[![License](https://img.shields.io/badge/Licence-LiLiQ--R-blue)](LICENSE)

---

<div>
    <img src="https://github.com/CQEN-QDCE/.github/blob/main/images/mcn.png" />
</div>

## À propos de SSI Studio

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

## Développement avec VSCode
1. Assurez-vous d'avoir VSCode d'installé;
2. Ouvrir l'espace de travail ssi-studio.workspace situé dans le répertoire .vscode;
3. Démarrez les images Docker avec docker-compose up;
4. Exécutez le débogage en sélectionnant "Launch Server & Client";

## Installation
Le moyen le plus pratique d'exécuter SSI Studio est d'utiliser Docker. Avant de débuter, assurez-vous que [Docker Desktop](https://docker.com/products/docker-desktop/) est correctement installé sur votre machine.

1. Clonez le dépôt
   ```sh
   git clone https://github.com/CQEN-QDCE/ssi-studio.git
   ```
2. Commencez par construire les images Docker
   ```sh
   docker-compose build
   ```
3. Exécutez les images Docker
   ```sh
   docker-compose up
   ```

Au moment où tous les images s'exécutent, l'application est disponible ici [SSI Studio](http://localhost:4201). Pour vous authentifier, utilisez l'un des utilisateurs suivant:

1. nom d'usager: user
   mot de passe: user
   
2. nom d"usager: admin
   mot de passe: admin
   
Les images Docker qui s'exécutent sont:
1. Une base de données PostgreSql accessible ici http://localhost:5433;
2. L'API REST NestJs de l'application accessible ici http://localhost:3001;
3. Interface Angular accessible ici http://localhost:4201;
4. Fournisseur d'identité Keycloak accessible ici http://localhost:8080;
5. Outil de gestion pgAmin 4 accessible ici http://localhost:16543;

## Licence
Distribué sous Licence Libre du Québec – Réciprocité (LiLiQ-R). Voir [LICENCE](LICENSE) pour plus d'informations.
