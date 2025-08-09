#!/usr/bin/env python3
"""
Bridge Python pour intégrer le VectorDB local directement dans le backend Rust.
Utilise les indexes FAISS déjà construits pour une recherche ultra-rapide.
"""

import json
import sys
import os
import hashlib
from pathlib import Path
import numpy as np

# Ajouter le chemin des tools vector_build
sys.path.insert(0, str(Path(__file__).parent.parent.parent / "tools" / "vector_build"))

try:
    from sentence_transformers import SentenceTransformer
    import faiss
except ImportError:
    print(json.dumps({"error": "Dependencies not installed. Run: pip install faiss-cpu sentence-transformers"}))
    sys.exit(1)

class VectorDBBridge:
    def __init__(self):
        self.model = None
        self.indexes = {}
        self.metas = {}
        self.base_path = Path(__file__).parent.parent.parent / "vector-store"
        
    def load_model(self):
        """Charger le modèle d'embeddings (partagé entre tous les modes)"""
        if self.model is None:
            self.model = SentenceTransformer('all-MiniLM-L6-v2')
            
    def load_index(self, mode="story"):
        """Charger un index FAISS et ses métadonnées"""
        if mode in self.indexes:
            return True
            
        index_path = self.base_path / mode / "index.faiss"
        meta_path = self.base_path / mode / "meta.jsonl"
        
        if not index_path.exists() or not meta_path.exists():
            return False
            
        # Charger l'index FAISS
        self.indexes[mode] = faiss.read_index(str(index_path))
        
        # Charger les métadonnées
        self.metas[mode] = []
        with open(meta_path, 'r', encoding='utf-8') as f:
            for line in f:
                self.metas[mode].append(json.loads(line))
                
        return True
        
    def search(self, query, mode="story", top_k=10, filters=None):
        """Recherche sémantique dans un index"""
        self.load_model()
        
        if not self.load_index(mode):
            return {"error": f"Index '{mode}' not found. Run indexation first."}
            
        # Encoder la requête
        query_vec = self.model.encode([query])[0]
        
        # Recherche dans FAISS
        distances, indices = self.indexes[mode].search(
            np.array([query_vec], dtype=np.float32), 
            min(top_k, len(self.metas[mode]))
        )
        
        # Construire les résultats
        results = []
        for dist, idx in zip(distances[0], indices[0]):
            if idx < len(self.metas[mode]):
                meta = self.metas[mode][idx]
                
                # Appliquer les filtres si spécifiés
                if filters:
                    skip = False
                    for key, value in filters.items():
                        if key in meta and str(meta[key]) != str(value):
                            skip = True
                            break
                    if skip:
                        continue
                        
                results.append({
                    "score": float(1 / (1 + dist)),  # Convertir distance en score
                    "file": meta.get("file", ""),
                    "content": meta.get("content", ""),
                    "metadata": {
                        k: v for k, v in meta.items() 
                        if k not in ["content", "file", "sha256"]
                    }
                })
                
        return {
            "mode": mode,
            "query": query,
            "results": results[:top_k],
            "total": len(results)
        }
        
    def status(self):
        """Statut des indexes disponibles"""
        status = {
            "available_modes": [],
            "indexes": {}
        }
        
        for mode_dir in self.base_path.iterdir():
            if mode_dir.is_dir():
                index_path = mode_dir / "index.faiss"
                meta_path = mode_dir / "meta.jsonl"
                
                if index_path.exists() and meta_path.exists():
                    # Compter les documents
                    doc_count = sum(1 for _ in open(meta_path, 'r'))
                    
                    status["available_modes"].append(mode_dir.name)
                    status["indexes"][mode_dir.name] = {
                        "documents": doc_count,
                        "index_size": index_path.stat().st_size,
                        "meta_size": meta_path.stat().st_size,
                        "last_modified": index_path.stat().st_mtime
                    }
                    
        return status
        
    def build(self, mode="story"):
        """Déclencher une reconstruction d'index (appelle le script externe)"""
        import subprocess
        
        script_path = Path(__file__).parent.parent.parent / "tools" / "vector_build" / "build_local.py"
        
        if not script_path.exists():
            return {"error": "Build script not found"}
            
        try:
            # Déterminer le répertoire source selon le mode - NOUVELLE STRUCTURE
            if mode == "story":
                # Les assets story sont maintenant dans SHARED/docs/ZBIG - VECTOR_DB_ASSETS
                source_dir = Path(__file__).parent.parent.parent / "docs" / "SHARED" / "docs" / "ZBIG - VECTOR_DB_ASSETS"
            elif mode == "dev":
                source_dir = Path(__file__).parent.parent.parent / "docs"
            else:
                return {"error": f"Unknown mode: {mode}"}
                
            # Lancer le script de construction
            result = subprocess.run(
                [sys.executable, str(script_path), str(source_dir), mode],
                capture_output=True,
                text=True,
                timeout=300  # 5 minutes max
            )
            
            if result.returncode == 0:
                return {
                    "status": "success",
                    "mode": mode,
                    "message": f"Index '{mode}' rebuilt successfully"
                }
            else:
                return {
                    "status": "error",
                    "mode": mode,
                    "error": result.stderr or "Build failed"
                }
                
        except subprocess.TimeoutExpired:
            return {"error": "Build timeout (>5 minutes)"}
        except Exception as e:
            return {"error": str(e)}

def main():
    """Point d'entrée pour les appels depuis Rust"""
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Usage: vector_bridge.py <command> [args...]"}))
        sys.exit(1)
        
    command = sys.argv[1]
    bridge = VectorDBBridge()
    
    try:
        if command == "status":
            result = bridge.status()
            
        elif command == "search":
            if len(sys.argv) < 3:
                result = {"error": "Usage: vector_bridge.py search <query> [mode] [top_k]"}
            else:
                query = sys.argv[2]
                mode = sys.argv[3] if len(sys.argv) > 3 else "story"
                top_k = int(sys.argv[4]) if len(sys.argv) > 4 else 10
                
                # Les filtres peuvent être passés via stdin en JSON
                filters = None
                if not sys.stdin.isatty():
                    try:
                        filters = json.loads(sys.stdin.read())
                    except:
                        pass
                        
                result = bridge.search(query, mode, top_k, filters)
                
        elif command == "build":
            mode = sys.argv[2] if len(sys.argv) > 2 else "story"
            result = bridge.build(mode)
            
        else:
            result = {"error": f"Unknown command: {command}"}
            
    except Exception as e:
        result = {"error": str(e)}
        
    print(json.dumps(result, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
