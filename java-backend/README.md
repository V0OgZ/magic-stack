# 🌀 AVALON Backend - Système Magique Unifié

Backend Spring Boot unifiant tous les systèmes magiques d'AVALON avec un endpoint principal `/api/magic/cast`.

## 🚀 Démarrage Rapide

```bash
# Compiler
mvn clean install

# Lancer
mvn spring-boot:run

# Ou avec Java
java -jar target/avalon-backend-1.0.0.jar
```

Le serveur démarre sur http://localhost:8080

## 🎯 Endpoint Principal: Magic Cast

### POST `/api/magic/cast`

Lance n'importe quel type de sort magique.

**Requête:**
```json
{
  "formulaType": "GROFI",
  "formula": "FUSION(GROFI, FOREST_THOUGHT)",
  "casterId": "jean-grofignon",
  "parameters": {
    "intensity": "maximum"
  }
}
```

**Types de formules supportés:**
- `SIMPLE` - Formules classiques (TELEPORT_HERO, FIREBALL, etc.)
- `RUNIC` / `PSI` - États quantiques (ψ001: ⊙(...))
- `GROFI` - Système quantique GROFI
- `GRUT` - Vision panoptique
- `TEMPORAL` - Codex Temporel avec amplitudes complexes
- `JSON` - Formules au format JSON

## 📊 Autres Endpoints

### GET `/api/magic/status`
État du système magique (GROFI, GRUT, Codex Temporel, WALTER Security)

### GET `/api/magic/formulas`
Liste toutes les formules disponibles

Paramètres optionnels:
- `type` - Filtrer par type de formule
- `caster` - Filtrer par lanceur

## 🛡️ WALTER Security

Le système de sécurité WALTER vérifie:
- Formules blacklistées
- Rate limiting (10 requêtes/minute)
- Paradoxes temporels dangereux
- Autorisation des lanceurs

En cas de menace critique, WALTER active le "Mode Vietnam" 🔥

## 🌟 Systèmes Intégrés

### 🌀 GROFI (Graph of Reality Organized by Fog and Immunities)
- États quantiques ψ en superposition
- Fusion avec la Forêt-Pensée
- Collapse Override (Jean-Grofignon)

### 👁️ GRUT (Entité Panoptique Omnisciente)
- Vision à travers 6+ dimensions
- Détection d'anomalies temporelles
- Fusion GRUFIJAN (GRUT + GROFI + JEAN)

### ⏳ Codex Temporel
- Amplitudes complexes (a + bi)
- Interférences temporelles
- Branches de timeline
- Boucles causales

### ✨ Formules Simples
- Sorts classiques de combat
- Téléportation
- Invocations
- Buffs et soins

## 🔧 Configuration

Voir `application.properties` pour configurer:
- Activation/désactivation des systèmes
- Seuils de stress quantique
- Mode Vietnam de WALTER
- Rate limiting

## 📚 Exemples de Formules

### État Quantique GROFI
```json
{
  "formulaType": "RUNIC",
  "formula": "ψ001: ⊙(Δt+2 @10,10 ⟶ MOV(Arthur, @10,10))",
  "casterId": "grofi"
}
```

### Vision Panoptique GRUT
```json
{
  "formulaType": "GRUT",
  "formula": "PANOPTIC_SCAN(all_dimensions)",
  "casterId": "grut"
}
```

### Interférence Temporelle
```json
{
  "formulaType": "TEMPORAL",
  "formula": "TEMPORAL_INTERFERENCE(ψ1, ψ2)",
  "amplitude": {
    "real": 0.8,
    "imaginary": 0.6
  }
}
```

## 🌈 Architecture

```
com.avalon/
├── controllers/
│   └── MagicCastController     # Endpoint principal
├── services/
│   ├── MagicCastService        # Orchestrateur
│   ├── WalterSecurityService   # Sécurité
│   └── engines/
│       ├── GrofiEngine         # Moteur GROFI
│       ├── GrutEngine          # Moteur GRUT
│       ├── TemporalCodexEngine # Moteur Temporel
│       └── SimpleFormulaEngine # Formules simples
└── models/
    ├── MagicCastRequest        # Requête
    └── MagicCastResponse       # Réponse
```

## 🎖️ WALTER SAYS

"This is not 'Nam. This is bowling. There are rules."

Respectez les règles, sinon WALTER activera le Mode Vietnam! 🔥