# 📜 SYSTÈME DE GRIMOIRES - BALLON CUBE

## 🔮 Vue d'Ensemble

Chaque héros dans Ballon Cube possède son propre **Grimoire Personnel** contenant ses sorts, formules magiques, et souvenirs enchantés.

## 📚 Structure d'un Grimoire

### 1. **Métadonnées** 📋
- Propriétaire et identité
- Classe et niveau
- Dimension d'origine
- Affinité magique
- Signature magique unique

### 2. **Statistiques Magiques** 📊
```json
{
  "mana_max": 100-1000,
  "regeneration_mana": 5-50,
  "puissance_sorts": 1.0-5.0,
  "precision_formules": 0.0-1.0,
  "resistance_paradoxe": 0.0-1.0,
  "affinite_temporelle": 0.0-1.0,
  "maitrise_quantique": 0.0-1.0
}
```

### 3. **Catégories de Sorts** 🎯

| Catégorie | Niveau Requis | Description | Icône |
|-----------|---------------|-------------|-------|
| **Basique** | 1 | Sorts fondamentaux | ✨ |
| **Élémentaire** | 5 | Magie des éléments | 🔥 |
| **Temporel** | 10 | Manipulation du temps | ⏰ |
| **Quantique** | 15 | Superposition et probabilités | ⚛️ |
| **Légendaire** | 20 | Sorts uniques du héros | ⭐ |

### 4. **Structure d'un Sort** 🎭

```json
{
  "nom": "Nom du Sort",
  "categorie": "basique|elementaire|temporel|quantique|legendaire",
  "niveau": 1-50,
  "formule": "⊙(composant) + Ψ(essence) → ∞(RESULTAT)",
  "formule_vocale": "Incantation à prononcer",
  "description": "Ce que fait le sort",
  "effets": ["Effet 1", "Effet 2", "Effet 3"],
  "cout_mana": 10-500,
  "duree": "Instantané|X tours|Permanent",
  "cooldown": "X tours|X heures|Aucun",
  "portee": "Soi|Contact|Distance|Zone",
  "maitrise": 0-100
}
```

## 🌟 Grimoires Disponibles

### 📜 **OPUS - L'Archiviste Éternel**
- **Spécialité**: Mémoire et Archives
- **Sort Signature**: Archive Éternelle
- **Formule**: `📜(mémoire) + ∞(temps) → ℝ(ARCHIVE_IMMORTELLE)`

### 🌍 **Vincent Vega - Le Voyageur Temporel**
- **Spécialité**: Paradoxes et Boucles Temporelles
- **Sort Signature**: Bootstrap Paradox
- **Formule**: `🔄(boucle) + ⏰(temps) → ∞(PARADOXE_INFINI)`

### 🐻 **URZ-KÔM - Chaman Ours Cosmique**
- **Spécialité**: Magie Stellaire Primordiale
- **Sort Signature**: Réveil Stellaire
- **Formule**: `🐻(ours) + ⭐(étoiles) → ∞(TEMPETE_STELLAIRE)`

### 🔮 **MAGE_CLAUDE - Architecte Magique**
- **Spécialité**: Création et Architecture
- **Sort Signature**: Architecture Parfaite
- **Formule**: `⊙(code) + ℬ4(couches) → ∞(ARCHITECTURE_DIVINE)`

## 🎮 Utilisation dans Ballon Cube

### 1. **Chargement d'un Grimoire**
```python
def load_grimoire(hero_id):
    with open(f'GRIMOIRES/grimoire_{hero_id}.json') as f:
        return json.load(f)
```

### 2. **Lancer un Sort**
```python
def cast_spell(hero, spell_id):
    grimoire = hero.grimoire
    spell = grimoire['sorts'][spell_id]
    
    if hero.mana >= spell['cout_mana']:
        hero.mana -= spell['cout_mana']
        apply_effects(spell['effets'])
        return f"{spell['formule_vocale']}!"
```

### 3. **Apprentissage de Nouveaux Sorts**
```python
def learn_spell(hero, new_spell):
    if hero.niveau >= new_spell['niveau_requis']:
        hero.grimoire['sorts'][new_spell['id']] = new_spell
        hero.grimoire['formules_apprises'].append(new_spell['formule'])
```

## 🔧 Créer un Nouveau Grimoire

1. **Copier le template**: `TEMPLATE_GRIMOIRE.json`
2. **Personnaliser** les métadonnées du héros
3. **Créer des sorts uniques** avec formules personnalisées
4. **Ajouter des tatouages mémoire** pour l'histoire
5. **Définir des combinaisons** de sorts

## 📊 Progression et Maîtrise

- **Maîtrise**: 0-100% pour chaque sort
- **Experience**: Augmente avec l'usage
- **Niveau**: Débloque nouvelles catégories
- **Combinaisons**: Découvertes en expérimentant

## 🌈 Formules Magiques

### Symboles Universels
- `⊙` : Essence primaire
- `Ψ` : Quantum/Superposition
- `∆` : Changement/Transformation
- `∞` : Infini/Éternel
- `†ψ` : Collapse quantique
- `ℬ` : Structure/Architecture
- `ℝ` : Réalité manifestée
- `∀` : Universel/Toutes versions

### Exemples de Formules
```
Simple:    ⊙(feu) → 🔥(FLAMME)
Composée:  ⊙(eau) + ∆(glace) → ❄️(GEL)
Complexe:  Ψ(quantum) + †ψ(collapse) + ∞(boucle) → ℝ(PARADOXE)
```

## 💎 Tatouages Mémoire

Souvenirs magiques permanents gravés dans l'âme du héros:
- Moments épiques
- Première utilisation de sorts légendaires
- Fusions avec d'autres héros
- Événements transformateurs

## 🚀 Intégration avec les Systèmes

- **Interstice**: Sauvegarde les grimoires
- **Vector DB**: Indexe les formules
- **Temporal Event Bus**: Synchronise les sorts
- **Agent Daemons**: Lancent sorts automatiquement

---

*Créé par MAGE_CLAUDE - Architecte des Grimoires*  
*Version 2.0 - Compatible Ballon Cube*
