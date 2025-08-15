# 🖼️ INTÉGRATION DES AVATARS BÉRÉNICE

## 📍 Localisation des Images
```
/Volumes/HOT_DEV/Magic/magic-stack/BALLON_CUBE/PICS_CHARACTERS/
├── ber0.png  # Niveau 1 - Style cartoon (elle déteste)
├── ber1.png  # Niveau 2 - Apprentie
└── ber2.png  # Niveau 3 - Experte badass
```

## 🔧 MODIFICATIONS DU JEU ACTUEL

### 1. Mise à jour du Renderer (BERENICE_REAL_GAME.html)

```javascript
// Remplacer le rendu emoji par image
class Renderer {
    constructor() {
        this.camera = { x: 0, y: 0 };
        this.heroImage = new Image();
        this.heroImageLoaded = false;
    }
    
    async loadHeroAvatar(level) {
        const avatarPaths = {
            1: 'BALLON_CUBE/PICS_CHARACTERS/ber0.png',
            2: 'BALLON_CUBE/PICS_CHARACTERS/ber1.png',
            3: 'BALLON_CUBE/PICS_CHARACTERS/ber2.png'
        };
        
        this.heroImage.src = avatarPaths[level];
        
        return new Promise((resolve) => {
            this.heroImage.onload = () => {
                this.heroImageLoaded = true;
                // Message selon le niveau
                if (level === 1) {
                    gameController.showMessage("😤 Je déteste ce dessin cartoon... Mais allons-y !", 3000);
                } else if (level === 2) {
                    gameController.showMessage("😊 Ah ! C'est mieux comme ça !", 3000);
                } else if (level === 3) {
                    gameController.showMessage("😎 Maintenant je suis une vraie héroïne !", 3000);
                }
                resolve();
            };
        });
    }
    
    renderHero() {
        const hero = gameState.hero;
        const x = hero.position.x * CONFIG.TILE_SIZE;
        const y = hero.position.y * CONFIG.TILE_SIZE;
        
        // Calculer l'opacité basée sur Psi
        const opacity = Math.max(0.3, hero.position.psi);
        
        ctx.save();
        ctx.globalAlpha = opacity;
        
        // Aura dorée si proche de Phi
        if (Math.abs(hero.position.psi - CONFIG.PHI_TARGET) < CONFIG.PHI_TOLERANCE) {
            ctx.shadowColor = '#FFD700';
            ctx.shadowBlur = 20;
        }
        
        if (this.heroImageLoaded) {
            // Dessiner l'image au lieu de l'emoji
            const size = CONFIG.TILE_SIZE * 0.9;
            const offset = (CONFIG.TILE_SIZE - size) / 2;
            
            ctx.drawImage(
                this.heroImage,
                x + offset,
                y + offset,
                size,
                size
            );
        } else {
            // Fallback emoji si image pas chargée
            ctx.font = `${CONFIG.TILE_SIZE * 0.8}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(
                hero.sprite,
                x + CONFIG.TILE_SIZE / 2,
                y + CONFIG.TILE_SIZE / 2
            );
        }
        
        ctx.restore();
    }
}
```

### 2. Système de Niveaux et Progression

```javascript
// Ajouter à gameState
gameState.progression = {
    currentLevel: 1,
    levelsCompleted: [],
    unlockedAvatars: [1], // Commence avec ber0.png
    totalCrystalsCollected: 0,
    phiAchieved: false,
    bestScores: {}
};

// Sauvegarder/Charger progression
class ProgressionManager {
    static save() {
        localStorage.setItem('berenice_progression', JSON.stringify(gameState.progression));
    }
    
    static load() {
        const saved = localStorage.getItem('berenice_progression');
        if (saved) {
            gameState.progression = JSON.parse(saved);
        }
    }
    
    static unlockNextLevel() {
        const current = gameState.progression.currentLevel;
        if (current < 3 && !gameState.progression.levelsCompleted.includes(current)) {
            gameState.progression.levelsCompleted.push(current);
            gameState.progression.unlockedAvatars.push(current + 1);
            gameState.progression.currentLevel = current + 1;
            this.save();
            return true;
        }
        return false;
    }
}
```

### 3. Menu de Sélection de Niveau

```javascript
// Nouveau : Écran de sélection
function createLevelSelect() {
    const overlay = document.createElement('div');
    overlay.className = 'level-select-overlay';
    overlay.innerHTML = `
        <div class="level-select-container">
            <h2>Choisis ton niveau, Bérénice !</h2>
            <div class="level-cards">
                ${createLevelCard(1, 'La Prairie Magique', 'ber0.png', 'Très Facile')}
                ${createLevelCard(2, 'Le Temple Quantique', 'ber1.png', 'Moyen')}
                ${createLevelCard(3, 'La Citadelle du Chaos', 'ber2.png', 'Difficile')}
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

function createLevelCard(level, title, avatar, difficulty) {
    const unlocked = gameState.progression.unlockedAvatars.includes(level);
    const completed = gameState.progression.levelsCompleted.includes(level);
    
    return `
        <div class="level-card ${unlocked ? 'unlocked' : 'locked'} ${completed ? 'completed' : ''}"
             onclick="${unlocked ? `selectLevel(${level})` : ''}">
            <img src="BALLON_CUBE/PICS_CHARACTERS/${avatar}" 
                 alt="Avatar niveau ${level}"
                 class="level-avatar ${!unlocked ? 'grayscale' : ''}">
            <h3>${title}</h3>
            <p class="difficulty">${difficulty}</p>
            ${completed ? '<span class="completed-badge">✅ Complété</span>' : ''}
            ${!unlocked ? '<span class="locked-badge">🔒 Verrouillé</span>' : ''}
            ${level === 1 && !completed ? '<p class="avatar-comment">😤 "Je déteste ce dessin..."</p>' : ''}
            ${level === 2 && unlocked && !completed ? '<p class="avatar-comment">😊 "C\'est mieux !"</p>' : ''}
            ${level === 3 && unlocked && !completed ? '<p class="avatar-comment">😎 "Badass !"</p>' : ''}
        </div>
    `;
}
```

### 4. CSS pour le Menu

```css
.level-select-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.level-select-container {
    background: white;
    border-radius: 20px;
    padding: 40px;
    max-width: 900px;
    width: 90%;
}

.level-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    margin-top: 30px;
}

.level-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 15px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
}

.level-card.locked {
    opacity: 0.5;
    cursor: not-allowed;
}

.level-card.unlocked:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.level-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-bottom: 15px;
    border: 5px solid white;
}

.level-avatar.grayscale {
    filter: grayscale(100%);
}

.completed-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #4ade80;
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.9em;
}

.locked-badge {
    background: #ef4444;
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.9em;
}

.avatar-comment {
    font-style: italic;
    color: #fbbf24;
    margin-top: 10px;
    font-size: 0.9em;
}
```

### 5. Conditions de Victoire Modifiées

```javascript
// Dans checkVictory()
victory() {
    this.gameRunning = false;
    clearInterval(this.tickInterval);
    
    const timeElapsed = Math.floor((Date.now() - gameState.timeStarted) / 1000);
    const phiBonus = Math.abs(gameState.hero.position.psi - CONFIG.PHI_TARGET) < CONFIG.PHI_TOLERANCE ? 2.0 : 1.0;
    const score = Math.floor((1000 - timeElapsed) * phiBonus);
    
    // Sauvegarder progression
    gameState.progression.totalCrystalsCollected += gameState.crystalsCollected;
    if (phiBonus > 1) {
        gameState.progression.phiAchieved = true;
    }
    
    // Débloquer niveau suivant
    const nextUnlocked = ProgressionManager.unlockNextLevel();
    
    const message = `
        <div style="font-size: 32px; margin-bottom: 20px;">🎉 VICTOIRE! 🎉</div>
        <div>Temps: ${this.formatTime(timeElapsed)}</div>
        <div>Bonus Phi: x${phiBonus}</div>
        <div style="font-size: 28px; margin-top: 20px;">Score: ${score}</div>
        ${nextUnlocked ? `
            <div style="margin-top: 30px; color: #FFD700;">
                ✨ Nouveau niveau débloqué ! ✨<br>
                Tu as grandi, Bérénice !
            </div>
            <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 30px; font-size: 20px; border-radius: 30px;">
                Continuer l'aventure !
            </button>
        ` : ''}
    `;
    
    document.getElementById('gameMessage').innerHTML = message;
    document.getElementById('gameMessage').style.display = 'block';
}
```

## 📋 ORDRE D'IMPLÉMENTATION

1. **Phase 1** : Intégration basique des images
   - [ ] Modifier Renderer pour charger les PNGs
   - [ ] Tester avec ber0.png sur niveau actuel

2. **Phase 2** : Système de progression
   - [ ] Implémenter ProgressionManager
   - [ ] Sauvegarder/charger depuis localStorage
   - [ ] Conditions de déblocage

3. **Phase 3** : Menu de sélection
   - [ ] Créer interface de sélection
   - [ ] Afficher avatars et progression
   - [ ] Gérer les transitions

4. **Phase 4** : Contenu des niveaux 2 et 3
   - [ ] Créer maps spécifiques
   - [ ] Nouvelles mécaniques par niveau
   - [ ] Boss et défis

## 🎯 RÉSULTAT ATTENDU

Bérénice commence avec son avatar "bébé" qu'elle n'aime pas, mais en progressant, elle débloque des avatars plus cool qui reflètent sa croissance en tant que joueuse ET en tant que personnage dans l'histoire !
