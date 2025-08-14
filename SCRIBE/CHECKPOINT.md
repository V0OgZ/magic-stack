CHECKPOINT — État simple (scribe)

Date: auto

1) Faits marquants
- Dossier SCRIBE créé (README, MAP, ASSETS_MAP)
- Cartographie 6D / backends / frontend / specs 0826 en place
- Cartographie assets (icônes, sons, FX, contenus HOT, vector content)
- Audit Git effectué (branche prod OK, quelques modifs locales Java)

2) Où on en est
- Casting UI → chemin démo (/api/interstice/cast-formula)
- Parseur grammaire Rust présent mais non branché sur le cast
- API Java /api/magic/cast existante (logique minimale)
- Vector DB formules disponible (/formulas)

3) Prochaines actions (simples)
- [ ] Garder le flag démo et documenter dans SCRIBE/README.md
- [ ] Définir le payload cible `/api/magic/cast` (formula_id, context, mode)
- [ ] Lister 5 formules “frontpage” prioritaires (Chrono Lock, Dimension Fold, Reality Weave, Time Dilation, Interstice Portal)
- [ ] Préparer une fixture `demo_formulas.jsonl` (Spells Lab) dans SCRIBE/

4) Liens utiles
- SCRIBE/README.md (plan)
- SCRIBE/MAP.md (carte domaines)
- SCRIBE/ASSETS_MAP.md (assets)

Note: conserver ce checkpoint simple, sans hooks ni scripts automatiques, et le mettre à jour après chaque jalon.
