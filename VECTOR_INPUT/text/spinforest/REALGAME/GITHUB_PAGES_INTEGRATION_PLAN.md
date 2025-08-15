# 🌲🌐 PLAN D'INTÉGRATION GITHUB PAGES 

*Pour https://v0ogz.github.io/SpinForest/*

---

## 🎯 **OBJECTIF : DUAL MODE INTELLIGENT**

### **MODE 1 : OFFLINE (Par défaut)**
- Fonctionne sur GitHub Pages
- Pas besoin de backend
- Navigation jour/nuit/crypte
- Stockage local (localStorage)

### **MODE 2 : ONLINE (Si backend détecté)**
- Même interface
- Features avancées activées
- Connexion au TCG
- Sauvegarde cloud

---

## 🔧 **IMPLÉMENTATION TECHNIQUE**

### **1. DÉTECTION BACKEND AUTOMATIQUE**

```javascript
// Dans index.html principal
async function detectBackend() {
    try {
        const response = await fetch('http://localhost:8080/api/health', {
            method: 'GET',
            mode: 'cors',
            timeout: 1000
        });
        
        if (response.ok) {
            console.log('✅ Backend détecté !');
            window.BACKEND_AVAILABLE = true;
            enableOnlineFeatures();
        }
    } catch (e) {
        console.log('📴 Mode offline');
        window.BACKEND_AVAILABLE = false;
    }
}

// Appel au chargement
window.addEventListener('load', detectBackend);
```

### **2. STRUCTURE MISE À JOUR**

```
SpinForest/ (GitHub Pages)
├── index.html          → Page d'accueil améliorée
├── jour.html          → Mode jour
├── nuit.html          → Mode nuit  
├── crypte.html        → Crypte runique
├── portal-avalon.html → Portail vers REALGAME
├── js/
│   ├── backend-detector.js
│   ├── menu-secret.js
│   ├── dual-mode.js
│   └── panopticon-mini.js
└── assets/
    ├── images/
    └── styles/
```

---

## 🎨 **NOUVELLES FEATURES**

### **🔐 MENU SECRET VINCENT**

```javascript
// menu-secret.js
let secretClicks = 0;
let lastClickTime = 0;

document.getElementById('sun-moon').addEventListener('click', (e) => {
    const now = Date.now();
    
    // Reset si trop de temps entre clics
    if (now - lastClickTime > 1000) {
        secretClicks = 0;
    }
    
    secretClicks++;
    lastClickTime = now;
    
    // Triple clic détecté !
    if (secretClicks === 3) {
        showVincentMenu();
        secretClicks = 0;
    }
});

function showVincentMenu() {
    const menu = document.createElement('div');
    menu.className = 'vincent-secret-menu';
    menu.innerHTML = `
        <div class="menu-title">🔮 MENU VINCENT</div>
        <button onclick="goTo('jour')">🌅 Jour</button>
        <button onclick="goTo('nuit')">🌙 Nuit</button>
        <button onclick="goTo('crypte')">🔐 Crypte</button>
        <button onclick="goTo('ours')">🐻 Repaire</button>
        <button onclick="goTo('tcg')">🎴 TCG Arena</button>
        <button onclick="goTo('panopticon')">👁️ Panopticon</button>
        ${window.BACKEND_AVAILABLE ? 
            '<button onclick="goTo("realgame")">🎮 REALGAME</button>' : 
            '<span class="offline">🔌 Backend requis</span>'
        }
    `;
    document.body.appendChild(menu);
}
```

### **📊 MINIMAP PANOPTICON LITE**

```javascript
// panopticon-mini.js
class PanopticonMinimap {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.dimensions = 5;
        this.init();
    }
    
    init() {
        this.canvas.width = 200;
        this.canvas.height = 200;
        this.container.appendChild(this.canvas);
        
        if (window.BACKEND_AVAILABLE) {
            this.loadFromBackend();
        } else {
            this.generateOfflineView();
        }
    }
    
    generateOfflineView() {
        // Vue simplifiée offline
        this.drawGrid();
        this.drawPlayerPosition();
        this.drawFog();
    }
    
    async loadFromBackend() {
        const data = await fetch('http://localhost:8080/api/panopticon/data/current');
        const panopticonData = await data.json();
        this.render5DProjection(panopticonData);
    }
}
```

---

## 🌲 **PAGE D'ACCUEIL AMÉLIORÉE**

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
    <title>🌲 SpinForest - Avalon Gateway</title>
    <style>
        body {
            background: linear-gradient(to bottom, #0a0a0a, #1a1a2e);
            color: #fff;
            font-family: 'Courier New', monospace;
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        
        .forest-entrance {
            text-align: center;
            animation: fadeIn 2s;
        }
        
        .mode-indicator {
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 12px;
        }
        
        .online { background: #4CAF50; }
        .offline { background: #666; }
        
        .vincent-secret-menu {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.95);
            border: 2px solid #ffd700;
            padding: 20px;
            border-radius: 10px;
            z-index: 1000;
        }
        
        .minimap-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 200px;
            height: 200px;
            border: 1px solid #333;
            background: rgba(0, 0, 0, 0.8);
            display: none;
        }
        
        .show-minimap { display: block; }
    </style>
</head>
<body>
    <div class="mode-indicator" id="modeIndicator">
        <span class="offline">📴 Offline</span>
    </div>
    
    <div class="forest-entrance">
        <h1>🌲 SpinForest 🌲</h1>
        <p>Portail vers Avalon</p>
        
        <div class="paths">
            <button onclick="enterForest('jour')">☀️ Chemin de Jour</button>
            <button onclick="enterForest('nuit')">🌙 Chemin de Nuit</button>
        </div>
        
        <div id="sun-moon" style="cursor: pointer; margin-top: 50px;">
            <span style="font-size: 100px;">🌅</span>
        </div>
    </div>
    
    <div class="minimap-container" id="minimapContainer"></div>
    
    <script src="js/backend-detector.js"></script>
    <script src="js/menu-secret.js"></script>
    <script src="js/panopticon-mini.js"></script>
    <script>
        // Initialisation
        window.addEventListener('load', async () => {
            await detectBackend();
            
            if (window.BACKEND_AVAILABLE) {
                document.getElementById('modeIndicator').innerHTML = 
                    '<span class="online">🟢 Online</span>';
                
                // Activer minimap si backend
                const minimap = new PanopticonMinimap(
                    document.getElementById('minimapContainer')
                );
                document.getElementById('minimapContainer').classList.add('show-minimap');
            }
        });
        
        function enterForest(path) {
            window.location.href = path + '.html';
        }
    </script>
</body>
</html>
```

---

## 🚀 **DÉPLOIEMENT**

### **1. MISE À JOUR GITHUB**
```bash
# Dans le repo GitHub
git add .
git commit -m "🌲 Dual mode forest + Vincent secret menu"
git push origin main

# GitHub Pages se met à jour automatiquement
```

### **2. TEST MODES**
- **Sans backend** : Navigation basique
- **Avec backend** : Features complètes

### **3. URL FINALE**
- Public : https://v0ogz.github.io/SpinForest/
- Local : http://localhost:8888/ (avec backend)

---

## 🎯 **RÉSULTAT ATTENDU**

1. **Visiteur normal** : Explore la forêt en mode offline
2. **Vincent (sans backend)** : Menu secret + navigation étendue
3. **Vincent (avec backend)** : TOUT + TCG + Panopticon + REALGAME

**Simple. Élégant. Dual-mode.** ✨