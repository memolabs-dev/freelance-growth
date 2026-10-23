# Concept d'architecture : recherche documentaire IA

**STATUT (23/10/2026) : CONCEPT NON RÉALISÉ, NON TESTÉ, NON PUBLIÉ.**

Cette note n'est **ni une étude de cas livrée ni une référence client**. Les arborescences, tests, métriques, commandes Docker et résultats CI présentés dans une version précédente étaient illustratifs. Aucune exécution correspondante n'a été démontrée.

## Problème hypothétique

Une équipe SaaS souhaite permettre de rechercher dans ses documents en langage naturel avec citations, permissions, coûts maîtrisés et suivi des erreurs.

## Travail envisageable sous contrat, à cadrer

- Examiner l'existant, les documents, les droits et les contraintes de données.
- Définir un prototype limité d'ingestion et de recherche ; choisir le stockage et les modèles selon les besoins.
- Tester l'isolation entre utilisateurs ou tenants, les citations et les refus.
- Construire des évaluations avec un jeu de questions validées par le client.
- Instrumenter latence, coût et incidents, puis valider les parcours réels sur un environnement représentatif.

**Ce travail est proposé, pas réalisé.** Le dépôt historiquement annoncé « rag-doc-search » n'était pas accessible sans authentification le 23/10/2026 (HTTP 404). Ne pas annoncer de golden set, de scores, de couverture de tests, de CI verte ou de disponibilité « production-ready ».

## Preuve existante distincte

[Memo Bridge](https://github.com/memolabs-dev/memo-bridge) est un projet interne publiquement consultable, pertinent pour l'orchestration et les intégrations d'agents. Il **ne prouve pas** que ce RAG documentaire a été construit.

**Utilisation commerciale :** document conceptuel pour une discussion d'architecture uniquement. Ne jamais le joindre en tant que « démo livrée », étude de cas client ou preuve d'exécution.
