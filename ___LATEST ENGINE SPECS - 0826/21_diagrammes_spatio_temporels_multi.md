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
