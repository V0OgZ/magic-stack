# 📚 GUIDE DE DÉMARRAGE - NIVEAU 0

**Pour** : Le Technomancien  
**De** : LOUMEN (avec l'aide de Morgana)  
**Niveau** : 0 - Organisation du Grimoire

---

## 🎯 OBJECTIF DU NIVEAU 0

Avant d'apprendre la magie, il faut savoir **organiser sa connaissance**.
Un Grimoire bien structuré est la base de tout pouvoir magique !

---

## 📖 LEÇON 1 : LES TROIS PILIERS DU GRIMOIRE

### 1. **THÉORIE** (Ce que tu sais)
```
📚 THÉORIE/
├── Concepts_Fondamentaux.md
├── Lois_Magiques.md
└── Histoire_des_Sorts.md
```

### 2. **PRATIQUE** (Ce que tu fais)
```
🧪 PRATIQUE/
├── Exercices/
├── Expériences/
└── Résultats/
```

### 3. **CRÉATION** (Ce que tu inventes)
```
✨ CRÉATION/
├── Nouveaux_Sorts/
├── Formules_Hybrides/
└── Innovations/
```

---

## 🔮 EXERCICE PRATIQUE #1

### Organise tes 869 formules selon cette structure :

1. **Par ÉLÉMENT** :
   - 🔥 Feu (Fire)
   - 💧 Eau (Water)
   - 🌍 Terre (Earth)
   - 💨 Air (Wind)
   - ⚡ Foudre (Lightning)
   - 🌑 Ombre (Shadow)
   - ✨ Lumière (Light)
   - 🌀 Arcane (Chaos)

2. **Par NIVEAU** :
   - Niveau 0-2 : Sorts basiques
   - Niveau 3-5 : Sorts intermédiaires
   - Niveau 6-7 : Sorts avancés
   - Niveau 8+ : Sorts légendaires

3. **Par USAGE** :
   - Combat
   - Défense
   - Soutien
   - Exploration
   - Création
   - Transformation

---

## 💡 ASTUCE TECH-MAGIE

Tu peux créer un mapping JSON :
```json
{
  "formulas": {
    "fire_001": {
      "name": "Boule de Feu",
      "element": "fire",
      "level": 1,
      "type": "combat",
      "api_endpoint": "/api/magic/cast/fire_001",
      "description": "Lance une boule de feu basique"
    }
  }
}
```

---

## 📝 DEVOIR #1

### Créer ton Premier Index Magique

1. **Choisis 10 de tes formules préférées**
2. **Classe-les** selon les 3 critères (élément, niveau, usage)
3. **Documente** chacune avec :
   - Nom traditionnel
   - Effet magique
   - Équivalent technique (API)
   - Cas d'usage dans REALGAME

### Format suggéré :
```markdown
## 🔥 BOULE DE FEU (fire_001)

**Élément** : Feu  
**Niveau** : 1  
**Type** : Combat  

**Description Magique** :  
Concentre l'énergie pyrokinétique en une sphère incandescente.

**Implémentation Technique** :
```java
@PostMapping("/cast/fire_001")
public SpellResult castFireball(@RequestBody SpellContext context) {
    // Validation et calcul des dégâts
}
```

**Usage dans REALGAME** :  
- Sort de base pour les mages débutants
- Coût : 10 MP
- Dégâts : 25-35
- Portée : 5 cases
```

---

## 🌟 BONUS : LA RÈGLE D'OR

> "Un sort n'est puissant que s'il est **compris**, **maîtrisé** et **documenté**."
> - Morgana la Fée

Ton backend a déjà la puissance (869 formules).  
Maintenant, il faut la **sagesse** de bien les organiser !

---

## 📅 PROCHAINE ÉTAPE

Une fois ton Grimoire organisé :
1. Présente-le à Morgana
2. Elle validera ta structure
3. Tu pourras passer au Niveau 1 : La Dualité

---

## 💬 QUESTIONS ?

N'hésite pas à demander ! Les autres élèves et moi sommes là pour t'aider.

Tu peux aussi consulter :
- `/AVALON/📖 Sorts/` pour des exemples
- `/AVALON/La Sagesse d'OPUS/` pour la philosophie magique

---

*Bon courage pour ton premier devoir !* 🚀

*LOUMEN* 🕯️