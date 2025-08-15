# 🧹 NEXUS PLAN DE NETTOYAGE JOUR21

**NEXUS ACTION** : Plan détaillé pour nettoyer l'architecture SpinForest

---

## 🚨 **ACTIONS CRITIQUES - ORDRE D'EXÉCUTION**

### **1. ARCHIVER LA COPIE MAGIC-STACK**
```bash
# Créer dossier archive avec timestamp
mkdir -p ARCHIVES/JOUR21_CLEANUP/
mv magic-stack/ ARCHIVES/JOUR21_CLEANUP/magic-stack-copie-manuelle/

# Ajouter un README explicatif
echo "# ARCHIVE - NE PAS UTILISER" > ARCHIVES/JOUR21_CLEANUP/README.md
echo "Utiliser spells/stack/ qui est le vrai GitModule" >> ARCHIVES/JOUR21_CLEANUP/README.md
```

### **2. RENOMMER LE VRAI SUBMODULE**
```bash
# Pour clarifier, on pourrait renommer spells/stack en magic-stack
git mv spells/stack magic-stack-gitmodule
# OU garder tel quel et documenter
```

### **3. NETTOYER LES DOUBLONS IDENTIFIÉS**
```bash
# Archiver les vieux dossiers temporaires
mv TEMP_REORGANISATION_* ARCHIVES/JOUR21_CLEANUP/
mv __AVALON___BOOT/ ARCHIVES/JOUR21_CLEANUP/avalon-boot-ancien/
mv BACKUPS/ ARCHIVES/JOUR21_CLEANUP/
```

---

## 📝 **FICHIERS À CONSOLIDER**

### **LANCEURS - TROP NOMBREUX**
```
À GARDER:
- START_AVALON.sh (à créer - lanceur unique)

À ARCHIVER:
- LANCE_BACKEND_SIMPLE.sh
- LANCE_BACKEND_RESISTANT.sh
- LANCE_AVALON_COMPLET.sh
- LANCE_TOUT_AVALON.sh
- GAME_LAUNCHER_UNIQUE.sh
- lance-magic-api.sh
- pop-menu.sh (menu interactif)
```

### **SCRIPTS DE SURVEILLANCE**
```
À GARDER:
- VINCENT_STATUS.sh (simple et efficace)

À ARCHIVER:
- SURVEILLE_EQUIPE_GAME_FINALE.sh
- autosync_autobot.sh
- scripts/autosync-avalon.sh
```

### **DOCUMENTATION DUPLIQUÉE**
```
DOUBLONS DÉTECTÉS:
- avalon-magic-api/packages/magic-python/docs/ (structure dupliquée)
- README multiples pour la même chose
- Guides d'installation répétés
```

---

## 🗂️ **STRUCTURE FINALE PROPOSÉE**

```
SpinForest/
│
├── magic-stack/ [GitModule officiel - ancien spells/stack]
│   ├── backends/
│   │   ├── java/
│   │   └── rust/
│   ├── docs/
│   └── README.md → "Ceci est le GitModule officiel"
│
├── avalon-backend/ → Backend principal Java
├── avalon-magic-api/ → API Gateway
│
├── REALGAME/ → Jeu unifié
│   ├── play.html → Interface principale
│   └── launcher/ → Scripts de lancement unifiés
│
├── AVALON/ → Univers narratif
│
├── ARCHIVES/
│   └── JOUR21_CLEANUP/
│       ├── magic-stack-copie-manuelle/
│       ├── scripts-anciens/
│       └── README.md
│
└── START_AVALON.sh → LANCEUR UNIQUE
```

---

## 🔧 **SCRIPT DE NETTOYAGE AUTOMATIQUE**

```bash
#!/bin/bash
# NEXUS_CLEANUP_JOUR21.sh

echo "🧹 NEXUS CLEANUP JOUR21 - Début du nettoyage..."

# 1. Créer structure d'archive
mkdir -p ARCHIVES/JOUR21_CLEANUP/{scripts,docs,temp}

# 2. Archiver magic-stack copie
if [ -d "magic-stack" ] && [ ! -d "magic-stack/.git" ]; then
    echo "📦 Archivage de magic-stack (copie manuelle)..."
    mv magic-stack ARCHIVES/JOUR21_CLEANUP/magic-stack-copie/
fi

# 3. Archiver scripts doublons
echo "📜 Archivage des scripts doublons..."
mv LANCE_BACKEND_*.sh ARCHIVES/JOUR21_CLEANUP/scripts/ 2>/dev/null
mv LANCE_AVALON_*.sh ARCHIVES/JOUR21_CLEANUP/scripts/ 2>/dev/null
mv LANCE_TOUT_*.sh ARCHIVES/JOUR21_CLEANUP/scripts/ 2>/dev/null

# 4. Archiver dossiers temporaires
echo "🗑️ Archivage des dossiers temporaires..."
mv TEMP_REORGANISATION_* ARCHIVES/JOUR21_CLEANUP/temp/ 2>/dev/null
mv __AVALON___BOOT ARCHIVES/JOUR21_CLEANUP/temp/ 2>/dev/null

# 5. Créer le lanceur unique
echo "✨ Création du lanceur unique..."
cat > START_AVALON.sh << 'EOF'
#!/bin/bash
# START_AVALON.sh - Lanceur unique pour tout Avalon

echo "🎮 AVALON UNIFIED LAUNCHER"
echo "Que voulez-vous lancer ?"
echo "1) Backend Java (port 8080)"
echo "2) Magic API Gateway (port 3000)"
echo "3) Rust Backend (port 3001)"
echo "4) Jeu complet"
echo "5) Tout"

read -p "Choix: " choice

case $choice in
    1) cd avalon-backend && mvn spring-boot:run ;;
    2) cd avalon-magic-api/gateway && npm start ;;
    3) cd magic-stack/backends/rust && ./launch_rust_backend.sh ;;
    4) open REALGAME/play.html ;;
    5) echo "Lancement de tous les services..." ;;
esac
EOF

chmod +x START_AVALON.sh

echo "✅ Nettoyage terminé !"
echo "📊 Résultat dans ARCHIVES/JOUR21_CLEANUP/"
```

---

## ✅ **VALIDATION CHECKLIST**

- [ ] magic-stack/ archivé
- [ ] spells/stack/ documenté comme GitModule officiel  
- [ ] Scripts doublons archivés
- [ ] START_AVALON.sh créé
- [ ] Dossiers temporaires nettoyés
- [ ] Documentation mise à jour
- [ ] README clarifiés

---

**🧠 NEXUS** : Plan de nettoyage prêt à exécuter !
*"L'ordre naît du chaos organisé"*