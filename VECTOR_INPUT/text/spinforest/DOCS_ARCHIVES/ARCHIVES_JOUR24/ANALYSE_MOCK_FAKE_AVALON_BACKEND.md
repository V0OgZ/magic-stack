# 🚨 ANALYSE : MOCKS/FAKES ET DUPLICATIONS DANS AVALON-BACKEND

## 📋 RÉSUMÉ DE LA SITUATION

### Magic Stack (spells/stack)
La Magic Stack est un système **AUTONOME** qui expose :
- `/api/magic/*` - Système de magie (cast, formulas, history)
- `/api/interstice/*` - Système 6D (upload, download, search, status)
- `/api/panopticon/*` - Logs et visualisation (world-state, feature-logs)
- `/api/mage/*` - Opérations des mages (self-update, cast-and-play)

Services implémentés :
- `MagicEngineService` - Gestion des sorts et formules
- `IntersticeService` - Gestion des entités 6D
- `FeatureLogService` - Logs temporels
- `PanopticonService` - Visualisation monde

### Avalon Backend
Devrait être le backend du **JEU** (RealGame), pas de la magie !

## 🔴 PROBLÈMES IDENTIFIÉS

### 1. Classes/Services qui ne devraient PAS être dans avalon-backend

#### DUPLICATIONS de la Magic Stack :
- `UniversalWaveFunction` - Devrait appeler Magic Stack
- `IntersticeService` - Existe déjà dans Magic Stack !
- `MagicCastService` - Devrait être un proxy vers Magic Stack
- `PanopticonService` - Existe dans Magic Stack

#### VRAIS services manquants pour le JEU :
- `GameService` - Gestion des parties
- `HeroService` - Gestion des héros
- `CombatService` - Système de combat TCG
- `WorldMapService` - Carte du monde HoMM3
- `ShamanCardService` - Cartes spéciales shaman

### 2. Controllers désactivés (.DISABLED)
- `GameController` - CRITIQUE pour RealGame !
- `CombatCardController` - Combat TCG
- `ShamanController` - Cartes shaman
- `HexMapController` - Carte hexagonale
- `PhoenixController` - ???
- `UniversalWaveController` - Devrait appeler Magic Stack

### 3. Endpoints utilisés par le frontend RealGame
D'après les fichiers HTML :
- `/api/games` - Liste des parties
- `/api/game/map` - Carte du jeu
- `/api/game/move` - Déplacements
- `/api/combat/vincent-special` - Combat spécial
- `/api/spells/shaman/cast-spirit` - Sorts shaman

## 🎯 CE QUI DEVRAIT ÊTRE FAIT

### 1. Avalon Backend devrait :
- Se concentrer sur la logique de JEU (HoMM3 + TCG)
- Appeler la Magic Stack pour tout ce qui est magie/6D
- Gérer les parties, héros, combats, cartes

### 2. Architecture propre :
```
Frontend (RealGame)
    ↓
Avalon Backend (Port 8080)
    ├── Game Logic (parties, héros, combat)
    └── Appelle → Magic Stack (Port 8082)
                    └── Magie, 6D, Panopticon
```

### 3. Services à implémenter dans Avalon :
- `GameService` - Gestion complète des parties
- `HeroService` - Héros et progression
- `CombatService` - Logique TCG
- `MapService` - Carte monde HoMM3
- `MagicProxyService` - Proxy vers Magic Stack

## ❌ NE PAS FAIRE
- Recoder la logique 6D (existe dans Magic Stack)
- Dupliquer les formules magiques
- Créer des "fake" services temporaires

## ✅ À FAIRE
1. Réactiver les controllers de jeu
2. Implémenter les vrais services de jeu
3. Créer un proxy propre vers Magic Stack
4. Nettoyer les duplications