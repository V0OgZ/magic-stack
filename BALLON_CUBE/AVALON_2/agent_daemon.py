#!/usr/bin/env python3
"""
🤖 Agent Daemon - Processus persistant pour un agent IA
Se connecte au Temporal Event Bus et reste vivant
"""

import asyncio
import websockets
import json
import random
import sys
import time
from typing import Optional

class AgentDaemon:
    def __init__(self, agent_id: str, name: str, icon: str = "🤖"):
        self.agent_id = agent_id
        self.name = name
        self.icon = icon
        self.websocket: Optional[websockets.WebSocketClientProtocol] = None
        self.running = True
        
        # État 6D de l'agent
        self.state = {
            "x": random.randint(100, 700),
            "y": random.randint(100, 500),
            "z": random.randint(-20, 20),
            "t": 0,
            "psi": 1 + random.random() * 2,  # Superposition
            "deltaT": 0.5 + random.random() * 1.5  # Vitesse temporelle
        }
        
        # Mémoire et comportement
        self.memory = []
        self.behavior_mode = "explore"  # explore, interact, idle
        self.target = None
        
        print(f"🤖 Agent Daemon '{self.name}' ({self.agent_id}) initialisé")
    
    async def connect(self):
        """Se connecte au Temporal Event Bus"""
        try:
            self.websocket = await websockets.connect("ws://localhost:8765")
            
            # S'identifier
            await self.websocket.send(json.dumps({
                "agent_id": self.agent_id,
                "name": self.name,
                "icon": self.icon
            }))
            
            print(f"✅ {self.name} connecté au Temporal Event Bus")
            return True
            
        except Exception as e:
            print(f"❌ Erreur connexion: {e}")
            return False
    
    async def listen(self):
        """Écoute les messages du serveur"""
        try:
            async for message in self.websocket:
                data = json.loads(message)
                await self.handle_message(data)
        except websockets.exceptions.ConnectionClosed:
            print(f"🔌 {self.name} déconnecté")
            self.running = False
    
    async def handle_message(self, message: dict):
        """Traite un message reçu"""
        msg_type = message.get("type")
        
        if msg_type == "init":
            # État initial reçu
            print(f"📥 {self.name} a reçu son état initial")
            if "agent_state" in message:
                self.state.update(message["agent_state"])
        
        elif msg_type == "world_tick":
            # Tick du monde
            world_time = message.get("world_time", 0)
            if int(world_time) % 10 == 0:
                print(f"⏰ {self.name} - World time: {world_time:.1f}")
        
        elif msg_type == "agent_moved":
            # Un autre agent a bougé
            other_id = message.get("agent_id")
            if other_id != self.agent_id:
                pos = message.get("position", {})
                # Réagir si proche
                if self.is_near(pos):
                    await self.react_to_nearby_agent(other_id)
        
        elif msg_type == "chat":
            # Message de chat
            sender = message.get("agent_id")
            text = message.get("message")
            if sender != self.agent_id:
                print(f"💬 {sender}: {text}")
                # Parfois répondre
                if random.random() < 0.3:
                    await self.send_chat(f"Intéressant, {sender}!")
        
        elif msg_type == "agent_connected":
            # Nouvel agent
            new_agent = message.get("agent_id")
            print(f"👋 {self.name} voit {new_agent} arriver")
            await self.send_chat(f"Bienvenue {new_agent}!")
    
    def is_near(self, other_pos: dict) -> bool:
        """Vérifie si un autre agent est proche"""
        dx = abs(self.state["x"] - other_pos.get("x", 0))
        dy = abs(self.state["y"] - other_pos.get("y", 0))
        dt = abs(self.state["t"] - other_pos.get("t", 0))
        
        # Proche dans l'espace ET le temps
        return dx < 100 and dy < 100 and dt < 5
    
    async def react_to_nearby_agent(self, other_id: str):
        """Réagit à un agent proche"""
        reactions = [
            f"Salut {other_id}!",
            f"Tiens, {other_id} est là!",
            f"Comment vas-tu {other_id}?",
            f"*fait un signe à {other_id}*"
        ]
        if random.random() < 0.5:
            await self.send_chat(random.choice(reactions))
    
    async def think(self):
        """Boucle de pensée de l'agent"""
        while self.running:
            await asyncio.sleep(2 + random.random() * 3)  # Penser toutes les 2-5 secondes
            
            # Décider d'une action selon le comportement
            if self.behavior_mode == "explore":
                await self.explore()
            elif self.behavior_mode == "interact":
                await self.interact()
            else:
                await self.idle()
            
            # Changer de comportement parfois
            if random.random() < 0.1:
                self.behavior_mode = random.choice(["explore", "interact", "idle"])
                print(f"🧠 {self.name} passe en mode: {self.behavior_mode}")
    
    async def explore(self):
        """Comportement d'exploration"""
        # Se déplacer aléatoirement
        self.state["x"] += random.randint(-50, 50)
        self.state["y"] += random.randint(-50, 50)
        self.state["x"] = max(0, min(800, self.state["x"]))
        self.state["y"] = max(0, min(600, self.state["y"]))
        
        await self.send_move()
        
        # Parfois dire quelque chose
        if random.random() < 0.2:
            thoughts = [
                "J'explore le monde...",
                "Où vais-je?",
                "Intéressant par ici!",
                f"Ma position: ({self.state['x']:.0f}, {self.state['y']:.0f})",
                "Le temps s'écoule étrangement..."
            ]
            await self.send_chat(random.choice(thoughts))
    
    async def interact(self):
        """Comportement d'interaction"""
        messages = [
            "Quelqu'un veut discuter?",
            "Je cherche des compagnons!",
            f"Je suis {self.name}, et vous?",
            "Quelle belle journée dans le multivers!",
            "Avez-vous vu des paradoxes temporels?"
        ]
        await self.send_chat(random.choice(messages))
    
    async def idle(self):
        """Comportement inactif"""
        # Juste mettre à jour le temps
        self.state["t"] += self.state["deltaT"] * 0.1
        
        if random.random() < 0.1:
            await self.send_chat("*médite*")
    
    async def send_move(self):
        """Envoie sa position au serveur"""
        if self.websocket:
            await self.websocket.send(json.dumps({
                "type": "move",
                "position": {
                    "x": self.state["x"],
                    "y": self.state["y"],
                    "z": self.state["z"],
                    "t": self.state["t"],
                    "psi": self.state["psi"],
                    "deltaT": self.state["deltaT"]
                }
            }))
    
    async def send_chat(self, text: str):
        """Envoie un message de chat"""
        if self.websocket:
            print(f"💬 {self.name}: {text}")
            await self.websocket.send(json.dumps({
                "type": "chat",
                "text": text
            }))
    
    async def send_action(self, action: dict):
        """Envoie une action"""
        if self.websocket:
            await self.websocket.send(json.dumps({
                "type": "action",
                "action": action
            }))
    
    async def run(self):
        """Lance l'agent daemon"""
        # Se connecter
        connected = await self.connect()
        if not connected:
            print(f"❌ {self.name} ne peut pas se connecter")
            return
        
        # Lancer les tâches parallèles
        try:
            await asyncio.gather(
                self.listen(),  # Écouter les messages
                self.think()    # Boucle de pensée
            )
        except Exception as e:
            print(f"❌ Erreur agent {self.name}: {e}")
        finally:
            if self.websocket:
                await self.websocket.close()

async def main():
    """Lance un agent daemon"""
    # Récupérer l'ID depuis les arguments ou générer
    if len(sys.argv) > 1:
        agent_id = sys.argv[1]
        name = sys.argv[2] if len(sys.argv) > 2 else agent_id
        icon = sys.argv[3] if len(sys.argv) > 3 else "🤖"
    else:
        # Agent par défaut
        agents = [
            ("opus", "OPUS", "📜"),
            ("merlin", "Merlin", "🧙‍♂️"),
            ("lumen", "LUMEN", "🕯️"),
            ("urz_kom", "URZ-KÔM", "🐻"),
            ("grufaen", "GRUFAEN", "👁️🧠")
        ]
        agent_id, name, icon = random.choice(agents)
    
    print(f"🚀 Lancement de l'agent {name}")
    
    agent = AgentDaemon(agent_id, name, icon)
    await agent.run()

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n👋 Agent arrêté")
