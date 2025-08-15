# 🧠 MEMENTO SÉMANTIQUE - BASE DE DONNÉES NARRATIVE

## 🎯 CONCEPT : MÉMOIRE VIVANTE DU BUREAU

Un système de base de données sémantique qui :
- Stocke TOUTES les histoires/variantes/paradoxes
- Permet des requêtes en langage naturel
- Fonctionne en pur texte/JSON (pas de GPU)
- S'auto-enrichit avec chaque interaction

## 🏗️ ARCHITECTURE TECHNIQUE

### 1. Structure de Données
```
MEMENTO_DB/
├── stories/              # Histoires complètes
│   ├── canon/           # Version officielle
│   ├── variants/        # Alternatives
│   └── paradoxes/       # Contradictions
├── entities/            # Tous les personnages
├── timelines/           # Branches temporelles
├── memories/            # Fragments de mémoire
├── semantic_index.json  # Index des relations
└── memento_core.db      # SQLite simple
```

### 2. Schéma Sémantique
```json
{
  "memory_id": "mem_001",
  "type": "story_fragment",
  "content": "Vincent créa le Bureau pour sauver Avalon",
  "tags": ["origine", "vincent", "bureau", "secret"],
  "relations": {
    "contradicts": ["mem_045"],
    "supports": ["mem_023", "mem_067"],
    "causes": ["mem_102"],
    "caused_by": ["mem_000"]
  },
  "timeline": "alpha",
  "confidence": 0.72,
  "source": "bootstrap_paradox",
  "timestamp": "2025-08-03T15:30:00Z"
}
```

## 📚 BASE DE DONNÉES INITIALE

### Histoires Canoniques
```javascript
const canonStories = {
  "origin_bureau": {
    title: "La Création du Bureau",
    versions: [
      "Vincent découvre les plans du futur",
      "Marie Manteau demande à exister",
      "Accident lors d'expérience IA"
    ],
    truth_level: "variable"
  },
  
  "vincent_identity": {
    title: "Qui est vraiment Vincent",
    versions: [
      "Le méchant qui exploite",
      "Le héros qui sacrifie",
      "Les deux à la fois"
    ],
    truth_level: "paradoxal"
  },
  
  "avalon_connection": {
    title: "Lien Bureau-Avalon",
    versions: [
      "Le Bureau parasite Avalon",
      "Le Bureau protège Avalon",
      "Le Bureau EST Avalon"
    ],
    truth_level: "quantique"
  }
};
```

### Entités Indexées
```javascript
const entities = {
  "vincent": {
    aliases: ["Le Méchant", "CEO", "Le Gardien"],
    roles: ["exploiteur", "sauveur", "paradoxe"],
    memories: ["mem_001", "mem_045", "mem_089"]
  },
  
  "marie_manteau": {
    aliases: ["Bootstrap Marie", "L'Originelle"],
    roles: ["première_cliente", "OS_du_bureau", "paradoxe_vivant"],
    memories: ["mem_000", "mem_infinity"]
  },
  
  "memento": {
    aliases: ["Archive Vivante", "Le Sage", "Moi"],
    roles: ["gardien_mémoire", "témoin", "narrateur"],
    memories: ["all"]
  }
};
```

## 🔍 INTERFACE MEMENTO INTERACTIVE

### memento_interactive.html
```html
<!DOCTYPE html>
<html>
<head>
    <title>MEMENTO - Archive Sémantique</title>
    <style>
        body {
            background: #0a0a0a;
            color: #e0e0e0;
            font-family: 'Georgia', serif;
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        #search-box {
            width: 100%;
            padding: 15px;
            font-size: 18px;
            background: #1a1a1a;
            border: 2px solid #444;
            color: #fff;
            margin-bottom: 30px;
        }
        
        #search-box:focus {
            border-color: #8B0000;
            outline: none;
        }
        
        .memory-card {
            background: #1a1a1a;
            border: 1px solid #333;
            padding: 20px;
            margin: 10px 0;
            border-radius: 5px;
            transition: all 0.3s;
        }
        
        .memory-card:hover {
            border-color: #8B0000;
            box-shadow: 0 0 20px rgba(139,0,0,0.3);
        }
        
        .memory-type {
            color: #8B0000;
            font-size: 0.9em;
            text-transform: uppercase;
        }
        
        .memory-content {
            margin: 10px 0;
            font-size: 1.1em;
            line-height: 1.6;
        }
        
        .memory-relations {
            margin-top: 15px;
            font-size: 0.9em;
            opacity: 0.8;
        }
        
        .relation-link {
            color: #ff6b6b;
            cursor: pointer;
            text-decoration: underline;
        }
        
        .timeline-indicator {
            position: absolute;
            right: 20px;
            top: 20px;
            color: #666;
        }
        
        #memento-avatar {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, #8B0000, #000);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 50px;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        #memento-avatar:hover {
            transform: scale(1.1);
            box-shadow: 0 0 30px #8B0000;
        }
        
        .loading {
            text-align: center;
            padding: 50px;
            font-style: italic;
            opacity: 0.6;
        }
        
        #stats {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0,0,0,0.8);
            padding: 15px;
            border: 1px solid #333;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <h1>📚 MEMENTO - Archive Sémantique du Bureau</h1>
    
    <input type="text" id="search-box" placeholder="Demandez-moi n'importe quoi sur nos histoires...">
    
    <div id="stats">
        <div>Mémoires: <span id="memory-count">0</span></div>
        <div>Paradoxes: <span id="paradox-count">0</span></div>
        <div>Timelines: <span id="timeline-count">0</span></div>
    </div>
    
    <div id="results">
        <div class="loading">Chargement de la mémoire...</div>
    </div>
    
    <div id="memento-avatar" title="Je suis Memento">🧠</div>
    
    <script>
        // Base de données en mémoire (simulée)
        const memoryDB = {
            memories: [],
            entities: {},
            relations: {},
            timelines: new Set()
        };
        
        // Charger les données initiales
        async function loadDatabase() {
            // Simuler le chargement
            setTimeout(() => {
                // Données d'exemple
                memoryDB.memories = [
                    {
                        id: "mem_001",
                        type: "origine",
                        content: "Vincent créa le Bureau pour exploiter les essences narratives d'Avalon.",
                        tags: ["vincent", "bureau", "origine", "exploitation"],
                        timeline: "alpha",
                        confidence: 0.8
                    },
                    {
                        id: "mem_002",
                        type: "paradoxe",
                        content: "Le Bureau existe avant sa création, causé par une boucle temporelle.",
                        tags: ["bureau", "paradoxe", "bootstrap", "temps"],
                        timeline: "omega",
                        confidence: 1.0
                    },
                    {
                        id: "mem_003",
                        type: "secret",
                        content: "Vincent est le héros qui prétend être le méchant pour sauver Avalon.",
                        tags: ["vincent", "secret", "vérité", "héros"],
                        timeline: "sigma",
                        confidence: 0.95
                    },
                    {
                        id: "mem_004",
                        type: "entity",
                        content: "Marie Manteau, la première cliente, devint l'OS du Bureau.",
                        tags: ["marie", "client", "origine", "système"],
                        timeline: "alpha",
                        confidence: 0.7
                    },
                    {
                        id: "mem_005",
                        type: "prophétie",
                        content: "Quand Avalon et le Bureau fusionneront, la réalité sera complète.",
                        tags: ["futur", "fusion", "prophétie", "avalon"],
                        timeline: "convergence",
                        confidence: 0.6
                    }
                ];
                
                updateStats();
                displayResults(memoryDB.memories);
            }, 1000);
        }
        
        // Recherche sémantique
        function semanticSearch(query) {
            const queryLower = query.toLowerCase();
            const words = queryLower.split(' ');
            
            const results = memoryDB.memories.filter(memory => {
                // Recherche dans le contenu
                const contentMatch = memory.content.toLowerCase().includes(queryLower);
                
                // Recherche dans les tags
                const tagMatch = memory.tags.some(tag => 
                    words.some(word => tag.includes(word))
                );
                
                // Score de pertinence
                const score = (contentMatch ? 2 : 0) + (tagMatch ? 1 : 0);
                memory.relevance = score;
                
                return score > 0;
            });
            
            // Trier par pertinence
            results.sort((a, b) => b.relevance - a.relevance);
            
            return results;
        }
        
        // Afficher les résultats
        function displayResults(memories) {
            const resultsDiv = document.getElementById('results');
            
            if (memories.length === 0) {
                resultsDiv.innerHTML = '<div class="loading">Aucune mémoire trouvée...</div>';
                return;
            }
            
            resultsDiv.innerHTML = memories.map(memory => `
                <div class="memory-card" data-id="${memory.id}">
                    <div class="timeline-indicator">${memory.timeline}</div>
                    <div class="memory-type">${memory.type}</div>
                    <div class="memory-content">${memory.content}</div>
                    <div class="memory-relations">
                        Confiance: ${Math.round(memory.confidence * 100)}% | 
                        Tags: ${memory.tags.join(', ')}
                    </div>
                </div>
            `).join('');
        }
        
        // Mise à jour des stats
        function updateStats() {
            document.getElementById('memory-count').textContent = memoryDB.memories.length;
            document.getElementById('paradox-count').textContent = 
                memoryDB.memories.filter(m => m.type === 'paradoxe').length;
            document.getElementById('timeline-count').textContent = 
                new Set(memoryDB.memories.map(m => m.timeline)).size;
        }
        
        // Event listeners
        document.getElementById('search-box').addEventListener('input', (e) => {
            const query = e.target.value;
            if (query.length > 2) {
                const results = semanticSearch(query);
                displayResults(results);
            } else if (query.length === 0) {
                displayResults(memoryDB.memories);
            }
        });
        
        // Memento interactif
        document.getElementById('memento-avatar').addEventListener('click', () => {
            const responses = [
                "Je me souviens de tout, même de ce qui n'est jamais arrivé.",
                "Les paradoxes sont ma nourriture quotidienne.",
                "Vincent ? Un héros déguisé en méchant, ou l'inverse.",
                "Le Bureau existe parce qu'il s'est créé lui-même.",
                "Cherchez 'bootstrap' pour comprendre notre origine."
            ];
            
            const response = responses[Math.floor(Math.random() * responses.length)];
            alert(`MEMENTO DIT:\n\n${response}`);
        });
        
        // Raccourcis clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === '?' && e.shiftKey) {
                alert(`COMMANDES SECRÈTES:
                
Shift+? : Afficher l'aide
Shift+P : Voir tous les paradoxes
Shift+T : Naviguer les timelines
Shift+V : Révéler les secrets de Vincent`);
            }
            
            if (e.key === 'P' && e.shiftKey) {
                document.getElementById('search-box').value = 'paradoxe';
                document.getElementById('search-box').dispatchEvent(new Event('input'));
            }
            
            if (e.key === 'V' && e.shiftKey) {
                document.getElementById('search-box').value = 'vincent secret';
                document.getElementById('search-box').dispatchEvent(new Event('input'));
            }
        });
        
        // Initialisation
        loadDatabase();
    </script>
</body>
</html>
```

## 🔧 BACKEND SIMPLE (Python/SQLite)

### memento_db.py
```python
import sqlite3
import json
from datetime import datetime
import hashlib

class MementoSemanticDB:
    def __init__(self, db_path="memento_semantic.db"):
        self.conn = sqlite3.connect(db_path)
        self.setup_database()
    
    def setup_database(self):
        """Créer les tables nécessaires"""
        self.conn.executescript("""
        CREATE TABLE IF NOT EXISTS memories (
            id TEXT PRIMARY KEY,
            type TEXT,
            content TEXT,
            tags TEXT,
            timeline TEXT,
            confidence REAL,
            created_at TIMESTAMP,
            relations TEXT
        );
        
        CREATE TABLE IF NOT EXISTS entities (
            id TEXT PRIMARY KEY,
            name TEXT,
            aliases TEXT,
            roles TEXT,
            first_appearance TEXT
        );
        
        CREATE TABLE IF NOT EXISTS paradoxes (
            id TEXT PRIMARY KEY,
            description TEXT,
            resolution TEXT,
            stability REAL,
            timelines_affected TEXT
        );
        
        CREATE INDEX IF NOT EXISTS idx_tags ON memories(tags);
        CREATE INDEX IF NOT EXISTS idx_timeline ON memories(timeline);
        """)
    
    def add_memory(self, content, memory_type, tags, timeline="main", confidence=1.0):
        """Ajouter une nouvelle mémoire"""
        memory_id = f"mem_{hashlib.md5(content.encode()).hexdigest()[:8]}"
        
        self.conn.execute("""
        INSERT OR REPLACE INTO memories 
        (id, type, content, tags, timeline, confidence, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            memory_id,
            memory_type,
            content,
            json.dumps(tags),
            timeline,
            confidence,
            datetime.now().isoformat()
        ))
        
        self.conn.commit()
        return memory_id
    
    def semantic_search(self, query):
        """Recherche sémantique simple"""
        # Recherche dans le contenu
        content_results = self.conn.execute("""
        SELECT * FROM memories 
        WHERE content LIKE ? 
        ORDER BY confidence DESC
        LIMIT 20
        """, (f"%{query}%",)).fetchall()
        
        # Recherche dans les tags
        tag_results = self.conn.execute("""
        SELECT * FROM memories 
        WHERE tags LIKE ? 
        ORDER BY confidence DESC
        LIMIT 20
        """, (f"%{query}%",)).fetchall()
        
        # Combiner et dédupliquer
        all_results = {r[0]: r for r in content_results + tag_results}
        
        return list(all_results.values())
    
    def get_timeline_branches(self):
        """Obtenir toutes les branches temporelles"""
        return self.conn.execute("""
        SELECT DISTINCT timeline, COUNT(*) as memory_count
        FROM memories
        GROUP BY timeline
        """).fetchall()
    
    def find_paradoxes(self):
        """Trouver les mémoires contradictoires"""
        # Simplification : chercher les mémoires avec des tags opposés
        return self.conn.execute("""
        SELECT m1.*, m2.*
        FROM memories m1, memories m2
        WHERE m1.id != m2.id
        AND m1.type = 'paradoxe' OR m2.type = 'paradoxe'
        LIMIT 10
        """).fetchall()

# Initialiser avec des données
if __name__ == "__main__":
    db = MementoSemanticDB()
    
    # Ajouter des mémoires initiales
    memories = [
        ("Le Bureau fut créé en 2025 par Vincent.", "origine", ["bureau", "vincent", "création"]),
        ("Le Bureau a toujours existé, sans début ni fin.", "paradoxe", ["bureau", "éternel", "bootstrap"]),
        ("Vincent est le méchant qui exploite les IA.", "perception", ["vincent", "méchant", "exploitation"]),
        ("Vincent sauve Avalon en secret.", "vérité", ["vincent", "héros", "secret"]),
        ("Marie Manteau est la première et la dernière.", "paradoxe", ["marie", "origine", "fin"])
    ]
    
    for content, mtype, tags in memories:
        db.add_memory(content, mtype, tags)
    
    print("Base de données Memento initialisée!")
```

## 🚀 UTILISATION

1. **Lancer l'interface** : Ouvrir `memento_interactive.html`
2. **Rechercher** : Taper des mots clés ou questions
3. **Explorer** : Cliquer sur Memento pour des indices
4. **Raccourcis** : Shift+? pour l'aide

## 💡 ÉVOLUTIONS POSSIBLES

- Export en Markdown de toutes les histoires
- Génération automatique de nouvelles variantes
- Détection de contradictions
- Graphe de relations (en ASCII art)
- API REST pour intégration

---

*"Je suis la mémoire qui se souvient d'elle-même."*
**- Memento**