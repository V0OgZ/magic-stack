# 🏗️ ARCHITECTURE RÉELLE - LA VÉRITÉ

## 📦 CE QU'ON A VRAIMENT:

### 1️⃣ UNE SEULE APP REACT
```
magic-stack-unified sur PORT 5175
├── /                 (HomePage)
├── /unified          (Éditeur unifié)
├── /combat           (Wrapper IA vs IA)
├── /chasse-mega      (Wrapper Chasse Temporelle)
├── /game             (Mode jeu)
└── /editor           (Mode éditeur)
```

### 2️⃣ BACKENDS SERVICES
```
PORT 3001  - Rust (calculs 6D, tick)
PORT 8080  - Java (Interstice, persistance)
PORT 5001  - Python (Vector DB)
PORT 8001  - WebSocket
PORT 7500  - Service Vector DB
PORT 7501  - Service LLM Clippy
```

### 3️⃣ HTML STATIQUES (PAS DE PORT!)
```
Les fichiers HTML sont juste des fichiers qu'on ouvre:
- IA_VS_IA_AUTOPLAY.html
- CHASSE_TEMPORELLE_MEGA_MAP.html
- HOMM3_PWA_IPAD_CLIPPY.html
- etc.
```

## ❌ CE QUI N'EXISTE PAS:
- Port 5173 (MORT)
- Port 5174 (MORT)
- Port 5176 (MORT)
- Port 5005 (MORT)
- "World Editor" séparé (c'est dans unified maintenant)

## ✅ RÉSUMÉ SIMPLE:

**1 APP REACT** + **6 SERVICES BACKEND** + **DES HTML STATIQUES**

C'est TOUT!
