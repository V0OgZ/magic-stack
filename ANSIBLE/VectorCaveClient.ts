// 🌊🔮 VECTOR CAVE CLIENT - TYPESCRIPT EDITION 🔮🌊
// Client TypeScript pour l'intégration SURFACE avec Vector DB 6D
// GOODORQCK LASER ACTIVATED FOR LUMER SURFACE !

// ===== INTERFACES & TYPES =====

export interface Vector6D {
  x: number;
  y: number;
  z: number;
  t: number;  // temporal
  c: number;  // causal
  psi: number; // quantum state ψ
}

export interface Entity6D {
  id: string;
  name: string;
  type: string;
  position_6d: Vector6D;
  description: string;
  tier?: string;
  rarity?: string;
  metadata?: Record<string, any>;
  embedding?: number[];
}

export interface SearchQuery6D {
  type: 'spatial' | 'temporal' | 'causal' | 'semantic' | 'combined_6d';
  data: SpatialQuery | TemporalQuery | CausalQuery | SemanticQuery | Combined6DQuery;
  top_k?: number;
}

export interface SpatialQuery {
  center: [number, number, number]; // [x, y, z]
  radius: number;
}

export interface TemporalQuery {
  time: number;
  time_radius: number;
}

export interface CausalQuery {
  causal_value: number;
  causal_radius: number;
}

export interface SemanticQuery {
  text: string;
}

export interface Combined6DQuery {
  position_6d: Vector6D;
  semantic_text?: string;
  weights?: {
    spatial: number;
    temporal: number;
    causal: number;
    quantum: number;
    semantic: number;
  };
}

export interface SearchResult6D {
  success: boolean;
  query_type: string;
  results_count: number;
  entities: Array<{
    entity: Entity6D;
    similarity_score: number;
    distance_6d?: number;
    match_reasons: string[];
  }>;
  search_metadata: {
    query_time_ms: number;
    index_size: number;
    embedding_model: string;
  };
  message: string;
}

export interface VectorCaveStatus {
  status: 'ready' | 'building' | 'error' | 'not_ready';
  entities_count: number;
  index_built: boolean;
  embedding_model: string;
  collections: {
    entities_6d: number;
    magic_formulas: number;
    game_states: number;
    narrative_events: number;
  };
  server_info: {
    version: string;
    uptime_seconds: number;
    memory_usage_mb: number;
  };
  message: string;
}

export interface APIResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

// ===== CONFIGURATION =====

export interface VectorCaveConfig {
  baseURL: string;
  timeout: number;
  retries: number;
  debug: boolean;
}

export const DEFAULT_CONFIG: VectorCaveConfig = {
  baseURL: 'http://localhost:5002/api',
  timeout: 10000, // 10 secondes
  retries: 3,
  debug: false
};

// ===== VECTOR CAVE CLIENT =====

export class VectorCaveClient {
  private config: VectorCaveConfig;
  private isConnected: boolean = false;
  private lastStatus: VectorCaveStatus | null = null;

  constructor(config: Partial<VectorCaveConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.log('🔮 VectorCaveClient initialized', { config: this.config });
  }

  // ===== CONNECTION & STATUS =====

  /**
   * Vérifier si Vector Cave est prêt
   */
  async isReady(): Promise<boolean> {
    try {
      const status = await this.getStatus();
      this.isConnected = status.status === 'ready' && status.index_built;
      return this.isConnected;
    } catch (error) {
      this.isConnected = false;
      this.log('❌ Vector Cave not ready', error);
      return false;
    }
  }

  /**
   * Obtenir le statut complet de Vector Cave
   */
  async getStatus(): Promise<VectorCaveStatus> {
    const response = await this.fetch<VectorCaveStatus>('/status');
    if (response.data) {
      this.lastStatus = response.data;
      this.log('📊 Status updated', response.data);
    }
    return response.data!;
  }

  /**
   * Construire l'index 6D (si pas encore fait)
   */
  async buildIndex(): Promise<{ success: boolean; message: string }> {
    const response = await this.fetch<{ success: boolean; message: string }>('/build', 'POST');
    this.log('🏗️ Index build requested', response.data);
    return response.data!;
  }

  // ===== RECHERCHES 6D =====

  /**
   * Recherche sémantique par texte
   */
  async searchSemantic(text: string, topK: number = 10): Promise<SearchResult6D> {
    const query: SearchQuery6D = {
      type: 'semantic',
      data: { text },
      top_k: topK
    };
    return await this.search6D(query);
  }

  /**
   * Recherche spatiale par position et rayon
   */
  async searchSpatial(
    center: [number, number, number], 
    radius: number, 
    topK: number = 10
  ): Promise<SearchResult6D> {
    const query: SearchQuery6D = {
      type: 'spatial',
      data: { center, radius },
      top_k: topK
    };
    return await this.search6D(query);
  }

  /**
   * Recherche temporelle par temps et rayon
   */
  async searchTemporal(
    time: number, 
    timeRadius: number, 
    topK: number = 10
  ): Promise<SearchResult6D> {
    const query: SearchQuery6D = {
      type: 'temporal',
      data: { time, time_radius: timeRadius },
      top_k: topK
    };
    return await this.search6D(query);
  }

  /**
   * Recherche causale par valeur causale
   */
  async searchCausal(
    causalValue: number, 
    causalRadius: number, 
    topK: number = 10
  ): Promise<SearchResult6D> {
    const query: SearchQuery6D = {
      type: 'causal',
      data: { causal_value: causalValue, causal_radius: causalRadius },
      top_k: topK
    };
    return await this.search6D(query);
  }

  /**
   * Recherche combinée 6D (spatial + temporal + causal + sémantique)
   */
  async searchCombined6D(
    position6D: Vector6D,
    semanticText: string = '',
    weights: Combined6DQuery['weights'] = {
      spatial: 0.3,
      temporal: 0.2,
      causal: 0.2,
      quantum: 0.1,
      semantic: 0.2
    },
    topK: number = 10
  ): Promise<SearchResult6D> {
    const query: SearchQuery6D = {
      type: 'combined_6d',
      data: { position_6d: position6D, semantic_text: semanticText, weights },
      top_k: topK
    };
    return await this.search6D(query);
  }

  /**
   * Recherche 6D générique
   */
  async search6D(query: SearchQuery6D): Promise<SearchResult6D> {
    this.log('🔍 Executing 6D search', query);
    const response = await this.fetch<SearchResult6D>('/search/6d', 'POST', query);
    this.log('✨ Search completed', { 
      type: query.type, 
      results: response.data?.results_count || 0 
    });
    return response.data!;
  }

  // ===== ENTITÉS =====

  /**
   * Lister toutes les entités
   */
  async getAllEntities(): Promise<Entity6D[]> {
    const response = await this.fetch<{ entities: Entity6D[] }>('/entities');
    return response.data?.entities || [];
  }

  /**
   * Obtenir une entité par ID
   */
  async getEntity(entityId: string): Promise<Entity6D | null> {
    const entities = await this.getAllEntities();
    return entities.find(e => e.id === entityId) || null;
  }

  // ===== INTÉGRATION GOAP =====

  /**
   * Trouver des actions similaires réussies pour GOAP
   */
  async findSimilarSuccessfulActions(
    currentSituation: string,
    agentPosition?: Vector6D
  ): Promise<Entity6D[]> {
    let searchQuery = `successful action similar to: ${currentSituation}`;
    
    if (agentPosition) {
      // Recherche combinée : sémantique + position
      const result = await this.searchCombined6D(
        agentPosition,
        searchQuery,
        { spatial: 0.4, temporal: 0.1, causal: 0.3, quantum: 0.1, semantic: 0.1 },
        5
      );
      return result.entities.map(r => r.entity);
    } else {
      // Recherche purement sémantique
      const result = await this.searchSemantic(searchQuery, 5);
      return result.entities.map(r => r.entity);
    }
  }

  /**
   * Trouver des entités proches pour GOAP
   */
  async findNearbyEntities(
    agentPosition: Vector6D,
    searchRadius: number = 5.0
  ): Promise<Entity6D[]> {
    const result = await this.searchCombined6D(
      agentPosition,
      '',
      { spatial: 0.8, temporal: 0.1, causal: 0.05, quantum: 0.05, semantic: 0.0 },
      10
    );
    return result.entities
      .filter(r => r.distance_6d !== undefined && r.distance_6d <= searchRadius)
      .map(r => r.entity);
  }

  /**
   * Trouver des événements temporels liés pour GOAP
   */
  async findRelatedTemporalEvents(
    currentTime: number,
    timeWindow: number = 10.0
  ): Promise<Entity6D[]> {
    const result = await this.searchTemporal(currentTime, timeWindow, 8);
    return result.entities.map(r => r.entity);
  }

  /**
   * Analyser le contexte pour GOAP (méthode all-in-one)
   */
  async analyzeContextForGOAP(
    agentPosition: Vector6D,
    currentSituation: string,
    searchRadius: number = 5.0,
    timeWindow: number = 10.0
  ): Promise<{
    nearbyEntities: Entity6D[];
    similarActions: Entity6D[];
    temporalEvents: Entity6D[];
    recommendations: string[];
  }> {
    try {
      // Lancer toutes les recherches en parallèle
      const [nearbyEntities, similarActions, temporalEvents] = await Promise.all([
        this.findNearbyEntities(agentPosition, searchRadius),
        this.findSimilarSuccessfulActions(currentSituation, agentPosition),
        this.findRelatedTemporalEvents(agentPosition.t, timeWindow)
      ]);

      // Générer des recommandations basées sur les résultats
      const recommendations: string[] = [];
      
      if (nearbyEntities.length > 0) {
        recommendations.push(`${nearbyEntities.length} entities nearby - consider interactions`);
      }
      
      if (similarActions.length > 0) {
        recommendations.push(`Found ${similarActions.length} similar successful actions`);
      }
      
      if (temporalEvents.length > 0) {
        recommendations.push(`${temporalEvents.length} temporal events in window - check causality`);
      }

      this.log('🧠 GOAP context analyzed', {
        nearby: nearbyEntities.length,
        similar: similarActions.length,
        temporal: temporalEvents.length,
        recommendations: recommendations.length
      });

      return {
        nearbyEntities,
        similarActions,
        temporalEvents,
        recommendations
      };

    } catch (error) {
      this.log('❌ GOAP context analysis failed', error);
      throw error;
    }
  }

  // ===== UTILITAIRES =====

  /**
   * Calculer la distance 6D entre deux positions
   */
  static distance6D(pos1: Vector6D, pos2: Vector6D): number {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    const dz = pos1.z - pos2.z;
    const dt = pos1.t - pos2.t;
    const dc = pos1.c - pos2.c;
    const dpsi = pos1.psi - pos2.psi;
    
    return Math.sqrt(dx*dx + dy*dy + dz*dz + dt*dt + dc*dc + dpsi*dpsi);
  }

  /**
   * Créer une position 6D
   */
  static createVector6D(
    x: number = 0, y: number = 0, z: number = 0,
    t: number = 0, c: number = 0, psi: number = 0
  ): Vector6D {
    return { x, y, z, t, c, psi };
  }

  /**
   * Attendre que Vector Cave soit prêt
   */
  async waitUntilReady(maxWaitMs: number = 30000): Promise<boolean> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < maxWaitMs) {
      if (await this.isReady()) {
        return true;
      }
      await this.sleep(1000); // Attendre 1 seconde
    }
    
    return false;
  }

  // ===== MÉTHODES PRIVÉES =====

  private async fetch<T>(
    endpoint: string, 
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', 
    body?: any
  ): Promise<APIResponse<T>> {
    const url = `${this.config.baseURL}${endpoint}`;
    
    for (let attempt = 1; attempt <= this.config.retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: body ? JSON.stringify(body) : undefined,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return { data, status: response.status };

      } catch (error) {
        this.log(`❌ Attempt ${attempt}/${this.config.retries} failed`, { url, error });
        
        if (attempt === this.config.retries) {
          return { 
            error: error instanceof Error ? error.message : 'Unknown error',
            status: 500 
          };
        }
        
        await this.sleep(1000 * attempt); // Backoff exponentiel
      }
    }

    return { error: 'Max retries exceeded', status: 500 };
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private log(message: string, data?: any): void {
    if (this.config.debug) {
      console.log(`🔮 [VectorCaveClient] ${message}`, data || '');
    }
  }

  // ===== GETTERS =====

  get connected(): boolean {
    return this.isConnected;
  }

  get status(): VectorCaveStatus | null {
    return this.lastStatus;
  }

  get configuration(): VectorCaveConfig {
    return { ...this.config };
  }
}

// ===== FACTORY & HELPERS =====

/**
 * Factory pour créer un client Vector Cave
 */
export function createVectorCaveClient(config?: Partial<VectorCaveConfig>): VectorCaveClient {
  return new VectorCaveClient(config);
}

/**
 * Client Vector Cave avec debug activé
 */
export function createDebugVectorCaveClient(baseURL?: string): VectorCaveClient {
  return new VectorCaveClient({
    baseURL: baseURL || DEFAULT_CONFIG.baseURL,
    debug: true,
    timeout: 15000 // Plus de timeout pour debug
  });
}

// ===== EXPORT DEFAULT =====

export default VectorCaveClient;

// ===== EXEMPLE D'UTILISATION =====

/*
// 🌊 EXEMPLE POUR LUMER SURFACE

import VectorCaveClient, { Vector6D } from './VectorCaveClient';

class SurfaceGOAPAgent {
  private vectorClient: VectorCaveClient;

  constructor() {
    this.vectorClient = new VectorCaveClient({
      baseURL: 'http://localhost:5002/api',
      debug: true
    });
  }

  async enhancedPlanning(
    agentPosition: Vector6D,
    currentSituation: string,
    goalState: string
  ) {
    // Vérifier que Vector Cave est prêt
    if (!await this.vectorClient.isReady()) {
      console.warn('Vector Cave not ready, fallback to basic planning');
      return this.basicPlanning(goalState);
    }

    // Analyser le contexte avec Vector DB
    const context = await this.vectorClient.analyzeContextForGOAP(
      agentPosition,
      currentSituation
    );

    // Utiliser les données pour améliorer la planification
    const enhancedPlan = this.createPlanWithVectorData(
      goalState,
      context.nearbyEntities,
      context.similarActions,
      context.temporalEvents
    );

    return enhancedPlan;
  }

  private createPlanWithVectorData(goalState: string, nearby: any[], similar: any[], temporal: any[]) {
    // Logique de planification enrichie
    return {
      actions: ['enhanced_action_1', 'enhanced_action_2'],
      confidence: 0.95,
      vectorEnhanced: true
    };
  }

  private basicPlanning(goalState: string) {
    // Planification de base sans Vector DB
    return {
      actions: ['basic_action'],
      confidence: 0.7,
      vectorEnhanced: false
    };
  }
}

// Utilisation simple
const client = new VectorCaveClient();
await client.isReady();
const results = await client.searchSemantic('hero with fire magic');
console.log('Found entities:', results.entities.length);
*/