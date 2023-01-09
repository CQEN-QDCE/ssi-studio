# Configurer ngx-translate pour qu'il se charge au démarrage en Angular

ngx-translate est merveilleux, facile à configurer et facile à utiliser... jusqu'à ce que vous ayez besoin de charger des traductions instantanément pour les affecter à d'autres choses sans attente.

Le problème est que ngx-translate charge les traductions en différé. Cela n'a pas d'importance lorsque vous avez besoin de traduire un message ou un composant, mais lorsque vous avez besoin de définir des traductions avant que les choses ne soient chargées, alors vous avez un problème.

Typiquement, la traduction dans le composant est comme ceci (je suppose que vous savez comment l'utiliser) :

```javascript
this.translate.get('Mon_Texte').subscribe((text : string) => {
  console.log('Texte traduit : ' + texte) ;
}
```
Cette fonction .get doit s'abonner et attendre la réponse pour que la traduction soit disponible.

Mais si vous faites ceci (exemple trop basique) :
```javascript
const tempTrans = '' ;
this.translate.get('My_text').subscribe((text : string) => {
  tempTrans = texte ;
}
console.log(tempTrans) // Vide
}
```
vous n'obtiendrez rien, car console.log n'attendra pas la réponse .get.

Il existe une autre façon de récupérer les traductions :
```javascript
const tempTrans = '' ;
console.log(this.translate.instant('Mon_texte')) ; 
```
Mais pour que cela fonctionne, vous devez précharger vos traductions au démarrage de l'application.

Et c'est la partie la plus délicate, car elle n'est pas expliquée dans la documentation officielle. Donc, en gros, voici ce que vous devez faire pour avoir des traductions instantanées dans votre application : précharger les traductions en utilisant la méthode .use().

Le problème est que la méthode est asynchrone (nous devons attendre le résultat). La meilleure façon de forcer l'application à attendre que "quelque chose" se termine avant de s'afficher est d'utiliser la fonction APP_INITIALIZER dans votre AppModule.

Vous devez ajouter le fournisseur suivant à la section des fournisseurs de votre AppModule :
```javascript
providers : [
  {
    fournir : APP_INITIALIZER,
    useFactory : appInitializerFactory,
    deps : [TranslateService],
    multi : true
  }
]
```
Et définissez la fonction de fabrique appInitializerFactory upper dans le même fichier :
```javascript
mport { APP_INITIALIZER } from '@angular/core' ;
import { TranslateService } de '@ngx-translate/core' ;
import { LOCATION_INITIALIZED } de '@angular/common' ;
export function appInitializerFactory(translate : TranslateService) {
  return () => {
    translate.setDefaultLang('es') ;
    return translate.use('es').toPromise() ;
  } ;
}
```
Maintenant l'application attendra l'initialisation des traductions avant de s'afficher pour l'utilisateur.

C'est tout, vous pouvez maintenant utiliser .instant sans problème.

Référence:
https://mcvendrell.medium.com/configuring-ngx-translate-to-load-at-startup-in-angular-1995e7dd6fcc
