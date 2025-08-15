# RÉCAPITULATIF DES FORMATS - HEROES OF TIME / HOMM3

## FORMATS EXISTANTS

### 1. FORMAT MAP (.json)
- **Utilisation**: Données de terrain brutes
- **Exemple**: `homm3_spinforest_map.json`
- **Contient**: terrain, objets, positions
- **Parser**: JavaScript/Python

### 2. FORMAT SCENARIO (.hots)
- **Utilisation**: Scripts d'actions et événements
- **Exemple**: `bataille_arthur.hots`
- **Contient**: dialogues, actions, IA basique
- **Parser**: TemporalScriptParser.java
- **Grammaire**: Symboles GROFI (†, Π, Ω, ↯, ψ)

### 3. FORMAT SCENARIO PACKAGE (.hsp)
- **Utilisation**: Format unifié COMPLET
- **Exemple**: `HOMM3_SCENARIO_SPINFOREST_CONQUEST.hsp`
- **Contient**: map + story + heroes + IA + objectifs
- **Parser**: ScenarioLoader unifié
- **NOUVEAU**: Le plus complet !

### 4. FORMAT WORLD (.hworld)
- **Utilisation**: Définition de monde entier
- **Contient**: géométrie, physique, biomes
- **Status**: Proposé par GRUT, pas encore implémenté

## GRAMMAIRE IA INTÉGRÉE

### Niveaux de grammaire IA:
1. **SIMPLE_REACTIVE**: Actions basiques (IF/THEN)
2. **GROFI_EXTENDED**: Symboles temporels (ψ, †, Δt)
3. **QUANTUM_ENHANCED**: Récursion et prédiction (ψ[ψ[...]])

### Comportements IA disponibles:
- AGGRESSIVE
- DEFENSIVE
- STRATEGIC
- CHAOTIC
- ADAPTIVE

### Exemples de règles IA:
```
# Basique
IF turn < 7 THEN FOCUS(BUILD_ECONOMY)

# Temporel
ψ[IF threat > 0.8] → Δt+1(PREPARE_DEFENSE)

# Quantique
ψ[ψ[OBSERVE(player)]] → Π[CALCULATE(counter)]
```

## MAGIC STACK INTEGRATION

Le Magic Stack est déjà configuré pour:
- Adaptation IA en temps réel
- Apprentissage des patterns joueur
- Ajustement dynamique difficulté
- Génération d'événements narratifs

## RECOMMANDATION

**Utiliser le format .HSP** pour les nouveaux scénarios car il contient TOUT:
- La map
- L'histoire
- Les héros
- La grammaire IA avancée
- Les objectifs
- L'intégration Magic Stack

C'est le format le plus complet et le plus facile à charger pour les joueurs !