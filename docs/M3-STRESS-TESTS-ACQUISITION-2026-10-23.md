# Stress tests de portefeuilles freelance — 23 octobre 2026

**Ceci est une SIMULATION CONDITIONNELLE, pas une prédiction statistique de signature.** Toutes les probabilités du modèle sont des **hypothèses de travail inventées pour comparer les mécanismes**. Aucune n’a été estimée sur les ventes Memo Labs. Le catalogue de 216 tactiques n’a pas été A/B testé. Les valeurs de contrat sont des hypothèses, jamais des budgets clients vérifiés.

## Protocole et unités

- Tous les plans disposent de **40 heures de prospection/qualification et preuve au total sur 4 semaines** ; scénarios évalués sur 90 jours. La disponibilité réelle du propriétaire est **à confirmer**, ces 40 h sont un étalon, non un agenda réservé.
- Pour chaque **dossier d’opportunité** trouvé après recherche, on simule : éligibilité (B2B, remote France, buyer, stack, absence de doublon), rendez-vous, proposition, contrat signé, puis premier encaissement conditionnel. Un même client à travers trois recruteurs ne constitue qu’un dossier, non trois chances.
- Monte Carlo **20 000 itérations seedées par portefeuille/régime**; chaque événement et délai est tiré selon les distributions assumées. Indépendance entre dossiers et absence de capacité de livraison simultanée sont des simplifications **favorables** ; corrélation et indisponibilités réelles réduiraient probablement les résultats.
- Le montant **signé** est une valeur faciale indicative de mission et peut ne jamais être complètement facturé. Le montant **encaissé avant J+90** est seulement une première facture ou un acompte hypothétique, après commission et délais simulés. Ni l’un ni l’autre ne sont du revenu net après cotisations, impôts et coûts personnels.
- Les commissions de 5–10% sur co-traitance/ESN sont des **proxies de friction économique** (pas des barèmes réglementaires, ni des commissions facturées au prestataire) ; le 10% plateforme reflète seulement un exemple d’entrée Malt. Le vrai pourcentage Upwork dépend du contrat, 0–15%.
- Une conversation avec un CTO sans budget ne vaut pas un contrat. Une inscription au vivier Altor ne vaut pas une mission. Aucun contact n’a été envoyé pour la simulation.

## 1. Politiques comparées à budget d’heures identique

| Portefeuille | Dossiers théoriques | Répartition / preuve | Heures |
|---|---:|---|---:|
| Equilibre mandats + co-traitance + recruteurs | 15 | 7 direct, 4 recruiter, 4 partner ; preuve 6 h | 40 |
| Priorite missions directes | 17 | 12 direct, 5 recruiter ; preuve 6 h | 40 |
| Priorite co-traitants et agences | 11 | 8 partner, 3 agency ; preuve 7 h | 40 |
| Priorite plateformes | 15 | 12 marketplace, 3 direct ; preuve 4 h | 40 |
| Prospection directe basee sur signal | 11 | 8 trigger, 3 direct ; preuve 6 h | 40 |
| Preuves et demonstrations d'abord | 12 | 8 direct, 4 recruiter ; preuve 16 h | 40 |
| Diagnostic paye avant mission longue | 11 | 6 rescue, 5 direct ; preuve 6 h | 40 |
| Diversifie direct+recruteur+partenaire+plateforme | 15 | 5 direct, 3 recruiter, 5 partner, 2 marketplace ; preuve 4 h | 40 |

**Attention :** « dossier » = capacité simulée à examiner une piste, pas un acheteur identifié. Le modèle n’a créé, réservé ni soumis aucun lead.

## 2. Résultats du régime central (probabilités hypothétiques)

| Portefeuille | Dossiers admissibles moyens | Entretiens moyens | Devis moyens | P(≥1 signature J+90) | P(1er encaissement J+90) | CA facial signé moyen | Cash J+90 moyen | Médiane signée |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Priorite missions directes | 9.7 | 3.32 | 1.83 | 38 % | 2 % | 10 377 € | 148 € | 0 € |
| Equilibre mandats + co-traitance + recruteurs | 7.7 | 2.78 | 1.53 | 35 % | 11 % | 7 084 € | 329 € | 0 € |
| Preuves et demonstrations d'abord | 6.8 | 2.62 | 1.45 | 33 % | 2 % | 8 503 € | 121 € | 0 € |
| Diversifie direct+recruteur+partenaire+plateforme | 7.3 | 2.54 | 1.39 | 31 % | 12 % | 5 436 € | 333 € | 0 € |
| Priorite co-traitants et agences | 4 | 1.56 | 0.86 | 25 % | 22 % | 959 € | 565 € | 0 € |
| Priorite plateformes | 6.8 | 2 | 1.02 | 19 % | 1 % | 4 267 € | 67 € | 0 € |
| Diagnostic paye avant mission longue | 4.8 | 1.35 | 0.72 | 17 % | 5 % | 3 216 € | 95 € | 0 € |
| Prospection directe basee sur signal | 4.8 | 0.87 | 0.47 | 11 % | 3 % | 2 045 € | 92 € | 0 € |

**Lecture correcte :** si la médiane des montants signés est **0 €**, ce n’est pas un bug : dans plus de la moitié des simulations, aucun contrat n’est signé sous ces hypothèses. P(≥1 signature) ne vient pas d’une étude client, et n’est **pas** une probabilité réelle de signer.

## 3. Résilience au marché : adverse / central / favorable

| Portefeuille | Adverse P(≥1 signé) | Central | Favorable | Adverse P(cash J+90) | Central | Favorable |
|---|---:|---:|---:|---:|---:|---:|
| Equilibre mandats + co-traitance + recruteurs | 10 % | 35 % | 68 % | 2 % | 11 % | 35 % |
| Priorite missions directes | 12 % | 38 % | 72 % | 0 % | 2 % | 20 % |
| Priorite co-traitants et agences | 7 % | 25 % | 52 % | 4 % | 22 % | 51 % |
| Priorite plateformes | 5 % | 19 % | 43 % | 0 % | 1 % | 9 % |
| Prospection directe basee sur signal | 3 % | 11 % | 27 % | 1 % | 3 % | 12 % |
| Preuves et demonstrations d'abord | 9 % | 33 % | 65 % | 0 % | 2 % | 17 % |
| Diagnostic paye avant mission longue | 4 % | 17 % | 40 % | 1 % | 5 % | 17 % |
| Diversifie direct+recruteur+partenaire+plateforme | 9 % | 31 % | 63 % | 2 % | 12 % | 37 % |

**Les mondes adverse, central et favorable ne sont PAS des intervalles de confiance** : ils changent arbitrairement l’éligibilité, les rendez-vous, la conversion et les délais de paiement.

## 4. Stress tests de dépendance critique
| Choc | Mix maximisant P(≥1 signature) | P(signature) synthétique | Mix maximisant P(cash J+90) | P(cash) synthétique |
|---|---|---:|---|---:|
| Remote France rare | Priorite co-traitants et agences | 25 % | Priorite co-traitants et agences | 21 % |
| Pas assez de partenaires avec clients | Priorite missions directes | 38 % | Priorite co-traitants et agences | 9 % |
| La preuve ne change pas la conversion | Priorite missions directes | 37 % | Priorite co-traitants et agences | 20 % |
| Preuve technique très persuasive (hypothèse) | Preuves et demonstrations d'abord | 44 % | Priorite co-traitants et agences | 24 % |
| Paiements décalés de 30 jours | Priorite missions directes | 39 % | Priorite co-traitants et agences | 11 % |
| Prospection directe peu réactive | Priorite missions directes | 39 % | Priorite co-traitants et agences | 22 % |

**Interprétation clé :** l’optimisation du montant facial signé favorise les missions longues, alors que le premier encaissement peut favoriser un petit lot signé rapidement et facturé avec acompte. Un faible cash J+90 ne prouve pas l’absence de contrats, mais oblige à vérifier la trésorerie.

## 5. Données empiriques ET limites, indépendantes des probabilités choisies

- [Freelancermap 2025, page 14](https://www.freelancermap.com/files/survey/freelancer-study-2025.pdf) : canaux cités comme les plus efficaces par les répondants : plateformes 33 %, réseau personnel 23 %, recrutement 16 %, recommandations 14 %. Ce n’est pas un taux de signature.
- [FreelanceMention octobre 2026](https://app.freelancemention.fr/blog/freelance-informatique/) : environ 13 % full remote parmi 9 319 annonces LinkedIn IT/Data détectées sur sa période ; [FreelanceScope, septembre 2026](https://www.freelancescope.fr/blog/missions-freelance-full-remote-septembre-2026) : seulement 2 % sur 4 788 missions de son catalogue. Les échantillons et définitions ne sont pas interchangeables.
- [Sales.co, octobre 2026](https://sales.co/research/cold-email-conversion-rate-benchmarks) : 0,84 % réponses humaines par contact et 0,29 % réponses positives parmi 336 257 contacts de 20 campagnes. Cette donnée sur du cold email massif **n’étalonne pas** la probabilité de rendez-vous d’une approche ultra-personnalisée.
- [Malt, commissions](https://help.malt.com/kb/guide/fr/la-commission-malt-h2dK0HxuKA/Steps/2510922) : 10 % initial puis 5 % après six mois, 2 % si client apporté ; [Upwork](https://support.upwork.com/hc/en-us/articles/211062538-Learn-about-the-Freelancer-Service-Fee) : 0–15 % suivant contrat. Les montants exacts doivent être demandés.
- [Service Public (août 2026)](https://entreprendre.service-public.gouv.fr/vosdroits/F23211) : 30 jours par défaut pour paiements entre professionnels, sous conditions 60 jours ou 45 jours fin de mois. Un contrat signé ne vaut pas un paiement instantané.
- [Malt Tech Trends 2026](https://www.malt.fr/resources/trends/malt-tech-trends) : n8n et agents IA progressent sur la plateforme, mais cela ne prouve ni budget du prospect ni mission viable pour Memo Labs.

## 6. Arbitrage avant passage au concret

**La recherche ne permet PAS de sélectionner un unique vainqueur statistique.** Choix *minimax/pragmatique* recommandé : **équilibre mandats directs + recruteurs mandatés + co-traitants réels**, et seulement une preuve courte existante, pas une nouvelle démo à construire durant deux semaines.

**Falsification dès le premier cycle, avant envoi :**
- Si aucun mandat actif B2B remote France à prix défendable n’est repérable après 6–8 dossiers correctement vérifiés, le sous-canal est en HOLD et on mesure ce manque au lieu d’inventer des leads.
- Si aucun freelance complémentaire n’a de client en cours ni besoin de renfort, stop « co-traitance » pour ce cycle : un partenaire potentiel sans mandat = 0 acheteur.
- Si la preuve de fiabilisation ne peut pas être exécutée de bout en bout devant un tiers, ne pas vendre « E2E validé » ou « production ready ». Des projets personnels peuvent démontrer l’architecture mais pas l’adoption client.
- Si un intermédiaire refuse le 100 % remote depuis France, stop ; Thaïlande future exige contrat écrit distinct. Si plusieurs annonces désignent le même client Station F, compter 1 buyer, pas plusieurs opportunités.

**Pilotage d’expérimentation limité :** 40 heures / 4 semaines est un scénario, pas un engagement. Avant toute candidature demander validation du destinataire et texte final. Mesurer dès lors le funnel réel par canal : dossiers examinés, réellement éligibles, approbations, candidatures effectivement envoyées, réponses, entretiens, offres, contrats, factures, encaissements et heures consommées.
