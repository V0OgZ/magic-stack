# 🔮 HOT - Heroes of Time Command Center
## Script unifié pour gérer tout le système

## 🚀 Installation
```bash
chmod +x hot
```

## 📋 Commandes disponibles

### Commandes de base
```bash
./hot start        # Lance tout le système
./hot stop         # Arrête tous les processus
./hot status       # Affiche l'état du système
./hot menu         # Menu interactif
```

### Lancement spécifique
```bash
./hot game         # Lance le jeu principal uniquement
./hot hearthstone  # Lance le mode Hearthstone TCG
./hot core         # Lance le Core Game TCG Tactical
```

### Maintenance
```bash
./hot compile      # Compile tous les backends
./hot test         # Lance tous les tests
./hot logs         # Affiche les logs en temps réel
./hot clean        # Nettoie les fichiers temporaires
```

## 🎮 Menu interactif
Lance `./hot menu` pour un menu interactif avec toutes les options :

```
╔═══════════════════════════════════════════╗
║        🔮 HEROES OF TIME CENTER 🔮        ║
╚═══════════════════════════════════════════╝

📊 État du système Heroes of Time
═══════════════════════════════════════
🐍 Backend Python Heroes of Time : ✅ ACTIF (port 8080)
☕ Magic Stack Java              : ✅ ACTIF (port 8082)
🦀 Magic Stack Rust              : ✅ ACTIF (port 3001)
🔀 Python Router                 : ✅ ACTIF (port 5000)
🌐 Frontend Web                  : ✅ ACTIF (port 8000)

🎮 MENU PRINCIPAL
═══════════════════════════════════════
1) 🚀 Lancer tout le système
2) 🛑 Arrêter tout
3) 🎮 Lancer le jeu principal
4) 🃏 Lancer Hearthstone TCG
5) ⚔️  Lancer Core Game Tactical
6) 🔨 Compiler tous les backends
7) 🧪 Tester tout
8) 📋 Voir les logs
9) 🧹 Nettoyer
0) 🚪 Quitter
```

## 📊 Status détaillé
`./hot status` affiche l'état de tous les services :
- 🐍 Backend Python Heroes of Time (port 8080)
- ☕ Magic Stack Java - 869 sorts (port 8082)
- 🦀 Magic Stack Rust - Q* algorithm (port 3001)
- 🔀 Python Router (port 5000)
- 🌐 Frontend Web (port 8000)

## 📋 Logs
`./hot logs` permet de voir les logs en temps réel avec un menu :
1. Backend Python uniquement
2. Magic Stack Java uniquement
3. Magic Stack Rust uniquement
4. Python Router uniquement
5. Tous les logs en même temps

## 🧹 Nettoyage
`./hot clean` permet de :
- Arrêter tous les processus
- Supprimer les fichiers PID
- Nettoyer les logs
- Optionnellement nettoyer les caches de compilation

## 💡 Tips
- Utilisez `./hot` sans argument pour voir l'aide
- Les commandes peuvent être enchaînées : `./hot stop && ./hot clean && ./hot start`
- Le menu interactif (`./hot menu`) est idéal pour les débutants
- Les logs sont dans le dossier `logs/`

## 🔧 Alias (optionnel)
Pour encore plus de rapidité, ajoutez dans votre `.bashrc` ou `.zshrc` :
```bash
alias hot="$HOME/Interstice/SpinForest/hot"
```

Puis vous pourrez faire depuis n'importe où :
```bash
hot start
hot status
hot stop
```