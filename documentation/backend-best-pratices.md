
# Déploiement
Différentes stratégies peuvent être utilisées pour déployer une application:

1. Déploiement Canary : Il s'agit de déployer progressivement une nouvelle version de l'application auprès d'un petit sous-ensemble d'utilisateurs, de surveiller les performances et les réactions à la nouvelle version, puis de la déployer progressivement auprès d'un plus grand nombre d'utilisateurs.

2. Déploiement progressif : Cette stratégie consiste à déployer progressivement la nouvelle version de l'application à l'ensemble de la base d'utilisateurs, un segment à la fois. Cela permet de résoudre rapidement les problèmes éventuels et de réduire le risque de pannes majeures.

3. Déploiement bleu-vert : Cette stratégie consiste à faire fonctionner deux environnements de production identiques côte à côte. Un environnement est la version "bleue", tandis que l'autre est la version "verte". Les utilisateurs sont dirigés vers la version bleue, tandis que la version verte est conservée en tant que réserve chaude. Lorsqu'une nouvelle version de l'application est prête, la version verte est mise en route et la version bleue est arrêtée.

4. Test A/B : Cette stratégie consiste à exécuter deux versions de l'application côte à côte et à les tester avec différents segments d'utilisateurs. Cela permet de comparer directement les performances des deux versions et d'identifier celle qui offre la meilleure expérience utilisateur.

## Déploiement bleu-vert
Le déploiement bleu-vert est une stratégie de déploiement dans laquelle deux environnements de production identiques sont créés, l'un appelé environnement "bleu" et l'autre, environnement "vert". Lorsqu'une nouvelle version du logiciel est publiée, elle est d'abord déployée dans l'environnement vert. Cela permet aux utilisateurs des tester dans un environnement réel. Une fois les tests terminés, le logiciel est alors déployé dans l'environnement bleu, et l'environnement vert est mis en veille. Cette méthode permet de revenir rapidement à la version précédente du logiciel en cas de problème avec la nouvelle version.

