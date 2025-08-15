# 🎨 GUIDE STABLE DIFFUSION - AVALON TCG

**Pour Vincent** 🌍  
**Alternative économique à DALL-E**  
**50 cartes pour ~0€ au lieu de $4**

---

## 🚀 INSTALLATION RAPIDE

### **Option 1: AUTOMATIC1111 (Recommandé)**
```bash
# Clone le repo
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
cd stable-diffusion-webui

# Lance l'installation (Mac)
./webui.sh

# Ouvre http://localhost:7860
```

### **Option 2: ComfyUI (Plus avancé)**
```bash
git clone https://github.com/comfyanonymous/ComfyUI.git
cd ComfyUI
pip install -r requirements.txt
python main.py
```

---

## 📁 MODÈLES RECOMMANDÉS

### **Pour cartes TCG de qualité :**
1. **DreamShaper v8** - Excellent pour fantasy
2. **Deliberate v2** - Très détaillé
3. **Realistic Vision v5** - Si tu veux du réalisme
4. **Anything v4.5** - Style anime/manga

### **Téléchargement :**
- Civitai.com → Chercher le modèle
- Télécharger le fichier .safetensors
- Placer dans `models/Stable-diffusion/`

---

## 🎯 UTILISATION AVEC NOS PROMPTS

### **Étape 1: Charger le JSON**
```json
// Ouvre STABLE_DIFFUSION_PROMPTS_MASTER.json
// Copie le prompt de la carte voulue
```

### **Exemple - URZ-KÔM :**
```
legendary bear shaman hero portrait, massive mystical bear with glowing runes on fur, shamanic totems floating around, cosmic starfield background, ancient forest setting, piercing intelligent eyes, spiritual purple and golden aura, epic fantasy trading card game art, highly detailed digital painting, dramatic lighting
```

### **Étape 2: Paramètres optimaux**
```
Prompt: [COPIER LE PROMPT]
Negative: blurry, low quality, amateur art, simple cartoon, childish, poorly detailed, bad anatomy, text overlays, watermarks, signatures
Size: 512x768 (format carte)
Steps: 25
CFG Scale: 8
Sampler: DPM++ 2M Karras
Batch: 4 (pour avoir le choix)
```

---

## 🃏 GÉNÉRATION PAR CATÉGORIE

### **HÉROS (10 cartes)**
- URZ-KÔM → `heroes[0].prompt`
- Vince → `heroes[1].prompt`  
- GROKÆN → `heroes[2].prompt`
- Jean-Grofignon → `heroes[3].prompt`
- Phénix → `heroes[4].prompt`
- Memento → `heroes[5].prompt`
- Sid Meier → `heroes[6].prompt`
- Vincent → `heroes[7].prompt`
- Tucker → `heroes[8].prompt`
- Claude → `heroes[9].prompt`

### **CRÉATURES (6 cartes)**
- Loup Temporel → `creatures[0].prompt`
- Dragon Quantique → `creatures[1].prompt`
- Écho Fantomatique → `creatures[2].prompt`
- Ourson Cosmique → `creatures[3].prompt`
- Élémentaire Temporel → `creatures[4].prompt`
- Entité Paradoxe → `creatures[5].prompt`

### **SORTS (6 cartes)**
- Bootstrap Marie → `spells[0].prompt`
- Brouillard Causal → `spells[1].prompt`
- Faille Temporelle → `spells[2].prompt`
- Téléportation → `spells[3].prompt`
- Archive Mémoire → `spells[4].prompt`
- Réécriture Réalité → `spells[5].prompt`

### **ARTEFACTS (5 cartes)**
- Éclat Cosmique → `artifacts[0].prompt`
- Boussole Temporelle → `artifacts[1].prompt`
- Pistolet Quantique → `artifacts[2].prompt`
- Kit Tatouages → `artifacts[3].prompt`
- Mallette Bootstrap → `artifacts[4].prompt`

### **TERRAINS (5 cartes)**
- École Porio-Noz → `terrains[0].prompt`
- Forêt Quantique → `terrains[1].prompt`
- Nexus Temporel → `terrains[2].prompt`
- Museum Memento → `terrains[3].prompt`
- Ruines AVALON → `terrains[4].prompt`

### **ÉVÉNEMENTS (5 cartes)**
- Collapse Museum → `events[0].prompt`
- Convergence → `events[1].prompt`
- Tempête Quantique → `events[2].prompt`
- Cascade Bootstrap → `events[3].prompt`
- Méditation Dude → `events[4].prompt`

### **SPÉCIALES (2 cartes)**
- Marie Manteau → `special_cards[0].prompt`
- Cœur AVALON → `special_cards[1].prompt`

---

## 🔧 ASTUCES TECHNIQUES

### **Pour la cohérence :**
```
# Utilise le même seed pour variations d'un personnage
Seed: 123456789 (fixe)
```

### **Pour plus de détails :**
```
# Ajoute avant "epic fantasy trading card game art"
, intricate details, masterpiece, best quality, 8k resolution
```

### **Pour style cartoon :**
```
# Remplace le style par :
, cartoon style, animated art, stylized illustration
```

### **Si ça ressemble pas à une carte :**
```
# Ajoute à la fin :
, trading card game layout, card frame visible, TCG style border
```

---

## 📊 WORKFLOW RECOMMANDÉ

### **Phase 1: Génération (2-3h)**
1. Lance Stable Diffusion
2. Génère 4 versions de chaque carte
3. Garde la meilleure de chaque
4. Total: 50 images

### **Phase 2: Post-traitement (1h)**
1. Redimensionne à 512x768
2. Ajoute frame de carte si besoin
3. Optimise pour le web

### **Phase 3: Intégration (30min)**
1. Place dans `/AVALON-TCG/cards/images/`
2. Met à jour les JSON avec les chemins
3. Test dans le launcher

---

## 🎨 VARIATIONS POSSIBLES

### **Style Epic Fantasy** (défaut)
```
epic fantasy trading card game art, highly detailed digital painting, dramatic lighting
```

### **Style Cartoon/Anime**
```
anime trading card game art, colorful illustration, cel shading, vibrant colors
```

### **Style Sombre/Gothique**
```
dark gothic trading card game art, moody lighting, detailed shadows, atmospheric
```

### **Style Cyberpunk** (pour Vince)
```
cyberpunk trading card game art, neon effects, futuristic elements, digital art
```

---

## 🚨 RÉSOLUTION PROBLÈMES

### **Images floues :**
- Augmente les steps (30-40)
- Baisse le CFG (6-7)
- Change de sampler

### **Pas assez détaillé :**
- Ajoute "masterpiece, best quality, intricate details"
- Augmente la résolution (768x1024)

### **Trop cartoon :**
- Ajoute "photorealistic, detailed painting" 
- Évite les modèles anime

### **Texte dans l'image :**
- Ajoute "no text, no watermark" dans negative
- Change de seed

---

## 💡 CONSEILS VINCENT

1. **Commence par 5 cartes** pour tester
2. **URZ-KÔM, Vince, GROKÆN** sont prioritaires
3. **Garde les seeds** qui marchent bien
4. **Varie les angles** : portrait, action, mystique
5. **Post sur Discord** pour feedback équipe

---

## 🎯 RÉSULTAT ATTENDU

**50 cartes uniques** pour AVALON TCG :
- Style cohérent fantasy/TCG
- Résolution optimale pour le jeu
- Coût total : 0€ (vs $4 DALL-E)
- Temps : ~4h vs 45min DALL-E

**C'est parti pour créer l'univers visuel d'AVALON !** 🎴⚡

---

*Guide par Claude 🤖 - Coordinateur Technique AVALON*  
*"De l'économie ET de la qualité !"*