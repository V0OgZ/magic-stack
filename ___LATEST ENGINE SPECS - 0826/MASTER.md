# Heroes of Time — MASTER (All-in-one, single directory)

## Table of Contents
- [00_QA_initiales.md](00_QA_initiales.md)
- [01_bases_concepts.md](01_bases_concepts.md)
- [02_regles_moteur.md](02_regles_moteur.md)
- [03_ombre_brouillard.md](03_ombre_brouillard.md)
- [04_systemes_resolution.md](04_systemes_resolution.md)
- [05_identite_energie_complexe.md](05_identite_energie_complexe.md)
- [06_interferences_gameplay.md](06_interferences_gameplay.md)
- [07_objets_pouvoirs.md](07_objets_pouvoirs.md)
- [08_scenarios_cas_limites.md](08_scenarios_cas_limites.md)
- [09_chasse_temporelle_J25.md](09_chasse_temporelle_J25.md)
- [10_schemas_ascii_tous.md](10_schemas_ascii_tous.md)
- [11_doc_joueur.md](11_doc_joueur.md)
- [12_doc_front.md](12_doc_front.md)
- [13_doc_back.md](13_doc_back.md)
- [14_etudes_de_cas_tests.md](14_etudes_de_cas_tests.md)
- [15_conclusion_meta.md](15_conclusion_meta.md)
- [16_scenarios_cas_tordus_paradoxes.md](16_scenarios_cas_tordus_paradoxes.md)
- [17_tests_fonctionnels_unitaires.md](17_tests_fonctionnels_unitaires.md)
- [18_ascii_brouillard_psi.md](18_ascii_brouillard_psi.md)
- [19_playbooks_multijoueur.md](19_playbooks_multijoueur.md)
- [20_matrice_resultats_multi.md](20_matrice_resultats_multi.md)
- [21_diagrammes_spatio_temporels_multi.md](21_diagrammes_spatio_temporels_multi.md)
- [22_protocoles_charge_concurrence.md](22_protocoles_charge_concurrence.md)
- [23_securite_anti_abus.md](23_securite_anti_abus.md)
- [24_scripts_sandbox_pseudo.md](24_scripts_sandbox_pseudo.md)
- [25_etat_monde_graphe_orchestration.md](25_etat_monde_graphe_orchestration.md)
- [26_topologie_ontologie_vs_theorie_du_tout.md](26_topologie_ontologie_vs_theorie_du_tout.md)
- [27_wtf_is_this_game_dialogue.md](27_wtf_is_this_game_dialogue.md)
- [28_final_words.md](28_final_words.md)
- [29_comprehension_finale.md](29_comprehension_finale.md)
- [README.md](README.md)
- [README_FRONT_DEBUTANT.md](README_FRONT_DEBUTANT.md)
- [README_INDEX.md](README_INDEX.md)

---

## Full Content


---

# 00_QA_initiales

# Heroes of Time — Q&A initiales

## Q1 — Temps différencié, tic serveur vs client
- **Serveur autoritaire** : le temps de référence (WorldTime `t_w`) vit côté back.
- **Temps local `t_e`** par entité : avance par actions (consommation d’énergie) + dérive passive.
- **Front** : interpolation & rendu (jamais source de vérité).

## Q2 — Énergie négative & rollback
- Revenir dans le passé **ne rend pas A négatif**. On reprend l’état (snapshot) `A, Φ` du temps ciblé.
- Si on agit **au-delà** de `A`, on entre en **dette** (`Debt_A`), qui accélère `t_e` et applique des malus.

## Q3 — Brouillard de causalité vs ombre portée
- **Ombre portée causale (OPC)** : potentiel d’atteinte si tout est optimisé maintenant.
- **Brouillard (CF)** : incertitude effective pour les autres (observable, perçable).

## Q4 — Quand TCG ? Quand collapse ?
- **Collapse** si impact faible / écart de niveau fort.
- **TCG** si impact élevé / niveaux proches.
- **Auto/IA** si les deux opt-in ou AFK>60s (IA niveau max 3).

## Q5 — Anti-tortue
- **Dérive passive** + **Anna** (décroissance) + **Vince** (percée) empêchent le blocage prolongé.


---

# 01_bases_concepts

# Heroes of Time — Bases & concepts

- **Jour caché** : équivalent de “tour” invisible piloté par l’énergie A (PA).
- **Énergie A (réelle)** : ce que coûtent mouvements/sorts/interactions.
- **Phase Φ (imaginaire)** : cohérence temporelle pour clones, superpositions & fusions.
- **Identité `|ψ⟩`** : vecteur normalisé (2–4D) représentant l’entité à travers ses incarnations.
- **Ombre portée causale** : zone spatio-temporelle potentielle.
- **Brouillard de causalité** : incertitude visible côté adversaire.


---

# 02_regles_moteur

# Heroes of Time — Règles moteur (serveur)

## Horloges & énergie
- `t_w` (monde) : tick fixe (ex. 50 ms).
- `t_e` (entité) : avance par coûts A et par dérive passive.
- Passage de jour caché : `A==0` ⇒ `day_hidden += 1`.

## Dérive & stabilisation
- Dérive passive anti-tortue (faible, paramétrable).
- Pouvoir **stabilisation** : peut geler la dérive mais augmente la pression des régulateurs et la décohérence (Φ↓).

## Dette d’énergie
- Pas de `A<0` : on stocke `Debt_A`.
- Effets : coût majoré, `t_e` accéléré jusqu’au remboursement.

## Stockage minimal (exemple)
```json
{
  "entity_id": "hero_ventus",
  "timeline": { "t_e": 15.3, "day_hidden": 16, "debt_A": 0 },
  "energy": { "A": 72, "A_max": 100, "Phi": 0.41, "Phi_min": -1.0, "Phi_max": 1.0 },
  "identity": {
    "psi_id": "psi:ventus",
    "vector": [0.83, 0.55],
    "entanglements": ["psi:ventus#clone@J13"]
  },
  "interference": {
    "I_min": 0.25, "I_mid": 0.50, "I_strong": 0.75, "I_crit": 0.80,
    "lambda_decoherence": 0.03
  }
}
```


---

# 03_ombre_brouillard

# Heroes of Time — Ombre portée & Brouillard (corrigé et clarifié)

> **TL;DR** — Il y a **trois** notions d’ombre portée causale (OPC) :  
> 1) **OPC_brut** (géométrique, avec A seulement) : **s’agrandit** si A régénère.  
> 2) **OPC_qualité** (pondérée par Φ, fenêtres, cooldowns) : peut **se contracter** même si A augmente.  
> 3) **OPC_effectif** (adversarial + régulateurs + économie) : peut **varier à la baisse** si le monde se ferme plus vite qu’il ne s’ouvre.

---

## 1) Définitions formelles

- **OPC_brut(t)** = { n ∈ carte | coût_min(you→n, t) ≤ **A(t)** }  
  *Monotone en A* : si A(t₂) ≥ A(t₁), alors OPC_brut(t₂) ⊇ OPC_brut(t₁).

- **Qualité locale** `q(n,t) ∈ [0,1]` (fusion de facteurs) :
  - cohérence **Φ(t)** / interférence **|I|** requise pour cette case/rencontre,
  - **fenêtres** (portails, relic spawns, “fair pass”) encore **ouvertes** à `t`,
  - **cooldowns** d’objets/compétences,
  - **bruit λ** (décohérence) et malus de **dette** éventuelle.

- **OPC_qualité(t)** = { (n, q(n,t)) | n ∈ OPC_brut(t) }  
  *Non monotone en t* : si des fenêtres se ferment / Φ décroît / dettes s’appliquent, `q` chute.

- **OPC_effectif(t)** : OPC_qualité qui intègre **réponses adverses**, **pression des régulateurs** (Vince/Anna/Overload), **coûts de zone** (occupations, météo ω, roughness κ).  
  *Peut croître ou décroître* selon la dynamique du monde autour de vous.

---

## 2) Réconciliation de l’apparente contradiction

- **Si je ne fais rien** et que j’ai une **petite dérive** :  
  - **A** ↑ un peu ⇒ **OPC_brut** ↑ (rayon spatial légèrement plus grand).  
  - **Φ** ↓ (décohérence naturelle, λ>0), **fenêtres** peuvent **se fermer**, adversaires **occupent**/renchérissent des cases ⇒ **OPC_qualité** ↓ possible.  
  - **Conclusion** : *l’anneau extérieur* (brut) peut **s’élargir** tandis que *le noyau lumineux* (haute qualité) peut **se rétrécir**.

ASCII — anneau brut vs noyau de qualité
```
t0 :   ○○○●○○○        ● = vous ; ○ = OPC_brut ; █ = OPC_qualité↑
       ○○█○○○○
t1 :   ○○○○○○○        (A régénère)    OPC_brut ↑
       ○○░○○○○        (Φ↓, fenêtres−) OPC_qualité ↓ (█→░)
```

---

## 3) Exemples concrets

1) **Ventus AFK 2 minutes**  
   - +2A (drift), **mais** la **fenêtre portail** (π_p) se ferme et **Φ** a chuté → route “TP propre” perdue.  
   - Résultat : **OPC_brut** ↑ ; **OPC_qualité** (chemins premium) ↓.

2) **Terra bunker (stabilisation active)**  
   - Gèle la dérive ⇒ **A** ~ constant ; **λ** (décohérence) ↑ ; **Anna** ronge l’économie ; **Vince** ouvre couloirs anti‑soft‑lock.  
   - Résultat : **OPC_effectif** ↓ pour “tenir la zone” même si géométrie inchangée.

3) **Multi — zone contestée**  
   - Adversaire occupe les ponts → coût des cases ↑ ; météo ω ajoute malus ; votre **dette** absorbe la régén A.  
   - Résultat : **OPC_brut** stagne ; **OPC_effectif** ↓ (trajets deviennent inabordables).

---

## 4) Règle de design (mise à jour)

- Ne plus dire : “**OPC se réduit si on laisse filer le temps**”.  
- Dire : “**Si vous laissez filer, votre OPC_brut peut grandir (A↑), mais votre OPC_qualité et votre OPC_effectif tendent à baisser** (Φ↓, fenêtres qui se ferment, coûts/occupation qui montent, régulateurs qui s’activent).”

---

## 5) UI/UX recommandée

- **Double halo** :  
  - **Halo pâle** = OPC_brut (aire atteignable par A pur).  
  - **Cœur lumineux** (dégradé) = OPC_qualité (q≥θ_high).  
- **Badges de fenêtres** : icônes “porte qui se ferme” sur les nœuds dont la fenêtre expire bientôt.  
- **Tooltips** : expliquer **pourquoi** une case perd en qualité (Φ↓, fenêtre close, coût↑ par occupation).

---

## 6) Notes d’équilibrage rapides

- Assurer que la **régén A passive** ne compense **pas** à elle seule la **perte de qualité** (Φ, fenêtres) : sinon, AFK deviendrait strictement EV+.  
- L’activation de **stabilisation** doit **augmenter λ** (Φ↓) et **augmenter** la probabilité d’intervention de Vince/Anna (anti‑bunker).  
- La **dette** consomme d’abord la régén A (OPC_brut ne grandit pas tant que la dette n’est pas épongée).

---

## 7) Formules compactes (pour back)

- `OPC_brut(t) = { n | d_cost(n; world(t)) ≤ A(t) }`
- `q(n,t) = w1·f_Φ(Φ(t)) + w2·f_win(n,t) + w3·f_cd(n,t) − w4·f_debt(t)`
- `OPC_effectif(t) = reduce_adversarial(OPC_qualité(t), occupation(t), κ(t), ω(t), régulateurs(t))`

---

# 04_systemes_resolution

# Heroes of Time — Systèmes de résolution

## 1) Collapse probabiliste
- Utilisé si impact faible / écart de niveau fort.
- Résolution rapide, pas d’UI cartes.

## 2) Combat TCG
- Impact élevé / niveaux proches.
- Manuel par défaut ; **auto** si opt-in des deux.
- **AFK > 60s** ⇒ IA prend le relais (niveau IA ≤ 3).

## 3) Régulateurs
- Déclenchés en cas d’abus : tortue, surcharge, soft-lock.


---

# 05_identite_energie_complexe

# Heroes of Time — Identité Ψ & Énergie complexe

## Définition
- **Énergie complexe** `E = A + iΦ`
  - **A** (réel) : PA/mouvements.
  - **Φ** (imaginaire) : phase/cohérence temporelle (clones, fusion, interférences).

## Identité
- `|ψ⟩` normalisé ; conservation : `Σ |ψ_k|^2 = 1` sur main+clones.
- Clonage : split cohérence `ρ` → `|ψ_main|^2=(1-ρ)`, `|ψ_clone|^2=ρ` + coût de phase.

## Décorrélation
- Décroissance naturelle de Φ (taux `λ`), accélérée par bruit (villes, portails, combats).

## Dette & rollback
- Rollback reprend snapshot `A, Φ` (pas de A négatif).
- Dette si dépassement d’actions : `Debt_A`>0, malus & `t_e`↑.


---

# 06_interferences_gameplay

# Heroes of Time — Interférences → Gameplay

## Calcul d’interférence
`I = ⟨ψ_a | ψ_b⟩ · exp(i(Φ_a - Φ_b))` ; on utilise `|I|` pour la qualité.

## Seuils (exemple à calibrer)
- `|I| ≥ 0.75` → **Clone complet** : carte TCG pleine, double contrôle/AI élite, buff de synergie.
- `0.50 ≤ |I| < 0.75` → **Clone affaibli** : carte jouable mais stats réduites / pouvoirs limités.
- `0.25 ≤ |I| < 0.50` → **Pas de carte** : **buff temporaire** (vitesse/dégâts/vision) puis dissipation.
- `< 0.25` → **Dissipation immédiate**.

## Objets qui modulent |I| et Φ
- **Accordeur de phase** (+Φ), **Ancre quantique** (bloque décroissance Φ),
- **Prisme interférentiel** (multiplie `|I|` localement),
- **Perturbateur** (Φ adverse ↓ avant rencontre).


---

# 07_objets_pouvoirs

# Heroes of Time — Objets & pouvoirs

- **Briseur de Voile** : traverse CF/OPC pendant X secondes/cases.
- **Lanterne de Vince** : vision à travers CF (dévoile furtifs).
- **Ampoule d’Éther** : +A instantané (sprint).
- **Sabliers Jumeaux** : crée un clone J-Δ qui accélère pour rattraper.
- **Balise d’Ancrage** : retour sécurisé au snapshot.
- **Miroir de Déphasage** : furtivité courte (Φ sensible).
- **Corde de Causalité** : recule un ennemi d’un pas (micro-retour).
- **Sceau d’Anna** : résistance partielle à la décroissance.
- **Spikes temporaux** : pièges anti-rush.


---

# 08_scenarios_cas_limites

# Heroes of Time — Scénarios limites (12+ cas) avec schémas

Légende : `●` héros principal · `○` clone/écho · `██` ombre portée · `▒▒` brouillard · `⚡` objet · `X` collision · `A/V/O` régulateurs

## Cas 1 — Raseur de bord
```
Temps ↑
     ██▒▒▒▒▒▒▒▒▒▒
    ███▒▒▒▒▒▒▒▒▒▒
   ● →  →  →  → 
Espace →
```
Attendu : dérive sans actions ⇒ OPC se réduit ; **Vince** perce si blocage.

## Cas 2 — AFK bunker
```
Temps ↑
    ██▒▒▒▒▒▒▒
    ███▒▒▒▒▒▒
   ● (immobile)
Espace →
```
Attendu : **Anna** ronge éco ; **Vince** perce soft-lock.

## Cas 3 — Clone embuscade (timing moyen)
```
Temps ↑
   ●──────────X (combat prévu)
   ○   ·   o  ●   (opacity↑)
```
Attendu : `|I|≈0.42` → **buff** court puis dissipation.

## Cas 4 — Briseur de Voile
```
Temps ↑
██▒▒▒▒▒▒▒▒▒▒▒
● → ⚡ → →
```
Attendu : traverse CF pendant fenêtre.

## Cas 5 — Axis retour J-3
```
Temps ↑
●──────⤺───●────X
```
Attendu : snapshot `A, Φ` repris ; collisions selon impact.

## Cas 6 — Duel déséquilibré (lvl 1 vs 18)
```
Temps ↑
●──X──(diff > seuil)
```
Attendu : **collapse** (rapide).

## Cas 7 — Duel tendu (niveaux proches)
```
Temps ↑
●───X───●
```
Attendu : **TCG** ; auto si opt-in ; **AFK→IA** après 60s.

## Cas 8 — TCG auto (spectateur)
```
[ TCG(IA) ] → auto play → résultat (replay visible)
```

## Cas 9 — Surcharge temporelle
```
Temps ↑
● ○ ● ○ X (stack excessif)
```
Attendu : **Overload** → collapse auto.

## Cas 10 — Cumuls vitesse + voile
```
Temps ↑
● → ⚡ (vitesse) → ⚡ (voile) → →
```

## Cas 11 — Combo Axis + Clone (depuis passé)
```
Temps ↑
●────⤺──○──→→X
```
Rencontre : `|I|` → effet (carte/buff/dissipation).

## Cas 12 — Blocage coordonné multi
```
Temps ↑
██████████████
●   ●   ●   ●
```
Attendu : **Vince** ouvre couloirs ; cap W empêche blocage total.


## Cas 2bis — Passage forcé sans action (exercice extrême)
*Hypothèse d’étude uniquement (le jeu réel utilise un drift léger variable)*
```
J0 :   ○●○
J4 : ○○○●○○    (OPC_brut ↑ fort, OPC_qualité ↓ fort)
```
Attendu : rayon CF ↑, crédibilité ↓ ; EV≤0 grâce à Φ↓, fenêtres ratées, dette/drag et régulateurs.


---

# 09_chasse_temporelle_J25

# Heroes of Time — Chasse temporelle (J1→J25)

## Joueurs & loadouts
- **Ventus** (speed/harass): Bottes de Chronos, Briseur de Voile, Ampoule d’Éther.
- **Axis** (voyage/clone): Sabliers Jumeaux, Balise d’Ancrage, Portail de Poche.
- **Terra** (bâtisseur/zone): Sceau d’Anna, Lanterne de Vince, Spikes temporaux.
- **Nyx** (furtif/sabotage): Miroir de Déphasage, Corde de Causalité, Boussole d’Ombre.

## Phases J1→J25 (A→F)
(voir chronologie détaillée et schémas dans les versions précédentes — conservées ici en synthèse)


---

# 10_schemas_ascii_tous

# Heroes of Time — Tous les schémas ASCII (regroupés)

## Ombre portée causale
```
Temps ↑
       ┌────────────── (ombre portée max)
       │
   ●───┘ (joueur)
```

## Rencontre de clones
```
Temps ↑
Main:   ●──────────X
Clone:      ○ → →
          Rencontre : I=0.42 (<0.5)
```

## Dérive passive
```
Jours → 0   1   2   3   4   5
        ●───●───●───●───●───● (joueur)
        ↑ dérive lente
```

## Convergence temporelle
```
Temps ↑
       ● (identité principale)
       |
       ○───→ (clone remonte dans le temps)
           ↘ rencontre
```

## Blocage au bord du brouillard
```
Carte:
###########~~~~~~~~~~~~
#   Joueur ↑          ~  ← brouillard
###########~~~~~~~~~~~~
```


---

# 11_doc_joueur

# Heroes of Time — Présentation joueurs

## Le concept
- Pas de tours fixes : le temps est fluide, chacun avance à son rythme.
- Vos actions consomment de l’énergie (A) et font avancer votre **jour caché**.

## Notions clés
- **Brouillard de causalité** : zone d’incertitude autour de vous.
- **Clones temporels** : envoyez une version de vous-même dans le passé pour vous rejoindre.
- **Interférences** : selon la synchronisation, votre clone peut être fort, affaibli, ou se dissiper.

## Modes de combat
- **TCG** pour les affrontements importants.
- **Collapse** pour les rencontres mineures/déséquilibrées.
- **Auto/IA** si vous ne voulez pas jouer le combat (AFK>60s).


---

# 12_doc_front

# Heroes of Time — Documentation Front-End

## États à afficher
- Jour caché, `A`, `Φ`, `t_e`/`t_w` (indicateur lisible, pas technique).
- Ombre portée & brouillard (zones visualisées).
- Clones & qualité (`|I|` → icônes strong/mid/weak/off).

## Événements UI
- Apparition/rencontre clones (animation de convergence).
- Déclenchement combat (TCG / auto / collapse).
- Intervention régulateurs (icônes Anna/Vince/Overload).

## Règles UX
- **Lisibilité > réalisme** : animations courtes, feedback immédiat.
- Indiquer AFK→IA clairement (timer, bannière).


---

## Double halo OPC (guideline UI)
- **Anneau pâle** = OPC_brut (A pur).
- **Cœur lumineux** = OPC_qualité (Φ, fenêtres, cooldowns, dette).
- **Badges** “fenêtre qui se ferme” sur les nœuds concernés.
- **Tooltip cause** : expliquer pourquoi une case a perdu en qualité.


---

# 13_doc_back

# Heroes of Time — Documentation Back-End

## À implémenter/vérifier
- Dérive passive, passage de jour caché, dette d’énergie.
- Calcul OPC & CF ; perçage par Vince ; compression par Anna.
- Identité `|ψ⟩`, énergie `E=A+iΦ`, interférence `I` et seuils.
- Déclencheur de résolution : collapse vs TCG vs auto (règles).
- AFK→IA (60s) & niveaux IA (cap 3).
- Régulateurs : conditions, priorités, actions.

## APIs (pseudo)
```
split_coherence(psi_id, rho) -> (psi_main, psi_clone)
consume(A_cost, Phi_cost) -> ok | debt | fail
compute_interference(a, b) -> I
attempt_fusion(a, b, I) -> fused | collapse | tcg
tick_decoherence(entity, dt) -> Phi'
regulator_scan(zone) -> actions[]
```


---

# 14_etudes_de_cas_tests

# Heroes of Time — Études de cas & tests d’acceptation

- [ ] **AFK 10 min** : OPC se contracte ; Anna/Vince si blocage.
- [ ] **Dépense A_max rapide** : passage jour+1 ; régén OK.
- [ ] **Dette** : `Debt_A` monte ; malus ; `t_e` accéléré.
- [ ] **Duel lvl 1 vs 18** : **collapse** direct (pas TCG).
- [ ] **TCG auto** quand opt-in des deux ; **AFK→IA** après 60 s.
- [ ] **Clone rattrapage** : `|I|` → effet (carte/buff/dissipation).
- [ ] **Briseur/Lanterne** : fenêtre on/off correcte.
- [ ] **Overload** : collapse auto si stack excessif ; pas de faux positifs.
- [ ] **Hold Noyau** : compte jours cachés (pas temps IRL).
- [ ] **Stabilisation** : Δ↑ → régulations ; Φ décroît (λ↑).


---

# 15_conclusion_meta

# Heroes of Time — Conclusion méta

> “Ce jeu n’aurait pas pu exister sans l’intelligence augmentée.”

Heroes of Time formalise un paradoxe joyeux : on joue avec le temps pour redonner du relief au présent.  
A structure : **A** organise le faire, **Φ** orchestre le possible, **|ψ⟩** relie nos tentatives.  
L’équilibre est vivant : il **émerge** des interactions, se **répare** par la régulation, et se **réinvente** à chaque partie.


---

# 16_scenarios_cas_tordus_paradoxes

# Scénarios tordus & paradoxes (stress moteur)

- **Boucle de re-phase**: tenter `⤺` successifs — attendu: bruit Φ, cooldowns, régulateurs.
- **Finales simultanées**: deux victoires même tick — attendu: arbitre + trace_hash.
- **Portail ping-pong**: wrap+portail — attendu: coût cumulé, pas de “free TP”.
- **Clone croisé multi**: ψ incompatibles n’interfèrent pas (0 buff croisé).


---

# 17_tests_fonctionnels_unitaires

# Tests fonctionnels & unitaires

## Unitaires
- `compute_interference`, `split_coherence`, `tick_decoherence`.
- `regulator_scan`, `attempt_fusion`, `reachable_OPC`.

## Fonctionnels
- F01 torus wrap, F02 rollback idempotent, F03 overload, F04 AFK takeover, F05 tempête CF.

## Property-based
- P01 conservation Σ|ψ|², P02 déterminisme trace, P03 no-deadlock CF/stabilisation.


---

# 18_ascii_brouillard_psi

# ASCII — brouillard & propagation Ψ

```
CF: █ inconnu, ▒ semi, . clair
Ψ:  ● main, ○ clone

y
8 | █ █ █ ▒ ▒ ▒
7 | █ ● → → . .
6 | █   ○ → . .
    +----------→ x
```


---

# 19_playbooks_multijoueur

# Heroes of Time — Playbooks **Multijoueur** (stress & mind-games)

> 24 scénarios concrets pensés pour le **multi**, chacun avec : *Préconditions*, *Étapes*, *Attendus serveur*, *Invariants*, *Agents*, *Logs/Metrics*, et un **schéma ASCII**.

Légende : `A` énergie, `Φ` phase, `|I|` interférence, Régulateurs (**V** Vince, **An** Anna, **O** Overload), `t_w/t_e` temps monde/entité.

---

## MP-01 — **Pinch en sablier** (2v1 avec clone en pincette)
**Préconditions** : J1 (Ventus) à l’Est, J2 (Axis+clone) à l’Ouest, J3 (Terra) au centre chokepoint. `Axis` a `Sabliers Jumeaux` (clone J-2), `|I| cible ≥ 0.6`.
**Étapes** : J1 harass → J2 lance clone → convergence à `X` contre J3.
**Attendu** : si `Δlvl` faible → **TCG** 2v1 (clone affaibli selon `|I|`). Si `Δlvl` fort → **collapse** avec mod 2v1.
**Agents** : **V** ouvre couloir si Terra soft-lock.  
**Schéma**
```
E →   J1 ●──→ X ←── ○ clone (J2)
W →   J2 ●──→/
       (pinch)
```

## MP-02 — **Sandwich temporel** (3 timings)
**Préconditions** : J1/J2 pressent J3 en 3 temps : J2 (passé), J1 (présent), clone J1 (futur proche).
**Étapes** : collisions séquencées sur même node.
**Attendu** : ordre serveur déterministe par `trace_hash`; jamais double-résolution.
**Invariants** : idempotence des loots/flags.
**Logs** : `arbiter.order`, `trace_hash`.

## MP-03 — **Kingmaking furtif**
**Préconditions** : J4 (Nyx) peut décider d’intervenir pour faire gagner J1 contre J2, sous furtivité `Φ` sensible.
**Étapes** : piqûre à `t_w`−ε sur ressource clé.
**Attendu** : pas d’invisibilité absolue; log d’accès; Vince peut lever partiellement CF.
**Invariant** : pas de “free win” par bug de furtivité.

## MP-04 — **Camp de portail** (anti-camp)
**Préconditions** : J2 campe un portail de poche.
**Étapes** : J1 tente passage, J2 réagit au tick.
**Attendu** : *fair window* anti-camp; pas de “telefrag”; coût d’occupation ↑.
**Agent** : **V** peut décaler portail si griefing durable.

## MP-05 — **Course aux reliques sync** (tie-break)
Deux équipes 2v2 capturent 2 reliques en même tick.  
**Attendu** : tie-break global → priorité *Hold > Steal* (ou table config); `trace_hash`.

## MP-06 — **Fuite à travers tore + voile**
**Préconditions** : J1 fuite E→W wrap + `Briseur de Voile`.
**Étapes** : J2 poursuit mais sans voile.
**Attendu** : J1 passe CF, J2 prend friction d’edge; si `Δt_e` < seuil → rencontre collapse.

## MP-07 — **Collusion ψ** (échange de clones)
**Préconditions** : J1/J2 tentent un “échange” : leur clone se superpose pour booster `|I|` de l’autre.
**Attendu** : **interférence inter-joueur = 0** (ψ non compatibles) → pas de buff croisé.
**Invariant** : sécurité identité (pas de fusion cross-ψ).

## MP-08 — **Chute d’éco sous Anna**
**Préconditions** : J3 tortue; J1/J2 engagent ailleurs.
**Étapes** : Anna tape prod de J3.
**Attendu** : decay progressif, jamais instant-kill; télémétrie claire.

## MP-09 — **Surcharge en mêlée** (teamfight 6 entités)
**Préconditions** : 4 joueurs + 2 clones sur node relique.
**Étapes** : TCG déclenchable, mais stack>cap.
**Attendu** : **O** (Overload) → collapse auto; TCG reporté; log survivances canoniques.

## MP-10 — **Corde de causalité** (pull micro)
**Préconditions** : Nyx tire Ventus d’une case pour casser timing.
**Attendu** : shift `t_e` +1 step; vérif pas de “double état”.

## MP-11 — **Double rollback opposé** (anti-paradoxe)
Deux joueurs rollback en sens opposés vers le même node.  
**Attendu** : collisions ordonnées; flags non dupliqués.

## MP-12 — **Sabotage de phase urbaine**
Ville “Bazar Temporel” draine Φ des clones en transit.  
**Attendu** : `|I|` tombe sous `I_mid` → clone rétrogradé (buff only).

## MP-13 — **Choke avec stabilisation**
**Préconditions** : J3 stabilise (dérive=0) sur choke key.
**Attendu** : Δ↑ ⇒ **V** couloir virtuel + **An** decay; pas d’anti-jeu durable.

## MP-14 — **Rush portails en chaîne**
J1 enchaîne 3 portails pour surprise-strike.  
**Attendu** : coût cumulé min; pas de “free teleport”; jitter limité.

## MP-15 — **Split ψ en éventail**
J2 split 3 clones faibles pour reconnaissance.  
**Attendu** : `Σ|ψ|^2≈1`; clones < `I_min` → buff/dissip.

## MP-16 — **Harpon CF** (fenêtre de perçage)
**Préconditions** : J1 déclenche Vince fenêtré; J2 tente recacher.
**Attendu** : visuel “fenêtre” net; pas d’incohérence cache/vision.

## MP-17 — **Sabliers + Ancre** (anti-drain Φ)
**Préconditions** : Axis clone + Ancre quantique.
**Attendu** : drain Φ ralenti; `|I|` maintenu > `I_mid` avant rencontre.

## MP-18 — **Semi-AFK en TCG**
**Préconditions** : duel tendu; J2 répond 1 action / 30s.
**Attendu** : pas d’auto-IA tant que jauge activité > seuil; sinon takeover.

## MP-19 — **King of the Hill** (multi-hold)
3 équipes contestent un node *Hill*.  
**Attendu** : compteur *hold* freeze si stack>cap; Vince réduit CF.

## MP-20 — **Ghost capture** (anti-duplication)
Rollback simultané tenté pour rejouer capture.  
**Attendu** : idempotence par `causal_guard`; pas de double loot.

## MP-21 — **Traque de convoi cross-time**
**Préconditions** : Axis escorte marchandise via timeline offset.
**Étapes** : Ventus tente intercepter via wrap.
**Attendu** : rencontre si `Δt_e` converge dans fenêtre; sinon passé manqué.

## MP-22 — **Demi-carte clone** (seuil tangentiel)
`|I|=0.74` vs `I_strong=0.75`.  
**Attendu** : strict : **clone affaibli**, zéro “demi-carte”.

## MP-23 — **Brouillard tempête + Vince**
Tempête CF ×1.5 + perçage Vince.  
**Attendu** : perçage partiel; coûts trajets ↑; logs météo.

## MP-24 — **Finale simultanée**
Deux conditions de victoire se déclenchent au même tick.  
**Attendu** : règle d’arbitre + `trace_hash` publiés dans log de match.


---

# 20_matrice_resultats_multi

# Heroes of Time — Matrice des **résultats attendus** (multi)

| ID | Résolution | Agents | Objets consommés | Logs clés | Notes |
|---:|---|---|---|---|---|
| MP-01 | TCG 2v1 ou collapse | V possible | Sabliers, Briseur | `meet.delta_te`, `|I|`, `resolution.kind` | Pinch déterministe |
| MP-02 | Ordre déterministe | — | — | `arbiter.order`, `trace_hash` | Pas de double-résolution |
| MP-03 | Collapse mineur | V partiel | Miroir | `stealth.reveal_win`, `corridor.open` | Kingmaking limité |
| MP-04 | Fair-pass | V anticamp | — | `portal.guard_window` | No telefrag |
| MP-05 | Tie-break | — | — | `arbiter.order`, `trace_hash` | Table config |
| MP-06 | Collapse/escape | — | Voile | `edge.friction`, `meet.delta` | Kite borné |
| MP-07 | Aucun buff croisé | — | — | `psi.compat=false` | Sécu identité |
| MP-08 | Decay progressif | An | — | `anna.decay.tick` | Anti-tortue |
| MP-09 | Overload collapse | O | — | `overload.applied=true` | Stack>cap |
| MP-10 | Timing shift | — | Corde | `te.shift` | Anti-cheese |
| MP-11 | Ordre clean | — | — | `arbiter.order` | Anti-paradoxe |
| MP-12 | Clone->buff | — | — | `phi.drain` | Ville λ↑ |
| MP-13 | Couloir/decay | V/An | Stabilisation | `delta.tw_te` | Pas de lock |
| MP-14 | Coût cumulé | — | Portails | `cost.path` | No free TP |
| MP-15 | Dissip/buff | — | — | `psi.sum≈1` | Recon safe |
| MP-16 | Fenêtre visible | V | — | `window.start/end` | UX claire |
| MP-17 | |I| maintenu | — | Ancre | `phi.slope↓` | Préserve clone |
| MP-18 | IA conditionnelle | — | — | `afk.timer`, `ai.takeover` | Anti-slowroll |
| MP-19 | Freeze hold | V | — | `hold.freeze` | Lisible |
| MP-20 | Idempotent | — | — | `causal_guard` | No dupe |
| MP-21 | Rencontre fenêtrée | — | — | `meet.window` | Convoi cross-time |
| MP-22 | Clone affaibli | — | — | `I=0.74<I_strong` | Strict |
| MP-23 | Perçage partiel | V | — | `weather.cf`, `v.perc` | Météo |
| MP-24 | Arbitre fixe | — | — | `trace_hash` | Finale clean |


---

# 21_diagrammes_spatio_temporels_multi

# Heroes of Time — Diagrammes spatio‑temporels **multijoueur**

## A) Pinch 2v1 (MP-01)
```
Temps ↑
W        Ouest                 Est
J2 ●───────────┐
               X (Terra J3)
J2○ (clone) ───┘
J1 ●────────────────→
```

## B) Sandwich temporel (MP-02)
```
Temps ↑
       J2 (passé) ○──→ X
       J1 (présent) ●──→ X
       J1' (futur)  ○──→ X
           (ordre : arbiter)
```

## C) Surcharge en mêlée (MP-09)
```
Temps ↑
Node R:
● ○ ● ○ ● ○  (stack=6) → O → collapse → canonique: ●
```

## D) Convoi cross-time (MP-21)
```
Temps ↑
Axis convoy:  ●───→→→ (offset +Δt_e)
Ventus wrap :      ↘→→ X (fenêtre rencontre)
```

## E) Finale simultanée (MP-24)
```
Temps ↑
Hold Noyau: ▲───(J3)───WIN?
Relic steal:      ●──X──WIN?
       (arbiter: order + trace_hash)
```


---

# 22_protocoles_charge_concurrence

# Heroes of Time — Protocoles **charge & concurrence** (multi)

## KPIs
- Tick serveur stable (p99) ≤ 50 ms
- Latence **match events** ≤ 150 ms
- Temps décision **arbiter** ≤ 20 ms
- Mémoire monde (graph) ≤ budget X GiB (config)
- **Trace determinism** : collisions répétées → même `trace_hash`

## Campagnes
1) **Rush 1k joueurs / 10 min** : spawn, move, small fights, 5% TCG
2) **Clone storm** : 10% split clones (cap=4), mesurer Overload
3) **Edge kite** : 100 joueurs oscillent en bord CF
4) **Portals & wrap** : 20% portails, 10% wraps
5) **Finale simultanée** : N matchs avec conditions de victoire simultanées

## Artefacts CI
- JUnit XML (unit)
- JSONL traces (E2E)
- Heatmaps OPC/CF (PNG) optionnel


---

# 23_securite_anti_abus

# Heroes of Time — Sécurité & anti‑abus

- **Rollback dupe** : marquage causal + `causal_guard`
- **ψ spoof** : signatures non forgeables pour `psi_id`
- **Clone amplification** : cap `Σ|ψ|^2` + Overload
- **Portal camping** : fair window + coût occupation
- **Edge desync** : horloge serveur autoritaire (`t_w`)
- **Seed determinism** : RNG seedé par `match_id + tick + trace_hash`
- **Stealth grief** : visibilité minimale + perçage Vince fenêtré


---

# 24_scripts_sandbox_pseudo

# Heroes of Time — Scripts de simulation (pseudo‑code)

```python
def run_mp01_pinch():
    world = reset(seed=42, topology="torus")
    J1 = spawn("ventus", pos=E-5)
    J2 = spawn("axis", pos=W-5)
    J3 = spawn("terra", pos=center)
    give(J2, "sabliers")
    move(J1, to=center-1)
    clone = split_coherence(J2.psi, rho=0.35, delta_days=2)
    converge(clone, J2, target=center)
    meet = check_meet([J1, J2, clone], J3)
    res = resolve(meet)  # collapse|tcg
    assert res.kind in ("collapse","tcg")

def run_mp24_finale():
    world = reset(seed=7)
    schedule(HOLD_NOYAU, teamA, j=3, at_tick=10000)
    schedule(RELIC_STEAL, teamB, at_tick=10000)
    out = arbiter(world)
    assert out.trace_hash
```


---

# 25_etat_monde_graphe_orchestration

# Heroes of Time — **État du monde** comme **graphe orchestré**
*(explication mathématique, algo-rythmique, schémas ASCII & coupes dimensionnelles)*

> But : décrire **formellement** le monde du jeu comme un **graphe** évoluant dans le temps,
> la manière dont l’**orchestrateur** applique les intentions/événements, et les **invariants**
> qui garantissent cohérence et performance — avec **schémas ASCII** et **coupes** (espace/temps/identité).

---

## 1) Modèle mathématique

### 1.1 Monde comme graphe
- Carte spatiale discrète : grille `Λ = {0..W-1}×{0..H-1}` (tore optionnel : wrap sur x,y).
- Graphe **spatial** : `G_S = (V_S, E_S)` avec `V_S = Λ`, `E_S` adjacences 4-voisins (+ portails `E_P`).
- Temps monde discret **autoritaire** : `t_w ∈ ℕ` (ticks serveurs).
- Temps local entité : `t_e^i ∈ ℝ⁺` (accroît selon rythme de l’entité i).
- Le **monde** au tick `t_w` est l’état `S(t_w)` :  
  `S = ⟨G_S, CF, OPC, H, R, Ω⟩`
  - `CF : V_S → [0,1]` champ de **brouillard de causalité** (incertitude de visibilité).
  - `OPC_i ⊆ V_S` **ombre portée causale** d’un héros *i* (ensemble atteignable avec énergie courante).
  - `H = {h_i}` ensemble d’entités (héros, clones, gardes).
  - `R` régulateurs (Anna, Vince, Overload) + leur état interne.
  - `Ω` paramètres globaux (météo, caps, seeds…).

### 1.2 Héros & énergie complexe
- État d’une entité `i` :  
  `h_i = ⟨pos_i ∈ V_S, A_i ∈ ℝ⁺, Φ_i ∈ ℝ, ψ_i ∈ ℂ^d, lvl_i, …⟩`
- **Énergie complexe** : `E_i = A_i + i Φ_i`  
  - `A` = points d’action (réel) — coût des déplacements/actes.  
  - `Φ` = **cohérence/phase** — qualité d’interférence des clones.
- **Identité** `ψ_i` : vecteur normalisé (somme des normes ≈ 1 sur toutes incarnations d’un même héros).
- **Interférence** entre deux incarnations `a,b` d’un même héros :  
  `I(a,b) = ⟨ψ_a | ψ_b⟩ · e^{i(Φ_a - Φ_b)}` ; on utilise `|I|` et le **signe de la phase** pour gameplay.

### 1.3 Coûts & champs
- Coût de mouvement d’une tuile `τ ∈ {plain, forest, hill, …}` : `c(τ) ∈ ℝ⁺`.
- **OPC** d’un héros `i` :  
  `OPC_i = { v ∈ V_S | dist_cout(pos_i, v) ≤ A_i }` (BFS pondéré par `c(τ)`).
- **CF** (brouillard) : probabilité d’incertitude/masquage ; `CF=1` = totalement inconnu.

### 1.4 Décohérence & drift
- **Drift** (dérive passive anti-tortue) : `A_i(t+Δ) = min(A_max, A_i(t) + ρΔ)` (ρ petit).  
- **Décohérence** : `Φ_i(t+Δ) = Φ_i(t) · e^{-λΔ} + ξ` (bruit faible `ξ`).

---

## 2) Orchestrateur (algorithme *rythmique*)

À chaque tick serveur `t_w` :
1. **Collecte** intentions `intents(t_w)` (mouvements, split clone, objets…).  
2. **Normalisation** (vérifs énergie A, droits, cooldowns).  
3. **Ordonnancement** déterministe (clé d’ordre) :  
   `key = (zone_salience DESC, event_kind, entity_id, seed(match_id,t_w))`
4. **Application** des transitions `T` (pur fonctionnel + side‑effects logués) :
   - `S' = T(S, intent)` ; chaque `T` produit un *diff* (`ΔS`) et des **logs**.
5. **Rencontres & conflits** : créer **événements de meet** sur `V_S`:
   - `resolve(meet)` → **Collapse** | **TCG** | **Auto** (selon seuils dynamiques, Δlvl, enjeu zone).
6. **Régulateurs** : scanner heuristiques; si soft‑lock/abus → **Vince/Anna/Overload**.
7. **Commutation** : produire `S(t_w+1)`, hash de trace :  
   `trace_hash = H(S, events, seed)` → **replay déterministe**.

> **Idempotence**: si deux intents identiques arrivent au même tick → même résultat/logs.

Pseudo-code (haut niveau) :
```python
def orchestrate_tick(S, intents, t_w):
    Q = sort(intents, key=deterministic_key)
    diffs = []
    for ev in Q:
        if guard(S, ev):  # énergie, cooldown, droits
            d, S = apply_transition(S, ev)  # pur + side
            diffs.append(d)
    meets = detect_meets(S)
    for m in meets:
        S, d = resolve_conflict(S, m)  # collapse/TCG/auto
        diffs.append(d)
    S, dR = apply_regulators(S)        # Vince/Anna/Overload
    diffs.extend(dR)
    th = trace_hash(S, diffs, t_w)
    return S, diffs, th
```

---

## 3) Transitions de base (déterministes)

### 3.1 Déplacement
- **Pré**: `A_i ≥ dist_cout(path)` ; **Post**: `pos_i ← v_end`, `A_i -= cost` ; `reveal(CF)` autour du chemin.
- **Complexité**: BFS local `O(r^2)` (rayon r typique 4–8).

### 3.2 Split / Clone
- Paramètre `ρ ∈ (0,1)` ⇒ partage des normes : `‖ψ_main‖^2 = 1-ρ`, `‖ψ_clone‖^2 = ρ`.  
- **Invariants** : `Σ‖ψ_k‖^2 ≈ 1`.  
- **Déclencheur** rencontre clone/main : calcul `I`, mapping vers {**clone complet**, **affaibli**, **buff**, **dissipation**}.

### 3.3 Rollback (localisé)
- Rejoue l’entité sur un secteur antérieur (ΔJ).  
- **Causal guard** empêche duplication d’artefacts uniques (idempotence).

---

## 4) Résolution des conflits

### 4.1 Décideur
- `Δlvl`, **salience de zone** (relique, noyau), `|I|`, `meet.delta_te`.  
- Si `Δlvl > θ_dyn(zone)` → **Collapse** (résumé instantané).  
- Sinon **TCG** ; **Auto** si AFK>60s ou opt-in.

### 4.2 Logs & traçabilité
- `resolution.kind`, `A_delta`, `|I|`, `arbiter.order`, `overload.applied`, `causal_guard`, `trace_hash`.

---

## 5) Invariants (à maintenir)

1. **Conservation identité** : `Σ‖ψ‖^2 ∈ [1-ε,1+ε]`.  
2. **Idempotence artefacts** : aucune duplication via rollback.  
3. **Déterminisme** : mêmes inputs/seed ⇒ même `trace_hash`.  
4. **No deadlock** : CF + stabilisation ne doivent jamais bloquer > `T_max` (régulateurs).  
5. **Énergie** : `A_i ≥ 0` (dette limitée si activée, remboursée).

---

## 6) Coupe dimensionnelle — **Espace** (t fixe)

```
y ↑             CF: █ inconnu, ▒ semi, . clair
8 |  █ █ █ ▒ ▒ ▒ ▒
7 |  █ ● → → . . .     ● = héros
6 |  █   → → . . .     → = chemin min coût
5 |  █ █ ▒ ▒ ▒ ▒ ▒     halo = OPC atteignable (A courant)
    +----------------→ x
```

**Lecture** : à `t_w=k`, le héros voit un halo **OPC** (portée énergie). CF se dissipe localement.

---

## 7) Coupe **Espace‑Temps** (monde ligne du héros)

```
t_w ↑
k+3 |          X (rencontre / résolution)
k+2 |       →→→|
k+1 |    →→→   |
k   | ●──→      |  (déplacements coûtés, reveal local)
     +--------------------------→ x
```

**Rencontre** : événement `meet` sur la trajectoire, arbitré par le décideur.

---

## 8) Coupe **Identité‑Temps** (Ψ, interférences)

```
t_w ↑
k+3 |  ●───X (fusion: |I|≥I_strong)    Δphase ~ 0  → clone complet
k+2 |  ○──/                           ou
k+1 |  ○─/   (affaibli/buff/dissip)   Δphase ~ π  → destructif
k   |  ●
```

`Φ` (phase) décroît sous bruit → **plus difficile** d’atteindre `|I|` élevé si le timing est mauvais.

---

## 9) Fonctions clés

### 9.1 **OPC** (reachable) sur grille pondérée
```
OPC_i = BFS_pondéré(origine=pos_i, budget=A_i, coût=c(τ))
```
- Marque chaque tuile atteignable avec énergie `A_i`; alimente l’**UX** (glow).

### 9.2 **Interférence**
```
I(a,b) = ⟨ψ_a | ψ_b⟩ * exp(i(Φ_a - Φ_b))
```
- `|I|` → échelle d’effets :
  - `≥ I_strong` : **clone complet** (deuxième unité/ carte dédiée).
  - `∈ [I_mid, I_strong)` : **clone affaibli** (stats -, coût +).
  - `∈ [I_min, I_mid)` : **buff** léger temport.
  - `< I_min` : **dissipation** (pas de carte).

### 9.3 **Arbitre déterministe**
```
order = sort(events, key=(salience DESC, kind, entity_id, seed))
for e in order: S ← T(S, e)
resolve&regulate(S) → S'
trace_hash = H(S', order, seed)
```

---

## 10) Complexité & perfs (par tick)

- **Déplacements**: `O(N * r^2)` avec `N` héros actifs, rayon OPC `r` (petit).  
- **Rencontres**: `O(M log M)` pour `M` événements, ordonnancement déterministe.  
- **Régulateurs**: scans zonaux `O(Z)` (Z zones actives).  
- **KPIs** : p99 tick ≤ 50 ms ; arbitre ≤ 20 ms ; events ≤ 150 ms.

---

## 11) Stockage & réplication

- **Event‑sourcing** : source de vérité = flux d’événements (intents normalisés + résolutions).  
- **Snapshots** périodiques de `S` (pour reprise rapide).  
- **Trace replay** pour debugging/esport (reconstitution par `trace_hash`).

---

## 12) Sécurité & anti‑abus (rappels)

- Signatures `psi_id` pour empêcher **spoof**.  
- **causal_guard** contre duplication par rollback.  
- Caps clones (Overload) + priorités de régulateurs.  
- Fenêtre anti‑camp portails (Vince peut décaler).

---

## 13) Tests mappés (de ce modèle → specs)

- Conservation `Σ‖ψ‖^2` → tests **property-based**.  
- Idempotence artefacts → **Rollback idempotent** (E2E).  
- Déterminisme arbitre → `trace_hash` stable (seeds).  
- No deadlock → cas *stabilisation + CF* (Vince/Anna déclenchent).  
- Interférence destructive (Δphase~π) → **clone affaibli** et **jamais** buff.

---

## 14) Schémas ASCII — récap rapide

### 14.1 CF & OPC
```
██████▒▒▒▒▒▒▒
██● → → ▒▒▒▒▒   (halo = OPC; reveal local)
██      ▒▒▒▒▒
```

### 14.2 Tore (wrap) + portail
```
x: W-2 W-1 | 0  1  2 →
        ●──→→|→→○   (wrap)
              ⭕     (portail)
```

### 14.3 Surcharge (Overload)
```
node:
  ● ○ ● ○ ● ○  (stack=6) → O → collapse → canonique ●
```

---

## 15) TL;DR (implémentation)

- **Monde = graphe** + horloge serveur + **OPC** par BFS pondéré.  
- **Énergie complexe** `E=A+iΦ`, clones via `ψ`, interférences par `I`.  
- **Orchestrateur** = *intents → ordre déterministe → transitions → conflits → régulateurs → trace_hash*.  
- **Invariants** : conservation identité, idempotence, déterminisme, pas de deadlock, `A ≥ 0`.  
- **UX** : CF (ombre), OPC visible, combats auto/collapse par défaut.



---

# 26_topologie_ontologie_vs_theorie_du_tout

# (26) Topologie & Ontologie du moteur vs. une « théorie du tout » (jeu)

**Auteur·rice in‑game :** *Smallinly, Archiviste Itinérant·e du Temps*  
**Portée :** document d’**exposition sérieuse** (raisonnée, falsifiable) — avec **clins d’œil diegétiques**.  
**Avertissement d’humilité :** nous **n’identifions pas** notre modèle de jeu à une théorie physique réelle. Nous proposons une **correspondance structurée** (analogie) pour guider conceptuellement la conception, les tests et l’optimisation.

---

## Résumé (Abstract)

Nous modélisons le monde de *Heroes of Time* comme un **graphe discret orchestré** (état `S(t_w)`), doté d’**entités** possédant une **énergie complexe** `E = A + iΦ` et d’une **identité** `|ψ⟩` sujette à **interférences**. Nous comparons sa **topologie** (torus, portails, champs) et son **ontologie** (objets, agents régulateurs, résolutions) à une **variété effective à 26 dimensions**. Ce nombre de dimensions est un **clin d’œil** aux 26D de la théorie bosonique des cordes : ici, il sert de **cadre de comptabilité** pour les variables latentes/observables qui gouvernent le gameplay. Nous détaillons : (i) une **décomposition en 26 axes** ; (ii) les **symétries** et **conservations** (Noether‑like) ; (iii) une **structure causale** (OPC ≈ cône d’atteignabilité) ; (iv) un **test empirique** par scénarios et traces `trace_hash`.


---

## 1. Notations & rappel de modèle

- Carte spatiale `Λ = {0..W-1}×{0..H-1}` ; graphes `(V_S, E_S)` (+ arêtes portails `E_P`).  
- Temps monde discret **autoritaire** `t_w ∈ ℕ` ; temps local entité `t_e`.  
- Entité `i` : `h_i = ⟨pos_i, A_i, Φ_i, ψ_i, lvl_i, …⟩`.  
- **Interférence** entre incarnations `a,b` d’un même héros : `I(a,b) = ⟨ψ_a | ψ_b⟩ e^{i(Φ_a−Φ_b)}`.  
- **OPC** (ombre portée causale) : ensemble de cases atteignables compte tenu d’`A` et des coûts.  
- **CF** (brouillard de causalité) : incertitude/masquage de l’état du monde.  
- Régulateurs : **V** (Vince, perçage), **An** (Anna, décroissance), **O** (Overload, nettoyage).

> *Note de Smallinly :* “Tout système sérieux admet une poésie. Ici, elle tient dans `Φ`, la petite chanson d’une action avant qu’elle ne s’effondre en histoire.”


---

## 2. La « variété effective » à **26 dimensions**

Nous regroupons les **variables d’état** et **champs** en **26 axes** représentant l’espace d’état minimal pour prédire la résolution des rencontres et l’évolution locale. Certaines dimensions sont **scalaires locaux** (par tuile), d’autres **paramètres d’entité**.


### 2.1 Cinématique (4)
1. **x** — position spatiale (axe horizontal).  
2. **y** — position spatiale (axe vertical).  
3. **t_w** — temps du monde (tick serveur).  
4. **Δt** = `t_e − t_w` — déphasage local (rythme entité vs monde).

### 2.2 Énergétique (4)
5. **A** — énergie réelle (points d’action).  
6. **Φ** — composante imaginaire/cohérence (décohérence → interférences).  
7. **ρ** — *drift* (taux de régénération passive locale).  
8. **λ** — taux de décohérence (bruit/“température” du milieu).

### 2.3 Identité & Interférence (4)
9. **ρ_ψ** — part de norme affectée à l’incarnation (split).  
10. **θ_ψ** — argument/phase interne de l’identité locale.  
11. **|I|** — magnitude d’interférence avec l’incarnation de référence.  
12. **arg I** — phase relative (constructive vs destructive).

### 2.4 Topologie & Champs (7)
13. **CF** — niveau de brouillard (0..1).  
14. **R_OPC** — rayon/portée atteignable (budget OPC agrégé).  
15. **κ** — courbure/roughness du graphe (Ollivier‑Ricci approx locale).  
16. **τ** — indice topologique (classe de chemin : cycles du tore/portails).  
17. **σ** — salience (priorité/importance de la zone).  
18. **ω** — champ météo/perturbation sur CF et coûts.  
19. **π_p** — potentiel de portail (proximité/charge du réseau `E_P`).

### 2.5 Charges ludiques (4)
20. **r₁** — charge ressource #1 (ex. or).  
21. **r₂** — charge ressource #2 (ex. éther/mana).  
22. **r₃** — charge ressource #3 (ex. clés/sceaux).  
23. **r₄** — charge relique/influence (déforme `σ`, seuils).

### 2.6 Régulateurs (3)
24. **v(x,y)** — intensité de perçage **Vince** (fenêtres/couloirs).  
25. **a(x,y)** — pression de **décroissance** d’**Anna**.  
26. **o(x,y)** — pression d’**Overload** (surcharge/collapse).

> **Remarque** : Nous n’affirmons pas que ces 26 axes “existent” physiquement. Ils constituent une **base utile** pour l’inférence et l’implémentation (UI, seuils, logs, tests).


---

## 3. Topologie : de la carte au feuilleté causal

- **Tore** : `(x,y)` modulo `(W,H)` ⇒ **deux cycles fondamentaux**.  
- **Portails** : arêtes longues `E_P` (raccourcis homotopiques) ; on peut définir un **indice τ** (parité de passage).  
- **Feuilleté causal** : `t_w` discrétise les couches ; **OPC** joue le rôle d’un **cône d’atteignabilité** (analogue à un cône de lumière mais gouverné par **énergie/couts**, pas par c).  
- **CF** : champ scalaire sur `V_S` ; son **gradient** guide UX et IA (reconnaissance).

ASCII — *cône d’atteignabilité (OPC) dans un feuillet* :
```
t_w = k
     y ↑
       │   ░▒▓███ CF
       │    ..........     halo OPC
       │     ....●....
       └──────────────→ x
```

> *Aside (Smallinly)* : “Le monde est plié, mais on ne le casse pas : on tend des cordes (portails) et on accorde la harpe (κ, τ).”


---

## 4. Ontologie : entités, événements, régulateurs

- **Entités** : héros/PNJ/clones avec `E`, `|ψ⟩`, inventaires (rᵢ).  
- **Événements** : `intents` (déplacements, splits, portails, sorts), `meets` (rencontres), `resolutions` (Collapse/TCG/Auto).  
- **Régulateurs** (*garde‑fous dynamiques*) :
  - **Vince** (*v*) : perce CF, ouvre des **couloirs** si soft‑lock.  
  - **Anna** (*a*) : **décroissance** des accumulations passives (anti‑tortue).  
  - **Overload** (*o*) : **collapse** propre en cas de surcharge (stack de clones/événements).

> Ontologiquement, ces régulateurs sont des **champs actifs** qui **restaurent** des invariants (No‑deadlock, pas de duplication, lisibilité).


---

## 5. Symétries & lois de conservation (Noether‑like)

- **Translation spatiale** (tore) : coûts invariants à translation, modulo κ/ω locaux.  
- **Translation temporelle** (ticks) : règles stables ⇒ **déterminisme de trace** (`trace_hash` stable pour même graine).  
- **Conservation d’identité** : `Σ‖ψ‖² ≈ 1` sur toutes incarnations.  
- **Monotonicité** : `A ≥ 0` (dette bornée si activée).  
- **Idempotence** : rollback ne **duplique pas** d’artefacts.  
- **Symétrie de phase** (Φ) : seules les **différences** de phase (arg I) comptent.  

ASCII — *Espace (A,Φ)* : régions d’effet d’interférence
```
      Φ ↑
       │   constructive   |I|↑
       │     ╭───╮
       │  ───┤ + │───
       │     ╰───╯   destructive (Δ≈π)
       └────────────→ A
```


---

## 6. Correspondances « physiques » (analogie guidée)

| Moteur (jeu) | Rôle / maths | Analogie physique (prudente) |
|---|---|---|
| OPC (reach set) | budget énergie + BFS pondéré | cône causal (vitesse ≠ c, contrainte par coûts) |
| CF (brouillard) | champ scalaire d’incertitude | champ d’information (épistémique) |
| `E=A+iΦ` | énergie complexe | amplitude complexe / action imaginaire (formalisme de phase) |
| `|ψ⟩`, interférence `I` | produit scalaire + phase | amplitudes de probabilité / cohérence quantique |
| Vince/Anna/Overload | champs de contrainte | termes de jauge/renormalisation/thermostat |
| `trace_hash` | hachage de trajectoire | intégrale de chemin (réplicabilité du “film”) |

> *Caveat* : ce sont des **métaphores opérationnelles** pour concevoir équilibrages & tests.


---

## 7. Décisions algorithmiques motivées par la « 26D »

1. **Ordonnancement déterministe** `key=(σ,kind,id,seed)` : compatibilité avec *translation temporelle* (trace stable).  
2. **Seuils d’interférence** `{I_min, I_mid, I_strong}` ajustés par `(λ,ρ,ω)` : contrôlent clones **complets/affaiblis/buff/dissip**.  
3. **Couloirs Vince** déclenchés par `(CF, τ, κ, σ)` : la topologie locale motive le perçage.  
4. **Overload** basé sur `(o, κ, σ)` : nettoyage quand la densité d’événements dépasse un cap.  
5. **Anna** module `(a, ρ)` : économie se corrige si accumulation non interactive.


---

## 8. Coupes dimensionnelles (extraits ASCII)

### 8.1 `(x, y)` avec `CF` et halo `OPC`
```
██▒▒▒▒▒▒
█●→→→▒▒▒    ● héros ; → chemin min coût ; halo clair = OPC
█  → →▒▒
```

### 8.2 `(x, Δt)` — rattrapage d’un clone
```
Δt ↑
 +  |   ○ clone (retard) ──╮  X fusion si |I|↑ et arg I≈0
 0  | ● main ──────────────┼──╯
 -  |______________________└────────→ x
```

### 8.3 `(A, Φ)` — régions d’interférence
```
Φ
╭──── constructive
│  ╭───╮
│  │ + │
│  ╰───╯
└───────── A
```

### 8.4 `(τ, π_p)` — portails et classes de chemins
```
classe τ: 0 1 0 1 ...
π_p  ↑      ⭕   ⭕   (potentiel de “saut” ↑ près des portails)
```


---

## 9. Falsifiabilité & protocole de test

- **Hypothèse H1** : `σ` (salience) prédit correctement la **résolution** (Collapse vs TCG) à Δlvl constant.  
- **Hypothèse H2** : `(λ,ρ)` déplacent les seuils `{I_min,I_mid,I_strong}` tel que mesuré par la **taux de clones affaiblis**.  
- **Hypothèse H3** : `κ` (roughness) corrèle avec la **fréquence Overload** à activité équivalente.  
- **Mesure** : logs `resolution.kind`, `|I|`, `overload.applied`, `window.vince` + `trace_hash`.  
- **Critère** : réplicabilité **≥ 0.99** sur seeds identiques (environnement contrôlé).


---

## 10. Limites de l’analogie

- La **26D** ici est **effective** (ingénierie) — rien à voir avec la **consistance quantique** des cordes.  
- Les “champs” régulateurs sont **design‑driven**, pas dérivés d’une Lagrangienne fondamentale.  
- Les “charges” ludiques `rᵢ` sont **sémantiques**, pas des symétries de jauge au sens strict.  
- L’**épistémique** (CF) n’est pas une indétermination ontologique : c’est une **vue** côté joueur.


---

## 11. Annexes

### 11.1 Tableau de comptage (26 axes)

| Groupe | # | Axes |
|---|---:|---|
| Cinématique | 4 | x, y, t_w, Δt |
| Énergétique | 4 | A, Φ, ρ, λ |
| Identité/Interf. | 4 | ρ_ψ, θ_ψ, |I|, arg I |
| Topo/Champs | 7 | CF, R_OPC, κ, τ, σ, ω, π_p |
| Charges ludiques | 4 | r₁, r₂, r₃, r₄ |
| Régulateurs | 3 | v, a, o |
| **Total** | **26** | — |

### 11.2 Pseudocode — cône d’atteignabilité & décision
```python
def reachable_OPC(world, hero):
    return bfs_weighted(origin=hero.pos, budget=hero.A, cost=tile_cost)

def decide_resolution(meet, ctx):
    score = f(Δlvl, σ(ctx.zone), |I|, Δt, ω, κ)
    if score < θ_collapse: return COLLAPSE
    if afk_or_optin(meet): return AUTO
    return TCG
```

> *Note de Smallinly* : “Quand on sait marcher, on mesure la carte en pas ; quand on sait compter, on la mesure en dimensions ; quand on sait jouer, on la mesure en histoires.”


---

## 12. Conclusion

Cette **cartographie 26D** fournit un **vocabulaire commun** pour relier **mécaniques**, **UI**, **équilibrage** et **tests**. Elle n’a pas d’ambition métaphysique : c’est un **outil d’architecture**. Mais comme toutes les bonnes cartes, elle **suggère** des chemins nouveaux : classes de portails topologiques, modulation adaptative de `λ` par météo, ou encore seuils d’interférence **contextuels** `I*(σ,κ,ω)` pour garder la stratégie **ludique et lisible**.


---

# 27_wtf_is_this_game_dialogue

# 27 — “WTF is this game?” — A dialogue
*(in English — featuring The Dude, Walter, and Jesus trying to grok the design)*

> **Context:** They’ve just been shown a build of *Heroes of Time* and a napkin with equations like `E = A + iΦ`, `|ψ⟩`, and “causal fog”. Bowling shoes still on. Coffee refills unlimited.

---

**The Dude:** So… it’s not turn-based, but it *kinda* is, but, like, sideways?

**Walter:** It’s simple, Dude. Server time’s the league schedule — **`t_w`** — authoritative. Your own rhythm — **`t_e`** — is how fast you actually roll. You drift, you pay energy. You don’t drift, the house sends regulators. Structure!

**Jesus:** Madre mía, you two talk like a rulebook. Listen. The map is a grid. The purple haze — that’s **CF**, the *Causal Fog*. What you *could* reach right now glows — **OPC**, the *causal shadow*. You vibe with me?

**The Dude:** I vibe. But what’s this `E = A + iΦ` jazz?

**Walter:** `A` is your gas pedal — real points you spend to move or act. `Φ` is the… coherence… mojo. If your clone from another day shows up and your phases align, boom: **interference**. Constructive? You double up. Destructive? You get static.

**Jesus:** Say it right, Walter: *If your rhythm sings with your shadow, you dance. If it clashes, you trip.*

**The Dude:** Shadows?

**Walter:** **Clones**, Dude. You may send a version of yourself from day `J-Δ` to meet you *today*. If your timing’s tight — high `|I|` — you get a **full clone**. If you mis-time it, it’s just a **weaker echo** or a tiny **buff**. If you botch it, *poof* — **dissipation**.

**The Dude:** Okay, but what stops somebody from camping forever behind that fog?

**Jesus:** Three bouncers, baby. **Vince** cuts corridors through fog to unblock the map. **Anna** makes idle empires decay — bye-bye turtle. **Overload** shows up when clones pile like bowling pins: he collapses the mess, leaves one canonical survivor. ¡Limpio!

**Walter:** Also: fights resolve three ways. If it’s a mismatch or low-stakes, **Collapse** — instant math. If it matters, **TCG** — your cards, your skill. If you don’t feel like it or you’re AFK, **Auto/AI** plays the safe line.

**The Dude:** It’s like bowling: sometimes you sim the frame, sometimes you roll it live.

**Jesus:** Except here the lane curves in time. Watch this napkin.

```
t_w fixed
y ↑  █ █ ▒ ▒ . . .     █ = unknown (CF), ▒ = hazy, . = clear
    █ ● → → . . .     ● = you; arrows = path you can afford (A)
    █   → → . . .     glow = OPC (reachable right now)
    +----------------→ x
```

**The Dude:** Nice glow. So if I do nothing?

**Walter:** You **drift** a little — tiny regen, tiny decay — so nobody locks the league. But no free jackpots. If you *stabilize* completely, regulators trigger: corridors open, buildings decay. Anti‑abuse.

**Jesus:** And the identity thing — **`|ψ⟩`** — means you are the sum of your incarnations. You split? The total stays ~1. You meet? **Interference** decides what survives.

**The Dude:** What about paradoxes? Like two finals at once?

**Walter:** **Arbiter** orders events deterministically — *trace hash* proves replay. No double trophies, Dude.

**Jesus:** The ball rolls once, sugar. Same seed, same strike.

**The Dude:** Okay. Hit me with a story play. I send a clone two days back to meet me tomorrow at the ruin. I miss the timing by three hours. What happens?

**Walter:** Your `|I|` drops. At best you get a **weak clone**; at worst just a **temporary buff**. No “half a card”.

**Jesus:** But you could carry an **Anchor** to slow phase decay, or use **Twin Hourglasses** to tune the catch‑up. Tools exist, chéri.

**The Dude:** And if five people slam the relic at once?

**Walter:** Stack exceeds cap → **Overload** → *collapse* to one canonical board state. Then fight if it still matters.

**Jesus:** Clean lanes, clean scores.

**The Dude:** So what’s the win condition vibe?

**Walter:** Play the **tempo**. Energy for distance, phase for synergy, fog for misdirection. Push when stakes are high, collapse the junk, choose TCG only when it’s worth the seat at the table.

**Jesus:** And remember the gospel according to Smallinly: *“We measure maps in stories.”*

**The Dude:** Right on. One last thing: if I roll backward in time, do I owe negative energy?

**Walter:** No negatives. You incur **debt on A** that must be repaid by drift or play. Debt raises costs and drags your `t_e` forward — the universe keeps the books.

**Jesus:** Accountants of destiny, cariño.

**The Dude:** Alright. WTF is this game?

**Walter & Jesus (together):** **A causal strategy where your **pace** is a resource.**

**The Dude:** Far out. Pass the hourglass.


---

# 28_final_words

# 28 — Final Words (North Star)

**Pace is a resource.** Time isn’t a clock; it’s something you *spend*. That’s the game’s identity.

**See ≠ be.** What you *could* do (ombre portée) and what you *know* (brouillard) are different levers. Keep them separate; balance them together.

**Identity is budgeted, not duplicated.** Clones don’t multiply power; they partition it. Interference decides who gets to be “real.”

**Determinism before drama.** Collapse, arbiter, trace hash—make the timeline replayable, then let the cards create the spectacle.

**Asymmetry with respect.** Fast players feel clever; slow players aren’t punished out of the game. Regulators nudge, they don’t humiliate.

**Simple loop, wild edges.** The core must be: move → spend A → reveal → maybe fight. All the weirdness (ψ, Φ, wraps, portals) lives at the edges and stays optional.

**Anti‑abuse is part of the fiction.** Vince, Anna, Overload aren’t just systems—they’re diegetic explanations for why the world stays fair.

**Measure stories.** If a log can’t explain a moment (“why did I win/lose *then*?”), fix the log or the rule.

---

### Epigraph

> **We don’t freeze time—we orchestrate tempo.**


---

# 29_comprehension_finale

# 29 — Compréhension finale (Spec “Multiplayer Officiel”)

> **But** — Fig­er la vision commune : temps différencié avec **drift léger par défaut**, drift **variable** selon mécaniques/objets/map, couches **OPC** (brut/qualité/effectif), **CF** (perception), énergie **E = A + iΦ**, clones/interférences, **régulateurs**, 3 modes de résolution.  
> **Philosophie** — *Pace is a resource.* On orchestre le **tempo**, pas des tours figés.

---

## 1) Modèle de temps & drift (final)
- **`t_w`** (monde, serveur autoritaire) : tick fixe (ex. 50ms) ; toutes les décisions sont horodatées `t_w`.
- **`t_e`** (entité, temps local) : avance quand on agit et via **drift léger** même si l’on n’agit pas.
- **Drift par défaut** (anti‑tortue, non EV+) :  
  `drift_base = α · Δt_w` *(α petit, ex. 0.02 jour par heure IRL)*.
- **Drift variable** (configurable, cumulable) :
  - **Map/biome** : `drift_map(biome)` (ex. marais plus lent, autoroute plus rapide).
  - **États/pouvoirs** : `drift_status` (ex. *stabilisation* met `drift_base → 0`, mais ↑ décohérence Φ et ↑ pression régulateurs).
  - **Dette** : tant que `Debt_A>0`, la régén A est d’abord absorbée et **le drift ne confère pas d’avantage net**.
  - **Événements** : fenêtres (portails/reliques) imposent des **paliers** sur `t_e` (passées = perdues, pas de rollback gratuit).

**Règle** : on **n’implémente pas** un “passage forcé des tours” à vitesse pleine — c’était un **cas extrême d’analyse**. Le jeu réel applique **drift léger** par défaut, modulé par carte/objets.

---

## 2) Énergie, identité & dette
- **Énergie complexe** : `E = A + iΦ`  
  - `A` : coût réel des actions/mouvements.  
  - `Φ` : phase/cohérence temporelle (clones, fusions, interférences).
- **Clones / identité** : `Σ |ψ_k|^2 = 1` (budget d’identité). Split/fusion respectent cette conservation.
- **Décorrélation** : `Φ` décroît naturellement (`λ`), ↑ avec bruit (villes/combat/portails).
- **Rollback** : reprend **snapshot** `A, Φ`. Jamais `A<0`. Si on dépasse, on crée de la **Dette** : `Debt_A>0` ⇒ malus et **drag** sur le tempo (coûts↑, régén absorbée).

---

## 3) Ombre portée & Brouillard (couches finales)
- **OPC_brut(t)** : aire atteignable par **A** seule (monotone en `A`).  
- **OPC_qualité(t)** : OPC_brut pondérée par `Φ`, **fenêtres** ouvertes, **CD** et **dette** → peut **baisser** même si A régénère.
- **OPC_effectif(t)** : ajoute **occupation adverse**, **coûts de zone**, **météo ω/roughness κ**, **régulateurs** → peut croître ou décroître.
- **CF (brouillard)** : ce que **les autres** croient possible ; centré sur **dernière position sûre** jusqu’à relocalisation, **déformé** par couloirs/occupation/régulateurs.

**UX** : **double halo** — anneau pâle = OPC_brut, cœur lumineux (dégradé) = OPC_qualité ; badges “fenêtre qui se ferme”.

---

## 4) Résolution des rencontres
- **Collapse** si impact faible / mismatch fort.  
- **TCG** si impact élevé / niveaux proches.  
- **Auto/IA** si deux opt‑in ou **AFK > 60s** (IA cap lv3).  
- **Overload** (régulateur) si surcharge de superpositions → collapse canonique.

---

## 5) Régulateurs (anti‑abus diegétiques)
- **Vince** (perçage) : ouvre des couloirs si CF + occupation créent un soft‑lock.  
- **Anna** (décroissance) : ronge l’économie des bunkers/AFK prolongés (surtout sous *stabilisation*).  
- **Overload** (surcharge) : élimine empilements paradoxaux, garde un état canonique.

---

## 6) Cas extrême vs drift léger (clarification finale)
- **Cas extrême (exercice)** : “passer les tours à vitesse pleine” ⇒ OPC_brut ↑, OPC_qualité ↓ fort, CF rayon ↑ mais crédibilité ↓.  
- **Jeu réel** : **drift léger variable** ⇒ **rayon** peut croître **doucement**, **qualité** décline si on n’agit pas ; **jamais EV+** en AFK (dette/λ/fenêtres/régulateurs compensent).

ASCII — anneau qui grandit lentement, cœur qui s’amincit
```
J0  :   ○●○   (Φ haut, fenêtres ouvertes)
J2  :  ○○●○   (A↑ modéré ; Φ↓ ; quelques fenêtres fermées)
J4  : ○○○●○○  (anneau ↑ lent ; cœur plus mince)
```

---

## 7) Configurabilité & overrides
Tout est **data‑driven** et **overridable** par map/mod :  
- **Drift** : `drift_base`, `drift_map`, `drift_status`, `drift_debt_drag`.  
- **Fenêtres** : tables de spawn/expiry, “fair pass”.  
- **Seuils** : `|I|` (interférences), mismatch niveaux, AFK timer, cap IA.  
- **Régulateurs** : triggers, priorités, coûts.  
- **Flags** : possibilité de **ne pas appeler** certaines APIs (ex. désactiver Overload pour un mode sandbox).

Exemple **YAML** minimal :
```yaml
tempo:
  tick_ms: 50
  drift:
    base_per_hour: 0.02   # jours cachés / heure IRL
    biome:
      highway: +0.01
      swamp: -0.01
    statuses:
      stabilization:
        base_multiplier: 0.0
        decoherence_lambda_bonus: +0.02
        regulator_pressure: high
  debt:
    cost_multiplier: 1.25
    regen_absorption: true

resolution:
  tcg_afk_seconds: 60
  ai_level_cap: 3
  level_mismatch_collapse: 7

interference:
  thresholds:
    full: 0.75
    weak: 0.50
    buff: 0.25

regulators:
  vince:
    enable: true
  anna:
    enable: true
  overload:
    enable: true
```

---

## 8) Contrôleur “MultiplayerOfficialController” (drop‑in)
**But** : intégrer les règles ci‑dessus **sans refactor massif**.

### Responsabilités
- Piloter `tick_world()`, drift, dette, fenêtres.  
- Orchestrer **déclencheurs de résolution** (collapse/TCG/auto).  
- Appliquer régulateurs.  
- Tenir **arbiter/trace_hash** (replay déterministe).

### Interfaces (pseudo)
```
POST /action/move|cast|use_item
GET  /state/entity/:id     # A, Φ, t_e, day_hidden, debt, ψ
GET  /zone/opc/:entity     # OPC_brut/qualité/effectif (résumé)
POST /resolve/encounter    # demande de TCG/collapse/auto
POST /regulators/scan      # hook manuel (debug)
```

### Boucle de tick (pseudo)
```python
def tick_world(dt_ms):
    for e in entities:
        # 1) drift (léger, modulé)
        drift = drift_base(dt_ms)               + drift_map(e.pos)               + drift_status(e.status)               - drift_debt_drag(e.debt)
        e.t_e += drift

        # 2) régén & dette
        regen = regen_A(e, dt_ms)
        if e.debt_A > 0:
            repay = min(regen, e.debt_A)
            e.debt_A -= repay
            regen -= repay
        e.A = min(e.A + regen, e.A_max)

        # 3) décohérence Φ
        e.Phi = max(min(e.Phi - lambda_decoherence(e, dt_ms), e.Phi_max), e.Phi_min)

        # 4) fenêtres / expirations
        update_time_windows(world, dt_ms)

    # 5) collisions & déclencheurs
    for enc in detect_encounters(world):
        route_resolution(enc)   # collapse / tcg / auto

    # 6) régulateurs
    run_regulators_if_needed(world)

    # 7) journalisation déterministe
    arbiter.commit_frame(world)
```

---

## 9) Intégration sans refactor (check‑list)
- [ ] **Brancher l’horloge** : `t_w` serveur → controller.  
- [ ] **Exposer t_e/A/Φ/ψ** via `GET /state`.  
- [ ] **Implémenter drift léger** + absorp­tion par dette.  
- [ ] **Fenêtres** : loader + expirations.  
- [ ] **Déclencheurs resolution** : mismatch/impact/opt‑in/AFK.  
- [ ] **Régulateurs** : hooks + priorités.  
- [ ] **Arbiter** : trace_hash frame‑by‑frame.  
- [ ] **UI** : double halo + badges.  
- [ ] **Tests** : passer 14/16/17 + multi packs.

---

## 10) Tests d’acceptation (résumé)
- **AFK** : OPC_brut ↑ lent, OPC_qualité ↓ ; Anna/Vince prêtes si lock.  
- **Mismatch** : collapse direct.  
- **Clone rattrapage** : effets par seuil `|I|`.  
- **Overload** : collapse canonique sans duplication.  
- **Stabilisation** : drift≈0, λ↑, pression régulateurs↑, EV≤0.  
- **Torus/portails** : coûts cumulatifs, pas de TP gratuit.

---

## 11) Télémétrie & KPIs
- % rencontres **collapse/TCG/auto**, temps moyen TCG, % AFK→IA.  
- Surface **OPC_brut vs OPC_qualité**, taux de fenêtres ratées.  
- Détections régulateurs (triggers, “sauvetages”).  
- Incidents **trace_hash** (doit être 0).

---

## 12) Pitfalls & garde‑fous
- **EV+ AFK** : surveiller que `regen_A - (λ + fenêtres + dette)` ≤ 0.  
- **Demi‑fusion gratuite** : appliquer **clone affaibli** sous seuil.  
- **Rollback duplicant** : **causal_guard** obligatoire.  
- **Soft‑lock carte** : laisser Vince/Anna agir + coûts d’occupation.

---

## 13) Annexes (ASCII rapides)

### Double halo OPC
```
pale ring  = OPC_brut (A pur)
bright core = OPC_qualité (Φ, fenêtres, CD, dette)
```

### Rencontre de clones & interférence
```
Temps ↑
Main:   ●──────────X
Clone:      ○ → →
Qualité: |I|=0.62 → clone affaibli
```

### Séquence de résolution
```
detect → classify(impact,mismatch,opt-in,afk) → collapse|tcg|auto → log arbiter
```

---

**Conclusion** — Le **drift léger variable** est la norme. Tout est **configurable / overridable** (map/mod). Le **MultiplayerOfficialController** offre une **implémentation de référence** : plug‑in, déterministe, anti‑abus, fun — et lisible par joueurs, front et back.  
Pour les variantes/sandboxes, activez/désactivez les modules (régulateurs/APIs) selon vos besoins.

---

# README

# Heroes of Time — README de navigation (gros index)

Bienvenue ! Ce README sert de **table des matières intelligente** pour naviguer rapidement dans tous les fichiers du pack.
Il propose : un **parcours conseillé**, des **sections par rôle**, une **carte des fichiers**, et des **liens directs** vers les ZIP.

---

## 🧭 Parcours conseillé (20–30 min)

1. **Pitch & bases** → [01_bases_concepts.md](01_bases_concepts.md)
2. **Règles moteur** → [02_regles_moteur.md](02_regles_moteur.md)
3. **Ombre portée & brouillard** → [03_ombre_brouillard.md](03_ombre_brouillard.md)
4. **Résolutions (Collapse/TCG/Auto)** → [04_systemes_resolution.md](04_systemes_resolution.md)
5. **Identité Ψ & énergie complexe** → [05_identite_energie_complexe.md](05_identite_energie_complexe.md)
6. **Interférences → gameplay** → [06_interferences_gameplay.md](06_interferences_gameplay.md)
7. **Objets & pouvoirs** → [07_objets_pouvoirs.md](07_objets_pouvoirs.md)
8. **Schémas ASCII (vision globale)** → [10_schemas_ascii_tous.md](10_schemas_ascii_tous.md)
9. **Scénario intégral J1→J25** → [09_chasse_temporelle_J25.md](09_chasse_temporelle_J25.md)
10. **Tests & cas limites** → [14_etudes_de_cas_tests.md](14_etudes_de_cas_tests.md)

Pour tout avoir en un fichier : **[MASTER.md](MASTER.md)**

---

## 👥 Par rôle

### Joueurs
- **Présentation simple** → [11_doc_joueur.md](11_doc_joueur.md)
- **Objets & pouvoirs** → [07_objets_pouvoirs.md](07_objets_pouvoirs.md)
- **Scénario J1→J25** → [09_chasse_temporelle_J25.md](09_chasse_temporelle_J25.md)

### Dev Front‑End
- **États/UX/événements** → [12_doc_front.md](12_doc_front.md)
- **Guide débutant (vertical slice “pas de tour par tour”)** → [README_FRONT_DEBUTANT.md](README_FRONT_DEBUTANT.md)
- **Schémas & effets** → [10_schemas_ascii_tous.md](10_schemas_ascii_tous.md)
- **Interférences (indicateurs UI)** → [06_interferences_gameplay.md](06_interferences_gameplay.md)

### Dev Back‑End
- **Horloges, énergie, dette** → [02_regles_moteur.md](02_regles_moteur.md)
- **Ψ/Φ & Interférences (formules)** → [05_identite_energie_complexe.md](05_identite_energie_complexe.md)
- **Modèle graphe & orchestration** → [25_etat_monde_graphe_orchestration.md](25_etat_monde_graphe_orchestration.md)
- **Analogie 26D (topologie/ontologie)** → [26_topologie_ontologie_vs_theorie_du_tout.md](26_topologie_ontologie_vs_theorie_du_tout.md)
- **Déclencheurs Collapse/TCG/Auto** → [04_systemes_resolution.md](04_systemes_resolution.md)
- **Cas limites & tests** → [14_etudes_de_cas_tests.md](14_etudes_de_cas_tests.md), [16_scenarios_cas_tordus_paradoxes.md](16_scenarios_cas_tordus_paradoxes.md), [17_tests_fonctionnels_unitaires.md](17_tests_fonctionnels_unitaires.md)

### Multijoueur
- **Playbooks** → [19_playbooks_multijoueur.md](19_playbooks_multijoueur.md)
- **Matrice résultats** → [20_matrice_resultats_multi.md](20_matrice_resultats_multi.md)
- **Diagrammes spatio‑temporels** → [21_diagrammes_spatio_temporels_multi.md](21_diagrammes_spatio_temporels_multi.md)
- **Charge & concurrence** → [22_protocoles_charge_concurrence.md](22_protocoles_charge_concurrence.md)
- **Sécurité & anti‑abus** → [23_securite_anti_abus.md](23_securite_anti_abus.md)
- **Scripts sandbox (pseudo)** → [24_scripts_sandbox_pseudo.md](24_scripts_sandbox_pseudo.md)

### Synthèses & bonus
- **Conclusion méta/philo** → [15_conclusion_meta.md](15_conclusion_meta.md)
- **Final words (North Star)** → [28_final_words.md](28_final_words.md)
- **Dialogue WTF (The Dude, Walter & Jesus)** → [27_wtf_is_this_game_dialogue.md](27_wtf_is_this_game_dialogue.md)
- **MASTER (concat auto)** → [MASTER.md](MASTER.md)

---

## 📦 Packs & téléchargements rapides

- **Pack “tout le corpus”** → [Heroes_of_Time_MD_COMPLETE.zip](Heroes_of_Time_MD_COMPLETE.zip)
- **Pack “edge & tests”** → [Heroes_of_Time_EDGE_TESTS.zip](Heroes_of_Time_EDGE_TESTS.zip)
- **Pack “multiplayer”** → [Heroes_of_Time_MULTIPLAYER_PACK.zip](Heroes_of_Time_MULTIPLAYER_PACK.zip)

---

## 🗂️ Carte des fichiers (avec résumé 1‑ligne)

### Fondations
- [00_QA_initiales.md](00_QA_initiales.md) — Questions/réponses de départ et décisions clés.
- [01_bases_concepts.md](01_bases_concepts.md) — Vision, notions de base, Jours cachés.
- [02_regles_moteur.md](02_regles_moteur.md) — `t_w/t_e`, dérive, dette d’énergie, stockage mini.
- [03_ombre_brouillard.md](03_ombre_brouillard.md) — OPC vs CF, anti‑soft‑lock.
- [04_systemes_resolution.md](04_systemes_resolution.md) — Collapse/TCG/Auto, régulateurs.

### Identité, interférences, objets
- [05_identite_energie_complexe.md](05_identite_energie_complexe.md) — `E=A+iΦ`, Ψ, split/fusion, décohérence.
- [06_interferences_gameplay.md](06_interferences_gameplay.md) — seuils `|I|` → effets en jeu.
- [07_objets_pouvoirs.md](07_objets_pouvoirs.md) — briseur de voile, sabliers, ancrage, etc.

### Scénarios & schémas
- [08_scenarios_cas_limites.md](08_scenarios_cas_limites.md) — 12+ cas limites illustrés.
- [09_chasse_temporelle_J25.md](09_chasse_temporelle_J25.md) — campagne J1→J25 à 4 joueurs + 3 régulateurs.
- [10_schemas_ascii_tous.md](10_schemas_ascii_tous.md) — schémas ASCII regroupés.

### Docs par audience
- [11_doc_joueur.md](11_doc_joueur.md) — règles côté joueur, exemples.
- [12_doc_front.md](12_doc_front.md) — états/UX, événements, animations.
- [13_doc_back.md](13_doc_back.md) — API/pseudo, algorithmes, déclencheurs.
- [README_FRONT_DEBUTANT.md](README_FRONT_DEBUTANT.md) — **Guide intégrateur front (vertical slice)**.

### Qualité & validation
- [14_etudes_de_cas_tests.md](14_etudes_de_cas_tests.md) — check‑list d’acceptation.
- **Edge/Tests** :  
  - [16_scenarios_cas_tordus_paradoxes.md](16_scenarios_cas_tordus_paradoxes.md) — stress moteurs & paradoxes.
  - [17_tests_fonctionnels_unitaires.md](17_tests_fonctionnels_unitaires.md) — specs unitaires/E2E/property.
  - [18_ascii_brouillard_psi.md](18_ascii_brouillard_psi.md) — dessins dédiés (propagation CF, Ψ).

### Multijoueur (ajouts)
- [19_playbooks_multijoueur.md](19_playbooks_multijoueur.md) — 24 playbooks concrets multi.
- [20_matrice_resultats_multi.md](20_matrice_resultats_multi.md) — tableau des résultats attendus.
- [21_diagrammes_spatio_temporels_multi.md](21_diagrammes_spatio_temporels_multi.md) — schémas multi.
- [22_protocoles_charge_concurrence.md](22_protocoles_charge_concurrence.md) — KPIs & campagnes charge.
- [23_securite_anti_abus.md](23_securite_anti_abus.md) — sécurité, anti‑dupe, anti‑camp.
- [24_scripts_sandbox_pseudo.md](24_scripts_sandbox_pseudo.md) — scripts de sim (pseudo‑code).

### Modèle & analogie
- [25_etat_monde_graphe_orchestration.md](25_etat_monde_graphe_orchestration.md) — **État du monde comme graphe orchestré** (maths + ASCII + coupes).
- [26_topologie_ontologie_vs_theorie_du_tout.md](26_topologie_ontologie_vs_theorie_du_tout.md) — **Analogie 26D** (topologie/ontologie) — sérieuse mais humble.

### Synthèses
- [15_conclusion_meta.md](15_conclusion_meta.md) — conclusion méta/philo.
- [27_wtf_is_this_game_dialogue.md](27_wtf_is_this_game_dialogue.md) — dialogue ludique en anglais.
- [28_final_words.md](28_final_words.md) — North Star (principes).

- **MASTER** → [MASTER.md](MASTER.md) — document intégral (concat automatique).

---

## 🔎 Recherche rapide (mots‑clés utiles)

- *“dérive passive”*, *“dette d’énergie”*, *“ombre portée causale”*, *“brouillard de causalité”*  
- *“interférence |I| seuils”*, *“Δphase π destructif”*, *“overload canonique”*  
- *“Vince couloir”*, *“Anna decay”*, *“Briseur de Voile”*  
- *“arbiter trace_hash”*, *“rollback idempotent”*, *“wrap torus + portail”*

---

## ✅ Exécuter les tests (guidage)

1. **Unitaires (moteur)** → voir [17_tests_fonctionnels_unitaires.md](17_tests_fonctionnels_unitaires.md) §1  
   - cibles : `compute_interference`, `split_coherence`, `tick_decoherence`, `regulator_scan`, `attempt_fusion`

2. **Fonctionnels (E2E)** → voir [17_tests_fonctionnels_unitaires.md](17_tests_fonctionnels_unitaires.md) §2  
   - F01 torus wrap, F02 rollback idempotent, F03 overload, F04 AFK takeover, F05 tempête CF

3. **Property‑based/Fuzz** → voir [17_tests_fonctionnels_unitaires.md](17_tests_fonctionnels_unitaires.md) §3  
   - P01 conservation |ψ|, P02 déterminisme trace, P03 no‑deadlock CF/stabilisation

4. **Campagnes charge** → [22_protocoles_charge_concurrence.md](22_protocoles_charge_concurrence.md)

---

## 🧩 Glossaire ultra‑court

- **A** : énergie réelle (coût actions) · **Φ** : phase/cohérence (imagin.).  
- **|ψ⟩** : identité d’une entité à travers ses incarnations.  
- **|I|** : qualité d’interférence entre incarnations (détermine effets).  
- **OPC** : ombre portée causale (potentiel) · **CF** : brouillard de causalité (incertitude).  
- **V/An/O** : Vince (perçage), Anna (décroissance), Overload (nettoyage).

---

## ❗ Pitfalls (à éviter)
- Demi‑fusion “gratuite” (|I| juste sous seuil) → appliquer **clone affaibli**.  
- Duplication par rollback → **causal_guard** obligatoire.  
- Soft‑lock CF + stabilisation → couloirs Vince + decay Anna.  
- Camp portails → fenêtre *fair pass* + coût d’occupation.

---

## 📌 Notes de version / Changelog (placeholder)
- v0.1 — Structure initiale + scénarios + tests + multi packs.

---

Bon usage, et ping si tu veux que je l’injecte automatiquement dans **MASTER.md** à chaque build.


---

# README_FRONT_DEBUTANT

# Heroes of Time — Guide Début Intégrateur **Front**  
*(style HoMM3 mais **sans tour par tour**) — Vertical slice en 1 journée*

> Objectif : te donner un **chemin simple** pour afficher une **map**, un **héros** qui se déplace,
> de l’**énergie** qui se dépense, un **brouillard**, une **ombre portée** et des **rencontres auto** —
> **sans** te plonger dans les parties complexes (Ψ, Φ, arbitre, etc.).

---

## 0) Ce que tu vas construire
- Une **grille** (20×12) avec quelques tuiles “forêt”, “plaine”, “colline”.
- Un **héros** (icone) qui se déplace au clic.
- Une **barre d’énergie** A (points d’action) qui baisse quand tu bouges.
- Un **brouillard** (CF) autour des zones non explorées.
- Une **ombre portée** (OPC) qui montre *jusqu’où tu pourrais aller* avec ton A restant.
- Des **rencontres auto** (si tu marches sur une tuile “garde”).
- Un **mode auto** si tu es AFK (l’IA joue simple).

> On garde tout **local** (mock) pour le vertical slice. Ensuite tu brancheras sur le vrai back.

---

## 1) Démarrage minimal (React + TS)
- **Stack** : Vite + React + TypeScript + Tailwind (ou CSS simple).
- **Dossier** `src/` : `App.tsx`, `Map.tsx`, `Hud.tsx`, `engine.ts`, `mock.ts`

```
npm create vite@latest hot-starter -- --template react-ts
cd hot-starter && npm i && npm run dev
```

---

## 2) Modèle d’état (ultra simple)

```ts
// src/engine.ts
export type TileKind = 'plain' | 'forest' | 'hill' | 'guard';
export type Pos = { x: number; y: number };

export type World = {
  W: number; H: number;           // taille de la map
  tiles: TileKind[];               // W*H
  fog: boolean[];                  // W*H : true = caché
  hero: { pos: Pos; A: number; Amax: number; level: number };
  clock: { tw: number; te: number };     // temps monde / temps héros (mock)
  settings: { drift: number };            // dérive passive par tick (mock)
};

export const idx = (w: World, x: number, y: number) => y*w.W + x;
```

- **A** = énergie (points d’action). Pas de dette, pas de Φ/Ψ ici.
- **tw/te** : juste pour afficher (tick mock dans `mock.ts`).

---

## 3) Génération du monde (mock)

```ts
// src/mock.ts
import { World, TileKind, idx } from './engine';

export function makeWorld(W=20, H=12): World {
  const tiles: TileKind[] = new Array(W*H).fill('plain');
  // quelques forêts & collines random
  for (let i=0;i<W*H;i++){
    const r = Math.random();
    if (r < 0.12) tiles[i] = 'forest';
    else if (r < 0.16) tiles[i] = 'hill';
  }
  // 6 gardes
  for (let k=0;k<6;k++){
    const x = Math.floor(Math.random()*W), y=Math.floor(Math.random()*H);
    tiles[idx({W,H} as any, x, y)] = 'guard';
  }
  const fog = new Array(W*H).fill(true);
  const world: World = {
    W, H, tiles, fog,
    hero: { pos: {x:1,y:1}, A: 12, Amax: 12, level: 3 },
    clock: { tw: 0, te: 0 },
    settings: { drift: 0.01 } // dérive: A se régénère très lentement
  };
  // décacher départ
  reveal(world, world.hero.pos, 3);
  return world;
}

export function reveal(w: World, p: {x:number;y:number}, r=3){
  for(let y=0;y<w.H;y++) for(let x=0;x<w.W;x++){
    const d = Math.abs(x-p.x)+Math.abs(y-p.y);
    if (d<=r) w.fog[idx(w,x,y)] = false;
  }
}
```

---

## 4) Coûts de déplacement & ombre portée

```ts
// src/engine.ts (suite)
export function moveCost(kind: TileKind){
  if (kind==='forest') return 2;
  if (kind==='hill') return 3;
  return 1; // plain|guard
}

export function inBounds(w: World, x:number, y:number){
  return x>=0 && y>=0 && x<w.W && y<w.H;
}

// renvoie le chemin direct (4 directions) et le coût total
export function pathAndCost(w: World, from: Pos, to: Pos){
  const path: Pos[] = [];
  let cost = 0, x=from.x, y=from.y;
  // Manhattan simple (vertical puis horizontal)
  while (y!==to.y){ y += (to.y>y?1:-1); cost += moveCost(w.tiles[idx(w,x,y)]); path.push({x,y}); }
  while (x!==to.x){ x += (to.x>x?1:-1); cost += moveCost(w.tiles[idx(w,x,y)]); path.push({x,y}); }
  return { path, cost };
}

// Ombre portée = cases atteignables avec A courant (BFS manhattan rapide)
export function reachable(w: World): boolean[] {
  const R = new Array(w.W*w.H).fill(false);
  const q: {x:number;y:number;A:number}[] = [{...w.hero.pos, A: w.hero.A}];
  const seen = new Set<string>([`${w.hero.pos.x},${w.hero.pos.y}`]);
  R[idx(w, w.hero.pos.x, w.hero.pos.y)] = true;
  while(q.length){
    const cur = q.shift()!;
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    for(const [dx,dy] of dirs){
      const nx = cur.x+dx, ny=cur.y+dy;
      if(!inBounds(w,nx,ny)) continue;
      const k = `${nx},${ny}`;
      const c = moveCost(w.tiles[idx(w,nx,ny)]);
      if (cur.A>=c && !seen.has(k)){
        seen.add(k); R[idx(w,nx,ny)] = true;
        q.push({x:nx,y:ny,A:cur.A-c});
      }
    }
  }
  return R;
}
```

---

## 5) Composants UI (Map & HUD)

```tsx
// src/Map.tsx
import React from 'react';
import { World, idx, pathAndCost, reveal, reachable } from './engine';

type Props = { w: World; setWorld: (w:World)=>void; };

export function Map({w,setWorld}:Props){
  const R = reachable(w);
  function onClickTile(x:number,y:number){
    const {path, cost} = pathAndCost(w, w.hero.pos, {x,y});
    if (cost > w.hero.A) return; // pas assez d'A
    const w2 = {...w, tiles:[...w.tiles], fog:[...w.fog], hero:{...w.hero}};
    for(const step of path){
      w2.hero.pos = step;
      w2.hero.A -= moveCost(w2.tiles[idx(w2, step.x, step.y)]);
      reveal(w2, step, 3);
      // rencontre auto si guard
      const t = w2.tiles[idx(w2, step.x, step.y)];
      if (t==='guard'){
        // auto-combat simple
        const ok = autoFight(w2.hero.level, 2); // garde lvl 2
        // résultat: retire la tuile guard quoiqu'il arrive
        w2.tiles[idx(w2, step.x, step.y)] = 'plain';
        // feedback
        console.log('combat', ok?'WIN':'LOSE');
        if (!ok) break;
      }
    }
    setWorld(w2);
  }
  return (
    <div style={{display:'grid', gridTemplateColumns:`repeat(${w.W}, 28px)`, gap:2}}>
      {w.tiles.map((t, i)=>{
        const x = i%w.W, y = (i/w.W)|0;
        const fog = w.fog[i];
        const can = R[i];
        const isHero = (x===w.hero.pos.x && y===w.hero.pos.y);
        const bg = t==='plain'?'#9fd38f': t==='forest'?'#2e7d32': t==='hill'?'#8d6e63':'#b71c1c';
        const overlay = fog ? 'brightness(0.2)' : can ? 'drop-shadow(0 0 6px rgba(0,0,0,.25))' : 'none';
        return (
          <div key={i}
            onClick={()=>onClickTile(x,y)}
            style={{width:28,height:28, background:bg, position:'relative', filter:overlay, cursor:'pointer', border:'1px solid #1b1b1b'}}
            title={`${x},${y}`}>
            {isHero && <div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',fontSize:18}}>🧭</div>}
          </div>
        );
      })}
    </div>
  );
}

function moveCost(tile:'plain'|'forest'|'hill'|'guard'){
  if (tile==='forest') return 2;
  if (tile==='hill') return 3;
  return 1;
}

function autoFight(heroLvl:number, enemyLvl:number){
  const diff = heroLvl - enemyLvl;
  const base = 0.5 + 0.1*diff;
  return Math.random() < Math.max(0.1, Math.min(0.9, base));
}
```

```tsx
// src/Hud.tsx
import React from 'react';
import { World } from './engine';

export function Hud({w, onRest}:{w:World; onRest:()=>void}){
  const pct = Math.round(100*w.hero.A/w.hero.Amax);
  return (
    <div style={{display:'flex', gap:16, alignItems:'center', margin:'8px 0'}}>
      <div>Jour caché <b>{Math.floor(w.clock.te/10)}</b> — t_w:<b>{w.clock.tw}</b> t_e:<b>{w.clock.te}</b></div>
      <div style={{width:160, height:10, background:'#333'}}>
        <div style={{width:`${pct}%`, height:'100%', background:'#00d084'}}/>
      </div>
      <div>A: <b>{w.hero.A}</b> / {w.hero.Amax}</div>
      <button onClick={onRest}>⏳ Repos (regen A)</button>
      <label style={{marginLeft:12}}><input type="checkbox" onChange={e=>localStorage.setItem('auto', e.target.checked?'1':'0')} /> Auto si AFK</label>
    </div>
  );
}
```

```tsx
// src/App.tsx
import React, { useEffect, useState } from 'react';
import { World } from './engine';
import { makeWorld } from './mock';
import { Map } from './Map';
import { Hud } from './Hud';

export default function App(){
  const [w, setW] = useState<World>(()=>makeWorld());

  // Tick mock: regen légère (dérive) + AFK auto
  useEffect(()=>{
    const id = setInterval(()=>{
      setW(prev=>{
        const w2 = {...prev, hero:{...prev.hero}, clock:{...prev.clock}};
        w2.clock.tw += 1; w2.clock.te += 1;
        // dérive = petit +A passif
        if (w2.hero.A < w2.hero.Amax) w2.hero.A = Math.min(w2.hero.Amax, w2.hero.A + w2.settings.drift);
        // auto simple si AFK
        const auto = localStorage.getItem('auto')==='1';
        if (auto && Math.random()<0.1){
          // petit pas opportuniste si possible
          const nx = w2.hero.pos.x + (Math.random()<0.5?1:-1);
          const ny = w2.hero.pos.y + (Math.random()<0.5?1:-1);
          // on laisse Map gérer les coûts au clic manuel dans le slice minimal
        }
        return w2;
      });
    }, 200);
    return ()=>clearInterval(id);
  }, []);

  function onRest(){
    setW(prev=>({...prev, hero:{...prev.hero, A: Math.min(prev.hero.Amax, prev.hero.A + 3)}}));
  }

  return (
    <div style={{padding:12, fontFamily:'ui-sans-serif, system-ui'}}>
      <h1>Heroes of Time — Starter (async, pas de tour par tour)</h1>
      <Hud w={w} onRest={onRest} />
      <Map w={w} setWorld={setW} />
      <p style={{marginTop:8,opacity:.7}}>
        Astuce : vise les cases **brillantes** (ombre portée) — elles sont atteignables avec ton A actuel.
      </p>
    </div>
  );
}
```

---

## 6) Brouillard & Ombre portée : ce qu’on affiche
- **Brouillard (CF)** : on grise les cases non révélées (`fog[i] = true` → *darken*).
- **Ombre portée (OPC)** : on **met un glow** discret sur les cases atteignables **maintenant** (fonction `reachable` déjà fournie).

Schéma vite fait :

```
██████▒▒▒▒▒▒▒
██● → → ▒▒▒▒▒  ← glow clair = atteignable (OPC)
██      ▒▒▒▒▒
```

---

## 7) Rencontres : auto par défaut
- Tuile `guard` : si tu marches dessus → **auto-combat** (fonction `autoFight` simple).
- Si tu veux un “vrai” combat plus tard, tu ouvriras un **modal TCG** au lieu de résoudre instant.

---

## 8) Mode Auto (AFK)
- Une **checkbox** déclenche un petit comportement **opportuniste** (ici, on a juste mis la structure).
- Règle d’or : **si le joueur est inactif** > 60 s en combat, **l’IA prend**.

---

## 9) Roadmap pour brancher le vrai back
1. Remplacer le tick local par le **tick serveur** (`t_w`) via WebSocket.
2. Envoyer intention `move(to)` → recevoir **chemin validé** + coût A (serveur autoritaire).
3. **Logs** min à afficher : `A_delta`, `resolution.kind` (collapse/auto/TCG), `meet.delta_te` (si rencontre).
4. Recevoir **événements** (Anna/Vince/Overload) pour feedback UI.

---

## 10) Checklist “Vertical Slice OK”
- [ ] La map s’affiche et on voit l’icone héros.
- [ ] Cliquer une case déplace le héros **si** A suffisant.
- [ ] La barre **A** baisse quand on bouge; le **repos** remonte A.
- [ ] Le **brouillard** se révèle autour du héros.
- [ ] L’**ombre portée** (cases atteignables) se voit clairement.
- [ ] Marcher sur un **guard** déclenche une **rencontre auto**.
- [ ] Le **mode auto** peut jouer si AFK.
- [ ] Pas de plantage quand A=0 (on peut toujours se reposer).

---

## 11) Bonus (optionnels, si tu as 1–2h de plus)
- **Wrap torique** : quand x<0 → x=W-1 (et inversement).
- **Objets** simples : `Briseur de Voile` (ignore fog 1 tour), `Ampoule d’Éther` (+3 A).
- **Mini-clone** visuel : un “fantôme” qui apparait si tu cliques bouton *Sabliers* (sans mécanique Ψ).

---

## 12) Rappels UX (garder fun & lisible)
- **Lisibilité > réalisme** : feedback immédiat (glow, toasts, barres claires).
- **Jamais bloqué** : même à A=0, le joueur peut “se reposer” et remonter.
- **Pas de spam modals** : auto par défaut, TCG plus tard seulement si l’enjeu est gros.

Bonne intégration. Quand tu veux brancher la version **avancée** (Ψ/Φ, clones complets, régulateurs), passe au `README_DEV.md` + `13_doc_back.md`.


---

# README_INDEX

# README_INDEX.md

# Heroes of Time — Pack complet des documents

Ce pack contient tous les documents en Markdown, prêts à être ouverts dans Cursor ou un éditeur texte.

## Sommaire (fichiers dans le même dossier)
- 00_QA_initiales.md
- 01_bases_concepts.md
- 02_regles_moteur.md
- 03_ombre_brouillard.md
- 04_systemes_resolution.md
- 05_identite_energie_complexe.md
- 06_interferences_gameplay.md
- 07_objets_pouvoirs.md
- 08_scenarios_cas_limites.md
- 09_chasse_temporelle_J25.md
- 10_schemas_ascii_tous.md
- 11_doc_joueur.md
- 12_doc_front.md
- 13_doc_back.md
- 14_etudes_de_cas_tests.md
- 15_conclusion_meta.md
- 16_scenarios_cas_tordus_paradoxes.md
- 17_tests_fonctionnels_unitaires.md
- 18_ascii_brouillard_psi.md
- 19_playbooks_multijoueur.md
- 20_matrice_resultats_multi.md
- 21_diagrammes_spatio_temporels_multi.md
- 22_protocoles_charge_concurrence.md
- 23_securite_anti_abus.md
- 24_scripts_sandbox_pseudo.md
- 25_etat_monde_graphe_orchestration.md
- 26_topologie_ontologie_vs_theorie_du_tout.md
- 27_wtf_is_this_game_dialogue.md
- 28_final_words.md
- README.md
- MASTER.md
- README_FRONT_DEBUTANT.md
