# Configurer ngx-translate pour qu'il se charge au démarrage en Angular

ngx-translate est merveilleux, facile à configurer et facile à utiliser... jusqu'à ce que vous ayez besoin de charger des traductions instantanément pour les affecter à d'autres choses sans attente.

Le problème est que ngx-translate charge les traductions en différé. Cela n'a pas d'importance lorsque vous avez besoin de traduire un message ou un composant, mais lorsque vous avez besoin de définir des traductions avant que les choses ne soient chargées, alors vous avez un problème.

Typiquement, la traduction dans le composant est comme ceci (je suppose que vous savez comment l'utiliser) :
