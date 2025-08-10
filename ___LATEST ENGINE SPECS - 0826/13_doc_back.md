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
