# BMAD Deep Recon II : acquisition et distribution des prestations en 2026

**Question de décision (19 octobre 2026).** Comment un indépendant TypeScript/React/Node.js avec compétences IA et automatisation peut-il trouver des **clients payants**, plutôt que produire des profils, candidatures et documents sans conversion, tout en travaillant légalement depuis la Thaïlande ?

**Réponse synthétique.** Choisir 3 canaux avec des acheteurs distincts, des messages adaptés et des preuves; ne pas dépenser du temps sur des plateformes indistinctes. **Le marché des logiciels SaaS existants + les agences ayant déjà des clients** semble plus solide à court terme que le conseil IA généraliste aux TPE. La conclusion est **une hypothèse à tester**, non un fait confirmé par des taux de conversion Memo Labs.

**Méthode BMAD** : Market (données), Competitive (alternatives), User Voice (témoignages), Forge Idea (objections), puis GO/NO-GO et expériences. Sources consultées les 19 octobre 2026, lien et limite par hypothèse. Aucune recherche de marché ne sert de preuve de relation ou de budget d'une entreprise particulière.

## 1. Distinguer 4 marchés différents

| Segment | Quel achat réel ? | Signal de disponibilité budgétaire | Risque décisif | Go initial |
|---|---|---|---|---|
| SaaS B2B établi, CTO/Head Engineering | Feature, intégration, stabilisation, renfort 3-6 mois | Annonce contract / sprint approuvé / roadmap publique et besoin confirmé | Contraintes RH et remote pays | **GO** |
| Agence automatisation / studio produit | Sous-traitance sur tickets API/Node/React, débordement delivery | Contrat client en cours, partenaire cherche capacité | Agence a déjà compétences ou veut prix très bas | **GO** |
| PME non-tech vendant des services | Automatisation CRM, intégration SaaS, accompagnement | Processus de traitement manuel qui coûte du temps ET budget identifié | Enthousiasme pour ChatGPT sans projet solvable | **TEST RESTREINT** |
| Logiciel réglementé / clinique | Qualité, modernisation progressive, traçabilité | Mandat interne, plan de migration, qualité à vérifier | Accès hors EEE / données sensibles | **HOLD GEO** |

### Informations structurantes

**Marché full-stack :** Upwork inclut toujours le full-stack parmi ses compétences les plus demandées, tandis que son baromètre classe AI Integration à +178 % sur un an pour les compétences émergentes. Il s'agit de tendances de **sa marketplace**, pas d'un montant de revenus futur. Source : [Upwork 2026](https://www.upwork.com/research/in-demand-skills-2026), [communiqué 04/02/2026](https://www.upwork.com/press/releases/upworks-in-demand-skills-2026-demand-for-top-ai-skills-more-than-doubles-as-ai-is-embedded-into-everyday-work).

**Technologies :** Stack Overflow Developer Survey 2026, 10 281 répondants à la question des frameworks web, rapporte Node.js 46,4 %, React 41,5 %, Next.js 20,6 %. L'enquête renseigne **l'usage**, ni le nombre de missions freelance ni les prix : c'est une raison de garder la stack accessible, pas une preuve d'achat. Source : [question officielle](https://survey.stackoverflow.co/2026/technology/data/web-framework).

**IA et n8n :** Malt 2026 affiche +1 390 % projets n8n et demande agents IA ×60 depuis 2024, mais l'effet de base importe et les projets n'ont pas tous le même budget. La fiche n8n affiche un TJM médian de 675 EUR parmi les freelances considérés. **Il ne faut pas vendre seulement « installer n8n »** : connecter correctement les API, droits, coûts, logs et erreurs. Source : [Malt low-code](https://www.malt.fr/resources/trends/malt-tech-trends/low-code), [méthode Malt](https://www.malt.fr/resources/trends/malt-tech-trends).

**Budget PME :** France Num 2026 : 40 % des TPE-PME déclarent utiliser l'IA, mais les dépenses en développement spécifique concernent 3 % des répondants et les conseils/prestations 2 %. Adoption d'un outil ≠ intention d'acheter un accompagnement. Source : [France Num 2026](https://www.francenum.gouv.fr/guides-et-conseils/strategie-numerique/comprendre-le-numerique/barometre-france-num-2026-le).

## 2. Stratégies d'acquisition comparées

### A. Missions freelance déjà publiées : vitesse, concurrence, restrictions

**Atout** : intention d'achat déclarée, rôle défini, dates de début souvent explicites. **Limites** : concurrence, tarifs parfois sans marge, interdiction hors EEE cachée, annonces CDI étiquetées remote, agrégateurs peu fiables.

**Acquisition testée** : choisir 5 offres avec annonce d'origine, rôle React/TS/Node, B2B/contract attesté, statut de candidature vérifié dans `~/jobs`, Thaïlande à valider. Répondre uniquement si un dossier distinct et solide existe. Aucune candidature en doublon.

**Économie plateforme** : Malt facture 10 % au début d'une relation client trouvé sur la plateforme, 5 % après six mois et 2 % pour les propres clients apportés (conditions de plateforme). Upwork facture une commission variable de 0 à 15 % par contrat. Comparer montant réellement encaissable, sécurité de paiement et accès aux clients plutôt que seulement le TJM affiché. Sources : [Malt aide officielle](https://help.malt.com/kb/guide/fr/la-commission-malt-h2dK0HxuKA/Steps/2510922), [Upwork officiel](https://support.upwork.com/hc/en-us/articles/211062538-Learn-about-the-Freelancer-Service-Fee).

**Risque** : une mission annoncée « worldwide » peut néanmoins exiger un fuseau CET. Pour les offres déjà étudiées, [PR #15](https://github.com/memolabs-dev/freelance-growth/pull/15) distingue APPLY/VERIFY/REJECT avec une règle anti-doublon.

### B. Agences partenaires : distribution récurrente possible

**Atout** : le partenaire possède déjà un pipeline client et peut vendre plusieurs lots de travail. **Limites** : marges, NDA, délais de paiement, risque que l'agence n'ait pas besoin de code sur mesure.

**Réservoir de prospection** : Vercel présente un annuaire de plus d'une centaine de partenaires Solution ; n8n et Zapier disposent d'écosystèmes de prestataires. Aucun annuaire n'établit qu'une agence est en train de recruter un sous-traitant. Sources : [Vercel](https://vercel.com/partners/solution-partners), [Zapier](https://zapier.com/l/solution-partner), [n8n](https://n8n.io/expert-partners/).

**Meilleure proposition à tester** : « Vous gardez votre client, je prends en charge une intégration Node/TypeScript ou un module React qui nécessite du code, avec tests et critères de recette ». Éviter « expert IA qui remplace vos équipes », trop vague et menaçant.

**Canal partenaire vs programme éditeur** : chez Zapier, l'inscription au programme partenaire est annoncée gratuite mais requiert site professionnel et email de domaine. Chez n8n, le programme Expert est encore un pilote fermé avec critères restrictifs. **Ne pas attendre une certification pour chercher un premier contrat de sous-traitance**. Sources : [Zapier programmes](https://zapier.com/l/partners), [n8n programme](https://n8n.io/expert-partners/).

**Licence n8n** : prestations de consulting et construction de workflows peuvent être autorisées par la Sustainable Use License, mais vendre un accès client à une instance managée ou laisser le client éditer ses propres workflows peut exiger une licence commerciale. Vérifier la topologie concrète. Source : [FAQ licence officielle n8n](https://support.n8n.io/article/can-i-use-your-license-for-my-use-case).

### C. Réseau et recommandations : forte confiance, faible volume

Freelancermap (étude 2025) indique le réseau et les recommandations parmi les principaux canaux **jugés efficaces** des répondants; Hinge 2026 constate que les références, l'outreach direct et les événements sont des sources majeures de leads dans **les sociétés de services**, population différente d'un indépendant. Sources : [Freelancermap 2025](https://www.freelancermap.com/blog/client-acquisition-strategy-freelancers/), [Hinge Tech & Software 2026](https://hingemarketing.com/blog/story/5-highlights-from-the-2026-high-growth-study-technology-software-edition).

**Approche pratique** : ne pas envoyer le même message à Medsharing, une ancienne agence et un CTO inconnu. Une relation chaude permet de poser une **question commerciale précise** (besoin en cours, possibilité d'introduction) sans vendre un nouveau projet entier. Vérifier les historiques et les refus déjà notés dans [PR #17](https://github.com/memolabs-dev/freelance-growth/pull/17).

### D. Prospection froide ciblée : hypothèse conditionnelle

**Gartner** a interrogé 646 acheteurs B2B en août/septembre 2025 et rapporte en mars 2026 que 67 % préfèrent un parcours sans commercial. Cela incite à publier une preuve de compétence accessible avant l'échange. Cela **ne signifie pas** que la prospection personnalisée est interdite ou inefficace. [Gartner](https://www.gartner.com/en/newsroom/press-releases/2026-03-09-gartner-sales-survey-finds-67-percent-of-b2b-buyers-prefer-a-rep-free-experience).

**Séquence** : un signal documenté et daté → une hypothèse de difficulté → une preuve pertinente → une question. Jamais « j'ai audité votre code » ou « votre logiciel est défaillant » sans accès autorisé.

**Conformité** : la CNIL permet sous conditions la prospection B2B pertinente pour les fonctions de la personne, avec information, identité et opposition simple. LinkedIn interdit bots, scraping et automatisations non autorisées. Sources : [CNIL 10/06/2026](https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique-sms-mms-et-automate-dappel), [LinkedIn Help](https://www.linkedin.com/help/linkedin/answer/a1341387/prohibition-of-scraping-software).

## 3. User voice : succès déclarés et contre-exemples

Retours individuels à utiliser comme hypothèses et **jamais** comme taux de conversion :

- [Reddit, août 2026, développeur React/Next/Node sans client malgré portfolio](https://www.reddit.com/r/Freelancers/comments/1vfbhco/how_are_you_all_actually_getting_clients_as_a_web/) : la visibilité technique seule ne suffit pas.
- [Reddit, juillet 2026, après presque un an sur Upwork](https://www.reddit.com/r/Entrepreneurs/comments/1v1hl2m/3_years_as_a_web_dev_cant_crack_freelance_clients/) : tentative ensuite de ciblage agences et fondateurs, résultat commercial encore incertain.
- [Reddit, juin 2026, premiers contrats via recommandations](https://www.reddit.com/r/Freelancers/comments/1u1ihka/been_a_developer_for_3_years_but_finding_clients/) : accès hors réseau difficile.
- [Reddit, 16/10/2026, coût et acquisition](https://www.reddit.com/r/freelancing/comments/1x7pysq/freelance_web_developer_struggling_to_find_paying/) : tarifs génériques peu acceptés et appels sans réponse.

**Contraire à certains discours** : aucun de ces récits ne justifie « envoyez 500 messages » ou « formez-vous à l'outil IA X et facturez 10 k€ ». Le vrai besoin est un acheteur solvable.

## 4. Positionnement et tarifs : scénarios testables

| Offre | Problème du client | Livraison contrôlable | Ancrage proposé, non garanti |
|---|---|---|---|
| **Product Engineer B2B** | Une équipe n'arrive pas à livrer assez vite | API, interfaces TS/React/Node, tests, PR, documentation | 500-650 EUR HT/j |
| **AI Integration Engineer** | Première fonction IA fragile ou coûteuse à exploiter | Auth, orchestration, validation, logs, coût mesurable, tests | 600-750 EUR HT/j ou sprint |
| **Technical Partner** | Équipe sans capacité temporaire de cadrage/implémentation | Diagnostic payé + travail avec l'équipe, résultat testé | Diagnostic 250-600 EUR HT, sprint 1 500-5 000 EUR HT, suivant périmètre |

Ce sont des **hypothèses Memo Labs**, pas les prix médians des enquêtes. Les tarifs de développement généralistes de [Freeland 2026](https://barometre.freeland.com/) sont nettement plus bas que le haut de ces intervalles : la prime doit se démontrer par responsabilité, complexité et confiance.

**Coût d'acquisition** : au lieu de supposer un ratio, comptabiliser heures de recherche, heures d'entretien, propositions préparées, frais de plateforme, puis CA encaissé. Un premier client signé mais payé trop tard peut être un mauvais canal.

## 5. Prendre en compte l'exécution depuis la Thaïlande

[Ambassade thaïlandaise à Paris](https://www.thaiembassy.fr/fr/visa-rdv/les-types-de-visa-et-les-documents-necessaires/dtv/) : le visa DTV couvre notamment des freelances/travailleurs distants en catégorie Workcation sous conditions. Il ne valide **pas** automatiquement la politique d'une entreprise cliente française ou la conformité d'un accès à données de santé depuis l'étranger.

La classification opérationnelle doit comprendre :
- `THAILAND_CONFIRMED` : permission **écrite** du client pour cette prestation, contraintes d'accès respectées.
- `VERIFY` : remote général, worldwide annoncé sur agrégateur, B2B ou pays non clair.
- `INCOMPATIBLE` : restriction EEE/France ou fuseau bloquant explicite.

Ne pas reclasser `VERIFY` comme confirmé par déduction ou VPN.

## 6. Trois expériences d'acquisition à comparer en parallèle

| Test | Audience | Petit achat / proposition | Action autorisée | Mesure | Kill/pivot |
|---|---|---|---|---|---|
| **EXP-A** : agences | 10 agences Make/n8n/Vercel sélectionnées dans le registre existant | Renfort TS/API/QA sur un vrai projet client | Vérifier le contact pro puis préparer 10 messages personnalisés, validation avant envoi | Réponses positives, appels, devis, contrat | 0 réponse après 10 contacts pertinents et un suivi → changer sélection ou angle |
| **EXP-B** : contrats internationaux | 5 missions B2B récentes dans `~/jobs` | Product Engineering 500-650 EUR HT/j à discuter | Contrôler pays, contrat et doublons, puis postuler aux postes réellement adaptés | Réponses, entretiens, offres, montants | Majorité des missions interdites en Thaïlande → revoir source d'annonces |
| **EXP-C** : réseau existant | 3 contacts professionnels avec besoin potentiel réel | Diagnostic court payé ou renfort sur produit en service | Reprendre le fil existant, avec message concret et historique vérifié | RDV, budget réel, première facture | Aucun responsable/budget après premiers échanges → arrêter, pas solliciter en boucle |

**Ne pas simuler** de réponses, de taux, de contrats, de « missions prêtes à signer », de tarifs négociés ni de clients partenaires.

## 7. Décisions BMAD au 19 octobre

**GO**
1. Cibler SaaS B2B et studios/partenaires d'intégration qui possèdent une clientèle existante.
2. Répondre aux missions freelance contractuelles ouvertes, sans filtrer uniquement AI Engineer.
3. Présenter une proposition livrable en termes métier et sécurité technique.
4. Tester l'accompagnement uniquement si un client possède un vrai cas d'usage et accepte le diagnostic payé.

**NO-GO**
1. Formation en ligne, abonnement coaching illimité, promesse IA générique.
2. Développement d'un nouveau CRM, crawler LinkedIn non autorisé ou robot de prospection avant apprentissage réel.
3. Paiement d'une adhésion chère à un programme partenaire sans sources de mission.
4. Promesses de TJM, revenus ou compatibilité Thaïlande sans preuves.

**Goulot principal restant** : il n'existe pas encore dans le registre de chiffres sur les budgets et projets effectivement proposés à Memo Labs. La meilleure prochaine recherche est **l'entretien avec des acheteurs qualifiés**, pas une troisième synthèse générale.

## 8. Vérifications et références de travail

Études empiriques à maintenir à jour : Upwork 2026, Malt 2026, Freeland juin 2026, France Num 2026, Stack Overflow Developer Survey 2026, Gartner 2026, Freelancermap 2025/2026, Hinge 2026.

Preuves de règlement et programmes : CNIL B2B 2026, LinkedIn 2026, n8n FAQ de licence, Vercel Solution Partners, Zapier Solution Partners, ambassade thaïlandaise Paris.

**Limites de méthode** : les entreprises étudiées commercialisent souvent les services mesurés; la croissance relative n'indique pas la taille absolue de chaque marché; les populations US/DACH/France ne sont pas interchangeables; l'expérience d'un freelance individuel n'établit pas une statistique; la géographie d'une page agrégateur ne crée aucun droit contractuel.

**Lien au premier Deep Recon** : [BMAD 2026 acquisition, issue #19](https://github.com/memolabs-dev/freelance-growth/pull/22). Les docs de cette branche sont indépendants jusqu'à fusion ; ne pas écraser la première étude en tentant de synchroniser des worktrees.
