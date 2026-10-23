# M2 — Qualification commerciale avant tout envoi

**Date de cadrage : 23 octobre 2026.** Source : branche `main` de `memolabs-dev/freelance-growth` au commit `888c2e7`, fichiers TSV et documents commerciaux, avec contrôle séparé des envois Gmail du 19 octobre. **Statut : préparation, aucun envoi autorisé par ce document.**

## 1. Décision

Le projet ne passe pas en phase « envoyer 13 messages ». Il passe en phase **réconciliation des données → validation des preuves → personnalisation → revue humaine de chaque message → pilote limité → mesure et apprentissage**.

Succès : obtenir des échanges qualifiés et, à terme, une première mission freelance B2B payante à distance. Les volumes d'emails sont des indicateurs secondaires, pas des résultats.

### Audit de cohérence chiffré

| Élément | Annonce M1+ | Données réellement présentes |
| --- | ---: | ---: |
| Prospects `data/prospects_shortlist.tsv` | 44 | **36** |
| Missions | 12 | **12** |
| Agences | 32 | **24** |
| Lignes `data/outreach_log.tsv` | 13 | **12** |
| Statuts `QUEUED` | — | **12**, aucun `CONTACTED` dans ce journal |
| Priorités de la shortlist | — | **11 P1 / 14 P2 / 11 P3** |

Aucune ligne ne sera inventée pour rejoindre les nombres annoncés. Toute nouvelle ligne réclame une source primaire et un contrôle des doublons.

**Historique extérieur au journal :** Gmail confirme des messages envoyés le 19 octobre 2026 à Oudini, symbolist., Altor et AI Scaling. Il ne faut pas confondre ces envois réels avec les brouillons du journal. Les références exactes aux conversations restent hors Git.

### Écarts bloquants

1. **Doublons :** Oudini et symbolist. figurent parmi les 12 brouillons alors que chacun a reçu un message le 19/10. Ne pas envoyer une deuxième introduction. Une éventuelle relance se prépare dans le fil initial, après relecture.
2. **Qualité :** les 12 corps de message ne comportent aucun lien de preuve directement consultable, ni signature professionnelle complète. Le nom, la preuve et la façon de vérifier sont souvent absents. `proof_attached` nomme seulement des fichiers : cela n'établit pas qu'ils ont été effectivement joints ou accessibles.
3. **Sources :** un référencement officiel Vercel, n8n ou Make démontre une expertise déclarée, pas un besoin de freelance ni une capacité de paiement pour sous-traiter.
4. **Preuves commerciales :** `CASE_STUDY_FULLSTACK.md` et `CASE_STUDY_AI.md` décrivent des scénarios de démonstration avec commandes et tests annoncés verts, mais les dépôts `subscription-demo` et `rag-doc-search` ne sont pas accessibles lors de la vérification du 23/10. **Ne pas les joindre, ni parler de livrables déjà réalisés sur leur seule base.**
5. **Géographie :** README, offre et stratégie restent centrés sur une exécution depuis la Thaïlande, ce qui est obsolète pour la prospection actuelle depuis la France. Retirer aussi les engagements chiffrés de chevauchement non établis.
6. **Plateformes :** Lemon.io et A.Team sont des dossiers / profils à qualifier puis compléter, pas des emails à « envoyer ». Askable a un historique `screened_out` dans `~/jobs`; vérifier la cause avant toute nouvelle démarche.

## 2. Positionnement unique à maintenir

**Français :** « Je renforce les équipes SaaS et les agences sur des fonctionnalités TypeScript/React/Node.js et des intégrations API/IA, de l'implémentation aux tests et à la mise en production. »

**English:** “I help SaaS teams and agencies deliver TypeScript/React/Node.js product features and API/AI integrations, including testing and production reliability.”

Deux portes d'entrée, pas un catalogue de services dans chaque email :
- **Product Engineering** : renfort React/Next.js/Node/PostgreSQL sur une fonctionnalité ou un produit en production.
- **API / AI integration** : connecteur ou API sur mesure, workflow fiable, intégration IA évaluée et instrumentée.

Ne pas s'annoncer expert certifié de Make/n8n/IA d'entreprise sans preuve. `n8n-nodes-opn` est un dépôt public réel, utile pour illustrer la conception d'intégrations. Memo Bridge est un projet interne à présenter précisément, sans ROI client inventé. Drop n'est pas une référence client, et Kollio est en SwiftUI, pas React. Les expériences professionnelles réelles, telles que documentées dans les CV, doivent rester visibles.

**Géographie commerciale :** travail à distance depuis la France, fuseau Europe/Paris, contractant B2B. Autres pays et exigences réglementaires à confirmer par contrat, sans réutiliser le discours « depuis la Thaïlande » par défaut.

## 3. Registre de décision sur les 12 brouillons M1+

| Cible | Nature | Décision M2 | Condition avant prochaine action |
| --- | --- | --- | --- |
| Oudini | Agence | **BLOQUER nouvel email** | Vérifier le fil envoyé le 19/10 et toute réponse ; éventuelle relance contextuelle, pas nouveau pitch |
| symbolist. | Agence | **BLOQUER nouvel email** | Idem, respecter refus/opposition |
| 9x | Make | Réécrire et qualifier | Confirmer site, bon décideur, preuve `n8n-nodes-opn`, canal, doublon Gmail |
| Operative | Make | Réécrire et qualifier | Identifier le module réel visé, vérifier sous-traitance plausible et interlocuteur |
| Together | Studio Next.js | Réécrire et qualifier | Choisir UNE preuve full-stack/produit pertinente et accessible |
| Lemon.io | Plateforme | Dossier, pas cold email | Vérifier conditions actuelles B2B, CV et portfolio, absence de candidature antérieure |
| A.Team | Plateforme | Dossier, pas cold email | Vérifier accès, tarif, demande réelle, portfolio et doublons |
| Askable | Plateforme | **SUSPENDRE** | Retrouver `screened_out` dans `~/jobs` et vérifier éligibilité |
| Blazity | Agence IA/Next.js | Réécrire et qualifier | Partenaire officiel vérifié ; aucune preuve de sous-traitance ; différencier l'apport sans expliquer à l'agence son propre métier |
| Azurally | Studio Next.js/IA | Réécrire et qualifier | Vérifier source, équipe/contacts, complément de delivery concret |
| Monogram | Studio AI | Réécrire et qualifier | Remplacer jargon « RAG, n8n/Make, observability » par une intervention précise et démontrable |
| TrueHorizon AI | Agence n8n | Réécrire et qualifier | Ne pas répéter ses métriques marketing comme preuve d'un besoin ; valeur complémentaire technique identifiable |

**Pilote envisagé :** 9x, Operative et Together en première vague; Blazity et Azurally seulement après revue des réponses et personnalisation. Monogram / TrueHorizon AI restent en réserve. Ceci est un ordre de préparation, **pas une liste autorisée à être envoyée**.

## 4. Gate de qualification « GO / NO-GO », prospect par prospect

Chaque dossier doit contenir les champs suivants **avant la revue humaine** :
- **Identité/canal :** entreprise et personne ou rôle nommés, adresse professionnelle obtenue licitement, source et lien primaire daté, pertinence du contact.
- **Besoin :** signal réel, ou hypothèse explicitement présentée comme telle. Un badge partenaire seul vaut `PARTNER_FIT`, pas `BUYING_INTENT`.
- **Offre :** un seul problème susceptible d'être pris en charge, périmètre initial réaliste, modèle de sous-traitance ou de mission compatible.
- **Preuve :** une réalisation réelle consultable avec lien testé et limites explicites (projet interne / client / prototype) ; aucune démo fictive, aucune commande non vérifiée présentée comme passée.
- **Historique :** Gmail, `~/jobs`, prospection existante, refus et listes d'opposition contrôlés. Toute introduction déjà envoyée ⇒ `NO_NEW_INTRO`.
- **Message :** prénom si avéré, observation ancrée, contribution concrète, identité, preuve, question simple, signature professionnelle et option d'opposition. Français ou anglais selon cible. Ton humain, phrases courtes, sans flatterie automatique ni empilement de technologies.
- **Modalités :** lieu de travail, type de contrat, budget et disponibilité compatibles ou posés en découverte; aucune promesse inventée.
- **Autorisation :** `READY_FOR_HUMAN_REVIEW` n'autorise jamais l'envoi. Seule l'approbation expresse du propriétaire **pour le destinataire et le texte final précis** permet un envoi manuel. Consigner l'accusé réel ensuite.

**NO-GO automatique :** doublon ou refus non résolu; destinataire inconnu; source non vérifiée; projet/preuve indisponible; candidature déjà rejetée sans motif clarifié; pays/contrat incompatible; message rédigé comme si l'agence manquait nécessairement de compétence; absence d'accord humain.

## 5. Qualité éditoriale : le style attendu

Remplacer « I build production-grade ... RAG, LLM APIs, n8n, permissions, evaluation, observability » par une seule phrase qui explique le service acheté. Ne jamais commencer par « votre travail est impressionnant » ou énumérer les chiffres marketing du prospect sans raison. Éviter l'anglais artificiel de type « AI/automation sprints or project overflow » s'il n'y a pas de proposition concrète. Dire qui écrit, pourquoi cette entreprise, quelle brique il peut prendre et pourquoi elle peut lui faire confiance. La demande doit porter sur la possibilité de collaborer, sans suggérer une douleur inventée.

### Exemple de ton (9x, NON ENVOYABLE sans personnalisation)

**Objet : API TypeScript en renfort de vos projets Make**

Bonjour [prénom vérifié],

J'ai vu que 9x intervient sur les automatisations SaaS et CRM avec Make. Quand un projet demande aussi une API ou un connecteur personnalisé, c'est le type de développement que je peux prendre en charge en renfort.

Je suis développeur full-stack TypeScript/Node.js. J'ai notamment publié un connecteur n8n que vous pouvez examiner ici : https://github.com/guillaume-flambard/n8n-nodes-opn

Travaillez-vous parfois avec des indépendants sur cette partie technique ?

Guillaume Flambard · Memo Labs
LinkedIn : https://www.linkedin.com/in/guillaume-flambard
GitHub : https://github.com/guillaume-flambard

[Informations d'origine des coordonnées et modalités d'opposition à adapter au canal utilisé.]

### Exemple de ton (Together, NON ENVOYABLE sans preuve validée)

**Subject: TypeScript product engineering support**

Hello [verified first name],

I saw that Together works on Next.js products for B2B teams. I'm a full-stack TypeScript engineer working across React, Node.js, APIs and automated testing.

If a client project needs an extra pair of hands on a clearly scoped feature or integration, I'd be interested in exploring a collaboration. Here's a relevant example of my work: [one verified, accessible link].

Do you ever work with independent engineers on delivery?

Best,
Guillaume Flambard · Memo Labs
LinkedIn: https://www.linkedin.com/in/guillaume-flambard
GitHub: https://github.com/guillaume-flambard

[Contact-source information and opt-out wording to fit the channel.]

## 6. Plan opérationnel — du 23 octobre au 2 novembre 2026

| Date | Travail | Sortie vérifiable / critère |
| --- | --- | --- |
| **Ven. 23/10** | Audit des chiffres, historique Gmail, contradictions des preuves et de la géographie | Tableau de blocages, aucun envoi |
| **Lun. 26/10** | Réconcilier source de vérité; vérifier CV, profils LinkedIn/GitHub, lien du connecteur; vérifier 9x/Operative/Together | 3 dossiers complets : source, acheteur, preuve, anti-doublon |
| **Mar. 27/10** | Humaniser 3 textes et préparer 2 autres dossiers (Blazity/Azurally) | 3 messages séparés `READY_FOR_HUMAN_REVIEW`, décision GO/NO-GO par message |
| **Mer. 28/10** | **Seulement après validation explicite** : pilote manuel de 2 ou 3 contacts sans doublon; compléter les dossiers Lemon.io/A.Team s'ils sont admissibles | Confirmation d'envoi externe, horodatage et suivi (ou 0 si non approuvé) |
| **Jeu. 29/10** | Qualifier les réponses et proposer un entretien de 20 min uniquement si intérêt réel | Question métier, budget, décideur, calendrier, contrat consignés |
| **Ven. 30/10** | Revoir les fils du 19/10 pour d'éventuelles relances pertinentes; ajuster la seconde vague à partir des retours | Pas de relance automatique / pas de nouveau mail à un contact déjà sollicité |
| **Lun. 02/11** | Revue M2: envois **réels**, réponses positives, conversations, exclusions, enseignements par canal | Décision argumentée sur vague 2 et prochaines candidatures |

**Cadence :** maximum 2–3 nouvelles introductions lors du premier pilote, puis itération. Les relances sont ponctuelles et décidées après relecture du fil (repère 5–7 jours ouvrés, non automatisé). Un contact sans budget confirmé ne devient pas une opportunité « chaude ».

## 7. Score de qualification (0–10), puis critères éliminatoires

Noter 0, 1 ou 2 pour chacun : (a) signal et fraîcheur vérifiables, (b) proximité technique avec une offre précise, (c) rôle/décideur atteignable, (d) adéquation plausible contrat/budget/remote, (e) preuve directe accessible. Un score **≥ 7** ouvre une revue éditoriale, **pas un envoi**. Une exclusion éliminatoire du §4 prime toujours sur le score. Ne pas confondre le P1 actuel (fit technique) avec un signal d'achat.

## 8. Suivi sans usine à gaz

Une ligne de pipeline = **une entreprise, une démarche commerciale, une prochaine action**. Journaliser séparément les brouillons et les emails réellement envoyés. Dans le suivi privé, lier la conversation Gmail / ATS, date de première sollicitation, date d'une éventuelle relance, réponses, refus, décideur, budget, prochaine étape. Pas de coordonnées personnelles dans Git.

### Indicateurs pour M2

- **Primaires :** conversations qualifiées, entretiens effectivement tenus, propositions demandées, première mission payante signée.
- **Intermédiaires :** dossiers complets / candidats uniques; messages validés / envoyés; taux de réponse positive; refus; candidatures admissibles.
- **Qualité :** 0 doublon, 0 preuve non vérifiée envoyée, 0 email présenté comme envoyé sans confirmation externe.
- **Décision au 2/11 :** si le pilote n'engendre pas de réponse, revoir d'abord l'hypothèse de besoin et la preuve, pas ajouter 20 agences dans un tableau.

## 9. Définition de « M2 prêt »

M2 n'est prêt que si le registre couvre réellement les 36 prospects (ou explique les ajouts), les 12 brouillons sont correctement classés, les géographies sont à jour, les liens et messages du pilote ont été vérifiés, les historiques email sont réconciliés, et le propriétaire a approuvé chaque texte précis. **Un test CI vert signifie seulement que le dépôt passe ses tests ; jamais que les messages sont bons ou que la campagne peut partir.**
