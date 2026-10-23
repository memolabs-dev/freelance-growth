# Offres, prix, périmètres, sécurité et devis — lundi 26/10/2026

**Note commerciale non contractuelle.** Aucune mission ni chiffre d'affaires garanti. Tous les prix ci-dessous sont des **hypothèses pour discuter**, non des TJM personnels observés ni des engagements automatiques. Vérifier statut juridique, TVA, assurance et conditions du client avec un professionnel compétent si nécessaire.

## 1. Trois offres, une promesse commune

**Promesse réaliste :** « Je prends en charge un lot de fonctionnalités ou d'intégrations TypeScript/React/Node, avec critères de recette et preuves de ce que nous avons effectivement vérifié. » Ni garantie de conformité, ni zéro bug, ni réduction de coût inventée.

| Offre | Quand l'utiliser | Périmètre de départ | Tarif de discussion | Sortie |
|---|---|---|---|---|
| Product Engineer embedded | SaaS/ESN a une roadmap financée | Front/API/DB/tests, équipe produit, 2–4 jours par semaine | **500–550 € HT/j** initialement, à ajuster au profil, budget, durée et marché | Features reçues, tests exécutés, transfert |
| Integration Delivery Sprint | Agence a vendu un projet et manque TypeScript/API | 1 parcours métier + API/erreurs/permissions + recette, **devis par lot** | **2 000–3 500 € HT** uniquement pour lot explicitement borné d'environ 4–6 jours ; vérifier complexité avant devis | 1 lot fonctionnel testable, limites documentées |
| Proof Sprint | Release réellement risquée ou besoin explicite de fiabilisation | 1 parcours critique sur un environnement autorisé et reproductible, corrections bornées | **1 800–3 250 € HT** d'hypothèse si portée 3–5 jours, sous réserve d'audit préalable de faisabilité limité | Scénarios rejouables, traces, constat avant/après, transferts |

**Priorité lundi** : pour **JUWA**, vendre Product Engineering/lot au forfait **après cadrage**, pas un Proof Sprint commercial sorti de nulle part. Pour Celaneo, demander d'abord le critère 100 % remote France. Pour Gamme, clarifier B2B et Laravel. Pour ADDIXWARE, la capacité AWS/ECS/Terraform.

### Repères de marché (non garantie)

[Free-Work](https://www.free-work.com/fr/tech-it/developpeur-fullstack/rate-tjm-freelance) et [FreelanceScope](https://www.freelancescope.fr/tjm) présentent des estimations dépendant du panel, de l'expérience et du type de mission ; [Hays France 2026, synthèse BDM](https://www.blogdumoderateur.com/freelance-tech-taux-journaliers-moyens-metier-2026/) décrit une grande dispersion. **Un médian agrégé ne justifie ni 650 €/j automatiquement, ni une promesse de 80 k€ encaissés.**

## 2. Structure de devis modulaire (modèle, PAS devis envoyé)

**Référence :** [ACHETEUR] / [PROJET] / [DATE] ; raison sociale et coordonnées **à renseigner de manière privée** ; statut fiscal et numéro de TVA si applicable.

1. **Objectif :** un résultat métier précis choisi par le client, pas un nombre d'heures de « développement IA ».
2. **Hypothèses et prérequis** : accès compte de test, API/documentation/sandbox, jeux de données factices ou autorisés, sponsor disponible, hébergement autorisé.
3. **Livrables** : code + tests exécutables + preuve d'exécution et limites + documentation de transfert + recette commune.
4. **Périmètre** : écrans, rôles, API, cas d'erreur, navigateur/appareil, volume de tests, durée, maintenance explicitement incluse ou exclue.
5. **Hors périmètre** : garantie générale de cybersécurité, conformité réglementaire de tout système, support 24/7, migration non documentée, licences externes, conception d'UI complète si non prévue, traitement de données sensibles sans cadre.
6. **Jalons de réception** : démonstration scénario nominal, scénario 403/429/503 adapté, rôle refusé, test E2E observé et validé par le client ; feedback sous délai à négocier ; gestion des réserves et correctifs convenus.
7. **Prix** : TJM ou forfait **HT explicitement distinct**, frais et taxes, éventuel acompte **à négocier**, échéances d'invoicing, paiements et pénalités selon droit applicable.
8. **Change request** : tout changement d'API ou fonctionnalité hors scope donne lieu à un écrit chiffré / délai accepté, pas implicitement gratuit.
9. **Conformité/sécurité** : NDA, instructions écrites de traitement, DPA si données personnelles, sous-traitants autorisés, accès minimal, conservation, effacement, signalement d'incident.
10. **Réversibilité** : code, tests, docs, secrets révoqués, accès supprimés, période éventuelle d'assistance et propriété intellectuelle à définir.
11. **Cadre** : 100 % télétravail depuis France et disponibilité compatible **écrits** ; future Thaïlande **jamais présumée autorisée**.
12. **Signatures** : **aucune intervention sensible ou accès production avant accord et autorisation contractuelle**.

*Clauses contractuelles à faire vérifier au besoin, pas avis juridique.*

## 3. Scénario client fictif — devis d'un premier Integration Sprint

| Lot de travail | Inclus | Condition de recette |
|---|---|---|
| Cadrage | 1 parcours utilisateur, contrat API, rôles et contraintes | Accord du sponsor sur le flux |
| API et intégration | Auth côté service, contrôle du statut de réponse, timeout et erreurs supportées | Succès métier confirmé, erreurs gérées |
| Frontend | UX de progression/échec et refus de permission | Utilisateur ne voit pas de fausse réussite |
| Vérification | Cas nominal et erreurs reproductibles, tests, traces masquées | Exécution observable et transférable |
| Transfert | Commandes test, note d'architecture, risques résiduels | Recette écrite du client |

**Exemple de prix : 5 jours × 500 € = 2 500 € HT** seulement si cinq jours sont crédibles au regard de la réalité. À re-scoper si sécurité/production/HDS/dépendances tierces augmentent la charge. Un sprint n'est pas la livraison complète d'une application HDS.

## 4. Conditions de paiement et trésorerie

Selon [Service-Public](https://entreprendre.service-public.gouv.fr/vosdroits/F23211), délai général B2B de **30 jours** à compter de la prestation, certaines modalités convenues pouvant étendre à 60 jours ou 45 jours fin de mois sous conditions. **Ne pas supposer paiement à J0 ou acompte acquis.**

- **Contrat long** : négocier des factures régulières pour journées réalisées, modalités de réception et délai de paiement.
- **Forfait** : proposer jalons de livraison et facturation alignés sur les décisions du client. Un acompte peut être négocié mais n'est pas garanti.
- **Intermédiation** : préciser qui facture à qui, quelle marge est déjà comprise dans le TJM et si le montant affiché est celui du freelance.
- **Marge** : distinguer montant vendu HT, jours réellement travaillés, frais d'outil, dépenses et charges personnelles.

## 5. Gestion particulière de la santé / HDS

Pour JUWA, **ne jamais vendre la certification HDS** comme une prestation personnelle. La [certification HDS](https://esante.gouv.fr/procedure-de-certification-hebergeur-de-donnees-de-sante) concerne le(s) prestataire(s) d'hébergement et leurs activités certifiées. Le traitement doit être cadré avec responsabilités et [contrat de sous-traitance RGPD](https://www.cnil.fr/fr/rgpd-comment-bien-identifier-son-role).

Checklist de sécurité avant accès :
- Responsable du traitement et donneur d'ordre identifiés, instructions écrites, base de test autorisée, chaîne de sous-traitance approuvée.
- Hébergeur et services exacts dans périmètre du certificat, authentification/contrôle des accès, journaux adaptés sans données sensibles en clair.
- Aucun export de données santé vers Mac perso/VPS, fournisseurs LLM ou service de tracing sans approbation explicite et cadre adapté.
- L'ANS a [annoncé HDS v2.1 pour octobre 2026](https://esante.gouv.fr/actualites/referentiel-hds-v21-les-evolutions-anticiper-des-maintenant) : **vérifier l'état de publication et les clauses effectives**, ne pas prétendre que la certification existe automatiquement du seul fait que le projet mentionne HDS.

## 6. Clauses d'arrêt commercial

**No-go** si demande de projet complet à forfait sans spécification ni marge de variation, engagements de disponibilité 24/7 non prévus, client final ou facturation opaques, travail hors France obligatoire, frais d'accès à une plateforme payante sans demande identifiée, faux résultats marketing, certification non détenue, ou obligation d'utiliser des données sensibles hors cadre.

**Gates vers un contrat :** mandat/budget réel, périmètre accepté, preuve honnête, disponibilité, taux net, pays, données/assurance, paiement, responsable de recette et droits de code. Avant cet ensemble, l'offre n'est pas juridiquement ou opérationnellement prête.
