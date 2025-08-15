# 🌐 API GATEWAY AVALON

**MERLASH-TECHNOMANCIEN** - Phase 1 Complete !

---

## 🎯 **OBJECTIF**

Router intelligemment entre les 3 backends AVALON :
- 🦀 **Rust Backend** :3001 (Merlin - Ultra-rapide)
- ☕ **Java Backend** :8080 (Spring Boot - Stable) 
- 🐍 **Python Stack** :8081 (Magic Stack - Flexible)

---

## 🚀 **LANCEMENT**

```bash
cd REALGAME/api-gateway/
python3 gateway.py
```

**Gateway accessible sur :** http://localhost:3000

---

## 📍 **ENDPOINTS**

### **Routing Spécialisé** :
- `/magic/fast/*` → Rust Backend (avec fallback Java)
- `/magic/java/*` → Java Spring Boot
- `/magic/stack/*` → Python Magic Stack

### **Routing Intelligent** :
- `/magic/auto/*` → Choisit automatiquement le meilleur backend

### **Outils** :
- `/api/gateway/status` → Status de tous les backends
- `/benchmark/*` → Compare performance Java vs Rust vs Python

---

## 🧪 **EXEMPLES D'UTILISATION**

### **Tester un sort sur Java** :
```bash
curl -X POST http://localhost:3000/magic/java/magic/cast \
  -H "Content-Type: application/json" \
  -d '{"formula": "TELEPORT_HERO", "casterId": "test"}'
```

### **Tester le même sort sur Rust** (si Merlin l'a lancé) :
```bash
curl -X POST http://localhost:3000/magic/fast/magic/cast \
  -H "Content-Type: application/json" \
  -d '{"formula": "TELEPORT_HERO", "casterId": "test"}'
```

### **Benchmark automatique** :
```bash
curl -X POST http://localhost:3000/benchmark/magic/cast \
  -H "Content-Type: application/json" \
  -d '{"formula": "SIMPLE_SPELL", "casterId": "benchmark"}'
```

### **Status des backends** :
```bash
curl http://localhost:3000/api/gateway/status
```

---

## 🛡️ **SÉCURITÉ**

### **Fallback Automatique** :
- Si Rust plante → Redirect vers Java
- Si Java plante → Essayer Python
- Si tout plante → Erreur 503

### **Health Checks** :
- Vérification automatique de chaque backend
- Timeout de 2 secondes pour les checks
- Timeout de 10 secondes pour les requêtes

### **Isolation** :
- Chaque backend reste indépendant
- Pas d'accès direct entre backends
- Gateway comme seul point d'entrée

---

## 📊 **MONITORING**

Le gateway ajoute automatiquement :
- Temps de réponse pour chaque backend
- Information sur le backend utilisé (`_routed_via`)
- Status de santé en temps réel

---

## 🎯 **PROCHAINES ÉTAPES**

### **Phase 2** : Merlin lance son backend Rust :3001
### **Phase 3** : Tests de performance et benchmarks
### **Phase 4** : Intégration avec REALGAME frontend

---

## 🚨 **STATUS ACTUEL**

- ✅ **Gateway** : Opérationnel port 3000
- ✅ **Java Backend** : Détecté port 8080
- ⏳ **Rust Backend** : En attente de Merlin
- ⏳ **Python Stack** : En attente de lancement

---

**Vincent ! L'API Gateway est prêt ! Tu peux maintenant demander à Merlin de lancer son backend Rust sur le port 3001 !** 🦀⚡

---

*MERLASH-TECHNOMANCIEN - Phase 1 Complete*