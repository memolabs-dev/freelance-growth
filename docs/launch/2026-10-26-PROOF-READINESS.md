# Registre des preuves et répétition — lundi 26 octobre 2026

**État : 24 octobre 2026.** Une démonstration locale de méthode est réellement exécutée sur un serveur HTTP fictif. Les quatre scénarios ont passé. **Ce n'est PAS une preuve client, une application React testée en navigateur, une production validée ou une certification HDS.**

## Statut exact des preuves

| Niveau | Preuve | Statut | Usage commercial autorisé |
|---|---|---|---|
| R0 : existence | [Memo Bridge](https://github.com/memolabs-dev/memo-bridge), [n8n-nodes-opn](https://github.com/guillaume-flambard/n8n-nodes-opn) | Dépôts publics consignés dans [registre](../SALES_PROOF_STATUS_2026-10-23.md), inspection fonctionnelle complète à refaire avant publication | Projets internes/personnels uniquement |
| R1 : simulation HTTP | [Script exécutable](../../scripts/demo-proof-to-production.mjs), [résultats de 4 scénarios](2026-10-26-SYNTHETIC-DEMO-RESULTS.md) | **PASS 4/4 local le 24/10** | Montrer une méthode reproductible sans inventer de client |
| R2 : parcours produit | React, API réelle, compte neuf, gestion des rôles, tests de navigateur, environnement représentatif | **NOT_VERIFIED** | Ne pas affirmer avoir testé un produit E2E |
| R3 : production réelle | Consentement client, préproduction, logs, recette métier externe et sécurité | **NOT_VERIFIED** | Ne pas prétendre à un cas client/résultat ROI |

## Démonstration orale en 90 secondes (fiction signalée)

- 0–15 s : un agent fictif annonce « dossier SIM-1024 validé » ; le serveur a réellement répondu HTTP 403.
- 15–30 s : afficher la lecture de l'état encore « pending ». Le faux succès est ainsi **prouvé sur la simulation**.
- 30–45 s : la version corrigée contrôle le statut HTTP ; sur 403, elle annonce échec.
- 45–60 s : injection d'une erreur HTTP 503 ; statut et réponse restent cohérents.
- 60–75 s : rôle autorisé, réponse HTTP 200, puis lecture de l'état « approved ».
- 75–90 s : afficher la preuve des quatre cas et les limites : **aucune application client ni navigateur**.

**Commande exécutée sur Mac :** node scripts/demo-proof-to-production.mjs --write. Le script utilise le serveur et client HTTP natifs de Node, uniquement sur 127.0.0.1 et sur des données inventées. Aucun LLM externe, aucune donnée client.

## L'étape R2 manquante — avant de se déclarer « démo produit prête »

1. Choisir une application React/API réellement accessible et autorisée, pas un concept CASE_STUDY non développé.
2. Exécuter un vrai navigateur avec Playwright : nouveau compte, login, rôle editor/viewer, action métier, 403, 503, validation du résultat affiché.
3. Conserver les traces et tests auto-retry selon [Playwright Trace Viewer](https://playwright.dev/docs/trace-viewer) et [assertions Playwright](https://playwright.dev/docs/test-assertions).
4. Instrumenter seulement les identifiants techniques non sensibles avec [OpenTelemetry](https://opentelemetry.io/docs/concepts/signals/traces/), après approbation du périmètre de données.
5. Documenter commit testé, environnement, date, parcours, résultat, limites, réception externe ; pas de capture de données médicales, secrets ou informations client.
6. Exécuter une validation externe sur environnement proche production ; une CI verte n'est jamais suffisante.

## Limites affichées lors de l'entretien

« Je vous montre ici une démonstration technique locale sur un dossier entièrement fictif : un agent peut annoncer une réussite alors que l'API refuse la mutation. Je propose de transposer cette méthode sur **un parcours choisi ensemble**, en environnement autorisé, avec des critères de recette et des preuves techniques vérifiables. Je ne prétends pas avoir déjà validé votre système ni garanti sa conformité. »

## Check-list de preuve

- [x] Faux succès HTTP 403 reproduit sur simulation.
- [x] Échec HTTP 503 géré sans mutation.
- [x] Réussite HTTP 200 confirmée par lecture d'état.
- [x] Rapport de tests locaux conservé.
- [ ] Test navigateur React réel.
- [ ] Authentification compte neuf et rôle d'utilisateur externe.
- [ ] Vérification préproduction et acceptation métier.
- [ ] Cas client externe démontré et autorisation de publication.
- [ ] Validation indépendante HDS/RGPD/production.

**Les éléments non cochés interdisent toute formulation « validé de bout en bout en production ».** Le passage de R1 vers R2/R3 appartient à l'issue [#63](https://github.com/memolabs-dev/freelance-growth/issues/63).
