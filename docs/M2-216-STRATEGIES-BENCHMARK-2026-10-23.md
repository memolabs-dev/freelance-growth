# Benchmark reproductible de 216 stratégies — 23 octobre 2026

**Analyse hypothétique, pas essai randomisé ni observation de 216 contrats.** 18 familles × 12 tactiques distinctes. La littérature est reliée aux **familles**, jamais présentée comme preuve que chaque tactique marche chez ce freelance. Les notes (1–5 par critère) sont des jugements exploratoires qui servent à ordonner les validations, **pas des probabilités de signer**. Les contraintes B2B, France 100 % remote, historique de contact, statut et véracité prévalent sur toutes les notes. Aucun contact envoyé.

## Méthode et garde-fous

- Source : `data/strategies_216_2026-10-23.csv` + `data/strategies_sources_2026-10-23.tsv` ; résultat calculé par `node scripts/benchmark-strategies.mjs --write`.
- 216 tactiques **conçues et examinées**, aucune n’a fait l’objet de 216 essais A/B observés.
- 18 familles dont recherche, conversion, preuve et rétention : **seules les tactiques DISCOVERY admissibles participent au classement de découverte**. Les autres familles sont des compléments nécessaires, pas des concurrents de Free-Work pour « trouver un lead ».
- Les critères : intention d’achat, adéquation technique, délai probable vers une opportunité, compatibilité remote France, avantage de coût, différenciation. Chaque score 1–5 est **subjectif** et peut être contredit par le terrain.
- Les exclusions de l’utilisateur, refus et doublons priment même sur un score élevé : Medsharing déjà traité, Symbyoz et Adriver exclus ; ne pas recontacter Nextcloud, KatchMe/Techunt/Beyond Skills/Station F en doublon, Oudini/symbolist., Askable screened_out.
- `NO_GO` exclu et `APRES_PREMIER_CLIENT` hors classement initial. Une stratégie `HOLD_CONDITIONS` n’est pas prête à déclencher une démarche, même si son score est haut.

## Pondérations et analyse de sensibilité

| Scénario | Intention | Profil | Délai | Remote | Coût | Différenciation |
| --- | --- | --- | --- | --- | --- | --- |
| principal | 25 % | 20 % | 20 % | 15 % | 10 % | 10 % |
| revenu_rapide | 30 % | 20 % | 25 % | 10 % | 10 % | 5 % |
| premium_long_terme | 20 % | 15 % | 5 % | 15 % | 10 % | 35 % |
| zero_depense | 20 % | 20 % | 15 % | 15 % | 25 % | 5 % |

Les scénarios représentent **des préférences arbitraires explicites**, pas des statistiques de ventes. Scores agrégés = moyenne des tactiques non NO_GO de chaque famille en phase DISCOVERY. Familles de preuve/closing/retenue absentes du tableau d’acquisition volontairement.

## Classement des familles de découverte admissibles

| Famille | Tactiques étudiées | Admissibles | Score principal /100 | Revenu rapide | Premium long terme | Zéro dépense | Dans Top 5 / 4 scénarios |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Missions directes | 12 | 12 | 91.3 | 94.3 | 81.3 | 93.3 | 3 |
| Alliances de freelances | 12 | 11 | 89 | 88 | 88 | 92 | 4 |
| Recruteurs et ESN | 12 | 10 | 85 | 89 | 71 | 85 | 3 |
| Introductions professionnelles | 12 | 11 | 84.4 | 83.4 | 81.4 | 87.4 | 4 |
| Agences sous-traitantes | 12 | 11 | 80 | 80 | 80 | 80 | 2 |
| Outreach par déclencheur | 12 | 9 | 80 | 79 | 82 | 81 | 2 |
| Revenus complémentaires | 12 | 9 | 74 | 73 | 70 | 73 | 0 |
| Open source et confiance | 12 | 11 | 73 | 67 | 85 | 79 | 1 |
| Verticalisation SaaS | 12 | 10 | 73 | 70 | 82 | 74 | 1 |
| Plateformes freelance | 12 | 10 | 72 | 74 | 62 | 71 | 0 |
| Communautés tech | 12 | 11 | 69 | 66 | 69 | 76 | 0 |
| RFP et appels d'offres | 12 | 10 | 69 | 70 | 67 | 68 | 0 |
| Écosystèmes partenaires | 12 | 10 | 67 | 64 | 74 | 70 | 0 |

**Interprétation** : un résultat élevé signale une *hypothèse à vérifier d’abord*, pas « cette tactique convertit à X % ». Les rangs proches sont indiscernables compte tenu de l’incertitude et de la subjectivité des critères.

## Top familles par scénario (robustesse)

**principal** : 1. Missions directes (91.3/100) ; 2. Alliances de freelances (89/100) ; 3. Recruteurs et ESN (85/100) ; 4. Introductions professionnelles (84.4/100) ; 5. Agences sous-traitantes (80/100).  
**revenu_rapide** : 1. Missions directes (94.3/100) ; 2. Recruteurs et ESN (89/100) ; 3. Alliances de freelances (88/100) ; 4. Introductions professionnelles (83.4/100) ; 5. Agences sous-traitantes (80/100).  
**premium_long_terme** : 1. Alliances de freelances (88/100) ; 2. Open source et confiance (85/100) ; 3. Outreach par déclencheur (82/100) ; 4. Verticalisation SaaS (82/100) ; 5. Introductions professionnelles (81.4/100).  
**zero_depense** : 1. Missions directes (93.3/100) ; 2. Alliances de freelances (92/100) ; 3. Introductions professionnelles (87.4/100) ; 4. Recruteurs et ESN (85/100) ; 5. Outreach par déclencheur (81/100).  

## Échantillon des actions représentatives par famille

| Famille | Exemple de tactique | Statut | Score principal (heuristique) |
| --- | --- | --- | --- |
| Missions directes | ATS employeur avec contrat freelance explicite | RESEARCH_ONLY | 93 |
| Alliances de freelances | Binôme designer produit et API Node | RESEARCH_ONLY | 89 |
| Recruteurs et ESN | Mandats React confiés à cabinet contractuel | RESEARCH_ONLY | 85 |
| Introductions professionnelles | Introduction par ancien collègue non exclu | RESEARCH_ONLY | 88 |
| Agences sous-traitantes | Appel agence explicite pour freelance Next.js | RESEARCH_ONLY | 80 |
| Outreach par déclencheur | Réponse manuelle à annonce CTO contractuel | RESEARCH_ONLY | 80 |
| Revenus complémentaires | Mission rémunérée évaluation code TypeScript | RESEARCH_ONLY | 74 |
| Open source et confiance | Correctif SDK TypeScript adopté par prospects | RESEARCH_ONLY | 73 |
| Verticalisation SaaS | API éditeur facturation à besoin contractuel | RESEARCH_ONLY | 73 |
| Plateformes freelance | Malt demandes client direct B2B | RESEARCH_ONLY | 74 |
| Communautés tech | Réponse à demande freelance d'un forum TS | RESEARCH_ONLY | 69 |
| RFP et appels d'offres | Consultation privée SaaS API déjà budgétée | RESEARCH_ONLY | 69 |
| Écosystèmes partenaires | Partenaire Vercel cherchant renfort freelance | RESEARCH_ONLY | 67 |

## Pourquoi ces données ne fournissent pas un taux de signature

- Freelancermap 2025, page 14 : **33 % plateformes de projets, 23 % réseaux personnels, 16 % recrutement, 14 % recommandations** parmi les canaux déclarés les plus efficaces ; **pas de taux de signature**, enquête multi pays et effectifs divergents 3 571/3 751. S01.
- FreelanceMention 2026 : **13 %** de missions IT/data classées full remote dans un échantillon LinkedIn de 9 319 missions. Ni répartition par stack ni droit contractuel à travailler depuis la France/Thaïlande. S02.
- LinkedIn/Ipsos 2026 : **41 % des petites entreprises interrogées** jugent les recommandations première source de leads, sur **300 PME US**. Différent des freelances interrogés, pas contradiction statistique directe. S09.
- Hinge 2026 : répartition des leads chez des **sociétés de services** (outreach 27,2 %, referrals 23,8 %, événements 12,4 %), pas performances freelance solo. S10.
- Sales.co 2026 : **0,84 %** réponses **humaines par contact** ; **0,29 %** réponses positives sur 336 257 contacts. RevenueFlow : **0,48 %** réponses humaines **par email** sur 1 413 405 envois. **Dénominateurs et portefeuilles différents : ne pas moyenner ni transférer à 3 emails personnalisés.** S11/S23.
- 6sense 2025 : échantillon d’achats B2B de **200 000 à 300 000 USD annuels médians**, n’est pas un benchmark des missions de freelance 3–6 mois. S22.
- Upwork 2026 : **AI Integration +178 %** selon revenus 2025 aux USA (S04) ; nettoyage de travail IA **+70 %** des annonces dans un panel propriétaire (S17) ; croissance ≠ budget du client ni salaire premium.
- DORA/Gartner/Gong : sources sur la qualité, la confiance et la découverte commerciale ; aucune ne mesure directement l’efficacité de 216 tactiques chez Memo Labs. S18/S19/S20.

## Décision à ce stade

**GO recherche** pour mandats réels B2B remote France, intermédiaires mandatés, partenaires avec client signé. **HOLD prospection** tant que buyer/budget/contrat et message précis non approuvés. **NO-GO** mass outreach, bots/scraping LinkedIn, fausses références, anciennes cibles exclues, formation ou offre AI App Rescue générique sans client solvable.

Le benchmark est un outil de **priorisation d’expériences réelles**. Il ne peut pas garantir une signature ; pour départager deux familles proches il faudra des événements observés : sources qualifiées, vrais appels, propositions, contrat, facture et encaissement. Toute dépense, candidature et sollicitation réclame validation distincte.

## Bibliographie contrôlable (26 références)

| ID | Source et date | Périmètre et limite |
| --- | --- | --- |
| S01 | [Freelancermap Freelancer Study 2025](https://www.freelancermap.com/files/survey/freelancer-study-2025.pdf) (2025-03) | enquête internationale freelances ; autodéclaré, multi pays, pas taux contrats |
| S02 | [FreelanceMention marché IT](https://app.freelancemention.fr/blog/freelance-informatique/) (2026-10-13) | missions IT/Data LinkedIn France ; détection propriétaire, non représentatif marché et contrat réel |
| S03 | [Freeland baromètre juin 2026](https://barometre.freeland.com/) (2026-06) | plateformes IT du groupe Freeland ; population propriétaire / valeurs variables selon filtres |
| S04 | [Upwork In-Demand Skills 2026](https://www.upwork.com/research/in-demand-skills-2026) (2026-02-04) | contrats US 2025 marketplace Upwork ; US marketplace, pas demande française ni TJM cible |
| S05 | [Malt Tech Trends 2026](https://www.malt.fr/resources/trends/malt-tech-trends) (2026) | recherches et descriptions sur Malt ; évolution d'une marketplace, base et budgets non équivalents |
| S06 | [Free-Work baromètre fullstack](https://www.free-work.com/fr/tech-it/developpeur-fullstack/rate-tjm-freelance) (2026) | profils et missions Free-Work ; moyennes de groupes, pas devis signé pour utilisateur |
| S07 | [Vercel Solution Partners](https://vercel.com/partners/solution-partners) (2026-10-23) | annuaire officiel d'agences ; fournisseurs, PAS demandes de sous-traitance |
| S08 | [n8n Expert Partner](https://n8n.io/expert-partners/) (2026-10-23) | programme officiel partenaire ; pas programme général solo automatique, ni lead |
| S09 | [LinkedIn/Ipsos Small Business 2026](https://business.linkedin.com/small-business/resources/2026-small-business-study) (2026) | 300 décideurs PME US 2-50 employés ; US, échantillon restreint, pas taux de signature individuel France |
| S10 | [Hinge High Growth Tech & Software 2026](https://hingemarketing.com/blog/story/5-highlights-from-the-2026-high-growth-study-technology-software-edition) (2026-04-27) | sociétés de services logiciels ; entreprises de services structurées, pas freelance solo |
| S11 | [Sales.co cold email benchmark](https://sales.co/research/cold-email-conversion-rate-benchmarks) (2026-10-06) | 336 257 contacts B2B, 20 campagnes ; données agence first-party et mélange secteurs, pas taux contrats |
| S12 | [CNIL prospection B2B](https://cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique-sms-mms-et-automate-dappel) (2026-06-10) | réglementation française ; règle de conformité, pas mesure commerciale |
| S13 | [Économie / commande publique](https://www.economie.gouv.fr/daj/commande-publique) (2026) | cadre appels d'offres publics France ; éligibilité juridique spécifique, pas preuve que lot convient |
| S14 | [France Num 2026](https://www.francenum.gouv.fr/guides-et-conseils/strategie-numerique/comprendre-le-numerique/barometre-france-num-2026-le) (2026-09) | 9 655 entreprises TPE PME interrogées ; adoption non équivalente budget services IT |
| S15 | [LinkedIn Help anti-automation](https://www.linkedin.com/help/linkedin/answer/a1340567/automated-activity-on-linkedin?lang=fr) (2026-10-23) | règles officielles plateforme ; obligation contractuelle, pas taux de conversion |
| S16 | [GitHub Sponsors](https://github.com/sponsors) (2026-10-23) | plateforme officielle de soutien OSS ; ne valide pas rémunération ou demande d'un dépôt |
| S17 | [Upwork AI remediation](https://www.upwork.com/research/ai-generated-work-is-creating-more-work-for-humans) (2026-08-20) | échantillon 50% posts Upwork 2023-2026 ; annonces classées par 3 LLM, pas montants encaissés |
| S18 | [Google DORA Report](https://dora.dev/dora-report-2025/) (2025) | étude livraison logicielle et IA ; ne mesure pas ventes freelance ni premium de service |
| S19 | [Gartner Buyer Survey](https://www.gartner.com/en/newsroom/press-releases/2026-03-09-gartner-sales-survey-finds-67-percent-of-b2b-buyers-prefer-a-rep-free-experience) (2026-03-09) | 646 acheteurs B2B Aug-Sept 2025 ; achats B2B structurés, pas micro contrat indépendant |
| S20 | [Gong Discovery Calls](https://www.gong.io/blog/nailing-your-sales-discovery-calls) (2026-03-04) | 519 000 conversations commerciales sur plateforme ; corrélation sur équipe vente, pas causalité ni freelance solo |
| S21 | [Upwork Future Workforce Index 2026](https://www.upwork.com/research/research-future-workforce-index-2026) (2026-07-14) | marketplace et professionnels interrogés ; sélection des tâches, ne prouve pas premium TypeScript de l'utilisateur |
| S22 | [6sense B2B Buyer Experience](https://6sense.com/science-of-b2b/buyer-experience-report-2025/) (2025) | près de 4000 acheteurs B2B multi zones ; achats supérieurs au marché d'un solo, intransférable |
| S23 | [RevenueFlow cold email](https://www.revenueflow.com/benchmarks/cold-email-benchmark-report-2026) (2026-08-12) | 1 413 405 envois, 356 campagnes ; portefeuille agence et campagnes de masse; pas lead freelance |
| S24 | [Belkins outreach research](https://belkins.io/b2b-outreach) (2026) | 7.5M emails et >15M touchpoints LinkedIn ; prestataire outbound first party et définition variable |
| S25 | [HubSpot State of Sales 2025](https://blog.hubspot.com/sales/hubspot-sales-strategy-report) (2025) | enquête commerciaux ; opinions de vendeurs, PAS 42% de replies |
| S26 | [Service Public micro prestations 2026-2028](https://entreprendre.service-public.gouv.fr/actualites/A18813) (2026) | règles françaises régime micro ; statut et TVA particuliers à vérifier avant contrat |

**Important** : ce sont 26 références source/famille, **pas 26 essais de la stratégie**, et certaines sont des règles officielles ou des annuaires, non des mesures de conversion.
