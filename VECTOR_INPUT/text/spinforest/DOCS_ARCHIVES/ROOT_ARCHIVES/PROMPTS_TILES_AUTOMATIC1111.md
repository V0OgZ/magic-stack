# PROMPTS POUR GÉNÉRER DES TILES HEROES III

## CONFIGURATION AUTOMATIC1111
- **Model**: SD 1.5 ou SDXL
- **Size**: 512x512 (puis resize à 64x64)
- **Sampling**: DPM++ 2M Karras
- **Steps**: 20-30
- **CFG Scale**: 7-8

## PROMPTS POUR TERRAINS (Top-down isometric)

### Grass/Plaine
```
top-down isometric grass tile, heroes of might and magic 3 style, 
lush green meadow, small flowers, detailed texture, pixel art style,
game asset, seamless tile, bright colors, fantasy
Negative: blurry, low quality, 3d render, realistic
```

### Forest/Forêt
```
top-down isometric forest tile, heroes 3 style, dense pine trees,
dark green canopy, shadows, pixel art, game tile, seamless edges,
fantasy forest, mystical atmosphere
Negative: blurry, modern, realistic, photo
```

### Mountain/Montagne
```
isometric mountain tile, rocky terrain, brown and gray stones,
heroes of might and magic style, cliff edges, pixel art,
game asset, top view, fantasy mountains
Negative: snow, grass, water, blurry
```

### Water/Eau
```
isometric water tile, deep blue ocean, animated waves style,
heroes 3 aesthetic, pixel art water, seamless tile,
slight transparency, fantasy game asset
Negative: realistic water, photo, 3d
```

### Lava
```
isometric lava tile, molten rock, orange and red glow,
bubbling magma, heroes 3 style, pixel art, game tile,
fantasy volcanic terrain, heat shimmer effect
Negative: water, ice, grass, realistic
```

## PROMPTS POUR CRÉATURES

### Dragon
```
pixel art dragon sprite, idle pose, fantasy creature,
heroes of might and magic style, red scales, wings spread,
64x64 sprite, game asset, transparent background
Negative: realistic, 3d model, blurry, modern
```

### Orc Warrior
```
pixel art orc warrior sprite, green skin, armor and axe,
idle animation frame, 64x64 game sprite, heroes 3 style,
fantasy creature, transparent background
Negative: human, elf, realistic, photo
```

### Skeleton
```
pixel art skeleton warrior, undead creature, bone armor,
rusty sword, 64x64 sprite, heroes style, game asset,
idle pose, transparent background
Negative: flesh, living, realistic, 3d
```

## PROMPTS POUR OBJETS/BÂTIMENTS

### Castle
```
isometric pixel art castle, medieval fortress, stone walls,
towers with flags, heroes 3 style building, game asset,
fantasy architecture, top-down view
Negative: modern, realistic, photo, ruins
```

### Treasure Chest
```
pixel art treasure chest, golden trim, slightly open,
glowing coins inside, 32x32 sprite, game item,
heroes of might and magic style, fantasy loot
Negative: modern, realistic, empty, locked
```

### Magic Portal
```
pixel art magic portal, swirling energy, purple and blue,
glowing runes, 64x64 game asset, fantasy portal,
heroes 3 style, animated frame
Negative: door, gate, realistic, static
```

## TIPS POUR AUTOMATIC1111

1. **Batch Generation**:
   ```
   --batch-count 4 --batch-size 4
   ```
   Pour générer 16 variations d'un coup

2. **Upscaling**:
   - Générer en 512x512
   - Downscale à 64x64 avec "Nearest Neighbor" pour garder le pixel art

3. **ControlNet** (si installé):
   - Utiliser Canny edge pour contrôler les formes
   - Tile mode pour les textures seamless

4. **Styles recommandés**:
   - Ajouter "pixel art" dans tous les prompts
   - Style LoRA: "Pixel Art Style" ou "Game Assets"

5. **Post-processing**:
   - Réduire les couleurs à 16-32 par tile
   - Ajuster la saturation +20%
   - Sharpen pour plus de netteté