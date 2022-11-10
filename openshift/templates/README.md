# Déploiement du SSI Lab sur OpenShift

Ce dépôt contient les instructions nécessaires pour déployer SSI Lab sur OpenShift.

| Gabarit  | Descripton |
| -------- | ---------- |
| [ssi-studio.yaml](https://github.com/CQEN-QDCE/ssi-studio/blob/main/taiga/openshift/templates/taiga.yaml) | Installation de développement. |

## Paramètres du gabarit

Tous les paramètres du gabarit sont obligatoires. La plupart d'entre eux ont des valeurs par défaut, mais certains n'en ont pas. Ils doivent être fournis lors de l'instanciation avec 'oc process'.

### Paramètres d'entrée requis

| Paramètre | Description |
| --------- | ----------- |
| **ROUTE_HOSTNAME** | Le nom d'hôte externe pour accéder à SSI Lab |


Commencer par créer un projet sur OpenShift:
```bash
oc new-project ssi-studio
```
Lancez l'installation sur OpenShift
```bash
oc create configmap default.conf --from-file=nginx.conf

oc process -f ssi-studio.yaml -p ROUTE_HOSTNAME=<nom d'hôte externe> | oc apply -f -
```

Remplacez _&lt;nom d'hôte externe&gt;_ par une valeur qui se résout à l'adresse du routeur OpenShift.

Une fois que tous les pods sont démarrés, vous devriez pouvoir accéder à SSI Studio à l'adresse https://ssi-studio.<nom d'hôte externe>/.

Paramètres avec valeurs par défaut
| Paramètre | Description | Défaut      |
| --------- | ----------- | ----------- |
| **ROUTE_SUBDOMAIN** | Le nom de sous domaine pour accéder à SSI Lab. | ssi-studio |
| **POSTGRES_DB** | Nom de la base de données PostgreSQL. | ssi_lab |
| **POSTGRES_USER** | Nom d'utilisateur PostgreSQL. | dbuser |
| **POSTGRES_PASSWORD** | Mot de passe de l'utilisateur PostgreSQL. | {auto-généré} |
