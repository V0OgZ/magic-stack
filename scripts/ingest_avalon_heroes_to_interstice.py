#!/usr/bin/env python3
import os, sys, json, time
import pathlib
import requests

"""
Bulk upload AVALON_EXTRACT/heroes into Interstice.
Usage:
  python3 scripts/ingest_avalon_heroes_to_interstice.py [base]
Where base is '' (prod proxied) or 'http://localhost:8082' for local.
"""

def main():
    base = sys.argv[1] if len(sys.argv) > 1 else ''
    root = pathlib.Path('AVALON_EXTRACT/heroes')
    idx_path = root / 'HEROES_INDEX.json'
    if not idx_path.exists():
        print('HEROES_INDEX.json not found in AVALON_EXTRACT/heroes')
        sys.exit(1)
    idx = json.load(idx_path.open('r', encoding='utf-8'))
    ok = 0; total = 0
    for hid, meta in idx.items():
        total += 1
        try:
            payload = { 'entityId': hid, 'entityData': meta }
            r = requests.post(f"{base}/api/interstice/upload", json=payload, timeout=10)
            if r.ok:
                ok += 1
                print(f"OK {hid}")
            else:
                print(f"ERR {hid} HTTP {r.status_code}")
        except Exception as e:
            print(f"ERR {hid} {e}")
        time.sleep(0.1)
    print(f"done {ok}/{total}")

if __name__ == '__main__':
    main()


