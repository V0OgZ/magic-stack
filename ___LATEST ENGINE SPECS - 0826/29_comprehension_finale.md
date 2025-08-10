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