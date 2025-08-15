// 🌌 BUBBLE WORLDS PHYSICS ENGINE
// Moteur de physique personnalisable pour chaque univers de poche

class BubblePhysics {
    constructor(worldId, rules = {}) {
        this.worldId = worldId;
        this.rules = {
            gravity: rules.gravity || 1.0,        // 0 = pas de gravité, 2.0 = double
            timeFlow: rules.timeFlow || 1.0,      // 0.5 = mi-vitesse, 2.0 = double
            causality: rules.causality !== undefined ? rules.causality : true,
            quantum: rules.quantum || 0.5,        // Niveau de superposition
            magicAmplifier: rules.magicAmplifier || 1.0,
            portalStability: rules.portalStability || 0.997
        };
        this.entities = new Map();
        this.particles = [];
        this.portals = [];
        this.lastUpdate = Date.now();
    }

    // Mise à jour physique
    update() {
        const now = Date.now();
        const deltaT = (now - this.lastUpdate) / 1000 * this.rules.timeFlow;
        this.lastUpdate = now;

        // Update entities
        this.entities.forEach(entity => {
            this.updateEntity(entity, deltaT);
        });

        // Update particles
        this.particles = this.particles.filter(p => {
            return this.updateParticle(p, deltaT);
        });

        // Check portal stability
        this.portals.forEach(portal => {
            portal.stability += (Math.random() - 0.5) * 0.01;
            portal.stability = Math.max(0, Math.min(1, portal.stability));
            if (portal.stability < 0.5) {
                this.closePortal(portal);
            }
        });
    }

    updateEntity(entity, deltaT) {
        // Gravité
        if (this.rules.gravity > 0 && !entity.floating) {
            entity.vy += this.rules.gravity * 9.8 * deltaT;
        }

        // Déplacement avec causalité
        if (this.rules.causality) {
            entity.x += entity.vx * deltaT;
            entity.y += entity.vy * deltaT;
        } else {
            // Sans causalité, l'effet peut précéder la cause
            const futureT = deltaT * (1 + Math.random());
            entity.x += entity.vx * futureT;
            entity.y += entity.vy * futureT;
        }

        // Superposition quantique
        if (this.rules.quantum > 0.5) {
            entity.quantumState = entity.quantumState || [];
            entity.quantumState.push({
                x: entity.x + (Math.random() - 0.5) * 10,
                y: entity.y + (Math.random() - 0.5) * 10,
                probability: Math.random() * this.rules.quantum
            });
            // Limite à 5 états superposés
            if (entity.quantumState.length > 5) {
                entity.quantumState.shift();
            }
        }

        // Amplification magique
        if (entity.magic) {
            entity.magic.power *= this.rules.magicAmplifier;
            entity.magic.cooldown /= this.rules.magicAmplifier;
        }
    }

    updateParticle(particle, deltaT) {
        particle.life -= deltaT;
        if (particle.life <= 0) return false;

        // Physique modifiée des particules
        particle.x += particle.vx * deltaT * this.rules.timeFlow;
        particle.y += particle.vy * deltaT * this.rules.timeFlow;
        particle.vy += this.rules.gravity * 50 * deltaT;

        // Effets quantiques sur les particules
        if (this.rules.quantum > 0.7) {
            particle.x += (Math.random() - 0.5) * 5;
            particle.y += (Math.random() - 0.5) * 5;
        }

        particle.opacity = particle.life / particle.maxLife;
        return true;
    }

    // Créer un portail
    createPortal(x, y, targetWorld, stability = null) {
        const portal = {
            id: `portal_${Date.now()}`,
            x, y,
            targetWorld,
            stability: stability || this.rules.portalStability,
            particles: []
        };
        this.portals.push(portal);
        
        // Effet visuel du portail
        this.spawnPortalEffect(x, y);
        
        return portal;
    }

    closePortal(portal) {
        const index = this.portals.indexOf(portal);
        if (index > -1) {
            this.portals.splice(index, 1);
            this.spawnCollapseEffect(portal.x, portal.y);
        }
    }

    // Effets visuels
    spawnPortalEffect(x, y) {
        for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 2;
            this.particles.push({
                x, y,
                vx: Math.cos(angle) * 50,
                vy: Math.sin(angle) * 50,
                life: 2,
                maxLife: 2,
                color: '#00ffff',
                size: 3
            });
        }
    }

    spawnCollapseEffect(x, y) {
        for (let i = 0; i < 30; i++) {
            this.particles.push({
                x, y,
                vx: (Math.random() - 0.5) * 200,
                vy: (Math.random() - 0.5) * 200,
                life: 1,
                maxLife: 1,
                color: '#ff00ff',
                size: 5
            });
        }
    }

    // Spawn une entité
    spawnEntity(type, x, y, properties = {}) {
        const entity = {
            id: `entity_${Date.now()}_${Math.random()}`,
            type,
            x, y,
            vx: properties.vx || 0,
            vy: properties.vy || 0,
            floating: properties.floating || false,
            magic: properties.magic || null,
            quantumState: []
        };
        this.entities.set(entity.id, entity);
        return entity;
    }

    // Calcul de collision avec physique modifiée
    checkCollision(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // En mode quantique élevé, les collisions sont probabilistes
        if (this.rules.quantum > 0.7) {
            return distance < 30 && Math.random() < (1 - this.rules.quantum);
        }
        
        return distance < 30;
    }

    // Téléportation via portail
    teleportEntity(entity, portal) {
        if (portal.stability > 0.5) {
            // Succès de téléportation
            entity.world = portal.targetWorld;
            entity.x = Math.random() * 500;
            entity.y = Math.random() * 500;
            
            // Effets temporels
            if (!this.rules.causality) {
                // Bootstrap paradox possible
                const clone = {...entity};
                clone.id = entity.id + '_paradox';
                this.entities.set(clone.id, clone);
            }
            
            return true;
        }
        return false;
    }

    // Obtenir l'état du monde
    getWorldState() {
        return {
            worldId: this.worldId,
            rules: this.rules,
            entities: Array.from(this.entities.values()),
            particles: this.particles,
            portals: this.portals,
            timestamp: Date.now()
        };
    }
}

// === PRESETS DE MONDES ===

const WORLD_PRESETS = {
    'canape_cosmique': {
        gravity: 0.1,
        timeFlow: 0.5,
        causality: true,
        quantum: 0.3,
        magicAmplifier: 10.0,
        portalStability: 0.99
    },
    'archive_vivante': {
        gravity: 0,
        timeFlow: null, // Tous les temps simultanés
        causality: false,
        quantum: 1.0,
        magicAmplifier: 1.0,
        portalStability: 0.95
    },
    'avalon_training': {
        gravity: 1.0,
        timeFlow: 10.0,
        causality: true,
        quantum: 0.1,
        magicAmplifier: 2.0,
        portalStability: 0.9
    },
    'cosmic_bowling': {
        gravity: 'variable', // Change selon l'humeur
        timeFlow: 1.0,
        causality: true,
        quantum: 1.0,
        magicAmplifier: 1.0,
        portalStability: 0.8
    },
    'pocket_universe': {
        gravity: 0.5,
        timeFlow: 1.0,
        causality: true,
        quantum: 0.5,
        magicAmplifier: 1.0,
        portalStability: 0.997
    }
};

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BubblePhysics, WORLD_PRESETS };
}
