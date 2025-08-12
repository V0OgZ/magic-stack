/**
 * 🎮 Magic Stack Unified - Application principale
 * Un seul code pour le jeu ET l'éditeur
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GameView } from './modes/game/GameView';
import { EditorView } from './modes/editor/EditorView';
import { ChasseView } from './modes/chasse/ChasseView';
import { HomePage } from './pages/HomePage';
import { StartTCG } from './pages/StartTCG';
import { MultiplayerMode } from './modes/multiplayer/MultiplayerMode';
import { AIBattleAutoplay } from './modes/ai-battle/AIBattleAutoplay';
import { SpectatorGodMode } from './modes/spectator/SpectatorGodMode';
import { HeroBackstoryEditor } from './modes/editor/HeroBackstoryEditor';
import { UnifiedMapSystem } from './modes/unified/UnifiedMapSystem';
import AIBattleWrapper from './modes/combat/AIBattleWrapper';
import ChasseMegaMapWrapper from './modes/chasse/ChasseMegaMapWrapper';

const queryClient = new QueryClient();

export function App(): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="app-container" style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1d3a 100%)',
          color: '#e8ecff',
        }}>
          <Routes>
            {/* Page d'accueil */}
            <Route path="/" element={<HomePage />} />
            
            {/* Modes de jeu */}
            <Route path="/game/*" element={<GameView />} />
            <Route path="/editor/*" element={<EditorView />} />
            <Route path="/chasse/*" element={<ChasseView />} />
            
            {/* Nouveaux modes intégrés */}
            <Route path="/multiplayer" element={<MultiplayerMode />} />
            <Route path="/ai-battle" element={<AIBattleAutoplay />} />
            <Route path="/spectator" element={<SpectatorGodMode />} />
            <Route path="/backstory-editor" element={<HeroBackstoryEditor />} />
            
            {/* 🎮 UNIFIED MAP SYSTEM - L'ÉDITEUR EST LE JEU ! */}
            <Route path="/unified" element={<UnifiedMapSystem />} />
            
            {/* 🤖 COMBAT IA vs IA avec connexion V2 */}
            <Route path="/combat" element={<AIBattleWrapper />} />
            <Route path="/start-tcg" element={<StartTCG />} />
            
            {/* ⚔️ CHASSE TEMPORELLE MEGA MAP 6x6 */}
            <Route path="/chasse-mega" element={<ChasseMegaMapWrapper />} />
            
            {/* Autres pages */}
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}



// Pages temporaires
function SettingsPage(): React.ReactElement {
  return (
    <div style={{ padding: 40 }}>
      <h1>⚙️ Paramètres</h1>
      <Link to="/">← Retour</Link>
    </div>
  );
}

function AboutPage(): React.ReactElement {
  return (
    <div style={{ padding: 40 }}>
      <h1>📖 À propos</h1>
      <p>Magic Stack Unified - Architecture React unifiée</p>
      <p>Claude Nexus - Intégrateur des Tréfonds d'Avalon</p>
      <Link to="/">← Retour</Link>
    </div>
  );
}

export default App;
