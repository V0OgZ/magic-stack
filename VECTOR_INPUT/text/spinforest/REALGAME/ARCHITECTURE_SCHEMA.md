# Architecture RealGame - Schéma complet

```
SpinForest (Projet principal)
├── REALGAME/                    # Interface PWA
│   ├── pwa-realgame.html       # Interface utilisateur
│   ├── config.js               # Configuration dynamique
│   ├── manifest.json           # PWA manifest
│   ├── sw.js                   # Service Worker
│   └── launch-pwa-fixed.sh    # Script de lancement
│
├── spells/                      # Sous-module Git
│   └── stack/                  # Magic Stack
│       ├── backends/           # Backends serveur
│       │   ├── java/          # Backend Java (Magic Stack)
│       │   │   └── target/
│       │   │       └── magic-stack-backend-1.0.0-APOLLO.jar
│       │   └── rust/          # Backend Rust (si disponible)
│       │       ├── Cargo.toml
│       │       └── src/
│       └── 869-formules/       # 869 formules magiques
│
├── assets/                      # Assets statiques
│   └── panopticon-6d-grut.html
│
├── maps/                       # Cartes de jeu
│   └── CHASSE_TEMPORELLE_HEROES.html
│
├── ARCADE/                     # Mini-jeux
│   └── AVALON_ULTIMATE_ARCADE.html
│
└── AVALON-TCG/                # Système de cartes
    └── launcher.html
```

## Flux de données

```
1. Utilisateur lance PWA
   ↓
2. pwa-realgame.html se charge
   ↓
3. config.js définit les URLs
   ↓
4. PWA fait des appels vers backends
   ↓
5. Backends (Java/Rust) traitent les données
   ↓
6. Réponse retourne à la PWA
```

## Problème actuel

### Structure Git
```
SpinForest (main repo)
├── .gitmodules                 # Définit les sous-modules
├── spells/stack/              # Sous-module Git
│   └── .git/                  # Git séparé !
└── REALGAME/                  # Dans le repo principal
```

### Problèmes identifiés

1. **Sous-module Git** : `spells/stack/` est un repo Git séparé
2. **Backends séparés** : Java et Rust dans le sous-module
3. **Interface dans le main** : PWA dans le repo principal
4. **Chemins relatifs** : Difficile à gérer entre les repos

## Solutions proposées

### Solution 1 : Script d'installation pour potes
```bash
# Pour tes potes - Installation simple
./install-for-friends.sh
```

Ce script va :
- Installer automatiquement Java/Python
- Copier tout dans `~/Applications/RealGame/`
- Créer un raccourci sur le bureau
- Double-clic = ça marche !

### Solution 2 : Configuration centralisée
```javascript
// config.js - Évite les adresses en dur
const CONFIG = {
    ENV: 'local',
    BACKENDS: {
        local: {
            javaBackend: 'http://localhost:8082',
            rustBackend: 'http://localhost:3001'
        }
    }
};
```

### Solution 3 : Déploiement cloud
```bash
# Option gratuite
./deploy-to-vercel.sh
# Donne un lien : https://realgame.vercel.app
```

## Recommandation pour tes potes

### Option A : Installation locale (recommandée)
1. Tu donnes le script `install-for-friends.sh`
2. Tes potes le lancent une fois
3. Double-clic sur le raccourci = ça marche
4. Pas besoin d'internet après installation

### Option B : Lien web (plus simple)
1. Tu déploies sur Vercel/Netlify
2. Tu donnes juste le lien
3. Tes potes cliquent = ça marche
4. Mais besoin d'internet

## Questions pour toi

1. **Le sous-module `spells/stack/`** : Tu veux le garder comme ça ou l'intégrer ?
2. **Backends** : Java et Rust tournent-ils en même temps ou c'est l'un ou l'autre ?
3. **Pour tes potes** : Tu préfères qu'ils installent local ou qu'ils aillent sur un lien web ?

## Prochaines étapes

1. **Tester le script d'installation** :
```bash
chmod +x install-for-friends.sh
./install-for-friends.sh
```

2. **Intégrer config.js dans la PWA** :
```javascript
// Dans pwa-realgame.html
<script src="config.js"></script>
```

3. **Choisir l'option pour tes potes** :
- Local = Plus de contrôle, pas d'internet
- Web = Plus simple, mais besoin d'internet
