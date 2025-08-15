# 📋 Protocole de Mise à Jour - SpinForest/Avalon

## 🎯 Objectif
Ce document définit les procédures standard pour maintenir et faire évoluer le projet SpinForest/Avalon de manière cohérente et sûre.

---

## 🔄 Workflow de Base

### 1. Avant toute modification
- [ ] Vérifier l'état git : `git status`
- [ ] S'assurer d'être sur la branche principale : `git branch`
- [ ] Synchroniser avec le dépôt distant : `git pull`

### 2. Pendant les modifications
- [ ] Faire des commits atomiques (une fonctionnalité = un commit)
- [ ] Utiliser des messages de commit descriptifs
- [ ] Tester les changements localement si applicable

### 3. Après les modifications
- [ ] Vérifier les liens cassés dans les fichiers modifiés
- [ ] Mettre à jour la documentation associée
- [ ] Pousser les changements : `git push`

---

## 📝 Conventions de Nommage

### Fichiers
- **Markdown** : `snake_case.md` (ex: `update_protocol.md`)
- **JSON** : `snake_case.json` (ex: `hero_stats.json`)
- **Scripts** : `kebab-case.sh` (ex: `run-scenario.sh`)
- **Dossiers** : Utiliser les emojis définis + PascalCase

### Commits
Format : `<type>: <description>`

Types :
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation uniquement
- `style:` Formatage, espaces, etc.
- `refactor:` Restructuration du code
- `test:` Ajout ou modification de tests
- `chore:` Maintenance, nettoyage

---

## 🏗️ Structure des Modifications

### Ajout de Contenu Narratif
1. Placer dans le bon dossier thématique
2. Lier depuis un index ou README parent
3. Ajouter les métadonnées nécessaires (date, auteur, contexte)

### Modification Technique
1. Documenter le changement dans le code
2. Mettre à jour les tests si applicable
3. Vérifier la rétrocompatibilité

### Refactoring Majeur
1. Créer une issue/discussion préalable
2. Faire une branche dédiée si nécessaire
3. Documenter la migration dans DOCS_INTERNAL

---

## 🚨 Points de Vigilance

### Ne jamais :
- ❌ Supprimer des fichiers historiques sans archivage
- ❌ Modifier les structures fondamentales sans consensus
- ❌ Casser les liens existants sans redirection

### Toujours :
- ✅ Préserver la cohérence narrative
- ✅ Maintenir la trinité Structure-Substrat-Histoire
- ✅ Documenter les décisions importantes

---

## 🔍 Vérifications Régulières

### Hebdomadaire
- [ ] Scanner les liens cassés
- [ ] Vérifier l'intégrité des fichiers JSON
- [ ] Nettoyer les fichiers temporaires

### Mensuelle
- [ ] Réviser la structure globale
- [ ] Mettre à jour les index et sommaires
- [ ] Archiver les contenus obsolètes

---

## 📊 Outils Recommandés

### Scripts de Maintenance
```bash
# Trouver les liens cassés
python3 scripts/check_links.py

# Valider les JSON
python3 scripts/validate_json.py

# Nettoyer les fichiers indésirables
find . -name ".DS_Store" -delete
find . -name "*.bak" -delete
```

### Extensions Utiles
- Markdown linter
- JSON validator
- Git graph visualizer

---

*Protocole établi lors de la Phase de Reconstruction v2*  
*À réviser trimestriellement*