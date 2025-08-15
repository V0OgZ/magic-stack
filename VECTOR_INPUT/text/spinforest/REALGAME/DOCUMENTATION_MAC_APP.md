# Documentation Heroes of Time - Application Mac

## Introduction
Heroes of Time pour Mac est une version packagée du jeu qui facilite le lancement et la connexion au serveur Magic Stack. Cette application permet aux utilisateurs Mac de jouer au jeu sans avoir à configurer manuellement les serveurs.

## Architecture technique
L'application se compose de plusieurs éléments:

### 1. Structure de l'application Mac
```
Heroes of Time.app/
├── Contents/
│   ├── Info.plist         # Métadonnées de l'application
│   ├── MacOS/
│   │   └── HeroesOfTime   # Script exécutable principal
│   ├── PkgInfo            # Type d'application
│   └── Resources/         # Ressources de l'application
```

### 2. Backend Java (Magic Stack)
- Port: 8082
- Fonctionnalités:
  - API principale pour les formules magiques
  - Système d'interstice
  - Gestion des entités 6D

### 3. Backend Rust (Optionnel)
- Port: 3001
- Fonctionnalités:
  - Traitement haute performance
  - Moteur Q-Star
  - Grammaire temporelle

### 4. Frontend Web
- Port: 8000
- Fonctionnalités:
  - Interface utilisateur HTML/CSS/JS
  - Communication avec les backends via API

## Flux de données
```
┌────────────────┐     HTTP     ┌─────────────┐
│  Navigateur    │◄────────────►│  Frontend   │
│  (Interface)   │     8000     │  (Python)   │
└────────────────┘              └──────┬──────┘
        ▲                              │
        │                              ▼
        │                      ┌───────────────┐
        │          8082        │ Backend Java  │
        └───────────────────►  │ (Magic Stack) │
        │                      └───────┬───────┘
        │                              │
        │                              ▼
        │                      ┌───────────────┐
        │          3001        │ Backend Rust  │
        └───────────────────►  │ (Optionnel)   │
                              └───────────────┘
```

## Guide d'installation

### Prérequis
- macOS 10.14 ou supérieur
- Java Runtime Environment 11+
- Python 3.8+
- Navigateur moderne (Chrome/Safari/Firefox)
- 500 Mo d'espace disque libre

### Installation
1. Monter l'image disque HeroesOfTime-1.0.0-Mac.dmg
2. Glisser l'application "Heroes of Time" vers le dossier Applications
3. Éjecter l'image disque

### Premier lancement
1. Ouvrir l'application depuis le Launchpad ou le dossier Applications
2. Si macOS affiche une alerte de sécurité:
   - Ouvrir les Préférences Système > Sécurité et confidentialité
   - Cliquer sur "Ouvrir quand même" pour autoriser l'application
3. L'application démarrera automatiquement les serveurs et ouvrira le navigateur

## Modes de jeu disponibles

### 1. La Chasse Temporelle (Nouveau!)
- Mode multijoueur asymétrique (2 chasseurs vs 6 proies)
- Capacités temporelles: gel temporel, déphasage, retour dans le temps
- Accessible depuis: `/maps/CHASSE_TEMPORELLE.html`

### 2. TCG Combat
- Combat de cartes stratégique avec 869 formules magiques
- Style Hearthstone avec mécaniques temporelles
- Accessible depuis: `/AVALON-TCG/launcher.html`

### 3. Exploration ISO
- Carte hexagonale style Heroes 3
- Brouillard de causalité, portails temporels, ressources
- Accessible depuis: `/worlds/frontiere_feu_foi/FrontiereFeuFoi.html`

### 4. Meta Surcarte
- Vue d'ensemble du multivers
- Navigation entre les dimensions
- Accessible depuis: `/maps/main/MetaSurcarte-v2.html`

### 5. Panopticon 6D
- Visualisation 6D complète
- Exploration des dimensions: X, Y, Z, Temps, Causalité, Conscience
- Accessible depuis: `/assets/panopticon-6d-grut.html`

## Guide de dépannage

### Problèmes de lancement
Si l'application ne démarre pas correctement:
```bash
# Lancer manuellement depuis le terminal
cd /Applications/Heroes\ of\ Time.app/Contents/Resources/Support
./LANCE_MAC_APP.sh
```

### Serveurs déjà en cours d'exécution
Si vous recevez des erreurs indiquant que les ports sont déjà utilisés:
```bash
# Arrêter tous les services
cd /Applications/Heroes\ of\ Time.app/Contents/Resources/Support
./STOP_MAC_APP.sh
```

### Problèmes de connexion API
L'application utilise un système de fallback automatique entre les backends:
1. Elle essaie d'abord Java (port 8082)
2. Puis Rust (port 3001)
3. Et enfin le router Python (port 5000)

Si aucun backend n'est disponible, vérifiez le fichier de log:
```bash
cat ~/Library/Logs/HeroesOfTime/api-connection.log
```

## Configuration avancée

### Modification du fichier api-config-mac.js
Vous pouvez modifier l'ordre de priorité des backends:
```javascript
// Fichier: /Applications/Heroes of Time.app/Contents/Resources/Support/api-config-mac.js
FALLBACK_URLS: [
    'http://localhost:8082', // Java (prioritaire)
    'http://localhost:3001', // Rust (secondaire)
    'http://localhost:5000'  // Router Python (tertiaire)
]
```

### Connexion à un serveur distant
Pour connecter l'application à un serveur distant:
1. Ouvrez le fichier `api-config-mac.js`
2. Ajoutez l'URL du serveur distant à la liste des `FALLBACK_URLS`
3. Redémarrez l'application

## Intégration Magic Stack

L'application Mac communique avec le backend Magic Stack via des requêtes API REST. Les principaux endpoints sont:

| Endpoint | Description | Méthode |
|----------|-------------|---------|
| `/api/interstice/status` | Vérifier le statut du serveur | GET |
| `/api/magic/cast` | Lancer une formule magique | POST |
| `/api/magic/formulas` | Récupérer toutes les formules disponibles | GET |
| `/api/magic/history` | Historique des formules lancées | GET |
| `/api/mage/self-update` | Mise à jour automatique des mages | POST |

## Notes de développement

Pour les développeurs souhaitant contribuer à l'application Mac:

1. Le code source est maintenu sur la branche `mac-app-version`
2. Les modifications principales sont:
   - Scripts de lancement optimisés pour Mac
   - Configuration API avec fallback automatique
   - Structure d'application Mac standard
   - Scripts d'empaquetage pour distribution

## Crédits
- Développé par Vincent et les Mages d'AVALON
- Magic Stack: 869 formules magiques
- Vision 6D: GRUT
- Backend: URZ-KÔM
- Conception du jeu: SID MEIER
- Documentation: LUMEN

---

*© 2026 Vincent et les Mages d'AVALON - Tous droits réservés*
