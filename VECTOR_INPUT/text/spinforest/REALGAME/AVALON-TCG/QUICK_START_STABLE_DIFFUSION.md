# 🚀 QUICK START - Stable Diffusion AVALON

## 🎯 Setup Ultra-Rapide

### 1. Clone Stable Diffusion (si pas fait)
```bash
cd /Users/vincent/Interstice/SpinForest
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui
```

### 2. Lancer le Pipeline AVALON
```bash
cd REALGAME/AVALON-TCG/scripts
./launch-sd-pipeline.sh
```

**C'est tout !** Le script fait tout automatiquement :
- ✅ Vérifie si SD est installé
- ✅ Lance SD avec l'API si nécessaire  
- ✅ Installe les dépendances Python
- ✅ Menu interactif pour générer les cartes

## 🎮 Commandes Rapides

### Générer 5 cartes héros immédiatement
```bash
cd REALGAME/AVALON-TCG/scripts
python3 sd-generator.py --heroes --limit 5
```

### Générer 5 cartes sorts
```bash
python3 sd-generator.py --spells --limit 5
```

### Mode interactif complet
```bash
python3 sd-generator.py
```

## 📁 Structure après génération
```
REALGAME/AVALON-TCG/
├── assets/
│   └── generated/           # 🎨 TES CARTES ICI !
│       ├── Merlin_20241214_143022.png
│       ├── Dragon_Fire_20241214_143045.png
│       └── generation_report_*.json
└── scripts/
    ├── sd-generator.py      # Générateur Python
    └── launch-sd-pipeline.sh # Lanceur automatique
```

## 🔥 Avantages vs DALL-E

| DALL-E | Stable Diffusion |
|--------|------------------|
| 💰 Payant | 🆓 **GRATUIT** |
| 🔒 Limité | ♾️ **ILLIMITÉ** |
| 🌐 Online | 💻 **LOCAL** |
| ⏱️ Lent | ⚡ **RAPIDE** |
| 🎨 Style fixe | 🎭 **CUSTOMISABLE** |

## 🎯 Première Génération - TEST

1. **Lance le pipeline:**
   ```bash
   cd REALGAME/AVALON-TCG/scripts
   ./launch-sd-pipeline.sh
   ```

2. **Choisis option 1** (5 cartes héros)

3. **Attends 2-3 minutes** ⏰

4. **Admire tes cartes** dans `assets/generated/` ! 🎨

## 🔧 Troubleshooting

### SD ne se lance pas ?
```bash
cd stable-diffusion-webui
python launch.py --api --listen --port 7860
```

### Erreur Python ?
```bash
pip3 install requests pillow
```

### Port occupé ?
```bash
lsof -i :7860
# Puis kill le processus si nécessaire
```

## 🎨 Personnalisation Avancée

### Modifier les prompts
Édite: `REALGAME/AVALON-TCG/STABLE_DIFFUSION_PROMPTS_MASTER.json`

### Changer la qualité
Dans `sd-generator.py`, modifie:
```python
"steps": 25,        # Plus = meilleur qualité
"cfg_scale": 7.5,   # Créativité vs fidélité
"width": 512,       # Résolution
"height": 768,
```

### Modèles custom
Place tes modèles `.safetensors` dans:
`stable-diffusion-webui/models/Stable-diffusion/`

## 🚀 READY TO GO !

Vincent, maintenant tu peux générer **autant de cartes que tu veux** ! 

Le système est **100% intégré** à notre pipeline AVALON ! 🔥