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
Rencontre : `|I|` → fusion/clone réduit/buff/dissipation.

## Cas 12 — Blocage coordonné multi
```
Temps ↑
██████████████
●   ●   ●   ●
```
Attendu : **Vince** ouvre couloirs ; cap W empêche blocage total.

## Cas 13 — Stabilisation bunker (dérive annulée)
```
Temps ↑
(OPC figée)  ████
● (stabilisé)
```
Attendu : Δ monte ; **Anna/Vince** interviennent ; **Φ** décroît (λ↑).

## Cas 14 — Rollback & dette
```
Temps ↑
●────⤺──●──X
```
Attendu : pas de A<0 ; `Debt_A`>0 si spam ; malus + `t_e`↑.

## Cas 15 — Re-phase exploit (anti-boucle)
```
Temps ↑
●─⤺─●─⤺─●
```
Attendu : bruit + cooldown + cap Φ ; régulateurs alertés.
