/**
 * 🎨 Icon Mapping - Correspondance entre les clés et les icônes OpenMoji
 * 
 * Organisation:
 * - Catégories: resources, terrain, units, actions, ui, effects
 * - Format: clé -> code OpenMoji ou emoji de fallback
 */

export interface IconDefinition {
  openmoji?: string;  // Code OpenMoji (ex: "1F3AE")
  emoji: string;      // Emoji de fallback
  category: string;   // Catégorie pour organisation
  description?: string; // Description optionnelle
}

// Mapping principal des icônes
export const ICON_MAP: Record<string, IconDefinition> = {
  // === RESOURCES ===
  'resource.crystal': {
    openmoji: '1F48E',  // 💎 Gem Stone
    emoji: '💎',
    category: 'resources',
    description: 'Cristaux magiques'
  },
  'resource.energy': {
    openmoji: '26A1',   // ⚡ High Voltage
    emoji: '⚡',
    category: 'resources',
    description: 'Énergie temporelle'
  },
  'resource.temporal': {
    openmoji: '23F3',   // ⏳ Hourglass Not Done
    emoji: '⏳',
    category: 'resources',
    description: 'Flux temporel'
  },
  'resource.quantum': {
    openmoji: '269B',   // ⚛️ Atom Symbol
    emoji: '⚛️',
    category: 'resources',
    description: 'Particules quantiques'
  },
  'resource.gold': {
    openmoji: '1FA99',  // 🪙 Coin
    emoji: '🪙',
    category: 'resources',
    description: 'Or'
  },
  'resource.wood': {
    openmoji: '1FAB5',  // 🪵 Wood
    emoji: '🪵',
    category: 'resources',
    description: 'Bois'
  },
  'resource.stone': {
    openmoji: '1FAA8',  // 🪨 Rock
    emoji: '🪨',
    category: 'resources',
    description: 'Pierre'
  },
  
  // === TERRAIN ===
  'terrain.grass': {
    openmoji: '1F33F',  // 🌿 Herb
    emoji: '🌿',
    category: 'terrain',
    description: 'Plaine'
  },
  'terrain.forest': {
    openmoji: '1F332',  // 🌲 Evergreen Tree
    emoji: '🌲',
    category: 'terrain',
    description: 'Forêt'
  },
  'terrain.mountain': {
    openmoji: '26F0',   // ⛰️ Mountain
    emoji: '⛰️',
    category: 'terrain',
    description: 'Montagne'
  },
  'terrain.water': {
    openmoji: '1F30A',  // 🌊 Water Wave
    emoji: '🌊',
    category: 'terrain',
    description: 'Eau'
  },
  'terrain.desert': {
    openmoji: '1F3DC',  // 🏜️ Desert
    emoji: '🏜️',
    category: 'terrain',
    description: 'Désert'
  },
  'terrain.snow': {
    openmoji: '1F3D4',  // 🏔️ Snow-Capped Mountain
    emoji: '🏔️',
    category: 'terrain',
    description: 'Neige'
  },
  'terrain.volcano': {
    openmoji: '1F30B',  // 🌋 Volcano
    emoji: '🌋',
    category: 'terrain',
    description: 'Volcan'
  },
  
  // === UNITS ===
  'unit.warrior': {
    openmoji: '1F93A',  // 🤺 Person Fencing
    emoji: '⚔️',
    category: 'units',
    description: 'Guerrier'
  },
  'unit.mage': {
    openmoji: '1F9D9',  // 🧙 Mage
    emoji: '🧙',
    category: 'units',
    description: 'Mage'
  },
  'unit.archer': {
    openmoji: '1F3F9',  // 🏹 Bow and Arrow
    emoji: '🏹',
    category: 'units',
    description: 'Archer'
  },
  'unit.priest': {
    openmoji: '1F607',  // 😇 Smiling Face with Halo
    emoji: '✨',
    category: 'units',
    description: 'Prêtre'
  },
  'unit.knight': {
    openmoji: '1F6E1',  // 🛡️ Shield
    emoji: '🛡️',
    category: 'units',
    description: 'Chevalier'
  },
  'unit.assassin': {
    openmoji: '1F977',  // 🥷 Ninja
    emoji: '🥷',
    category: 'units',
    description: 'Assassin'
  },
  
  // === BUILDINGS ===
  'building.castle': {
    openmoji: '1F3F0',  // 🏰 Castle
    emoji: '🏰',
    category: 'buildings',
    description: 'Château'
  },
  'building.tower': {
    openmoji: '1F5FC',  // 🗼 Tokyo Tower
    emoji: '🗼',
    category: 'buildings',
    description: 'Tour'
  },
  'building.house': {
    openmoji: '1F3E0',  // 🏠 House
    emoji: '🏠',
    category: 'buildings',
    description: 'Maison'
  },
  'building.market': {
    openmoji: '1F3EC',  // 🏬 Department Store
    emoji: '🏪',
    category: 'buildings',
    description: 'Marché'
  },
  'building.temple': {
    openmoji: '1F3DB',  // 🏛️ Classical Building
    emoji: '🏛️',
    category: 'buildings',
    description: 'Temple'
  },
  
  // === ACTIONS ===
  'action.attack': {
    openmoji: '2694',   // ⚔️ Crossed Swords
    emoji: '⚔️',
    category: 'actions',
    description: 'Attaquer'
  },
  'action.defend': {
    openmoji: '1F6E1',  // 🛡️ Shield
    emoji: '🛡️',
    category: 'actions',
    description: 'Défendre'
  },
  'action.move': {
    openmoji: '1F3C3',  // 🏃 Person Running
    emoji: '🏃',
    category: 'actions',
    description: 'Déplacer'
  },
  'action.cast': {
    openmoji: '1FA84',  // 🪄 Magic Wand
    emoji: '🪄',
    category: 'actions',
    description: 'Lancer un sort'
  },
  'action.harvest': {
    openmoji: '1F33E',  // 🌾 Sheaf of Rice
    emoji: '🌾',
    category: 'actions',
    description: 'Récolter'
  },
  'action.build': {
    openmoji: '1F528',  // 🔨 Hammer
    emoji: '🔨',
    category: 'actions',
    description: 'Construire'
  },
  
  // === UI ===
  'ui.play': {
    openmoji: '25B6',   // ▶️ Play Button
    emoji: '▶️',
    category: 'ui',
    description: 'Jouer'
  },
  'ui.pause': {
    openmoji: '23F8',   // ⏸️ Pause Button
    emoji: '⏸️',
    category: 'ui',
    description: 'Pause'
  },
  'ui.settings': {
    openmoji: '2699',   // ⚙️ Gear
    emoji: '⚙️',
    category: 'ui',
    description: 'Paramètres'
  },
  'ui.save': {
    openmoji: '1F4BE',  // 💾 Floppy Disk
    emoji: '💾',
    category: 'ui',
    description: 'Sauvegarder'
  },
  'ui.load': {
    openmoji: '1F4C2',  // 📂 Open File Folder
    emoji: '📂',
    category: 'ui',
    description: 'Charger'
  },
  'ui.home': {
    openmoji: '1F3E0',  // 🏠 House
    emoji: '🏠',
    category: 'ui',
    description: 'Accueil'
  },
  'ui.map': {
    openmoji: '1F5FA',  // 🗺️ World Map
    emoji: '🗺️',
    category: 'ui',
    description: 'Carte'
  },
  'ui.inventory': {
    openmoji: '1F392',  // 🎒 Backpack
    emoji: '🎒',
    category: 'ui',
    description: 'Inventaire'
  },
  'ui.timeline': {
    openmoji: '1F4C5',  // 📅 Calendar
    emoji: '📅',
    category: 'ui',
    description: 'Timeline'
  },
  'ui.combat': {
    openmoji: '2694',   // ⚔️ Crossed Swords
    emoji: '⚔️',
    category: 'ui',
    description: 'Combat'
  },
  
  // === EFFECTS ===
  'effect.fire': {
    openmoji: '1F525',  // 🔥 Fire
    emoji: '🔥',
    category: 'effects',
    description: 'Feu'
  },
  'effect.ice': {
    openmoji: '2744',   // ❄️ Snowflake
    emoji: '❄️',
    category: 'effects',
    description: 'Glace'
  },
  'effect.lightning': {
    openmoji: '26A1',   // ⚡ High Voltage
    emoji: '⚡',
    category: 'effects',
    description: 'Foudre'
  },
  'effect.poison': {
    openmoji: '2620',   // ☠️ Skull and Crossbones
    emoji: '☠️',
    category: 'effects',
    description: 'Poison'
  },
  'effect.heal': {
    openmoji: '2764',   // ❤️ Red Heart
    emoji: '❤️',
    category: 'effects',
    description: 'Soin'
  },
  'effect.shield': {
    openmoji: '1F6E1',  // 🛡️ Shield
    emoji: '🛡️',
    category: 'effects',
    description: 'Bouclier'
  },
  'effect.buff': {
    openmoji: '2B06',   // ⬆️ Up Arrow
    emoji: '⬆️',
    category: 'effects',
    description: 'Amélioration'
  },
  'effect.debuff': {
    openmoji: '2B07',   // ⬇️ Down Arrow
    emoji: '⬇️',
    category: 'effects',
    description: 'Affaiblissement'
  },
  'effect.paradox': {
    openmoji: '267E',   // ♾️ Infinity
    emoji: '♾️',
    category: 'effects',
    description: 'Paradoxe'
  },
  'effect.quantum': {
    openmoji: '1F300',  // 🌀 Cyclone
    emoji: '🌀',
    category: 'effects',
    description: 'Effet quantique'
  },
  
  // === MODES ===
  'mode.game': {
    openmoji: '1F3AE',  // 🎮 Video Game
    emoji: '🎮',
    category: 'modes',
    description: 'Mode jeu'
  },
  'mode.editor': {
    openmoji: '1F5FA',  // 🗺️ World Map
    emoji: '🗺️',
    category: 'modes',
    description: 'Éditeur de cartes'
  },
  'mode.chasse': {
    openmoji: '1F3F9',  // 🏹 Bow and Arrow
    emoji: '🏹',
    category: 'modes',
    description: 'Chasse temporelle'
  },
  
  // === GARDEN ===
  'garden.sunflower': {
    openmoji: '1F33B',  // 🌻 Sunflower
    emoji: '🌻',
    category: 'garden',
    description: 'Tournesol temporel'
  },
  'garden.rose': {
    openmoji: '1F339',  // 🌹 Rose
    emoji: '🌹',
    category: 'garden',
    description: 'Rose quantique'
  },
  'garden.tulip': {
    openmoji: '1F337',  // 🌷 Tulip
    emoji: '🌷',
    category: 'garden',
    description: 'Tulipe paradoxale'
  },
  'garden.lotus': {
    openmoji: '1F3F5',  // 🏵️ Rosette
    emoji: '🪷',
    category: 'garden',
    description: 'Lotus dimensionnel'
  },
  'garden.cactus': {
    openmoji: '1F335',  // 🌵 Cactus
    emoji: '🌵',
    category: 'garden',
    description: 'Cactus cristallin'
  },
};

// Fonction utilitaire pour obtenir une icône
export function getIcon(key: string): IconDefinition | undefined {
  return ICON_MAP[key];
}

// Fonction pour obtenir toutes les icônes d'une catégorie
export function getIconsByCategory(category: string): Record<string, IconDefinition> {
  return Object.fromEntries(
    Object.entries(ICON_MAP).filter(([_, icon]) => icon.category === category)
  );
}

// Fonction pour obtenir les catégories disponibles
export function getCategories(): string[] {
  return Array.from(new Set(Object.values(ICON_MAP).map(icon => icon.category)));
}

// Export par catégorie pour faciliter l'import
export const RESOURCE_ICONS = getIconsByCategory('resources');
export const TERRAIN_ICONS = getIconsByCategory('terrain');
export const UNIT_ICONS = getIconsByCategory('units');
export const BUILDING_ICONS = getIconsByCategory('buildings');
export const ACTION_ICONS = getIconsByCategory('actions');
export const UI_ICONS = getIconsByCategory('ui');
export const EFFECT_ICONS = getIconsByCategory('effects');
export const MODE_ICONS = getIconsByCategory('modes');
export const GARDEN_ICONS = getIconsByCategory('garden');
