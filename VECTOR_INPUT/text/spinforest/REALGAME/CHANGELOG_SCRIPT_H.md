# 📝 CHANGELOG - Script `./h` Équipe SURFACE

## Version 2.0 - Mise à jour majeure

### ✨ NOUVELLES FONCTIONNALITÉS

#### 🚀 **`./h quick`** - Démarrage ultra-rapide
- Lance le frontend
- Ouvre automatiquement Heroes of Time dans le navigateur
- Parfait pour commencer à jouer immédiatement

#### 🌐 **`./h open [target]`** - Navigation directe
```bash
./h open game     # Heroes of Time (défaut)
./h open cards    # Cartes TCG Dark Holographic
./h open badge    # Badge Archéologue du Futur
./h open docs     # Assets & Documentation
```

#### 🧪 **`./h test`** - Tests automatiques
- Vérifie que le frontend répond (port 5002)
- Test communication avec backend PROFONDEUR (port 3001) 
- Compte les assets dans doc_shared
- Diagnostics complets en une commande

#### 👨‍💻 **`./h dev`** - Mode développement
- Démarre les services
- Affiche les logs en temps réel
- Parfait pour déboguer pendant le développement

#### ℹ️  **`./h info`** - Informations système
- Configuration complète de l'équipe SURFACE
- Tous les ports et URLs
- Infos système (OS, Python, Curl)
- Vue d'ensemble technique

#### 🧹 **`./h clean`** - Nettoyage
- Arrête proprement tous nos services
- Efface les logs
- Nettoie les fichiers PID
- Repart à zéro

#### 🆘 **`./h kill`** - Arrêt d'urgence
- Force l'arrêt de TOUS nos ports (3002, 5002, 8002)
- Utilise `kill -9` si nécessaire
- En cas de processus coincés

### 🔧 AMÉLIORATIONS EXISTANTES

#### **`./h start`** - Amélioré
- Messages plus clairs
- Gestion d'erreur améliorée
- Ouverture automatique des URLs après démarrage

#### **`./h status`** - Plus détaillé
- Status de chaque service individuel
- Vérification de la communication avec PROFONDEUR
- PIDs affichés pour chaque processus

#### **`./h`** - Aide restructurée
- Classée par catégories (Principales, Navigation, Développement, etc.)
- Exemples d'usage courant
- Plus claire et complète

### 🎯 NOUVELLES VARIABLES

```bash
# URLs pré-définies pour toutes nos créations
GAME_URL="http://localhost:5002/adventure/homm3/HOMM3_6D_DEMO.html"
CARDS_URL="http://localhost:5002/DARK_HOLOGRAPHIC_CARDS.html"
BADGE_URL="http://localhost:5002/BADGE_ARCHEOLOGUE_DU_FUTUR.html"
DOCS_URL="http://localhost:5002/doc_shared/"

# Port backend pour communication
BACKEND_PORT=3001
```

### 🌈 INTERFACE AMÉLIORÉE

#### Nouvelles couleurs
- `CYAN` pour les ouvertures de navigateur
- Meilleure lisibilité des sections
- Codes couleur cohérents par type d'action

#### Messages plus informatifs
- Status détaillés avec émojis
- Messages d'erreur clairs
- Instructions pour résoudre les problèmes

### 📊 EXEMPLES D'USAGE

```bash
# Workflow de développement typique
./h clean           # Nettoyer
./h quick           # Démarrer + jouer
./h dev             # Mode développement

# Navigation rapide
./h open cards      # Voir les cartes TCG
./h open badge      # Tester le badge archéologue

# Debug et maintenance
./h test            # Vérifier que tout marche
./h info            # Voir la config
./h kill            # Arrêt d'urgence si needed
```

### 🔄 WORKFLOWS OPTIMISÉS

#### Démarrage quotidien
```bash
./h quick  # Tout en une commande !
```

#### Développement
```bash
./h dev    # Logs en temps réel
```

#### Debug problèmes
```bash
./h test   # Diagnostics
./h info   # Configuration
./h clean  # Reset complet
```

### 🛡️ SÉCURITÉ & ISOLATION

- Tous les `kill` opèrent **UNIQUEMENT** sur nos ports (3002, 5002, 8002)
- Aucun impact sur le backend PROFONDEUR (3001)
- Nettoyage sécurisé des PIDs et logs
- Messages d'avertissement clairs

### 🎮 INTÉGRATION GAMING

- Ouverture automatique des créations
- URLs mémorisées pour navigation rapide
- Test de communication avec backend
- Mode développement pour créer de nouveaux mini-jeux

---

## 🎯 UTILISATION RECOMMANDÉE

### Pour Vincent
```bash
./h quick          # Jouer immédiatement
./h open cards     # Voir les cartes
./h test           # Vérifier que tout marche
```

### Pour développement (Claude)
```bash
./h dev            # Mode développement
./h test           # Tests automatiques  
./h clean          # Reset pour tests
```

### En cas de problème
```bash
./h info           # Voir la config
./h kill           # Arrêt d'urgence
./h clean          # Repartir à zéro
```

---

**🌊 Script `./h` v2.0 - Équipe SURFACE (Vincent + Claude)**  
*Développement quotidien optimisé pour Heroes of Time !*
