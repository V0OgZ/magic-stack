// 🎮 SPA Navigation pour Heroes of Time
// Reste sur heroesoftime.online, navigation type app

window.HOT_Navigation = {
  originalContent: null,
  currentGame: null,
  history: [],

  // Sauvegarder le contenu original
  init() {
    if (!this.originalContent) {
      this.originalContent = document.body.innerHTML;
    }
  },

  // Charger un jeu dans un iframe
  loadGame(url, title) {
    this.init();
    this.history.push(window.location.href);
    
    // Créer le container
    const container = document.createElement('div');
    container.id = 'hot-game-container';
    container.style.cssText = 'width:100vw; height:100vh; position:fixed; top:0; left:0; z-index:9999; background:#0a0e1a;';
    
    // Barre de navigation
    const navbar = document.createElement('div');
    navbar.style.cssText = 'position:fixed; top:0; left:0; right:0; height:50px; background:rgba(0,0,0,0.9); border-bottom:2px solid #d4af37; z-index:10000; display:flex; align-items:center; padding:0 20px;';
    
    // Bouton retour
    const backBtn = document.createElement('button');
    backBtn.innerHTML = '← Retour au Menu';
    backBtn.style.cssText = 'background:#d4af37; color:#000; border:none; padding:8px 16px; border-radius:5px; font-weight:bold; cursor:pointer; font-size:14px;';
    backBtn.onclick = () => this.goBack();
    
    // Titre du jeu
    const gameTitle = document.createElement('span');
    gameTitle.innerHTML = title || 'Heroes of Time';
    gameTitle.style.cssText = 'color:#d4af37; margin-left:20px; font-size:18px; font-weight:bold;';
    
    // Bouton plein écran
    const fullscreenBtn = document.createElement('button');
    fullscreenBtn.innerHTML = '⛶ Plein écran';
    fullscreenBtn.style.cssText = 'background:#d4af37; color:#000; border:none; padding:8px 16px; border-radius:5px; font-weight:bold; cursor:pointer; font-size:14px; margin-left:auto;';
    fullscreenBtn.onclick = () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        container.requestFullscreen();
      }
    };
    
    navbar.appendChild(backBtn);
    navbar.appendChild(gameTitle);
    navbar.appendChild(fullscreenBtn);
    
    // Iframe pour le jeu
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.cssText = 'width:100%; height:calc(100% - 50px); margin-top:50px; border:none;';
    iframe.id = 'hot-game-iframe';
    
    // Assembler
    container.appendChild(navbar);
    container.appendChild(iframe);
    
    // Remplacer le contenu
    document.body.innerHTML = '';
    document.body.appendChild(container);
    
    this.currentGame = url;
    
    // Intercepter le bouton back du browser
    window.history.pushState({game: url}, title, '#game');
    
    return false; // Empêcher la navigation normale
  },

  // Retour au menu principal
  goBack() {
    if (this.originalContent) {
      document.body.innerHTML = this.originalContent;
      this.currentGame = null;
      window.history.back();
      
      // Réattacher les event listeners
      this.attachListeners();
    }
  },

  // Attacher les listeners aux boutons
  attachListeners() {
    // Sélectionner tous les liens de jeu
    const gameLinks = document.querySelectorAll('a[href*=".html"]');
    
    gameLinks.forEach(link => {
      // Seulement pour les liens de jeu (pas les docs)
      if (link.href.includes('HOT_GAME') || 
          link.href.includes('IA_VS_IA') || 
          link.href.includes('MULTIPLAYER') ||
          link.href.includes('MEGA_EDITOR') ||
          link.href.includes('world-editor') ||
          link.href.includes('SPECTATOR') ||
          link.href.includes('WORKFLOW')) {
        
        link.onclick = (e) => {
          e.preventDefault();
          const title = link.innerText.split('\n')[0]; // Prendre la première ligne
          this.loadGame(link.href, title);
          return false;
        };
      }
    });
  }
};

// Écouter le bouton back du browser
window.addEventListener('popstate', (e) => {
  if (!e.state || !e.state.game) {
    HOT_Navigation.goBack();
  }
});

// Auto-init au chargement
document.addEventListener('DOMContentLoaded', () => {
  HOT_Navigation.init();
  HOT_Navigation.attachListeners();
});
