/**
 * 📁 MAP FILE SERVICE
 * Service pour sauvegarder et charger les worlds et maps
 * Gère l'import/export en JSON et la communication avec le backend
 */

import type { World, Map } from '../shared/schemas/unified-map.schema';
import { validateWorld, validateMap } from '../shared/schemas/unified-map.schema';

export interface SaveResult {
  success: boolean;
  path?: string;
  error?: string;
}

export interface LoadResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class MapFileServiceClass {
  private readonly STORAGE_KEY_WORLDS = 'unified_worlds';
  private readonly STORAGE_KEY_MAPS = 'unified_maps';
  private readonly BACKEND_URL = 'http://localhost:8080/api';

  // ===== SAUVEGARDE =====

  /**
   * Sauvegarde un world localement
   */
  async saveWorldLocal(world: World): Promise<SaveResult> {
    try {
      const worlds = this.getLocalWorlds();
      worlds[world.id] = world;
      localStorage.setItem(this.STORAGE_KEY_WORLDS, JSON.stringify(worlds));
      
      return {
        success: true,
        path: `local:worlds/${world.id}`,
      };
    } catch (error) {
      return {
        success: false,
        error: `Erreur de sauvegarde locale: ${error}`,
      };
    }
  }

  /**
   * Sauvegarde un world sur le backend
   */
  async saveWorldBackend(world: World): Promise<SaveResult> {
    try {
      const response = await fetch(`${this.BACKEND_URL}/worlds`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(world),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      
      return {
        success: true,
        path: result.path || `backend:worlds/${world.id}`,
      };
    } catch (error) {
      // Fallback sur sauvegarde locale si backend offline
      console.warn('Backend offline, sauvegarde locale', error);
      return this.saveWorldLocal(world);
    }
  }

  /**
   * Sauvegarde une map localement
   */
  async saveMapLocal(map: Map): Promise<SaveResult> {
    try {
      const maps = this.getLocalMaps();
      maps[map.id] = map;
      localStorage.setItem(this.STORAGE_KEY_MAPS, JSON.stringify(maps));
      
      return {
        success: true,
        path: `local:maps/${map.id}`,
      };
    } catch (error) {
      return {
        success: false,
        error: `Erreur de sauvegarde locale: ${error}`,
      };
    }
  }

  /**
   * Sauvegarde une map sur le backend
   */
  async saveMapBackend(map: Map): Promise<SaveResult> {
    try {
      const response = await fetch(`${this.BACKEND_URL}/maps`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(map),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      
      return {
        success: true,
        path: result.path || `backend:maps/${map.id}`,
      };
    } catch (error) {
      // Fallback sur sauvegarde locale si backend offline
      console.warn('Backend offline, sauvegarde locale', error);
      return this.saveMapLocal(map);
    }
  }

  /**
   * Upload une map vers l'Interstice
   */
  async uploadToInterstice(map: Map): Promise<SaveResult> {
    try {
      const response = await fetch('http://localhost:8080/api/interstice/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'unified_map',
          name: map.name,
          data: map,
          metadata: {
            version: map.version,
            author: map.metadata?.author,
            created: map.metadata?.created,
            tags: map.metadata?.tags,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      
      return {
        success: true,
        path: `interstice:${result.interstice_id}`,
      };
    } catch (error) {
      return {
        success: false,
        error: `Erreur upload Interstice: ${error}`,
      };
    }
  }

  // ===== CHARGEMENT =====

  /**
   * Charge un world depuis le local storage
   */
  async loadWorldLocal(worldId: string): Promise<LoadResult<World>> {
    try {
      const worlds = this.getLocalWorlds();
      const world = worlds[worldId];
      
      if (!world) {
        return {
          success: false,
          error: `World ${worldId} non trouvé`,
        };
      }

      const validated = validateWorld(world);
      
      return {
        success: true,
        data: validated,
      };
    } catch (error) {
      return {
        success: false,
        error: `Erreur de chargement: ${error}`,
      };
    }
  }

  /**
   * Charge un world depuis le backend
   */
  async loadWorldBackend(worldId: string): Promise<LoadResult<World>> {
    try {
      const response = await fetch(`${this.BACKEND_URL}/worlds/${worldId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const validated = validateWorld(data);
      
      return {
        success: true,
        data: validated,
      };
    } catch (error) {
      // Fallback sur chargement local si backend offline
      console.warn('Backend offline, chargement local', error);
      return this.loadWorldLocal(worldId);
    }
  }

  /**
   * Charge une map depuis le local storage
   */
  async loadMapLocal(mapId: string): Promise<LoadResult<Map>> {
    try {
      const maps = this.getLocalMaps();
      const map = maps[mapId];
      
      if (!map) {
        return {
          success: false,
          error: `Map ${mapId} non trouvée`,
        };
      }

      const validated = validateMap(map);
      
      return {
        success: true,
        data: validated,
      };
    } catch (error) {
      return {
        success: false,
        error: `Erreur de chargement: ${error}`,
      };
    }
  }

  /**
   * Charge une map depuis le backend
   */
  async loadMapBackend(mapId: string): Promise<LoadResult<Map>> {
    try {
      const response = await fetch(`${this.BACKEND_URL}/maps/${mapId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const validated = validateMap(data);
      
      return {
        success: true,
        data: validated,
      };
    } catch (error) {
      // Fallback sur chargement local si backend offline
      console.warn('Backend offline, chargement local', error);
      return this.loadMapLocal(mapId);
    }
  }

  // ===== LISTING =====

  /**
   * Liste tous les worlds disponibles
   */
  async listWorlds(): Promise<{ local: World[]; backend: World[] }> {
    const local = Object.values(this.getLocalWorlds());
    
    let backend: World[] = [];
    try {
      const response = await fetch(`${this.BACKEND_URL}/worlds`);
      if (response.ok) {
        backend = await response.json();
      }
    } catch (error) {
      console.warn('Backend offline pour listing', error);
    }

    return { local, backend };
  }

  /**
   * Liste toutes les maps disponibles
   */
  async listMaps(): Promise<{ local: Map[]; backend: Map[] }> {
    const local = Object.values(this.getLocalMaps());
    
    let backend: Map[] = [];
    try {
      const response = await fetch(`${this.BACKEND_URL}/maps`);
      if (response.ok) {
        backend = await response.json();
      }
    } catch (error) {
      console.warn('Backend offline pour listing', error);
    }

    return { local, backend };
  }

  // ===== IMPORT/EXPORT =====

  /**
   * Exporte world + map en un seul fichier JSON
   */
  exportBundle(world: World, map: Map): string {
    return JSON.stringify({
      version: '2.0',
      type: 'unified_bundle',
      exported: new Date().toISOString(),
      world,
      map,
    }, null, 2);
  }

  /**
   * Importe un bundle world + map
   */
  async importBundle(jsonData: string): Promise<LoadResult<{ world: World; map: Map }>> {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.type !== 'unified_bundle') {
        throw new Error('Format invalide, attendu: unified_bundle');
      }

      const world = validateWorld(data.world);
      const map = validateMap(data.map);
      
      return {
        success: true,
        data: { world, map },
      };
    } catch (error) {
      return {
        success: false,
        error: `Erreur d'import: ${error}`,
      };
    }
  }

  /**
   * Télécharge un fichier JSON
   */
  downloadFile(data: string, filename: string): void {
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ===== HELPERS =====

  private getLocalWorlds(): Record<string, World> {
    const stored = localStorage.getItem(this.STORAGE_KEY_WORLDS);
    return stored ? JSON.parse(stored) : {};
  }

  private getLocalMaps(): Record<string, Map> {
    const stored = localStorage.getItem(this.STORAGE_KEY_MAPS);
    return stored ? JSON.parse(stored) : {};
  }

  /**
   * Nettoie le cache local
   */
  clearLocalCache(): void {
    localStorage.removeItem(this.STORAGE_KEY_WORLDS);
    localStorage.removeItem(this.STORAGE_KEY_MAPS);
  }

  /**
   * Obtient les statistiques de stockage
   */
  getStorageStats(): {
    worldsCount: number;
    mapsCount: number;
    totalSize: number;
  } {
    const worlds = this.getLocalWorlds();
    const maps = this.getLocalMaps();
    
    const worldsSize = JSON.stringify(worlds).length;
    const mapsSize = JSON.stringify(maps).length;
    
    return {
      worldsCount: Object.keys(worlds).length,
      mapsCount: Object.keys(maps).length,
      totalSize: worldsSize + mapsSize,
    };
  }
}

// Singleton
export const MapFileService = new MapFileServiceClass();
