# 🌟 GUIDE DU JEU HEROES OF TIME - POUR BÉRÉNICE 🌟

## 🎮 Comment lancer le jeu

### Option 1 : Avec les vrais serveurs (recommandé)
```bash
./LANCE_JEU_BERENICE.sh
```
Le script lance tout automatiquement !

### Option 2 : Juste ouvrir le jeu
```bash
open BERENICE_EASY_GAME.html
```
(Ça marche aussi sans les serveurs grâce au mode simulation)

---

## 🎯 Comment jouer

### 1. **Le but du jeu**
Vaincre le monstre violet avec tes cartes magiques ! 🐲

### 2. **Les cartes** (en bas de l'écran)

| Carte | Effet | Coût |
|-------|-------|------|
| 🔥 **Boule de Feu** | Fait 20 dégâts | 1 ⭐ |
| ❄️ **Rayon Gelé** | Fait 15 dégâts + gèle | 2 ⭐ |
| ⚡ **Éclair Fou** | Fait 30 dégâts ! | 3 ⭐ |
| 💚 **Soin Magique** | Soigne 25 PV | 2 ⭐ |

### 3. **Comment gagner des points**
- Chaque carte utilisée = Points !
- Plus la carte coûte cher = Plus de points !
- Vaincre un monstre = BEAUCOUP de points !

---

## 🎁 SECRETS POUR BÉRÉNICE

### 🕹️ **Code Secret Konami**
Tape sur le clavier : **↑ ↑ ↓ ↓ ← → ← → B A**
→ Tu gagnes 1000 points bonus ! 🎉

### 🌈 **Astuces de pro**
1. Utilise **Éclair Fou** pour finir le monstre
2. Garde **Soin Magique** si tu as peu de vie
3. Regarde bien les animations, elles sont cool !

---

## 🛠️ Pour Tonton Vincent

### Architecture utilisée :
- **Frontend** : HTML5 + CSS3 animations + JavaScript
- **Backend Java** : API REST sur :8082/api/magic/translate
- **Backend Rust** : Moteur d'exécution (appelé par Java)
- **Mode Simulation** : Si les APIs sont down

### Logs pour debug :
Ouvre la console du navigateur (F12) pour voir :
- Les appels API
- Le mode (API ou simulation)
- Les erreurs éventuelles

### Personnalisation facile :
Dans `BERENICE_EASY_GAME.html` :
- Ligne 580+ : Messages d'encouragement
- Ligne 620+ : Dégâts des cartes
- Ligne 180+ : Couleurs des cartes

---

## 📸 Screenshot pour Bérénice

```
        🏰 HEROES OF TIME 🏰        Score: 420 ⭐
    
    👸 [========]     VS     🐲 [===-------]
        Héros                   Monstre
        100 PV                  40 PV
        
                💥 SUPER! 💥
    
    ┌────┐  ┌────┐  ┌────┐  ┌────┐
    │ 🔥 │  │ ❄️ │  │ ⚡ │  │ 💚 │
    └────┘  └────┘  └────┘  └────┘
```

---

## 🎉 AMUSE-TOI BIEN BÉRÉNICE ! 🎉

*PS : Si tu bats 10 monstres, montre ton score à Tonton Vincent !*
