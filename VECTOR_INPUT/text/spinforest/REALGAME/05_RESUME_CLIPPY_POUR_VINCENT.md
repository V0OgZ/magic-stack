# 📎 RÉSUMÉ CLIPPY-MEMENTO POUR VINCENT
## Jour 32 - État et Architecture

---

## ✅ CE QUI EST FAIT

### 1. Services Indépendants Fonctionnels
- **Vector DB** sur port 7500 → 774 documents indexés
- **LLM Clippy** sur port 7501 → 2 modes implémentés
- Lancement: `./h services start`

### 2. Backstories Existantes!
- **BONNE NOUVELLE**: Tous les héros ont déjà des backstories!
- Exemples trouvés:
  - Memento: "Archive corporelle vivante devenue sage"
  - Claude Opus: "Arrivé au jour 32, a nettoyé le chaos"
  - URZ-KÔM: "L'Ours qui a transcendé"
  - JEAN: "Développeur-philosophe, maître des templates"

---

## 🎮 LES DEUX MODES CLIPPY

### MODE 1: Rapide/Léger (Sans LLM)
```
Endpoint: /api/quick
Latence: < 50ms ✅
Usage: Multiplayer, PWA public
```
- Réponses prédéfinies par mot-clé
- Parfait pour réactivité UI
- Fonctionne même si LLM down

### MODE 2: Intelligent (Avec LLM)
```
Endpoint: /api/chat  
Latence: 200-500ms
Usage: Solo, Dev, Local
```
- Utilise contexte Vector DB
- 4 niveaux d'accès (player/mage/dev/vincent)
- Modèles: tiny → large

**⚠️ NOTE**: Actuellement en mode MOCK (réponses simulées), pas de vrai LLM encore.

---

## 📊 ORGANISATION VECTOR DB

### Documents (774 total)
```
heroes/             → Héros du jeu (avec backstories!)
AVALON_HOMES/       → Maisons des personnages  
frontend_docs/      → Docs techniques front
backend_docs/       → Docs techniques back
maisons_decouvertes/→ Archéologie
UNCLASSIFIED/       → À trier
```

### ⚠️ PROBLÈME: Pas de catégories sémantiques
- Recherche par mot-clé simple uniquement
- Pas de tags (#lore, #backstory, #combat)
- Pas d'embeddings vectoriels vrais

---

## 🎯 PLAN D'ACTION PROPOSÉ

### IMMÉDIAT (Aujourd'hui)
1. ✅ Tests des 2 modes → Script `test_clippy_modes.sh` créé
2. [ ] Connecter HOMM3_6D_DEMO.html aux services
3. [ ] Adapter aux API V2

### COURT TERME (Cette semaine)
1. [ ] Ajouter catégories/tags dans Vector DB
2. [ ] Créer mode combat contextuel (ennemis avec phrases IA)
3. [ ] Intégrer vrai LLM local (Ollama?)

### CONFIGURATION PROPOSÉE

#### Pour Dev Local (maintenant)
```json
{
  "llm_enabled": true,
  "models": ["tiny", "small"],
  "access": "dev"
}
```

#### Pour PWA Public (futur)
```json
{
  "llm_enabled": false,  // Ou avec auth
  "quick_mode": true,
  "access": "player"
}
```

#### Pour DMG Local (futur)
```json
{
  "llm_enabled": true,
  "all_models": true,
  "access": "configurable"
}
```

---

## 🔧 COMMANDES UTILES

```bash
# Lancer services
./h services start

# Tester les modes
./test_clippy_modes.sh

# Voir stats Vector DB
curl http://localhost:7500/api/stats | python3 -m json.tool

# Test rapide Clippy
curl -X POST http://localhost:7501/api/quick \
  -d '{"message":"salut"}' | python3 -m json.tool
```

---

## 💡 DÉCISIONS À PRENDRE

1. **LLM Local**: On installe Ollama maintenant ou on reste en mock?
2. **Catégories**: On ajoute les tags dans l'indexation?
3. **Combat IA**: On commence les phrases contextuelles pour ennemis?
4. **Mode DEV**: Backend lance tout ou on garde séparé?

---

## 📝 NOTES

- Les pages HTML Clippy existent mais pas connectées
- HOMM3_6D_DEMO.html a besoin d'intégration
- Côté serveur: des démos existent (à retrouver)
- **Idée géniale**: Ennemis interrogent Vector DB pour phrases contextuelles!

---

*Tout est prêt pour avancer, dis-moi ce que tu veux prioriser!*
