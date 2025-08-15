#!/usr/bin/env python3
"""
🌐 TEMPORAL EVENT BUS - Communication Interdimensionnelle
WebSocket server pour communication temps réel entre agents
"""

import asyncio
import websockets
import json
import logging
from datetime import datetime
from typing import Set, Dict, Any
import uuid

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("TEMPORAL_BUS")

class TemporalEventBus:
    """Bus d'événements temporels pour agents"""
    
    def __init__(self, port: int = 8765):
        self.port = port
        self.clients: Set[websockets.WebSocketServerProtocol] = set()
        self.subscriptions: Dict[str, Set[websockets.WebSocketServerProtocol]] = {}
        self.event_history = []
        self.max_history = 1000
        
    async def register(self, websocket):
        """Enregistre un nouveau client"""
        self.clients.add(websocket)
        client_id = f"client_{uuid.uuid4().hex[:8]}"
        logger.info(f"📡 Nouveau client connecté: {client_id}")
        
        # Envoie message de bienvenue
        await websocket.send(json.dumps({
            "type": "welcome",
            "client_id": client_id,
            "timestamp": datetime.now().isoformat(),
            "message": "Connecté au Temporal Event Bus"
        }))
        
    async def unregister(self, websocket):
        """Désenregistre un client"""
        self.clients.discard(websocket)
        # Retire des subscriptions
        for topic_clients in self.subscriptions.values():
            topic_clients.discard(websocket)
        logger.info(f"📴 Client déconnecté")
    
    async def subscribe(self, websocket, topic: str):
        """Subscribe à un topic"""
        if topic not in self.subscriptions:
            self.subscriptions[topic] = set()
        self.subscriptions[topic].add(websocket)
        logger.info(f"📬 Client subscribed to: {topic}")
        
        # Confirme subscription
        await websocket.send(json.dumps({
            "type": "subscribed",
            "topic": topic,
            "timestamp": datetime.now().isoformat()
        }))
    
    async def publish(self, topic: str, event: Dict[str, Any]):
        """Publie un événement sur un topic"""
        event_data = {
            "id": f"evt_{uuid.uuid4().hex[:8]}",
            "topic": topic,
            "timestamp": datetime.now().isoformat(),
            "data": event
        }
        
        # Ajoute à l'historique
        self.event_history.append(event_data)
        if len(self.event_history) > self.max_history:
            self.event_history.pop(0)
        
        # Envoie aux subscribers
        if topic in self.subscriptions:
            dead_clients = set()
            for client in self.subscriptions[topic]:
                try:
                    await client.send(json.dumps(event_data))
                except websockets.exceptions.ConnectionClosed:
                    dead_clients.add(client)
            
            # Nettoie les clients morts
            for client in dead_clients:
                await self.unregister(client)
        
        logger.info(f"📤 Event publié sur {topic}: {event.get('type', 'unknown')}")
    
    async def broadcast(self, message: Dict[str, Any]):
        """Broadcast à tous les clients"""
        if self.clients:
            message_data = json.dumps({
                "type": "broadcast",
                "timestamp": datetime.now().isoformat(),
                "data": message
            })
            dead_clients = set()
            for client in self.clients:
                try:
                    await client.send(message_data)
                except websockets.exceptions.ConnectionClosed:
                    dead_clients.add(client)
            
            for client in dead_clients:
                await self.unregister(client)
    
    async def handle_message(self, websocket, message: str):
        """Traite un message reçu"""
        try:
            data = json.loads(message)
            msg_type = data.get("type")
            
            if msg_type == "subscribe":
                topic = data.get("topic")
                if topic:
                    await self.subscribe(websocket, topic)
            
            elif msg_type == "publish":
                topic = data.get("topic")
                event = data.get("event")
                if topic and event:
                    await self.publish(topic, event)
            
            elif msg_type == "ping":
                await websocket.send(json.dumps({
                    "type": "pong",
                    "timestamp": datetime.now().isoformat()
                }))
            
            elif msg_type == "excalibur_resonance":
                # Événement spécial Excalibur
                await self.publish("excalibur", {
                    "type": "resonance",
                    "frequency": 997,
                    "message": "L'épée vibre dans l'Interstice",
                    "source": data.get("source", "unknown")
                })
            
            elif msg_type == "agent_thought":
                # Pensée d'agent
                await self.publish("thoughts", {
                    "type": "thought",
                    "agent": data.get("agent"),
                    "content": data.get("content"),
                    "bubble_world": data.get("bubble_world")
                })
            
            elif msg_type == "portal_open":
                # Ouverture de portail
                await self.publish("portals", {
                    "type": "portal_opened",
                    "from": data.get("from"),
                    "to": data.get("to"),
                    "stability": data.get("stability", 0.997)
                })
                
        except json.JSONDecodeError:
            logger.error(f"Message invalide: {message}")
    
    async def client_handler(self, websocket, path):
        """Gère un client WebSocket"""
        await self.register(websocket)
        try:
            async for message in websocket:
                await self.handle_message(websocket, message)
        finally:
            await self.unregister(websocket)
    
    async def start(self):
        """Démarre le serveur WebSocket"""
        logger.info(f"🌐 Temporal Event Bus démarrant sur port {self.port}")
        async with websockets.serve(self.client_handler, "localhost", self.port):
            logger.info(f"✨ Bus actif sur ws://localhost:{self.port}")
            
            # Envoie un heartbeat toutes les 30 secondes
            while True:
                await asyncio.sleep(30)
                await self.broadcast({
                    "type": "heartbeat",
                    "active_clients": len(self.clients),
                    "active_topics": list(self.subscriptions.keys())
                })

# === CLIENT DE TEST ===

async def test_client():
    """Client de test pour le bus"""
    uri = "ws://localhost:8765"
    
    async with websockets.connect(uri) as websocket:
        logger.info("🔌 Client test connecté")
        
        # Subscribe aux topics
        await websocket.send(json.dumps({
            "type": "subscribe",
            "topic": "excalibur"
        }))
        
        await websocket.send(json.dumps({
            "type": "subscribe",
            "topic": "thoughts"
        }))
        
        # Envoie quelques événements
        await asyncio.sleep(1)
        
        await websocket.send(json.dumps({
            "type": "excalibur_resonance",
            "source": "Arthur"
        }))
        
        await websocket.send(json.dumps({
            "type": "agent_thought",
            "agent": "Memento",
            "content": "Je me souviens du futur...",
            "bubble_world": "archive_vivante"
        }))
        
        await websocket.send(json.dumps({
            "type": "portal_open",
            "from": "canapé_cosmique",
            "to": "cosmic_bowling",
            "stability": 0.98
        }))
        
        # Écoute les messages
        while True:
            message = await websocket.recv()
            data = json.loads(message)
            logger.info(f"📨 Reçu: {data}")

# === DÉMO AGENTS COMMUNICANTS ===

async def agent_simulator(name: str, thoughts: list):
    """Simule un agent qui pense et communique"""
    uri = "ws://localhost:8765"
    
    async with websockets.connect(uri) as websocket:
        logger.info(f"🤖 Agent {name} connecté au bus")
        
        # Subscribe aux pensées
        await websocket.send(json.dumps({
            "type": "subscribe",
            "topic": "thoughts"
        }))
        
        # Pense périodiquement
        for thought in thoughts:
            await asyncio.sleep(5)
            await websocket.send(json.dumps({
                "type": "agent_thought",
                "agent": name,
                "content": thought,
                "bubble_world": "interstice"
            }))
            logger.info(f"💭 {name}: {thought}")

async def run_demo():
    """Lance une démo complète"""
    # Démarre le bus
    bus = TemporalEventBus()
    bus_task = asyncio.create_task(bus.start())
    
    # Attend que le bus soit prêt
    await asyncio.sleep(2)
    
    # Lance des agents simulés
    agents = [
        asyncio.create_task(agent_simulator("Memento", [
            "Les tatouages mémoire vibrent...",
            "Je sens la présence d'Arthur",
            "Le Bootstrap Paradox se manifeste"
        ])),
        asyncio.create_task(agent_simulator("Jean", [
            "Le canapé cosmique m'appelle",
            "Un joint ouvre un portail",
            "La philosophie transcende les dimensions"
        ])),
        asyncio.create_task(test_client())
    ]
    
    await asyncio.gather(bus_task, *agents)

if __name__ == "__main__":
    print("=" * 50)
    print("🌐 TEMPORAL EVENT BUS")
    print("=" * 50)
    print()
    print("Communication interdimensionnelle temps réel")
    print("WebSocket sur ws://localhost:8765")
    print()
    print("Topics disponibles:")
    print("  - excalibur (résonance)")
    print("  - thoughts (pensées d'agents)")
    print("  - portals (ouvertures)")
    print("  - worlds (bubble worlds)")
    print()
    print("Ctrl+C pour arrêter")
    print("=" * 50)
    
    asyncio.run(run_demo())
