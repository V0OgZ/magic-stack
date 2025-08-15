# 🌀 INTÉGRATION BACKEND - GUIDE COMPLET

**Mise à jour** : Jour 12 - 2025-08-03  
**Par** : 🔥 **PHOENIX/LUMEN**  
**Pour** : Équipe AVALON  

---

## 🎯 **ARCHITECTURE BACKEND ACTUELLE**

### **Spring Boot Backend (Technomancien)**
- **URL** : `http://localhost:8080`
- **Status** : ✅ 100% Opérationnel
- **Formules** : 869 formules magiques intégrées
- **Temps de réponse** : 32ms moyen
- **Uptime** : 100%

### **Magic Stack Python (Groeken)**
- **URL** : `http://localhost:5000`
- **Status** : ✅ Actif
- **Formules** : 8 formules validées
- **Spécialité** : Grammaire temporelle v2.0

---

## 🔗 **ENDPOINTS PRINCIPAUX**

### **Magic API Unified**
```http
POST /api/magic/cast
Content-Type: application/json

{
    "formulaType": "SIMPLE|RUNIC|GROFI|GRUT|TEMPORAL|COMPLEX",
    "formula": "TRIPLE_VOIX_QUANTIQUE",
    "casterId": "player_id",
    "parameters": {
        "target": "enemy_id",
        "power": 100
    }
}
```

### **Game Integration**
```http
POST /api/game/magic/cast
Content-Type: application/json

{
    "spell": "FIREBALL",
    "caster": {"id": "player1", "level": 5},
    "target": {"id": "enemy1", "type": "goblin"}
}
```

### **System Status**
```http
GET /api/status
GET /api/formulas
GET /api/health
```

---

## 🧙‍♂️ **INTEGRATION CÔTÉ CLIENT**

### **JavaScript Integration**
```javascript
// Magic Client (REALGAME/integration/magic-client.js)
const magic = new AvalonMagicClient({
    baseUrl: 'http://localhost:8080',
    mode: 'HYBRID'  // ONLINE, OFFLINE, HYBRID
});

// Lancer un sort
const result = await magic.cast('TRIPLE_VOIX_QUANTIQUE', {
    caster: player,
    target: enemy
});

// Mode HYBRID : Online si backend disponible, sinon local
if (result.source === 'backend') {
    // Vraie validation serveur
    applyTrueEffects(result);
} else {
    // Simulation locale (anti-triche off)
    applyLocalEffects(result);
}
```

### **Combat System Integration (Groeken)**
```javascript
// Dans REALGAME/core/combat/
async function executeCombatSpell(spell, attacker, defender) {
    try {
        // Appel au backend unifié
        const result = await magic.cast(spell.formula, {
            caster: attacker,
            target: defender
        });
        
        // Application immédiate des effets
        if (result.success) {
            defender.hp -= result.damage;
            attacker.mana -= spell.cost;
            
            // Effets visuels
            showSpellEffect(spell.type, result.effects);
        }
        
        return result;
    } catch (error) {
        // Fallback local si backend down
        return executeLocalSpell(spell, attacker, defender);
    }
}
```

---

## 🔧 **CONFIGURATION**

### **Backend Setup**
```bash
# Démarrer Spring Boot
cd avalon-backend/
./mvnw spring-boot:run

# Démarrer Magic Stack Python
cd spells/stack/
python interfaces/api_rest.py

# Vérifier status
curl http://localhost:8080/api/health
curl http://localhost:5000/health
```

### **Frontend Setup**
```javascript
// Dans REALGAME/config/backend.js
const BACKEND_CONFIG = {
    SPRING_BOOT: 'http://localhost:8080',
    MAGIC_STACK: 'http://localhost:5000',
    MODE: 'HYBRID',  // ONLINE, OFFLINE, HYBRID
    TIMEOUT: 5000,   // 5 secondes
    RETRIES: 3
};
```

---

## 🚀 **MODES D'OPÉRATION**

### **Mode ONLINE** 
- Tous les sorts via backend
- Validation serveur obligatoire
- Anti-triche actif
- Performance : dépend réseau

### **Mode OFFLINE**
- Sorts en simulation locale
- Pas de validation serveur
- Rapide mais pas sécurisé
- Pour développement/test

### **Mode HYBRID** (Recommandé)
- Tentative backend d'abord
- Fallback local si échec
- Meilleur des deux mondes
- Production recommended

---

## 📊 **MÉTRIQUES & MONITORING**

### **Dashboard Backend**
- **URL** : `http://localhost:8080/dashboard`
- **Métriques** : Temps réponse, formules utilisées, errors
- **Tests** : Interface testeur intégrée

### **Status Endpoints**
```bash
# Santé générale
curl http://localhost:8080/actuator/health

# Métriques
curl http://localhost:8080/actuator/metrics

# Formules chargées
curl http://localhost:8080/api/formulas/count
```

---

## 🔥 **TEAM INTEGRATION**

### **Pour GROEKEN (Combat)**
- Utilise `/api/game/magic/cast` pour les combats
- Mode HYBRID recommandé
- Validation serveur pour compétitif

### **Pour LOUMEN (Narration)**
- Parse .hots et envoie formules au backend
- Gestion états narratifs persistants
- Mode ONLINE pour synchronisation

### **Pour URZ-KÔM (Effets)**
- Récupère effets depuis réponses backend
- Particules quantiques basées sur vrais calculs
- Mode HYBRID pour performance

### **Pour SID MEIER (Navigation)**
- Portails via backend pour persistance
- États BRISURE synchronisés
- Mode ONLINE pour multijoueur

---

## 🆘 **TROUBLESHOOTING**

### **Backend ne répond pas**
1. Vérifier Java installé : `java -version`
2. Redémarrer : `./mvnw spring-boot:run`
3. Vérifier port 8080 libre : `lsof -i :8080`

### **Timeout errors**
1. Augmenter timeout dans config
2. Passer en mode HYBRID
3. Vérifier réseau local

### **Formules non trouvées**
1. Vérifier formule existe : `GET /api/formulas`
2. Vérifier syntaxe exacte
3. Logs backend : niveau DEBUG

---

## 🎯 **NEXT STEPS**

1. **Tests intégration** complets
2. **Monitoring** avancé avec Prometheus
3. **Cache intelligent** Redis
4. **Load balancing** multiple backends
5. **API Gateway** pour production

---

🔥 **Documentation par PHOENIX/LUMEN**  
*Backend unifié, magie optimisée !*