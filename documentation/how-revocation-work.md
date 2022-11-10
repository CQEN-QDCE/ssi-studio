## Demandes de présentation et intervalles de non-révocation
Cette section prescrit les normes et les meilleures pratiques dans la formulation et l'interprétation des intervalles de non-révocation sur les demandes de présentation.

### Sémantique de la présence et de l'absence d'intervalle de non-révocation
La présence d'un intervalle de non-révocation applicable à un élement demandé dans une demande de présentation signifie que le vérificateur exige une preuve de l'état de non-révocation de l'attestation fournissant cet élément.

L'absence d'un intervalle de non-révocation applicable à un élément demandé signifie que le vérificateur n'est pas intéressé par l'état de non-révocation de l'attestation fournissant cet élément.

Une attestation révocable ou non révocable peut satisfaire une demande de présentation avec ou sans intervalle de non-révocation. La présence d'un intervalle de non-révocation signifie que si le détenteur présente une attestation révocable, la présentation doit inclure une preuve de non-révocation. La présence d'un intervalle de non-révocation n'implique aucune restriction sur la révocabilité de l'attestation à présenter : dans de nombreux cas, le vérificateur ne peut pas savoir si l'attestation du détenteur est révocable ou non.

### Applicabilité de l'intervalle de non-révocation aux éléments demandés
Un élément demandé dans une demande de présentation est un attribut ou un prédicat, dont le vérificateur demande la présentation. Un intervalle de non-révocation dans une demande de présentation est spécifiquement applicable, généralement applicable ou inapplicable à un élément demandé.

Dans une demande de présentation, un intervalle de non-révocation de niveau supérieur est généralement applicable à tous les éléments demandés. Un intervalle de non-révocation défini en particulier pour un élément demandé est spécifiquement applicable à cet attribut ou prédicat demandé mais inapplicable à tous les autres.

Un intervalle de non-révocation spécifiquement applicable à un élément demandé prévaut sur tout intervalle de non-révocation généralement applicable : aucun élément demandé ne peut avoir les deux.

Par exemple, dans la demande de preuve suivante:
```json
{
    "name": "proof-request",
    "version": "1.0",
    "nonce": "1234567890",
    "requested_attributes": {
        "legalname": {
            "name": "legalName",
            "restrictions": [
                {
                    "issuer_did": "WgWxqztrNooG92RXvxSTWv"
                }
            ]
        },
        "regdate": {
            "name": "regDate",
            "restrictions": [
                {
                    "issuer_did": "WgWxqztrNooG92RXvxSTWv"
                }
            ],
            "non_revoked": {
                "from": 1600001000,
                "to": 1600001000
            }
        }
    },
    "requested_predicates": {
    },
    "non_revoked": {
        "from": 1600000000,
        "to": 1600000000
    }
}
```
l'intervalle de non-révocation sur 1600000000 est généralement applicable au référent "legalname" alors que l'intervalle de non-révocation sur 1600001000 est spécifiquement applicable au référent "regdate".
#### Sémantique des points de fin d'intervalle de non-révocation
Un intervalle de non-révocation contient les heures EPOCH "from" et "to" (nombre entier). Pour des raisons historiques, tout horodatage dans cet intervalle est techniquement acceptable dans une épreuve secondaire de non-révocation. Cependant, cette sémantique permet une ambiguïté dans les cas où la révocation a lieu dans l'intervalle, et dans les cas où le ledger supporte la réintégration. Ces meilleures pratiques exigent que la valeur "from", si le prouveur la spécifie, soit égale à la valeur "to" : cette approche favorise les résultats déterministes.

Une spécification "from" manquante prend par défaut la même valeur que la valeur "to" de l'intervalle. En d'autres termes, les intervalles de non-révocation
```json
{
    "to": 1234567890
}
```
et
```json
{
    "to": 1234567890
}
```
sont sémantiquement équivalents.

#### Formulation de l'intervalle de non-révocation du vérificateur
Le vérificateur DOIT spécifier, comme l'indique l'actuel [INDY-HIPE 11](https://github.com/hyperledger/indy-hipe/blob/main/text/0011-cred-revocation/README.md), le même temps [EPOCH](https://en.wikipedia.org/wiki/Unix_time) pour les deux valeurs de l'intervalle, ou bien omettre la valeur "from". En effet, lorsque la demande de présentation spécifie un intervalle de non-révocation, le vérificateur DOIT demander un instant de non-révocation.

#### Traitement de l'intervalle de non-révocation par le vérificateur
En interrogeant le registre de preuves pour connaître le statut de révocation, étant donné un intervalle de révocation sur un seul instant (c'est-à-dire, "from" et "to" sont identiques ou "from" est absent), le vérificateur DOIT interroger le registre de preuves pour toutes les mises à jour du statut de révocation pertinentes depuis sa création jusqu'à cet instant (c'est-à-dire de zéro jusqu'à la valeur "to") : si l'attestation a été révoquée avant l'instant, la révocation apparaîtra nécessairement dans le delta agrégé.

## Vérificateurs, propositions de présentation et demandes de présentation
Dans l'accomplissement du protocole "Present Proof" de la [RFC0037](https://github.com/hyperledger/aries-rfcs/blob/main/features/0037-present-proof/README.md), les détenteurs peuvent commencer par une proposition de présentation ou les vérificateurs peuvent commencer par une demande de présentation. Dans le premier cas, le détenteur a à la fois une proposition de présentation et une demande de présentation ; dans le second cas, le détenteur n'a qu'une demande de présentation.

#### Meilleures pratiques pour la sélection des attestations
Cette section spécifie les meilleures pratiques d'un détenteur pour faire correspondre une attestation à un élément demandé. La spécification concerne la sélection automatisée des attestations : évidemment, un utilisateur humain peut sélectionner n'importe quelle attestation en réponse à une demande de présentation ; c'est au vérificateur de vérifier que la présentation résultante est satisfaisante ou non.

Notez que lorsqu'un vérificateur sélectionne une attestation révocable pour l'inclure en réponse à un élément demandé avec un intervalle de non-révocation dans la demande de présentation, le vérificateur DOIT créer une sous-preuve de non-révocation correspondante à un horodatage dans cet intervalle de non-révocation (dans la mesure du possible ; voir ci-dessous).

##### Avec proposition de présentation
Si le détenteur a initié le protocole avec une proposition de présentation spécifiant une valeur (ou un seuil de prédicat) pour un attribut, et que la demande de présentation n'exige pas une valeur différente pour cet attribut, alors le détenteur DOIT sélectionner une attestation correspondante à la proposition de présentation, en plus de suivre les meilleures pratiques ci-dessous concernant la demande de présentation.

##### Préférence pour les justificatifs irrévocables
Conformément à la spécification ci-dessus, la présentation d'une attestation irrévocable constitue ipso facto une preuve de non-révocation. Les détenteurs DOIVENT toujours privilégier les attestations irrévocables aux attestations révocables, lorsque le portefeuille possède les deux satisfaisant un élément demandé, que l'élément demandé ait un intervalle de non-révocation applicable ou non. Notez que si un intervalle de non-révocation est applicable à l'élément demandé d'une attestation dans la demande de présentation, la sélection d'une attestation irrévocable pour la présentation peut conduire à un horodatage manquant chez le vérificateur (voir ci-dessous).

Si seuls des attestations révocables sont disponibles pour satisfaire un élément demandé sans intervalle de non-révocation applicable, le vérificateur DOIT les présenter comme preuve. Comme ci-dessus, l'absence d'un intervalle de non-révocation signifie que le vérificateur n'a aucun intérêt dans son statut de révocation.

### Vérificateurs, présentations et horodatages
Cette section prescrit les meilleures pratiques du vérificateur concernant une présentation reçue par ses horodatages par rapport aux intervalles de non-révocation de la demande de présentation correspondante.

#### Horodatage d'un justificatif irrévocable
L'inclusion par une présentation d'un horodatage relatif à une attestation irrévocable indique une falsification : le vérificateur DOIT rejeter une telle présentation.

#### Horodatage manquant
Une présentation sans horodatage pour un certificat révocable censé satisfaire un élément demandé dans la demande de présentation correspondante, lorsque l'élément demandé a un intervalle de non-révocation applicable, indique une falsification : le vérificateur doit rejeter une telle présentation.

Il est licite pour une présentation de ne pas avoir d'horodatage pour une attestation irrévocable : l'intervalle de non-révocation applicable est superflu dans la demande de présentation.

#### Horodatage en dehors de l'intervalle de non-révocation
Une présentation peut inclure un horodatage en dehors de l'intervalle de non-révocation applicable à l'élément demandé qu'un justificatif présenté est censé satisfaire. Si le dernier horodatage du registre de révocation d'un justificatif présenté est antérieur à l'intervalle de non-révocation, mais que l'horodatage n'est pas dans le futur (par rapport à l'instant de la preuve de la présentation, avec une tolérance raisonnable pour le décalage de l'horloge), le vérificateur DOIT enregistrer et poursuivre le processus de vérification de la preuve.

Tout horodatage dans le futur (par rapport à l'instant de la présentation de la preuve, avec une tolérance raisonnable pour le décalage de l'horloge) indique une falsification : le vérificateur DOIT rejeter une présentation avec un horodatage dans le futur. De même, tout horodatage antérieur à la création du registre de révocation de l'accréditation correspondante sur le grand livre indique une falsification : le vérificateur DOIT rejeter une présentation avec un tel horodatage.

## Dates et prédicats
Cette section prescrit les meilleures pratiques des émetteurs et des vérificateurs concernant la représentation des dates à utiliser dans les preuves de prédicats (par exemple, prouver qu'Alice a plus de 21 ans sans révéler sa date de naissance).

#### Dates dans les preuves
Pour que les dates puissent être utilisées dans une preuve de prédicat, elles DOIVENT être exprimées sous la forme d'un Int32. Bien que les timestamps unix puissent fonctionner, ils présentent plusieurs inconvénients : ils ne peuvent pas représenter les dates en dehors des années 1901-2038, ils ne sont pas lisibles par l'homme et sont trop précis dans la mesure où l'heure de naissance à la seconde près n'est généralement pas nécessaire pour une vérification de l'âge. Pour résoudre ces problèmes, les attributs de date DEVRAIENT être représentés par des entiers sous la forme AAAAMMJJ (par exemple 19991231). Cela permet de résoudre les problèmes liés aux horodatages Unix (ou tout autre système de secondes depuis l'époque) tout en permettant de comparer les valeurs de date avec les opérateurs < >. Notez que ce système ne fonctionnera pas pour les calculs généraux de dates (par exemple l'addition ou la soustraction de jours), mais il fonctionnera pour les preuves de prédicats qui nécessitent simplement des comparaisons. Afin d'indiquer clairement que ce format est utilisé, le nom de l'attribut DOIT avoir le suffixe _dateint. Étant donné que la plupart des bibliothèques de dates n'incluent pas ce format, voici quelques exemples de fonctions d'aide écrites en écriture standard.

#### Dates dans les présentations
Lors de la construction d'une demande de preuve, le vérificateur DOIT exprimer la date minimale/maximale sous la forme d'un nombre entier sous la forme AAAAMMJJ. Par exemple, si nous sommes le 1er janvier 2021, le vérificateur demandera que bithdate_dateint soit antérieure ou égale au 1er janvier 2000, donc <= 20000101. Le titulaire DOIT construire une preuve de prédicat avec une date de naissance représentée sous la forme YYYMMDD inférieure à cette valeur pour satisfaire la demande de preuve.

## Comprendre les intervalles de révocation
En regardant un intervalle de non-révocation sans connaître la logique sous-jacente, on pourrait penser que spécifier un intervalle de non-révocation signifie que l'attestation vérifiée ne doit pas avoir été révoqué durant ce laps de temps. Cependant, sur la base de l'implémentation d'Indy, l'intervalle de non-révocation devrait plutôt être interprété comme l'absence d'informations de révocation publiées par l'émetteur dans le laps de temps spécifié, pour l'attestation spécifiée.

Par exemple, l'attestation A1 est émise au moment T0. L'émetteur révoque l'attestation à l'instant T1 (et publie les informations de révocation sur le registre de preuve à cet instant également) et un vérificateur veut vérifier que l'attestation est valide pendant l'intervalle T2-T3, où T0 < T1 < T2 <=T3. La demande de preuve se lirait comme suit : de : T2 à : T3 et l'hypothèse serait que, dans l'intervalle de temps entre T2 et T3, l'attestation n'a pas été révoquée. Le problème survient lorsque la vérification entre en jeu, car le dernier horodatage de révocation publié T1 est en dehors de l'intervalle T2-T3 et donc la créance sera considérée comme non révoquée.

Donc, sur la base de l'exemple ci-dessus, puisqu'il est impossible (ou du moins pas trivial et pas cher en calcul) de savoir quand la dernière révocation a été publiée par un émetteur sur le registre de preuves, ou au moins quand la première révocation a été publiée par l'émetteur sur le registre de preuves, omettre complètement de et considérer l'intervalle comme un point dans le temps spécifié par "to" est ce qui sera le cas d'utilisation le plus commun. Et sur la base de l'exemple ci-dessus, il n'est PAS possible de vérifier si l'attestation était valide pendant une période entière et bien définie, car les décalages entre la période et la dernière révocation publiée entraîneront des faux négatifs.

Référence
https://github.com/hyperledger/aries-rfcs/tree/main/concepts/0441-present-proof-best-practices
https://github.com/hyperledger/aries-cloudagent-python/issues/1020
