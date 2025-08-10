# Heroes of Time — Scripts de simulation (pseudo‑code)

```python
def run_mp01_pinch():
    world = reset(seed=42, topology="torus")
    J1 = spawn("ventus", pos=E-5)
    J2 = spawn("axis", pos=W-5)
    J3 = spawn("terra", pos=center)
    give(J2, "sabliers")
    move(J1, to=center-1)
    clone = split_coherence(J2.psi, rho=0.35, delta_days=2)
    converge(clone, J2, target=center)
    meet = check_meet([J1, J2, clone], J3)
    res = resolve(meet)  # collapse|tcg
    assert res.kind in ("collapse","tcg")

def run_mp24_finale():
    world = reset(seed=7)
    schedule(HOLD_NOYAU, teamA, j=3, at_tick=10000)
    schedule(RELIC_STEAL, teamB, at_tick=10000)
    out = arbiter(world)
    assert out.trace_hash
```
