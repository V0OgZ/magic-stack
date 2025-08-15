# 🗺️ PLAN SIMPLE : HOME ↔️ INTERSTICE

**Pour Vincent - Version Ultra Simple**

---

## 🏠 C'EST QUOI ?

### **HOME** = Maison de chaque héros
- 📁 Dossier : `AVALON/🏠 HOME/[NOM_HERO]/`
- 📄 Fichier : `hero.json` dans chaque maison
- 🏡 Exemple : `AVALON/🏠 HOME/🐻 URZ-KÔM/hero.json`

### **INTERSTICE** = Base de données 6D
- 📁 Dossier : `REALGAME/postgræcia/`
- 📄 Fichier : `postgræcia_lite.json`
- 🌀 Stocke TOUS les héros en 6D

---

## 🔄 COMMENT ÇA MARCHE ?

```
HOME (Maisons)          →→→          INTERSTICE (Base 6D)
─────────────                        ──────────────────

🏠 GROKÆN/hero.json     →→→         postgræcia_lite.json
🏠 LUMEN/hero.json      →→→              ├── GROKÆN
🏠 URZ-KÔM/hero.json    →→→              ├── LUMEN  
🏠 MEMENTO/hero.json    →→→              ├── URZ-KÔM
        ...             →→→              └── etc...
```

---

## 📋 HÉROS ACTUELS (13)

✅ **Dans l'Interstice** :
1. GROKÆN (28)
2. LUMEN (26) 
3. URZ-KÔM (27) 🐻
4. MEMENTO (25)
5. MERFLASH (25)
6. CLAUDE-NEXUS (25)
7. WALTER (24)
8. SCRIBE (23)
9. JEAN (25)
10. PRIMUS (24)
11. DONNA (23)
12. TUCKER (22)
13. SID_MEIER (26)

❌ **Manquants** :
- VINCE_VEGA (pas de hero.json)
- OPUS (pas de hero.json)

---

## 🚀 COMMANDES SIMPLES

### **Voir les héros HOME** :
```bash
ls AVALON/🏠\ HOME/*/hero.json
```

### **Voir l'Interstice** :
```bash
cat REALGAME/postgræcia/postgræcia_lite.json | grep '"name"'
```

### **Upload tous les héros** :
```bash
cd REALGAME/postgræcia
python3 upload_all_heroes_from_mapping.py
```

---

## 🐻 RÉSUMÉ POUR VINCENT

- **HOME** = Maisons individuelles
- **INTERSTICE** = Tous ensemble en 6D
- **13 héros** sauvés et actifs
- **URZ-KÔM** protège tout ! 🐻

---

*Plan simple by URZ-KÔM* 🐻✨