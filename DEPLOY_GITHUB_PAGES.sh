#!/bin/bash

echo "🚀 HEROES OF TIME - GitHub Pages Deployment"
echo "==========================================="
echo ""

# Créer le dossier docs pour GitHub Pages
echo "📁 Creating docs folder for GitHub Pages..."
mkdir -p docs

# Copier les fichiers principaux
echo "📋 Copying main files..."
cp index.html docs/index.html
cp MANUEL_DU_JOUEUR_HOT.html docs/manuel.html
cp MANUEL_DU_JOUEUR_HOT.md docs/README.md
cp SPECTATOR_GOD_MODE.html docs/spectator.html
cp SCENARIOS_TEST_RUNNER.html docs/test-runner.html
cp MULTIPLAYER_DEMO_HOMM3.html docs/demo.html
cp HOMM3_PWA_IPAD_CLIPPY.html docs/pwa.html

# Créer un manifest.json pour la PWA
cat > docs/manifest.json << 'EOF'
{
  "name": "Heroes of Time",
  "short_name": "HOT",
  "description": "Manipulez le temps et l'espace dans un univers quantique",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#1a1a2e",
  "theme_color": "#ffd700",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
EOF

# Créer un service worker pour la PWA
cat > docs/sw.js << 'EOF'
const CACHE_NAME = 'hot-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manuel.html',
  '/spectator.html',
  '/test-runner.html',
  '/demo.html',
  '/pwa.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
EOF

# Créer une page d'accueil améliorée
cat > docs/index.html << 'EOF'
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Heroes of Time - Portal</title>
    <link rel="manifest" href="manifest.json">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Courier New', monospace;
            background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 50%, #16213e 100%);
            color: #f0e6d6;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .portal-container {
            max-width: 1200px;
            width: 100%;
            text-align: center;
        }
        
        h1 {
            font-size: 4em;
            color: #ffd700;
            text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
            margin-bottom: 20px;
            animation: glow 2s ease-in-out infinite;
        }
        
        @keyframes glow {
            0%, 100% { text-shadow: 0 0 30px rgba(255, 215, 0, 0.5); }
            50% { text-shadow: 0 0 50px rgba(255, 215, 0, 0.8); }
        }
        
        .subtitle {
            font-size: 1.5em;
            color: #90ee90;
            margin-bottom: 50px;
        }
        
        .portal-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 50px;
        }
        
        .portal-card {
            background: rgba(139, 115, 85, 0.1);
            border: 2px solid #8b7355;
            border-radius: 15px;
            padding: 30px;
            transition: all 0.3s ease;
            cursor: pointer;
            text-decoration: none;
            color: inherit;
        }
        
        .portal-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(255, 215, 0, 0.3);
            background: rgba(139, 115, 85, 0.2);
        }
        
        .portal-icon {
            font-size: 3em;
            margin-bottom: 20px;
        }
        
        .portal-title {
            font-size: 1.5em;
            color: #ffd700;
            margin-bottom: 15px;
        }
        
        .portal-desc {
            color: #d0c0a0;
            line-height: 1.6;
        }
        
        .formula-footer {
            margin-top: 80px;
            padding: 20px;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 10px;
            font-family: monospace;
            color: #00ff00;
        }
    </style>
</head>
<body>
    <div class="portal-container">
        <h1>🔮 HEROES OF TIME 🔮</h1>
        <div class="subtitle">Choisissez votre destinée temporelle</div>
        
        <div class="portal-grid">
            <a href="manuel.html" class="portal-card">
                <div class="portal-icon">📖</div>
                <div class="portal-title">Manuel du Joueur</div>
                <div class="portal-desc">
                    Guide complet avec toutes les formules magiques, 
                    la grammaire temporelle et l'assistant Clippy intégré
                </div>
            </a>
            
            <a href="demo.html" class="portal-card">
                <div class="portal-icon">🎮</div>
                <div class="portal-title">Jouer (Demo)</div>
                <div class="portal-desc">
                    Démo multijoueur inspirée de Heroes of Might & Magic 3
                    avec combat TCG et manipulation temporelle
                </div>
            </a>
            
            <a href="pwa.html" class="portal-card">
                <div class="portal-icon">📱</div>
                <div class="portal-title">Version Mobile</div>
                <div class="portal-desc">
                    PWA optimisée pour iPad avec support tactile complet
                    et assistant Clippy pour aide contextuelle
                </div>
            </a>
            
            <a href="spectator.html" class="portal-card">
                <div class="portal-icon">👁️</div>
                <div class="portal-title">Mode Spectateur</div>
                <div class="portal-desc">
                    Vue God Mode pour observer plusieurs joueurs simultanément
                    avec contrôle temporel et visualisation 6D
                </div>
            </a>
            
            <a href="test-runner.html" class="portal-card">
                <div class="portal-icon">🧪</div>
                <div class="portal-title">Test Runner</div>
                <div class="portal-desc">
                    Exécution automatique de tous les scénarios de test
                    avec validation des formules et mécaniques
                </div>
            </a>
            
            <a href="https://github.com/yourusername/heroes-of-time" class="portal-card">
                <div class="portal-icon">💻</div>
                <div class="portal-title">Code Source</div>
                <div class="portal-desc">
                    Repository GitHub avec backends Rust/Java/Python,
                    documentation complète et guide de contribution
                </div>
            </a>
        </div>
        
        <div class="formula-footer">
            <code>Position(entité) = [X, Y, Z, T, C, Ψ] | Ψ(t) = Ψ₀ × e^(iωt) × R(Δt)</code>
        </div>
    </div>
    
    <script>
        // Register service worker for PWA
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js');
        }
        
        // Easter egg
        let konamiCode = [];
        const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                               'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.key);
            konamiCode = konamiCode.slice(-10);
            
            if (konamiCode.join(',') === konamiSequence.join(',')) {
                document.body.style.animation = 'glow 0.5s infinite';
                alert("🎮 GROEKEN MODE ACTIVATED! You now have access to the Interstice!");
            }
        });
    </script>
</body>
</html>
EOF

echo ""
echo "✅ GitHub Pages structure created in 'docs/' folder!"
echo ""
echo "📝 Next steps:"
echo "1. git add docs/"
echo "2. git commit -m 'Add GitHub Pages site'"
echo "3. git push"
echo "4. Go to Settings > Pages > Source: Deploy from branch"
echo "5. Select: main branch / docs folder"
echo "6. Your site will be available at:"
echo "   https://[username].github.io/[repo-name]/"
echo ""
echo "🎮 Available pages:"
echo "  / or /index.html    - Portal page"
echo "  /manuel.html        - Player manual with formulas"
echo "  /demo.html          - Playable demo"
echo "  /pwa.html           - Mobile PWA version"
echo "  /spectator.html     - God mode spectator view"
echo "  /test-runner.html   - Automated test scenarios"
echo ""
echo "🚀 Ready for deployment!"
