# Rapport de déduplication — Sollicitations outreach (Issue #37)

**Date :** 23 octobre 2026  \n**Dépôt :** memolabs-dev/freelance-growth  \n**Branche :** `m2/dedup-outreach-gmail-jobs`  \n**Lien issue :** #37 — M2 P0 — Dédupliquer toutes les sollicitations avec Gmail et ~/jobs

---

## 1. Statuts de déduplication définis

| Statut | Signification | Règle de transition |
|---|---|---|
| `BLOCKED_DUPLICATE` | Déjà contacté par email/Gmail. Pas de nouvelle introduction. | Suivi uniquement dans le fil existant, après relecture du contexte et absence d'opposition. |
| `DO_NOT_CONTACT` | Opposition explicite (CNIL, refus, opt-out). | Jamais de nouveau contact, aucun canal. |
| `SCREENED_OUT` | Précédemment écarté (screened_out). | Pas de nouvelle tentative sans nouveau signal/document. |
| `FOLLOW_UP_EXISTING_THREAD` | Fil existant, réponse en attente ou relance appropriée. | Relance uniquement dans le fil existant, jamais nouvel email d'introduction. |
| `READY_FOR_HUMAN_REVIEW` | Pas de duplicata connu. | Contrôle systématique requis avant envoi (Gmail + ~/jobs), validation humaine obligatoire. |

---

## 2. Verdict par brouillon existant (outreach_log.tsv — 12 brouillons QUEUED)

| Company | Template ID | Statut actuel | Verdict déduplication | Motif | Source |
|---|---|---|---|---|---|
| Oudini | OUDINI_001 | QUEUED | **BLOCKED_DUPLICATE** | Déjà contacté par email le 19/10/2026 | OUTBOUND-QUALITY-GATE.md (cohort 19/10) |
| symbolist. | SYMBOLIST_001 | QUEUED | **BLOCKED_DUPLICATE** | Déjà contacté par email le 19/10/2026 | OUTBOUND-QUALITY-GATE.md (cohort 19/10) |
| 9x | 9X_001 | QUEUED | READY_FOR_HUMAN_REVIEW | Aucun duplicata connu. Contrôle Gmail + ~/jobs requis avant envoi. | — |
| Operative | OPERATIVE_001 | QUEUED | READY_FOR_HUMAN_REVIEW | Aucun duplicata connu. Contrôle Gmail + ~/jobs requis avant envoi. | — |
| Together | TOGETHER_001 | QUEUED | READY_FOR_HUMAN_REVIEW | Aucun duplicata connu. Contrôle Gmail + ~/jobs requis avant envoi. | — |
| Lemon.io | LEMON_001 | QUEUED | READY_FOR_HUMAN_REVIEW | Aucun duplicata connu. Contrôle Gmail + ~/jobs requis avant envoi. | — |
| A.Team | ATEAM_001 | QUEUED | READY_FOR_HUMAN_REVIEW | Aucun duplicata connu. Contrôle Gmail + ~/jobs requis avant envoi. | — |
| Askable | ASKABLE_001 | QUEUED | **SCREENED_OUT** | Antecedent screened_out dans ~/jobs/_db/jobs.db | ~/jobs/_db/jobs.db (read-only) |
| Blazity | BLAZITY_001 | QUEUED | READY_FOR_HUMAN_REVIEW | Aucun duplicata connu. Contrôle Gmail + ~/jobs requis avant envoi. | — |
| Azurally | AZURALLY_001 | QUEUED | READY_FOR_HUMAN_REVIEW | Aucun duplicata connu. Contrôle Gmail + ~/jobs requis avant envoi. | — |
| Monogram | MONOGRAM_001 | QUEUED | READY_FOR_HUMAN_REVIEW | Aucun duplicata connu. Contrôle Gmail + ~/jobs requis avant envoi. | — |
| TrueHorizon AI | TRUEHORIZON_001 | QUEUED | READY_FOR_HUMAN_REVIEW | Aucun duplicata connu. Contrôle Gmail + ~/jobs requis avant envoi. | — |

---

## 3. Entreprises déjà contactées hors outreach_log.tsv

| Company | Motif | Source |
|---|---|---|
| Altor | Déjà contacté par email le 19/10/2026 | OUTBOUND-QUALITY-GATE.md |
| AI Scaling | Déjà contacté par email le 19/10/2026 | OUTBOUND-QUALITY-GATE.md |
| Nextcloud | Candidature envoyée 09/02, pas de réponse | ~/jobs/_db/jobs.db (external, applied, no_response) |
| KatchMe Consulting | Déjà candidat/relancé, email envoyé 22/09 + relance 06/10 | ~/jobs/_db/jobs.db (free-work, archived) |
| Proxify | Antecedent screened_out dans ~/jobs/_db/jobs.db | ~/jobs/_db/jobs.db (workingnomads, multiple entries) |

---

## 4. Règles de contrôle systématique (avant approbation humaine)

1. **Aucun nouveau contact** si l'historique envoyé/refusé n'est pas résolu.
2. **Comparer société finale, contact et mission** — pas seulement l'orthographe des noms.
3. **Vérifier Gmail** pour correspondance existante avant tout nouvel envoi.
4. **Vérifier ~/jobs/_db/jobs.db** (lecture seule) pour statut envoyé/refusé/screened_out.
5. **Respect des refus CNIL** — opposition simple et gratuite en prospection B2B.
6. **Seulement des IDs anonymisés/agrégats dans Git** — coordonnées et contenus Gmail hors repo.
7. **Aucun envoi ni écriture dans ~/jobs** depuis ce dépôt — approbation humaine requise avant envoi.
8. **Statut `CONTACTED` ou `APPLIED`** uniquement après envoi effectivement confirmé par Gmail ou l'ATS, avec pièce de preuve hors Git. Un brouillard n'est pas envoyé.

---

## 5. Tests

`test/dedup.test.mjs` — 7 tests couvrant :
- Oudini → BLOCKED_DUPLICATE (déjà contacté 19/10/2026)
- symbolist. → BLOCKED_DUPLICATE (déjà contacté 19/10/2026)
- Askable → SCREENED_OUT (antecedent screened_out dans ~/jobs)
- Aucun duplicata pour les entreprises bloquées
- Statuts de déduplication valides
- Entreprises READY_FOR_HUMAN_REVIEW non bloquées
- Liste already-contacted inclut Oudini et symbolist.

---

## 6. Sources

- `docs/OUTBOUND-QUALITY-GATE.md` — audit 19/10/2026, cohort déjà contactée, contrôles obligatoires
- `docs/APPLICATION_AUDIT_2026-10-19.md` — audit anti-doublon des candidatures, ~/jobs/_db/jobs.db
- `~/jobs/_db/jobs.db` — lecture seule, table `opportunités`, champ `data.notes`
- `data/outreach_log.tsv` — 12 brouillons QUEUED
- `data/prospects_shortlist.tsv` — 36 prospects (12 missions, 24 agences)

---

## 7. Décision : pas d'envoi, pas d'écriture dans ~/jobs

Conformément à l'issue #37 : **sans envoi ni écriture dans ~/jobs**. Les statuts QUEUED existants dans `outreach_log.tsv` ne sont pas modifiés. Ce rapport est une proposition de contrôle systématique avant approbation humaine.