# Rapport de réconciliation — Registre prospects / outreach (Issue #36)

**Date :** 23 octobre 2026  
**Dépôt :** memolabs-dev/freelance-growth  
**Branche :** `m2/reconciliation-prospects-outreach`  
**Lien issue :** #36 — M2 P0 — Réconcilier le registre prospects/outreach et les annonces M1+

---

## 1. Constat : écart entre communication et réalité

| Source | Prospects annoncés | Prospects réels | Écart | Messages annoncés | Messages réels | Écart |
|---|---|---|---|---|---|---|
| PR #33 (commit 596678c) | 22 | 20 | -2 | 9 | 8 | -1 |
| PR #34 (commit 888c2e7) | 44 | 36 | -8 | 13 | 12 | -1 |
| État actuel `main` | 44 | 36 | -8 | 13 | 12 | -1 |

**Conclusion : l'écart est réel.** Il manque 8 lignes prospects et 1 ligne message par rapport aux chiffres annoncés dans les messages de commit. Aucune donnée n'a été fabriquée pour combler cet écart (conformité à la règle de l'issue #36).

---

## 2. Détail des écarts

### PR #33 — annoncés 22 prospects / 9 messages, réels 20 / 8

- **Prospects (-2) :** le commit ne liste pas les 22 noms individuels. Il est impossible d'identifier quelles 2 entreprises manquent. Le fichier contient 20 lignes de données.
- **Messages (-1) :** le commit annonce 9 messages mais le fichier en contient 8. Les 8 présents : Oudini, symbolist., 9x, Operative, Together, Lemon.io, A.Team, Askable.

### PR #34 — annoncés +22 prospects (total 44) / +4 messages (total 13), réels +16 (total 36) / +4 (total 12)

- **Prospects (-6 par rapport à l'annonce de PR #34) :** le commit nomme 12 entreprises + "10 Vercel partners" = 22 ajouts attendus. Le diff réel ajoute 16 lignes :
  - **Vercel partners ajoutés (7) :** Blazity, Azurally, BASIC/DEPT®, Brandung, 10up/Fueled, Space Dinosaurs, Monogram. (Annoncés : 10 → écart : 3)
  - **n8n partners ajoutés (8) :** SVA System Vertrieb, Bitovi, Data4Prime, FastRocket, Makeitfuture, Goodspeed, ennoia, Codimite. (Correspond à l'annonce)
  - Glass Atlas : retiré puis réajouté (net 0)
- **Messages (-1 par rapport à l'annonce de PR #34) :** le commit annonce 13 messages totaux, le fichier en contient 12. Les 4 ajoutés : Blazity, Azurally, Monogram, TrueHorizon AI. Le 13e message annoncé n'existe pas dans le fichier.

### Total des écarts

- **8 prospects manquants** (2 de PR #33 + 6 de PR #34)
- **1 message manquant** (de PR #33, propagé dans PR #34)

---

## 3. Méthode de comptage

Les fichiers TSV contiennent des champs multiline (corps de message avec retours à la ligne entre guillemets). `wc -l` ne peut pas les compter. Le comptage a été effectué avec un parseur CSV/TSV standard (Python `csv` module, délimiteur `\t`).

| Fichier | Lignes totales (wc -l) | Lignes de données (parseur) | En-tête |
|---|---|---|---|
| `data/prospects_shortlist.tsv` | 36 | 36 | 14 colonnes |
| `data/outreach_log.tsv` (sur `main`) | 286 | 12 | 15 colonnes |
| `data/outreach_log.tsv` (sur `m2/agences-cto-decouverte`) | — | 19 | 15 colonnes |

*Note : `wc -l` surestime `outreach_log.tsv` car les corps de message contiennent des sauts de ligne intégrés.*

---

## 4. Unicité des données

Aucun doublon détecté dans `prospects_shortlist.tsv` sur la clé (entreprise + besoin/canal). Chaque entreprise apparaît une seule fois.

---

## 5. Statuts des lignes

### `prospects_shortlist.tsv` — 36 lignes de données

| Statut (due_date) | Nombre |
|---|---|
| 2026-10-25 | 2 |
| 2026-10-26 | 9 |
| 2026-10-28 | 14 |
| 2026-10-30 | 6 |
| 2026-11-02 | 5 |

### `outreach_log.tsv` — 19 lignes de données

| Statut | Nombre |
|---|---|
| QUEUED | 12 |
| READY_TO_SEND | 7 |

*Aucun statut CONTACTED n'a été dérivé d'un brouillon (conformité à la règle de l'issue #36).*

---

## 6. Décision : pas de fabrication

Conformément à la règle de l'issue #36 : **"Ne jamais fabriquer 8 prospects/1 message pour atteindre le chiffre annoncé."**

Les 8 prospects et 1 message manquants ne sont pas recréés. Les fichiers restent dans leur état réel (36 prospects, 19 messages dont 7 READY_TO_SEND sur la branche courante). L'écart est documenté ici pour transparence.

---

## 7. Tests ajoutés

Deux tests automatisés dans `test/reconciliation.test.js` :

1. **`countProspectsAndMessages`** : vérifie que les fichiers TSV sont valides, compte les lignes de données, vérifie l'absence de doublons sur (entreprise + canal).
2. **`noContactedStatusFromDraft`** : vérifie qu'aucune ligne n'a le statut CONTACTED dérivé d'un brouillon.

Exécution : `npm test` → 28 tests passés (26 existants + 2 nouveaux).

---

## 8. Sources

- `git show 596678c:data/prospects_shortlist.tsv` (PR #33)
- `git show 596678c:data/outreach_log.tsv` (PR #33)
- `git show 888c2e7:data/prospects_shortlist.tsv` (PR #34)
- `git show 888c2e7:data/outreach_log.tsv` (PR #34)
- `git show main:data/prospects_shortlist.tsv` (état actuel sur main)
- `git show main:data/outreach_log.tsv` (état actuel sur main, 12 lignes)
- `git show m2/agences-cto-decouverte:data/outreach_log.tsv` (branche M2, 19 lignes)
- Messages de commit PR #33 et PR #34 (chiffres annoncés)
- PR #35 (ouverte, non fusionnée, état DIRTY) — pas de chevauchement avec ce travail
