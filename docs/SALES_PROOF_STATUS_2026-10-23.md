# Registre de preuves publiques — 23 octobre 2026

**Contrôle :** appels HTTP anonymes à l'API GitHub publique (sans accès à un compte) réalisés depuis le Mac le 23/10/2026. Un code 200 confirme que le dépôt est visible, **pas** que toutes ses fonctions marchent en production ; un 404 signifie absent ou non public.

| Dépôt | HTTP | Usage possible | Limites |
|---|---|---|---|
| https://github.com/memolabs-dev/memo-bridge | 200 | Orchestration et intégration d'agents, projet interne | Aucune preuve de résultats commerciaux chez un client |
| https://github.com/guillaume-flambard/n8n-nodes-opn | 200 | Code d'intégration n8n personnel | Inspecter les fonctions réelles avant toute affirmation |
| https://github.com/memolabs-dev/drop | 200 | Protocole / application interne | Prototype non certifié ni livré à des clients |
| https://github.com/memolabs-dev/kollio-mac | 200 | Interface macOS SwiftUI | Ne prouve pas une application React |
| https://github.com/memolabs-dev/rag-doc-search | 404 | Aucune démonstration utilisable | Ne jamais présenter comme RAG développé, testé ou déployé |
| https://github.com/memolabs-dev/subscription-demo | 404 | Aucune démonstration utilisable | Ne jamais présenter comme service livré ou CI verte |

## Règles pour les messages externes

1. Vérifier la source primaire du besoin, sa date, le contact et la possibilité de contrat B2B.
2. Ne citer qu'une preuve publique pertinente, après lecture du code, en distinguant prototype et référence client.
3. Contrôler Gmail et ~/jobs pour tous les doublons, refus et oppositions.
4. Corriger la localisation : France aujourd'hui, Thaïlande potentielle sur accord contractuel écrit.
5. Ne pas envoyer sans validation individuelle du **texte et du destinataire** par le propriétaire.
6. Mettre CONTACTED/APPLIED seulement si l'envoi est réellement confirmé (preuve hors Git).

Les fichiers CASE_STUDY_AI.md et CASE_STUDY_FULLSTACK.md sont des **concepts non réalisés**. Ne pas reprendre les anciens résultats inventés de leur historique Git.
