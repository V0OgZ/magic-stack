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
