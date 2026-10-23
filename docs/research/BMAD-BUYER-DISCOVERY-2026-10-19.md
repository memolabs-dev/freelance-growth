# BMAD Buyer Discovery : 10 agences sur lesquelles tester une prestation

**Date d'accès : 19/10/2026.** Revue de pages d'agences ou de profils d'écosystème Make, Vercel et France Num. [Registre TSV sourcé](../data/bmad-buyer-accounts-2026-10-19.tsv).

## Décision commerciale

**Ne pas confondre quatre niveaux de preuve :**
1. Une entreprise est réelle, attestée par un site / annuaire officiel.
2. Elle vend des services pertinents (premier signal de compatibilité).
3. Elle livre des projets clients (preuve plus forte d'activité).
4. Elle **souhaite acheter de la sous-traitance freelance** et autorise un exécutant depuis la Thaïlande (**aucune des dix entreprises n'est à ce niveau de preuve**).

**Résultat:** dix comptes plausibles à qualifier. **Aucun marché confié, aucune demande de devis, aucun recrutement de prestataire confirmé.** Une page « partenaire » n'est pas une annonce freelance. Les dossiers ne justifient ni scraping de contacts ni envoi automatique.

## Pistes A1 : référence client explicite ou positionnement directement pertinent

### 1. Oudini, agence intégration SaaS France

**Source primaire :** [fiche France Num, mise à jour le 12 octobre 2026](https://www.francenum.gouv.fr/activateurs/oudini). France Num cite l'application Make officielle de Pennylane (23 modules), intégration Zapier et automatisations e-commerce sur Shopify / ERP / transporteurs, avec des cas tels qu'Un amour de Tapis (2026) et Casanova (2025).

**Acheteur à contacter après validation :** Samy Tounsi, fondateur, nommé dans la fiche professionnelle officielle. **Hypothèse testable :** sur les connecteurs plus complexes ou l'interface produit, Oudini pourrait avoir intérêt à sous-traiter un bloc API/Node.js/TypeScript avec tests plutôt qu'agrandir son équipe. Mais l'agence revendique elle-même une forte compétence d'intégration, donc **ce besoin reste incertain**.

**Approche :** « J'ai vu votre travail sur le connecteur Pennylane et vos flux Shopify. Si un projet nécessite une brique Node/TS spécifique, est-ce que vous sous-traitez parfois une partie du développement ? » Ne pas prétendre que Pennylane a un bug. **Thaïlande : VERIFY**.

### 2. symbolist., agence Make et IA française

**Sources :** [cas clients publics](https://www.symbolist.ai/cas-clients) et [offre Make détaillée](https://www.symbolist.ai/agence-make-partenaire). Références TRIBEE, CEPI, BEWE et scoring commercial IA. L'agence annonce 35 h gagnées mensuellement sur un workflow Make + Claude; chiffre **autodéclaré par le prestataire**, pas une mesure vérifiée indépendamment.

**Acheteur potentiel :** direction delivery / responsable technique ou fondateur identifié via le site officiel, pas une identité inventée. **Hypothèse :** lorsque Make ne suffit pas, besoin possible de code TypeScript, permissions et intégrations fiables. **Contre-argument :** l'agence documente déjà versioning, support et reprises d'erreurs, donc il faut offrir une compétence complémentaire, pas expliquer les bases de Make.

**Question :** « Quand un client nécessite une API spécifique ou un composant React autour de vos scénarios, vous travaillez avec des développeurs externes ? » **Thaïlande : VERIFY**.

### 3. Together, studio B2B tech européen

**Source :** [fiche officielle Vercel](https://vercel.com/partners/solution-partners/together). Together présente le projet **G-P**, avec nouvelle offre, site et travail ultérieur sur la recherche/conception/développement d'un produit IA. Vercel décrit une équipe de plus de 30 personnes entièrement à distance.

**Acheteur :** direction engineering/delivery. **Hypothèse :** renfort Next.js + backend TS sur un périmètre de fonctionnalité IA. **Contre-argument :** leur équipe interne multidisciplinaire peut suffire et le travail remote de l'agence ne signifie pas qu'elle embauche en Thaïlande. **Thaïlande : VERIFY**.

### 4. 9x, intégrateur Make, Allemagne/France

**Source primaire :** [étude de cas Make du 17 juin 2024](https://www.make.com/success-stories/9x-and-power-of-no-code-automation). Le client nommé **Circula** exploitait plus de 120 scénarios Make et environ 140 000 opérations mensuelles avec plus de 25 outils. **Historique 2024**, pas un projet 2026.

**Acheteur :** fondateur/delivery, rôle à confirmer. **Hypothèse :** flux multi-outils, données et API présentent des cas où des tests de non-régression et modules Node/TS seraient utiles. **Contre-argument :** 9x mise fortement sur les solutions no-code et les compétences des équipes clientes; l'ajout de code peut heurter son modèle. Tester avant d'investir.

### 5. Thorium Digital, studio CMS et Vercel

**Source :** [fiche partenaire Vercel](https://vercel.com/partners/solution-partners/thorium-digital). Projets Diageo (migration d'écosystème historique de plus de 200 sites), Galaxy (Next.js, CI/CD), Altaris Capital (Next.js, Contentful, Vercel). Prestations publiées de QA post-migration et maintenance.

**Acheteur :** engineering/delivery. **Hypothèse :** sous-traitance de QA, tests CI, migration front et API dans le cadre d'un périmètre plus grand. **Contre-argument :** Thorium vend déjà ces services, le rôle serait un renfort occasionnel, pas une expertise manquante. **Thaïlande : VERIFY**.

## Pistes A2 : activité bien attestée, sous-traitance moins évidente

### 6. Fifty Tech Solutions

**Source :** [profil partenaire Make](https://www.make.com/partners-directory/fifty-tech-solutions). Décrit des automatisations monday.com, CRM, Xero et finance avec résultats commerciaux revendiqués. Nom du fondateur Kofi Danso public. La fiche mentionne une livraison principalement assurée par le fondateur lui-même : une collaboration pourrait être intéressante en charge de pointe, mais la préférence pour une exécution personnelle est un **contre-signal**.

### 7. Lab Digital

**Source :** [Vercel Solution Partner](https://vercel.com/partners/solution-partners/lab-digital), projet **Knives & Tools** sur architecture e-commerce composable, MACH Composer, commercetools et AWS. Acheteur pressenti : responsable engineering/delivery. Offre possible : modules Next.js et intégration front/back sur une migration. **Contre-signal :** agence disposant de ses propres équipes d'ingénierie.

### 8. Operative

**Source :** [fiche partenaire Make](https://www.make.com/partners-directory/operative), décrit des intégrations API et applications web, Shopify et Stripe. Les compétences API sont **déjà vendues** par cette agence; l'unique hypothèse raisonnable est un besoin d'appoint sur du React/TS, à demander directement. Pas de projet client nommé dans cette fiche.

### 9. Nexautomations

**Source :** [fiche partenaire Make](https://www.make.com/partners-directory/nexautomations), annonce plus de 1 200 automatisations chez plus de 210 clients, IA, données, webhooks et gestion d'erreurs. Ces nombres sont **fournis par l'agence dans son profil**, non audités. Acheteur : fondateur identifié publiquement dans la fiche. Offre possible : QA, API backend et tests des workflows. **Contre-signal :** maîtrise déjà revendiquée sur ces sujets.

### 10. OH-SO Digital

**Source :** [fiche Vercel](https://vercel.com/partners/solution-partners/oh-so-digital), agence européenne Next.js, expérience automobile, projets digitaux et intégrations natives IA. Acheteur pressenti : engineering/delivery. Offre possible : renfort sprint Next.js + produit IA. Pas de mission, budget ni besoin d'externaliser annoncé.

## Matrice BMAD de qualification

| Gate | Preuve actuelle | Information à obtenir avant proposition |
|---|---|---|
| Entreprise et spécialisation | **Oui**, sources officielles pour les dix | Actualité du projet et rôle du décideur |
| Références projet nommé | Oudini, symbolist., Together, 9x, Thorium, Lab Digital ont des références identifiables | Projet actif avec financement ou délai de livraison actuel |
| Besoin d'un freelance externe | **NON établi partout** | Réponse du décideur sur la sous-traitance |
| Budget et tarif | **NON établi partout** | Budget projet ou grille freelance et pays de facturation |
| Contrat depuis Thaïlande | **NON établi partout** | Consentement client et règle de sécurité des données |
| Droit d'écrire au contact | Non encore vérifié | Contact professionnel approprié, respect CNIL/opposition |
| Relation préalable et doublons | Non vérifiés pour les dix | Vérification des contacts et conversations déjà tenus |

## Prochain test commercial

Les cinq **A1** ci-dessus sont les premières hypothèses à valider. Pour chacune, identifier un responsable commercial ou delivery **public**, rédiger un message de quatre à six lignes avec la référence exacte et demander seulement si l'agence achète occasionnellement un renfort TypeScript/API/QA. La question géographique vient dès qu'un besoin réel apparaît, **avant** toute proposition détaillée. Les cinq **A2** servent de groupe de comparaison si les premiers signaux sont faibles.

**Décision actuelle :** RESEARCH COMPLETE, PROSPECTS UNCONTACTED, BUDGET UNKNOWN, THAILAND UNVERIFIED. La métrique suivante n'est **pas le nombre d'agences trouvées**, mais le nombre de conversations qualifiées et la demande explicite de devis.

Ce rapport suit BMAD Deep Recon : preuves primaires > hypothèses > contradictions > décision GO/NO-GO > test mesurable. Aucune communication n'a été envoyée pendant sa préparation.
