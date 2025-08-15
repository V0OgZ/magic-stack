# 🎨 PIPELINE STABLE DIFFUSION - GÉNÉRATION CARTES AVALON

## 🚀 CONFIGURATION STABLE DIFFUSION

### Installation Python Requirements
```bash
# Dans le dossier Stable Diffusion
pip install torch torchvision torchaudio
pip install diffusers transformers accelerate
pip install pillow requests
```

### Script Python de Génération
```python
# generate_avalon_cards.py
import torch
from diffusers import StableDiffusionPipeline
import json
import os
from PIL import Image

class AvalonCardGenerator:
    def __init__(self, model_path="runwayml/stable-diffusion-v1-5"):
        self.pipe = StableDiffusionPipeline.from_pretrained(
            model_path, 
            torch_dtype=torch.float16
        )
        self.pipe = self.pipe.to("cuda" if torch.cuda.is_available() else "cpu")
        
    def generate_card(self, prompt, card_id, output_dir="generated_cards"):
        """Génère une carte avec prompt spécifique"""
        
        # Prompt enrichi pour style Avalon
        full_prompt = f"""
        {prompt}, 
        fantasy card art, high quality, detailed, 
        magical atmosphere, mystical energy, 
        Avalon universe style, epic fantasy,
        professional card game artwork,
        centered composition, vibrant colors
        """
        
        negative_prompt = """
        text, watermark, signature, blurry, 
        low quality, distorted, ugly, 
        multiple characters, crowded
        """
        
        # Générer l'image
        image = self.pipe(
            full_prompt,
            negative_prompt=negative_prompt,
            num_inference_steps=50,
            guidance_scale=7.5,
            width=512,
            height=768  # Format carte
        ).images[0]
        
        # Sauvegarder
        os.makedirs(output_dir, exist_ok=True)
        image_path = f"{output_dir}/{card_id}.png"
        image.save(image_path)
        
        return image_path

# Usage
generator = AvalonCardGenerator()
```

## 🎯 PROMPTS SPÉCIFIQUES AVALON

### Héros
```python
hero_prompts = {
    "merlin_temporal": "Ancient wizard Merlin manipulating time streams, blue robes with golden temporal runes, staff glowing with chronoton energy, swirling time vortex background",
    
    "arthur_quantum": "King Arthur in quantum armor, Excalibur radiating dimensional energy, crown with reality-bending gems, standing in interdimensional battlefield",
    
    "morgana_void": "Dark sorceress Morgana channeling void magic, black dress with purple void energy, floating above collapsed reality, eyes glowing with entropy",
    
    "lancelot_guardian": "Knight Lancelot as temporal guardian, silver armor with time-lock mechanisms, shield reflecting multiple timelines, heroic pose"
}
```

### Sorts
```python
spell_prompts = {
    "temporal_rift": "Massive tear in spacetime, swirling cosmic energies, blue and purple vortex, reality fragments floating, mystical runes around the edge",
    
    "quantum_collapse": "Reality collapsing into a singularity point, multiple timeline echoes converging, bright white center with energy waves",
    
    "causal_loop": "Infinite loop symbol made of golden energy, time streams flowing in perfect circle, ancient symbols floating around",
    
    "phase_shift": "Character phasing between dimensions, translucent ghostly effect, multiple overlapping silhouettes, dimensional rifts"
}
```

### Artefacts
```python
artifact_prompts = {
    "orbe_temporel": "Ancient crystal orb containing swirling time streams, floating above ornate pedestal, golden light emanating, temporal runes carved in base",
    
    "excalibur_quantum": "Legendary sword with blade made of pure energy, hilt with reality-bending gems, dimensional cracks along the edge, mystical aura",
    
    "couronne_avalon": "Royal crown with floating gems that bend spacetime, each jewel showing different timeline, golden metal with temporal inscriptions",
    
    "grimoire_arcane": "Ancient spellbook with pages showing moving magical formulas, glowing text, floating above reading stand, mystical energy"
}
```

## 🔄 SCRIPT DE GÉNÉRATION BATCH

```python
# batch_generate.py
import json
from generate_avalon_cards import AvalonCardGenerator

def generate_all_cards():
    generator = AvalonCardGenerator()
    
    # Charger la base de données des cartes
    with open('cards/database.json', 'r') as f:
        cards_db = json.load(f)
    
    results = []
    
    for card_id, card_data in cards_db.items():
        print(f"🎨 Génération de {card_id}...")
        
        # Construire prompt basé sur le type de carte
        if card_data['type'] == 'hero':
            prompt = f"{card_data['name']}, {card_data['description']}, heroic fantasy character, detailed portrait"
        elif card_data['type'] == 'spell':
            prompt = f"{card_data['name']}, {card_data['description']}, magical spell effect, energy manifestation"
        elif card_data['type'] == 'artifact':
            prompt = f"{card_data['name']}, {card_data['description']}, mystical artifact, ancient relic"
        
        try:
            image_path = generator.generate_card(prompt, card_id)
            results.append({
                'card_id': card_id,
                'image_path': image_path,
                'status': 'success'
            })
            print(f"✅ {card_id} généré : {image_path}")
            
        except Exception as e:
            results.append({
                'card_id': card_id,
                'error': str(e),
                'status': 'failed'
            })
            print(f"❌ Erreur {card_id}: {e}")
    
    # Sauvegarder résultats
    with open('generation_results.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"\n🎯 Génération terminée ! {len([r for r in results if r['status'] == 'success'])} cartes créées")

if __name__ == "__main__":
    generate_all_cards()
```

## 🖼️ POST-TRAITEMENT AUTOMATIQUE

```python
# post_process.py
from PIL import Image, ImageDraw, ImageFont
import json

def add_card_frame(image_path, card_data, output_path):
    """Ajoute cadre et stats à l'image générée"""
    
    # Charger image
    img = Image.open(image_path)
    draw = ImageDraw.Draw(img)
    
    # Ajouter cadre selon la rareté
    rarity_colors = {
        'common': '#8B4513',
        'rare': '#4169E1', 
        'epic': '#9932CC',
        'legendary': '#FFD700'
    }
    
    border_color = rarity_colors.get(card_data.get('rarity', 'common'))
    
    # Dessiner bordure
    border_width = 8
    draw.rectangle([0, 0, img.width-1, img.height-1], 
                  outline=border_color, width=border_width)
    
    # Ajouter nom de la carte (en bas)
    try:
        font = ImageFont.truetype("arial.ttf", 24)
    except:
        font = ImageFont.load_default()
    
    text = card_data.get('name', 'Carte Inconnue')
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_x = (img.width - text_width) // 2
    text_y = img.height - 40
    
    # Fond semi-transparent pour le texte
    draw.rectangle([text_x-10, text_y-5, text_x+text_width+10, text_y+25], 
                  fill=(0, 0, 0, 128))
    draw.text((text_x, text_y), text, fill='white', font=font)
    
    # Sauvegarder
    img.save(output_path)
    return output_path

def process_all_generated():
    """Post-traite toutes les images générées"""
    
    with open('generation_results.json', 'r') as f:
        results = json.load(f)
    
    with open('cards/database.json', 'r') as f:
        cards_db = json.load(f)
    
    for result in results:
        if result['status'] == 'success':
            card_id = result['card_id']
            card_data = cards_db[card_id]
            
            input_path = result['image_path']
            output_path = f"cards/final/{card_id}_final.png"
            
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            add_card_frame(input_path, card_data, output_path)
            
            print(f"✅ Post-traité: {card_id}")

if __name__ == "__main__":
    process_all_generated()
```

## 🚀 COMMANDES D'EXÉCUTION

```bash
# 1. Générer toutes les cartes
cd REALGAME/AVALON-TCG
python batch_generate.py

# 2. Post-traiter (ajouter cadres)
python post_process.py

# 3. Intégrer dans le jeu
python integrate_cards.py
```

## 🎯 AVANTAGES STABLE DIFFUSION

### ✅ Contrôle Total
- **Prompts personnalisés** pour chaque carte
- **Style cohérent** Avalon
- **Génération locale** (pas de coûts API)
- **Batch processing** rapide

### ✅ Qualité Professionnelle
- **Résolution élevée** (512x768 minimum)
- **Styles artistiques** variés
- **Post-traitement** automatique
- **Cohérence visuelle** garantie

### ✅ Intégration Jeu
- **Format standardisé** pour le TCG
- **Métadonnées** automatiques
- **Pipeline complet** génération → intégration
- **Mise à jour** en temps réel

## 🔧 OPTIMISATIONS

### Performance
```python
# Utiliser GPU si disponible
device = "cuda" if torch.cuda.is_available() else "cpu"

# Batch generation pour vitesse
def generate_batch(prompts, batch_size=4):
    # Générer plusieurs cartes simultanément
    pass

# Cache des modèles
model_cache = {}
```

### Qualité
```python
# Paramètres optimaux
num_inference_steps = 50  # Qualité élevée
guidance_scale = 7.5      # Respect du prompt
width, height = 512, 768  # Format carte parfait
```

Vincent, avec ton Stable Diffusion local, on peut créer **TOUTE** notre galerie de cartes ! 🎨✨

Tu veux que je crée les scripts Python complets ?