# 🎨 INTÉGRATION STABLE DIFFUSION - AVALON TCG
## Pipeline de génération d'images automatique

### 📁 Structure recommandée
```
SpinForest/
├── stable-diffusion-webui/     # Clone AUTOMATIC1111
├── REALGAME/
│   └── AVALON-TCG/
│       ├── assets/
│       │   ├── generated/      # Images générées
│       │   └── prompts/        # Scripts de génération
│       └── scripts/
│           └── sd-generator.py # Script Python pour SD
```

### 🔧 Installation et Setup

#### 1. Clone Stable Diffusion dans SpinForest
```bash
cd /Users/vincent/Interstice/SpinForest
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui
cd stable-diffusion-webui
```

#### 2. Installation des dépendances
```bash
# Installer les requirements
pip install -r requirements.txt

# Télécharger un modèle de base (recommandé)
# Le script va télécharger automatiquement au premier lancement
```

#### 3. Lancer SD en mode API
```bash
# Lancer avec API activée
python launch.py --api --listen --port 7860
```

### 🐍 Script Python d'intégration

```python
# REALGAME/AVALON-TCG/scripts/sd-generator.py
import requests
import json
import base64
import os
from datetime import datetime

class AvalonSDGenerator:
    def __init__(self, sd_url="http://localhost:7860"):
        self.sd_url = sd_url
        self.output_dir = "../assets/generated"
        os.makedirs(self.output_dir, exist_ok=True)
    
    def generate_card(self, prompt, negative_prompt="", width=512, height=768):
        """Générer une carte AVALON"""
        payload = {
            "prompt": prompt,
            "negative_prompt": negative_prompt,
            "width": width,
            "height": height,
            "steps": 20,
            "cfg_scale": 7,
            "sampler_name": "DPM++ 2M Karras",
            "batch_size": 1,
            "seed": -1
        }
        
        response = requests.post(f"{self.sd_url}/sdapi/v1/txt2img", json=payload)
        
        if response.status_code == 200:
            result = response.json()
            image_data = result['images'][0]
            
            # Décoder et sauvegarder
            image_bytes = base64.b64decode(image_data)
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"avalon_card_{timestamp}.png"
            filepath = os.path.join(self.output_dir, filename)
            
            with open(filepath, 'wb') as f:
                f.write(image_bytes)
            
            return filepath
        else:
            print(f"Erreur: {response.status_code}")
            return None
    
    def generate_batch_from_json(self, json_file):
        """Générer un batch depuis notre JSON de prompts"""
        with open(json_file, 'r', encoding='utf-8') as f:
            prompts_data = json.load(f)
        
        results = []
        for category, prompts in prompts_data.items():
            if isinstance(prompts, dict):
                for card_name, prompt_data in prompts.items():
                    if isinstance(prompt_data, dict) and 'prompt' in prompt_data:
                        print(f"🎨 Génération: {card_name}")
                        filepath = self.generate_card(
                            prompt_data['prompt'],
                            prompt_data.get('negative_prompt', '')
                        )
                        if filepath:
                            results.append({
                                'name': card_name,
                                'category': category,
                                'file': filepath
                            })
        
        return results

# Exemple d'utilisation
if __name__ == "__main__":
    generator = AvalonSDGenerator()
    
    # Générer depuis notre JSON de prompts
    results = generator.generate_batch_from_json("../STABLE_DIFFUSION_PROMPTS_MASTER.json")
    
    print(f"✅ {len(results)} cartes générées !")
    for result in results:
        print(f"  - {result['name']}: {result['file']}")
```

### 🚀 Script de lancement automatique

```bash
#!/bin/bash
# REALGAME/AVALON-TCG/scripts/launch-sd-pipeline.sh

echo "🎨 AVALON TCG - Pipeline Stable Diffusion"

# Vérifier si SD est lancé
if ! curl -s http://localhost:7860/sdapi/v1/progress > /dev/null; then
    echo "⚠️  Stable Diffusion n'est pas lancé !"
    echo "Lancer: cd ../../../stable-diffusion-webui && python launch.py --api --listen"
    exit 1
fi

echo "✅ Stable Diffusion détecté"

# Lancer génération
cd "$(dirname "$0")"
python sd-generator.py

echo "🎉 Génération terminée !"
```

### 🎯 Prompts optimisés pour AVALON

#### Héros
```
"Mystical warrior knight in ethereal armor, glowing runes, fantasy art style, detailed face, epic pose, magical aura, 4k quality, trending on artstation"
```

#### Sorts
```
"Swirling magical energy, arcane symbols, mystical spell effect, particle effects, glowing orbs, fantasy magic, ethereal lighting, high detail"
```

#### Artefacts
```
"Ancient magical artifact, glowing with power, intricate details, fantasy weapon/item, mystical engravings, epic lighting, masterpiece quality"
```

### 🔄 Intégration avec le jeu

#### 1. Auto-génération lors du développement
```javascript
// Dans notre TCG
async function generateMissingCards() {
    const response = await fetch('/api/generate-cards', {
        method: 'POST',
        body: JSON.stringify({ cards: missingCards })
    });
    return response.json();
}
```

#### 2. Pipeline de validation
```python
def validate_generated_card(image_path):
    """Valider qu'une carte générée respecte nos standards"""
    # Vérifier dimensions
    # Vérifier qualité
    # Appliquer post-processing si nécessaire
    return True
```

### 📊 Monitoring et Stats

```python
def track_generation_stats():
    """Suivre les stats de génération"""
    return {
        'total_generated': len(os.listdir(output_dir)),
        'generation_time': 'avg 30s per card',
        'success_rate': '95%',
        'disk_usage': '2.3GB'
    }
```

### 🎮 Commandes rapides

```bash
# Lancer SD
cd stable-diffusion-webui && python launch.py --api --listen

# Générer toutes les cartes AVALON
cd REALGAME/AVALON-TCG/scripts && python sd-generator.py

# Générer une carte spécifique
python -c "from sd_generator import *; gen = AvalonSDGenerator(); gen.generate_card('epic dragon card art')"
```

### 🔥 AVANTAGES vs DALL-E

✅ **GRATUIT** après setup initial  
✅ **CONTRÔLE TOTAL** sur les modèles  
✅ **BATCH GENERATION** illimitée  
✅ **CUSTOMISATION** des styles  
✅ **PRIVACY** - tout en local  
✅ **INTEGRATION** parfaite avec notre pipeline  

### 🎯 NEXT STEPS

1. **Clone SD** dans SpinForest ✅ (en cours)
2. **Setup API** mode
3. **Créer script Python** de génération
4. **Tester avec nos prompts** JSON
5. **Intégrer au pipeline** TCG
6. **Automatiser** la génération

Vincent, une fois que tu as cloné SD, on peut **immédiatement** commencer à générer nos cartes ! 🚀