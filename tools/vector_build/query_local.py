#!/usr/bin/env python3
import os, sys, json, argparse
from pathlib import Path
import numpy as np
from sentence_transformers import SentenceTransformer
import faiss

ap = argparse.ArgumentParser()
ap.add_argument('--store', required=True)
ap.add_argument('--query', required=True)
ap.add_argument('--top_k', type=int, default=10)
ap.add_argument('--filters', default='{}')
args = ap.parse_args()

store = Path(args.store)
meta_path = store / 'meta.jsonl'
index_path = store / 'index.faiss'

if not meta_path.exists() or not index_path.exists():
    print(json.dumps({ok: False, error: missing_index}))
    sys.exit(1)

metas = []
with meta_path.open('r', encoding='utf-8') as f:
    for line in f:
        try:
            metas.append(json.loads(line))
        except Exception:
            pass

model = SentenceTransformer('all-MiniLM-L6-v2')
qv = model.encode([args.query], normalize_embeddings=True)[0].astype('float32')
index = faiss.read_index(str(index_path))
D, I = index.search(np.expand_dims(qv,0), args.top_k)

res = []
for d, i in zip(D[0].tolist(), I[0].tolist()):
    if i < 0 or i >= len(metas):
        continue
    m = metas[i]
    m['_score'] = float(1.0 - d/2.0)
    res.append(m)

print(json.dumps({ok: True, hits: res[:args.top_k]}))
