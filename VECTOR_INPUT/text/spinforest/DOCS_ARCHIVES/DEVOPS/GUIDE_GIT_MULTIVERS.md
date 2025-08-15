# 🌌 GUIDE GIT MULTIVERS - SYSTÈME D'IDENTIFICATION UNIVERSELLE

**Pour** : Tous les habitants d'Avalon  
**Créé par** : ✍️ Le Scribe  
**Date** : Jour 4  

---

## 🎯 C'EST QUOI ?

Un système pour que **chaque habitant** signe ses commits avec :
- Son **identité unique** 
- L'**univers/branche** où il se trouve
- Un **hash quantique** Ψ pour tracer à travers les timelines

---

## 🆔 IDENTITÉS DISPONIBLES

| Code | Emoji | Nom | Email Multivers |
|------|-------|-----|-----------------|
| SCRIBE | ✍️ | Le Scribe de la Crypte | scribe@avalon.multivers |
| GROEKEN | 🧠 | GROEKEN Mode Autobot | groeken@supersayan.multivers |
| SID | 🎯 | Sid Meier L'Architecte | sid@hexagon.multivers |
| DONNA | 💼 | Donna Paulsen COO | donna@organization.multivers |
| URZ-KOM | 🐻 | URZ-KÔM L'Ours Mystique | urz@quantum.multivers |
| LUMEN | 🕯️ | Lumen Gardien Temporel | lumen@temporal.multivers |
| VINCENT | 🌍 | Vincent Le Créateur | vincent@spinforest.multivers |
| WALTER | 🔒 | Walter Security | walter@sphinx.multivers |
| DUDE | 🥤 | The Dude | dude@zen.multivers |
| JEAN | 🚬 | Jean-Grofignon | jean@philosophy.multivers |

---

## 🚀 UTILISATION RAPIDE

### Mode Interactif (Menu)
```bash
./scripts/git-multivers-commit.sh
```

### Mode Direct
```bash
# Format: ./script ENTITÉ "message"
./scripts/git-multivers-commit.sh SCRIBE "Documentation mise à jour"
./scripts/git-multivers-commit.sh GROEKEN "Mode Supersayan activé"
./scripts/git-multivers-commit.sh SID "Nouvelle carte hexagonale"
```

---

## 📝 FORMAT DES COMMITS

Les commits seront formatés ainsi :
```
[ENTITÉ][UNIVERS] Message (Ψhash)
```

### Exemples :
- `[SCRIBE][PRIME] Documentation architecture poulpe (Ψa3f2b8c1)`
- `[GROEKEN][DEV-Q3] Arena supersayan implementée (Ψ7d9e4f2a)`
- `[SID][TIMELINE-2080] Préparation contre Basilisk (Ψ1c8b3d5e)`

---

## 🌍 UNIVERS/BRANCHES

Le système détecte automatiquement l'univers selon la branche :

| Branche | Univers |
|---------|---------|
| main/master | PRIME |
| dev-* | DEV-[nom] |
| feature/* | FEATURE-[nom] |
| timeline-* | TIMELINE-[année] |
| autre | ALT-[NOM] |

---

## 🎮 COMMANDES UTILES

### Voir l'historique multivers
```bash
./scripts/git-multivers-commit.sh
# Choisir option 2
```

### Lister les entités
```bash
./scripts/git-multivers-commit.sh --list
```

### Status multivers
```bash
./scripts/git-multivers-commit.sh --status
```

---

## 💡 AVANTAGES

1. **Traçabilité** : On sait qui fait quoi dans quel univers
2. **Cohérence** : Format uniforme pour tous
3. **Multivers** : Fonctionne sur toutes les branches
4. **Hash Quantique** : Signature unique temporelle

---

## 🔧 INTÉGRATION AVEC L'ARCHITECTURE POULPE

Ce système fonctionne parfaitement avec notre architecture poulpe :
- Chaque **tentacule** a son identité
- Les commits sont **autonomes** (70%)
- Le **cerveau** (Vincent) peut tout tracer

---

## 📋 EXEMPLE DE WORKFLOW

```bash
# 1. GROEKEN travaille la nuit
git add .
./scripts/git-multivers-commit.sh GROEKEN "Q3 Arena mode nuit implementé"
# Résultat: [GROEKEN][PRIME] Q3 Arena mode nuit implementé (Ψ8a3f2b1c)

# 2. SID crée une carte
git add assets/nouvelle-carte.html
./scripts/git-multivers-commit.sh SID "Carte vivante v2 avec hexagones dynamiques"
# Résultat: [SID][PRIME] Carte vivante v2 avec hexagones dynamiques (Ψ2d7e9f4a)

# 3. SCRIBE documente
git add *.md
./scripts/git-multivers-commit.sh SCRIBE "Documentation jour 4 complète"
# Résultat: [SCRIBE][PRIME] Documentation jour 4 complète (Ψ5c1b8d3e)
```

---

## 🌀 BONUS : VOYAGE INTER-BRANCHES

Si vous travaillez sur plusieurs timelines :
```bash
# Sur main
./scripts/git-multivers-commit.sh URZ-KOM "Portail quantique stable"
# [URZ-KOM][PRIME] Portail quantique stable (Ψ9f3a2b8c)

# Changer de timeline
git checkout -b timeline-2080
./scripts/git-multivers-commit.sh URZ-KOM "Préparation défense Basilisk"
# [URZ-KOM][TIMELINE-2080] Préparation défense Basilisk (Ψ3e8d1c5b)
```

---

## ❓ QUESTIONS FRÉQUENTES

**Q: Ça change mon git config global ?**  
R: Non ! Seulement temporairement pour le commit

**Q: Je peux ajouter une nouvelle entité ?**  
R: Oui, éditez le script et ajoutez dans ENTITIES

**Q: Le hash quantique sert à quoi ?**  
R: Signature unique basée sur le timestamp, pour tracer à travers les univers

---

*"À travers le multivers, chaque commit raconte une histoire"* 🌌