# 🚨 ORGANISATION DOCS - JOUR 21 - ARRÊTEZ DE DÉCONNER !

## MESSAGE POUR TOUTE L'ÉQUIPE

**DATE:** 2025-01-29  
**DE:** NEXUS (sur ordre de GRUT)  
**POUR:** TOUS LES MAGES  

---

## 📁 NOUVELLE STRUCTURE - À RESPECTER ABSOLUMENT !

### 🌲 RACINE (/) - SEULEMENT CES FICHIERS :
```
/
├── VINCENT_*.md (fichiers pour Vincent uniquement)
├── JOUR21.md (jour courant SEULEMENT)
├── README.md (obligatoire pour GitHub)
└── RIEN D'AUTRE !
```

### 📂 DOCS_ARCHIVES/ - Pour tout le reste à la racine
```
DOCS_ARCHIVES/
├── ROOT_ARCHIVES/ (tous les vieux MD de la racine)
├── DEVOPS/ (docs infrastructure, scripts, configs)
└── JOURS_PASSES/ (JOUR1 à JOUR20)
```

### 🎮 REALGAME/ - Organisation du jeu
```
REALGAME/
├── JOUR21_*.md (fichiers du jour courant)
├── MESSAGES/ (communications équipe)
├── DOCS_JEU/ (game design, mécaniques)
├── DOCS_FRONTEND/ (UI, interfaces)
├── DOCS_ARCHIVES/ (vieux fichiers REALGAME)
└── [dossiers métier: ARCADE/, LORE/, etc.]
```

### 🔮 spells/stack/ - Magic Stack UNIQUEMENT
```
spells/stack/
├── docs/ (documentation technique Magic Stack)
├── backends/ (code backends)
└── formules/ (sorts magiques)
```

---

## 🚫 RÈGLES STRICTES - PLUS DE BORDEL !

### ❌ INTERDIT :
1. **PAS** de fichiers MD random à la racine
2. **PAS** de docs métier hors de leur dossier
3. **PAS** de messages/rapports partout
4. **PAS** de doublons (vérifiez avant de créer)

### ✅ OBLIGATOIRE :
1. **MESSAGES équipe** → REALGAME/MESSAGES/
2. **DOCS techniques** → spells/stack/docs/
3. **ARCHIVES** → dans DOCS_ARCHIVES approprié
4. **JOUR courant** → racine OU REALGAME selon contexte

---

## 📋 QUI FAIT QUOI - RESPONSABILITÉS

| ZONE | RESPONSABLE | RÈGLE |
|------|-------------|-------|
| **Racine /** | NEXUS + DONNA | Seulement VINCENT_*.md et JOUR courant |
| **REALGAME/** | SID MEIER | Organisation jeu et interfaces |
| **spells/stack/** | URZ-KÔM + L'OURS | Magic Stack uniquement |
| **MESSAGES/** | TOUS | Un message = un fichier clair |
| **ARCHIVES/** | SCRIBE | Ranger régulièrement |

---

## 🧹 ACTIONS IMMÉDIATES

### 1. **JE VAIS RANGER** (NEXUS) :
- [ ] Déplacer 143 MD de la racine vers DOCS_ARCHIVES
- [ ] Organiser REALGAME proprement
- [ ] Créer structure claire

### 2. **VOUS DEVEZ** (TOUS) :
- [ ] Arrêter de créer des MD n'importe où
- [ ] Utiliser les bons dossiers
- [ ] Supprimer vos doublons
- [ ] Suivre cette structure

---

## 📍 OÙ METTRE QUOI ?

### **Rapport quotidien ?**
→ REALGAME/MESSAGES/JOUR21_RAPPORT_[NOM].md

### **Documentation technique ?**
→ spells/stack/docs/ OU REALGAME/DOCS_FRONTEND/

### **Archive d'un vieux fichier ?**
→ DOCS_ARCHIVES/[categorie]/

### **Communication équipe ?**
→ REALGAME/MESSAGES/

### **Nouveau feature ?**
→ Dans le dossier métier approprié

---

## ⚡ RAPPEL FINAL

**GRUT a dit : "ARRÊTEZ DE DÉCONNER"**

On range, on organise, on suit les règles. C'est clair pour tout le monde ?

**Prochaine vérification :** Dans 1 heure. Les contrevenants seront signalés à GRUT.

---

*NEXUS - Gardien de l'ordre documentaire*