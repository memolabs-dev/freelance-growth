# Exemple de projet full-stack à réaliser : API produit + interface React + tests + CI

**STATUT : PROJET DE DÉMONSTRATION NON VÉRIFIÉ, NON DIFFUSABLE AUX PROSPECTS.** Ce document est une conception proposée, pas une livraison effective ni une référence client. Le dépôt public décrit en bas de page n'a pas été trouvé lors du contrôle du 23/10/2026. Aucun test vert ni déploiement ne sont établis.

## Problème technique

Une équipe SaaS a besoin d'une fonctionnalité « Gestion des abonnements » : CRUD abonnements, webhook Stripe, pagination, filtres, tests d'intégration, déploiement vérifiable.

## Architecture proposée (non démontrée)

```
subscription-service/
├── src/
│   ├── routes/
│   │   └── subscriptions.ts      # REST API : GET/POST/PATCH/DELETE /subscriptions
│   ├── services/
│   │   ├── stripe.ts             # Webhook Stripe + idempotency
│   │   └── subscription.ts       # Logique métier, validation
│   ├── db/
│   │   └── schema.sql            # PostgreSQL : subscriptions, plans, customers
│   └── frontend/
│       ├── SubscriptionList.tsx  # React + TanStack Query + pagination
│       ├── SubscriptionForm.tsx  # Création/édition avec validation Zod
│       └── hooks/
│           └── useSubscriptions.ts
├── tests/
│   ├── integration/
│   │   └── subscriptions.test.ts # Supertest + test DB (transactions rollback)
│   └── e2e/
│       └── subscription-flow.test.ts # Playwright : création → webhook → UI
├── .github/workflows/ci.yml      # lint, typecheck, unit, integration, e2e
├── docker-compose.yml            # Postgres + service pour test local
└── README.md                     # Démarrage, variables d'env, commande test
```

## Stack

- **Backend** : Node.js 22, Fastify, TypeScript strict, Zod, PostgreSQL (pg)
- **Frontend** : React 18, TypeScript, Vite, TanStack Query, React Hook Form + Zod
- **Tests** : Vitest (unit/integration), Playwright (e2E), Supertest
- **CI** : GitHub Actions (lint → typecheck → unit → integration → e2e)
- **Déploiement demo** : Docker Compose (Postgres + service), `npm run test:all`

## Critères de recette (vérifiables)

| Critère | Comment vérifier |
|---|---|
| API REST complète | `curl` sur endpoints + schéma OpenAPI généré |
| Webhook Stripe idempotent | Test d'intégration : double envoi → 1 seule création |
| Pagination + filtres UI | Playwright : 50 abonnements → page 2, filtre plan |
| Tests passent en CI | `npm run test:all` → exit 0, coverage > 80% |
| Migration DB réversible | `npm run db:migrate` + `npm run db:rollback` |
| Types stricts | `npm run typecheck` → 0 erreurs TypeScript |

## Commandes prévues, non exécutées ni validées

```bash
# Clone + démarrage
git clone https://github.com/memolabs-dev/subscription-demo
cd subscription-demo
docker compose up -d
npm install
npm run db:migrate
npm run test:all        # non vérifié
npm run dev             # API sur :3000, UI sur :5173
```

## Compétences que la démo pourrait illustrer une fois réalisée et vérifiée

- Architecture propre : séparation routes / services / DB / UI
- Tests réels : unitaires (logique), intégration (API + DB), e2E (user flow)
- CI fiable : chaque PR passe le pipeline complet avant merge
- Stripe webhook : idempotency key, signature verification, retry handling
- TypeScript end-to-end : types partagés API ↔ UI via `openapi-typescript`

## Limites (honnêteté commerciale)

- Projet démo, pas client réel → pas de métriques business (churn, MRR, etc.)
- Pas de monitoring production (Sentry, Datadog) ni feature flags
- Authentification simplifiée (JWT statique pour la démo)
- Déploiement : Docker Compose local seulement, pas de Helm/K8s ni Terraform

## Réutilisation pour un client

Ce squelette peut être adapté en **1 sprint** pour :
- Remplacer la démo Stripe par le vrai provider de paiement
- Ajouter l'auth du client (OIDC, SAML, session cookie)
- Brancher sur la vraie base (migration existante)
- Étendre les tests e2E aux parcours critiques du client

---

**Lien vers le code** : À publier sur `github.com/memolabs-dev/subscription-demo` (repo public, MIT) avant premier envoi commercial.