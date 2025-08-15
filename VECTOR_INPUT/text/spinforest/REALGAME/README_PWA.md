# RealGame PWA - Guide d'utilisation

## Qu'est-ce qu'une PWA ?

Une PWA (Progressive Web App) c'est comme une app native mais qui marche dans le navigateur. Avantages :
- Fonctionne hors ligne
- Peut être installée comme une vraie app
- Mise à jour automatique
- Plus rapide que le web normal

## Comment lancer la PWA

### Option 1 : Script simple
```bash
cd REALGAME
./launch-pwa-simple.sh
```

### Option 2 : Manuel
```bash
# Terminal 1 - Serveur HTTP
python3 -m http.server 8000

# Terminal 2 - Backend Java (si disponible)
cd spells/stack/backends/java
java -jar target/magic-stack-backend-1.0.0-APOLLO.jar --server.port=8082

# Puis ouvrir dans le navigateur :
# http://localhost:8000/REALGAME/pwa-realgame.html
```

## Installation comme app

### Safari (Mac)
1. Ouvrir la PWA dans Safari
2. Menu Safari > Installer l'application
3. L'app apparaît dans Applications

### Chrome
1. Ouvrir la PWA dans Chrome
2. Clic sur l'icône d'installation dans la barre d'adresse
3. Installer

## Fonctionnalités

### Navigation
- **Principal** : Jeux principaux
- **Arcade** : Mini-jeux et expériences
- **Outils** : Dashboard et outils de dev
- **Status** : État des backends

### Fonctionnalités PWA
- ✅ Cache automatique
- ✅ Fonctionne hors ligne
- ✅ Installation comme app
- ✅ Mise à jour automatique
- ✅ Notifications (si configurées)

## Problèmes courants

### Backend pas connecté
- Vérifier que le backend Java tourne sur le port 8082
- Vérifier que le serveur HTTP tourne sur le port 8000

### PWA pas installable
- Vérifier que le manifest.json est accessible
- Vérifier que le service worker est enregistré
- Utiliser HTTPS en production

### Cache pas à jour
- Vider le cache du navigateur
- Recharger la page (Ctrl+F5)

## Structure des fichiers

```
REALGAME/
├── pwa-realgame.html      # Interface PWA principale
├── manifest.json          # Configuration PWA
├── sw.js                 # Service Worker
├── launch-pwa-simple.sh  # Script de lancement
└── README_PWA.md         # Ce guide
```

## Développement

### Modifier l'interface
- Éditer `pwa-realgame.html`
- Recharger la page pour voir les changements

### Modifier le cache
- Éditer `sw.js`
- Incrémenter `CACHE_NAME` pour forcer la mise à jour

### Ajouter des jeux
- Ajouter les liens dans les sections appropriées
- Ajouter les URLs dans `sw.js` (urlsToCache)

## Production

Pour une vraie PWA en production :
1. Héberger sur un serveur HTTPS
2. Configurer le backend sur le même domaine
3. Optimiser les performances
4. Tester sur différents appareils

## Support

Si ça marche pas :
1. Vérifier les logs du navigateur (F12)
2. Vérifier que tous les services tournent
3. Redémarrer les services
4. Vider le cache du navigateur
