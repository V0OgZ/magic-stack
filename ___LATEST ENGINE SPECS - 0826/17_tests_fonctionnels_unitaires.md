# Heroes of Time — Spécs tests **fonctionnels & unitaires** (robustes)

> Ce fichier décrit les **tests à générer** automatiquement par vos agents (CI) et ceux à écrire à la main (unitaires).  
> Inclut des snippets pseudo-API pour intégration directe.

## 1) Unit tests (moteur)

### 1.1 — `compute_interference(a,b)`
- **Given**: `⟨ψ_a|ψ_b⟩=0.8`, `Φ_a-Φ_b=π`
- **Then**: `|I| ≈ 0.8` mais **bonus destructif** (flag `destructive=true`)
- **Assert**: mapping gameplay = *clone affaibli*, **pas** buff

### 1.2 — `split_coherence(psi, ρ)`
- **Given**: `ρ=0.35`
- **Then**: `Σ|ψ|^2 ≈ 1.0`
- **Assert**: `|ψ_main|^2=(1-ρ)`, `|ψ_clone|^2=ρ` ± ε

### 1.3 — `tick_decoherence(entity, dt)`
- **Given**: `λ=0.03`, `Φ0=0.6`, `dt=600s`
- **Then**: `Φ≈Φ0*exp(-λ*dt)`
- **Assert**: baisse monotone, pas de remontée spontanée

### 1.4 — `regulator_scan(zone)`
- **Given**: CF>cap, AFK>thr
- **Then**: actions `[Vince.open_corridor, Anna.decay]`
- **Assert**: priorités cohérentes, pas d’oscillation

### 1.5 — `attempt_fusion(a,b,I)`
- **Given**: `|I|=0.74`, `I_strong=0.75`
- **Then**: **clone affaibli** (pas de fusion)
- **Assert**: pas de demi-carte

---

## 2) Functional tests (E2E simulés)

### F01 — **Torus wrap meet**
- Script: `Ventus@W-1 → dash(2,E) → wrap → meet Nyx@1`
- Expect: `collapse|tcg` selon `Δlvl`, `A_delta=-2`, `trace_hash` stable

### F02 — **Rollback idempotent**
- Script: `Terra J10 → rollback J8 → recapture Relic#3`
- Expect: aucune duplication, `causal_guard=true`

### F03 — **Overload cleanup**
- Script: `spawn Nyx x5 @node`
- Expect: `stack>cap` ⇒ Overload collapse; 1 entité canonique survivante

### F04 — **AFK takeover**
- Script: duel équilibré → AFK A @60s
- Expect: IA lvl≤3 prend; résultat déterministe sous seed

### F05 — **Tempête CF**
- Script: météo CF×1.5 → rencontre
- Expect: Vince perçage partiel; coûts↑; logs météo

---

## 3) Property-based & fuzzing

### P01 — **Conservation ψ**
- Generate: random split/merge chains (N up to 50)
- Property: `Σ|ψ|^2 ∈ [1-ε,1+ε]`

### P02 — **Determinisme trace**
- Generate: seeds aléatoires → même inputs ⇒ `trace_hash` identique

### P03 — **No deadlock**
- Generate: placements blocants + stabilisation + CF haut
- Property: corridor Vince ou decay Anna intervient < `T_max`

---

## 4) Snippets pseudo-API (à adapter)

```python
def test_interference_destructive():
    I = compute_interference(psi_a, psi_b, phi_a=0.7, phi_b=-0.7, overlap=0.8)
    assert abs(abs(I) - 0.8) < 1e-3
    assert I.destructive is True
    outcome = map_I_to_gameplay(I)
    assert outcome == "clone_affaibli"

def test_overload_cleanup():
    ids = spawn_clones("nyx", count=5, node="gate_3")
    res = regulator_scan_and_apply(node="gate_3")
    assert res.overload_applied is True
    assert len(entities_at("gate_3")) == 1  # canonique
```

---

## 5) Sorties attendues (format)

- **JUnit XML** pour CI (unitaires)
- **JSONL traces** pour simul E2E (incl. `trace_hash`, `arbiter.order`, `meet.delta_te`, `|I|`, `A_delta`)
- **PNG ASCII render** (optionnel) pour stocker les schémas en artefacts
