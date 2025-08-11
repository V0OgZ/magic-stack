/**
 * 🎮 UNIFIED MAP STORE
 * 
 * Store Zustand unifié pour l'éditeur où l'éditeur EST le jeu !
 * Gère l'état partagé entre tous les modes.
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type {
  World,
  Map,
  PlacedResource,
  ResourceConnection,
  TemporalEvent,
  HexTerrain,
  Region,
  Regulators,
  Position6D,
} from '../schemas/unified-map.schema';
import { createEmptyWorld, createEmptyMap } from '../schemas/unified-map.schema';
import { MapFileService } from '../../services/MapFileService';

// ========== TYPES ==========

export type EditorMode = 'structure' | 'resources' | 'timeline' | 'play' | 'overlay';
export type Tool = 'select' | 'paint' | 'place' | 'connect' | 'delete' | 'region';

interface TemporalState {
  tw: number;
  te: number;
  drift: number;
  debt: number;
  currentDay: number;
}

interface UnifiedMapState {
  // ===== Current Files =====
  currentWorld: World | null;
  currentMap: Map | null;
  worldPath: string | null;
  mapPath: string | null;
  
  // ===== Editor State =====
  mode: EditorMode;
  tool: Tool;
  selectedHex: { q: number; r: number } | null;
  selectedResource: PlacedResource | null;
  selectedRegion: Region | null;
  selectedEvent: TemporalEvent | null;
  
  // ===== Temporal State =====
  temporal: TemporalState;
  simulationRunning: boolean;
  
  // ===== UI State =====
  showGrid: boolean;
  showRegions: boolean;
  showConnections: boolean;
  showTimeline: boolean;
  zoomLevel: number;
  viewOffset: { x: number; y: number };
  
  // ===== Brush/Tools State =====
  brushSize: number;
  brushTerrain: HexTerrain['type'];
  selectedIcon: { emoji: string; category: string; name: string } | null;
  connectionStart: string | null; // Resource ID for connection
  
  // ===== History =====
  undoStack: any[];
  redoStack: any[];
  
  // ===== Actions - File Management =====
  newWorld: (name: string, width: number, height: number) => void;
  loadWorld: (world: World, path?: string) => void;
  saveWorld: () => Promise<void>;
  
  newMap: (name: string) => void;
  loadMap: (map: Map, path?: string) => void;
  saveMap: () => Promise<void>;
  
  exportToFile: () => void;
  importFromFile: (data: string) => void;
  
  // ===== Actions - Mode & Tools =====
  setMode: (mode: EditorMode) => void;
  setTool: (tool: Tool) => void;
  
  // ===== Actions - Structure Editing (World) =====
  paintTerrain: (q: number, r: number) => void;
  setBrushTerrain: (terrain: HexTerrain['type']) => void;
  setBrushSize: (size: number) => void;
  
  createRegion: (name: string, hexes: { q: number; r: number }[]) => void;
  updateRegion: (id: string, updates: Partial<Region>) => void;
  deleteRegion: (id: string) => void;
  
  // ===== Actions - Resource Editing (Map) =====
  placeResource: (x: number, y: number) => void;
  updateResource: (id: string, updates: Partial<PlacedResource>) => void;
  deleteResource: (id: string) => void;
  
  createConnection: (from: string, to: string, type: ResourceConnection['type']) => void;
  deleteConnection: (id: string) => void;
  
  // ===== Actions - Timeline Editing =====
  addEvent: (event: Omit<TemporalEvent, 'id'>) => void;
  updateEvent: (id: string, updates: Partial<TemporalEvent>) => void;
  deleteEvent: (id: string) => void;
  setCurrentDay: (day: number) => void;
  
  // ===== Actions - Regulators =====
  updateRegulators: (updates: Partial<Regulators>) => void;
  activateRegulator: (type: 'vince' | 'anna' | 'overload') => void;
  
  // ===== Actions - Simulation =====
  startSimulation: () => void;
  stopSimulation: () => void;
  tick: () => void;
  playMap: () => void;
  
  // ===== Actions - UI =====
  setZoom: (level: number) => void;
  pan: (dx: number, dy: number) => void;
  toggleGrid: () => void;
  toggleRegions: () => void;
  toggleConnections: () => void;
  toggleTimeline: () => void;
  
  // ===== Actions - History =====
  undo: () => void;
  redo: () => void;
  
  // ===== Helpers =====
  getVisibleResources: () => PlacedResource[];
  getActiveEvents: () => TemporalEvent[];
  canPlayMap: () => boolean;
}

// ========== STORE ==========

export const useUnifiedMapStore = create<UnifiedMapState>()(
  devtools(
    persist(
      (set, get) => ({
        // ===== Initial State =====
        currentWorld: null,
        currentMap: null,
        worldPath: null,
        mapPath: null,
        
        mode: 'structure',
        tool: 'paint',
        selectedHex: null,
        selectedResource: null,
        selectedRegion: null,
        selectedEvent: null,
        
        temporal: {
          tw: 0,
          te: 0,
          drift: 0,
          debt: 0,
          currentDay: 1,
        },
        simulationRunning: false,
        
        showGrid: true,
        showRegions: true,
        showConnections: true,
        showTimeline: false,
        zoomLevel: 1,
        viewOffset: { x: 0, y: 0 },
        
        brushSize: 1,
        brushTerrain: 'grass',
        selectedIcon: null,
        connectionStart: null,
        
        undoStack: [],
        redoStack: [],
        
        // ===== File Management =====
        newWorld: (name, width, height) => {
          const world = createEmptyWorld(name, width, height);
          set({
            currentWorld: world,
            worldPath: null,
            mode: 'structure',
            tool: 'paint',
          });
        },
        
        loadWorld: (world, path) => {
          set({
            currentWorld: world,
            worldPath: path || null,
          });
        },
        
        saveWorld: async () => {
          const { currentWorld, worldPath } = get();
          if (!currentWorld) return;
          
          const result = await MapFileService.saveWorldBackend(currentWorld);
          if (result.success) {
            set({ worldPath: result.path });
            console.log('✅ World sauvegardé:', result.path);
          } else {
            console.error('❌ Erreur sauvegarde world:', result.error);
          }
        },
        
        newMap: (name) => {
          const { currentWorld } = get();
          if (!currentWorld) {
            console.error('No world loaded! Create or load a world first.');
            return;
          }
          
          const map = createEmptyMap(name, currentWorld);
          set({
            currentMap: map,
            mapPath: null,
            mode: 'resources',
            tool: 'place',
          });
        },
        
        loadMap: (map, path) => {
          set({
            currentMap: map,
            mapPath: path || null,
            mode: 'resources',
          });
        },
        
        saveMap: async () => {
          const { currentMap, mapPath } = get();
          if (!currentMap) return;
          
          const result = await MapFileService.saveMapBackend(currentMap);
          if (result.success) {
            set({ mapPath: result.path });
            console.log('✅ Map sauvegardée:', result.path);
          } else {
            console.error('❌ Erreur sauvegarde map:', result.error);
          }
        },
        
        exportToFile: () => {
          const { currentWorld, currentMap } = get();
          if (!currentWorld || !currentMap) {
            console.error('World et Map requis pour export');
            return;
          }
          
          const bundle = MapFileService.exportBundle(currentWorld, currentMap);
          MapFileService.downloadFile(bundle, `unified_map_${Date.now()}.json`);
        },
        
        importFromFile: async (jsonData) => {
          const result = await MapFileService.importBundle(jsonData);
          if (result.success && result.data) {
            get().loadWorld(result.data.world);
            get().loadMap(result.data.map);
            console.log('✅ Import réussi');
          } else {
            console.error('❌ Erreur import:', result.error);
          }
        },
        
        // ===== Mode & Tools =====
        setMode: (mode) => {
          set({ mode });
          
          // Auto-select appropriate tool
          if (mode === 'structure') {
            set({ tool: 'paint' });
          } else if (mode === 'resources') {
            set({ tool: 'place' });
          } else if (mode === 'timeline') {
            set({ tool: 'select' });
          }
        },
        
        setTool: (tool) => set({ tool }),
        
        // ===== Structure Editing =====
        paintTerrain: (q, r) => {
          const { currentWorld, brushTerrain, brushSize } = get();
          if (!currentWorld) return;
          
          const updatedHexagons = [...currentWorld.hexagons];
          const radius = Math.floor(brushSize / 2);
          
          // Paint in a radius around the clicked hex
          for (let dq = -radius; dq <= radius; dq++) {
            for (let dr = -radius; dr <= radius; dr++) {
              if (Math.abs(dq + dr) > radius) continue;
              
              const hexIndex = updatedHexagons.findIndex(
                h => h.position.q === q + dq && h.position.r === r + dr
              );
              
              if (hexIndex !== -1) {
                updatedHexagons[hexIndex] = {
                  ...updatedHexagons[hexIndex],
                  type: brushTerrain,
                };
              }
            }
          }
          
          set({
            currentWorld: {
              ...currentWorld,
              hexagons: updatedHexagons,
            },
          });
        },
        
        setBrushTerrain: (terrain) => set({ brushTerrain: terrain }),
        setBrushSize: (size) => set({ brushSize: Math.max(1, Math.min(9, size)) }),
        
        createRegion: (name, hexes) => {
          const { currentWorld } = get();
          if (!currentWorld) return;
          
          const newRegion: Region = {
            id: `region_${Date.now()}`,
            name,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            hexes,
          };
          
          set({
            currentWorld: {
              ...currentWorld,
              regions: [...currentWorld.regions, newRegion],
            },
          });
        },
        
        updateRegion: (id, updates) => {
          const { currentWorld } = get();
          if (!currentWorld) return;
          
          set({
            currentWorld: {
              ...currentWorld,
              regions: currentWorld.regions.map(r =>
                r.id === id ? { ...r, ...updates } : r
              ),
            },
          });
        },
        
        deleteRegion: (id) => {
          const { currentWorld } = get();
          if (!currentWorld) return;
          
          set({
            currentWorld: {
              ...currentWorld,
              regions: currentWorld.regions.filter(r => r.id !== id),
            },
          });
        },
        
        // ===== Resource Editing =====
        placeResource: (x, y) => {
          const { currentMap, selectedIcon, temporal } = get();
          if (!currentMap || !selectedIcon) return;
          
          const newResource: PlacedResource = {
            id: `resource_${Date.now()}`,
            type: 'marker', // TODO: Déterminer selon l'icône
            subtype: selectedIcon.name,
            emoji: selectedIcon.emoji,
            name: selectedIcon.name,
            position_6d: {
              x,
              y,
              z: 0,
              t: temporal.currentDay,
              c: 0,
              psi: 0,
            },
            size: 40,
            rotation: 0,
            opacity: 1,
          };
          
          set({
            currentMap: {
              ...currentMap,
              resources: [...currentMap.resources, newResource],
            },
          });
        },
        
        updateResource: (id, updates) => {
          const { currentMap } = get();
          if (!currentMap) return;
          
          set({
            currentMap: {
              ...currentMap,
              resources: currentMap.resources.map(r =>
                r.id === id ? { ...r, ...updates } : r
              ),
            },
          });
        },
        
        deleteResource: (id) => {
          const { currentMap } = get();
          if (!currentMap) return;
          
          set({
            currentMap: {
              ...currentMap,
              resources: currentMap.resources.filter(r => r.id !== id),
              connections: currentMap.connections.filter(
                c => c.from !== id && c.to !== id
              ),
            },
          });
        },
        
        createConnection: (from, to, type) => {
          const { currentMap } = get();
          if (!currentMap) return;
          
          const newConnection: ResourceConnection = {
            id: `conn_${Date.now()}`,
            from,
            to,
            type,
            strength: 0.5,
          };
          
          set({
            currentMap: {
              ...currentMap,
              connections: [...currentMap.connections, newConnection],
            },
            connectionStart: null,
          });
        },
        
        deleteConnection: (id) => {
          const { currentMap } = get();
          if (!currentMap) return;
          
          set({
            currentMap: {
              ...currentMap,
              connections: currentMap.connections.filter(c => c.id !== id),
            },
          });
        },
        
        // ===== Timeline =====
        addEvent: (eventData) => {
          const { currentMap } = get();
          if (!currentMap) return;
          
          const newEvent: TemporalEvent = {
            ...eventData,
            id: `event_${Date.now()}`,
          };
          
          set({
            currentMap: {
              ...currentMap,
              timeline: {
                ...currentMap.timeline,
                events: [...currentMap.timeline.events, newEvent],
              },
            },
          });
        },
        
        updateEvent: (id, updates) => {
          const { currentMap } = get();
          if (!currentMap) return;
          
          set({
            currentMap: {
              ...currentMap,
              timeline: {
                ...currentMap.timeline,
                events: currentMap.timeline.events.map(e =>
                  e.id === id ? { ...e, ...updates } : e
                ),
              },
            },
          });
        },
        
        deleteEvent: (id) => {
          const { currentMap } = get();
          if (!currentMap) return;
          
          set({
            currentMap: {
              ...currentMap,
              timeline: {
                ...currentMap.timeline,
                events: currentMap.timeline.events.filter(e => e.id !== id),
              },
            },
          });
        },
        
        setCurrentDay: (day) => {
          set(state => ({
            temporal: { ...state.temporal, currentDay: day },
          }));
        },
        
        // ===== Regulators =====
        updateRegulators: (updates) => {
          const { currentMap } = get();
          if (!currentMap) return;
          
          set({
            currentMap: {
              ...currentMap,
              regulators: { ...currentMap.regulators, ...updates },
            },
          });
        },
        
        activateRegulator: (type) => {
          const { currentMap } = get();
          if (!currentMap) return;
          
          const updates: Partial<Regulators> = {};
          
          if (type === 'vince') {
            updates.vince = { ...currentMap.regulators.vince, active: true };
          } else if (type === 'anna') {
            updates.anna = { ...currentMap.regulators.anna, active: true };
          } else if (type === 'overload') {
            updates.overload = {
              ...currentMap.regulators.overload,
              stack: currentMap.regulators.overload.stack + 1,
            };
          }
          
          get().updateRegulators(updates);
        },
        
        // ===== Simulation =====
        startSimulation: () => set({ simulationRunning: true }),
        stopSimulation: () => set({ simulationRunning: false }),
        
        tick: () => {
          const { temporal, simulationRunning } = get();
          if (!simulationRunning) return;
          
          set({
            temporal: {
              ...temporal,
              tw: temporal.tw + 0.1,
              te: temporal.te + 0.095,
              drift: Math.abs((temporal.tw + 0.1) - (temporal.te + 0.095)),
              debt: temporal.debt + (temporal.drift > 1 ? 0.01 : -0.01),
            },
          });
        },
        
        playMap: () => {
          const { currentMap } = get();
          if (!currentMap) {
            console.error('No map to play!');
            return;
          }
          
          set({ mode: 'play' });
          // TODO: Lancer le jeu avec la map actuelle
          console.log('Playing map:', currentMap.name);
        },
        
        // ===== UI =====
        setZoom: (level) => set({ zoomLevel: Math.max(0.5, Math.min(3, level)) }),
        pan: (dx, dy) => {
          set(state => ({
            viewOffset: {
              x: state.viewOffset.x + dx,
              y: state.viewOffset.y + dy,
            },
          }));
        },
        
        toggleGrid: () => set(state => ({ showGrid: !state.showGrid })),
        toggleRegions: () => set(state => ({ showRegions: !state.showRegions })),
        toggleConnections: () => set(state => ({ showConnections: !state.showConnections })),
        toggleTimeline: () => set(state => ({ showTimeline: !state.showTimeline })),
        
        // ===== History =====
        undo: () => {
          // TODO: Implémenter undo/redo
          console.log('Undo');
        },
        
        redo: () => {
          // TODO: Implémenter undo/redo
          console.log('Redo');
        },
        
        // ===== Helpers =====
        getVisibleResources: () => {
          const { currentMap, temporal } = get();
          if (!currentMap) return [];
          
          return currentMap.resources.filter(r => {
            // Filtre selon le jour actuel et la visibilité temporelle
            const appearDay = r.temporal?.appearDay || 1;
            const disappearDay = r.temporal?.disappearDay || Infinity;
            
            return temporal.currentDay >= appearDay && temporal.currentDay <= disappearDay;
          });
        },
        
        getActiveEvents: () => {
          const { currentMap, temporal } = get();
          if (!currentMap) return [];
          
          return currentMap.timeline.events.filter(e => {
            if (e.day === temporal.currentDay) return true;
            
            // Check répétitions
            if (e.repeat) {
              const daysSince = temporal.currentDay - e.day;
              if (daysSince > 0 && daysSince % e.repeat.interval === 0) {
                if (!e.repeat.times || daysSince / e.repeat.interval <= e.repeat.times) {
                  return true;
                }
              }
            }
            
            return false;
          });
        },
        
        canPlayMap: () => {
          const { currentWorld, currentMap } = get();
          return !!(currentWorld && currentMap && currentMap.resources.length > 0);
        },
      }),
      {
        name: 'unified-map-store',
        partialize: (state) => ({
          // Persist seulement certaines parties
          worldPath: state.worldPath,
          mapPath: state.mapPath,
          showGrid: state.showGrid,
          showRegions: state.showRegions,
          showConnections: state.showConnections,
          zoomLevel: state.zoomLevel,
          brushSize: state.brushSize,
        }),
      }
    )
  )
);
