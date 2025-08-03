# 🏗️ Architecture de la Magic Stack

## 📋 Vue d'ensemble

La Magic Stack est organisée en modules interconnectés pour une magie structurée et évolutive.

## 🧩 Modules Principaux

### 1. **MagicCore** (`magic_core.py`)
- **Rôle** : Noyau d'interprétation magique
- **Responsable** : GROEKEN
- **Fonctions** :
  - Compilation des formules temporelles
  - Gestion des sorts chargés
  - Contexte global magique
  - Logs d'exécution

### 2. **Grammaire Temporelle** (`grammaire_temporelle.json`)
- **Rôle** : Définition du langage magique
- **Version** : 2.0
- **Contient** :
  - Symboles sacrés (⊙, †ψ, Π, Δt, ℬ, ⟶, ∅)
  - Verbes magiques (création, transformation, mouvement)
  - Structures de formules
  - Règles d'exécution

### 3. **Grimoire** (`grimoire/`)
- **Rôle** : Bibliothèque de sorts JSON
- **Contenu** : 17 sorts opérationnels
- **Types** : Téléportation, invocation, protection, BRISURE

### 4. **Interface** (`interface.html`)
- **Rôle** : Interface de test et exécution
- **Fonctionnalités** :
  - Test en temps réel
  - Visualisation des résultats
  - Debug interactif

## 🔄 Flux d'Exécution

```
1. Chargement Grammaire → MagicCore
2. Chargement Sorts → Grimoire
3. Compilation Formule → Parser
4. Exécution → Moteur
5. Résultat → Interface/Log
```

## 🌐 Interfaces et Routages

### API Python
```python
core = MagicCore()
core.charger_sort('grimoire/sort_teleportation.json')
resultat = core.lancer_sort('teleportation', params)
```

### Intégration Backend Java
- Route : `/api/magic/cast`
- Format : JSON
- Retour : Résultat + effets

## 📊 Monitoring

- **Logs** : `magic_core.log`
- **État système** : `core.etat_systeme()`
- **Debug** : Interface web intégrée

---

*Documentation générée par URZ-KÔM - Day 7*