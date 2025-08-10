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

