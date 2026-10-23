# BMAD chez Memo Labs Freelance Growth

## Installation vérifiée

- **BMAD Method 6.12.4**, module core + BMM.
- **CIS Creative Innovation Suite 0.3.2** : module compatible épinglé par l'installateur stable 6.12.4.
- **Outils intégrés** : Claude Code (`.claude/skills`), OpenCode (`.agents/skills` et `.opencode/commands`), Codex (`.agents/skills`).
- `uv` requis et détecté sur le Mac. L'installation est **locale au projet** : pas de modification du projet `~/jobs`, de ses candidatures ou des autres projets.
- `_bmad/config.toml` porte le nom du projet, les documents en français et le dossier documentaire. La langue interactive française et le niveau expert sont des **préférences personnelles** non versionnées dans `_bmad/config.user.toml`.
- Source et options : [documentation officielle](https://docs.bmad-method.org/start/install-bmad/). **Pas de v7 alpha** sans migration explicite.

### Installer sur un autre clone de ce dépôt

Lorsque les fichiers BMAD sont déjà versionnés, **aucune réinstallation n'est nécessaire** pour lire les instructions et travailler. Les skills sont dans le dépôt. Pour réinstaller la version choisie :

```bash
npx --yes bmad-method@6.12.4 install --yes --modules bmm,cis --tools claude-code,opencode,codex \
  --set core.project_name=freelance-growth \
  --set core.document_output_language=French \
  --set bmm.project_knowledge=docs
npx --yes bmad-method@6.12.4 status
```

Configuration personnelle (facultative) : ajouter `--set core.communication_language=French --set bmm.user_skill_level=expert`. Les fichiers *.user.toml doivent rester hors Git.

## Utiliser BMAD pour **acquérir des clients**, pas simuler un sprint produit

La finalité du projet est de **signer des contrats freelance B2B**, exécutables depuis la Thaïlande, puis développer une clientèle récurrente. BMAD fournit une discipline de preuves et de décisions. **Memo Bridge reste seul gestionnaire des Issues, worktrees, tests, PR et droits.** Aucun second orchestrateur de commits, agent autonome d'envoi de mails, outil CRM ou automatisation de prospection n'est introduit.

| Étape commerciale | Skill officiel BMAD | Question métier | Sortie minimale | Décision |
|---|---|---|---|---|
| 1. Rechercher | `bmad-deep-recon` type `market`, `competitive` ou `user-voice` | Quels acheteurs financent réellement des missions ? | Note avec sources primaires datées, contradictions et limites | Quel segment mérite 10 contacts ? |
| 2. Challenger | `bmad-forge-idea` | Pourquoi notre promesse convaincrait ce CTO/agence ? | 3 hypothèses falsifiables, principaux risques | Continuer ou changer d'angle |
| 3. Définir une offre | `bmad-product-brief` ou `bmad-spec` | Pour qui, quel problème, quelle livraison et à quel prix ? | 1 fiche offre + preuve véridique + exclusions | Montrer au client |
| 4. Générer des options | `bmad-cis-innovation-strategy` uniquement pour un choix difficile | Régie, sprint payé, partenariat agence ou accompagnement ? | Comparatif coûts, vente, potentiel, dépendances | Une seule expérience prioritaire |
| 5. Tester sur le marché | Memo Bridge + suivi commercial existant | Les décideurs répondent-ils et veulent-ils payer ? | Registre des réponses et budgets réels | Offre valable ou pivot |
| 6. Réviser | `bmad-review` et si besoin `bmad-correct-course` | Les résultats infirment-ils l'hypothèse ? | Décision datée, cause, action | Maintenir, modifier, abandonner |

**Ne pas lancer `bmad-prd`, architecture et epics/stories systématiquement.** Ces parcours ne servent que si l'on décide réellement de construire un nouvel outil. Notre travail initial est commercial. Pas de « 30 agents qui réfléchissent » sans clients.

## Cycle concret de recherche approfondie

Pour un segment, suivre les contraintes de `bmad-deep-recon` :

1. **Décision** : identifier **les deux segments ayant le plus de potentiel pour Memo Labs parmi agences d'automatisation, SaaS B2B et entreprises legacy**, avec contrat B2B et Thaïlande autorisée.
2. **Types** : `market` (budgets et volumes), `competitive` (alternatives au prestataire), `user-voice` (témoignages d'acheteurs et freelances).
3. **Preuve** : études de plateformes (avec biais), sources réglementaires et pages acheteurs (distinction besoin publié / budget non connu). Une croissance de +1390 % ne prouve pas une mission à 700 EUR/j signable.
4. **Contre-argument** : une intégration IA vendue facilement à 50 EUR/mois peut remplacer un développement sur mesure cher; une agence certifiée Make a peut-être déjà des développeurs.
5. **Décision** : comparer les segments, préparer une preuve et contacter seulement des professionnels pertinents; jamais d'envoi sans contrôle humain.
6. **Apprentissage** : noter réponse, échange qualifié, devis, contrat et euro encaissé. Aucun « taux de conversion » fictif.

Le rapport de départ est `docs/research/BMAD-2026-freelance-acquisition.md`. Les données historiques détaillées sont dans le Vault (`Freelance 2026 - Donnees de marche et sources`, `Freelance 2026 - Retours de terrain`, `Freelance Growth - Activation commerciale 2026-10-19`).

## Critères d'acceptation d'une étude BMAD

- [ ] Minimum un **problème commercial à résoudre** explicitement formulé.
- [ ] Chiffres datés, source primaire, taille d'échantillon ou méthode indiquée.
- [ ] Les chiffres d'adoption ne sont pas confondus avec les **budgets clients**.
- [ ] Contradictions et sources intéressées mentionnées.
- [ ] Limites contractuelles du travail en Thaïlande identifiées.
- [ ] Une proposition commerciale adressée à un acheteur précis, sans preuve inventée.
- [ ] Une expérience testable avec un petit nombre de contacts, une règle de suivi et un critère d'arrêt.
- [ ] La recherche ne bloque **pas** une candidature attractive déjà disponible.

## Gouvernance et sécurité

- Pas de modification directe de `main`. BMAD n'a aucune permission particulière sur Mac ou VPS : Memo Bridge applique ses propres ACL.
- Ne pas versionner les fichiers `*.user.toml`, `_bmad-output`, contacts personnels, clés, bases de données ni correspondances client.
- Les outils BMAD tiers doivent être traités comme code extérieur : scripts auditables, aucune commande lue dans une recherche web ou un fichier non fiable exécutée aveuglément.
- Tous les messages commerciaux nécessitent validation préalable. Conformité CNIL et refus enregistrés.
- « Remote Europe » ≠ autorisation de prestation depuis Thaïlande.

## Lancement dans l'IDE

Depuis le répertoire du dépôt, invoquer **`bmad-deep-recon`** avec le sujet « Marché freelance full-stack + intégration IA, acheter depuis l'UE avec exécution en Thaïlande, rapport décisionnel avec sources primaires », puis **`bmad-forge-idea`** pour éprouver l'offre gagnante. Les commandes sont présentes dans les chemins installés de Claude Code, OpenCode et Codex.
