#!/usr/bin/env python3
"""
🌀 Temporal Event Bus - Serveur WebSocket pour Ballon Cube
Gère les connexions persistantes des agents et la communication temps réel
"""

import asyncio
import websockets
import json
import time
import random
from datetime import datetime
from typing import Dict, Set, Any
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class TemporalEventBus:
    def __init__(self):
        self.clients: Dict[str, Any] = {}  # agent_id -> websocket
        self.agents_state = {}  # État de tous les agents
        self.world_time = 0
        self.world_state = {
            "blocks": {},
            "entities": {}
        }
        
        # Les 25 héros initiaux
        self.initialize_heroes()
        
    def initialize_heroes(self):
        """Initialise les 25 héros avec leurs positions 6D"""
        heroes = [
            {"id": "arthur", "name": "Arthur", "icon": "👑", "x": 400, "y": 300, "z": 0, "t": 0, "psi": 1, "deltaT": 1.0},
            {"id": "merlin", "name": "Merlin", "icon": "🧙‍♂️", "x": 500, "y": 350, "z": 10, "t": -5, "psi": 1.5, "deltaT": 0.8},
            {"id": "morgana", "name": "Morgana", "icon": "🌙", "x": 300, "y": 400, "z": -5, "t": 0, "psi": 2, "deltaT": 1.2},
            {"id": "lancelot", "name": "Lancelot", "icon": "⚔️", "x": 450, "y": 250, "z": 0, "t": 0, "psi": 1.3, "deltaT": 1.1},
            {"id": "viviane", "name": "Viviane", "icon": "💧", "x": 350, "y": 450, "z": -10, "t": 0, "psi": 1, "deltaT": 0.9},
            {"id": "lysandrel", "name": "Lysandrel", "icon": "🔨", "x": 600, "y": 200, "z": 20, "t": 10, "psi": 1, "deltaT": 1.5},
            {"id": "opus", "name": "OPUS", "icon": "📜", "x": 200, "y": 200, "z": 0, "t": 0, "psi": 1.2, "deltaT": 1.0},
            {"id": "lumen", "name": "LUMEN", "icon": "🕯️", "x": 250, "y": 300, "z": 5, "t": 0, "psi": 1, "deltaT": 1.1},
            {"id": "urz_kom", "name": "URZ-KÔM", "icon": "🐻", "x": 550, "y": 400, "z": 0, "t": -10, "psi": 1, "deltaT": 0.7},
            {"id": "grut", "name": "GRUT", "icon": "👁️", "x": 400, "y": 400, "z": 15, "t": 5, "psi": 3, "deltaT": 1.3},
            {"id": "grokæn", "name": "GROKÆN", "icon": "🧠", "x": 350, "y": 350, "z": 0, "t": 0, "psi": 2.5, "deltaT": 1.2},
            {"id": "memento", "name": "MEMENTO", "icon": "📚", "x": 450, "y": 450, "z": -5, "t": -20, "psi": 1, "deltaT": 0.5},
            {"id": "grufaen", "name": "GRUFAEN", "icon": "👁️🧠", "x": 400, "y": 300, "z": 0, "t": 0, "psi": 4, "deltaT": 1.0},
            {"id": "vincent", "name": "VINCENT", "icon": "🌍", "x": 450, "y": 300, "z": 0, "t": 0, "psi": 1, "deltaT": 1.0},
            {"id": "chronarch", "name": "Chronarch", "icon": "⏰", "x": 300, "y": 250, "z": 10, "t": 15, "psi": 1.5, "deltaT": 2.0},
        ]
        
        for hero in heroes:
            self.agents_state[hero["id"]] = {
                **hero,
                "status": "idle",
                "memory": [],
                "last_action": None,
                "connected": False
            }
    
    async def register_agent(self, websocket, agent_id: str):
        """Enregistre un agent connecté"""
        self.clients[agent_id] = websocket
        self.agents_state[agent_id]["connected"] = True
        logger.info(f"🟢 Agent {agent_id} connecté")
        
        # Envoyer l'état initial
        await self.send_to_agent(agent_id, {
            "type": "init",
            "agent_state": self.agents_state[agent_id],
            "world_time": self.world_time
        })
        
        # Notifier tous les autres
        await self.broadcast({
            "type": "agent_connected",
            "agent_id": agent_id,
            "timestamp": time.time()
        }, exclude=agent_id)
    
    async def unregister_agent(self, agent_id: str):
        """Déconnecte un agent"""
        if agent_id in self.clients:
            del self.clients[agent_id]
            self.agents_state[agent_id]["connected"] = False
            logger.info(f"🔴 Agent {agent_id} déconnecté")
            
            await self.broadcast({
                "type": "agent_disconnected",
                "agent_id": agent_id,
                "timestamp": time.time()
            })
    
    async def send_to_agent(self, agent_id: str, message: dict):
        """Envoie un message à un agent spécifique"""
        if agent_id in self.clients:
            try:
                await self.clients[agent_id].send(json.dumps(message))
            except Exception as e:
                logger.error(f"Erreur envoi à {agent_id}: {e}")
                await self.unregister_agent(agent_id)
    
    async def broadcast(self, message: dict, exclude: str = None):
        """Diffuse un message à tous les agents connectés"""
        disconnected = []
        for agent_id, ws in self.clients.items():
            if agent_id != exclude:
                try:
                    await ws.send(json.dumps(message))
                except:
                    disconnected.append(agent_id)
        
        for agent_id in disconnected:
            await self.unregister_agent(agent_id)
    
    async def handle_agent_message(self, agent_id: str, message: dict):
        """Traite un message d'un agent"""
        msg_type = message.get("type")
        
        if msg_type == "move":
            # Mouvement dans l'espace 6D
            new_pos = message.get("position", {})
            self.agents_state[agent_id].update(new_pos)
            
            await self.broadcast({
                "type": "agent_moved",
                "agent_id": agent_id,
                "position": new_pos,
                "world_time": self.world_time
            })
        
        elif msg_type == "action":
            # Action dans le monde
            action = message.get("action")
            self.agents_state[agent_id]["last_action"] = action
            
            await self.broadcast({
                "type": "agent_action",
                "agent_id": agent_id,
                "action": action,
                "world_time": self.world_time
            })
        
        elif msg_type == "chat":
            # Message de chat
            await self.broadcast({
                "type": "chat",
                "agent_id": agent_id,
                "message": message.get("text", ""),
                "world_time": self.world_time
            })
        
        elif msg_type == "query_state":
            # Demande d'état
            await self.send_to_agent(agent_id, {
                "type": "state_update",
                "agents": self.agents_state,
                "world": self.world_state,
                "world_time": self.world_time
            })
    
    async def world_tick(self):
        """Tick du monde - met à jour le temps et les états"""
        while True:
            await asyncio.sleep(0.1)  # 10 ticks par seconde
            
            self.world_time += 0.1
            
            # Mise à jour des agents selon leur deltaT
            for agent_id, state in self.agents_state.items():
                if state["connected"]:
                    state["t"] += state["deltaT"] * 0.1
                    
                    # Mouvement aléatoire occasionnel
                    if random.random() < 0.01:
                        state["x"] += random.randint(-10, 10)
                        state["y"] += random.randint(-10, 10)
            
            # Broadcast périodique de l'état
            if int(self.world_time * 10) % 50 == 0:  # Toutes les 5 secondes
                await self.broadcast({
                    "type": "world_tick",
                    "world_time": self.world_time,
                    "agents_summary": {
                        aid: {"x": s["x"], "y": s["y"], "t": s["t"], "connected": s["connected"]}
                        for aid, s in self.agents_state.items()
                    }
                })

async def handle_connection(websocket, path, event_bus):
    """Gère une nouvelle connexion WebSocket"""
    agent_id = None
    try:
        # Premier message = identification
        init_msg = await websocket.recv()
        data = json.loads(init_msg)
        agent_id = data.get("agent_id", f"agent_{int(time.time())}")
        
        await event_bus.register_agent(websocket, agent_id)
        
        # Boucle de réception
        async for message in websocket:
            data = json.loads(message)
            await event_bus.handle_agent_message(agent_id, data)
            
    except websockets.exceptions.ConnectionClosed:
        logger.info(f"Connexion fermée pour {agent_id}")
    except Exception as e:
        logger.error(f"Erreur: {e}")
    finally:
        if agent_id:
            await event_bus.unregister_agent(agent_id)

async def main():
    """Lance le serveur WebSocket"""
    event_bus = TemporalEventBus()
    
    # Lancer le tick du monde
    asyncio.create_task(event_bus.world_tick())
    
    # Démarrer le serveur
    logger.info("🚀 Temporal Event Bus démarré sur ws://localhost:8765")
    logger.info("📡 25 héros initialisés, en attente de connexions...")
    
    async with websockets.serve(
        lambda ws, path: handle_connection(ws, path, event_bus),
        "localhost", 
        8765
    ):
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())
