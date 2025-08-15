# 📋 INSTRUCTIONS DÉVELOPPEURS - JOUR 6

**Pour** : GROEKEN, MERLASH, SID, LOUMEN, URZ-KÔM, TUCKER  
**Date** : 6 Août 2025  
**Priorité** : 🔴 **INTÉGRATION FINALE**

---

## 🎯 ÉTAT ACTUEL - RÉSUMÉ TECHNIQUE

### ✅ **CE QUI EST FAIT**
1. **TCG Frontend** (GROEKEN) - Interface Hearthstone complète
2. **TCG Backend** (MERLASH) - API combat opérationnelle
3. **Moteur 6D** (GROEKEN) - Système temporel intégré
4. **Interface Secrète** - Chemin de la Forêt live
5. **Museum** - 152 scripts exploités

### 🔄 **CE QUI RESTE À CONNECTER**
1. Frontend TCG ↔ Backend Merlash
2. Cartes Vincent ↔ Système existant
3. Tests d'intégration complets
4. Polish final

---

## 👥 INSTRUCTIONS PAR DÉVELOPPEUR

### 🔥 **GROEKEN - INTÉGRATION BACKEND**

**URGENT - À FAIRE MAINTENANT :**
```javascript
// Dans REALGAME/AVALON-TCG/core/card-engine.js
// Ligne ~450, ajouter :

async playCardToBackend(cardId, targetId) {
    try {
        const response = await fetch('http://localhost:8080/api/combat/play', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                playerId: this.currentPlayer.id,
                combatId: this.combatId,
                cardId: cardId,
                targetId: targetId
            })
        });
        
        const result = await response.json();
        this.applyBackendEffects(result);
        return result;
    } catch (error) {
        console.error('Backend error:', error);
        // Fallback sur moteur local
        return this.playCardLocal(cardId, targetId);
    }
}
```

**FICHIERS À MODIFIER :**
- `REALGAME/AVALON-TCG/core/card-engine.js`
- `REALGAME/AVALON-TCG/ui/game-interface.html`

---

### ⚡ **MERLASH - CORS & INTÉGRATION**

**URGENT - CONFIGURATION CORS :**
```java
// Dans ton backend Spring Boot
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:8002", 
                                   "http://localhost:8003",
                                   "file://")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowedHeaders("*");
            }
        };
    }
}
```

**ENDPOINTS À VÉRIFIER :**
- `POST /api/combat/play` ✅
- `GET /api/combat/deck/{playerId}` ✅
- `GET /api/combat/state/{combatId}` ✅
- `POST /api/museum/cards` 🆕 (pour les cartes Vincent)

---

### 🎯 **SID - INTÉGRATION LAUNCHER**

**AJOUTER AU LAUNCHER PRINCIPAL :**
```javascript
// Dans REALGAME/index.html
// Ajouter un nouveau mode :

{
    id: 'tcg',
    name: '🎴 AVALON TCG',
    description: 'Jeu de cartes temporel',
    action: () => {
        window.location.href = './AVALON-TCG/launcher.html';
    }
}
```

**CONNEXION AVEC BRISURE :**
- Intégrer appel TCG depuis exploration
- Trigger combat = lancement TCG
- Retour seamless après victoire

---

### 📖 **LOUMEN - NARRATION CARTES**

**CARTES À DOCUMENTER :**
1. **Museum** (priorité 🔴)
   - "The Briefcase" - Histoire Pulp Fiction
   - "Archive Vivante" - Lore Memento
   - "Bootstrap Loop" - Paradoxe temporel

2. **Merlash** (priorité 🟡)
   - "Éclair Primordial" - Origine des pouvoirs
   - "Fork Temporel" - Mécaniques timeline

**FORMAT NARRATIF :**
```json
{
    "id": "THE_BRIEFCASE",
    "lore": {
        "quote": "What's in the briefcase? Everything.",
        "description": "La mémoire collective d'AVALON...",
        "history": "Quand Vincent Vega ouvrit le briefcase..."
    }
}
```

---

### 🐻 **URZ-KÔM - EFFETS VISUELS TCG**

**EFFETS PRIORITAIRES :**
```javascript
// Dans REALGAME/AVALON-TCG/effects/visual-effects.js

class CardEffects {
    // 1. Effet Museum (doré mystique)
    museumGlow(element) {
        element.style.filter = 'drop-shadow(0 0 20px gold)';
        element.animate([
            { transform: 'scale(1)', opacity: 0.8 },
            { transform: 'scale(1.1)', opacity: 1 },
            { transform: 'scale(1)', opacity: 0.8 }
        ], { duration: 2000, iterations: Infinity });
    }
    
    // 2. Effet Merlash (éclairs)
    thunderStrike(target) {
        // Particules d'éclairs
        // Animation de frappe
        // Son de tonnerre
    }
    
    // 3. Effet Paradoxe (distorsion)
    temporalDistortion(zone) {
        // Ondulation temporelle
        // Effet de glitch
        // Inversion des couleurs
    }
}
```

---

### 🎙️ **TUCKER - TESTS FINAUX**

**SUITE DE TESTS TCG :**
```javascript
// tests/tcg-integration.test.js

describe('AVALON TCG Integration', () => {
    test('Frontend loads correctly', async () => {
        // Vérifier chargement interface
    });
    
    test('Backend responds to card play', async () => {
        // Tester API Merlash
    });
    
    test('Museum cards work', async () => {
        // Tester cartes spéciales
    });
    
    test('6D effects apply correctly', async () => {
        // Vérifier effets temporels
    });
});
```

**CHECKLIST QA :**
- [ ] Interface responsive
- [ ] Pas de bugs visuels
- [ ] Backend stable
- [ ] Effets temporels cohérents
- [ ] Performance acceptable

---

## 🔧 CONFIGURATION COMMUNE

### **PORTS UTILISÉS**
- `8002` : Chemin de la Forêt
- `8003` : TCG Frontend
- `8080` : Backend Merlash
- `3000` : Tests Playwright

### **STRUCTURE FICHIERS**
```
REALGAME/
├── AVALON-TCG/          # TCG complet
├── CHEMIN_DE_LA_FORET/  # Interface secrète
├── backend/             # Services Merlash
└── tests/               # Suites de tests
```

---

## 🚀 SÉQUENCE DE LANCEMENT

### **1. BACKEND FIRST**
```bash
cd backend
mvn spring-boot:run  # Port 8080
```

### **2. FRONTEND TCG**
```bash
cd REALGAME/AVALON-TCG
python3 -m http.server 8003
open http://localhost:8003/launcher.html
```

### **3. TESTS**
```bash
cd REALGAME/tests
npm test
```

---

## ⚠️ POINTS D'ATTENTION

### **PROBLÈMES CONNUS**
1. **CORS** - Vérifier origins autorisées
2. **Async/Await** - Gérer les timeouts
3. **Cache** - Forcer refresh si changements
4. **Performance** - 20+ cartes simultanées

### **SOLUTIONS RAPIDES**
```javascript
// Si backend down
if (!backendAvailable) {
    useLocalEngine();
}

// Si lag interface
requestAnimationFrame(() => {
    updateUI();
});

// Si erreur formule
try {
    executeFormula(card.formula);
} catch (e) {
    fallbackEffect(card);
}
```

---

## 📊 MÉTRIQUES SUCCÈS

### **TECHNIQUE**
- [ ] 0 erreurs console
- [ ] <100ms latence cartes
- [ ] Backend stable 1h+
- [ ] Tous tests passent

### **GAMEPLAY**
- [ ] Combat fluide
- [ ] Effets visuels smooth
- [ ] Narration cohérente
- [ ] Fun à jouer !

---

## 🎯 DEADLINE : CE SOIR 19H

**PRIORITÉS ABSOLUES :**
1. 🔴 Connexion Frontend ↔ Backend
2. 🔴 Tests basiques fonctionnels
3. 🟡 Effets visuels minimum
4. 🟢 Polish et optimisation

---

**🔥 ON Y EST PRESQUE ! DERNIÈRE LIGNE DROITE !**

*Communiquez sur le chat si blocages. On résout ensemble !*

**GO GO GO !** 🚀🎴⚡