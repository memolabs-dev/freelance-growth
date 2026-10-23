# Concept d'architecture : gestion des abonnements React + API

**STATUT (23/10/2026) : CONCEPT NON RÉALISÉ, NON TESTÉ, NON PUBLIÉ.**

Ce document n'est **ni une démo livrée ni une référence client**. Les anciens arbres de fichiers, commandes d'installation, pourcentages de couverture et résultats de CI n'étaient pas accompagnés de preuves d'exécution.

## Besoin hypothétique

Un éditeur SaaS veut ajouter la gestion d'abonnements : interface React, API TypeScript, persistance PostgreSQL, notifications du prestataire de paiement, tests et documentation.

## Premier lot possible après découverte

- Cadrer l'authentification, les parcours, les erreurs et le prestataire de paiement du client.
- Définir une API documentée, les règles métier et la migration des données.
- Prévoir validation de signature, idempotence et reprise des webhooks.
- Développer une interface utilisable, avec tests d'intégration et tests navigateur sur les parcours critiques.
- Valider effectivement les critères de recette avec un utilisateur et une infrastructure proches de la production.

**Tout ceci est à construire après contrat, rien n'est déclaré livré.** L'URL précédemment citée « subscription-demo » n'était pas accessible anonymement le 23/10/2026 (HTTP 404). Aucune métrique de test ni de déploiement ne doit lui être attribuée.

## Preuve existante distincte

[Node n8n / Opn Payments](https://github.com/guillaume-flambard/n8n-nodes-opn) : dépôt personnel public d'intégration. Il peut soutenir une discussion technique après vérification précise des fonctionnalités, mais **ne prouve pas** ce service d'abonnements.

**Utilisation commerciale :** scénario de cadrage, jamais preuve de réalisation.
