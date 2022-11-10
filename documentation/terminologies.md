# Terminologies

### Agent

Un agent, dans le contexte de l'identité auto-souveraine, agit en tant que délégué d'une identité individuelle ; détient des clés cryptographiques pour prouver cette responsabilité ; et interagit avec d'autres agents.

_Référence : https://github.com/hyperledger/aries-rfcs/tree/master/concepts/0004-agents_

### DID

Les identifiants décentralisés (DID) sont un nouveau type d'identifiant qui permettent une identité numérique vérifiable et décentralisée.
Un DID identifie tout sujet (par exemple, une personne, une organisation, une chose, un modèle de données, une entité abstraite, etc.) que le contrôleur du DID décide d'identifier.

Référence : https://www.w3.org/TR/did-core/_

### DIDComm

Il s'agit du protocol de communication entre les [agents] (#agent).

_Référence : https://github.com/hyperledger/aries-rfcs/tree/master/concepts/0005-didcomm#motivation_

### Document DID

Un ensemble de données décrivant le sujet DID, y compris les mécanismes, tels que les clés publiques et les données biométriques pseudonymes, que le sujet DID ou un délégué DID peut utiliser pour s'authentifier et prouver son association avec le DID.
Un document DID peut également contenir d'autres attributs ou revendications décrivant le sujet DID.

Référence : https://www.w3.org/TR/did-core/#dfn-did-documents_

### Détenteur

Également connu sous le nom de prouveur, un détenteur est l'entité à laquelle un [émetteur](#émetteur) délivre une créance. Bien que le détenteur puisse demander ou proposer qu'un justificatif lui soit délivré, il n'est pas toujours le sujet du justificatif. 

Dans le flux [PresentProof](./00_what_is_hl_aries.md#8-presentproof-protocol), le prouveur prépare la preuve et la présente au [verifier](#verifier).

### Émetteur

L'entité qui émet une [attestation](#verifiable-credential) à un détenteur.

### KMS

C'est l'abréviation de service de gestion des clés (Key Management Service). Il est chargé de stocker en toute sécurité les informations sensibles de l'agent, telles que les clés privées, les secrets et autres données privées.

_Référence : https://github.com/hyperledger/aries-rfcs/tree/master/concepts/0440-kms-architectures_

### Médiateur

Un médiateur est un participant à la transmission de messages d'agent à agent. Il peut être considéré comme un routeur avec des fonctions de boîte aux lettres qui ne peuvent pas lire le contenu crypté des messages acheminés.

Référence : https://github.com/hyperledger/aries-rfcs/blob/master/concepts/0046-mediators-and-relays/README.md#summary_

### VDRI

Interface permettant de vérifier les données par rapport à une base de données fiable, telle qu'un grand livre ou une base de données. Un rôle qu'un système pourrait jouer en servant d'intermédiaire pour la création et la vérification de données pertinentes qui pourraient être nécessaires pour utiliser des [certificats vérifiables](#verifiable-credential).

Référence : https://www.w3.org/TR/vc-data-model/#dfn-verifiable-data-registries_

### Attestation

Une attestation peut représenter les mêmes informations qu'une attestation physique. Il s'agit d'une pièce d'identité inviolable dont l'auteur peut être vérifié par cryptographie.
Les cartes d'identité numériques d'employés, les certificats de naissance numériques et les certificats d'études numériques sont des exemples de justificatifs vérifiables.

Référence : https://www.w3.org/TR/vc-data-model/#what-is-a-verifiable-credential_

### Présentation vérifiable

Une présentation vérifiable exprime des données provenant d'un ou de plusieurs justificatifs vérifiables, et est conditionnée de manière à ce que la paternité des données soit vérifiable.

Référence : https://www.w3.org/TR/vc-data-model/#presentations_

### Vérificateur

Il s'agit de l'entité qui fait une demande de [créance](#créance vérifiable) ou de preuve auprès d'un [détenteur](#détenteur) et qui la vérifie.

Référence : https://github.com/hyperledger/aries-rfcs/tree/master/features/0454-present-proof-v2#roles_

Traduit avec www.DeepL.com/Translator (version gratuite)
