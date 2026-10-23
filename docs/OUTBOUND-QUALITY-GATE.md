# Identité commerciale vérifiée et méthode de prospection

**Date de l'audit : 19 octobre 2026.** Les éléments proviennent de fichiers du dossier `~/jobs` existants. Il n'est pas nécessaire de fabriquer un autre profil, un CV générique ou un site vitrine avant d'avoir correctement exploité les preuves déjà disponibles.

## Documents trouvés sur le Mac

| Support existant | Chemin ou adresse vérifiée | Usage |
|---|---|---|
| LinkedIn professionnel | https://www.linkedin.com/in/guillaume-flambard | Présentation et vérification de l'expérience |
| GitHub personnel | https://github.com/guillaume-flambard | Preuve de code et de projets, à sélectionner pour le client |
| CV Fullstack & AI | `~/jobs/cv/Guillaume-Flambard-CV-Fullstack-AI.pdf` | CTO SaaS, intégrateur full-stack, mission React/Node |
| CV Agentic Systems | `~/jobs/cv/Guillaume-Flambard-CV-Agentic-Systems.pdf` | Entreprises intégrant des agents, LLM, outils ou API |
| Portfolio de prestations | `~/jobs/freelance/portfolio-malt-proposal.md` | Six réalisations présentées sur Malt depuis juillet 2026 |
| Modèle de prestation existant | `~/jobs/freelance/service-one-pager.md` | Source de contenu, mais à mettre à jour avant utilisation |

**Ne pas committer les CV, copies de signatures, contacts privés ou fichiers de correspondance dans ce dépôt.** Les CV restent dans `~/jobs`, dossier déjà gouverné par ses propres règles. Les liens publics peuvent être employés après vérification de disponibilité.

### Expérience professionnelle réellement documentée

Les deux CV disponibles citent environ **cinq ans de travail web en production**. Ils décrivent notamment Medsharing (SaaS clinique et tableaux de bord), Symbyoz (Next.js et API Symfony), Echo Travel (produit de réservation exploité), Memo Labs (outillage IA), et Blue Owl (produit IA). Ce sont des **affirmations du CV existant** et non une vérification indépendante des chiffres d'exploitation. Ne pas remplacer ces expériences par la seule mention de « fondateur de Memo Labs ».

**Contradiction géographique détectée :** les CV indiquent « EU citizen, no visa sponsorship needed; fully remote, or open to relocation within the EU ». Cette formule ne répond pas clairement aux futures prestations depuis la Thaïlande. Pour un contrat mondial, créer une **variante du CV adaptée au pays d'exécution** après vérification administrative, sans effacer le CV destiné aux postes basés en Europe.

**Autre différence importante :** le portfolio Malt de juillet présente Echo Travel, Emargo, Blue Owl, Largo IA, PayKit et EchoHub. Les études de cas Memo Bridge et Drop, plus récentes, sont pertinentes pour l'IA agentique. Elles ne doivent pas faire croire à des projets clients payants si ce sont des projets internes.

## Matrice preuve / acheteur / objection

| Acheteur | Preuve à choisir | Pourquoi le client y verrait un intérêt | Contrôle avant présentation |
|---|---|---|---|
| CTO SaaS React / Next.js | Echo Travel + CV Fullstack AI | Produit exploité, interfaces, APIs et intégrations paiement | Vérifier que le site est accessible et que les chiffres peuvent être cités |
| Directeur d'agence Make, n8n ou intégrations | Node n8n publié, PayKit ou exemple d'API, CV Fullstack AI | Complément de code TS/Node aux workflows, OAuth, webhooks, tests | Vérifier la page du package npm et la pertinence de la démo |
| Directeur engineering IA / FDE | Memo Bridge + CV Agentic Systems | Permission, gouvernance, intégration MCP et tests d'actions | Dire que c'est un outil interne; ne pas garantir zéro incident |
| Client santé / legacy | Expérience Medsharing + exemples de migration ou tests anonymisés | Familiarité des systèmes régulés, progression sans migration brutale | Confidentialité et droit de présenter les faits; aucune donnée clinique |
| Studio produit orienté UI | CV Fullstack AI + application démontrable (Echo Travel, éventuellement Drop) | Parcours de produit, backend, interface et expérience réelle | Drop demeure prototype; ne pas le décrire comme produit commercial établi |

Une preuve **doit être directement reliée au problème**. Envoyer l'ensemble des projets est généralement moins lisible qu'en choisir un pertinent. Une preuve interne suffit pour montrer du code; elle ne remplace pas une référence client.

## Pipeline d'acquisition corrigé, méthode BMAD

**Étape 1, Analyste :** identifier un besoin démontré, le décideur, le canal, une publication et sa date.

**Étape 2, Positionnement :** choisir **une seule offre** et sa correspondance au problème du client, pas une liste de frameworks.

**Étape 3, Preuve :** choisir un projet public qui démontre une compétence liée à ce besoin. Réviser le CV approprié pour une candidature.

**Étape 4, Message :** question d'intérêt ou de sous-traitance avec observation factuelle, proposition de valeur et preuve visible. Le message peut être bref. Il n'est pas acceptable qu'il ne dise pas **qui écrit, pourquoi, ce qu'il sait faire et où vérifier**.

**Étape 5, Contrôles obligatoires :**
- Destinataire professionnel et fonction pertinents, source de son adresse.
- Lien vers source primaire du signal, information du destinataire et absence d'invention.
- Recherche Gmail / candidatures dans `~/jobs` pour éviter un second message.
- Contrôle d'une opposition explicite à la prospection, y compris dans les fils précédents.
- Identité réelle, rôle, LinkedIn, GitHub et une **preuve cohérente** réellement cités dans le corps.
- CV PDF adapté disponible, lisible et joint pour **une candidature**; ne pas joindre automatiquement pour proposer une sous-traitance à une agence.
- Géographie, contrat et vidéo obligatoire vérifiés avant de **soumettre une candidature**; la Thaïlande ne sert pas d'accroche pour un premier mail froid à une agence.
- Texte relu avec la règle `humanizer`; aucun tiret cadratin ou demi-cadratin dans un message sortant.
- Identification de l'émetteur, information sur les coordonnées utilisées et **opposition simple et gratuite** en prospection B2B.

**Étape 6, Revue humaine avant envoi :** la commande de test ne dit jamais « SEND ». Elle renvoie seulement `BLOCKED` ou `READY_FOR_HUMAN_REVIEW`. Même un message qui passe le contrôle automatisé exige lecture du fil et validation humaine réelle. Un modèle ne doit **pas s'attribuer sa propre approbation**.

**Étape 7, Exécution :** seul l'envoi effectivement confirmé par Gmail ou l'ATS passe au statut `CONTACTED` ou `APPLIED`, avec pièce de preuve hors Git. Un brouillon n'est pas envoyé.

## Étude de méthodes pour éviter de confondre court et creux

- [Gong, analyse de plus de 28 millions d'emails, actualisée mai 2026](https://www.gong.io/blog/does-cold-email-even-work-any-more-heres-what-the-data-says) : des messages concis autour de 100 mots ou moins sont associés à davantage de réponses. Les messages qui parlent surtout du vendeur perdent en efficacité. Cela ne justifie pas d'enlever la preuve ou l'identité.
- [Gong, vente aux dirigeants, janvier 2026](https://www.gong.io/blog/do-execs-really-reply-to-cold-email-here-s-what-the-data-says) : centrage sur les priorités, contexte, preuve et offre. Une étude sur les cycles de vente de vendeurs B2B, pas directement sur des freelances indépendants.
- [CNIL, règles B2B au 10 juin 2026](https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique) : pertinence pour la fonction, information, identité et droit d'opposition gratuit et simple.

Le but n'est **pas** de forcer exactement 100 mots. Il est de condenser une proposition complète, avec des preuves adaptées à l'attention du lecteur. La prose commerciale doit être humaine, sobre et personnalisée.

## Utilisation du contrôleur

Fichier local explicitement fourni par le propriétaire, avec données de prospect **hors repo** :

```sh
node scripts/review-outbound.mjs /chemin/vers/un-message-prive.json
```

Le fichier synthétique `data/examples/outbound-good.synthetic.json` sert uniquement aux tests. **Aucune API Gmail et aucune commande d'envoi ne sont présentes dans ce script**. Un résultat favorable donne `READY_FOR_HUMAN_REVIEW`, jamais une autorisation d'envoi.

Pour les applications ATS, joindre le **PDF existant** adapté au rôle. La simple mention du chemin PDF n'établit pas une pièce jointe : le responsable doit vérifier réellement le fichier uploadé et l'accusé de réception.

## Suivi de la cohorte du 19 octobre

Altor, Oudini, symbolist. et AI Scaling ont déjà reçu un message le 19 octobre. Leur prochain contact éventuel est une **réponse dans le fil existant**, après relecture du contexte et absence d'opposition, jamais une nouvelle introduction envoyée en masse. Ne pas envoyer immédiatement quatre correctifs de présentation; préparer LinkedIn, CV et preuves pour la réponse ou une relance ultérieure appropriée.

**Défaillances des premiers messages :** lien de vérification absent ou insuffisant, spécialisation présentée sans preuve directement accessible, CV oublié sur la piste de recrutement, contraintes de résidence parfois placées avant la valeur. Le correctif consiste à installer ce contrôle systématique **avant chaque futur envoi**.
