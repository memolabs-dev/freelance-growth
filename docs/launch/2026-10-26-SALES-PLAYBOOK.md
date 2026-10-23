# Playbook commercial — lundi 26 octobre 2026

**Document d'entraînement et de préparation.** Aucun échange, proposition ni envoi n'est supposé réel. Toute formulation externe doit être adaptée aux faits vérifiés du client, au statut de la mission et à l'historique, puis **approuvée sur canal+destinataire+texte**.

## 1. Positionnement à utiliser selon l'intention d'achat

| Intent de l'acheteur | Pitch oral de 15 secondes | Première offre | Piège à éviter |
|---|---|---|---|
| Projet client financé à réaliser | « Je prends un lot React/Node/API de bout en bout, avec intégration, gestion des erreurs et recette vérifiable. » | Renfort produit / lot de delivery | Vendre un audit alors qu'il veut un développeur |
| Agence avec sous-traitance | « Votre chef de projet garde la relation client ; je prends en charge un périmètre TypeScript documenté et validable. » | Livraison sous-traitée au forfait borné ou TJM | Se présenter comme agence concurrente |
| Orchestration IA/MCP existante | « J'aide à intégrer les agents dans un vrai produit, avec permissions, traçabilité et validation des actions. » | Intégration/fiabilisation agentique | Se revendiquer chercheur ML ou expert Python |
| Release qui échoue malgré CI verte | « Choisissez un parcours critique : on le rejoue, on reproduit l'échec et on vous laisse un contrôle durable. » | Proof Sprint **si** pain, budget et environnement existent | Promettre « zéro bug » ou audit gratuit complet |

**Formule unique derrière les offres :** « une fonctionnalité métier livrée avec des preuves reproductibles », **pas** une marque ou plateforme IA supplémentaire.

## 2. Entretien de découverte 20 minutes — conducteur

| Temps | Ce qui se passe | Questions littérales | Ce que tu écris |
|---|---|---|---|
| 0–2 min | Alignement | « Quel livrable voudriez-vous avoir dans 4–6 semaines et pour qui ? » | Résultat en langage client |
| 2–5 min | Déclencheur | « Qu'est-ce qui a créé ce besoin maintenant ? Que se passe-t-il si la mission commence un mois plus tard ? » | Urgence observée, pas inventée |
| 5–9 min | Produit | « Quel parcours complet doit fonctionner ? Quelle API externe, quels utilisateurs, quelles données ? » | Un scénario métier + contraintes |
| 9–12 min | Risque | « Quand ça échoue aujourd'hui, comment le voyez-vous et qui intervient ? Avez-vous un environnement de test représentatif ? » | Mesure existante, signaux |
| 12–15 min | Achat | « Qui valide le budget et le contrat ? Avez-vous prévu une enveloppe ou un TJM ? Quelle durée et quels jours ? » | Acheteur, budget, calendrier |
| 15–17 min | Cadre | « C'est bien une mission indépendante, 100 % remote depuis la France ? Y a-t-il une visite obligatoire, des accès sensibles ou une habilitation ? » | Hard gate |
| 17–20 min | Décision | « Si l'on cadre un premier lot avec des critères de recette, qui décide et à quelle date ? » | Prochaine étape consentie |

### Mode opératoire anti-théâtre
- Poser une seule question à la fois, écouter, et reformuler le problème avec les mots du client.
- Si besoin pas financé, le classer **exploratoire**, pas vendre un devis comme s'il avait un mandat.
- Si remote ou profil incompatible, décliner courtoisement, sans négocier une condition absolue.
- Ne donner aucun accès à des dépôts, données clients ou outils externes pendant une « démo découverte ».
- Après l'appel, rédiger **un compte rendu avec faits cités / inconnus / prochaines actions consenties**. Ne pas marquer DEAL avant contrat signé.

## 3. Entretien technique JUWA — questions probables et réponses honnêtes

**Q : Vous avez déjà livré une plateforme HDS certifiée ?**

> « J'ai travaillé dans un contexte applicatif soumis à des exigences de traçabilité et de confidentialité. Je ne me présente ni comme hébergeur HDS certifié, ni comme auditeur juridique. Pour ce projet, je commencerais par une matrice des responsabilités, le périmètre du prestataire HDS sélectionné et les instructions de traitement validées avec votre responsable. »

**Q : Comment sécuriser une API que nous ne contrôlons pas ?**

> « Je veux d'abord sa documentation, sa sandbox et les erreurs possibles. Ensuite je propose un client typé, des timeouts, des contrôles explicites de statut, des tests d'intégration, et une gestion d'idempotence/retry uniquement si les opérations la permettent. L'interface ne confirme jamais une mutation métier avant d'avoir une preuve d'exécution. »

**Q : Comment testez-vous que l'application fonctionne en situation de terrain ?**

> « Je transforme un vrai parcours utilisateur en critères de recette. On teste les rôles, le réseau lent/interrompu, l'échec d'une dépendance, la session expirée et l'action métier confirmée. Les scénarios E2E et les limites restent consultables par le chef de projet. La validation terrain ne se remplace pas par une CI verte. »

**Q : Pourquoi vous plutôt qu'un développeur confirmé plus expérimenté ?**

> « Mon angle est de prendre une responsabilité complète sur un lot TypeScript — interface, API, données, intégration et tests — avec des critères de recette partagés. Je peux démontrer mon approche sur des projets personnels, pas prétendre à des missions clients que je n'ai pas réalisées. À vous de juger cette preuve par rapport au périmètre. »

**Q : Quel forfait pour toute l'application ?**

> « Sans détails API, parcours, hébergement, dépendances ni recette, un forfait global serait peu fiable. Je peux proposer un lot initial borné de cadrage/vertical slice payé, puis un devis par lots assortis de critères d'acceptation et d'une procédure de changement de périmètre. »

## 4. Entretien technique Celaneo — questions probables

**Q : Que signifient MCP et contrôle des tools ?** Répondre : identifier l'outil, valider le schéma d'entrée, réduire les permissions, limiter les effets secondaires, journaliser les décisions sans secrets ni données inutiles, assurer idempotence / approbation pour opérations sensibles, tester refus et erreurs. **Distinguer ce qui a été réellement implémenté de ce qui reste conceptuel dans Memo Bridge.**

**Q : Comment éviter une fausse réussite agentique ?** Affirmer l'état réel seulement à partir d'une réponse/outcome de l'API, traiter timeouts et incertitude, tests de comportement + E2E, corrélation trace request→tool→result, sandbox. Ne pas promettre l'infaillibilité du LLM.

**Q : Quelle expérience Python ?** Réponse factuelle : dominante JS/TS/Node, Python selon projets/connaissances *vérifiées*, ne jamais prétendre à une profondeur qu'on ne peut montrer.

**Q : Avez-vous déjà déployé pour un client IA externe ?** Si aucun cas client vérifiable, dire directement : « mes preuves récentes sont des projets internes/personnels ; je peux montrer architecture et tests, pas des métriques de revenus clients ».

## 5. Objections et négociation — répliques

| Objection | Réponse courte | Frontière |
|---|---|---|
| « Vous n'avez que quatre ans » | « Oui ; voilà le périmètre que je maîtrise et une réalisation vérifiable, sans gonfler le CV. » | Refuser si 8 ans impératifs |
| « Une agence peut le faire moins cher » | « Comparons ce qui est livré et accepté : intégration, erreurs, tests, documentation et transfert. Je ne promets pas de meilleur ROI sans vos chiffres. » | Prix non garanti |
| « Commencez gratuitement par l'audit » | « Je peux faire une courte découverte pour cadrer. L'inspection du code et l'intervention sur le produit constituent un travail à devis. » | Aucun audit gratuit sans limite |
| « On est 100 % remote mais parfois sur site » | « Dans ce cas ce n'est pas compatible avec ma contrainte actuelle ; je préfère vous le dire immédiatement. » | France 100% remote stricte |
| « Garantissez la conformité RGPD/HDS » | « Je peux implémenter les contrôles prévus et fournir des preuves de tests ; la validation de conformité relève des responsabilités et experts désignés. » | Ne pas certifier |
| « Acceptez 300 €/jour » | « Je peux examiner un lot plus petit à un budget fixe, mais pas promettre le même volume de travail à un prix incompatible. » | Pas de discount illimité |
| « Vous facturez avant mise en production ? » | « Je recommande des jalons acceptables et facturables correspondant à des livraisons observables ; le calendrier doit être convenu dans le contrat. » | Pas d'acompte acquis par défaut |
| « Pouvez-vous utiliser notre base réelle pour une démo IA ? » | « Pas sans cadre écrit, autorisations, environnements et fournisseurs approuvés ; je peux commencer sur données factices. » | Données sensibles protégées |

## 6. Textes de candidature personnalisés — DRAFT ONLY

**Tous les textes ci-dessous sont prêts à être relus, pas « envoyables » sans validation finale.** Remplacer uniquement par faits vérifiés, coordonnées approuvées et lien preuve **réellement inspecté**. Aucun faux PDF joint.

### JUWA — candidature mission HDS (e-mail/formulaire)

**Objet :** Mission application terrain HDS — intégration TypeScript et recette

Bonjour,

Votre mission d'application terrain a retenu mon attention pour sa dimension produit : interface Next.js/React, intégration REST avec un logiciel métier tiers, PostgreSQL et scénarios d'accès aux données sensibles.

Mon expérience est principalement orientée TypeScript/JavaScript, React et Node.js, avec un passage dans un environnement logiciel réglementé et des projets personnels d'intégration/orchestration. Pour une application terrain, j'accorderais une attention particulière aux droits d'accès, à la gestion des erreurs de l'API tierce et aux parcours testables en préproduction.

Je serais intéressé par un échange sur le périmètre du premier lot, les responsabilités d'hébergement HDS, le calendrier et le budget du forfait. Je peux détailler une méthode de livraison incluant critères de recette et tests reproductibles, sans me substituer à votre responsable conformité.

Bien cordialement,

**DRAFT ONLY** — profil/portfolio, preuve vérifiée et coordonnées à compléter après contrôle individuel. Ne pas exposer d'éléments clients confidentiels.

### Celaneo — question de qualification préalable

**Objet :** Mission Fullstack JS/IA — conditions remote et périmètre TypeScript

Bonjour,

J'ai vu votre mission freelance autour des agents IA, MCP et de la mise en production en TypeScript/Node.js. Je travaille sur des projets personnels d'orchestration et d'intégration d'outils avec des contrôles de permissions et de fiabilité.

Avant de vous adresser un dossier technique adapté, pouvez-vous préciser si la mission est intégralement réalisable à distance depuis la France, sans journées obligatoires sur site, ainsi que la place de Python dans le périmètre ?

**DRAFT ONLY** — seulement après approbation expresse ; ne pas déclencher un envoi pendant ce travail.

### Gamme solutions — clarification d'offre ambiguë

**Objet :** Offre SaaS Next.js/React/Node — contrat indépendant et rôle Laravel

Bonjour,

La mission SaaS à distance que vous avez publiée correspond à mon expérience React/Next.js, Node.js et PostgreSQL. Avant de préparer une candidature, pourriez-vous confirmer si le recrutement est encore ouvert sous forme de prestation B2B, quel est le niveau demandé en Laravel et quel TJM est réellement prévu ?

**DRAFT ONLY** — pas de prétention à « 10 ans ».

### ADDIXWARE — clarification mission Node.js

**Objet :** Offre Node.js/TypeScript — modalités freelance et répartition produit/infra

Bonjour,

J'ai repéré votre mission Node.js/TypeScript annoncée en télétravail intégral. Mon cœur de compétence concerne les fonctionnalités backend/API et frontend produit. Pour vérifier l'adéquation, pouvez-vous préciser si la prestation B2B est envisageable et quelle proportion du poste porte sur Terraform/ECS et Angular ?

**DRAFT ONLY** — envoyer uniquement si le mandat est toujours ouvert et l'historique dédoublonné.

## 7. Questions finales après tout échange

1. « Quel est le prochain jalon concret, qui le valide et d'ici quand ? »
2. « Faut-il une note technique, un CV, une offre ou un premier sprint payé pour décider ? »
3. « Qu'est-ce qui bloquerait légalement ou opérationnellement notre collaboration ? »
4. « Êtes-vous d'accord pour que je vous propose un périmètre écrit sur cette base ? »

Si aucun budget/mandat n'est établi : conclusion **exploratoire**, sans cycle commercial fictif.

Références méthodes : [Gartner 2026 parcours acheteur](https://www.gartner.com/en/newsroom/press-releases/2026-03-09-gartner-sales-survey-finds-67-percent-of-b2b-buyers-prefer-a-rep-free-experience), [CNIL B2B 2026](https://www.cnil.fr/fr/communication-electronique-quelles-regles), [Free-Work et JUWA fiches citées](2026-10-26-CLIENT-DOSSIERS.md).
