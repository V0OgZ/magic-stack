# 🔮 Grammaire Temporelle Complète (6D, Quantique, Causale, Runique)

Cette page regroupe: symboles et règles (depuis `grammaire_temporelle.json`), opérateurs temporels (SHIFT/FORK/MERGE), modèle 6D, couches causales/identitaires, et correspondances runiques.

## 1) Alphabet et symboles de base

- ⊙ superposition
- †ψ collapse (acte/volonté)
- Π observation
- Δt delta temporel (ex: Δt+1)
- ℬ branche(s)
- ⟶ projection (cause → effet)
- ∅ interstice

Exemples de structures:
- Formule simple: `symbole(sujet) + verbe + objet`
- Formule complexe: `symbole1(action1) + symbole2(action2) → delta(résultat)`
- Invocation: `⊙(entité) + †ψ(manifestation) → Δt+0(présence)`
- Sort temporel: `Π(obs) + ℬn(branche) ⟶ Δt+n(futur)`

Règles (principales): superposition_max=3, branches_simultanees=7, delta_max=99, collapse_obligatoire=true.

## 2) Opérateurs temporels (parser haute performance)

Opérations canoniques (cf. parser Rust):
- SHIFT(expr, offset): décale la position temporelle du contexte de `offset` (entier)
- FORK(expr): duplique l’exécution dans deux timelines parallèles
- MERGE(left, right): exécute et joint les résultats
- SEQ(...), PAR(...): séquence/parallelisation d’éléments

Exemples:
- `SHIFT ( FIREBALL , 5 )`
- `FORK ( TELEPORT_HERO )`
- `MERGE ( HEAL_ALLY , SHIELD_PARTY )`
- `SEQ ( OBSERVE , SHIFT(ATTACK,1) , MERGE(BUFF,HEAL) )`

## 3) Espace 6D (x,y,z,t,c,ψ)

- x,y,z: spatial
- t: position temporelle
- c: probabilité/poids causal
- ψ: cohérence identitaire/quantique (−1..1)

Distance et voisinage: recherches 6D (Q*) sur rayon; filtrage par type d’entité; scoring = distance + pertinence texte + boosts (causalité/identité).

## 4) Causalité et identitaire

- Causalité (c): renforce la probabilité d’influence et les scores de recherche; utilisée comme “boost” causal lors des matches sémantiques.
- Identité (ψ): mesure de cohérence/continuité de l’entité; booste les résultats cohérents et les fusions MERGE.
- Paradoxes: gérés au niveau gameplay par résolutions (Chasseur de Paradoxes) et formules `Π(paradoxe)+ℬ(correction) → Δt+0(cohérence)`.

## 5) Correspondances runiques (extraits)

Effets → Runes (capillaire runique):
- DAMAGE → ᚲ
- HEAL → ᚱ
- TELEPORT → ᚹ
- SUMMON → ᛁ
- BUFF → ᚺ
- PROTECT → ᚦ

Effets → Élément naturel (mapping):
- DAMAGE → FIRE
- HEAL → LIFE
- TELEPORT → SPACE
- SUMMON → NATURE
- BUFF → LIGHT

Effets → Puissance naturelle:
- DAMAGE → STORM
- HEAL → GROWTH
- TELEPORT → WIND
- SUMMON → EARTH
- BUFF → SUN

Astuce: si aucune rune détectée, séquence générique “NATURA”.

## 6) Modèles d’usage (HOTS)

- Soin: `ψ001: ⊙(Δt+1 ⟶ HEAL(target, 50))`
- Téléport: `⊙(Δt+0 ⟶ TELEPORT_HERO(hero,x,y))`
- Paradoxe: `Π(paradoxe)+ℬ7(branches) → Δt+0(résolution)`

## 7) Bonnes pratiques

- Préférer SEQ/PAR pour structurer la lisibilité des formules complexes
- Utiliser SHIFT pour “rewind/fast-forward” contrôlé plutôt que multiplier les branches
- Limiter ℬ (≤7) pour maintenir la stabilité des timelines
- Toujours conclure par un collapse †ψ si la formule reste superposée

## 8) Références reliées

- docs/TEMPORAL_GRAMMAR_FOR_DUDES.md (intro vulgarisée)
- docs/archive/TEMPORAL_GRAMMAR_MATHEMATICAL_PAPER.md (papier formel)
- grammaire_temporelle.json (source symboles & règles)
- backends/rust/src/temporal_grammar.rs (parser/AST/exec)
- moteurs/spell_translation_service.py (runes & mappings)