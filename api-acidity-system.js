// 🧪⚡ MAGICSTACK ACIDITY SYSTEM API ⚡🧪
// Créé par MERLIN pour SENKU (le pote prof de chimie)
// Système Dr. Stone intégré à Heroes of Time

/**
 * 🔬 SYSTÈME D'ACIDITÉ RÉALISTE
 * Basé sur la vraie chimie du pH et de la dissolution
 */

class AcidityMagicSystem {
    constructor() {
        this.substances = new Map();
        this.reactions = new Map();
        this.playerInventory = new Map();
        
        // Initialisation des substances de base
        this.initializeSubstances();
        this.initializeReactions();
    }

    // 🧪 BASE DE DONNÉES DES SUBSTANCES RÉELLES
    initializeSubstances() {
        // ACIDES (pH < 7)
        this.substances.set('HCl', {
            name: 'Acide Chlorhydrique',
            type: 'acid',
            pH: 1.0,
            strength: 'fort',
            formula: 'HCl',
            gameSpell: 'ACID_DISSOLVE_STRONG',
            dissolves: ['limestone', 'iron_oxide', 'organic_matter'],
            realWorld: 'Utilisé pour nettoyer les métaux, dissoudre calcaire',
            danger: 'Très corrosif - équipement protection requis',
            cost: 50,
            rarity: 'common'
        });

        this.substances.set('H2SO4', {
            name: 'Acide Sulfurique',
            type: 'acid',
            pH: 0.5,
            strength: 'très_fort',
            formula: 'H2SO4',
            gameSpell: 'ACID_DISSOLVE_ULTIMATE',
            dissolves: ['most_metals', 'organic_compounds', 'limestone', 'paper'],
            realWorld: 'Batteries de voiture, production engrais',
            danger: 'EXTRÊMEMENT dangereux - peut carboniser',
            cost: 100,
            rarity: 'rare'
        });

        this.substances.set('CH3COOH', {
            name: 'Acide Acétique (Vinaigre)',
            type: 'acid',
            pH: 4.8,
            strength: 'faible',
            formula: 'CH3COOH',
            gameSpell: 'ACID_DISSOLVE_MILD',
            dissolves: ['calcium_carbonate', 'rust_surface'],
            realWorld: 'Vinaigre de cuisine, nettoyage doux',
            danger: 'Sûr à manipuler',
            cost: 10,
            rarity: 'very_common'
        });

        // BASES (pH > 7)
        this.substances.set('NaOH', {
            name: 'Soude Caustique',
            type: 'base',
            pH: 13.0,
            strength: 'fort',
            formula: 'NaOH',
            gameSpell: 'BASE_DISSOLVE_STRONG',
            dissolves: ['grease', 'organic_acids', 'aluminum'],
            realWorld: 'Fabrication savon, débouchage canalisations',
            danger: 'Très corrosif pour la peau',
            cost: 40,
            rarity: 'common'
        });

        this.substances.set('NH3', {
            name: 'Ammoniaque',
            type: 'base',
            pH: 11.0,
            strength: 'modéré',
            formula: 'NH3',
            gameSpell: 'BASE_DISSOLVE_MILD',
            dissolves: ['grease', 'some_organic_compounds'],
            realWorld: 'Nettoyage vitres, engrais',
            danger: 'Vapeurs irritantes',
            cost: 25,
            rarity: 'common'
        });

        // MATÉRIAUX À DISSOUDRE
        this.substances.set('limestone', {
            name: 'Calcaire',
            type: 'material',
            pH: 8.5, // Basique
            formula: 'CaCO3',
            dissolvesIn: ['HCl', 'H2SO4', 'CH3COOH'],
            yields: ['calcium_salt', 'CO2_gas'],
            realWorld: 'Roche sédimentaire, construction',
            value: 20,
            rarity: 'very_common'
        });

        this.substances.set('iron_oxide', {
            name: 'Rouille (Oxyde de Fer)',
            type: 'material',
            pH: 7.0,
            formula: 'Fe2O3',
            dissolvesIn: ['HCl', 'H2SO4'],
            yields: ['iron_salt', 'pure_iron'],
            realWorld: 'Rouille sur métaux',
            value: 30,
            rarity: 'common'
        });

        this.substances.set('gold_ore', {
            name: 'Minerai d\'Or',
            type: 'precious_material',
            pH: 7.0,
            formula: 'Au + impuretés',
            dissolvesIn: ['aqua_regia'], // Mélange HCl + HNO3
            yields: ['pure_gold', 'rare_salts'],
            realWorld: 'Extraction d\'or par dissolution',
            value: 1000,
            rarity: 'legendary'
        });
    }

    // ⚗️ RÉACTIONS CHIMIQUES RÉELLES
    initializeReactions() {
        // Calcaire + Acide chlorhydrique
        this.reactions.set('limestone_HCl', {
            reactants: ['limestone', 'HCl'],
            equation: 'CaCO3 + 2HCl → CaCl2 + H2O + CO2↑',
            products: ['calcium_chloride', 'water', 'CO2_gas'],
            conditions: { pH_min: 0, pH_max: 3, temperature: 20 },
            realWorld: 'Réaction effervescente, dégagement de CO2',
            gameEffect: 'BUBBLE_ANIMATION + RESOURCE_EXTRACTION'
        });

        // Rouille + Acide
        this.reactions.set('rust_acid', {
            reactants: ['iron_oxide', 'HCl'],
            equation: 'Fe2O3 + 6HCl → 2FeCl3 + 3H2O',
            products: ['iron_chloride', 'clean_iron'],
            conditions: { pH_min: 0, pH_max: 2, temperature: 25 },
            realWorld: 'Nettoyage de la rouille',
            gameEffect: 'RUST_REMOVAL + METAL_RESTORATION'
        });

        // Aqua Regia pour l'or
        this.reactions.set('gold_aqua_regia', {
            reactants: ['gold_ore', 'HCl', 'HNO3'],
            equation: 'Au + 3HNO3 + 4HCl → HAuCl4 + 3NO2 + 3H2O',
            products: ['gold_chloride_solution'],
            conditions: { pH_min: 0, pH_max: 1, temperature: 60, danger: 'extreme' },
            realWorld: 'Seul acide qui dissout l\'or',
            gameEffect: 'LEGENDARY_EXTRACTION + TOXIC_FUMES'
        });
    }

    // 🎮 API POUR LE GAMEPLAY

    /**
     * Obtenir toutes les substances disponibles
     */
    getAllSubstances() {
        return Array.from(this.substances.entries()).map(([id, data]) => ({
            id,
            ...data
        }));
    }

    /**
     * Vérifier si une substance peut dissoudre un matériau
     */
    canDissolve(acidId, materialId) {
        const acid = this.substances.get(acidId);
        const material = this.substances.get(materialId);
        
        if (!acid || !material) return false;
        
        return material.dissolvesIn && material.dissolvesIn.includes(acidId);
    }

    /**
     * Calculer l'efficacité de dissolution basée sur le pH
     */
    calculateDissolutionEfficiency(acidId, materialId) {
        const acid = this.substances.get(acidId);
        const material = this.substances.get(materialId);
        
        if (!this.canDissolve(acidId, materialId)) return 0;
        
        // Plus l'acide est fort (pH bas), plus c'est efficace
        let efficiency = 0;
        if (acid.pH <= 1) efficiency = 1.0; // 100%
        else if (acid.pH <= 3) efficiency = 0.8; // 80%
        else if (acid.pH <= 5) efficiency = 0.5; // 50%
        else efficiency = 0.2; // 20%
        
        return efficiency;
    }

    /**
     * Exécuter une dissolution (le sort principal)
     */
    executeDissolution(playerId, acidId, materialId, quantity = 1) {
        const acid = this.substances.get(acidId);
        const material = this.substances.get(materialId);
        
        // Vérifications
        if (!this.canDissolve(acidId, materialId)) {
            return {
                success: false,
                message: `${acid.name} ne peut pas dissoudre ${material.name}`,
                scientificReason: `pH incompatible: ${acid.pH} vs ${material.pH}`
            };
        }
        
        const efficiency = this.calculateDissolutionEfficiency(acidId, materialId);
        const successfulQuantity = Math.floor(quantity * efficiency);
        
        // Consommer l'acide
        this.consumeSubstance(playerId, acidId, quantity);
        
        // Produire les ressources
        const products = material.yields || [];
        const results = [];
        
        products.forEach(productId => {
            const productQuantity = successfulQuantity;
            this.addToInventory(playerId, productId, productQuantity);
            results.push({ id: productId, quantity: productQuantity });
        });
        
        return {
            success: true,
            efficiency: efficiency * 100,
            consumed: { [acidId]: quantity },
            produced: results,
            reaction: this.getReactionInfo(acidId, materialId),
            gameEffect: this.generateGameEffect(acidId, materialId)
        };
    }

    /**
     * Créer un acide personnalisé (pour les pros)
     */
    createCustomAcid(playerId, formula, concentration) {
        // Calcul du pH basé sur la concentration
        const pH = this.calculatePHFromFormula(formula, concentration);
        
        const customAcid = {
            name: `Acide Personnalisé (${formula})`,
            type: 'acid',
            pH: pH,
            strength: this.getStrengthFromPH(pH),
            formula: formula,
            custom: true,
            creator: playerId
        };
        
        const acidId = `custom_${Date.now()}`;
        this.substances.set(acidId, customAcid);
        
        return { acidId, properties: customAcid };
    }

    /**
     * Système de progression - débloquer de nouveaux acides
     */
    unlockAcid(playerId, acidId) {
        const playerData = this.getPlayerData(playerId);
        
        const requirements = {
            'H2SO4': { level: 10, knowledge: ['basic_chemistry'] },
            'aqua_regia': { level: 25, knowledge: ['advanced_chemistry', 'gold_extraction'] },
            'custom_acids': { level: 50, knowledge: ['expert_chemistry'] }
        };
        
        const req = requirements[acidId];
        if (req && playerData.level >= req.level) {
            playerData.unlockedAcids.add(acidId);
            return true;
        }
        
        return false;
    }

    // 🎯 INTÉGRATION AVEC HEROES OF TIME

    /**
     * Convertir dissolution en sort HOTS
     */
    toHOTSSpell(acidId, materialId) {
        const acid = this.substances.get(acidId);
        const material = this.substances.get(materialId);
        const reaction = this.getReactionInfo(acidId, materialId);
        
        return {
            spell: `⊙(Δt+2 ⟶ DISSOLVE(${material.name}, ACID:${acid.formula}))`,
            effect: `"${acid.name} dissout ${material.name} selon: ${reaction.equation}"`,
            cost: acid.cost,
            success_rate: this.calculateDissolutionEfficiency(acidId, materialId)
        };
    }

    /**
     * Générer des effets visuels pour le jeu
     */
    generateGameEffect(acidId, materialId) {
        const acid = this.substances.get(acidId);
        const material = this.substances.get(materialId);
        
        const effects = [];
        
        // Effets basés sur le pH
        if (acid.pH < 2) {
            effects.push('STRONG_BUBBLING', 'SMOKE_EFFECT', 'INTENSE_REACTION');
        } else if (acid.pH < 5) {
            effects.push('MILD_BUBBLING', 'SLOW_DISSOLUTION');
        }
        
        // Effets spéciaux par matériau
        if (material.id === 'limestone') {
            effects.push('CO2_BUBBLES', 'FIZZING_SOUND');
        }
        if (material.id === 'gold_ore') {
            effects.push('GOLDEN_PARTICLES', 'PRECIOUS_GLOW');
        }
        
        return effects;
    }

    // 🔬 FONCTIONS UTILITAIRES

    calculatePHFromFormula(formula, concentration) {
        // Simplification - dans la vraie vie c'est plus complexe
        const strongAcids = ['HCl', 'H2SO4', 'HNO3'];
        const weakAcids = ['CH3COOH', 'H2CO3'];
        
        if (strongAcids.includes(formula)) {
            return -Math.log10(concentration);
        } else if (weakAcids.includes(formula)) {
            return -Math.log10(concentration * 0.01); // Approximation
        }
        return 7; // Neutre par défaut
    }

    getStrengthFromPH(pH) {
        if (pH < 1) return 'très_fort';
        if (pH < 3) return 'fort';
        if (pH < 6) return 'modéré';
        if (pH < 7) return 'faible';
        return 'neutre';
    }

    getReactionInfo(acidId, materialId) {
        const key = `${materialId}_${acidId}`;
        return this.reactions.get(key) || {
            equation: 'Réaction non documentée',
            realWorld: 'Expérimentation requise'
        };
    }

    // 📊 GESTION DES JOUEURS
    
    getPlayerData(playerId) {
        if (!this.playerInventory.has(playerId)) {
            this.playerInventory.set(playerId, {
                substances: new Map(),
                unlockedAcids: new Set(['CH3COOH']), // Commence avec vinaigre
                level: 1,
                knowledge: ['basic_safety']
            });
        }
        return this.playerInventory.get(playerId);
    }

    addToInventory(playerId, substanceId, quantity) {
        const playerData = this.getPlayerData(playerId);
        const current = playerData.substances.get(substanceId) || 0;
        playerData.substances.set(substanceId, current + quantity);
    }

    consumeSubstance(playerId, substanceId, quantity) {
        const playerData = this.getPlayerData(playerId);
        const current = playerData.substances.get(substanceId) || 0;
        if (current >= quantity) {
            playerData.substances.set(substanceId, current - quantity);
            return true;
        }
        return false;
    }
}

// 🚀 EXPORT POUR INTEGRATION
export default AcidityMagicSystem;

// 🎮 EXEMPLE D'UTILISATION
/*
const acidSystem = new AcidityMagicSystem();

// Le joueur veut dissoudre du calcaire
const result = acidSystem.executeDissolution('player1', 'HCl', 'limestone', 5);
console.log(result);
// {
//   success: true,
//   efficiency: 100,
//   consumed: { HCl: 5 },
//   produced: [{ id: 'calcium_chloride', quantity: 5 }],
//   reaction: { equation: 'CaCO3 + 2HCl → CaCl2 + H2O + CO2↑' }
// }

// Convertir en sort HOTS
const spell = acidSystem.toHOTSSpell('HCl', 'limestone');
console.log(spell.spell);
// "⊙(Δt+2 ⟶ DISSOLVE(Calcaire, ACID:HCl))"
*/