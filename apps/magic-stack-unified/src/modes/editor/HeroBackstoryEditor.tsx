import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HEROES } from '../../data/heroes';

interface HeroBackstory {
  hero_id: string;
  name: string;
  title: string;
  backstory: string;
  personality_traits: string[];
  speaking_style: string;
  motivations: string[];
  fears: string[];
  special_memories: string[];
  relationships: Record<string, string>;
  combat_style: string;
  quantum_signature: string;
  temporal_affinity: string;
  custom_prompts: string[];
}

interface VectorDBStatus {
  connected: boolean;
  endpoint: string;
  collection: string;
}

export const HeroBackstoryEditor: React.FC = () => {
  const [selectedHero, setSelectedHero] = useState<string>('alice');
  const [backstory, setBackstory] = useState<HeroBackstory | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [vectorDBStatus, setVectorDBStatus] = useState<VectorDBStatus>({
    connected: false,
    endpoint: 'http://localhost:5001',
    collection: 'hero_backstories'
  });
  const [showPreview, setShowPreview] = useState(false);
  const [generatedDialogue, setGeneratedDialogue] = useState<string>('');

  // Load backstory when hero changes
  useEffect(() => {
    loadBackstory(selectedHero);
    checkVectorDBConnection();
  }, [selectedHero]);

  const checkVectorDBConnection = async () => {
    try {
      const response = await fetch(`${vectorDBStatus.endpoint}/health`);
      if (response.ok) {
        setVectorDBStatus(prev => ({ ...prev, connected: true }));
      }
    } catch (error) {
      setVectorDBStatus(prev => ({ ...prev, connected: false }));
    }
  };

  const loadBackstory = async (heroId: string) => {
    // Try to load from vector DB first
    if (vectorDBStatus.connected) {
      try {
        const response = await fetch(`${vectorDBStatus.endpoint}/backstory/${heroId}`);
        if (response.ok) {
          const data = await response.json();
          setBackstory(data);
          return;
        }
      } catch (error) {
        console.error('Failed to load from vector DB:', error);
      }
    }

    // Fallback to default backstory
    const hero = HEROES[heroId];
    if (hero) {
      setBackstory({
        hero_id: heroId,
        name: hero.name,
        title: hero.title,
        backstory: hero.description || '',
        personality_traits: [
          'Courageux',
          'Déterminé',
          'Mystérieux'
        ],
        speaking_style: 'Formel et éloquent',
        motivations: [
          'Sauver le multivers',
          'Découvrir la vérité'
        ],
        fears: [
          'Les paradoxes temporels',
          'Perdre ses alliés'
        ],
        special_memories: [
          'La première rencontre avec le Nexus',
          'La bataille de la Convergence'
        ],
        relationships: {
          vincent: 'Allié de confiance',
          morgana: 'Rivale respectée'
        },
        combat_style: 'Stratégique et calculé',
        quantum_signature: 'Ψ = 0.85',
        temporal_affinity: 'Passé et Futur',
        custom_prompts: []
      });
    }
  };

  const saveBackstory = async () => {
    if (!backstory) return;
    setIsSaving(true);

    try {
      if (vectorDBStatus.connected) {
        // Save to vector DB
        const response = await fetch(`${vectorDBStatus.endpoint}/backstory`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(backstory)
        });

        if (response.ok) {
          // Also index for semantic search
          await fetch(`${vectorDBStatus.endpoint}/index`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              collection: 'hero_backstories',
              document: backstory,
              embedding_fields: ['backstory', 'personality_traits', 'speaking_style']
            })
          });
        }
      } else {
        // Save to localStorage as fallback
        localStorage.setItem(`hero_backstory_${backstory.hero_id}`, JSON.stringify(backstory));
      }

      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save backstory:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const generateDialogue = async () => {
    if (!backstory) return;

    const prompt = `
Tu es ${backstory.name}, ${backstory.title}.

BACKSTORY:
${backstory.backstory}

PERSONNALITÉ:
${backstory.personality_traits.join(', ')}

STYLE DE PAROLE:
${backstory.speaking_style}

MOTIVATIONS:
${backstory.motivations.join(', ')}

PEURS:
${backstory.fears.join(', ')}

SOUVENIRS IMPORTANTS:
${backstory.special_memories.join('\n')}

Génère une réplique typique de ce personnage dans une situation de combat.
    `;

    try {
      // Try Clippy Dev API first
      const response = await fetch('http://localhost:5002/character/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          character_prompt: prompt,
          context: 'Combat contre un dragon quantique',
          max_tokens: 150
        })
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedDialogue(data.dialogue);
      }
    } catch (error) {
      // Fallback to simple generation
      setGeneratedDialogue(`"Par le Nexus ! Ce dragon ne passera pas tant que je tiendrai cette épée !"`);
    }

    setShowPreview(true);
  };

  const exportToPrompt = () => {
    if (!backstory) return;

    const prompt = `
# ${backstory.name} - ${backstory.title}

## Backstory
${backstory.backstory}

## Personnalité
- Traits: ${backstory.personality_traits.join(', ')}
- Style de parole: ${backstory.speaking_style}
- Style de combat: ${backstory.combat_style}

## Motivations
${backstory.motivations.map(m => `- ${m}`).join('\n')}

## Peurs
${backstory.fears.map(f => `- ${f}`).join('\n')}

## Souvenirs Clés
${backstory.special_memories.map(m => `- ${m}`).join('\n')}

## Relations
${Object.entries(backstory.relationships).map(([k, v]) => `- ${k}: ${v}`).join('\n')}

## Signature Quantique
- Coefficient Ψ: ${backstory.quantum_signature}
- Affinité Temporelle: ${backstory.temporal_affinity}

## Prompts Personnalisés
${backstory.custom_prompts.join('\n')}
    `;

    // Copy to clipboard
    navigator.clipboard.writeText(prompt);
    alert('Prompt copié dans le presse-papier !');
  };

  if (!backstory) return <div>Chargement...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-indigo-900 p-4">
      {/* Header */}
      <div className="bg-black/60 rounded-lg p-6 mb-6 border-2 border-purple-500">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
          📝 Éditeur de Backstory des Héros
        </h1>
        
        {/* Hero Selector */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-white">Héros:</span>
          <select
            value={selectedHero}
            onChange={(e) => setSelectedHero(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-purple-500"
          >
            {Object.values(HEROES).map(hero => (
              <option key={hero.id} value={hero.id}>
                {hero.icon_id} {hero.name} - {hero.title}
              </option>
            ))}
          </select>
          
          {/* DB Status */}
          <div className="ml-auto flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${vectorDBStatus.connected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
            <span className="text-sm text-gray-400">
              Vector DB: {vectorDBStatus.connected ? 'Connecté' : 'Local Storage'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:scale-105 transition-all"
          >
            {isEditing ? '👁️ Aperçu' : '✏️ Éditer'}
          </button>
          
          {isEditing && (
            <button
              onClick={saveBackstory}
              disabled={isSaving}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:scale-105 transition-all disabled:opacity-50"
            >
              {isSaving ? '⏳ Sauvegarde...' : '💾 Sauvegarder'}
            </button>
          )}
          
          <button
            onClick={generateDialogue}
            className="px-4 py-2 bg-gradient-to-r from-pink-600 to-red-600 text-white rounded-lg hover:scale-105 transition-all"
          >
            🎭 Tester Dialogue
          </button>
          
          <button
            onClick={exportToPrompt}
            className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-lg hover:scale-105 transition-all"
          >
            📋 Exporter Prompt
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Panel */}
        <motion.div
          className="bg-black/60 rounded-lg p-6 border-2 border-purple-500"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-2xl font-bold text-purple-400 mb-4">
            {isEditing ? '✏️ Mode Édition' : '📖 Backstory'}
          </h2>

          {/* Backstory Text */}
          <div className="mb-6">
            <label className="block text-white mb-2">Histoire:</label>
            {isEditing ? (
              <textarea
                value={backstory.backstory}
                onChange={(e) => setBackstory({ ...backstory, backstory: e.target.value })}
                className="w-full h-40 bg-gray-800 text-white p-3 rounded-lg border border-purple-500"
                placeholder="L'histoire du héros..."
              />
            ) : (
              <div className="bg-gray-800/50 p-4 rounded-lg text-gray-300">
                {backstory.backstory || 'Aucune histoire définie'}
              </div>
            )}
          </div>

          {/* Personality Traits */}
          <div className="mb-6">
            <label className="block text-white mb-2">Traits de Personnalité:</label>
            {isEditing ? (
              <div className="space-y-2">
                {backstory.personality_traits.map((trait, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      value={trait}
                      onChange={(e) => {
                        const newTraits = [...backstory.personality_traits];
                        newTraits[i] = e.target.value;
                        setBackstory({ ...backstory, personality_traits: newTraits });
                      }}
                      className="flex-1 bg-gray-800 text-white p-2 rounded-lg border border-purple-500"
                    />
                    <button
                      onClick={() => {
                        const newTraits = backstory.personality_traits.filter((_, idx) => idx !== i);
                        setBackstory({ ...backstory, personality_traits: newTraits });
                      }}
                      className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      ❌
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setBackstory({
                      ...backstory,
                      personality_traits: [...backstory.personality_traits, '']
                    });
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  ➕ Ajouter Trait
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {backstory.personality_traits.map((trait, i) => (
                  <span key={i} className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded-full">
                    {trait}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Speaking Style */}
          <div className="mb-6">
            <label className="block text-white mb-2">Style de Parole:</label>
            {isEditing ? (
              <input
                value={backstory.speaking_style}
                onChange={(e) => setBackstory({ ...backstory, speaking_style: e.target.value })}
                className="w-full bg-gray-800 text-white p-3 rounded-lg border border-purple-500"
                placeholder="Comment le héros s'exprime..."
              />
            ) : (
              <div className="bg-gray-800/50 p-3 rounded-lg text-gray-300">
                {backstory.speaking_style}
              </div>
            )}
          </div>

          {/* Combat Style */}
          <div className="mb-6">
            <label className="block text-white mb-2">Style de Combat:</label>
            {isEditing ? (
              <input
                value={backstory.combat_style}
                onChange={(e) => setBackstory({ ...backstory, combat_style: e.target.value })}
                className="w-full bg-gray-800 text-white p-3 rounded-lg border border-purple-500"
                placeholder="Approche au combat..."
              />
            ) : (
              <div className="bg-gray-800/50 p-3 rounded-lg text-gray-300">
                {backstory.combat_style}
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Panel */}
        <motion.div
          className="bg-black/60 rounded-lg p-6 border-2 border-purple-500"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {/* Motivations & Fears */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-purple-400 mb-3">🎯 Motivations & Peurs</h3>
            
            <div className="mb-4">
              <label className="block text-white mb-2">Motivations:</label>
              {isEditing ? (
                <div className="space-y-2">
                  {backstory.motivations.map((mot, i) => (
                    <input
                      key={i}
                      value={mot}
                      onChange={(e) => {
                        const newMot = [...backstory.motivations];
                        newMot[i] = e.target.value;
                        setBackstory({ ...backstory, motivations: newMot });
                      }}
                      className="w-full bg-gray-800 text-white p-2 rounded-lg border border-purple-500"
                    />
                  ))}
                </div>
              ) : (
                <ul className="list-disc list-inside text-gray-300">
                  {backstory.motivations.map((mot, i) => (
                    <li key={i}>{mot}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Peurs:</label>
              {isEditing ? (
                <div className="space-y-2">
                  {backstory.fears.map((fear, i) => (
                    <input
                      key={i}
                      value={fear}
                      onChange={(e) => {
                        const newFears = [...backstory.fears];
                        newFears[i] = e.target.value;
                        setBackstory({ ...backstory, fears: newFears });
                      }}
                      className="w-full bg-gray-800 text-white p-2 rounded-lg border border-purple-500"
                    />
                  ))}
                </div>
              ) : (
                <ul className="list-disc list-inside text-gray-300">
                  {backstory.fears.map((fear, i) => (
                    <li key={i}>{fear}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Quantum Signature */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-purple-400 mb-3">🌀 Signature Quantique</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">Coefficient Ψ:</label>
                {isEditing ? (
                  <input
                    value={backstory.quantum_signature}
                    onChange={(e) => setBackstory({ ...backstory, quantum_signature: e.target.value })}
                    className="w-full bg-gray-800 text-white p-2 rounded-lg border border-purple-500"
                  />
                ) : (
                  <div className="bg-purple-600/30 p-2 rounded-lg text-purple-300 text-center">
                    {backstory.quantum_signature}
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-white mb-2">Affinité Temporelle:</label>
                {isEditing ? (
                  <input
                    value={backstory.temporal_affinity}
                    onChange={(e) => setBackstory({ ...backstory, temporal_affinity: e.target.value })}
                    className="w-full bg-gray-800 text-white p-2 rounded-lg border border-purple-500"
                  />
                ) : (
                  <div className="bg-cyan-600/30 p-2 rounded-lg text-cyan-300 text-center">
                    {backstory.temporal_affinity}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Special Memories */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-purple-400 mb-3">💭 Souvenirs Importants</h3>
            {isEditing ? (
              <div className="space-y-2">
                {backstory.special_memories.map((memory, i) => (
                  <textarea
                    key={i}
                    value={memory}
                    onChange={(e) => {
                      const newMemories = [...backstory.special_memories];
                      newMemories[i] = e.target.value;
                      setBackstory({ ...backstory, special_memories: newMemories });
                    }}
                    className="w-full h-20 bg-gray-800 text-white p-2 rounded-lg border border-purple-500"
                  />
                ))}
                <button
                  onClick={() => {
                    setBackstory({
                      ...backstory,
                      special_memories: [...backstory.special_memories, '']
                    });
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  ➕ Ajouter Souvenir
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {backstory.special_memories.map((memory, i) => (
                  <div key={i} className="bg-gray-800/50 p-3 rounded-lg text-gray-300 italic">
                    "{memory}"
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Custom Prompts */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-purple-400 mb-3">🤖 Prompts IA Personnalisés</h3>
            {isEditing ? (
              <div className="space-y-2">
                {backstory.custom_prompts.map((prompt, i) => (
                  <textarea
                    key={i}
                    value={prompt}
                    onChange={(e) => {
                      const newPrompts = [...backstory.custom_prompts];
                      newPrompts[i] = e.target.value;
                      setBackstory({ ...backstory, custom_prompts: newPrompts });
                    }}
                    className="w-full h-20 bg-gray-800 text-white p-2 rounded-lg border border-purple-500 font-mono text-sm"
                    placeholder="Instruction spéciale pour l'IA..."
                  />
                ))}
                <button
                  onClick={() => {
                    setBackstory({
                      ...backstory,
                      custom_prompts: [...backstory.custom_prompts, '']
                    });
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  ➕ Ajouter Prompt
                </button>
              </div>
            ) : (
              backstory.custom_prompts.length > 0 ? (
                <div className="space-y-2">
                  {backstory.custom_prompts.map((prompt, i) => (
                    <div key={i} className="bg-gray-800/50 p-3 rounded-lg text-green-400 font-mono text-sm">
                      {prompt}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 italic">Aucun prompt personnalisé</div>
              )
            )}
          </div>
        </motion.div>
      </div>

      {/* Dialogue Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              className="bg-gradient-to-br from-purple-900 to-black border-2 border-purple-500 rounded-lg p-8 max-w-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-purple-400 mb-4">
                🎭 Dialogue Généré
              </h3>
              
              <div className="bg-black/50 rounded-lg p-6 mb-4">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{HEROES[selectedHero].icon_id}</div>
                  <div>
                    <div className="text-white font-bold mb-2">
                      {backstory.name}
                    </div>
                    <div className="text-gray-300 italic text-lg">
                      {generatedDialogue}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-400 mb-4">
                <div>Style: {backstory.speaking_style}</div>
                <div>Personnalité: {backstory.personality_traits.join(', ')}</div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={generateDialogue}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  🔄 Régénérer
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroBackstoryEditor;
