#!/bin/bash

# 🗂️ Script d'organisation des démos HTML
# Créé le 10/12/2024

echo "🗂️ Organisation des démos HTML..."

# Créer la structure de dossiers
mkdir -p demos/game
mkdir -p demos/tools
mkdir -p demos/multiplayer
mkdir -p demos/experimental
mkdir -p archive

# Déplacer les fichiers principaux dans demos/
echo "📁 Déplacement des démos principales..."

# Jeux principaux
[ -f "HOT_GAME_UNIFIED.html" ] && cp HOT_GAME_UNIFIED.html demos/game/
[ -f "CHASSE_TEMPORELLE_MEGA_MAP.html" ] && cp CHASSE_TEMPORELLE_MEGA_MAP.html demos/game/
[ -f "HOMM3_PWA_IPAD_CLIPPY.html" ] && cp HOMM3_PWA_IPAD_CLIPPY.html demos/game/

# Outils
[ -f "API_EXPLORER_COMPLETE.html" ] && cp API_EXPLORER_COMPLETE.html demos/tools/
[ -f "VECTOR_DB_EXPLORER_UI.html" ] && cp VECTOR_DB_EXPLORER_UI.html demos/tools/
[ -f "VECTOR_DB_EXPLORER.html" ] && cp VECTOR_DB_EXPLORER.html demos/tools/

# Multijoueur
[ -f "MULTIPLAYER_DEMO_HOMM3.html" ] && cp MULTIPLAYER_DEMO_HOMM3.html demos/multiplayer/

# Expérimental
[ -f "IA_VS_IA_AUTOPLAY.html" ] && cp IA_VS_IA_AUTOPLAY.html demos/experimental/
[ -f "SPECTATOR_GOD_MODE.html" ] && cp SPECTATOR_GOD_MODE.html demos/experimental/

# Archiver les vieux fichiers
echo "🗄️ Archivage des fichiers obsolètes..."
[ -f "WORLD_EDITOR.html" ] && mv WORLD_EDITOR.html archive/
[ -f "TEST_WEBSOCKET.html" ] && mv TEST_WEBSOCKET.html archive/
[ -f "SCENARIOS_TEST_RUNNER.html" ] && mv SCENARIOS_TEST_RUNNER.html archive/

# Créer un index HTML pour les démos
cat > demos/index.html << 'EOF'
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎮 Magic Stack - Démos</title>
    <style>
        body {
            background: linear-gradient(135deg, #0a0e1a 0%, #1a1d3a 100%);
            color: #e8ecff;
            font-family: 'Inter', -apple-system, sans-serif;
            padding: 40px;
            margin: 0;
            min-height: 100vh;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        h1 {
            text-align: center;
            font-size: 3em;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 40px;
        }
        .category {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 30px;
        }
        .category h2 {
            color: #667eea;
            margin-bottom: 20px;
        }
        .demos {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }
        .demo-card {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(102, 126, 234, 0.3);
            border-radius: 8px;
            padding: 20px;
            transition: all 0.3s;
            cursor: pointer;
            text-decoration: none;
            color: inherit;
        }
        .demo-card:hover {
            background: rgba(102, 126, 234, 0.1);
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }
        .demo-card h3 {
            margin: 0 0 10px 0;
            color: #a0aec0;
        }
        .demo-card p {
            margin: 0;
            font-size: 14px;
            color: #718096;
        }
        .status {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 11px;
            margin-top: 10px;
        }
        .status.active { background: rgba(72, 187, 120, 0.2); color: #48bb78; }
        .status.legacy { background: rgba(237, 137, 54, 0.2); color: #ed8936; }
        .status.experimental { background: rgba(159, 122, 234, 0.2); color: #9f7aea; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎮 Magic Stack - Démos</h1>
        
        <div class="category">
            <h2>🎯 Jeux Principaux</h2>
            <div class="demos">
                <a href="game/HOT_GAME_UNIFIED.html" class="demo-card">
                    <h3>🎮 Heroes of Time</h3>
                    <p>Le jeu principal unifié</p>
                    <span class="status active">Active</span>
                </a>
                <a href="game/CHASSE_TEMPORELLE_MEGA_MAP.html" class="demo-card">
                    <h3>🗺️ Chasse Temporelle</h3>
                    <p>Mode aventure 120x120</p>
                    <span class="status active">Active</span>
                </a>
                <a href="game/HOMM3_PWA_IPAD_CLIPPY.html" class="demo-card">
                    <h3>📱 PWA iPad</h3>
                    <p>Version mobile optimisée</p>
                    <span class="status active">Active</span>
                </a>
            </div>
        </div>
        
        <div class="category">
            <h2>🛠️ Outils</h2>
            <div class="demos">
                <a href="tools/API_EXPLORER_COMPLETE.html" class="demo-card">
                    <h3>🔍 API Explorer</h3>
                    <p>Test toutes les APIs</p>
                    <span class="status active">Active</span>
                </a>
                <a href="tools/VECTOR_DB_EXPLORER_UI.html" class="demo-card">
                    <h3>🔮 Vector DB UI</h3>
                    <p>Interface Vector DB</p>
                    <span class="status active">Active</span>
                </a>
                <a href="../apps/world-editor/" class="demo-card">
                    <h3>🗺️ World Editor</h3>
                    <p>Nouvel éditeur React</p>
                    <span class="status active">React App</span>
                </a>
            </div>
        </div>
        
        <div class="category">
            <h2>🎮 Multijoueur & Expérimental</h2>
            <div class="demos">
                <a href="multiplayer/MULTIPLAYER_DEMO_HOMM3.html" class="demo-card">
                    <h3>👥 Multiplayer Demo</h3>
                    <p>Test synchronisation</p>
                    <span class="status experimental">Experimental</span>
                </a>
                <a href="experimental/IA_VS_IA_AUTOPLAY.html" class="demo-card">
                    <h3>🤖 IA vs IA</h3>
                    <p>Combat automatique</p>
                    <span class="status experimental">Experimental</span>
                </a>
                <a href="experimental/SPECTATOR_GOD_MODE.html" class="demo-card">
                    <h3>👁️ God Mode</h3>
                    <p>Vue omnisciente</p>
                    <span class="status experimental">Experimental</span>
                </a>
            </div>
        </div>
    </div>
</body>
</html>
EOF

echo "✅ Organisation terminée !"
echo ""
echo "📊 Résumé :"
echo "  - Démos principales → demos/"
echo "  - Fichiers obsolètes → archive/"
echo "  - Index créé → demos/index.html"
echo ""
echo "🚀 Pour voir les démos : open demos/index.html"
