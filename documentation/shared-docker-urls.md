# URLs partagées dans Docker

Docker est utilisé dans le développement pour réduire le temps de démarrage initial. En particulier dans les configurations où plusieurs services doivent communiquer, l'utilisation de Docker avec Docker Compose n'est pas si rare. Voici une astuce intéressante que j'ai trouvée aujourd'hui, qui vous permet d'utiliser les mêmes URL à l'intérieur du réseau Docker Compose et sur votre machine locale ✨.

Supposons que notre application se compose de trois services :

web, une application client qui s'exécute dans le navigateur, parle à l'API et charge les fichiers de "localstack".
api, une API HTTP JSON
localstack, un remplacement de AWS S3
L'application web s'attend à recevoir de l'API des URL de fichiers qu'elle peut résoudre. L'api, quant à elle, ne dispose que d'une seule variable d'environnement pour configurer l'emplacement de l'application localstack. Cela signifie que lorsque nous essayons d'accéder à des fichiers sur localstack depuis notre machine de développement (dans le navigateur) et depuis l'intérieur du contexte Docker (l'api), il faut que cela fonctionne avec le même nom.

<p align="center">
  <img src="images/vc-authn-issuer.png" label="Environnement de test" />

  <br>
  <b>Émission de l'attestation d'identité vérifiable à l'utilisateur</b>
</p>

L'astuce pour y parvenir consiste à utiliser un domaine .localhost, qui est généralement résolu à l'adresse de bouclage 127.0.0.1. Cela signifie que les ports exposés à partir des conteneurs Docker sont accessibles via http://<some-name>.localhost:<exposed-port> à partir de sa propre machine en dehors du réseau Docker. À l'intérieur de la configuration réseau de Docker Compose, vous pouvez ajouter un alias réseau :

# docker-compose.yml
localstack:
  …
  ports:
    - "4572:4572"
  networks:
      default:
        aliases:
          - "localstack.localhost"
api:
  …
  environment:
    S3_URL: "http://localstack.localhost:4572"
# define the network
networks:
  default:
    …
  
  De cette façon, la même combinaison nom d'hôte + port est résolue pour le même service à l'intérieur de votre réseau Docker Compose ainsi que de l'extérieur (dans votre navigateur). Vous pouvez donc éviter le mappage d'URL supplémentaire dans les réponses API.
  
  Réféerence: https://bitcrowd.dev/shared-docker-urls
