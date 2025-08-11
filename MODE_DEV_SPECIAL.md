# 🚀 MODE DEV SPÉCIAL - BACKEND GÈRE TOUT

## 🎯 CONCEPT : 1 BACKEND, 1 FRONTEND SIMPLE

```
MODE DEV SPÉCIAL:
┌──────────────────────────────────────┐
│          BACKEND (magic-stack)        │
│  ┌────────────────────────────────┐  │
│  │ Java 8080 + Rust 3001          │  │
│  │ Vector DB 7000 + LLM 7001      │  │
│  │ Static Server 5002 (pour PWA)  │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
                    ▼
         FRONTEND DUMB (PWA statique)
         Juste des fichiers HTML/JS
```

## ✅ AVANTAGES MODE DEV

1. **UN SEUL ENDROIT** - Backend lance TOUT
2. **FRONTEND SIMPLE** - Juste HTML/JS/CSS statique
3. **PAS DE BUILD** - Direct dans le navigateur
4. **PAS DE NODE** - Pas de npm, webpack, etc.
5. **OFFLINE CAPABLE** - PWA fonctionne hors ligne

## 📦 STRUCTURE MODE DEV

### Backend (lance tout)
```bash
/Volumes/HOT_DEV/Magic/magic-stack/
├── DEV_MODE/
│   ├── start_all.sh         # Lance TOUT
│   ├── services/
│   │   ├── vector_db.py     # Port 7000
│   │   └── llm_clippy.py    # Port 7001
│   ├── static_server.py     # Sert le frontend (5002)
│   └── config.yaml          # Toute la config
```

### Frontend (dumb PWA)
```bash
/Volumes/HOT_DEV/Main/SpinForest/REALGAME/
├── PWA_MODE/
│   ├── index.html          # Point d'entrée
│   ├── manifest.json       # PWA manifest
│   ├── sw.js              # Service Worker
│   ├── app.js             # Logique simple
│   └── style.css          # Styles
```

## 🔧 SCRIPT BACKEND QUI LANCE TOUT

```python
# DEV_MODE/start_all.py
import subprocess
import time
import os

class DevModeManager:
    def __init__(self):
        self.processes = []
    
    def start_all(self):
        print("🚀 MODE DEV - BACKEND LANCE TOUT")
        
        # 1. Vector DB
        print("▶ Vector DB (7000)...")
        p1 = subprocess.Popen([
            "python3", "services/vector_db.py"
        ])
        self.processes.append(p1)
        
        # 2. LLM Clippy
        print("▶ LLM Clippy (7001)...")
        p2 = subprocess.Popen([
            "python3", "services/llm_clippy.py"
        ])
        self.processes.append(p2)
        
        # 3. Java Backend
        print("▶ Java Spring (8080)...")
        os.chdir("backends/java")
        p3 = subprocess.Popen([
            "mvn", "spring-boot:run"
        ])
        self.processes.append(p3)
        os.chdir("../..")
        
        # 4. Rust Orchestrator
        print("▶ Rust (3001)...")
        os.chdir("backends/rust")
        p4 = subprocess.Popen([
            "cargo", "run", "--release"
        ])
        self.processes.append(p4)
        os.chdir("../..")
        
        # 5. Static Server pour PWA
        print("▶ Static Server (5002)...")
        p5 = subprocess.Popen([
            "python3", "-m", "http.server", "5002",
            "--directory", "/Volumes/HOT_DEV/Main/SpinForest/REALGAME/PWA_MODE"
        ])
        self.processes.append(p5)
        
        print("✅ TOUT EST LANCÉ!")
        print("📱 PWA: http://localhost:5002")
        print("🔌 APIs: 8080, 3001, 7000, 7001")
        
        # Garder vivant
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            self.stop_all()
    
    def stop_all(self):
        print("🛑 Arrêt de tout...")
        for p in self.processes:
            p.terminate()
        print("✅ Arrêté")

if __name__ == "__main__":
    manager = DevModeManager()
    manager.start_all()
```

## 🌐 FRONTEND PWA MINIMAL

```html
<!-- PWA_MODE/index.html -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="manifest" href="manifest.json">
    <title>Heroes of Time - PWA Mode</title>
    <style>
        body { font-family: system-ui; padding: 20px; }
        .status { padding: 10px; margin: 10px 0; border-radius: 5px; }
        .online { background: #d4edda; }
        .offline { background: #f8d7da; }
    </style>
</head>
<body>
    <h1>🎮 Heroes of Time - Mode DEV</h1>
    
    <div id="status" class="status">
        Vérification services...
    </div>
    
    <div id="services">
        <h3>Services Backend:</h3>
        <ul>
            <li>Java API: <span id="java">...</span></li>
            <li>Rust Orchestrator: <span id="rust">...</span></li>
            <li>Vector DB: <span id="vector">...</span></li>
            <li>LLM Clippy: <span id="llm">...</span></li>
        </ul>
    </div>
    
    <button onclick="testAll()">Tester Tout</button>
    
    <script>
        // PWA simple qui appelle le backend
        async function checkService(url, elementId) {
            try {
                const response = await fetch(url);
                document.getElementById(elementId).textContent = '✅ OK';
                return true;
            } catch {
                document.getElementById(elementId).textContent = '❌ DOWN';
                return false;
            }
        }
        
        async function testAll() {
            const services = [
                ['http://localhost:8080/actuator/health', 'java'],
                ['http://localhost:3001/health', 'rust'],
                ['http://localhost:7000/health', 'vector'],
                ['http://localhost:7001/health', 'llm']
            ];
            
            let allOk = true;
            for (const [url, id] of services) {
                const ok = await checkService(url, id);
                allOk = allOk && ok;
            }
            
            const status = document.getElementById('status');
            if (allOk) {
                status.className = 'status online';
                status.textContent = '✅ Tous les services sont actifs!';
            } else {
                status.className = 'status offline';
                status.textContent = '⚠️ Certains services sont down';
            }
        }
        
        // Service Worker pour PWA
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js');
        }
        
        // Test au chargement
        window.onload = testAll;
    </script>
</body>
</html>
```

## 🎮 COMMANDE UNIQUE MODE DEV

```bash
# Dans magic-stack (backend)
./h dev-mode

# Ça lance:
# - Vector DB (7000)
# - LLM Clippy (7001)  
# - Java Backend (8080)
# - Rust Orchestrator (3001)
# - Static Server PWA (5002)

# Frontend = juste ouvrir http://localhost:5002
```

## ✅ RÉSUMÉ MODE DEV SPÉCIAL

**Backend (magic-stack):**
- Lance TOUS les services
- Gère Vector DB + LLM
- Sert le frontend statique
- Un seul endroit, une commande

**Frontend (SpinForest):**
- Mode "dumb" PWA
- Pas de build, pas de npm
- Juste HTML/JS/CSS
- Appelle les APIs backend

**Avantages:**
- ✅ Super simple
- ✅ Pas de conflits
- ✅ Un seul process manager
- ✅ Frontend peut crasher sans impact
- ✅ Mode offline PWA

**Vincent, ça te va comme mode DEV ?**
