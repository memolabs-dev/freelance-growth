# Études de cas utilisables en prospection

**Vérification des sources publiques : 19 octobre 2026.** Il s'agit de projets créés par Memo Labs, pas de missions clients ni de résultats commerciaux attestés.

## 1. Memo Bridge : intégrations d'agents avec contrôle des actions

Sources officielles : https://github.com/memolabs-dev/memo-bridge/blob/main/README.md et https://github.com/memolabs-dev/memo-bridge/blob/main/docs/REMOTE_CHATGPT.md

**Problème technique :** un agent doit agir sur des dépôts GitHub et des machines sans disposer de permissions arbitraires et sans compromettre les autres projets.

**Solution montrable :** contrôle côté serveur, accès MCP protégé par OAuth, réservation de tâches GitHub, création de worktrees isolés, tests, commits, push et ouverture de PR. Un même flux est disponible depuis ChatGPT vers le Mac et le VPS à travers le service documenté.

**Preuve commercialement pertinente :** capacité à relier plusieurs logiciels et orchestrer une action agentique soumise à autorisation et preuve d'exécution, plutôt qu'un chatbot de démonstration.

**Démo proposée :** présenter une commande qui réserve une Issue autorisée, ouvre un worktree isolé, modifie un fichier, exécute les tests et ouvre la PR. Montrer aussi ce qui est refusé quand les droits ne le permettent pas.

**Limites :** un projet interne ne prouve pas des économies chez des clients. Les tests et la documentation interne ne garantissent pas l'absence d'incident.

**Offre liée :** ingénierie d'intégrations IA, automatisation robuste, outillage interne de product engineering.

## 2. Drop : autorisations et échanges entre agents

Sources officielles : https://github.com/memolabs-dev/drop/blob/main/README.md et https://github.com/memolabs-dev/drop/blob/main/docs/AVANCEMENT.md

**Problème technique :** un agent veut un résultat depuis le système d'un collègue sans recevoir un accès général aux outils ou aux données.

**Solution montrable :** contrats de capacités, approbation ponctuelle, réponses au format vérifié, cryptographie des échanges et traçabilité des décisions. Parcours Mac en barre de menu.

**Preuve commercialement pertinente :** associer backend sécurisé, protocoles, validation et interaction utilisateur compréhensible.

**Démo proposée :** une requête fictive, sa demande d'approbation, l'autorisation une fois ou le refus, puis la restitution bornée de la réponse.

**Limites obligatoires :** Drop est encore un **prototype sans utilisateur réel**. Le README précise qu'il n'a pas d'audit indépendant, pas de release publique, et que Windows/Linux sont en développement. Ne jamais le présenter comme déployé chez des clients.

**Offre liée :** intégrations IA avec contrôle des droits et UX produit.

## Exemple complémentaire : Kollio

Source : https://github.com/memolabs-dev/kollio-mac/blob/main/README.md

Application macOS SwiftUI avec document visuel, propositions de modifications non destructives, branches fantômes, validation et annulation. Prouve une capacité d'interface et d'architecture produit. Le dépôt indique que le fournisseur de modèle distant n'a pas encore été testé avec une vraie clé : ne pas prétendre à un déploiement IA externe vérifié.

Kollio n'est pas une preuve directe de développement React : il est réalisé en SwiftUI.

## Consignes avant envoi à un acheteur

Aucune métrique de croissance, ROI, disponibilité ou nombre de clients inventée. Aucun code propriétaire de tiers ni donnée patient. Expliquer ce qui est démontrable aujourd'hui et ce qui reste au stade prototype. Adapter chaque preuve au problème exact du prospect.

Ces deux cas techniques sont les pièces de confiance à joindre au one-pager commercial, et non une garantie de mission.
