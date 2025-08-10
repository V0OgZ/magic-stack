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
