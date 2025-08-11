# 🎯 EXPLICATION SIMPLE POUR VINCENT

## ❌ CE QUI EST FAUX/INUTILE:

Les ports 5173, 5174, 5176, 5005 dans le script `./go status` sont des VIEUX PORTS qu'on n'utilise plus!

## ✅ CE QUI EST VRAI ET UTILE:

### 1 SEULE APP FRONTEND = PORT 5175
```bash
magic-stack-unified sur http://localhost:5175
```

### LES VRAIES ROUTES:
- `/` - Page d'accueil
- `/unified` - Éditeur de map unifié
- `/combat` - Combat IA vs IA (wrapper HTML)
- `/chasse-mega` - Chasse temporelle (wrapper HTML)
- `/game` - Mode jeu
- `/editor` - Mode éditeur

## 🎮 COMMANDES SIMPLES:

```bash
# Lancer l'app
cd /Volumes/HOT_DEV/Magic/magic-stack/apps/magic-stack-unified
npm run dev

# Ou avec le script go:
cd /Volumes/HOT_DEV/Magic/magic-stack
./go game    # Lance tout et ouvre /unified
./go combat  # Lance tout et ouvre /combat
./go chasse  # Lance tout et ouvre /chasse-mega
```

## 🗑️ À SUPPRIMER/IGNORER:

- Port 5173 (ancien world-editor)
- Port 5174 (ancien projet)
- Port 5176 (n'existe pas)
- Port 5005 (ancien world-editor)

## ✨ LA VÉRITÉ:

**1 SEULE APP** = `magic-stack-unified` sur **PORT 5175**
Tout le reste est dedans!

---

Vincent, c'est simple:
- **1 app React** (port 5175)
- **Plusieurs routes** dedans
- **Les HTML** sont wrappés dans React

C'est tout! 🚀
