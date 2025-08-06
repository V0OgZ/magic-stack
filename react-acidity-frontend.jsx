// 🧪⚡ FRONTEND REACT - SYSTÈME D'ACIDITÉ DR. STONE ⚡🧪
// Interface pour le pote prof de chimie dev React
// Intégration complète avec AcidityMagicSystem

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AcidityMagicSystem from './api-acidity-system.js';

// 🎨 COMPOSANT PRINCIPAL
const DrStoneAcidityLab = () => {
    const [acidSystem] = useState(new AcidityMagicSystem());
    const [selectedAcid, setSelectedAcid] = useState(null);
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [reactionResult, setReactionResult] = useState(null);
    const [playerInventory, setPlayerInventory] = useState(new Map());
    const [gameMode, setGameMode] = useState('casual'); // casual, scientific, hardcore
    const [animationEffects, setAnimationEffects] = useState([]);

    // 🔬 DONNÉES RÉACTIVES
    const [substances, setSubstances] = useState([]);
    const [availableAcids, setAvailableAcids] = useState([]);
    const [availableMaterials, setAvailableMaterials] = useState([]);

    // 📊 INITIALISATION
    useEffect(() => {
        const allSubstances = acidSystem.getAllSubstances();
        setSubstances(allSubstances);
        
        const acids = allSubstances.filter(s => s.type === 'acid');
        const materials = allSubstances.filter(s => s.type.includes('material'));
        
        setAvailableAcids(acids);
        setAvailableMaterials(materials);
        
        // Inventaire de départ
        const startingInventory = new Map([
            ['CH3COOH', 10], // Vinaigre
            ['limestone', 20], // Calcaire
            ['iron_oxide', 15] // Rouille
        ]);
        setPlayerInventory(startingInventory);
    }, [acidSystem]);

    // ⚗️ EXÉCUTER UNE DISSOLUTION
    const executeDissolution = useCallback(async () => {
        if (!selectedAcid || !selectedMaterial) {
            alert('Sélectionne un acide ET un matériau !');
            return;
        }

        // Vérifier l'inventaire
        const acidQuantity = playerInventory.get(selectedAcid.id) || 0;
        if (acidQuantity < 1) {
            alert(`Pas assez de ${selectedAcid.name} !`);
            return;
        }

        // Exécuter la réaction
        const result = acidSystem.executeDissolution('player1', selectedAcid.id, selectedMaterial.id, 1);
        setReactionResult(result);

        // Animations d'effets
        if (result.success && result.gameEffect) {
            setAnimationEffects(result.gameEffect);
            setTimeout(() => setAnimationEffects([]), 3000);
        }

        // Mettre à jour l'inventaire
        if (result.success) {
            const newInventory = new Map(playerInventory);
            
            // Consommer l'acide
            Object.entries(result.consumed).forEach(([id, qty]) => {
                const current = newInventory.get(id) || 0;
                newInventory.set(id, Math.max(0, current - qty));
            });
            
            // Ajouter les produits
            result.produced.forEach(product => {
                const current = newInventory.get(product.id) || 0;
                newInventory.set(product.id, current + product.quantity);
            });
            
            setPlayerInventory(newInventory);
        }
    }, [selectedAcid, selectedMaterial, playerInventory, acidSystem]);

    // 🎮 COMPOSANTS UI

    // Sélecteur d'acide
    const AcidSelector = () => (
        <motion.div className="acid-selector" layout>
            <h3>🧪 Sélectionne ton Acide</h3>
            <div className="substance-grid">
                {availableAcids.map(acid => (
                    <motion.div
                        key={acid.id}
                        className={`substance-card acid ${selectedAcid?.id === acid.id ? 'selected' : ''}`}
                        onClick={() => setSelectedAcid(acid)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="formula">{acid.formula}</div>
                        <div className="name">{acid.name}</div>
                        <div className="ph-indicator">
                            <span className="ph-label">pH: </span>
                            <span className={`ph-value ${getPHColorClass(acid.pH)}`}>
                                {acid.pH}
                            </span>
                        </div>
                        <div className="inventory-count">
                            Stock: {playerInventory.get(acid.id) || 0}
                        </div>
                        {gameMode === 'scientific' && (
                            <div className="scientific-info">
                                <div className="strength">Force: {acid.strength}</div>
                                <div className="real-world">{acid.realWorld}</div>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );

    // Sélecteur de matériau
    const MaterialSelector = () => (
        <motion.div className="material-selector" layout>
            <h3>⛏️ Matériau à Dissoudre</h3>
            <div className="substance-grid">
                {availableMaterials.map(material => (
                    <motion.div
                        key={material.id}
                        className={`substance-card material ${selectedMaterial?.id === material.id ? 'selected' : ''}`}
                        onClick={() => setSelectedMaterial(material)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="formula">{material.formula}</div>
                        <div className="name">{material.name}</div>
                        <div className="value">Valeur: {material.value}</div>
                        <div className="inventory-count">
                            Stock: {playerInventory.get(material.id) || 0}
                        </div>
                        {gameMode === 'scientific' && (
                            <div className="scientific-info">
                                <div className="dissolves-in">
                                    Dissout dans: {material.dissolvesIn?.join(', ') || 'Aucun'}
                                </div>
                                <div className="yields">
                                    Produit: {material.yields?.join(', ') || 'Rien'}
                                </div>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );

    // Zone de réaction
    const ReactionZone = () => (
        <motion.div className="reaction-zone" layout>
            <h3>⚗️ Zone de Réaction</h3>
            
            {/* Prédiction de réaction */}
            {selectedAcid && selectedMaterial && (
                <motion.div 
                    className="reaction-preview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="reactants">
                        <span className="acid">{selectedAcid.formula}</span>
                        <span className="plus"> + </span>
                        <span className="material">{selectedMaterial.formula}</span>
                    </div>
                    
                    <div className="compatibility">
                        {acidSystem.canDissolve(selectedAcid.id, selectedMaterial.id) ? (
                            <div className="compatible">
                                ✅ Réaction possible !
                                <div className="efficiency">
                                    Efficacité: {Math.round(acidSystem.calculateDissolutionEfficiency(selectedAcid.id, selectedMaterial.id) * 100)}%
                                </div>
                            </div>
                        ) : (
                            <div className="incompatible">
                                ❌ Pas de réaction
                                <div className="reason">pH incompatible</div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}

            {/* Bouton de réaction */}
            <motion.button
                className="reaction-button"
                onClick={executeDissolution}
                disabled={!selectedAcid || !selectedMaterial || !acidSystem.canDissolve(selectedAcid?.id, selectedMaterial?.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {gameMode === 'hardcore' ? '⊙(Δt+2 ⟶ DISSOLVE())' : 'Lancer la Réaction !'}
            </motion.button>

            {/* Effets d'animation */}
            <AnimatePresence>
                {animationEffects.length > 0 && (
                    <motion.div 
                        className="reaction-effects"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        {animationEffects.map((effect, index) => (
                            <motion.div
                                key={index}
                                className={`effect ${effect.toLowerCase()}`}
                                animate={{ 
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{ 
                                    duration: 0.5,
                                    repeat: 3
                                }}
                            >
                                {getEffectEmoji(effect)}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );

    // Résultat de la réaction
    const ReactionResult = () => (
        <AnimatePresence>
            {reactionResult && (
                <motion.div
                    className="reaction-result"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                >
                    <h3>📊 Résultat de la Réaction</h3>
                    
                    {reactionResult.success ? (
                        <div className="success-result">
                            <div className="efficiency-bar">
                                <div className="label">Efficacité: {reactionResult.efficiency}%</div>
                                <div className="bar">
                                    <motion.div 
                                        className="fill"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${reactionResult.efficiency}%` }}
                                        transition={{ duration: 1 }}
                                    />
                                </div>
                            </div>

                            {gameMode === 'scientific' && reactionResult.reaction && (
                                <div className="chemical-equation">
                                    <div className="equation">{reactionResult.reaction.equation}</div>
                                    <div className="explanation">{reactionResult.reaction.realWorld}</div>
                                </div>
                            )}

                            <div className="products">
                                <h4>🎁 Produits obtenus:</h4>
                                {reactionResult.produced.map(product => (
                                    <div key={product.id} className="product">
                                        {product.id} x{product.quantity}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="failure-result">
                            <div className="error">{reactionResult.message}</div>
                            {gameMode === 'scientific' && (
                                <div className="scientific-reason">{reactionResult.scientificReason}</div>
                            )}
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );

    // Sélecteur de mode
    const ModeSelector = () => (
        <div className="mode-selector">
            <button 
                className={gameMode === 'casual' ? 'active' : ''}
                onClick={() => setGameMode('casual')}
            >
                🎮 Casual
            </button>
            <button 
                className={gameMode === 'scientific' ? 'active' : ''}
                onClick={() => setGameMode('scientific')}
            >
                🔬 Dr. Stone
            </button>
            <button 
                className={gameMode === 'hardcore' ? 'active' : ''}
                onClick={() => setGameMode('hardcore')}
            >
                ⚡ Hardcore
            </button>
        </div>
    );

    // 🎨 FONCTIONS UTILITAIRES
    const getPHColorClass = (pH) => {
        if (pH < 3) return 'very-acidic';
        if (pH < 7) return 'acidic';
        if (pH === 7) return 'neutral';
        if (pH < 11) return 'basic';
        return 'very-basic';
    };

    const getEffectEmoji = (effect) => {
        const effects = {
            'STRONG_BUBBLING': '🫧',
            'SMOKE_EFFECT': '💨',
            'INTENSE_REACTION': '💥',
            'MILD_BUBBLING': '○',
            'CO2_BUBBLES': '💨',
            'GOLDEN_PARTICLES': '✨',
            'FIZZING_SOUND': '🎵'
        };
        return effects[effect] || '⚡';
    };

    // 🎨 RENDER PRINCIPAL
    return (
        <div className="dr-stone-lab">
            <motion.header 
                className="lab-header"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1>🧪 Laboratoire Dr. Stone - Acidité Magique 🧪</h1>
                <p>Dissous des matériaux avec de la VRAIE chimie !</p>
                <ModeSelector />
            </motion.header>

            <div className="lab-content">
                <div className="selection-area">
                    <AcidSelector />
                    <MaterialSelector />
                </div>
                
                <div className="action-area">
                    <ReactionZone />
                    <ReactionResult />
                </div>
            </div>

            {/* Inventaire */}
            <motion.div 
                className="inventory"
                layout
            >
                <h3>🎒 Inventaire</h3>
                <div className="inventory-grid">
                    {Array.from(playerInventory.entries()).map(([id, quantity]) => (
                        <div key={id} className="inventory-item">
                            <span className="item-name">{id}</span>
                            <span className="item-quantity">x{quantity}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

// 🎨 STYLES CSS (à ajouter dans un fichier séparé)
const styles = `
.dr-stone-lab {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    color: white;
    min-height: 100vh;
}

.lab-header {
    text-align: center;
    margin-bottom: 30px;
}

.lab-header h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    text-shadow: 0 0 20px #00ff88;
}

.mode-selector {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
}

.mode-selector button {
    padding: 10px 20px;
    border: 2px solid #00ff88;
    background: transparent;
    color: white;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.mode-selector button.active,
.mode-selector button:hover {
    background: #00ff88;
    color: #1a1a2e;
    box-shadow: 0 0 20px #00ff88;
}

.lab-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 30px;
    margin-bottom: 30px;
}

.substance-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin-top: 15px;
}

.substance-card {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid transparent;
    border-radius: 15px;
    padding: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.substance-card:hover {
    border-color: #00ff88;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
}

.substance-card.selected {
    border-color: #00ff88;
    background: rgba(0, 255, 136, 0.2);
}

.substance-card .formula {
    font-size: 1.2rem;
    font-weight: bold;
    color: #00ff88;
    margin-bottom: 5px;
}

.substance-card .name {
    font-size: 0.9rem;
    margin-bottom: 10px;
}

.ph-indicator {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}

.ph-value.very-acidic { color: #ff4444; }
.ph-value.acidic { color: #ffaa44; }
.ph-value.neutral { color: #44ff44; }
.ph-value.basic { color: #4444ff; }
.ph-value.very-basic { color: #aa44ff; }

.reaction-zone {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 20px;
}

.reaction-preview {
    background: rgba(0, 255, 136, 0.1);
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 20px;
}

.reactants {
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 10px;
}

.reactants .acid { color: #ff6b6b; }
.reactants .material { color: #4ecdc4; }
.reactants .plus { color: #ffe66d; margin: 0 10px; }

.compatibility {
    text-align: center;
}

.compatible { color: #51cf66; }
.incompatible { color: #ff6b6b; }

.reaction-button {
    width: 100%;
    padding: 15px;
    font-size: 1.1rem;
    background: linear-gradient(45deg, #00ff88, #00cc6a);
    border: none;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
}

.reaction-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(0, 255, 136, 0.4);
}

.reaction-button:disabled {
    background: #666;
    cursor: not-allowed;
}

.reaction-effects {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
}

.effect {
    font-size: 2rem;
    filter: drop-shadow(0 0 10px currentColor);
}

.reaction-result {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    padding: 20px;
}

.efficiency-bar {
    margin-bottom: 15px;
}

.efficiency-bar .bar {
    width: 100%;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    overflow: hidden;
}

.efficiency-bar .fill {
    height: 100%;
    background: linear-gradient(90deg, #ff6b6b, #ffe66d, #51cf66);
    border-radius: 10px;
}

.chemical-equation {
    background: rgba(0, 255, 136, 0.1);
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 15px;
}

.chemical-equation .equation {
    font-family: 'Courier New', monospace;
    font-size: 1.1rem;
    color: #00ff88;
    margin-bottom: 5px;
}

.inventory {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    padding: 20px;
}

.inventory-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
    margin-top: 15px;
}

.inventory-item {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.inventory-item .item-quantity {
    color: #00ff88;
    font-weight: bold;
}

@media (max-width: 768px) {
    .lab-content {
        grid-template-columns: 1fr;
    }
    
    .substance-grid {
        grid-template-columns: 1fr;
    }
}
`;

export default DrStoneAcidityLab;