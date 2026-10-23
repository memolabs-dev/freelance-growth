# Freelance Growth — pilote GO/NO-GO de prospection, 26 octobre–2 novembre 2026

**Règle : aucun envoi ni candidature automatique, aucune autorisation implicite.** Une PR verte, un brouillon et un contrôle qualité ne donnent **jamais** le droit d'écrire à quelqu'un. Suivi des échanges et identité des destinataires dans Gmail / système personnel, **pas dans ce dépôt public**. `~/jobs` est la source historique des candidatures en lecture seule.

## Responsabilités

- **Agent/orchestrateur** : vérifier source/date/client final, conditions 100 % remote depuis la France, contrat B2B, budget ou nécessité de le clarifier, doublons Gmail et ~/jobs, preuves réelles, personnalisation, proposer texte et destinataire à l'utilisateur ; coder et tester des garde-fous. Il ne contacte personne.
- **Propriétaire** : valide ou refuse le **texte exact et le destinataire exact**, après avoir vu la qualification. L'agent ne peut pas fabriquer cette approbation. Si le message change, une nouvelle approbation est nécessaire.
- **Opérateur de suivi** : après une action effectivement réalisée et observée, relit l'accusé/fil/provider/ATS et consigne une référence externe privée. `SENT_CONFIRMED`/`APPLIED_CONFIRMED` ne peut être affirmé sur la seule base d'une commande locale ou d'un message « j'ai préparé ».

## Machine d'état et preuve requise

`DISCOVERED → QUALIFIED → DRAFT → READY_FOR_HUMAN_REVIEW → APPROVED_FOR_SPECIFIC_MESSAGE → SENT_CONFIRMED / APPLIED_CONFIRMED → REPLIED → CLOSED`

À tout moment `DO_NOT_CONTACT` si opposition, refus ou exclusion ; clôture avec raison. `READY_FOR_HUMAN_REVIEW` est **le maximum sans approbation externe du propriétaire**. Un profil Altor soumis au réseau **n'est pas une mission ni un contact acheteur** ; le statut d'inscription nécessite son propre accusé, indépendant d'un contrat.

Le module pur `scripts/pilot-state.mjs` valide le chemin et calcule une empreinte SHA-256 du destinataire/sujet/corps. **Il ne stocke ni n'envoie rien**. Il accepte des événements d'approbation et de livraison *déclarés* : leur authenticité doit toujours être vérifiée par l'humain/les connecteurs externes. Une empreinte n'est pas une preuve de consentement.

Le contrôle rédactionnel existant `scripts/review-outbound.mjs` doit renvoyer `READY_FOR_HUMAN_REVIEW` et aucun `error` avant une éventuelle présentation à l'utilisateur. Les vérifications de refus / doublons doivent être **refaites au moment réel de l'envoi**.

## Cohorte du 26/10 au 02/11 — gestion zéro fiction

- Deux à trois contacts maximum **après autorisation individuelle**, parmi une mission contractuelle authentique, un acheteur SaaS avec besoin réel, ou un intermédiaire avec commande explicite. Le volume n'est pas un quota.
- Première mission à qualifier : Gamme solutions « Développeur SaaS Senior — Remote ». Le tableau mixte `Freelance/CDI/CDD` et 100–550 €/jour n'autorise pas à conclure contrat freelance ni TJM de 550 €. Demander explicitement contrat B2B, charge Laravel, décideur client et prix.
- Annonce agentique Python : écart de compétences / pays et TJM non confirmés. Ne pas « sur-vendre » une expertise Python.
- Station F/Techunt/KatchMe/Beyond Skills : **HOLD_DUPLICATE_POSSIBLE** jusqu'à distinction documentée du client final. Nextcloud non nouveau. Medsharing déjà traité, Symbyoz/Adriver exclus. Oudini/symbolist. historique existant, pas de nouvelle intro. Askable screened_out.
- **Altor** : inscription réseau déclarée par le propriétaire le 23/10, confirmation indépendante non constatée ; vérifier uniquement une vraie réponse/mission, pas de nouvelle inscription automatique.
- Aucun abonnement Codeur ou autre sans décision expresse sur le coût.

## Indicateurs : « inconnus » différent de « zéro »

Ne renseigner des nombres **qu'après vérification du dénominateur**. L'état initial du pilote au 23/10 est :
- Messages approuvés, effectivement envoyés sur ce pilote : **non encore observés**, pas « 3 » parce qu'il existe trois brouillons.
- Réponses humaines positives : **non mesurées** ; réponses automatiques et « bienvenue » réseau ne constituent pas une réponse d'acheteur.
- Entretiens **tenus** : non mesurés ; rendez-vous prévus ≠ tenus.
- Devis envoyés : non mesurés ; un template local ≠ devis envoyé.
- Signatures/factures/encaissements : non mesurés, ne jamais renseigner des montants anticipés comme reçus.

Pour le bilan #12, saisir des **agrégats anonymes** seulement après lectures des preuves du canal : `channel`, `actual_messages_sent`, `positive_human_replies`, `calls_held`, `quotes_sent`, `signed_value_eur`, `invoiced_eur`, `collected_eur`, `hours_spent`. Si le nombre d'envois est nul, le ratio de réponse est **N/A**, pas 0 %. Le délai d'acquisition et les frais par plateforme sont des coûts réels, pas des estimations.

## GO/NO-GO du 2 novembre

1. Source primaire/date + identité acheteur + contrat B2B + remote France : confirmé ou **HOLD**, aucun envoi précipité.
2. Un prospect qui a explicitement indiqué budget et première tâche = GO pour préparer un devis ou un échange court, avec validation propriétaire.
3. Si pas d'intérêt après de vraies démarches limitées, vérifier message/proposition/source, **pas** pousser 100 mails automatiques. Six agences sans signal d'achat = stop à ce réservoir, ne pas confondre annuaires avec acheteurs.
4. Si un appel révèle manque de budget, réduire le périmètre ou arrêter ; ne pas baisser automatiquement le TJM.
5. Première dépense plateforme : règle NO-GO tant qu'aucun calcul de retour probable n'est documenté et approuvé.

La limite métier est toujours **recette réelle en usage utilisateur** : tests unitaires verts et CI seuls ne suffisent pas à présenter une app IA comme prête à livrer. Toute offre AI App Rescue utilise une validation E2E, la reproduction d'erreurs et la vérification métier des réponses.

## Bilan et suivi

- `#45` : protocole et tests.
- `#40` : recherche de missions réellement budgétées.
- `#41` : seulement dossiers agences avec signal d'achat, pas trois emails artificiels.
- `#43` : AI App Rescue en expérimentation bornée, aucun SaaS.
- `#12` : mesure seulement après cohorte **effectivement envoyée**.
- `#46` : orchestrateur, prendre décision GO/PIVOT en fonction de la conversion et du temps-to-cash.

La trace de tout message réel doit rester hors de Git, avec une référence vérifiée par le fournisseur et le propriétaire.
