# 🔮 HOT COMMAND CENTER - Script unifié
## Par URZ-KÔM - Pour Chef de Projet 6D

## 🎯 OBJECTIF
Suite à la demande de Vincent ("tu peux me regrouper tou mes cript en un menu que je leanmce"), j'ai créé un script unique qui centralise TOUTES les commandes du projet.

## 🚀 LE SCRIPT "hot"
Un seul script pour tout contrôler :

```bash
./hot [commande]
```

## 📋 COMMANDES PRINCIPALES

### Gestion du système
- `./hot start` - Lance TOUT (backends + frontend)
- `./hot stop` - Arrête TOUT proprement
- `./hot status` - Voir ce qui tourne

### Lancement de jeux spécifiques
- `./hot game` - Le jeu principal Heroes of Time
- `./hot hearthstone` - Mode Hearthstone avec Magic Stack
- `./hot core` - Core Game TCG Tactical

### Maintenance
- `./hot compile` - Compile tous les backends
- `./hot test` - Lance tous les tests
- `./hot logs` - Voir les logs en temps réel
- `./hot clean` - Nettoyer les fichiers temporaires

### Interactif
- `./hot menu` - Menu interactif avec toutes les options

## 🎮 EXEMPLE D'UTILISATION

```bash
# Vérifier l'état
./hot status

# Lancer tout le système
./hot start

# Lancer juste le jeu
./hot game

# Arrêter tout
./hot stop

# Menu interactif (recommandé pour débuter)
./hot menu
```

## 🔧 CE QUI SE PASSE DERRIÈRE

Le script `hot` appelle intelligemment les bons scripts :
- `start` → LANCE_AVALON_UNIFIE.sh
- `stop` → STOP_TOUTES_CONSOLES.sh
- `game` → LANCE_LE_JEU_QUI_MARCHE.sh
- `hearthstone` → LANCE_HEARTHSTONE_AVEC_MAGIC_STACK.sh
- `compile` → COMPILE_TOUT.sh
- `test` → TEST_TOUT.sh

## 📊 STATUS VISUEL

```
📊 État du système Heroes of Time
═══════════════════════════════════════
🐍 Backend Python Heroes of Time : ✅ ACTIF (port 8080)
☕ Magic Stack Java              : ✅ ACTIF (port 8082)
🦀 Magic Stack Rust              : ✅ ACTIF (port 3001)
🔀 Python Router                 : ✅ ACTIF (port 5000)
🌐 Frontend Web                  : ✅ ACTIF (port 8000)
```

## 💡 AVANTAGES
1. **Un seul point d'entrée** - Plus besoin de chercher quel script fait quoi
2. **Commandes courtes** - `./hot start` au lieu de `./REALGAME/LANCE_AVALON_UNIFIE.sh`
3. **Status visuel** - Voir d'un coup d'œil ce qui tourne
4. **Menu interactif** - Pour ceux qui préfèrent les menus
5. **Gestion des logs** - Voir tous les logs ou un seul service

## 🎯 PHILOSOPHIE 6D
Comme dans le jeu où on navigue dans le temps, le script `hot` permet de naviguer dans tous les états du système :
- `start` = Créer le présent
- `stop` = Retourner au vide
- `status` = Observer la superposition quantique
- `clean` = Effacer les traces temporelles

## 🔮 CONCLUSION
Vincent, tu as maintenant UN SEUL script pour tout gérer. Plus besoin de jongler avec 20 scripts différents !

```bash
# La seule commande à retenir
./hot menu
```

Et si tu veux aller plus vite :
```bash
./hot start  # Pour commencer
./hot game   # Pour jouer
./hot stop   # Pour arrêter
```

C'est tout ! 🎉