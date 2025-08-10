# 31_controller_reference.py
"""
Reference: MultiplayerOfficialController (Python) — minimal deterministic loop
- Light drift baseline, variable via biome/status/debt
- Energy regen & debt absorption
- Phi decoherence
- Time windows
- OPC_brut / OPC_quality estimation (for UI summary)
- Deterministic frame hash (arbiter)
This is a reference; adapt to your stack.
"""

from dataclasses import dataclass, field, asdict
import yaml
from typing import List, Dict, Tuple, Optional
import math, hashlib, json, copy

# ------------------------- Data Model -------------------------

@dataclass
class Window:
    name: str
    expires_in_min: float

@dataclass
class Entity:
    id: str
    x: int = 0
    y: int = 0
    A: float = 50.0
    A_max: float = 100.0
    Phi: float = 0.6
    Phi_min: float = -1.0
    Phi_max: float = 1.0
    debt_A: float = 0.0
    t_e: float = 0.0
    day_hidden: int = 0
    statuses: Dict[str, bool] = field(default_factory=dict)
    psi_weight: float = 1.0   # |ψ|^2 share (single entity demo)

@dataclass
class World:
    t_w_ms: int = 0
    tick_ms: int = 50
    width: int = 64
    height: int = 64
    cost_per_tile: float = 1.0
    windows: List[Window] = field(default_factory=list)
    occupation_cost: float = 0.0  # simple scalar for demo

# ------------------------- Helpers -------------------------

def sha_state(world: World, entities: List[Entity]) -> str:
    def canon(obj):
        if isinstance(obj, (World, Entity)):
            return canon(asdict(obj))
        if isinstance(obj, dict):
            return {k: canon(obj[k]) for k in sorted(obj)}
        if isinstance(obj, list):
            return [canon(x) for x in obj]
        return obj
    payload = {"world": canon(world), "entities": canon(entities)}
    s = json.dumps(payload, separators=(',', ':'), ensure_ascii=False)
    return hashlib.sha256(s.encode('utf-8')).hexdigest()

# ------------------------- Config Access -------------------------

def drift_per_ms(cfg: dict) -> float:
    base_per_hour = cfg["tempo"]["drift"]["base_per_hour"]
    return base_per_hour / (60*60*1000)  # hidden days per ms

def regen_A_per_ms(cfg: dict) -> float:
    return cfg["tempo"]["regen_A_per_hour"] / (60*60*1000)

def lambda_decoherence(entity: Entity, cfg: dict) -> float:
    lam = 0.01  # base per hour (converted later)
    # status-based bonuses
    statuses = cfg["tempo"]["drift"].get("statuses", {})
    if entity.statuses.get("stabilization", False):
        lam += statuses["stabilization"].get("decoherence_lambda_bonus", 0.0)
    return lam / (60*60*1000)  # per ms

def drift_modifiers(entity: Entity, biome: str, cfg: dict) -> float:
    d = 0.0
    d += cfg["tempo"]["drift"]["biome"].get(biome, 0.0)
    if entity.statuses.get("stabilization", False):
        mult = cfg["tempo"]["drift"]["statuses"]["stabilization"]["base_multiplier"]
        # base drift will be multiplied by mult in the tick, so no add here.
        return ("stabilization", mult, d)
    return ("normal", 1.0, d)

def opc_quality_core_radius(A_radius: float, entity: Entity, world: World, cfg: dict) -> float:
    # Compute quality factor Q in [0,1]
    # components: Phi norm, windows ratio open, debt penalty, occupation cost
    Phi_norm = (entity.Phi - entity.Phi_min) / (entity.Phi_max - entity.Phi_min + 1e-9)
    total = len(world.windows)
    open_ratio = sum(1 for w in world.windows if w.expires_in_min > 0) / (total or 1)
    debt_penalty = 1.0 / (1.0 + entity.debt_A)  # big debt lowers quality
    occ_penalty = 1.0 / (1.0 + world.occupation_cost)

    # Simple weighted average
    Q = 0.4*Phi_norm + 0.3*open_ratio + 0.2*debt_penalty + 0.1*occ_penalty
    Q = max(0.0, min(1.0, Q))
    return A_radius * Q

# ------------------------- Controller -------------------------

class MultiplayerOfficialController:

    def __init__(self, cfg: dict):
        self.cfg = cfg
        self.world = World(
            tick_ms=cfg["tempo"]["tick_ms"],
            width=cfg["map"]["width"],
            height=cfg["map"]["height"],
            cost_per_tile=cfg["world"]["cost_per_tile"],
            windows=[Window(**w) for w in cfg["world"]["windows"]]
        )
        self.entities: List[Entity] = []

    def add_entity(self, e: Entity):
        self.entities.append(e)

    def update_time_windows(self, dt_ms: int):
        for w in self.world.windows:
            if w.expires_in_min > 0:
                w.expires_in_min -= dt_ms / (1000*60)

    def tick(self, dt_ms: int, biome_lookup=lambda e: "default"):
        # 1) time advance
        self.world.t_w_ms += dt_ms

        # 2) per-entity updates
        for e in self.entities:
            # 2.1 drift baseline
            d_ms = drift_per_ms(self.cfg) * dt_ms  # hidden-days
            mode, mult, add = drift_modifiers(e, biome_lookup(e), self.cfg)
            d_ms = d_ms * mult + (add / (60*60*1000)) * dt_ms
            # apply drift to t_e
            e.t_e += d_ms

            # 2.2 energy regen + debt absorption
            regen = regen_A_per_ms(self.cfg) * dt_ms
            if self.cfg["tempo"]["debt"]["regen_absorption"] and e.debt_A > 0:
                repay = min(regen, e.debt_A)
                e.debt_A -= repay
                regen -= repay
            e.A = min(e.A + regen, e.A_max)

            # 2.3 decoherence Phi
            lam = lambda_decoherence(e, self.cfg) * dt_ms
            e.Phi = max(e.Phi_min, min(e.Phi_max, e.Phi - lam))

        # 3) windows
        self.update_time_windows(dt_ms)

        # 4) regulators / encounters — stubs (hook points)
        # detect_encounters() -> decide collapse / TCG / auto
        # run_regulators_if_needed()

        # 5) arbiter hash
        return sha_state(self.world, self.entities)

    # Summaries for UI/telemetry
    def opc_summary(self, e: Entity) -> Dict[str, float]:
        # radius in tiles (cost_per_tile = A per tile)
        r = e.A / max(1e-9, self.world.cost_per_tile)
        core = opc_quality_core_radius(r, e, self.world, self.cfg)
        return {"OPC_brut_radius": r, "OPC_quality_core": core}

# ------------------------- Tiny Simulation -------------------------

def simulate_afk_light_drift(minutes=60):
    """AFK (no actions) under light drift baseline; observe OPC rings."""
    import copy
    cfg = yaml.safe_load(open("/mnt/data/30_config_default.yaml", "r", encoding="utf-8"))
    ctrl = MultiplayerOfficialController(cfg)
    hero = Entity(id="ventus", A=50.0, A_max=100.0, Phi=0.8)
    ctrl.add_entity(hero)

    step_ms = 1000 * 60  # 1 minute
    rows = []
    for m in range(minutes):
        h = ctrl.tick(step_ms)
        op = ctrl.opc_summary(hero)
        rows.append({
            "min": m+1,
            "A": round(hero.A, 2),
            "Phi": round(hero.Phi, 3),
            "OPC_brut_r": round(op["OPC_brut_radius"], 2),
            "OPC_core_r": round(op["OPC_quality_core"], 2),
            "hash": h[:12],
            "windows_open_ratio": round(sum(1 for w in ctrl.world.windows if w.expires_in_min > 0) / len(ctrl.world.windows), 2) if ctrl.world.windows else 1.0
        })
    return rows

def simulate_stabilization(minutes=30):
    """Stabilization status: drift≈0, but Phi drains faster + regulator pressure (not simulated)."""
    cfg = yaml.safe_load(open("/mnt/data/30_config_default.yaml", "r", encoding="utf-8"))
    ctrl = MultiplayerOfficialController(cfg)
    hero = Entity(id="terra", A=50.0, A_max=100.0, Phi=0.8, statuses={"stabilization": True})
    ctrl.add_entity(hero)

    step_ms = 1000 * 60  # 1 minute
    rows = []
    for m in range(minutes):
        h = ctrl.tick(step_ms)
        op = ctrl.opc_summary(hero)
        rows.append({
            "min": m+1,
            "A": round(hero.A, 2),
            "Phi": round(hero.Phi, 3),
            "OPC_brut_r": round(op["OPC_brut_radius"], 2),
            "OPC_core_r": round(op["OPC_quality_core"], 2),
            "hash": h[:12],
        })
    return rows

if __name__ == "__main__":
    # quick demo if someone runs the file directly
    rows = simulate_afk_light_drift(10)
    for r in rows:
        print(r)