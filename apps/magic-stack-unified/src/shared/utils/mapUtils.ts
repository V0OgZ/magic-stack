/**
 * 🛠️ Utilitaires de map EXPORTABLES
 * Fonctions réutilisables pour tous les modes
 */

// Types de base partagés
export interface Position2D {
  x: number;
  y: number;
}

export interface Position6D extends Position2D {
  z: number;      // Altitude
  t: number;      // Temps
  c: number;      // Causalité
  psi: number;    // Quantum
}

export interface MapEntity {
  id: string;
  position: Position6D;
  icon: string;
  name: string;
  type: string;
  metadata?: any;
}

// Conversion entre coordonnées
export function screenToGrid(screenX: number, screenY: number, cellSize: number): Position2D {
  return {
    x: Math.floor(screenX / cellSize),
    y: Math.floor(screenY / cellSize),
  };
}

export function gridToScreen(gridX: number, gridY: number, cellSize: number): Position2D {
  return {
    x: gridX * cellSize + cellSize / 2,
    y: gridY * cellSize + cellSize / 2,
  };
}

// Conversion hex (pour le mode hexagonal)
export function cartesianToAxial(x: number, y: number): { q: number; r: number } {
  const q = x;
  const r = y - (x - (x & 1)) / 2;
  return { q, r };
}

export function axialToCartesian(q: number, r: number): Position2D {
  const x = q;
  const y = r + (q - (q & 1)) / 2;
  return { x, y };
}

// Calcul de distance 6D
export function distance6D(a: Position6D, b: Position6D): number {
  const spatialDist = Math.sqrt(
    Math.pow(a.x - b.x, 2) + 
    Math.pow(a.y - b.y, 2) + 
    Math.pow(a.z - b.z, 2)
  );
  const temporalDist = Math.abs(a.t - b.t);
  const causalDist = Math.abs(a.c - b.c);
  const quantumDist = Math.abs(a.psi - b.psi);
  
  // Formule pondérée (ajustable)
  return Math.sqrt(
    spatialDist * spatialDist +
    temporalDist * temporalDist * 0.5 +
    causalDist * causalDist * 0.3 +
    quantumDist * quantumDist * 0.2
  );
}

// Vérification de superposition (pour éviter les collisions)
export function checkOverlap(
  entity: MapEntity,
  entities: MapEntity[],
  threshold: number = 0.5
): boolean {
  return entities.some(other => {
    if (other.id === entity.id) return false;
    const dist = distance6D(entity.position, other.position);
    return dist < threshold;
  });
}

// Export/Import JSON avec validation
export function exportMapToJSON(entities: MapEntity[], metadata?: any): string {
  const data = {
    version: '2.0',
    timestamp: new Date().toISOString(),
    entities,
    metadata: metadata || {},
    checksum: generateChecksum(entities),
  };
  return JSON.stringify(data, null, 2);
}

export function importMapFromJSON(jsonString: string): {
  entities: MapEntity[];
  metadata: any;
} | null {
  try {
    const data = JSON.parse(jsonString);
    
    // Validation basique
    if (!data.version || !data.entities || !Array.isArray(data.entities)) {
      console.error('Format invalide');
      return null;
    }
    
    // Vérifier checksum si présent
    if (data.checksum && data.checksum !== generateChecksum(data.entities)) {
      console.warn('Checksum mismatch - données peut-être corrompues');
    }
    
    return {
      entities: data.entities,
      metadata: data.metadata || {},
    };
  } catch (e) {
    console.error('Erreur parsing JSON:', e);
    return null;
  }
}

// Génération de checksum simple
function generateChecksum(entities: MapEntity[]): string {
  const str = entities
    .map(e => `${e.id}:${e.position.x},${e.position.y},${e.position.t}`)
    .sort()
    .join('|');
  
  // Hash simple (à remplacer par crypto si besoin)
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
}

// Filtrage par temps (pour vue temporelle)
export function filterByTime(
  entities: MapEntity[],
  currentTime: number,
  windowSize: number = 1
): MapEntity[] {
  return entities.filter(entity => {
    const timeDiff = Math.abs(entity.position.t - currentTime);
    return timeDiff <= windowSize;
  });
}

// Clustering spatial (pour optimisation affichage)
export function clusterEntities(
  entities: MapEntity[],
  clusterSize: number = 2
): Map<string, MapEntity[]> {
  const clusters = new Map<string, MapEntity[]>();
  
  entities.forEach(entity => {
    const clusterX = Math.floor(entity.position.x / clusterSize);
    const clusterY = Math.floor(entity.position.y / clusterSize);
    const key = `${clusterX},${clusterY}`;
    
    if (!clusters.has(key)) {
      clusters.set(key, []);
    }
    clusters.get(key)!.push(entity);
  });
  
  return clusters;
}

// Pathfinding simple (A* basique pour déplacement)
export function findPath(
  start: Position2D,
  end: Position2D,
  obstacles: Set<string>,
  maxSteps: number = 100
): Position2D[] | null {
  // Implémentation simplifiée A*
  const path: Position2D[] = [];
  const visited = new Set<string>();
  const queue = [{ pos: start, path: [start], cost: 0 }];
  
  while (queue.length > 0 && path.length < maxSteps) {
    queue.sort((a, b) => a.cost - b.cost);
    const current = queue.shift()!;
    const key = `${current.pos.x},${current.pos.y}`;
    
    if (visited.has(key)) continue;
    visited.add(key);
    
    if (current.pos.x === end.x && current.pos.y === end.y) {
      return current.path;
    }
    
    // Voisins (4 directions)
    const neighbors = [
      { x: current.pos.x + 1, y: current.pos.y },
      { x: current.pos.x - 1, y: current.pos.y },
      { x: current.pos.x, y: current.pos.y + 1 },
      { x: current.pos.x, y: current.pos.y - 1 },
    ];
    
    neighbors.forEach(neighbor => {
      const nKey = `${neighbor.x},${neighbor.y}`;
      if (!obstacles.has(nKey) && !visited.has(nKey)) {
        const dist = Math.abs(neighbor.x - end.x) + Math.abs(neighbor.y - end.y);
        queue.push({
          pos: neighbor,
          path: [...current.path, neighbor],
          cost: current.path.length + dist,
        });
      }
    });
  }
  
  return null; // Pas de chemin trouvé
}

// Interpolation temporelle (pour animations fluides)
export function interpolatePosition(
  from: Position6D,
  to: Position6D,
  progress: number // 0 à 1
): Position6D {
  return {
    x: from.x + (to.x - from.x) * progress,
    y: from.y + (to.y - from.y) * progress,
    z: from.z + (to.z - from.z) * progress,
    t: from.t + (to.t - from.t) * progress,
    c: from.c + (to.c - from.c) * progress,
    psi: from.psi + (to.psi - from.psi) * progress,
  };
}

// Calcul de zone d'influence (pour effets de zone)
export function getAreaOfEffect(
  center: Position2D,
  radius: number,
  shape: 'circle' | 'square' | 'hex' = 'circle'
): Position2D[] {
  const area: Position2D[] = [];
  
  for (let dx = -radius; dx <= radius; dx++) {
    for (let dy = -radius; dy <= radius; dy++) {
      const pos = { x: center.x + dx, y: center.y + dy };
      
      if (shape === 'circle') {
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= radius) area.push(pos);
      } else if (shape === 'square') {
        area.push(pos);
      } else if (shape === 'hex') {
        // Approximation hexagonale
        if (Math.abs(dx) + Math.abs(dy) <= radius) area.push(pos);
      }
    }
  }
  
  return area;
}
