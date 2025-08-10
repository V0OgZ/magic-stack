/**
 * 🔄 Service WebSocket - Live Preview & Synchronisation
 * Connexion temps réel avec le backend pour observer les ticks V2
 */

import type { Scenario } from '../domain/schema';
import { ENDPOINTS } from '../config/endpoints';

export type WSMessage = 
  | { type: 'tick'; payload: TickPayload }
  | { type: 'paradox'; payload: ParadoxPayload }
  | { type: 'sync'; payload: SyncPayload }
  | { type: 'error'; payload: { message: string } }
  | { type: 'connected' }
  | { type: 'disconnected' };

export interface TickPayload {
  tw: number;
  te: number;
  drift: number;
  debt: number;
  entities: Array<{
    id: string;
    position: { x: number; y: number };
    te: number;
    energy_complex?: { A: number; phi: number };
  }>;
}

export interface ParadoxPayload {
  type: 'excessive_drift' | 'temporal_debt' | 'overload_explosion';
  severity: 'low' | 'medium' | 'high' | 'critical';
  entities: string[];
  message?: string;
}

export interface SyncPayload {
  scenario: Partial<Scenario>;
  timestamp: number;
}

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();
  private isConnecting = false;
  private shouldReconnect = true;
  private reconnectDelay = 1000;
  private maxReconnectDelay = 30000;
  
  /**
   * Se connecter au WebSocket
   */
  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN || this.isConnecting) {
      return;
    }
    
    this.isConnecting = true;
    this.shouldReconnect = true;
    
    try {
      this.ws = new WebSocket(ENDPOINTS.profondeur.webSocket);
      
      this.ws.onopen = () => {
        console.log('✅ WebSocket connecté');
        this.isConnecting = false;
        this.reconnectDelay = 1000; // Reset delay
        this.emit('connected', {});
      };
      
      this.ws.onmessage = (event) => {
        try {
          const message: WSMessage = JSON.parse(event.data);
          this.handleMessage(message);
        } catch (error) {
          console.error('Erreur parsing message WebSocket:', error);
        }
      };
      
      this.ws.onerror = (error) => {
        console.error('❌ WebSocket erreur:', error);
        this.isConnecting = false;
        this.emit('error', { message: 'WebSocket connection error' });
      };
      
      this.ws.onclose = () => {
        console.log('WebSocket déconnecté');
        this.isConnecting = false;
        this.ws = null;
        this.emit('disconnected', {});
        
        if (this.shouldReconnect) {
          this.scheduleReconnect();
        }
      };
    } catch (error) {
      console.error('Erreur création WebSocket:', error);
      this.isConnecting = false;
      this.scheduleReconnect();
    }
  }
  
  /**
   * Se déconnecter
   */
  disconnect(): void {
    this.shouldReconnect = false;
    
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
  
  /**
   * Programmer une reconnexion
   */
  private scheduleReconnect(): void {
    if (!this.shouldReconnect || this.reconnectTimer) {
      return;
    }
    
    console.log(`Reconnexion dans ${this.reconnectDelay}ms...`);
    
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, this.reconnectDelay);
    
    // Augmenter le délai pour la prochaine tentative (backoff exponentiel)
    this.reconnectDelay = Math.min(this.reconnectDelay * 2, this.maxReconnectDelay);
  }
  
  /**
   * Traiter un message reçu
   */
  private handleMessage(message: WSMessage): void {
    console.log('📨 Message WebSocket:', message.type);
    
    switch (message.type) {
      case 'tick':
        this.emit('tick', message.payload);
        break;
        
      case 'paradox':
        this.emit('paradox', message.payload);
        break;
        
      case 'sync':
        this.emit('sync', message.payload);
        break;
        
      case 'error':
        console.error('Erreur serveur:', message.payload.message);
        this.emit('error', message.payload);
        break;
        
      case 'connected':
        this.emit('connected', {});
        break;
        
      case 'disconnected':
        this.emit('disconnected', {});
        break;
    }
  }
  
  /**
   * Envoyer un message
   */
  send(type: string, payload: any): void {
    if (this.ws?.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket non connecté, impossible d\'envoyer:', type);
      return;
    }
    
    try {
      this.ws.send(JSON.stringify({ type, payload }));
    } catch (error) {
      console.error('Erreur envoi WebSocket:', error);
    }
  }
  
  /**
   * Démarrer l'observation live (mode preview)
   */
  startLivePreview(scenarioId: string): void {
    this.send('observe', { scenario_id: scenarioId, mode: 'preview' });
  }
  
  /**
   * Arrêter l'observation
   */
  stopLivePreview(): void {
    this.send('unobserve', {});
  }
  
  /**
   * Demander un tick manuel
   */
  requestTick(): void {
    this.send('tick', { manual: true });
  }
  
  /**
   * Synchroniser l'état actuel
   */
  syncState(scenario: Scenario): void {
    this.send('sync', {
      scenario: {
        id: scenario.id,
        temporal: scenario.initial_state.temporal,
        map: scenario.map,
        events: scenario.events.length,
      }
    });
  }
  
  /**
   * S'abonner à un événement
   */
  on(event: string, callback: (data: any) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }
  
  /**
   * Se désabonner
   */
  off(event: string, callback: (data: any) => void): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.delete(callback);
    }
  }
  
  /**
   * Émettre un événement
   */
  private emit(event: string, data: any): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(cb => cb(data));
    }
  }
  
  /**
   * État de connexion
   */
  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
  
  /**
   * État de la tentative de connexion
   */
  get connecting(): boolean {
    return this.isConnecting;
  }
}

// Export singleton
export const wsService = new WebSocketService();
