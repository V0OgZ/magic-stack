# World Editor – PRO Developer Orientation

- Stack: React + Vite + TypeScript (`apps/world-editor/`)
- Domain: Zod schemas (`src/domain/schema.ts`), Import/Export (`src/domain/importExport.ts`), Legacy import (`src/domain/importLegacy.ts`)
- UI: `MapView` + `HexGrid`, `TimelineView`, `ParamsView`, `Clippy`
- Backends (optionnel pour preview): Rust (:3001), Java (:8080), Python (:5001)

## Run (local)
- Installer Node/npm
- cd apps/world-editor && npm i && npm run dev

## Tâches clés
- Overlays hex (OPC/CF), CRUD régions/POI
- Preview via endpoints Rust/Java
- WebSocket tick pour l’observabilité
- Import `.hsc.json` → format officiel (déjà mappé, compléter au besoin)
- Formulaires Params complets + validations

## Conventions
- Respecter `.cursorrules` (pas d’opérations destructives)
- Type-first, validations aux frontières
- iPad-first: pointer events, gros hitboxes
