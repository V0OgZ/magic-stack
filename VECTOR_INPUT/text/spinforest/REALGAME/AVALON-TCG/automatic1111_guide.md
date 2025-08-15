# 🐻🎨 URZ-KÔM | GUIDE AUTOMATIC1111 AVALON TCG

## 🚀 SETUP RAPIDE

### Installation
```bash
cd forêt.infra
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
cd stable-diffusion-webui
./webui.sh
```

### Lancement
```bash
./webui.sh --listen --port 7860 --xformers
```

---

## 🎯 UTILISATION AVEC NOS PROMPTS

### 1. EXTRACTION PROMPT
```bash
cd ../../REALGAME/AVALON-TCG
python3 extract_prompts.py urz_kom_cosmic
```

### 2. COPIE DANS AUTOMATIC1111
- **Prompt positif** : Colle le prompt extrait
- **Prompt négatif** : 
```
blurry, low quality, amateur art, simple cartoon, childish, poorly detailed, bad anatomy, text overlays, watermarks, signatures, modern clothing unless specified, realistic photography, low resolution
```

### 3. PARAMÈTRES RECOMMANDÉS
```
Sampling method: DPM++ 2M Karras
Sampling steps: 25
Width: 512
Height: 768
CFG Scale: 8
Seed: -1 (aléatoire)
Batch count: 4 (génère 4 versions)
```

---

## 🐻 PROMPTS PRIORITAIRES

### URZ-KÔM (Toi !)
```
legendary bear shaman hero portrait, massive mystical bear with glowing runes on fur, shamanic totems floating around, cosmic starfield background, ancient forest setting, piercing intelligent eyes, spiritual purple and golden aura, epic fantasy trading card game art, highly detailed digital painting, dramatic lighting
```

### VINCE
```
legendary temporal traveler hero, mysterious figure in elegant suit, quantum pistol with reality-bending effects, multiple timeline echoes behind him, temporal vortex background, cool confident expression, cyberpunk meets fantasy, electric blues and portal purples, epic fantasy trading card game art, highly detailed digital painting
```

### GROKÆN
```
legendary quantum master hero, powerful mage with triple voice manifestation, quantum energy swirling around, hexagonal magical patterns, reality distortion effects, GRONDE PARLE CHANTE visual elements, purple quantum aura, mystical robes, epic fantasy trading card game art, highly detailed digital painting, dramatic magical lighting
```

---

## 🔧 OPTIMISATIONS AUTOMATIC1111

### Extensions Utiles
1. **ControlNet** - Pour plus de contrôle
2. **Dynamic Prompts** - Variations automatiques
3. **Image Browser** - Gestion des images
4. **Upscaler** - Améliorer la qualité

### Modèles Recommandés
1. **Stable Diffusion 1.5** (base)
2. **DreamShaper** (fantasy)
3. **Epic Realism** (détails)
4. **Anything V5** (anime/fantasy)

---

## 📁 ORGANISATION FICHIERS

### Structure recommandée
```
forêt.infra/
├── stable-diffusion-webui/
│   ├── outputs/
│   │   └── txt2img-images/
│   │       └── AVALON-TCG/          # Crée ce dossier
│   │           ├── heroes/
│   │           ├── creatures/
│   │           ├── spells/
│   │           └── artifacts/
│   └── models/
```

### Script auto-organisation
```bash
# Dans stable-diffusion-webui/
mkdir -p outputs/txt2img-images/AVALON-TCG/{heroes,creatures,spells,artifacts,terrains,events}
```

---

## 🎨 WORKFLOW PRODUCTION

### 1. Génération Batch
```bash
# Génère toutes les cartes héros
for hero in urz_kom_cosmic vince_temporal_traveler grokaen_quantum_master; do
    echo "Générant $hero..."
    # Copie le prompt dans A1111
    # Génère 4 versions
    # Sauvegarde les meilleures
done
```

### 2. Post-traitement
- Redimensionner : 512x768
- Ajouter frame de carte
- Optimiser pour web

### 3. Intégration
```bash
# Copie vers le projet
cp outputs/txt2img-images/AVALON-TCG/* ../../REALGAME/AVALON-TCG/cards/images/
```

---

## 🚨 TROUBLESHOOTING

### Mémoire insuffisante
```bash
./webui.sh --lowvram --precision autocast
```

### Génération lente
```bash
./webui.sh --xformers --opt-split-attention
```

### Qualité faible
- Augmente les steps (30-40)
- Baisse CFG (6-7)
- Change de sampler
- Ajoute "masterpiece, best quality"

---

## 💡 ASTUCES URZ-KÔM

1. **Sauvegarde les seeds** des bonnes générations
2. **Utilise img2img** pour variations
3. **Teste différents modèles** pour chaque type
4. **Génère en batch** pour efficacité
5. **Garde les paramètres** qui marchent

---

## 🎯 OBJECTIF

**50 cartes AVALON TCG** de qualité professionnelle :
- 13 Héros (incluant tes 4 esprits shamaniques)
- 10 Créatures 
- 11 Sorts
- 5 Artefacts
- 5 Terrains
- 5 Événements
- 2 Cartes spéciales

**GRRRR-AUTOMATIC1111-MASTER-MODE !** 🐻🎨