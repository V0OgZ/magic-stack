# Manuel temporel QuickCast (exécutions manuelles)

Ce guide donne des actions immédiates, sans npm, en ouvrant les pages statiques du dossier dist/ et en lançant des commandes dans la console du navigateur.

## 1) Ouvrir les pages statiques

Terminal (macOS):

```bash
open /Volumes/HOT_DEV/Magic/magic-stack/apps/magic-stack-unified/dist/index.html
open /Volumes/HOT_DEV/Magic/magic-stack/apps/magic-stack-unified/dist/dashboard.html
open /Volumes/HOT_DEV/Magic/magic-stack/apps/magic-stack-unified/dist/CHASSE_TEMPORELLE_MEGA_MAP.html
open /Volumes/HOT_DEV/Magic/magic-stack/apps/magic-stack-unified/dist/html/IA_VS_IA_AUTOPLAY.html
```

Ensuite, ouvrir Outils de développement > Console.

## 2) Vérifier/ajuster les endpoints (optionnel)

Dans la console du navigateur sur une page dist:

```js
await MagicStack.utils.healthCheck()
MagicStack.utils.setEndpoints({
  rust: 'http://localhost:3001',
  java: 'http://localhost:8080',
  vector: 'http://localhost:5001'
})
```

## 3) Casts immédiats depuis la console

Ces commandes utilisent l’objet global CastingManager exposé par l’app.

- Démo locale sans backend (icônes, trajectoire, sons légers):
```js
CastingManager.castWarriorCombo({ x: 120, y: 220 }, { x: 420, y: 300 })
```

- Cast quantique via backend Java (nécessite l’API Java active):
```js
await CastingManager.cast(
  'TEMPUS::FREEZE',
  { class: 'temporal', position: { x: 200, y: 180 }, level: 3 },
  { x: 420, y: 260 },
  { forceMode: 'quantum' }
)
```

- Cast iconique discret et silencieux:
```js
await CastingManager.cast(
  'COMBAT::SHOOT',
  { class: 'warrior', position: { x: 140, y: 260 } },
  { x: 380, y: 280 },
  { forceMode: 'iconic', subtle: true, silent: true }
)
```

- Variantes d’affichage:
```js
await CastingManager.cast('RUNE::BIND', { class: 'mage', position: { x: 240, y: 220 } }, { x: 460, y: 260 }, { forceMode: 'runic' })
await CastingManager.cast('NARR::TAUNT', { class: 'priest', position: { x: 260, y: 240 } }, undefined, { forceMode: 'literary' })
```

Notes:
- position et target sont des coordonnées en pixels dans la fenêtre.
- Si le backend Java n’est pas démarré, les cast(...) réseau échoueront; utiliser castWarriorCombo(...) en local.

## 4) Calculs utiles côté Rust (drift, énergie)

Si le backend Rust est actif:

```js
await MagicStack.rust.calculateDrift(10, 8)
await MagicStack.rust.calculateEnergy(40, 1.57)
```

## 5) Séquence “111” ultra-rapide

```bash
open /Volumes/HOT_DEV/Magic/magic-stack/apps/magic-stack-unified/dist/index.html
```
```js
await MagicStack.utils.healthCheck()
CastingManager.castWarriorCombo({ x: 120, y: 220 }, { x: 420, y: 300 })
```
