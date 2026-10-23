# Audit anti-doublon des candidatures existantes

**Date de vérification :** 19 octobre 2026. **Source canonique :** `~/jobs/_db/jobs.db`, table `opportunities`, champ `data.notes` lu dans son entier pour les sept candidatures indiquées dans l'issue #4. Base en lecture seule, aucun statut changé, aucun message envoyé.

## Découverte décisive : lire les notes chronologiques jusqu'au bout

Certaines fiches contiennent d'abord « RIEN envoyé », puis **plus loin un événement daté confirmant l'envoi**. Se limiter aux premiers caractères des notes produit un faux « candidature à faire » et peut créer des doublons.

| Société | Preuve d'envoi dans les notes | Date | Statut observé | Prochaine action raisonnable | Géographie Thaïlande |
|---|---|---|---|---|---|
| **KatchMe Consulting**, Founding Lead Engineer | Email envoyé, Message ID documenté; relance **envoyée** le 06/10 | 22/09, relance 06/10 | `applied`; suivi prévu 13/10 | **Ne pas repostuler.** Lire une réponse éventuellement reçue depuis le dernier contrôle Gmail du 05/10; relance supplémentaire seulement après vérification du fil. | Full remote annoncé à Paris; pays Thaïlande **non confirmé** |
| **DotWorld**, Ingénieur Full Stack Next.js | Email envoyé, Message ID documenté; réponse à Noémie **envoyée** le 06/10; engagement à déposer une candidature sur le site carrière | 22/09, échange 06/10 | `applied`; suivi prévu 09/10 | **Ne pas renvoyer le même email.** Contrôler si la candidature Teamtailor promise le 06/10 a effectivement été déposée, puis échanger sur freelance et résidence. | **Remote Europe**, Thaïlande non autorisée par défaut |
| **Gropyus**, Freelance Frontend | Formulaire Greenhouse soumis, page de confirmation vue; CV et lettre joints; tarif 600 EUR/j indiqué | 21/09 | `applied` | **Aucun second envoi.** Demander une exception de résidence seulement si pertinente; sinon écarter du plan Thaïlande. | **Remote depuis l'UE uniquement**, incompatible sans dérogation écrite |
| **Citrust via emeRHode**, développeur SaaS | Entretien téléphonique **effectué** le 06/10 avec recruteuse; notes du 07/10 confirment | 06/10 | `interview`, 65 000 EUR + bonus annoncés | Vérifier le retour recruteur et si contrat **B2B** possible, avant relance. **Ne pas présenter comme mission freelance acquise.** | Remote non précisé à l'étranger |
| **Fredrin**, Forward Deployed Engineer | Plus loin dans les notes : **[ENVOYEE 2026-10-06]**, page « Application received »; CV joint | 06/10 | `applied`, suivi prévu 16/10 | **Ne pas repostuler.** La mention initiale « RIEN envoyé » était un état antérieur. Tester le produit comme annoncé au client, puis vérifier réponse et fuseaux US. | Remote async, autorisation Thaïlande à confirmer |
| **Revieve Oy**, Senior Product Engineer | Plus loin : **[ENVOYEE 2026-10-06]** sur Factorial, page de remerciement. Lettre soumise **sans CV**; « contractor full time » répondu NON. | 06/10 | `applied`, suivi prévu 16/10 | **Ne pas repostuler sans accord.** Contrat Vendor/Contractor mais candidature potentiellement affaiblie par CV manquant et réponse NON. Vérifier réponse puis rectifier si recruteur ouvre l'échange. | Condition de disponibilité à moins de 3 h du CET : **Thaïlande incompatible en pratique** si exigence fixe |
| **distru**, Senior AI Product Engineer | Plus loin : **[ENVOYEE 2026-10-06]** via Lever; message « already submitted » après hCaptcha = indication d'envoi | 06/10 | `applied`, suivi prévu 16/10 | **Ne pas repostuler.** Contrôler réponse, clarifier contrat, horaires US et secteur; la confirmation de page est la preuve, pas un reçu Gmail. | Agrégateur annonce Worldwide; conditions réelles et travail depuis Thaïlande à confirmer |

## Limites de preuve

- Ces résultats proviennent des **notes d'opérations enregistrées dans SQLite**, pas d'une consultation en temps réel des boîtes email ou des sites ATS.
- La dernière lecture Gmail mentionnée dans plusieurs fiches date du **05/10/2026**; elle **ne permet pas d'affirmer qu'aucune réponse n'a été reçue depuis**.
- « Page Application received » constitue une preuve d'interface enregistrée, pas nécessairement un courriel de confirmation ni un entretien garanti.
- `sent_date` peut avoir été inscrit avant la soumission réelle. La preuve à privilégier est l'événement **le plus récent et explicitement confirmé** dans les notes.

## Correctif fonctionnel à prévoir dans ~/jobs

Le moteur ne devrait pas inférer « non envoyé » depuis une sous-chaîne obsolète des notes. Recommandation non appliquée ici :

1. Introduire un journal structuré d'événements `application_prepared`, `submitted`, `submission_confirmed`, `reply_received`, `followup_sent`, `interview_completed`, avec date et méthode de preuve.
2. Calculer `application_state` depuis le **dernier événement probant**, sans écraser les faits historiques.
3. Bloquer toute nouvelle candidature pour le même couple `company + role + URL` quand un événement de soumission est enregistré, sauf nouvelle candidature approuvée pour poste distinct.
4. Lier les relances à un contrôle du dernier message entrant et aux oppositions; **pas de relance automatique** fondée uniquement sur `follow_up_date`.
5. Garder `~/jobs/_db/jobs.db` source unique, jamais le JSON miroir.

## Priorités opérationnelles

**P0 :** vérifier les réponses KatchMe et DotWorld, l'appel Citrust et les réponses Fredrin / Revieve / distru avant tout envoi. **P0 géographie :** Gropyus exclu du pipeline Thaïlande sans exception contractuelle. **P1 :** corriger la représentation des événements dans ~/jobs via une tâche séparée avant de modifier les statuts.

**Aucune candidature ni relance supplémentaire envoyée dans ce chantier.**
