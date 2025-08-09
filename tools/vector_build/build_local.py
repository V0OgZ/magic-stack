#!/usr/bin/env python3
import os, sys, json, hashlib, time, argparse, re
from pathlib import Path
from tqdm import tqdm
import numpy as np
from sentence_transformers import SentenceTransformer
import faiss

IGNORE_DIRS = {'.git','node_modules','build','dist','target','assets','images','.venv','venv'}
TEXT_EXT = {'.md','.json','.txt','.html','.hep'}

def sha256_bytes(b: bytes) -> str:
    import hashlib
    h = hashlib.sha256(); h.update(b); return h.hexdigest()

def iter_files(root: Path):
    for p in root.rglob('*'):
        if p.is_dir():
            if any(part in IGNORE_DIRS for part in p.parts):
                continue
            else:
                continue
        if any(part in IGNORE_DIRS for part in p.parts):
            continue
        if p.suffix.lower() in TEXT_EXT:
            yield p

def chunk_text(text: str, max_tokens=800, overlap=150):
    # rough split by paragraphs; simple fallback
    paras = re.split(r"\n\n+", text)
    chunks = []
    cur = ''
    for para in paras:
        if len(cur) + len(para) < max_tokens:
            cur += (('\n\n' if cur else '') + para)
        else:
            if cur:
                chunks.append(cur)
            cur = para
    if cur:
        chunks.append(cur)
    # add simple overlaps
    out = []
    for i, c in enumerate(chunks):
        prev = chunks[i-1][-overlap:] if i>0 else ''
        out.append((i, (prev + ('\n' if prev else '') + c)))
    return out

def guess_kind(path: Path):
    s = '/'.join(path.parts).lower()
    if '/heroes/' in s: return 'HERO'
    if '/creatures/' in s: return 'CREATURE'
    if '/artifacts/' in s: return 'ARTIFACT'
    if '/lore/' in s: return 'LORE'
    if '/magic_formulas/' in s or 'formulas' in s: return 'SPELL'
    if '/quests/' in s or '/scenarios/' in s or 'missions' in s: return 'SCENARIO'
    if '/world/' in s or '/maps/' in s or 'biome' in s: return 'WORLD'
    if 'openapi' in s or '/api/' in s: return 'API'
    return 'DOC'

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--mode', choices=['story','dev'], required=True)
    ap.add_argument('--root', default='.')
    ap.add_argument('--out', required=True)
    ap.add_argument('--threads', type=int, default=8)
    args = ap.parse_args()

    out_dir = Path(args.out); out_dir.mkdir(parents=True, exist_ok=True)
    meta_path = out_dir / 'meta.jsonl'
    index_path = out_dir / 'index.faiss'

    model = SentenceTransformer('all-MiniLM-L6-v2')

    metas = []
    vecs = []

    # Load existing index/meta for incremental build
    existing_index = None
    existing_keys = set()
    if index_path.exists() and meta_path.exists():
        try:
            existing_index = faiss.read_index(str(index_path))
        except Exception:
            existing_index = None
        try:
            with meta_path.open('r', encoding='utf-8') as f:
                for line in f:
                    try:
                        m = json.loads(line)
                        key = f"{m.get('sha256','')}#c{m.get('chunk_id',-1)}"
                        existing_keys.add(key)
                    except Exception:
                        continue
        except Exception:
            pass

    root = Path(args.root)
    files = list(iter_files(root))
    for p in tqdm(files, desc=f'Indexing {args.mode}'):
        try:
            data = p.read_bytes()
            text = data.decode('utf-8', errors='ignore')
        except Exception:
            continue
        title = p.stem.replace('_',' ').title()
        mtime = int(p.stat().st_mtime)
        sha = sha256_bytes(data)
        size = int(p.stat().st_size)
        doc_id = sha[:12]
        kind = guess_kind(p)
        chunks = chunk_text(text)
        sentences = [c for _, c in chunks]
        if not sentences:
            continue
        embs = model.encode(sentences, batch_size=32, show_progress_bar=False, normalize_embeddings=True)
        for (i, _), vec in zip(chunks, embs):
            key = f"{sha}#c{i}"
            if key in existing_keys:
                continue
            rec = {
                'id': f'{doc_id}#c{i}',
                'path': str(p),
                'title': title,
                'kind': kind,
                'domain': args.mode,
                'chunk_id': i,
                'mtime': mtime,
                'size': size,
                'sha256': sha,
            }
            metas.append(rec)
            vecs.append(vec.astype('float32'))

    if not vecs:
        print(json.dumps({'ok': True, 'chunks': 0}))
        return

    xb = np.vstack(vecs).astype('float32') if vecs else np.zeros((0,384), dtype='float32')
    if existing_index is not None and xb.shape[0] > 0:
        existing_index.add(xb)
        faiss.write_index(existing_index, str(index_path))
        append_mode = True
    else:
        if xb.shape[0] > 0:
            d = xb.shape[1]
            index = faiss.IndexHNSWFlat(d, 32)
            index.hnsw.efConstruction = 200
            index.add(xb)
            faiss.write_index(index, str(index_path))
        append_mode = False

    # Write meta (append if exists)
    with meta_path.open('a' if append_mode else 'w', encoding='utf-8') as f:
        for m in metas:
            f.write(json.dumps(m, ensure_ascii=False) + '\n')

    print(json.dumps({'ok': True, 'new_chunks': len(metas), 'index': str(index_path), 'meta': str(meta_path)}))

if __name__ == '__main__':
    main()
