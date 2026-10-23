# M3 V2 — Simulations de robustesse corrigées (23 octobre 2026)

**Ce document simule des scénarios hypothétiques. Aucun taux de conversion n’est calibré sur les ventes Memo Labs. Les probabilités ne sont ni des prévisions ni des intervalles de confiance.**

## Les corrections importantes

- Corrélation : un climat de marché commun et un climat des partenaires communs relient les opportunités de la même simulation. Un facteur de doublon réduit les annonces distinctes supposées. Dans la vraie vie il faut également dédupliquer par nom du client final.
- Capacité : les missions longues réservent 3,5 jours par semaine pendant 12 semaines ; les sprints 3 jours par semaine pendant deux semaines. Une mission supplémentaire incompatible n’est pas comptée comme signée.
- Facturation : contrat signé, travail réalisé, facture émise et paiement encaissé sont suivis séparément aux horizons J+30, J+60, J+90, J+180 ; les factures longues suivent des périodes de 28 jours, les acomptes ne sont pas automatiques.
- Annulation : un contrat interrompu peut être signé mais pas facturé intégralement. Le modèle ne prétend pas traiter la fiscalité, les cotisations, les éventuelles créances irrécouvrables ou les pénalités contractuelles.
- 8 allocations commerciales; 25 scénarios de choc dont marchés, prix, pénurie remote, concurrence, délais client, paiements, preuves, capacité et doublons ; 20/40/80 heures de recherche sur quatre semaines ; quatre horizons.
- Modèle déterministe seedé pour rendre les simulations reproductibles. Les paramètres de conversion restent des hypothèses **inventées**, donc davantage de tirages ne rend pas la prévision plus fiable.

## Tableau du scénario central à 40 heures de préparation

| Portefeuille | P(signature J90), simulée | P(cash J90), simulée | Signé J90 attendu | Produit J90 | Facturé J90 | Payé J90 | Payé J180 |
|---|---:|---:|---:|---:|---:|---:|---:|
| Priorite missions directes | 34.8 % | 1.7 % | 7 659 € | 3 856 € | 2 333 € | 122 € | 7 237 € |
| Equilibre mandats + co-traitance + recruteurs | 31.1 % | 7.1 % | 5 448 € | 2 866 € | 1 883 € | 237 € | 5 121 € |
| Diversifie direct+recruteur+partenaire+plateforme | 30.8 % | 8.1 % | 4 831 € | 2 632 € | 1 782 € | 252 € | 4 538 € |
| Preuves et demonstrations d'abord | 27.9 % | 1.2 % | 6 122 € | 3 081 € | 1 890 € | 84 € | 5 762 € |
| Priorite co-traitants et agences | 21.9 % | 15.4 % | 865 € | 828 € | 834 € | 394 € | 835 € |
| Priorite plateformes | 17.8 % | 0.7 % | 3 681 € | 1 836 € | 1 125 € | 49 € | 3 465 € |
| Diagnostic paye avant mission longue | 16.1 % | 3.3 % | 2 855 € | 1 454 € | 906 € | 65 € | 2 664 € |
| Prospection directe basee sur signal | 11 % | 2.2 % | 2 055 € | 1 081 € | 721 € | 78 € | 1 910 € |

**Une valeur espérée positive n’indique pas un gain probable à l’échelle individuelle : beaucoup de tirages n’obtiennent aucun contrat.**

## Les 25 scénarios de sensibilité

| Stress test | Meilleure P(signature J90) dans ce modèle | P simulée | Meilleur encaissement J90 dans ce modèle | € simulés |
|---|---|---:|---|---:|
| Central (hypothèses) | Priorite missions directes | 34.8 % | Priorite co-traitants et agences | 394 € |
| Pénurie remote France | Equilibre mandats + co-traitance + recruteurs | 23.3 % | Priorite co-traitants et agences | 394 € |
| Remote pan-européen admissible | Priorite missions directes | 41.8 % | Priorite co-traitants et agences | 394 € |
| Peu de co-traitants mandatés | Priorite missions directes | 34.8 % | Priorite missions directes | 122 € |
| Co-traitants avec clients identifiés | Priorite co-traitants et agences | 41.8 % | Priorite co-traitants et agences | 814 € |
| Marché contracté | Priorite co-traitants et agences | 21.9 % | Priorite co-traitants et agences | 394 € |
| Marché porteur | Priorite missions directes | 53.9 % | Priorite co-traitants et agences | 394 € |
| Annonces multi-ESN dupliquées | Priorite missions directes | 24.8 % | Priorite co-traitants et agences | 232 € |
| Mandats principalement uniques | Priorite missions directes | 40.4 % | Priorite co-traitants et agences | 452 € |
| Cold très peu réactif | Priorite missions directes | 34.8 % | Priorite co-traitants et agences | 394 € |
| Signal acheteur très précis | Priorite missions directes | 34.8 % | Priorite co-traitants et agences | 394 € |
| TJM négocié -20 % | Priorite missions directes | 34.8 % | Priorite co-traitants et agences | 315 € |
| Prix +15 % sous preuves adaptées | Priorite missions directes | 31.3 % | Priorite co-traitants et agences | 394 € |
| Conditions net 60 jours | Priorite missions directes | 34.8 % | Priorite co-traitants et agences | 164 € |
| Retard de paiement hors contrat +90 jours | Priorite missions directes | 34.8 % | Priorite co-traitants et agences | 164 € |
| Aucun acompte négocié | Priorite missions directes | 34.8 % | Priorite co-traitants et agences | 283 € |
| Acomptes prévus sur chaque sprint | Priorite missions directes | 34.8 % | Priorite co-traitants et agences | 549 € |
| Capacité 3 jours livraison/semaine | Priorite co-traitants et agences | 21.9 % | Priorite co-traitants et agences | 394 € |
| Capacité 6 jours/semaine (risque) | Priorite missions directes | 34.8 % | Priorite co-traitants et agences | 400 € |
| Ruptures anticipées / scope instable | Priorite missions directes | 33.2 % | Priorite co-traitants et agences | 360 € |
| La preuve technique convainc peu | Priorite missions directes | 30.4 % | Priorite co-traitants et agences | 304 € |
| La preuve convainc davantage | Priorite missions directes | 44.2 % | Priorite co-traitants et agences | 490 € |
| Exigences séniorité difficiles | Priorite missions directes | 26.2 % | Priorite co-traitants et agences | 394 € |
| Surcoûts intermédiation +10 points | Priorite missions directes | 34.8 % | Priorite co-traitants et agences | 352 € |
| Cycles de validation client +25 jours | Priorite missions directes | 34.8 % | Priorite co-traitants et agences | 157 € |

## Temps disponible : 20 h, 40 h et 80 h

| Temps sur 4 semaines | Mix | P(signature J90) simulée | Signé J90 | Payé J90 |
|---|---|---:|---:|---:|
| 20 h | Equilibre mandats + co-traitance + recruteurs | 17.6 % | 2 933 € | 117 € |
| 20 h | Priorite missions directes | 19.1 % | 4 151 € | 72 € |
| 20 h | Priorite co-traitants et agences | 10.1 % | 384 € | 174 € |
| 40 h | Equilibre mandats + co-traitance + recruteurs | 31.1 % | 5 448 € | 237 € |
| 40 h | Priorite missions directes | 34.8 % | 7 659 € | 122 € |
| 40 h | Priorite co-traitants et agences | 21.9 % | 865 € | 394 € |
| 80 h | Equilibre mandats + co-traitance + recruteurs | 55.1 % | 10 377 € | 417 € |
| 80 h | Priorite missions directes | 57.2 % | 12 588 € | 268 € |
| 80 h | Priorite co-traitants et agences | 39.5 % | 1 790 € | 733 € |

## Robustesse des rangs, à ne pas confondre avec une validation statistique

| Mix | Top 3 signature sur 25 | Top 3 paiement sur 25 | Regret signé moyen hypothétique | Regret paiement moyen hypothétique |
|---|---:|---:|---:|---:|
| Priorite co-traitants et agences | 4 | 24 | 6 308 € | 3 € |
| Diversifie direct+recruteur+partenaire+plateforme | 20 | 25 | 2 743 € | 136 € |
| Equilibre mandats + co-traitance + recruteurs | 25 | 25 | 2 083 € | 157 € |
| Priorite missions directes | 22 | 1 | 35 € | 273 € |
| Preuves et demonstrations d'abord | 4 | 0 | 1 433 € | 289 € |
| Prospection directe basee sur signal | 0 | 0 | 5 294 € | 296 € |
| Diagnostic paye avant mission longue | 0 | 0 | 4 511 € | 308 € |
| Priorite plateformes | 0 | 0 | 3 728 € | 318 € |

Les chocs et leur importance sont **choisis par nous**. Ce classement indique où poser nos premières questions, pas quel canal signera réellement.

## Vérifications empiriques distinctes des hypothèses de conversion

- [Freelancermap Study 2025, p14](https://www.freelancermap.com/files/survey/freelancer-study-2025.pdf) : 33 % des freelances interrogés désignent les plateformes comme meilleur canal, 23 % réseau personnel, 16 % recruteurs, 14 % recommandations ; pas des taux de signature.
- [FreelanceScope, septembre 2026](https://www.freelancescope.fr/blog/missions-freelance-full-remote-septembre-2026) : 97 / 4 788 annonces en full remote dans son catalogue ; [FreelanceMention, octobre 2026](https://pro.freelancemention.fr/blog/mission-freelance-teletravail/) : 13 % dans un échantillon LinkedIn différent. Ces taux ne se transfèrent pas directement au modèle.
- [Service Public, août 2026](https://entreprendre.service-public.gouv.fr/vosdroits/F23211) : règlement B2B général à 30 jours, aménagements sous conditions à 60 jours ou 45 jours fin de mois.
- [Malt, septembre 2025](https://help.malt.com/kb/guide/fr/la-commission-malt-h2dK0HxuKA/Steps/2510922) : commission initiale 10 %, puis 5 % après six mois, 2 % si client apporté ; le taux contractuel réel est communiqué à la proposition.
- [Service Public, 2026](https://entreprendre.service-public.gouv.fr/actualites/A18813) : seuil de 83 600 € HT/an pour certaines prestations de services sous régime micro, sous réserve des règles applicables. Aucun calcul du net après charges dans cette simulation.

## Décision provisoire et falsification

**Privilégier une recherche diversifiée et réversible : mandats B2B remote France, recruteurs disposant de mandats réels, co-traitance avec client déjà signé.** Mesurer séparément contrat signé, montant produit, facture et trésorerie. Ne pas signer une mission qui exige une capacité ou une présence non disponible.
Continuer #40 (mandats réellement éligibles), #62 (co-traitants avec client actuel) et #63 (preuve React/API/E2E exécutée), sans démarchage tant que destinataire, texte et canal précis ne sont pas approuvés.
Exclusions inchangées : Medsharing déjà traité, Symbyoz et Adriver exclus ; éviter aussi Nextcloud, KatchMe/Techunt/Beyond Skills/Station F et contacts historiques en doublon.
Le goulot reste la preuve de véritables acheteurs, **pas le nombre de scénarios simulés**. Aucune candidature ni dépense envoyée.
