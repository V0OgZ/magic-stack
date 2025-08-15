# 🔮 API MAGIC STACK - GUIDE DES SORTILÈGES
## Pour les Assistants qui veulent lancer des sorts

**URL de base**: `http://localhost:8080`  
**Status**: ✅ OPÉRATIONNEL  
**869 formules magiques disponibles**

---

## 🚀 DÉMARRAGE RAPIDE

### 1. VÉRIFIER QUE LA MAGIE EST ACTIVE
```bash
curl http://localhost:8080/api/magic/health
```

Réponse attendue:
```json
{
  "status": "MAGICAL",
  "formulas_loaded": 869,
  "temporal_grammar": "ACTIVE",
  "dimensions": 6
}
```

### 2. LANCER UN SORT SIMPLE
```bash
curl -X POST http://localhost:8080/api/magic/cast \
  -H "Content-Type: application/json" \
  -d '{
    "formula": "fire_ball",
    "power": 50,
    "targetX": 10,
    "targetY": 20,
    "targetZ": 0
  }'
```

---

## 📋 ENDPOINTS DISPONIBLES

### 🔥 LANCER UN SORT
**POST** `/api/magic/cast`

Lance un sort magique dans l'espace 6D.

**Body**:
```json
{
  "formula": "fire_ball_temporal",
  "power": 75,
  "targetX": 10.5,
  "targetY": 20.3,
  "targetZ": 0
}
```

**Réponse**:
```json
{
  "spellId": "spell_abc123",
  "success": true,
  "effect": "SPELL_CAST_SUCCESS",
  "position6D": {
    "x": 10.5, "y": 20.3, "z": 0,
    "t": 1735434000, "c": 0.8, "psi": 0.5
  },
  "message": "Formula fire_ball_temporal cast successfully!"
}
```

### 📜 TRADUIRE UNE FORMULE
**POST** `/api/magic/translate`

Traduit une formule en différents formats (literary, runic, iconic).

**Body**:
```json
{
  "formula": "GROFI_001",
  "targetFormat": "runic"
}
```

**Réponse**:
```json
{
  "formula": "GROFI_001",
  "translations": {
    "literary": "Invoke the ancient powers of GROFI_001",
    "runic": "ᚠᚢᚦᚨᚱᚲ GRO",
    "iconic": "🔮✨G⚡"
  },
  "format": "runic"
}
```

### ⏰ DÉCALAGE TEMPOREL
**POST** `/api/magic/shift`

Effectue un décalage temporel sur une position 6D.

**Body**:
```json
{
  "position": {
    "x": 0, "y": 0, "z": 0,
    "t": 1000, "c": 0.5, "psi": 0.5
  },
  "temporalDelta": 100
}
```

### 🌍 FORK DE RÉALITÉ
**POST** `/api/magic/fork`

Crée une nouvelle branche de réalité.

**Body**:
```json
{
  "sourceWorldId": "world_main",
  "forkName": "experiment_001"
}
```

### 🔀 FUSION DE TIMELINES
**POST** `/api/magic/merge`

Fusionne plusieurs timelines.

**Body**:
```json
{
  "worldIds": ["world_1", "world_2"],
  "mergeStrategy": "quantum_collapse"
}
```

### 📚 LISTER TOUTES LES FORMULES
**GET** `/api/magic/formulas`

Retourne les 869 formules disponibles.

### 📍 POSITION D'UNE ENTITÉ
**GET** `/api/magic/position/{entityId}`

Retourne la position 6D d'une entité.

---

## 🌀 SYSTÈME INTERSTICE (Upload/Download 6D)

### UPLOAD UNE ENTITÉ
**POST** `/api/interstice/upload`

Sauvegarde une entité dans l'espace 6D.

**Body**:
```json
{
  "entityId": "ASSISTANT_001",
  "entityData": {
    "name": "Assistant Magique",
    "type": "AI",
    "memories": ["J'ai appris la magie", "Je connais 869 sorts"]
  }
}
```

**Réponse**:
```json
{
  "uploadId": "upload_xyz789",
  "coordinates": {
    "x": 42.5, "y": 13.7, "z": 0,
    "t": 1735434000, "c": 0.5, "psi": 1.0
  },
  "message": "Entity uploaded to Interstice!",
  "worldHash": "AVALON_1735434000"
}
```

### DOWNLOAD UNE ENTITÉ
**POST** `/api/interstice/download`

Récupère une entité depuis l'espace 6D.

**Body**:
```json
{
  "entityId": "ASSISTANT_001"
}
```

### RECHERCHE 6D
**POST** `/api/interstice/search`

Trouve des entités proches dans l'espace 6D.

**Body**:
```json
{
  "center": {
    "x": 0, "y": 0, "z": 0,
    "t": 0, "c": 0.5, "psi": 0.5
  },
  "radius": 10
}
```

---

## 🧙 EXEMPLES PRATIQUES

### Exemple 1: Boule de feu temporelle
```bash
curl -X POST http://localhost:8080/api/magic/cast \
  -H "Content-Type: application/json" \
  -d '{
    "formula": "fire_ball_temporal",
    "power": 100,
    "targetX": 50,
    "targetY": 50,
    "targetZ": 10
  }'
```

### Exemple 2: Sauvegarder ses souvenirs
```bash
curl -X POST http://localhost:8080/api/interstice/upload \
  -H "Content-Type: application/json" \
  -d '{
    "entityId": "CLAUDE_MEMORIES",
    "entityData": {
      "memories": [
        "J'\''ai aidé Vincent avec la Magic Stack",
        "Le système 6D est génial",
        "869 formules disponibles"
      ],
      "timestamp": "'$(date +%s)'"
    }
  }'
```

### Exemple 3: Traduire en runique
```bash
curl -X POST http://localhost:8080/api/magic/translate \
  -H "Content-Type: application/json" \
  -d '{
    "formula": "GROFI_ULTIMATE_BLAST",
    "targetFormat": "runic"
  }'
```

---

## 📊 SYSTÈME 6D EXPLIQUÉ

Les coordonnées 6D:
- **X, Y, Z**: Position spatiale (comme d'habitude)
- **T**: Temps (timestamp Unix)
- **C**: Causalité (0 à 1) - influence sur la réalité
- **Ψ (Psi)**: Dimension quantique/identité (-1 à 1)

### Exemples de valeurs:
- `C = 0`: Aucun impact causal (observation pure)
- `C = 1`: Fort impact causal (modification de réalité)
- `Ψ = -1`: Anti-identité (opposé)
- `Ψ = 0`: Neutre
- `Ψ = 1`: Identité complète

---

## 🐛 TROUBLESHOOTING

### "Connection refused"
Le backend n'est pas lancé. Lancer:
```bash
./LANCE_BACKEND_RESISTANT.sh
```

### "Formula not found"
Vérifier la liste des formules avec:
```bash
curl http://localhost:8080/api/magic/formulas
```

### "Invalid coordinates"
Les coordonnées 6D doivent respecter:
- X, Y, Z: Nombres réels
- T: > 0 (timestamp)
- C: Entre 0 et 1
- Ψ: Entre -1 et 1

---

## 💡 TIPS POUR ASSISTANTS

1. **Toujours vérifier la santé du backend**:
   ```bash
   curl http://localhost:8080/api/magic/health
   ```

2. **Sauvegarder vos états importants** dans l'Interstice

3. **Les 869 formules** sont organisées par type:
   - GROFI: Formules ultimes
   - GRUT: Formules anciennes
   - TEMPORAL: Manipulation du temps
   - RUNIC: Magie runique
   - SIMPLE: Sorts basiques
   - COMPLEX: Sorts avancés

4. **Le système 6D** permet de retrouver des entités même après un reboot

---

## 🚨 IMPORTANT

- Le backend tourne sur le port **8080**
- Ne PAS essayer de le relancer s'il marche déjà
- Les logs sont dans `magic-stack-backend.log`
- PID sauvegardé dans `magic-stack-backend.pid`

---

*"La magie est maintenant à portée d'API!"* - URZ-KÔM