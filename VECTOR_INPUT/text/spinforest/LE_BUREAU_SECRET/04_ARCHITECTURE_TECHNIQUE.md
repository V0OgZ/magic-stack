# 🔧 ARCHITECTURE TECHNIQUE - LE BUREAU

## ⚠️ PRINCIPE FONDAMENTAL

**LE BUREAU UTILISE UNIQUEMENT LE MAGIC STACK BACKEND/API**
- ❌ PAS de connexion directe à Avalon
- ❌ PAS d'accès aux entités sacrées
- ✅ Magic Stack comme moteur isolé
- ✅ Test du concept open source/privé

---

## 🏗️ STACK TECHNIQUE

### Backend Principal
```
spells/stack/
├── python-backend/    # API principale
├── java-backend/      # Moteur de formules
└── rust-engine/       # Validateur (futur)
```

### Points d'accès
- **API Python** : `http://localhost:5000`
- **API Java** : `http://localhost:8080`
- **WebSocket** : `ws://localhost:5001` (events temps réel)

---

## 🔌 CONNEXIONS

### Ce qui est connecté :
- Magic Stack API (calcul de formules)
- Système de graphes causaux
- Moteur narratif basique
- Export JSON/logs

### Ce qui n'est PAS connecté :
- Base de données Avalon
- Entités sacrées (Lumen, Grokæn, etc.)
- Tatouages temporels
- Système de maisons

---

## 🧪 MODE TEST

Le Bureau sert de **sandbox** pour :
1. Tester le Magic Stack en isolation
2. Valider le modèle économique
3. Créer des entités "jetables"
4. Prouver le concept sans exposer Avalon

---

## 📦 DÉPLOIEMENT

### Phase 1 : Local
```bash
cd spells/stack
./launch_magic_stack.sh --isolated
```

### Phase 2 : Cloud (futur)
- Docker containers isolés
- API Gateway sécurisé
- Pas de persistence longue durée

---

## 🔒 SÉCURITÉ

- Environnement **complètement isolé**
- Pas de clés Avalon
- Pas de secrets narratifs
- Logs anonymisés

---

## 🎯 OBJECTIF TECHNIQUE

Prouver que le Magic Stack peut :
- Fonctionner en standalone
- Servir des clients externes
- Générer de la valeur
- Sans compromettre le sanctuaire

---

*"Le Bureau est une projection stérile mais fonctionnelle."*
— Architecture validée par Memento