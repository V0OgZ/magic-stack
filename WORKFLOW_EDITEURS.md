# WORKFLOW SAFE - 3 ÉDITEURS CONNECTÉS

## 🔄 WORKFLOW SIMPLE

### 1️⃣ CRÉER LA STRUCTURE (Terrain hexagonal)
```bash
./go we  # Lance WorldEditor React
```
- Créer le terrain (grass, water, mountain)
- Définir les régions
- **EXPORT** → `world_structure.json`

### 2️⃣ PLACER LES INSTANCES (Icônes + Timeline)
```bash
./go map  # Lance MAP_ICON_PLACER
```
- Drag & drop les icônes (🏰, ⚔️, 🐉)
- Définir: Day, t_w, t_e pour chaque
- **EXPORT** → `map_instances.json`

### 3️⃣ FUSIONNER POUR LE JEU
```bash
# Merge les 2 JSON
node CONVERTER_JSON.js world_structure.json map_instances.json > game_ready.json
```

### 4️⃣ TESTER LE JEU
```bash
# Ouvrir CHASSE_TEMPORELLE
open http://localhost:8000/CHASSE_TEMPORELLE_MEGA_MAP.html

# Importer game_ready.json dans le jeu
```

---

## 📁 FICHIERS GÉNÉRÉS

```
world_structure.json   → Terrain hexagonal (depuis WorldEditor)
map_instances.json     → Icônes placées (depuis MAP_ICON_PLACER)
game_ready.json       → Fusion des 2 (pour CHASSE_TEMPORELLE)
```

---

## ✅ AVANTAGES

1. **SAFE** - Aucune modification des outils existants
2. **SIMPLE** - Juste import/export JSON
3. **MODULAIRE** - Chaque outil fait sa partie
4. **RÉVERSIBLE** - Les JSON sont lisibles et modifiables

---

## 🚫 CE QU'ON NE FAIT PAS

- ❌ Pas de `git reset`
- ❌ Pas de suppression de fichiers
- ❌ Pas de modification des HTML existants
- ❌ Pas de refonte complète

---

## 🎮 COMMANDES RAPIDES

```bash
# Tout lancer
./go we        # WorldEditor (structure)
./go map       # Icon Placer (instances)
./go status    # Vérifier les services

# Convertir
node CONVERTER_JSON.js world.json icons.json > game.json

# Tester
open http://localhost:8000/CHASSE_TEMPORELLE_MEGA_MAP.html
```
