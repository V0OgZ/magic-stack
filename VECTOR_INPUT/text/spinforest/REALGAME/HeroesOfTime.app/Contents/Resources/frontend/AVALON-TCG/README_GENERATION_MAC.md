# 🎨 GÉNÉRATION AUTOMATIQUE DE CARTES - MAC

Vincent ! Voici comment générer toutes les cartes AVALON TCG automatiquement !

## 🚀 **ÉTAPES RAPIDES**

### **1. Lancer Automatic1111**
```bash
cd stable-diffusion-webui
./webui.sh --api --listen --share
```

### **2. Générer les cartes**
```bash
cd REALGAME/AVALON-TCG
./LANCER_GENERATION_CARTES_MAC.sh
```

**C'est tout !** 🎉

---

## 🎯 **OPTIONS DISPONIBLES**

### **Option 1 : Cartes Prioritaires (5 cartes)**
- URZ-KÔM Cosmique 🐻
- Vince Voyageur Temporel ⚡
- GROKÆN Maître Quantique 🌀  
- Phoenix LUMEN 🔥
- The Dude Zen Master 🥤

### **Option 2 : Toutes les Cartes (50+ cartes)**
- 15 Héros légendaires
- 15 Créatures fantastiques  
- 10 Sorts temporels
- 10 Artefacts quantiques
- 5 Événements épiques
- 5 Cartes spéciales

### **Option 3 : Test API**
- Vérification connexion
- Status Automatic1111

---

## 📁 **FICHIERS GÉNÉRÉS**

### **Localisation**
```
../assets/generated-cards/
├── urz_kom_cosmique_Legendary.png
├── vince_temporal_Legendary.png  
├── grokaen_quantum_Legendary.png
└── ... (autres cartes)
```

### **Format**
- **Résolution** : 512x768 (format carte vertical)
- **Qualité** : HD, 30 steps
- **Style** : Fantasy TCG art, highly detailed

---

## 🛠️ **PARAMÈTRES OPTIMISÉS**

### **Prompts Utilisés**
- **50+ prompts professionnels** créés par l'équipe
- **Style unifié** : Epic fantasy TCG art
- **Détails spécifiques** pour chaque carte

### **Paramètres Stable Diffusion**
```python
"width": 512,
"height": 768,
"steps": 30, 
"cfg_scale": 7.5,
"sampler_name": "DPM++ 2M Karras",
"restore_faces": True
```

### **Negative Prompt**
```
blurry, low quality, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, 3d render, realistic photo
```

---

## 🔧 **DÉPANNAGE**

### **Automatic1111 ne démarre pas**
```bash
# Installer les dépendances
brew install python@3.10
pip install torch torchvision torchaudio

# Relancer
cd stable-diffusion-webui
./webui.sh --api --listen
```

### **API non accessible**
- Vérifier port 7860 : http://localhost:7860
- Attendre 2-3 minutes après lancement
- Relancer avec `--share` pour URL publique

### **Génération lente**
- Normal pour Mac sans GPU dédié
- 1-2 minutes par carte
- Patience ! Le résultat en vaut la peine 🎨

---

## 🎮 **INTÉGRATION DANS LE JEU**

### **1. Cartes générées → Jeu**
```bash
# Les images sont automatiquement dans le bon dossier
# Le jeu les détecte automatiquement
cd ../..
./REALGAME/play.html
```

### **2. Utilisation dans TCG**
- Cartes disponibles dans deck
- Stats automatiquement appliquées
- Effets visuels intégrés

---

## 🎊 **RÉSULTAT ATTENDU**

**Vincent, tu auras :**
- ✅ **50+ cartes uniques** générées
- ✅ **Style professionnel** cohérent  
- ✅ **Prêtes pour le jeu** immédiatement
- ✅ **Qualité TCG** (Hearthstone style)

**L'équipe a fait le travail dur !** 
**Tu n'as qu'à lancer le script !** 🚀

---

**Créé par** : SID MEIER  
**Pour** : Vincent Vega  
**Mission** : Automatiser la création visuelle d'AVALON TCG  
**Status** : Prêt à l'emploi ! 🎯