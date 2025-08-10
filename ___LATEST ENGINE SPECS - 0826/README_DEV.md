# Heroes of Time — README_DEV (Front & Back)

Ce guide est un **raccourci dev** : ce qu’il faut lire, implémenter, vérifier et tester.

---

## 📚 À lire d’abord (ordre)
1. **Règles moteur** — `02_regles_moteur.md`
2. **Ψ / Énergie complexe** — `05_identite_energie_complexe.md`
3. **Résolutions (Collapse/TCG/Auto)** — `04_systemes_resolution.md`
4. **Interférences → gameplay** — `06_interferences_gameplay.md`
5. **Cas limites & tests** — `14_etudes_de_cas_tests.md`, `16_scenarios_cas_tordus_paradoxes.md`, `17_tests_fonctionnels_unitaires.md`

---

## ✅ Checklists Back-End

### Horloges & Énergie
- [ ] `t_w` serveur autoritaire, `t_e` par entité
- [ ] Dérive passive paramétrable (anti-tortue)
- [ ] **Pas de A<0** : dette `Debt_A` + malus + accélération `t_e`
- [ ] Passage **jour caché** correct (A==0 ⇒ +1)

### Identité & Interférences
- [ ] `Σ|ψ|^2 ≈ 1` après split/fusion
- [ ] `compute_interference` gère **Δphase π** (destructif)
- [ ] Seuils `|I|` → {clone complet / affaibli / buff / dissipation}

### Brouillard & Ombre portée
- [ ] OPC (potentiel) vs CF (incertitude) différenciés
- [ ] Vince perçage fenêtré ; Anna decay progressif
- [ ] Overload nettoie **stack>cap** (canonique unique)

### Résolutions & Arbitre
- [ ] **Collapse** si écart lvl fort / impact faible
- [ ] **TCG** sinon ; **Auto/IA** (AFK>60s ou opt-in)
- [ ] `arbiter` : ordre déterministe + `trace_hash` (simultané)

### Anti-abus & sécurité
- [ ] `causal_guard` anti-duplication (rollback)
- [ ] `psi_id` non forgeable (signatures)
- [ ] Portail camping : fenêtre fair-pass + coût occupation

---

## 🎨 Checklists Front-End

### HUD & États
- [ ] Afficher `t_e / t_w` lisible (barres ou badges)
- [ ] `A`, `Φ`, indicateurs `|I|` (strong/mid/weak/off)
- [ ] Ombre portée & brouillard (zones visuelles)

### Événements & Feedback
- [ ] Apparition/rencontre de clones (anim convergence)
- [ ] Déclencheur combat : **TCG / Auto / Collapse** (bannière claire)
- [ ] AFK→IA (compteur 60s + notification)

### Lisibilité & UX
- [ ] Fenêtre de perçage Vince (overlay discret, timer)
- [ ] Overload (signal lisible, survivant canonique mis en avant)
- [ ] Journal de match (événements clés + `trace_hash`)

---

## 🧪 Tests à brancher

### Unitaires (moteur)
- `compute_interference`, `split_coherence`, `tick_decoherence`,
  `regulator_scan`, `attempt_fusion`  
→ voir `17_tests_fonctionnels_unitaires.md` §1

### Fonctionnels (E2E)
- F01 torus-wrap, F02 rollback idempotent, F03 overload, F04 AFK takeover, F05 tempête CF  
→ `17_tests_fonctionnels_unitaires.md` §2

### Property‑based
- Conservation `|ψ|`, déterminisme `trace_hash`, no‑deadlock CF/stabilisation  
→ `17_tests_fonctionnels_unitaires.md` §3

---

## 📦 Scénarios Multi (à tester)
- Playbooks `19_playbooks_multijoueur.md`
- Matrice résultats `20_matrice_resultats_multi.md`
- Diagrammes `21_diagrammes_spatio_temporels_multi.md`

---

## 📌 KPIs & Charge
- Ticks p99 ≤ 50 ms ; arbitre ≤ 20 ms ; latence events ≤ 150 ms  
→ `22_protocoles_charge_concurrence.md`

---

## 🧯 Pitfalls connus
- Demi‑fusion (|I| juste sous seuil) → **clone affaibli**, pas de carte “demi”
- Dupes via rollback → `causal_guard`
- Soft‑lock CF + stabilisation → Vince/Anna obligatoires
- Camp portails → fair window + coût occupation

---

Bon dev. Ping pour intégrer ce README_DEV dans les ZIPs auto.
