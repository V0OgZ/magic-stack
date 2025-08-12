#!/usr/bin/env python3
"""
Vector DB Server (port 7500) — aligné avec ./go et l’API Explorer
Charge des contenus depuis `docs_shared/` et `vector_content/` si présents.
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
from pathlib import Path

app = Flask(__name__)
CORS(app)

BASE_DIR = Path(__file__).resolve().parent.parent.parent
DOCS_SHARED = BASE_DIR / 'docs_shared'  # symlink déjà présent à la racine
VEC_CONTENT = BASE_DIR / 'vector_content'

INDEX = []
INDEX_JSONL = BASE_DIR / 'vector_local' / 'embeddings' / 'index.jsonl'

def load_documents():
    INDEX.clear()
    # 0) JSONL prebuilt index
    if INDEX_JSONL.exists():
        try:
            for line in INDEX_JSONL.read_text(encoding='utf-8').splitlines():
                rec = json.loads(line)
                INDEX.append({ 'file': rec.get('path'), 'content': rec.get('content') })
        except Exception:
            pass
    # 1) Docs partagés
    if DOCS_SHARED.exists():
        for ext in ("*.md", "*.txt", "*.json"):  # léger mais suffisant
            for fp in DOCS_SHARED.rglob(ext):
                try:
                    if fp.suffix == '.json':
                        with open(fp, 'r', encoding='utf-8') as f:
                            data = json.load(f)
                        INDEX.append({ 'file': str(fp), 'content': json.dumps(data) })
                    else:
                        with open(fp, 'r', encoding='utf-8') as f:
                            INDEX.append({ 'file': str(fp), 'content': f.read() })
                except Exception:
                    pass
    # 2) Contenu local vector
    if VEC_CONTENT.exists():
        for ext in ("*.md", "*.txt", "*.json"):  # idem
            for fp in VEC_CONTENT.rglob(ext):
                try:
                    if fp.suffix == '.json':
                        with open(fp, 'r', encoding='utf-8') as f:
                            data = json.load(f)
                        INDEX.append({ 'file': str(fp), 'content': json.dumps(data) })
                    else:
                        with open(fp, 'r', encoding='utf-8') as f:
                            INDEX.append({ 'file': str(fp), 'content': f.read() })
                except Exception:
                    pass

@app.route('/health')
def health():
    return jsonify({
        'status': 'ok',
        'service': 'Vector DB 6D',
        'port': 7500,
        'documents_loaded': len(INDEX)
    })

@app.route('/reload', methods=['POST'])
def reload_index():
    load_documents()
    return jsonify({'ok': True, 'documents_loaded': len(INDEX)})

@app.route('/search', methods=['POST'])
def search():
    data = request.get_json(force=True, silent=True) or {}
    query = (data.get('query') or '').lower()
    limit = int(data.get('limit') or 10)
    filters = data.get('filters') or {}

    results = []
    if query:
        for doc in INDEX:
            content_str = str(doc['content']).lower()
            if query in content_str:
                i = content_str.find(query)
                results.append({
                    'file': doc['file'],
                    'match': content_str[max(0, i-80): i+200]
                })

    return jsonify({ 'query': query, 'total': len(results), 'results': results[:limit], 'filters': filters })

if __name__ == '__main__':
    print('🔮 VECTOR DB 6D — démarrage (7500)')
    load_documents()
    print(f'✅ Documents chargés: {len(INDEX)}')
    app.run(host='0.0.0.0', port=7500, debug=False)


