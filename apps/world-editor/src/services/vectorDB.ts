/**
 * 🔍 Service Vector DB - Connexion à la base vectorielle 6D
 * Recherche sémantique dans le lore et la documentation
 */

import { VECTOR_API, RUST_API } from '../config/endpoints';

export type SearchMode = 'story' | 'dev';

export interface VectorSearchResult {
  file_path: string;
  content: string;
  score: number;
  metadata?: {
    title?: string;
    type?: string;
    tags?: string[];
  };
}

export interface VectorSearchResponse {
  results: VectorSearchResult[];
  query: string;
  mode: SearchMode;
  execution_time?: number;
}

class VectorDBService {
  private isConnected = false;
  private useRustBridge = true; // Utiliser le bridge Rust par défaut
  
  /**
   * Vérifie la connexion au Vector DB
   */
  async checkConnection(): Promise<boolean> {
    try {
      // Essayer d'abord via le bridge Rust
      const rustResponse = await fetch(RUST_API.archivesStatus);
      if (rustResponse.ok) {
        this.useRustBridge = true;
        this.isConnected = true;
        console.log('✅ Vector DB connecté via Rust bridge (port 3001)');
        return true;
      }
    } catch (e) {
      console.log('Rust bridge non disponible, essai direct...');
    }
    
    try {
      // Essayer directement sur le Vector DB Python
      const response = await fetch(VECTOR_API.health);
      if (response.ok) {
        this.useRustBridge = false;
        this.isConnected = true;
        console.log('✅ Vector DB connecté directement (port 5001)');
        return true;
      }
    } catch (e) {
      console.error('❌ Vector DB non disponible:', e);
    }
    
    this.isConnected = false;
    return false;
  }
  
  /**
   * Recherche dans la base vectorielle
   */
  async search(query: string, mode: SearchMode = 'story', topK = 5): Promise<VectorSearchResponse | null> {
    if (!this.isConnected) {
      await this.checkConnection();
    }
    
    try {
      const endpoint = this.useRustBridge ? RUST_API.archivesSearch : VECTOR_API.search;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          mode,
          top_k: topK,
          limit: topK, // Pour compatibilité avec l'API Python directe
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error('Erreur recherche Vector DB:', error);
    }
    
    return null;
  }
  
  /**
   * Recherche contextuelle pour l'éditeur
   * Trouve des éléments pertinents selon le contexte actuel
   */
  async searchContextual(context: {
    terrain?: string;
    selectedHex?: { x: number; y: number };
    currentTool?: string;
  }): Promise<VectorSearchResponse | null> {
    // Construire une requête basée sur le contexte
    const queryParts: string[] = [];
    
    if (context.terrain) {
      queryParts.push(`terrain ${context.terrain}`);
    }
    
    if (context.currentTool) {
      queryParts.push(`outil ${context.currentTool}`);
    }
    
    if (context.selectedHex) {
      queryParts.push('carte hexagonale position');
    }
    
    // Si pas de contexte, recherche générale sur l'éditeur
    const query = queryParts.length > 0 
      ? queryParts.join(' ') 
      : 'éditeur carte monde Heroes of Time';
    
    return this.search(query, 'dev', 3);
  }
  
  /**
   * Recherche de tips pour Clippy
   */
  async getClippyTips(context?: string): Promise<string[]> {
    const tips: string[] = [];
    
    // Recherche contextuelle si contexte fourni
    if (context) {
      const results = await this.search(context, 'story', 3);
      if (results?.results) {
        results.results.forEach(r => {
          // Extraire une phrase courte du contenu
          const sentences = r.content.split(/[.!?]/);
          if (sentences[0] && sentences[0].length < 200) {
            tips.push(sentences[0].trim());
          }
        });
      }
    }
    
    // Ajouter des tips par défaut si pas assez de résultats
    if (tips.length < 3) {
      const defaultTips = [
        "Les hexagones sont la forme parfaite pour une carte - Hexagon is the bestagon!",
        "Le brouillard de causalité (CF) cache les conséquences futures de tes actions",
        "Utilise le Vector DB pour trouver des éléments de lore à placer sur ta carte",
        "Les régulateurs (Vince, Anna, Overload) maintiennent l'équilibre temporel",
        "Chaque terrain a ses propriétés: mystique pour la magie, quantum pour les paradoxes"
      ];
      
      tips.push(...defaultTips.slice(0, 3 - tips.length));
    }
    
    return tips;
  }
}

// Export singleton
export const vectorDB = new VectorDBService();
