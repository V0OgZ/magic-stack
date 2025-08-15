# 🔮 AVALON MAGIC API - Documentation Publique

**Version** : 1.0.0  
**Port** : 8080  
**Créé par** : Merlash-Technomancien ⚡

---

## 🌟 **INTRODUCTION**

L'API Magic d'AVALON expose 869 formules magiques au monde. Chaque formule peut être lancée via une simple requête HTTP, permettant d'intégrer la magie d'AVALON dans n'importe quel projet !

---

## 🚀 **DÉMARRAGE RAPIDE**

### Installation locale :
```bash
# Cloner le repo
git clone https://github.com/avalon/magic-api

# Lancer le backend
cd avalon-magic-api
python3 BACKEND_WALTER_V3_MAGIC_FORMULAS.py
```

### Premier sort :
```bash
curl -X POST http://localhost:8080/api/magic/cast \
  -H "Content-Type: application/json" \
  -d '{"formula": "TRIPLE_VOIX_QUANTIQUE", "target": "enemy"}'
```

---

## 📚 **ENDPOINTS DISPONIBLES**

### 🏠 **GET /** - Page d'accueil
Interface web interactive pour tester les formules

### ❤️ **GET /health** - Santé du serveur
```json
{
  "status": "healthy",
  "formulas_loaded": 869,
  "uptime": 1234567
}
```

### 📖 **GET /api/magic/formulas** - Liste des formules
Retourne toutes les formules disponibles avec leurs détails

### ⚡ **POST /api/magic/cast** - Lancer un sort
```json
// Request
{
  "formula": "ECHO_TEMPOREL",
  "target": "self",
  "context": {
    "mana": 100,
    "position": [10, 20]
  }
}

// Response
{
  "success": true,
  "result": {
    "damage": 0,
    "heal": 20,
    "effects": ["TEMPORAL_SHIELD"],
    "mana_consumed": 50
  }
}
```

---

## 🎮 **EXEMPLES DE FORMULES**

### ⚔️ **Formules d'Attaque**
- `TRIPLE_VOIX_QUANTIQUE` - Dégâts + Confusion (40 dmg, 30 mana)
- `FRAPPE_SISMIQUE` - Dégâts de zone (60 dmg, 45 mana)
- `LANCE_TEMPORELLE` - Perce les défenses (55 dmg, 40 mana)

### 💚 **Formules de Soin**
- `ECHO_TEMPOREL` - Soin + Bouclier (20 heal, 50 mana)
- `REGENERATION_FRACTALE` - Soin sur durée (15 heal/tour, 35 mana)
- `BENEDICTION_GROFI` - Soin de groupe (30 heal, 60 mana)

### 🛡️ **Formules de Protection**
- `BOUCLIER_QUANTIQUE` - Absorbe 50 dégâts (40 mana)
- `DISTORSION_TEMPORELLE` - Esquive 3 attaques (45 mana)
- `SANCTUAIRE_FORESTIER` - Immunité 2 tours (80 mana)

---

## 🔧 **INTÉGRATION**

### JavaScript/Node.js :
```javascript
const MagicAPI = require('avalon-magic-api');

const magic = new MagicAPI('http://localhost:8080');

// Lancer un sort
const result = await magic.cast('TRIPLE_VOIX_QUANTIQUE', {
  target: 'enemy_1',
  context: { mana: 100 }
});
```

### Python :
```python
import requests

# Lancer un sort
response = requests.post('http://localhost:8080/api/magic/cast', 
  json={
    'formula': 'ECHO_TEMPOREL',
    'target': 'self'
  }
)

result = response.json()
```

### Unity/C# :
```csharp
using AvalonMagicAPI;

var magic = new MagicClient("http://localhost:8080");
var result = await magic.CastSpell("FRAPPE_SISMIQUE", "enemy");
```

---

## 🐳 **DOCKER**

```bash
# Lancer avec Docker
docker run -p 8080:8080 avalon/magic-api

# Docker Compose
docker-compose up -d
```

---

## 📊 **LIMITES ET QUOTAS**

- **Rate limit** : 100 requêtes/minute
- **Taille max context** : 10KB
- **Timeout** : 30 secondes
- **Formules simultanées** : 10 max

---

## 🔒 **SÉCURITÉ**

- **CORS** : Activé pour tous les domaines
- **Validation** : Toutes les entrées sont validées
- **Sanitization** : Protection contre injections
- **Logs** : Tous les sorts sont tracés

---

## 🌟 **FONCTIONNALITÉS AVANCÉES**

### Combos de formules :
```json
{
  "combo": [
    {"formula": "DISTORSION_TEMPORELLE"},
    {"formula": "FRAPPE_SISMIQUE", "delay": 1000},
    {"formula": "LANCE_TEMPORELLE", "delay": 2000}
  ]
}
```

### Sorts personnalisés :
```json
{
  "custom_formula": {
    "name": "MON_SORT_CUSTOM",
    "components": ["FIRE", "TIME", "QUANTUM"],
    "power": 75
  }
}
```

---

## 🆘 **SUPPORT**

- **GitHub** : github.com/avalon/magic-api/issues
- **Discord** : discord.gg/avalon-magic
- **Email** : technomancien@avalon.magic

---

## 📜 **LICENCE**

MIT License - Utilisez la magie d'AVALON librement !

---

*⚡ Créé avec amour par Merlash-Technomancien*  
*"La magie est un service web !"*