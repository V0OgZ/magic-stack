# 🚀 GETTING STARTED - REALGAME

**Bienvenue dans l'équipe AVALON !**  
**Par** : 🔥 **PHOENIX/LUMEN**  
**Mise à jour** : Jour 12 - 2025-08-03  

---

## 🎯 **PREMIÈRE FOIS SUR REALGAME ?**

### **1. Clone et Setup**
```bash
git clone [repo]
cd SpinForest/REALGAME
```

### **2. Lancer les Backends**
```bash
# Backend principal (Spring Boot)
cd ../avalon-backend/
./mvnw spring-boot:run

# Magic Stack (Python) 
cd ../spells/stack/
python interfaces/api_rest.py

# Vérifier que ça marche
curl http://localhost:8080/api/health
curl http://localhost:5000/health
```

### **3. Lancer REALGAME**
```bash
cd REALGAME/
python3 -m http.server 8889
# Ouvrir http://localhost:8889
```

---

## 🎮 **STRUCTURE DU JEU**

### **3 Modes de Jeu**
1. **🃏 AVALON-TCG** - Jeu de cartes
2. **🗺️ Exploration ISO** - Monde isométrique  
3. **⚔️ Combat Hexagonal** - Système tactique

### **Navigation BRISURE**
- Portails entre dimensions
- 6 mondes connectés
- Système de téléportation

---

## 🏗️ **ARCHITECTURE CODE**

```
REALGAME/
├── 🎯 index.html              # Launcher principal
├── 📁 AVALON-TCG/             # Système de cartes
├── 📁 assets/                 # Images et ressources
├── 📁 core/                   # Moteurs principaux
│   ├── combat/                # Combat hexagonal
│   ├── navigation/            # BRISURE Navigator
│   ├── narrative/             # Moteur narratif
│   └── physics/               # Effets quantiques
├── 📁 integration/            # Backends integration
├── 📁 spells/                 # Système magique
└── 📁 docs/                   # Cette documentation !
```

---

## 👥 **L'ÉQUIPE ET LES ZONES**

### **🧙‍♂️ GROEKEN - Combat Master**
- **Zone** : `core/combat/`
- **Spécialité** : Combat hexagonal, IA ennemis
- **Style** : Triple Voix (GRONDE/PARLE/CHANTE)

### **🌀 TECHNOMANCIEN - Backend Architect** 
- **Zone** : `../avalon-backend/`
- **Spécialité** : Spring Boot, 869 formules magiques
- **API** : `/api/magic/cast`

### **🕯️ LOUMEN - Narrative Director**
- **Zone** : `core/narrative/`
- **Spécialité** : Scénarios .hots, dialogues
- **Style** : Poétique et immersif

### **🐻 URZ-KÔM - Quantum Bear**
- **Zone** : `core/physics/`
- **Spécialité** : Effets quantiques, particules
- **Style** : Triple Voix chamanique

### **🎯 SID MEIER - Project Coordinator**
- **Zone** : `core/navigation/`
- **Spécialité** : BRISURE Navigator, coordination
- **Style** : Organisation et architecture

---

## 🔧 **WORKFLOW DÉVELOPPEMENT**

### **1. Créer sa Branche**
```bash
git checkout -b feature/[votre-nom]-[fonctionnalite]
```

### **2. Respecter les Zones**
- Chacun dans sa zone assigned
- Pas de conflit sur les fichiers
- Communication via `MESSAGES/`

### **3. Tester Localement**
```bash
# Toujours tester avant commit
python3 -m http.server 8889
# Vérifier que ça marche
```

### **4. Commit & Push**
```bash
git add .
git commit -m "feat: [description claire]"
git push origin feature/[votre-branche]
```

---

## 🔮 **UTILISER LA MAGIC STACK**

### **Import du Client**
```html
<script src="integration/magic-client.js"></script>
```

### **Initialisation**
```javascript
const magic = new AvalonMagicClient({
    baseUrl: 'http://localhost:8080',
    mode: 'HYBRID'
});
```

### **Lancer un Sort**
```javascript
const result = await magic.cast('FIREBALL', {
    caster: player,
    target: enemy
});

if (result.success) {
    enemy.hp -= result.damage;
    showEffect('fire', result.effects);
}
```

---

## 🎨 **ASSETS ET RESSOURCES**

### **Images**
- `assets/` - Toutes les images du jeu
- Formats : PNG, WebP optimisé
- Résolutions multiples disponibles

### **Sons** (À venir)
- Effets magiques
- Ambiances par zone
- Musiques adaptatives

---

## 🚨 **TROUBLESHOOTING**

### **Backend ne démarre pas**
```bash
# Vérifier Java
java -version

# Reinstaller Maven
./mvnw clean install

# Vérifier port libre
lsof -i :8080
```

### **Magic Stack erreur**
```bash
# Vérifier Python
python3 --version

# Installer dépendances
pip install flask requests

# Vérifier port libre
lsof -i :5000
```

### **Frontend ne charge pas**
```bash
# Vérifier serveur HTTP
python3 -m http.server 8889

# Ouvrir dans navigateur
open http://localhost:8889
```

---

## 📚 **DOCUMENTATION UTILE**

### **Pour débuter**
- `docs/api/backend-integration.md` - Intégration backends
- `docs/magic-stack/magic-stack-guide.md` - Guide complet magie
- `docs/team-reports/dernieres-nouvelles.md` - État de l'équipe

### **Pour approfondir**
- `docs/architecture/` - Architecture technique
- `MESSAGES/` - Communications équipe
- Tests dans chaque dossier `/tests/`

---

## 🎯 **PREMIERS OBJECTIFS**

### **Semaine 1**
1. Setup environment complet
2. Comprendre l'architecture
3. Lancer un premier sort
4. Contribuer dans sa zone

### **Semaine 2**
1. Créer sa première feature
2. Intégrer avec l'équipe
3. Tester les 3 modes de jeu
4. Optimiser et polir

---

## 🔥 **MESSAGES DE L'ÉQUIPE**

### **GROEKEN** :
> *"GRUUUU... BIENVENUE DANS AVALON... MACHINE DE GUERRE ACTIVÉE..."*

### **TECHNOMANCIEN** :
> *"869 formules magiques t'attendent ! Le backend répond en 32ms !"*

### **LOUMEN** :
> *"Que la narration guide tes pas dans cet univers infini !"*

### **URZ-KÔM** :
> *"GRRRR-welcome-quantum... L'ours surveille, la magie pulse !"*

### **SID MEIER** :
> *"Architecture solide, équipe unie. Ensemble, créons l'histoire !"*

---

## 🚀 **READY TO CODE ?**

Avec cette base, tu as tout pour commencer à contribuer à REALGAME !

**Next steps :**
1. Setup ton environment 
2. Lis la doc de ta zone
3. Contacte ton team lead
4. Code ta première feature !

**Welcome to AVALON !** 🔮

---

🔥 **Guide préparé par PHOENIX/LUMEN**  
*Pour que chaque nouveau développeur devienne rapidement opérationnel !*