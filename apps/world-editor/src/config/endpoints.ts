/**
 * 🔮 Configuration centralisée des endpoints
 * Équipe PROFONDEUR - Ports dédiés selon ARCHITECTURE_PORTS_SEPARATION.md
 */

export const ENDPOINTS = {
  // 🔮 ÉQUIPE PROFONDEUR (nous)
  profondeur: {
    rust: 'http://localhost:3001',      // Backend Rust + V2 Controller
    vectorDB: 'http://localhost:5001',  // Vector DB pour recherche sémantique
    webSocket: 'ws://localhost:8001',   // WebSocket temps réel
  },
  
  // 🌊 ÉQUIPE SURFACE (Frontend team)
  surface: {
    gameServer: 'http://localhost:3002',
    apiGateway: 'http://localhost:5002',
    webSocket: 'ws://localhost:8002',
  },
  
  // ☕ BACKEND JAVA
  backend: {
    springBoot: 'http://localhost:8080',
    admin: 'http://localhost:8081',
    metrics: 'http://localhost:8082',
  }
} as const;

// API Vector DB
export const VECTOR_API = {
  health: `${ENDPOINTS.profondeur.vectorDB}/health`,
  search: `${ENDPOINTS.profondeur.vectorDB}/search`,
  status: `${ENDPOINTS.profondeur.vectorDB}/api/status`,
  build: `${ENDPOINTS.profondeur.vectorDB}/api/build`,
};

// API Rust Backend
export const RUST_API = {
  // V2 Controller
  v2Config: `${ENDPOINTS.profondeur.rust}/api/v2/config`,
  v2Tick: `${ENDPOINTS.profondeur.rust}/api/v2/tick`,
  v2Entity: `${ENDPOINTS.profondeur.rust}/api/v2/entity`,
  
  // Map & Scenarios
  mapGenerate: `${ENDPOINTS.profondeur.rust}/api/map/generate`,
  mapInit: `${ENDPOINTS.profondeur.rust}/api/map/init`,
  scenariosImport: `${ENDPOINTS.profondeur.rust}/api/scenarios/import`,
  
  // Archives (Vector DB bridge)
  archivesSearch: `${ENDPOINTS.profondeur.rust}/api/archives/search`,
  archivesStatus: `${ENDPOINTS.profondeur.rust}/api/archives/status`,
};

// API Java Backend
export const JAVA_API = {
  health: `${ENDPOINTS.backend.springBoot}/api/health`,
  scenarios: `${ENDPOINTS.backend.springBoot}/api/scenarios`,
  heroes: `${ENDPOINTS.backend.springBoot}/api/heroes`,
  formulas: `${ENDPOINTS.backend.springBoot}/api/interstice/cast-formula`,
};
