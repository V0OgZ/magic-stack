#!/usr/bin/env python3
"""
Vector DB as Message Bus - Communication Backend/Frontend
Port: 5001
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import time
from datetime import datetime
import os
from collections import deque

app = Flask(__name__)
CORS(app)

# Message bus storage
messages = deque(maxlen=1000)  # Keep last 1000 messages
game_states = {}  # Current states by type

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ready", "service": "vector-bus", "port": 5001})

@app.route('/api/archives/search', methods=['POST'])
def search():
    """Original Vector DB search (compatibility)"""
    data = request.json
    query = data.get('query', '')
    mode = data.get('mode', 'story')
    top_k = data.get('top_k', 5)
    
    # Mock results for now (replace with real FAISS search)
    results = [
        {"content": f"Result for '{query}' in {mode} mode", "score": 0.95}
    ]
    return jsonify({"results": results})

@app.route('/api/bus/push', methods=['POST'])
def push_message():
    """Backend PUSH game state/events"""
    data = request.json
    message = {
        "type": data.get("type", "event"),
        "source": data.get("source", "backend"),
        "data": data.get("data", {}),
        "timestamp": time.time(),
        "datetime": datetime.now().isoformat()
    }
    
    # Add to message queue
    messages.append(message)
    
    # Update current state if it's a state message
    if message["type"].endswith("_state"):
        game_states[message["type"]] = message
    
    return jsonify({
        "success": True, 
        "message_id": len(messages),
        "timestamp": message["timestamp"]
    })

@app.route('/api/bus/pull', methods=['GET'])
def pull_messages():
    """Frontend PULL updates since timestamp"""
    since = float(request.args.get('since', 0))
    msg_type = request.args.get('type', None)
    
    # Filter messages
    filtered = []
    for msg in messages:
        if msg["timestamp"] > since:
            if msg_type is None or msg["type"] == msg_type:
                filtered.append(msg)
    
    return jsonify({
        "messages": filtered,
        "count": len(filtered),
        "latest_timestamp": filtered[-1]["timestamp"] if filtered else since
    })

@app.route('/api/bus/state/<state_type>', methods=['GET'])
def get_state(state_type):
    """Get current state by type"""
    if state_type in game_states:
        return jsonify(game_states[state_type])
    return jsonify({"error": "State not found"}), 404

@app.route('/api/bus/clear', methods=['POST'])
def clear_bus():
    """Clear message bus (dev only)"""
    messages.clear()
    game_states.clear()
    return jsonify({"success": True, "message": "Bus cleared"})

if __name__ == '__main__':
    print("🚌 Vector Bus starting on port 5001...")
    print("📡 Endpoints:")
    print("  POST /api/bus/push     - Backend push messages")
    print("  GET  /api/bus/pull     - Frontend pull updates")
    print("  GET  /api/bus/state    - Get current states")
    print("  POST /api/archives/search - Vector search (compat)")
    app.run(debug=True, port=5001, host='0.0.0.0')
