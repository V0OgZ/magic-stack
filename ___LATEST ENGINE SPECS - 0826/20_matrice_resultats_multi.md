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
