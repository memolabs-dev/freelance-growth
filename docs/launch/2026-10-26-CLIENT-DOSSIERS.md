# Cahiers clients — préparation du lundi 26 octobre 2026

**Recherche du 24/10/2026.** Sources observées, hypothèses et inconnues séparées. Ce document n'est **pas** un cahier des charges validé par les acheteurs. Aucun envoi ni candidature effectué.

## Portefeuille à qualifier

| Priorité | Acheteur | Donnée publique vérifiée | Gate encore bloquant |
|---|---|---|---|
| 1 | **JUWA**, application terrain santé | Freelance au forfait, France à distance, Next/React/Node/Postgres, API tierce, projet multi-mois fin 2026. [Fiche primaire](https://juwa.co/reseau-experts/mission-developpeur-application-terrain-hds/) | Valeur du forfait/mandat, responsabilités HDS, capacité, conditions contractuelles |
| 2 | **Celaneo**, ingénierie agents | Freelance affiché **500 €/j**, TypeScript/Node/MCP/RAG, publié 12/10. [Fiche](https://www.collective.work/jobs/fr/senior-developpeur-fullstack-jsia-freelance-zhde) | « Télétravail, Hybride » contradictoire ; séniorité, Python, réel 100 % remote France |
| 3 | **Gamme solutions**, renfort SaaS | Publié 13/10, React/Next/Node/Postgres/Laravel, remote France. [Fiche](https://www.free-work.com/fr/tech-it/job-mission/developpeur-autre-langage-cobol-perl-vba-ruby-shell/developpeur-saas-senior-remote) | Freelance/CDI/CDD confondus, 3 ans min dans texte mais métadonnée 5–10 ans, 100–550 €/j non négocié |
| 4 | **ADDIXWARE**, Node/TypeScript cloud | Publié 01/10, remote intégral annoncé, Node/TS + Angular/AWS/ECS/Terraform. [Fiche](https://www.free-work.com/fr/tech-it/job-mission/developpeur-front-end-javascript-node-react-angular-vue/developpeur-node-js-f-h-28) | B2B réel, infra comme exigence, budget et doublon historique |
| Observation seulement | « Nourdine » / « Damien » relayés par Freelance Radar | [Next/Supabase](https://www.freelanceradar.co/d151975c-f5b4-4bcd-ba7d-39a53980ccf0) et [Node/React](https://www.freelanceradar.co/96960028-a8ca-4721-833c-8a95c344e75a) | Auteur véritable, client contractant, publication originelle, budget et statut non vérifiés |

## Dossier A — JUWA / application terrain avec données HDS

### Ce que JUWA affirme [PUBLIC]

Projet indépendant au **forfait**, piloté par un chef de projet JUWA qui gère client final et éditeur API. App terrain mobile-friendly, synchronisation avec un logiciel métier tiers, gestion des permissions, données sensibles et hébergement HDS, préproduction puis essai terrain. Next/React/Node/PostgreSQL ; démarrage fin 2026, plusieurs mois, **intégralement à distance depuis France**. Profil « confirmé » ; HDS expérience appréciée, pas présentée comme prérequis absolu. Recrutement par échange 30 min, échange technique, proposition écrite. Le [réseau d'experts](https://juwa.co/reseau-experts/) affirme avoir des clients engagés ; l'existence d'un **budget signé et disponible pour ce lot précis** reste inconnue.

### Hypothèse commerciale [À VALIDER]

Le chef de projet cherche surtout à **sécuriser une intégration API qu'il ne contrôle pas**, une interface utilisée en mobilité et une recette sérieuse, tout en gardant la relation client. Ne pas inventer d'incident existant ni de demande spécifique de « Proof Sprint ».

### Offre recommandée

**« Livraison du lot applicatif TypeScript de bout en bout, intégration API métier et recette reproductible. »** Proof-to-Production est une **méthode de livraison**, pas une certification santé ni un supplément non demandé. Démonstration sur environnement factice : action métier autorisée → appel REST → écriture confirmée ; variante 403/429/503 → aucun faux succès, traces redigées, test E2E. Ne pas montrer de vraies données de santé sans autorisation.

### Questions du premier échange (priorité)

1. **Budget / relation** : le client final a-t-il signé, JUWA est-il le donneur d'ordre contractuel, quel montant global ou fourchette **forfait HT** est prévu, et quelles modifications sortent du périmètre ?
2. **Capacité** : jours prévisionnels, sprint initial, échéance d'essai terrain, disponibilité contractuelle attendue, démarrage réel ?
3. **API** : sandbox/documentation de l'éditeur, quotas, auth, latences, mode offline, cas d'erreur, contrat d'API, propriétaire de l'intégration ?
4. **Utilisateurs** : rôles, permissions, appareils utilisés sur le terrain, conditions réseau, scénarios critiques et définition de succès à la recette ?
5. **Santé et RGPD** : responsable de traitement, DPA art. 28, données manipulées, sous-traitants autorisés, hébergeur **certifié pour les activités correspondantes**, stockage, administration, sauvegardes et restrictions d'accès.
6. **HDS évolutif** : référentiel 2.1 **annoncé** pour octobre 2026, publication/effectivité à revérifier, conditions d'accès depuis France/étranger ; propriétaire de chaque obligation ; pas de conseil juridique improvisé.
7. **Commercial** : jalons facturables, acompte éventuel, délai de paiement, RC Pro, propriété du code, acceptation et changement de périmètre, clause de sortie.

Sources sécurité : [ANS périmètres HDS](https://esante.gouv.fr/procedure-de-certification-hebergeur-de-donnees-de-sante), [ANS annonce HDS v2.1](https://esante.gouv.fr/actualites/referentiel-hds-v21-les-evolutions-anticiper-des-maintenant), [CNIL art.28](https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre4). **Le prestataire ne se présente pas comme hébergeur certifié HDS.** Aucune donnée sensible vers outils IA, VPS, observabilité ou SaaS non autorisés.

### Réponses crédibles sur ton parcours

Tu peux présenter ~4 années d'expérience React/JS/full-stack et une expérience salariée dans un contexte logiciel réglementé (Medsharing) **uniquement comme historique professionnel**, jamais comme nouveau prospect ni client de Memo Labs, et les travaux personnels Memo Bridge / n8n comme preuves de démarche. Ne pas prétendre avoir certifié un hébergeur HDS ou livré ce projet pour un client.

### Décision

**P1 à préparer lundi, HOLD SEND** jusqu'à : budget forfait suffisamment borné, responsabilités HDS partagées, preuve technique vérifiable, conditions de télétravail contractuelles, concordance du profil, contact et message approuvés. Si on attend d'une seule personne garantie juridique HDS + dev illimité + support production sans cadre : **NO-GO**.

---

## Dossier B — Celaneo / agents IA & MCP

**[PUBLIC]** [Collective.work](https://www.collective.work/jobs/fr/senior-developpeur-fullstack-jsia-freelance-zhde) indique 12/10/2026, freelance à **500 €/j** et **0 % de commission déclarée pour cette offre**, Node/TypeScript, MCP, RAG, agents, Claude Code, Docker, Python. Niveau senior/expert. Mode **« Télétravail, Hybride »**, donc aucune preuve du remote intégral.

**[HYPOTHÈSE]** L'acheteur veut fiabiliser un orchestrateur multi-agent, l'exécution d'outils et la maîtrise des permissions ; on ne peut pas présumer qu'un système fonctionne mal.

**Angle** : « ingénierie TypeScript/Node pour l'intégration et la fiabilité des agents : permissions, schémas d'outils, traces, tests métier et reprise ». Memo Bridge est un projet **interne/public**, pas une réalisation client.

**Questions** : Remote France sans aucune présence ? Python réellement indispensable ou Node TS accepté ? Quelle mission financée et quels livrables sur la période ? Niveau d'autonomie architecture attendu ? Données accessibles, modèles, règles de sécurité, mesure des erreurs, quota et acceptation ? Le tarif 500 €/j est-il contractualisé en B2B avec 0 frais ? Date début/durée ?

**GATE** : **HOLD_REMOTE + HOLD_SENIORITY** avant candidature ; aucun « expert IA en production client » inventé. Si on exige une expertise Python/ML ou une séniorité certifiée non démontrée : non.

---

## Dossier C — Gamme solutions / SaaS full-stack

**[PUBLIC]** [Free-Work](https://www.free-work.com/fr/tech-it/job-mission/developpeur-autre-langage-cobol-perl-vba-ruby-shell/developpeur-saas-senior-remote), 13/10 : Next/React/Node/Postgres/**Laravel**, mission longue 100 % remote, texte « minimum 3 ans » mais encart « 5–10 ans », contrat « freelance CDI CDD », rémunération « 100–550 €/j » et salaire annuel en parallèle. **Ne pas présumer 550 €/j disponibles.**

**[HYPOTHÈSE]** L'acheteur veut davantage de capacité produit SaaS et un dev autonome, pas un audit IA. **Offre** : Product Engineer embedded, capacité React/Next/Node/tests/DB, engagement par jours/mois. Laravel : dire la vérité sur le niveau.

**Questions** : Contrat indépendant effectivement ouvert ? Intermédiaire ou client final ? TJM réel / durée / nombre de jours / pays et matériel ? Laravel sur quel pourcentage du temps ? Senior = autonomie ou minimum ferme 5–10 ans ? Quelle roadmap initiale et recette existante ?

**GATE** : **HOLD_B2B, HOLD_RATE, HOLD_LARAVEL** ; ne pas présenter comme prêt à appliquer.

---

## Dossier D — ADDIXWARE / Node, TypeScript, cloud

**[PUBLIC]** [Free-Work](https://www.free-work.com/fr/tech-it/job-mission/developpeur-front-end-javascript-node-react-angular-vue/developpeur-node-js-f-h-28) (01/10) indique Node/TypeScript, UI, AWS ECS/Lambda/S3, Docker, Terraform, Angular et télétravail intégral. ESN. L'historique local ~/jobs comporte déjà des annonces ADDIXWARE au statut `new` ; déduplication requise.

**[HYPOTHÈSE]** Renfort fullstack mais forte composante infra. **Offre** : ingénierie Node/TS/API/product delivery ; ne pas promettre de prendre seul l'architecture Terraform/AWS ni une expertise Angular non démontrée.

**Questions** : B2B/contractor accepté ? Qui est client final et combien de fournisseurs le présentent ? AWS/Terraform essentiels ou DevOps partenaire ? Stack UI réelle, budget/J, durée, 100 % France confirmé, exigences de security clearance ?

**GATE** : **HOLD_CONTRACT, HOLD_CLOUD, HOLD_BUDGET** ; uniquement après clarification.

---

## Dossier E — appels directs relayés (veille, pas lead confirmé)

- [« Nourdine » Next.js/Supabase/Stripe](https://www.freelanceradar.co/d151975c-f5b4-4bcd-ba7d-39a53980ccf0) : ne pas créer de correspondance sans retrouver auteur/source d'origine, scope, budget, contrat.
- [« Damien » Node/React](https://www.freelanceradar.co/96960028-a8ca-4721-833c-8a95c344e75a) : nom complet, entreprise payeuse, budget et texte originel inconnus. Pas de message au hasard.

## Exclusions et preuve de non-contact

Dans l'historique précédent, Gmail `in:sent` ne retrouvait pas JUWA/Celaneo/Gamme/ADDIXWARE par nom, et ~/jobs ne montrait aucune candidature pour ces **missions précises**. **Cela ne prouve pas l'absence de tout contact sur tous canaux** : revérifier immédiatement avant envoi. KatchMe déjà candidate 22/09/2026 ; Beyond Skills/Techunt/Station F risquent d'être le même client. Nextcloud déjà contacté ; Oudini/symbolist. déjà contactés ; Medsharing déjà traité, Symbyoz et Adriver exclues.

Statuts autorisés dans ce kit : `RESEARCHED`, `QUALIFY_FIRST`, `HOLD`, `NO_GO`, `DRAFT_ONLY`. Aucun `SENT`, `APPLIED`, `SIGNED`, `PAID` sans preuve externe.
