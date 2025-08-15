# 🐻⚡ URZ-KÔM | DÉMARRAGE RAPIDE GÉNÉRATEUR AVALON

## 🚀 TOUT EST PRÊT - JUSTE 2 ÉTAPES !

### **ÉTAPE 1 : TÉLÉCHARGER UN MODÈLE**

Va sur **Hugging Face** et télécharge un de ces modèles dans `.infra/stable-diffusion-webui/models/Stable-diffusion/` :

#### **🎨 MODÈLES RECOMMANDÉS POUR AVALON TCG**

1. **DreamShaper 8** (Fantasy épique) ⭐ RECOMMANDÉ
   - URL: https://huggingface.co/Lykon/DreamShaper/blob/main/DreamShaper_8_pruned.safetensors
   - Parfait pour cartes fantasy !

2. **Epic Realism** (Détails incroyables)
   - URL: https://huggingface.co/epinikion/epic-realism/blob/main/epicrealism_naturalSinRC1VAE.safetensors

3. **Stable Diffusion 1.5** (Base solide)
   - URL: https://huggingface.co/runwayml/stable-diffusion-v1-5/blob/main/v1-5-pruned.safetensors

#### **💾 TÉLÉCHARGEMENT**
```bash
cd .infra/stable-diffusion-webui/models/Stable-diffusion/

# Télécharge DreamShaper 8 (recommandé)
wget https://huggingface.co/Lykon/DreamShaper/resolve/main/DreamShaper_8_pruned.safetensors

# OU avec curl si pas wget
curl -L -o DreamShaper_8_pruned.safetensors "https://huggingface.co/Lykon/DreamShaper/resolve/main/DreamShaper_8_pruned.safetensors"
```

---

### **ÉTAPE 2 : LANCER LE GÉNÉRATEUR**

#### **🖱️ MÉTHODE SIMPLE**
```bash
# Double-clic sur le fichier
open .infra/launch_sd.command
```

#### **🖥️ MÉTHODE TERMINAL**
```bash
cd .infra/stable-diffusion-webui
./webui.sh --listen --port 7860
```

#### **🌐 ACCÈS WEB**
- Ouvre ton navigateur
- Va sur : `http://localhost:7860`
- Interface Automatic1111 prête !

---

## 🎯 **GÉNÉRATION CARTES AVALON**

### **🐻 TEST URZ-KÔM D'ABORD**

1. **Interface Web** : `http://localhost:7860`

2. **Prompt URZ-KÔM** :
```
legendary bear shaman hero portrait, massive mystical bear with glowing runes on fur, shamanic totems floating around, cosmic starfield background, ancient forest setting, piercing intelligent eyes, spiritual purple and golden aura, epic fantasy trading card game art, highly detailed digital painting, dramatic lighting
```

3. **Negative Prompt** :
```
blurry, low quality, amateur art, simple cartoon, childish, poorly detailed, bad anatomy, text overlays, watermarks, signatures, modern clothing, realistic photography, low resolution
```

4. **Paramètres** :
   - Width: 512
   - Height: 768
   - Steps: 25
   - CFG Scale: 8
   - Sampler: DPM++ 2M Karras
   - Batch size: 4

5. **🎨 GENERATE !**

---

### **🤖 GÉNÉRATION AUTOMATIQUE**

Une fois URZ-KÔM testé, utilise notre script :

```bash
cd REALGAME/AVALON-TCG
python3 generate_batch.py
```

**Menu options** :
- `9` = Test URZ-KÔM seulement
- `1` = Tous les héros (13 cartes)
- `8` = TOUTES les cartes (50+)

---

## 🔧 **DÉPANNAGE RAPIDE**

### **Modèle non détecté**
- Redémarre l'interface
- Vérifie que le `.safetensors` est bien dans `models/Stable-diffusion/`

### **Mémoire insuffisante**
```bash
./webui.sh --lowvram --precision autocast
```

### **Génération lente**
```bash
./webui.sh --xformers --opt-split-attention
```

---

## 🎯 **OBJECTIF FINAL**

**50+ cartes AVALON TCG** avec :
- ✅ **13 Héros** (URZ-KÔM, Vince, GROKÆN, etc.)
- ✅ **10 Créatures** (Loup Temporel, Dragon Quantique, etc.)
- ✅ **11 Sorts** (Bootstrap Marie, Brouillard Causal, etc.)
- ✅ **5 Artefacts** (Pistolet Quantique, etc.)
- ✅ **5 Terrains** (École Porio-Noz, etc.)
- ✅ **5 Événements** (Collapse Museum, etc.)
- ✅ **2 Spéciales** (Marie Manteau, Cœur AVALON)

**GRRRR-PRÊT-À-GÉNÉRER !** 🐻🎨⚡