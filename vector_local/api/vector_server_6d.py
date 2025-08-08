# 🚀🔮 VECTOR SERVER 6D - RETRO LASER EDITION 🔮🚀
# GOODORQCK LASER ACTIVATED FOR JEAN !

import os
import numpy as np
import json
from pathlib import Path
from typing import List, Dict, Any, Optional, Tuple
from dataclasses import dataclass
from datetime import datetime
import asyncio
import time

from flask import Flask, request, jsonify
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
import faiss

# 🌟 RETRO LASER IMPORTS 🌟
import logging
from collections import defaultdict
import threading
from concurrent.futures import ThreadPoolExecutor

# 🎮 FLASK APP RETRO STYLE 🎮
app = Flask(__name__)
CORS(app)

# 🔮 LOGGING RETRO LASER STYLE 🔮
logging.basicConfig(
    level=logging.INFO,
    format='🚀 %(asctime)s - %(name)s - 🔮 %(levelname)s - %(message)s'
)
logger = logging.getLogger('VECTOR_6D_LASER')

@dataclass
class Entity6D:
    """🧙‍♂️ Entité 6D dans l'espace-temps-causalité"""
    id: str
    name: str
    position_6d: List[float]  # [x, y, z, t, c, ψ]
    semantic_vector: List[float]  # Embedding 384D
    entity_type: str
    metadata: Dict[str, Any]
    
    def __post_init__(self):
        # Validation 6D
        if len(self.position_6d) != 6:
            raise ValueError("Position 6D doit avoir exactement 6 dimensions!")
        
        # Normalisation position quantique ψ
        if self.position_6d[5] < 0 or self.position_6d[5] > 1:
            self.position_6d[5] = max(0, min(1, self.position_6d[5]))

@dataclass 
class MagicFormula:
    """⚡ Formule magique vectorisée"""
    id: str
    formula: str
    description: str
    semantic_vector: List[float]
    magic_properties: List[float]  # [healing, damage, mana_cost, area, friendliness]
    compatibility_vector: List[float]
    spell_type: str
    metadata: Dict[str, Any]

class VectorDB6D:
    """🏛️ BASE VECTORIELLE 6D RETRO LASER 🏛️"""
    
    def __init__(self):
        logger.info("🚀 INITIALISATION VECTOR DB 6D RETRO LASER...")
        
        # 🔮 Configuration
        self.workspace_path = os.environ.get("VECTOR_WORKSPACE", "/workspace")
        self.embeddings_path = os.environ.get("VECTOR_EMBEDDINGS_PATH", "vector_local/embeddings")
        self.data_path = os.environ.get("VECTOR_DATA_PATH", "vector_local/data")
        
        # 🧠 Modèle d'embedding optimisé M4
        logger.info("🧠 Chargement modèle embedding...")
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        
        # 🏛️ Collections
        self.entities_6d = {}
        self.magic_formulas = {}
        self.narrative_events = {}
        
        # 🔍 Index FAISS
        self.entity_index = None
        self.formula_index = None
        self.narrative_index = None
        
        # 📊 Métadonnées
        self.entity_metadata = []
        self.formula_metadata = []
        self.narrative_metadata = []
        
        # 🎯 Thread pool pour performance
        self.executor = ThreadPoolExecutor(max_workers=4)
        
        # 📁 Créer dossiers
        os.makedirs(self.embeddings_path, exist_ok=True)
        os.makedirs(self.data_path, exist_ok=True)
        
        logger.info("✅ VECTOR DB 6D INITIALISÉE - LASER MODE READY!")
    
    def scan_heroes_and_artifacts(self) -> List[Dict]:
        """🔍 Scanner héros et artefacts dans les archives"""
        logger.info("🔍 SCAN RETRO LASER des archives Heroes of Time...")
        
        found_entities = []
        
        # 🧙 Scan héros
        heroes_path = Path(self.workspace_path) / "Treasures" / "💠 Essences scellées" / "🧙 Heroes"
        if heroes_path.exists():
            for hero_file in heroes_path.rglob("*.json"):
                try:
                    with open(hero_file, 'r', encoding='utf-8') as f:
                        hero_data = json.load(f)
                        if isinstance(hero_data, dict) and 'name' in hero_data:
                            hero_data['source_file'] = str(hero_file)
                            hero_data['entity_type'] = 'hero'
                            found_entities.append(hero_data)
                except Exception as e:
                    logger.warning(f"❌ Erreur lecture {hero_file}: {e}")
        
        # 🪙 Scan artefacts
        artifacts_path = Path(self.workspace_path) / "Treasures" / "💠 Essences scellées" / "🪙Artefacts"
        if artifacts_path.exists():
            for artifact_file in artifacts_path.rglob("*.json"):
                try:
                    with open(artifact_file, 'r', encoding='utf-8') as f:
                        artifact_data = json.load(f)
                        if isinstance(artifact_data, dict) and 'name' in artifact_data:
                            artifact_data['source_file'] = str(artifact_file)
                            artifact_data['entity_type'] = 'artifact'
                            found_entities.append(artifact_data)
                except Exception as e:
                    logger.warning(f"❌ Erreur lecture {artifact_file}: {e}")
        
        logger.info(f"✅ SCAN TERMINÉ - {len(found_entities)} entités trouvées!")
        return found_entities
    
    def extract_6d_position(self, entity_data: Dict) -> List[float]:
        """🎯 Extraire position 6D d'une entité"""
        
        # Position par défaut
        position_6d = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        
        # 📍 Position spatiale (x, y, z)
        if 'position' in entity_data:
            pos = entity_data['position']
            if isinstance(pos, dict):
                position_6d[0] = float(pos.get('x', 0))
                position_6d[1] = float(pos.get('y', 0)) 
                position_6d[2] = float(pos.get('z', 0))
            elif isinstance(pos, list) and len(pos) >= 3:
                position_6d[0] = float(pos[0])
                position_6d[1] = float(pos[1])
                position_6d[2] = float(pos[2])
        
        # ⏰ Position temporelle (t)
        if 'timeline' in entity_data:
            # Hash du timeline pour position temporelle
            timeline_hash = hash(str(entity_data['timeline'])) % 10000
            position_6d[3] = float(timeline_hash)
        elif 'level' in entity_data:
            position_6d[3] = float(entity_data['level'])
        
        # 🌀 Force causale (c)
        if 'causal_influence' in entity_data:
            position_6d[4] = float(entity_data['causal_influence'])
        elif 'tier' in entity_data:
            position_6d[4] = float(entity_data['tier']) / 10.0
        elif 'rarity' in entity_data:
            rarity_map = {
                'COMMON': 0.1, 'UNCOMMON': 0.3, 'RARE': 0.5,
                'EPIC': 0.7, 'LEGENDARY': 0.9, 'COSMIC': 1.0
            }
            position_6d[4] = rarity_map.get(entity_data['rarity'], 0.5)
        
        # ψ État quantique (psi)
        if 'quantum_state' in entity_data:
            position_6d[5] = float(entity_data['quantum_state'])
        elif 'magic' in entity_data:
            position_6d[5] = min(1.0, float(entity_data['magic']) / 100.0)
        else:
            # État quantique basé sur hash du nom
            name_hash = hash(entity_data.get('name', '')) % 1000
            position_6d[5] = name_hash / 1000.0
        
        return position_6d
    
    def create_entity_embeddings(self) -> Tuple[np.ndarray, List[Dict]]:
        """🧠 Créer embeddings des entités 6D"""
        logger.info("🧠 CRÉATION EMBEDDINGS ENTITÉS 6D...")
        
        entities_data = self.scan_heroes_and_artifacts()
        
        texts = []
        entities_6d = []
        
        for entity_data in entities_data:
            # 📝 Texte pour embedding
            name = entity_data.get('name', 'Unknown')
            description = entity_data.get('description', '')
            entity_type = entity_data.get('entity_type', 'unknown')
            
            text = f"{name} - {entity_type}: {description}"
            texts.append(text)
            
            # 🎯 Position 6D
            position_6d = self.extract_6d_position(entity_data)
            
            # 🧙‍♂️ Créer entité 6D
            entity_6d = {
                'id': entity_data.get('id', name.lower().replace(' ', '_')),
                'name': name,
                'position_6d': position_6d,
                'entity_type': entity_type,
                'metadata': entity_data
            }
            entities_6d.append(entity_6d)
        
        # 🔮 Génération embeddings
        logger.info(f"⚡ Génération embeddings pour {len(texts)} entités...")
        semantic_embeddings = self.model.encode(texts, show_progress_bar=True)
        
        # 🌟 Combinaison 6D + sémantique
        combined_embeddings = []
        for i, entity in enumerate(entities_6d):
            # Vecteur combiné: position_6d + semantic_embedding
            combined_vector = np.concatenate([
                np.array(entity['position_6d']),  # 6 dimensions
                semantic_embeddings[i]            # 384 dimensions
            ])
            combined_embeddings.append(combined_vector)
            
            # Sauvegarder dans collection
            entity['semantic_vector'] = semantic_embeddings[i].tolist()
            self.entities_6d[entity['id']] = entity
        
        embeddings_array = np.array(combined_embeddings).astype('float32')
        
        logger.info(f"✅ EMBEDDINGS CRÉÉS - Shape: {embeddings_array.shape}")
        return embeddings_array, entities_6d
    
    def build_6d_index(self):
        """🏗️ Construire index FAISS 6D"""
        logger.info("🏗️ CONSTRUCTION INDEX FAISS 6D...")
        
        # 🧙‍♂️ Index entités
        embeddings, entities_metadata = self.create_entity_embeddings()
        
        dimension = embeddings.shape[1]  # 6 + 384 = 390
        self.entity_index = faiss.IndexFlatIP(dimension)  # Produit scalaire
        
        # Normalisation pour cosine similarity
        faiss.normalize_L2(embeddings)
        self.entity_index.add(embeddings)
        
        self.entity_metadata = entities_metadata
        
        logger.info(f"✅ INDEX 6D CONSTRUIT - {self.entity_index.ntotal} entités indexées!")
    
    def search_6d(self, query_type: str, query_data: Dict, top_k: int = 10) -> Dict:
        """🔍 RECHERCHE 6D RETRO LASER"""
        
        if self.entity_index is None:
            return {"error": "Index pas encore construit - Lance /api/build"}
        
        try:
            if query_type == "spatial":
                return self._search_spatial(query_data, top_k)
            elif query_type == "temporal":
                return self._search_temporal(query_data, top_k)
            elif query_type == "causal":
                return self._search_causal(query_data, top_k)
            elif query_type == "semantic":
                return self._search_semantic(query_data, top_k)
            elif query_type == "combined_6d":
                return self._search_combined_6d(query_data, top_k)
            else:
                return {"error": f"Type de recherche non supporté: {query_type}"}
                
        except Exception as e:
            logger.error(f"❌ Erreur recherche 6D: {e}")
            return {"error": str(e)}
    
    def _search_spatial(self, query_data: Dict, top_k: int) -> Dict:
        """📍 Recherche spatiale (x, y, z)"""
        logger.info("📍 RECHERCHE SPATIALE LASER...")
        
        center = query_data.get('center', [0, 0, 0])
        radius = query_data.get('radius', 5.0)
        
        results = []
        for entity in self.entity_metadata:
            pos = entity['position_6d'][:3]  # x, y, z
            distance = np.linalg.norm(np.array(pos) - np.array(center))
            
            if distance <= radius:
                results.append({
                    'entity': entity,
                    'distance': float(distance),
                    'position': pos
                })
        
        results.sort(key=lambda x: x['distance'])
        return {
            'query_type': 'spatial',
            'center': center,
            'radius': radius,
            'results': results[:top_k],
            'total_found': len(results)
        }
    
    def _search_temporal(self, query_data: Dict, top_k: int) -> Dict:
        """⏰ Recherche temporelle (t)"""
        logger.info("⏰ RECHERCHE TEMPORELLE LASER...")
        
        time_point = query_data.get('time', 0)
        time_radius = query_data.get('time_radius', 10)
        
        results = []
        for entity in self.entity_metadata:
            entity_time = entity['position_6d'][3]  # t
            time_distance = abs(entity_time - time_point)
            
            if time_distance <= time_radius:
                results.append({
                    'entity': entity,
                    'time_distance': float(time_distance),
                    'entity_time': float(entity_time)
                })
        
        results.sort(key=lambda x: x['time_distance'])
        return {
            'query_type': 'temporal',
            'time_point': time_point,
            'time_radius': time_radius,
            'results': results[:top_k],
            'total_found': len(results)
        }
    
    def _search_causal(self, query_data: Dict, top_k: int) -> Dict:
        """🌀 Recherche causale (c, ψ)"""
        logger.info("🌀 RECHERCHE CAUSALE LASER...")
        
        target_causal = query_data.get('causal_force', 0.5)
        target_quantum = query_data.get('quantum_state', 0.5)
        threshold = query_data.get('threshold', 0.1)
        
        results = []
        for entity in self.entity_metadata:
            c = entity['position_6d'][4]  # Force causale
            psi = entity['position_6d'][5]  # État quantique
            
            causal_distance = abs(c - target_causal)
            quantum_distance = abs(psi - target_quantum)
            combined_distance = np.sqrt(causal_distance**2 + quantum_distance**2)
            
            if combined_distance <= threshold:
                results.append({
                    'entity': entity,
                    'causal_distance': float(causal_distance),
                    'quantum_distance': float(quantum_distance),
                    'combined_distance': float(combined_distance),
                    'causal_force': float(c),
                    'quantum_state': float(psi)
                })
        
        results.sort(key=lambda x: x['combined_distance'])
        return {
            'query_type': 'causal',
            'target_causal': target_causal,
            'target_quantum': target_quantum,
            'threshold': threshold,
            'results': results[:top_k],
            'total_found': len(results)
        }
    
    def _search_semantic(self, query_data: Dict, top_k: int) -> Dict:
        """🧠 Recherche sémantique"""
        logger.info("🧠 RECHERCHE SÉMANTIQUE LASER...")
        
        query_text = query_data.get('text', '')
        if not query_text:
            return {"error": "Texte de requête manquant"}
        
        # Embedding de la requête
        query_embedding = self.model.encode([query_text])
        
        # Padding avec zéros pour les 6 dimensions spatiotemporelles
        padded_query = np.concatenate([
            np.zeros(6),  # Ignorer les dimensions 6D
            query_embedding[0]
        ])
        
        faiss.normalize_L2(padded_query.reshape(1, -1))
        
        # Recherche FAISS
        scores, indices = self.entity_index.search(
            padded_query.reshape(1, -1).astype('float32'), 
            top_k
        )
        
        results = []
        for i, (score, idx) in enumerate(zip(scores[0], indices[0])):
            if idx < len(self.entity_metadata):
                results.append({
                    'rank': i + 1,
                    'score': float(score),
                    'entity': self.entity_metadata[idx]
                })
        
        return {
            'query_type': 'semantic',
            'query_text': query_text,
            'results': results,
            'total_found': len(results)
        }
    
    def _search_combined_6d(self, query_data: Dict, top_k: int) -> Dict:
        """🌟 Recherche combinée 6D complète"""
        logger.info("🌟 RECHERCHE 6D COMBINÉE LASER...")
        
        # Position 6D cible
        target_position = query_data.get('position_6d', [0, 0, 0, 0, 0.5, 0.5])
        semantic_query = query_data.get('semantic_text', '')
        weights = query_data.get('weights', [1, 1, 1, 1, 1, 1, 0.5])  # Poids pour chaque dimension
        
        # Embedding sémantique si fourni
        semantic_embedding = np.zeros(384)
        if semantic_query:
            semantic_embedding = self.model.encode([semantic_query])[0]
        
        # Vecteur de requête combiné
        combined_query = np.concatenate([
            np.array(target_position) * np.array(weights[:6]),
            semantic_embedding * weights[6]
        ])
        
        faiss.normalize_L2(combined_query.reshape(1, -1))
        
        # Recherche FAISS
        scores, indices = self.entity_index.search(
            combined_query.reshape(1, -1).astype('float32'),
            top_k
        )
        
        results = []
        for i, (score, idx) in enumerate(zip(scores[0], indices[0])):
            if idx < len(self.entity_metadata):
                entity = self.entity_metadata[idx]
                
                # Calcul distances par dimension
                pos_6d = entity['position_6d']
                distances_6d = [
                    abs(pos_6d[j] - target_position[j]) for j in range(6)
                ]
                
                results.append({
                    'rank': i + 1,
                    'score': float(score),
                    'entity': entity,
                    'distances_6d': distances_6d,
                    'position_6d': pos_6d
                })
        
        return {
            'query_type': 'combined_6d',
            'target_position': target_position,
            'semantic_query': semantic_query,
            'weights': weights,
            'results': results,
            'total_found': len(results)
        }

# 🌟 INSTANCE GLOBALE RETRO LASER 🌟
vector_db = VectorDB6D()

# 🚀 ENDPOINTS API RETRO LASER 🚀

@app.route('/api/status', methods=['GET'])
def status():
    """📊 Status du serveur Vector 6D"""
    return jsonify({
        'status': 'RETRO_LASER_READY',
        'mode': '6D_VECTOR_CAVE',
        'model': 'all-MiniLM-L6-v2',
        'entities_indexed': vector_db.entity_index.ntotal if vector_db.entity_index else 0,
        'collections': {
            'entities_6d': len(vector_db.entities_6d),
            'magic_formulas': len(vector_db.magic_formulas),
            'narrative_events': len(vector_db.narrative_events)
        },
        'ready': vector_db.entity_index is not None,
        'laser_power': '🔥 MAXIMUM 🔥'
    })

@app.route('/api/build', methods=['POST'])
def build_index():
    """🏗️ Construire index 6D"""
    try:
        logger.info("🚀 CONSTRUCTION INDEX 6D DEMANDÉE...")
        vector_db.build_6d_index()
        
        return jsonify({
            'success': True,
            'message': 'INDEX 6D CONSTRUIT AVEC SUCCÈS!',
            'entities_indexed': vector_db.entity_index.ntotal,
            'laser_status': '⚡ CHARGED ⚡'
        })
    except Exception as e:
        logger.error(f"❌ Erreur construction: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/search/6d', methods=['POST'])
def search_6d():
    """🔍 Recherche 6D RETRO LASER"""
    try:
        data = request.json
        query_type = data.get('type', 'semantic')
        query_data = data.get('query', {})
        top_k = data.get('top_k', 10)
        
        logger.info(f"🔍 RECHERCHE 6D - Type: {query_type}")
        
        results = vector_db.search_6d(query_type, query_data, top_k)
        
        return jsonify({
            'success': True,
            'laser_mode': 'ACTIVE',
            'search_results': results
        })
        
    except Exception as e:
        logger.error(f"❌ Erreur recherche 6D: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/entities', methods=['GET'])
def list_entities():
    """📋 Liste des entités 6D"""
    entities_list = []
    for entity_id, entity in vector_db.entities_6d.items():
        entities_list.append({
            'id': entity_id,
            'name': entity['name'],
            'type': entity['entity_type'],
            'position_6d': entity['position_6d']
        })
    
    return jsonify({
        'total_entities': len(entities_list),
        'entities': entities_list,
        'laser_scan': 'COMPLETE'
    })

@app.route('/api/playground', methods=['GET'])
def playground():
    """🎮 Interface de test retro laser"""
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>🚀 Vector 6D Playground - RETRO LASER 🚀</title>
        <style>
            body { 
                background: linear-gradient(45deg, #ff006e, #8338ec, #3a86ff);
                color: white; font-family: 'Courier New', monospace; 
                padding: 20px; animation: pulse 2s infinite;
            }
            @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }
            .container { max-width: 1200px; margin: 0 auto; }
            h1 { text-align: center; font-size: 2.5em; text-shadow: 0 0 20px #ff006e; }
            .search-box { width: 100%; padding: 15px; font-size: 18px; 
                         background: rgba(0,0,0,0.7); color: white; border: 2px solid #ff006e;
                         border-radius: 10px; margin: 10px 0; }
            .btn { background: linear-gradient(45deg, #ff006e, #8338ec); 
                   color: white; padding: 15px 30px; border: none; 
                   border-radius: 10px; cursor: pointer; font-size: 16px; 
                   margin: 5px; text-shadow: 0 0 10px white; }
            .btn:hover { transform: scale(1.1); box-shadow: 0 0 30px #ff006e; }
            .result { background: rgba(0,0,0,0.5); padding: 15px; margin: 10px 0; 
                     border-radius: 10px; border-left: 4px solid #3a86ff; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 VECTOR 6D PLAYGROUND 🚀</h1>
            <h2>🔮 RETRO LASER EDITION 🔮</h2>
            
            <div>
                <h3>🧙‍♂️ Recherche Sémantique</h3>
                <input type="text" id="semanticQuery" class="search-box" 
                       placeholder="Ex: héros magique, artefact légendaire, dragon puissant...">
                <button class="btn" onclick="searchSemantic()">🔍 LASER SEARCH</button>
            </div>
            
            <div>
                <h3>📍 Recherche Spatiale</h3>
                <input type="text" id="spatialCenter" class="search-box" 
                       placeholder="Centre [x,y,z] ex: [10,5,2]">
                <input type="number" id="spatialRadius" class="search-box" 
                       placeholder="Rayon" value="5">
                <button class="btn" onclick="searchSpatial()">📍 SPATIAL LASER</button>
            </div>
            
            <div>
                <h3>⏰ Recherche Temporelle</h3>
                <input type="number" id="timePoint" class="search-box" 
                       placeholder="Point temporel" value="1000">
                <input type="number" id="timeRadius" class="search-box" 
                       placeholder="Rayon temporel" value="100">
                <button class="btn" onclick="searchTemporal()">⏰ TIME LASER</button>
            </div>
            
            <button class="btn" onclick="buildIndex()">🏗️ BUILD INDEX</button>
            <button class="btn" onclick="getStatus()">📊 STATUS</button>
            
            <div id="results"></div>
        </div>
        
        <script>
            const API_BASE = '/api';
            
            async function searchSemantic() {
                const query = document.getElementById('semanticQuery').value;
                if (!query) return;
                
                showLoading();
                try {
                    const response = await fetch(`${API_BASE}/search/6d`, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            type: 'semantic',
                            query: { text: query },
                            top_k: 10
                        })
                    });
                    
                    const data = await response.json();
                    displayResults(data.search_results);
                } catch (error) {
                    showError(error.message);
                }
            }
            
            async function searchSpatial() {
                const centerText = document.getElementById('spatialCenter').value;
                const radius = parseFloat(document.getElementById('spatialRadius').value);
                
                let center = [0, 0, 0];
                try {
                    center = JSON.parse(centerText);
                } catch (e) {
                    showError('Format centre invalide. Utilisez [x,y,z]');
                    return;
                }
                
                showLoading();
                try {
                    const response = await fetch(`${API_BASE}/search/6d`, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            type: 'spatial',
                            query: { center: center, radius: radius },
                            top_k: 10
                        })
                    });
                    
                    const data = await response.json();
                    displayResults(data.search_results);
                } catch (error) {
                    showError(error.message);
                }
            }
            
            async function searchTemporal() {
                const timePoint = parseFloat(document.getElementById('timePoint').value);
                const timeRadius = parseFloat(document.getElementById('timeRadius').value);
                
                showLoading();
                try {
                    const response = await fetch(`${API_BASE}/search/6d`, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            type: 'temporal',
                            query: { time: timePoint, time_radius: timeRadius },
                            top_k: 10
                        })
                    });
                    
                    const data = await response.json();
                    displayResults(data.search_results);
                } catch (error) {
                    showError(error.message);
                }
            }
            
            async function buildIndex() {
                showLoading('🏗️ Construction index 6D...');
                try {
                    const response = await fetch(`${API_BASE}/build`, {method: 'POST'});
                    const data = await response.json();
                    
                    if (data.success) {
                        showSuccess(`✅ ${data.message} - ${data.entities_indexed} entités indexées!`);
                    } else {
                        showError(data.error);
                    }
                } catch (error) {
                    showError(error.message);
                }
            }
            
            async function getStatus() {
                try {
                    const response = await fetch(`${API_BASE}/status`);
                    const data = await response.json();
                    
                    const statusHtml = `
                        <div class="result">
                            <h3>📊 STATUS VECTOR 6D</h3>
                            <p><strong>Mode:</strong> ${data.mode}</p>
                            <p><strong>Status:</strong> ${data.status}</p>
                            <p><strong>Entités indexées:</strong> ${data.entities_indexed}</p>
                            <p><strong>Laser Power:</strong> ${data.laser_power}</p>
                            <p><strong>Ready:</strong> ${data.ready ? '✅' : '❌'}</p>
                        </div>
                    `;
                    document.getElementById('results').innerHTML = statusHtml;
                } catch (error) {
                    showError(error.message);
                }
            }
            
            function displayResults(results) {
                if (!results || !results.results || results.results.length === 0) {
                    showError('Aucun résultat trouvé');
                    return;
                }
                
                let html = `<h3>🎯 ${results.total_found} résultats - ${results.query_type.toUpperCase()}</h3>`;
                
                results.results.forEach((result, i) => {
                    const entity = result.entity;
                    html += `
                        <div class="result">
                            <h4>${entity.name} (${entity.entity_type})</h4>
                            <p><strong>Score:</strong> ${result.score ? result.score.toFixed(3) : 'N/A'}</p>
                            <p><strong>Position 6D:</strong> [${entity.position_6d.map(x => x.toFixed(2)).join(', ')}]</p>
                            <p><strong>ID:</strong> ${entity.id}</p>
                            ${result.distance !== undefined ? `<p><strong>Distance:</strong> ${result.distance.toFixed(2)}</p>` : ''}
                            ${result.time_distance !== undefined ? `<p><strong>Distance temporelle:</strong> ${result.time_distance.toFixed(2)}</p>` : ''}
                        </div>
                    `;
                });
                
                document.getElementById('results').innerHTML = html;
            }
            
            function showLoading(message = '🔄 Recherche LASER en cours...') {
                document.getElementById('results').innerHTML = `<div class="result">${message}</div>`;
            }
            
            function showError(message) {
                document.getElementById('results').innerHTML = `<div class="result" style="border-left-color: #ff006e;">❌ ${message}</div>`;
            }
            
            function showSuccess(message) {
                document.getElementById('results').innerHTML = `<div class="result" style="border-left-color: #3a86ff;">✅ ${message}</div>`;
            }
            
            // Auto-status au chargement
            getStatus();
        </script>
    </body>
    </html>
    """

if __name__ == '__main__':
    print("""
🚀🔮 VECTOR SERVER 6D RETRO LASER EDITION 🔮🚀

    ⚡ GOODORQCK LASER ACTIVATED ⚡
    🧙‍♂️ Mode: HEROES OF TIME 6D CAVE 🧙‍♂️
    🌟 Recherche spatiotemporelle causale 🌟
    
    📍 Endpoints:
    GET  /api/status      - Status laser
    POST /api/build       - Build index 6D  
    POST /api/search/6d   - Recherche 6D
    GET  /api/entities    - Liste entités
    GET  /api/playground  - Interface retro
    
    🔥 LASER POWER: MAXIMUM 🔥
    """)
    
    app.run(host='0.0.0.0', port=5002, debug=True)