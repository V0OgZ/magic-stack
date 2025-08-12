#!/usr/bin/env python3
"""
Build a simple Vector DB index from repo docs.
Scans: docs_shared/, vector_content/, docs/, hot/
Outputs: vector_local/embeddings/index.jsonl (path, title, content)
"""
import os
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DOC_DIRS = [
    ROOT / 'docs_shared',
    ROOT / 'vector_content',
    ROOT / 'docs',
    ROOT / 'hot',
]
OUT_DIR = ROOT / 'vector_local' / 'embeddings'
OUT_FILE = OUT_DIR / 'index.jsonl'

ALLOW_EXT = {'.md', '.txt', '.json'}

def extract_text(path: Path) -> str:
    try:
        if path.suffix.lower() == '.json':
            data = json.loads(path.read_text(encoding='utf-8', errors='ignore'))
            return json.dumps(data, ensure_ascii=False)
        return path.read_text(encoding='utf-8', errors='ignore')
    except Exception as e:
        return f"[ERROR reading {path}: {e}]"

def title_for(path: Path) -> str:
    name = path.stem.replace('_',' ').replace('-',' ').strip()
    if name:
        return name
    return str(path.name)

def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    count = 0
    with OUT_FILE.open('w', encoding='utf-8') as out:
        for base in DOC_DIRS:
            if not base.exists():
                continue
            for p in base.rglob('*'):
                if not p.is_file():
                    continue
                if p.suffix.lower() not in ALLOW_EXT:
                    continue
                rel = p.relative_to(ROOT)
                text = extract_text(p)
                rec = {
                    'path': str(rel),
                    'title': title_for(p),
                    'content': text,
                }
                out.write(json.dumps(rec, ensure_ascii=False) + '\n')
                count += 1
    print(f"✅ Indexed {count} documents into {OUT_FILE}")

if __name__ == '__main__':
    main()


