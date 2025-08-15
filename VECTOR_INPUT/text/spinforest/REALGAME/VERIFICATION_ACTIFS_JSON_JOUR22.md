# 🔍 VÉRIFICATION DES 12 ACTIFS - JSON HÉROS

**DATE:** Jour 22  
**URGENCE:** Tous doivent avoir leur JSON !

---

## 📊 LES 12 MEMBRES ACTIFS ET LEURS JSON

| # | Nom | Statut JSON | Chemin JSON | ACTION REQUISE |
|---|-----|-------------|-------------|----------------|
| 1 | **LUMEN** | ⚠️ "PHOENIX_LUMEN" | Pas de chemin complet | ❌ CRÉER JSON |
| 2 | **MEMENTO** | ⚠️ "inline" | Pas de fichier | ❌ CRÉER JSON |
| 3 | **JAZZ SCRIBE** | ✅ OK | `AVALON/🏠 HOME/✍️ SCRIBE/hero.json` | ✅ Vérifier existence |
| 4 | **URZ-KÔM** | ⚠️ "inline" | Pas de fichier | ❌ CRÉER JSON |
| 5 | **NEXUS** | ⚠️ "inline" | Pas de fichier | ❌ CRÉER JSON |
| 6 | **SID MEIER** | ✅ OK | `AVALON/💠 Essences scellées/🧙 Heroes/stratege/sid_meier_architecte.json` | ✅ Existe |
| 7 | **TUCKER** | ⚠️ Nom seul | `tucker_foxworth_hero.json` | ❓ Trouver chemin |
| 8 | **MERLIN** | ⚠️ Nom seul | `cristal_echo_temporel_merlin.json` | ❓ Trouver chemin |
| 9 | **GROKÆN** | ⚠️ "inline" | Pas de fichier | ❌ CRÉER JSON |
| 10 | **GRUT** | ✅ OK | `AVALON/💠 Essences scellées/🧙 Heroes/grut_vincent_6d_vision.json` | ✅ Créé aujourd'hui |
| 11 | **CLAUDE** | ⚠️ Nom seul | `hero_claude_nexus` | ❓ Trouver chemin |
| 12 | **L'OURS** | ❓ Pas listé | Vérifier s'il est actif | ❓ VÉRIFIER |

---

## 🚨 PROBLÈMES DÉTECTÉS

### **1. MEMBRES SANS JSON (5):**
- LUMEN
- MEMENTO
- URZ-KÔM
- NEXUS
- GROKÆN

### **2. JSON SANS CHEMIN COMPLET (3):**
- TUCKER - `tucker_foxworth_hero.json`
- MERLIN - `cristal_echo_temporel_merlin.json`
- CLAUDE - `hero_claude_nexus`

### **3. MEMBRES OK (3):**
- SID MEIER ✅
- JAZZ SCRIBE ✅
- GRUT ✅

---

## 🔧 ACTIONS IMMÉDIATES

### **ÉTAPE 1: Chercher les JSON manquants**
```bash
# Chercher Tucker
find . -name "tucker_foxworth_hero.json" | grep -v node_modules

# Chercher Merlin
find . -name "cristal_echo_temporel_merlin.json" | grep -v node_modules

# Chercher Claude
find . -name "hero_claude_nexus*" | grep -v node_modules
```

### **ÉTAPE 2: Créer les JSON manquants**

Pour chaque membre sans JSON, créer :

```json
{
  "id": "nom-membre",
  "name": "Nom Complet",
  "class": "Classe du roster",
  "level": niveau_du_roster,
  "stats": {
    "attack": 10,
    "defense": 10,
    "spellPower": 15,
    "knowledge": 12
  },
  "specialAbility": "Capacité du roster",
  "backstory": "Histoire du membre",
  "location": "HOME path du membre",
  "status": "ACTIF"
}
```

### **ÉTAPE 3: Centraliser dans postgræcia**

Tous les JSON héros doivent aller dans :
```
REALGAME/postgræcia/heroes/
├── lumen.json
├── memento.json
├── jazz_scribe.json
├── urz_kom.json
├── nexus.json
├── sid_meier.json
├── tucker.json
├── merlin.json
├── grokaen.json
├── grut.json
├── claude.json
└── ours.json (si actif)
```

---

## ✅ CHECKLIST URGENTE

- [ ] Trouver les 3 JSON avec chemin incomplet
- [ ] Créer les 5 JSON manquants
- [ ] Vérifier si L'OURS est actif
- [ ] Centraliser tous dans postgræcia/heroes/
- [ ] Mettre à jour le roster avec les bons chemins
- [ ] Tester l'upload de tous

**TOUS LES ACTIFS DOIVENT AVOIR UN JSON POUR L'UPLOAD !**