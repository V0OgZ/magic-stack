# Heroes of Time — Protocoles **charge & concurrence** (multi)

## KPIs
- Tick serveur stable (p99) ≤ 50 ms
- Latence **match events** ≤ 150 ms
- Temps décision **arbiter** ≤ 20 ms
- Mémoire monde (graph) ≤ budget X GiB (config)
- **Trace determinism** : collisions répétées → même `trace_hash`

## Campagnes
1) **Rush 1k joueurs / 10 min** : spawn, move, small fights, 5% TCG
2) **Clone storm** : 10% split clones (cap=4), mesurer Overload
3) **Edge kite** : 100 joueurs oscillent en bord CF
4) **Portals & wrap** : 20% portails, 10% wraps
5) **Finale simultanée** : N matchs avec conditions de victoire simultanées

## Artefacts CI
- JUnit XML (unit)
- JSONL traces (E2E)
- Heatmaps OPC/CF (PNG) optionnel
