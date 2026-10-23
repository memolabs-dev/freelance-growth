# Proof-to-Production — démonstration API synthétique

**PASS sur une API HTTP locale fictive. Aucun client, aucune application React, aucune certification ou production validée.**

Commande : node scripts/demo-proof-to-production.mjs --write. Réseau local 127.0.0.1 seulement, cas fictif SIM-1024.

## Résultats observés

| Scénario | Résultat |
|---|---|
| False success of naive agent reproduced | PASS |
| 403 authorization refused without false confirmation | PASS |
| 503 dependency outage refused without mutation | PASS |
| 200 authorized operation confirmed by state readback | PASS |

## Traces de la simulation

| ID synthétique | Méthode | HTTP |
|---|---|---|
| synthetic-001 | GET | 200 |
| synthetic-002 | PATCH | 403 |
| synthetic-003 | GET | 200 |
| synthetic-004 | PATCH | 403 |
| synthetic-005 | PATCH | 503 |
| synthetic-006 | GET | 200 |
| synthetic-007 | PATCH | 200 |
| synthetic-008 | GET | 200 |
| synthetic-009 | GET | 200 |

**Sens pédagogique :** la version volontairement naïve annonce succès malgré HTTP 403 et statut pending. La version vérifiée n’annonce succès qu’après statut 200 et lecture de approved. Le 503 reste un échec explicite.

## Limites
- no customer product
- no browser or React E2E
- no real health data or client PII
- no deployment and no certification
- no proof of production-grade reliability

La preuve exigible avant une mission client comporte séparément des tests sur le parcours React, la préproduction, les permissions, la recette utilisateur et l’autorisation d’accès. Les scénarios ci-dessus sont de la mécanique de démonstration, pas des tests du produit du prospect.
