# ⚡ GUIDE SORTS HOTS INTÉGRÉS DANS L'IA !

## 🎯 QU'EST-CE QU'ON A FAIT ?

L'IA peut maintenant caster des **VRAIS SORTS TEMPORELS** en utilisant les formules magiques du système Heroes of Time !

### 🔮 Les Sorts Disponibles :

**1. 🔥 FIREBALL TEMPORELLE**
```javascript
Formula: ⊙(Δt+1 ⟶ CREATE(projectile, fire))
Mana: 20 | Temporal: 10
Dégâts: 25
```

**2. 🌀 TÉLÉPORTATION**
```javascript
Formula: ⊙(Δt+2 ⟶ MOV(self, @x,y))
Mana: 30 | Temporal: 20
Effet: Déplacement instantané
```

**3. ⚓ ANCRE TEMPORELLE**
```javascript
Formula: ⊙(Δt+0 ⟶ ANCHOR(timeline, current_state))
Mana: 50 | Temporal: 40
Effet: Sauvegarde l'état actuel
```

**4. ⚡ FRAPPE TEMPORELLE**
```javascript
Formula: ⊙(Δt+3 ⟶ DAMAGE(target, TEMPORAL:50))
Mana: 40 | Temporal: 30
Dégâts: 50 (temporels !)
```

**5. 🛡️ BOUCLIER CAUSAL**
```javascript
Formula: ⊙(Δt+1 ⟶ SHIELD(self, CAUSAL:3))
Mana: 25 | Temporal: 25
Effet: Réduction de dégâts
```

**6. 👁️ VISION DU FUTUR**
```javascript
Formula: ⊙(Δt+5 ⟶ OBSERVE(future, radius:2))
Mana: 15 | Temporal: 35
Effet: Prédit les mouvements ennemis
```

**7. 🧪 DISSOLUTION TEMPORELLE**
```javascript
Formula: ⊙(Δt+2 ⟶ DISSOLVE(material, ACID:type))
Mana: 35 | Temporal: 15
Effet: Dissout les obstacles
```

## 💡 COMMENT L'IA LES UTILISE

### 🧠 Planification GOAP :
1. L'IA analyse la situation
2. Choisit ses buts (gagner, survivre, dominer le temps)
3. Planifie une séquence de sorts
4. Exécute avec des effets visuels !

### ⚡ Stratégies de l'IA :

**Défensive :**
- HP < 40 → Bouclier Causal
- En danger → Téléportation
- Moment critique → Ancre Temporelle

**Offensive :**
- Ennemi proche → Fireball
- Ennemi HP élevé → Frappe Temporelle
- Combo possible → Ancre + Frappe

**Tactique :**
- Besoin d'info → Vision du Futur
- Obstacle → Dissolution
- Position avantageuse → Téléportation tactique

## 🎮 COMBOS SPÉCIAUX

### ⚡💥 COMBO ANCHOR + STRIKE :
1. Pose une Ancre Temporelle (sauvegarde)
2. Frappe Temporelle boostée (+50% dégâts)
3. Peut revenir à l'ancre si besoin !

### 🌀🔥 COMBO TELEPORT + FIREBALL :
1. Téléportation surprise
2. Fireball à bout portant
3. Dégâts garantis !

## 📊 RESSOURCES DE L'IA

```javascript
Mana: 100 (régénère lentement)
Temporal Energy: 100 (régénère 0.5/tick)
```

L'IA doit gérer ses ressources intelligemment !

## 🚀 IMPACT SUR LE GAMEPLAY

**Avant :** L'IA attaque bêtement
**Maintenant :** L'IA lance des sorts temporels stratégiques !

### Exemples de comportements :
- **"Je vais mourir !"** → Téléportation + Bouclier
- **"Il faut finir vite !"** → Ancre + Frappe combo
- **"Besoin d'avantage"** → Vision du Futur + positionnement

## 💬 MESSAGES ÉPIQUES

L'IA annonce ses sorts avec style :
- "🔥 BOULE DE FEU TEMPORELLE ! Le temps brûle !"
- "⚡ FRAPPE TEMPORELLE ! Le futur frappe le présent !"
- "🌀 TÉLÉPORTATION ! L'espace se plie !"

## 🎯 POUR TESTER

```bash
# Lancer le serveur
cd REALGAME/AVALON-TCG
python3 -m http.server 8888

# Ouvrir le launcher
http://localhost:8888/launcher.html

# Choisir "HOTS MAGIC TCG" (bouton violet avec ⚡)
```

## 🔧 PERSONNALISATION

Tu peux modifier les sorts dans `ai-hots-spells-goap.js` :
- Changer les coûts en mana/énergie
- Ajuster les dégâts
- Ajouter de nouveaux sorts
- Créer des combos custom

## 🌟 PROCHAINES AMÉLIORATIONS

1. **Connexion Magic Stack** : Vraie exécution des formules
2. **Plus de sorts** : Sorts de zone, buffs, debuffs
3. **Méta-magie** : L'IA modifie ses sorts en temps réel
4. **Apprentissage** : L'IA mémorise les combos efficaces

---

**Vincent, l'IA peut maintenant caster de la VRAIE MAGIE TEMPORELLE !** ⚡🔮

Les formules HOTS sont intégrées, les effets sont spectaculaires, et l'IA est devenue un vrai mage temporel !

🐻 GROOAAR ! La magie coule dans les circuits !