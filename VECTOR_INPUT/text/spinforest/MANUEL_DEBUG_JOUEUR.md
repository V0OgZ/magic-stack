# MANUEL DEBUG - HEROES OF TIME

Si le jeu ne se lance pas, suivez ce guide :

## 🔧 VÉRIFICATIONS RAPIDES

### 1. Problème au lancement
```bash
# Dans Terminal, aller dans le dossier du jeu :
cd /Applications/Heroes\ of\ Time.app/Contents/Resources/

# Lancer manuellement :
./hot start
```

### 2. Vérifier les services
```bash
./hot status
```
**Doit afficher :**
- ✅ Frontend (port 8000)
- ✅ Java Backend (port 8082)  
- ✅ Rust Backend (port 3001)

### 3. Si un service est rouge ❌
```bash
# Arrêter tout et relancer :
./hot stop
./hot start
```

### 4. Erreur "Port occupé"
```bash
# Voir qui utilise le port :
lsof -i :8000
lsof -i :8082

# Tuer le processus si nécessaire :
kill -9 [PID_NUMBER]
```

### 5. Base de données verrouillée
```bash
# Supprimer le verrou H2 :
rm -f spells/stack/backends/java/data/interstice.mv.db.lock
```

## 🌐 ACCÈS DIRECT
- **Jeu:** http://localhost:8000/REALGAME/index.html  
- **Debug:** http://localhost:8000/system
- **Admin:** http://localhost:8000/admin (mot de passe: vince grr)

## 📞 SUPPORT
Si ça ne marche toujours pas, envoyer le fichier :
`logs/java-backend.log` 

Et la sortie de :
```bash
./hot status
```

---
*Ce guide résout 99% des problèmes de lancement*
