# Post-mortem de la première cohorte commerciale (19 octobre 2026)

**Périmètre :** quatre messages réellement envoyés le 19 octobre : Altor, Oudini, symbolist. et AI Scaling. Les textes ont été relus après envoi depuis Gmail. **Aucun nouveau message ni correction de masse n'a été envoyé** pendant cet audit. Les destinataires précis, IDs de messages et fils Gmail restent dans le suivi privé du Vault.

## Verdict

Les quatre messages avaient une question compréhensible, mais **aucun ne donnait un lien direct vers LinkedIn ou GitHub, et aucun ne pointait vers une réalisation technique précise**. Ils se limitaient donc largement à une liste de technologies et une demande de collaboration. Les messages de prospection froide ne proposaient pas clairement de moyen simple de refuser une nouvelle sollicitation.

Les preuves existaient pourtant déjà dans `~/jobs/cv/`, le portfolio Malt et les dépôts personnels.

| Segment | C'est ce qui manquait réellement | Ce qui aurait dû être fourni | Action maintenant |
|---|---|---|---|
| **Altor**, contact existant AI/FDE | Aucune preuve accessible et pas de CV associé au recruteur | CV Agentic Systems ou une introduction reliant le rôle à Memo Bridge, LinkedIn et GitHub | Ne pas doubler le premier email. Si réponse, envoyer le CV adapté et une démonstration pertinente |
| **Oudini**, agence API | Pas de profil cliquable ni de preuve de développement Node/API | CV non obligatoire; un projet API pertinent, un lien GitHub, une formule de valeur spécifique et une signature | Attendre le retour; pour une relance future, la justifier par une preuve spécifique |
| **symbolist.**, agence IA et Make | Pas d'identité professionnelle vérifiable ni de preuve d'intégration; Thaïlande citée dans un premier contact froid | Lien LinkedIn, cas de workflow/TS réel, une question sur leur recours aux freelances; pays après intérêt | Pas de second email immédiat; préparer une réponse utile |
| **AI Scaling**, annonce contrat | Pas de CV ni de liens LinkedIn/GitHub dans une question d'éligibilité; argument technique trop abstrait | Profil Agentic Systems, cas Memo Bridge, et question géo/horaire comme contrainte à lever | Attendre leur réponse avant candidature; ne pas simuler une candidature envoyée |

## Ce qui est acceptable, ce qui ne l'est pas

**Acceptable :** un email court, même sous 100 mots, quand il contient une référence précise au travail du client, une phrase claire sur la valeur livrable, une preuve cliquable, une identification et une question à faible friction.

**Inacceptable :** « Je suis développeur TS/React/Node, faites-vous appel à des indépendants ? » sans contexte vérifié ni preuve; identité du destinataire approximative; faux clients; promesse de ROI; manque de suivi des oppositions; candidature sans CV adapté; suivi qui confond brouillon et email envoyé.

## Réparation sans harcèlement

1. Ne **pas** envoyer aux quatre entreprises de nouveaux emails uniquement pour ajouter CV et LinkedIn.
2. Préparer des réponses contextualisées en reprenant le fil de conversation et l'intérêt réel si le contact répond.
3. Pour une éventuelle relance à délai raisonnable, **apporter un élément nouveau**, vérifier les messages reçus, les refus et l'historique; pas de séquence programmée automatique.
4. Contrôler et corriger la ligne géographique des CV destinés aux contrats internationaux avant d'envoyer un PDF, sans falsifier la résidence, le visa ou le droit au travail.
5. Lancer le nouveau contrôleur `scripts/review-outbound.mjs` et faire une **revue humaine réelle** avant toute prise de contact suivante.

## Lien aux recherches

- [Gong, étude 28M+ cold emails, révisée 2026](https://www.gong.io/blog/does-cold-email-even-work-any-more-heres-what-the-data-says). Concision, pertinence et priorités acheteur. Les taux observés concernent des équipes de vente B2B, non un profil indépendant identique.
- [Gong, executives, janvier 2026](https://www.gong.io/blog/do-execs-really-reply-to-cold-email-here-s-what-the-data-says). Preuve et proposition de valeur adaptée.
- [CNIL, 10 juin 2026](https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique). En prospection B2B, intérêt légitime sous conditions, pertinence, information, identité et opposition simple.

**Critère d'apprentissage** : la première cohorte comporte quatre envois constatés. Le compteur d'entretiens, devis et signatures ne peut augmenter qu'après des événements réellement observés.
