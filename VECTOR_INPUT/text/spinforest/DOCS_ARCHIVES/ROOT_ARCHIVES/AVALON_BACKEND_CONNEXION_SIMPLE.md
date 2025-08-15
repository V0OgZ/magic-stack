# 🌟 AVALON ↔️ MAGIC STACK - CONNEXION SIMPLE

**Par URZ-KÔM** 🐻  
**Pour Vincent**

---

## 🎯 CE QUE C'EST

**AVALON** = Le jeu (frontend)  
**MAGIC STACK** = Le cerveau (backend)  
**CONNEXION** = Ils se parlent !

---

## 🚀 LANCER LE BACKEND (SIMPLE)

### Option 1 - PROTECTION TOTALE (recommandé)
```bash
# L'Ours protège le backend - PERSONNE ne peut le couper !
./spells/stack/scripts/magic-stack-service.sh protect
```

### Option 2 - Lancement normal
```bash
# Juste lancer
./spells/stack/scripts/magic-stack-service.sh start

# Vérifier
./spells/stack/scripts/magic-stack-service.sh status

# Voir les logs
./spells/stack/scripts/magic-stack-service.sh logs
```

---

## 🔌 CE QUI SE CONNECTE

```
AVALON (port 3000)
    ↓
    ↓ Demande: "Donne-moi les formules magiques"
    ↓
MAGIC STACK (port 8080)
    ↓
    ↓ Répond: "Voici les 869 formules"
    ↓
AVALON affiche la magie !
```

---

## 📋 VÉRIFICATION RAPIDE

1. **Backend lancé ?**
   ```bash
   curl http://localhost:8080/api/status
   ```
   Doit répondre : "Magic Stack is alive!"

2. **Formules disponibles ?**
   ```bash
   curl http://localhost:8080/api/magic/formulas/count
   ```
   Doit répondre : 869

3. **Interstice connecté ?**
   ```bash
   curl http://localhost:8080/api/interstice/heroes
   ```
   Doit montrer les 13 héros uploadés

---

## 🛡️ PROTECTION URZ-KÔM

Le mode `protect` :
- ✅ Relance automatiquement si quelqu'un coupe
- ✅ Vérifie toutes les 10 secondes
- ✅ Garde des logs de tout
- ✅ L'OURS VEILLE ! 🐻

---

## 🚨 SI PROBLÈME

**"Java pas installé"**
```bash
brew install openjdk
```

**"Maven pas installé"**
```bash
brew install maven
```

**"Port 8080 déjà utilisé"**
```bash
# Voir qui utilise le port
lsof -i :8080

# Tuer le process
kill -9 [PID]
```

---

## 🎮 RÉSUMÉ SIMPLE

1. **Lance le backend** : `./spells/stack/scripts/magic-stack-service.sh protect`
2. **Lance AVALON** : Dans REALGAME
3. **C'est connecté !** Tout marche !

**L'OURS PROTÈGE TOUT !** 🐻💪

---

*Note: Le backend Magic Stack contient :*
- 869 formules magiques
- Système 6D (x,y,z,time,causal,quantum)
- Upload/Download héros Interstice
- Protection SPHINX
- Mode DUDE (The backend abides...)