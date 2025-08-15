# Temporal Grammar — Master Reference (2025)

This document unifies the legacy HOTS grammar with the current engine behavior.

## Core Syntax
- Quantum state: `ψID: ⊙(Δt+N @x,y ⟶ ACTION(args))`
- Collapse: `†ψID` or conditional collapse `Π(cond) ⇒ †ψID`
- Symbols: ψ (quantum), ⊙ (observation), Δt (time offset), @ (position), ⟶ (transition), † (collapse), Π (condition)

## Canonical Actions (subset)
- HERO(name)
- MOV(hero, @x,y)
- CREATE(CREATURE|ITEM|BUILDING, ...)
- CAST(SPELL, name, TARGET:entity)
- USE(ARTIFACT, name, HERO:hero)

## API Mapping (current stack)
- Translate: POST `/api/magic/translate`
  - Request: `{ formula, targetFormat: 'all'|'literary'|..., includeQuantum?: true }`
  - Response: `translations.{literary, runic, iconic, quantum, traceHash?}`
  - Behavior: runic detection, JSON-asset heuristics, redaction layer; when `includeQuantum=true`, computes `traceHash` via Rust simulate.
- Cast: POST `/api/magic/cast`
  - Modes: `simulate` (default) | `apply`
  - Apply delegates to Rust `/temporal/apply` and returns `worldDiff` with `traceHash`.

## Runic Form Examples
- Basic: `ψ001: ⊙(Δt+2 @15,15 ⟶ MOV(Arthur, @15,15))`
- Create: `ψ010: ⊙(Δt+0 @8,3 ⟶ CREATE(CREATURE, Dragon, @8,3))`
- Conditional collapse: `Π(hero.hp<20) ⇒ †ψ010`

## JSON Asset Hints (translation)
When the input contains keys like `paradoxRisk`, `temporalStability`, `damage`, `healing`, translation enriches the literary output accordingly.

## Determinism
- `traceHash` is returned by translate (optional) and cast; identical inputs must yield identical hashes across simulate/apply.

## World Diff (apply)
- Shape: `{ entitiesCreated, entitiesUpdated, entitiesRemoved, worldNodes, notes, timestamp }`
- Engine will later populate concrete changes to the World State Graph.

## Teaching Path
1. Start with plain actions, then add positions and Δt.
2. Introduce ψ states and † collapse.
3. Show simulate vs apply and how `traceHash` proves determinism.

— Consolidated from legacy LUMEN grammar and current MagicStack services.
