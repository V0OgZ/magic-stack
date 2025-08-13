# VPS Deployment Report — 2025-08-13

## Summary
- Fixed broken links (localhost → proxied routes /engine, /api, /vector, /clippy)
- Restored front page at `/` and custom 404
- Added/cleaned links on the front page and dashboard (UI expérimentales)
- Served React World Editor at `/world-editor/`
- Served legacy HTML via `/html/*` and top-level `/*.html`
- Served `/docs/*` statically

## Public URLs (Working)
- Frontpage: https://heroesoftime.online/
- Experimental dashboard: https://heroesoftime.online/HTML_INDEX.html
- World Editor (React): https://heroesoftime.online/world-editor/
- Visual Magic Translator: https://heroesoftime.online/interfaces/interface_visual_magic.html
- Chasse (HTML): https://heroesoftime.online/CHASSE_TEMPORELLE_MEGA_MAP.html
- Icon Placer (HTML): https://heroesoftime.online/assets/MAP_ICON_PLACER_ADVANCED.html
- API Explorer: https://heroesoftime.online/API_EXPLORER_COMPLETE.html
- Vector UI: https://heroesoftime.online/VECTOR_DB_EXPLORER_UI.html
- Docs (examples): https://heroesoftime.online/docs/index.html, /docs/demo.html, /docs/pwa.html

## Server (Caddy) Routing
- `/engine/*` → 127.0.0.1:3001 (Rust)
- `/api/*` → 127.0.0.1:8082 (Java)
- `/vector/*` → 127.0.0.1:7500 (Vector DB)
- `/clippy/*` → 127.0.0.1:7501 (Clippy)
- `/mcp/*` → 127.0.0.1:9000 (MCP)
- `/world-editor/*` → /opt/hot/app/apps/world-editor/dist (SPA fallback)
- `/FRONTPAGE/*` → /opt/hot/app (static)
- `/html/*` → /opt/hot/app (legacy HTML; fallback /HTML_INDEX.html)
- `/*.html` (top-level) → /opt/hot/app
- `/docs/*` → /opt/hot/app
- `/` → /opt/hot/app/FRONTPAGE (fallback /index.html)
- Custom 404: /FRONTPAGE/404.html

## Frontpage Changes
- Replaced localhost links
- Added buttons: World Editor (React), World Editor (HTML), Visual Magic Translator
- Removed early “temporal-grammar-dude” link; kept image-based link
- Fixed Time Judge image (EN/FR/RU alignment pending for EN/RU if desired)

## HTML Fixes
- HOT_GAME_UNIFIED.html → uses /engine, /api, /vector
- MULTIPLAYER_DEMO_HOMM3.html → health via /engine/health
- SPECTATOR_GOD_MODE.html → ws comment updated to wss via proxy

## Docs
- Enabled static serving of `/docs/*`; pages render if present

## Dotfiles Updated
- `.ports` — now documents VPS routes and public URLs
- `.services` — reflects systemd ports and proxied routes
- `.map` — updated map of important URLs (VPS)

## Next Steps
- Optional: unify Time Judge image on EN/RU
- Audit remaining legacy pages that still reference `localhost` and fix similarly
- If a specific SpinForest page is blank, adjust its asset paths to relative

— Deployed and validated on 2025-08-13