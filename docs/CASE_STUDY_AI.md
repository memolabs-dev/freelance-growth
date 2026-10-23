# Preuve IA intégrée : RAG documentaire + API + permissions + observabilité

**Projet interne** — pas une mission client. Démonstration de capacité à mettre une fonctionnalité IA en production avec garde-fous.

## Problème technique

Une équipe SaaS veut ajouter « Recherche intelligente dans la base de connaissances » : l'utilisateur pose une question en langage naturel, le système retrouve les docs pertinents, génère une réponse sourcée, avec permissions, coûts maîtrisés et traçabilité.

## Solution livrée (démo)

```
rag-doc-search/
├── src/
│   ├── ingestion/
│   │   ├── chunking.ts           # Découpage sémantique (titres, sections, code)
│   │   ├── embeddings.ts         # OpenAI text-embedding-3-small + batch
│   │   └── pipeline.ts           # Ingestion incrémentale, dédup, métadonnées
│   ├── retrieval/
│   │   ├── vector-store.ts       # pgvector (PostgreSQL) : index HNSW, filtres métadonnées
│   │   ├── hybrid.ts             # BM25 (full-text) + vector + rerank (cross-encoder)
│   │   └── permissions.ts        # Filtrage par tenant/rôle avant récupération
│   ├── generation/
│   │   ├── prompt.ts             # Template strict : citations obligatoires, refus si hors contexte
│   │   ├── llm.ts                # Appel OpenAI/Anthropic avec timeout, retry, fallback
│   │   └── guardrails.ts         # Validation sortie : citations présentes, pas d'hallucination évidente
│   ├── api/
│   │   ├── routes.ts             # POST /search, GET /sources/:id, POST /feedback
│   │   └── auth.ts               # JWT + scope `rag:query`, rate limit par tenant
│   ├── observability/
│   │   ├── tracing.ts            # OpenTelemetry : spans retrieval + generation + costs
│   │   ├── costs.ts              # Comptage tokens entrée/sortie + $/1k par modèle
│   │   └── eval.ts               # Dataset golden (50 Q/R) → precision@k, faithfulness, latency
│   └── admin/
│       └── dashboard.tsx         # React : coûts/jour, latency p50/p95, top requêtes, feedback
├── tests/
│   ├── unit/
│   │   ├── chunking.test.ts
│   │   ├── permissions.test.ts
│   │   └── guardrails.test.ts
│   ├── integration/
│   │   ├── retrieval.test.ts     # pgvector + filtres permissions
│   │   └── generation.test.ts    # Mock LLM → assertions citations + refus
│   └── e2e/
│       └── rag-flow.test.ts      # Ingestion → query → réponse sourcée → feedback
├── eval/
│   ├── golden-set.jsonl          # 50 questions + réponses attendues + sources
│   └── run-eval.ts               # Script CI : rapporte métriques + seuils
├── .github/workflows/ci.yml      # lint, typecheck, unit, integration, eval (nightly)
├── docker-compose.yml            # Postgres + pgvector + service
└── README.md
```

## Stack

- **Vector DB** : PostgreSQL + pgvector (HNSW, filtres métadonnées tenant/role)
- **Embeddings** : OpenAI text-embedding-3-small (batch, cache Redis)
- **LLM** : OpenAI GPT-4o-mini / Anthropic Claude 3.5 Haiku (configurable, fallback)
- **Rerank** : cross-encoder (local, `ms-marco-MiniLM-L-6-v2`)
- **Observabilité** : OpenTelemetry → stdout (compatible Datadog/Grafana/OTEL)
- **Tests** : Vitest, Supertest, Playwright, dataset d'évaluation automatisé

## Critères de recette (vérifiables)

| Critère | Comment vérifier |
|---|---|
| Récupération permissions | Test : user A ne voit pas docs user B (tenant isolation) |
| Citations obligatoires | Guardrails : réponse sans citation → refus + fallback |
| Coûts tracés | Dashboard : $/jour, tokens/requête, modèle utilisé |
| Évaluation continue | `npm run eval` → precision@5 > 0.75, faithfulness > 0.8, p95 < 3s |
| Idempotence ingestion | Double ingestion même doc → 1 seul vecteur (hash contenu) |
| Rate limiting | 100 req/min/tenant → 429 + retry-after header |

## Preuve d'exécution

```bash
git clone https://github.com/memolabs-dev/rag-doc-search
cd rag-doc-search
docker compose up -d
npm install
npm run db:migrate
npm run ingest -- --source ./sample-docs
npm run test:all        # ✅ vert
npm run eval            # ✅ seuils passés
npm run dev             # API :3000, Dashboard :5173
```

## Ce que cela démontre

- **RAG production-ready** : pas un prototype « chat avec PDF »
- **Permissions réelles** : filtrage au niveau vector store (pas post-filter)
- **Coûts observables** : chaque requête loggée avec tokens + $ estimé
- **Évaluation continue** : dataset golden + seuils dans CI (nightly)
- **Guardrails** : citations obligatoires, détection hors-contexte, fallback
- **Architecture modulaire** : ingestion / retrieval / generation / api découplés

## Limites (honnêteté commerciale)

- Modèles hébergés (OpenAI/Anthropic) → pas de déploiement on-premise/LLM local
- Pas de fine-tuning ni d'entraînement ; uniquement RAG + prompt engineering
- Évaluation : 50 questions golden set = indicateur, pas preuve statistique
- Pas de PII redaction ni DLP automatique (à ajouter si données santé/finance)
- Dashboard admin = React simple, pas un produit SaaS complet

## Réutilisation pour un client

Adaptable en **1-2 sprints** pour :
- Brancher sur le vrai contenu (Confluence, Notion, Git, S3, DB)
- Remplacer pgvector par le vector store du client (Pinecone, Weaviate, Qdrant)
- Ajouter l'auth/permissions du client (OIDC, RBAC existant)
- Intégrer dans l'UI existante (composant React `<SmartSearch />`)
- Configurer modèles/coûts selon contrat client (Azure OpenAI, Bedrock, etc.)

---

**Lien vers le code** : À publier sur `github.com/memolabs-dev/rag-doc-search` (repo public, MIT) avant premier envoi commercial.