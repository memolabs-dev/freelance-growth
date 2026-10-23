# Ideal Customer Profiles et qualification

## ICP A. SaaS B2B en production

- Entreprise indicative : equipe de 10 a 100 personnes avec utilisateurs et logiciel existant.
- Decisif : CTO, Lead Engineering, Head of Product.
- Signaux publics : recrutement freelance/full-stack, integration API ou IA annoncee, refonte progressive, besoin de livraison date.
- Offre : Product Engineering ou AI Integration.
- Preuves : code et applications demonstrables, tests e2e, livraison de parcours reels.
- Risques : contrat salarie seulement, restrictions geo, transferts de donnees non autorises.

## ICP B. Agences automatisation et studios produit

- Entreprises : integrateurs n8n/Make/Zapier/CRM, studios React/Next.js et partenaires technologiques.
- Decision : fondateur, directeur de delivery, responsable technique.
- Signal : plusieurs projets clients publics, offre integration sur mesure, besoin de sous-traitance explicite ou plausible.
- Offre : renfort en API Node/TypeScript, backend et interface, tests et stabilisation.
- Risques : besoin deja couvert en interne, marge de sous-traitance, clauses de non-sollicitation et de confidentialite.
- Ne pas affirmer qu'une agence recrute sans preuve. Un partenaire certifie n'est pas une mission garantie.

## ICP C. Logiciels historiques et healthtech

- Entreprises : editeurs modernisant leurs applications, equipes sans tests de non-regression ou integrations fragiles.
- Decision : CTO et directeur produit; donnees de sante uniquement avec autorisations explicites.
- Offre : audit borne, strategie de migration progressive, tests et automatisations.
- Risques : contraintes RGPD/transfert hors UE, propriete du code, presence obligatoire et validations sectorielles.
- Une mission interdisant le lieu de travail convenu ou l'accès nécessaire aux données ne remplit pas l'objectif du projet.

## Contre-cibles initiales

TPE curieuses de l'IA mais sans budget de projet; debutants cherchant des formations; sites vitrines standards; startups n'ayant pas de financement ni clients; entreprises exigeant une présence sur site incompatible avec les modalités convenues; promesses de CTO fractionnel expert sans historique prouve.

## Checklist pour chaque piste

| Question | Condition d'entree |
|---|---|
| Le besoin est-il actuel ? | URL/date et probleme identifiable, sinon `UNVERIFIED` |
| Qui a le budget ? | Role decisionnaire et acces au signataire connus ou a rechercher |
| Qu'est-ce qui peut etre livre ? | Une des offres A/B/C avec perimetre defini |
| Contrat possible ? | B2B/freelance indique ou valide au premier echange |
| Lieu de travail possible ? | `LOCATION_CONFIRMED`, `VERIFY` ou `INCOMPATIBLE`; les anciennes données utilisent encore `THAILAND_CONFIRMED` et doivent être revues |
| Quel fuseau de travail ? | Equipe, fenetres synchrones et delais explicitement acceptables |
| Quelles donnees ? | Conditions d'acces, NDA, confidentialite et contraintes reglementaires |
| Deja contacte ? | Controle de la base `~/jobs/_db/jobs.db` et des correspondances; pas de doublon |
| Action suivante ? | Un seul responsable, une action, une date, une preuve |

Une annonce `remote Europe` ne prouve pas la possibilité d'une sous-traitance B2B ni les conditions d'accès aux données. Tout travail hors de France exige une vérification contractuelle spécifique. Un profil qui parait adapte techniquement n'est pas automatiquement une opportunite commerciale.

## Critere de qualification et apprentissage

Prioriser les 20 prospects ayant la combinaison la plus credible de besoin, budget, urgence, stack compatible et possibilité de travailler à distance depuis la France. Apres les premieres conversations, ajuster les cibles en fonction des budgets reels et objections relevees, pas des tendances marketing.
