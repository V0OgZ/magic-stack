# Heroes of Time — Guide Début Intégrateur **Front**  
*(style HoMM3 mais **sans tour par tour**) — Vertical slice en 1 journée*

> Objectif : te donner un **chemin simple** pour afficher une **map**, un **héros** qui se déplace,
> de l’**énergie** qui se dépense, un **brouillard**, une **ombre portée** et des **rencontres auto** —
> **sans** te plonger dans les parties complexes (Ψ, Φ, arbitre, etc.).

---

## 0) Ce que tu vas construire
- Une **grille** (20×12) avec quelques tuiles “forêt”, “plaine”, “colline”.
- Un **héros** (icone) qui se déplace au clic.
- Une **barre d’énergie** A (points d’action) qui baisse quand tu bouges.
- Un **brouillard** (CF) autour des zones non explorées.
- Une **ombre portée** (OPC) qui montre *jusqu’où tu pourrais aller* avec ton A restant.
- Des **rencontres auto** (si tu marches sur une tuile “garde”).
- Un **mode auto** si tu es AFK (l’IA joue simple).

> On garde tout **local** (mock) pour le vertical slice. Ensuite tu brancheras sur le vrai back.

---

## 1) Démarrage minimal (React + TS)
- **Stack** : Vite + React + TypeScript + Tailwind (ou CSS simple).
- **Dossier** `src/` : `App.tsx`, `Map.tsx`, `Hud.tsx`, `engine.ts`, `mock.ts`

```
npm create vite@latest hot-starter -- --template react-ts
cd hot-starter && npm i && npm run dev
```

---

## 2) Modèle d’état (ultra simple)

```ts
// src/engine.ts
export type TileKind = 'plain' | 'forest' | 'hill' | 'guard';
export type Pos = { x: number; y: number };

export type World = {
  W: number; H: number;           // taille de la map
  tiles: TileKind[];               // W*H
  fog: boolean[];                  // W*H : true = caché
  hero: { pos: Pos; A: number; Amax: number; level: number };
  clock: { tw: number; te: number };     // temps monde / temps héros (mock)
  settings: { drift: number };            // dérive passive par tick (mock)
};

export const idx = (w: World, x: number, y: number) => y*w.W + x;
```

- **A** = énergie (points d’action). Pas de dette, pas de Φ/Ψ ici.
- **tw/te** : juste pour afficher (tick mock dans `mock.ts`).

---

## 3) Génération du monde (mock)

```ts
// src/mock.ts
import { World, TileKind, idx } from './engine';

export function makeWorld(W=20, H=12): World {
  const tiles: TileKind[] = new Array(W*H).fill('plain');
  // quelques forêts & collines random
  for (let i=0;i<W*H;i++){
    const r = Math.random();
    if (r < 0.12) tiles[i] = 'forest';
    else if (r < 0.16) tiles[i] = 'hill';
  }
  // 6 gardes
  for (let k=0;k<6;k++){
    const x = Math.floor(Math.random()*W), y=Math.floor(Math.random()*H);
    tiles[idx({W,H} as any, x, y)] = 'guard';
  }
  const fog = new Array(W*H).fill(true);
  const world: World = {
    W, H, tiles, fog,
    hero: { pos: {x:1,y:1}, A: 12, Amax: 12, level: 3 },
    clock: { tw: 0, te: 0 },
    settings: { drift: 0.01 } // dérive: A se régénère très lentement
  };
  // décacher départ
  reveal(world, world.hero.pos, 3);
  return world;
}

export function reveal(w: World, p: {x:number;y:number}, r=3){
  for(let y=0;y<w.H;y++) for(let x=0;x<w.W;x++){
    const d = Math.abs(x-p.x)+Math.abs(y-p.y);
    if (d<=r) w.fog[idx(w,x,y)] = false;
  }
}
```

---

## 4) Coûts de déplacement & ombre portée

```ts
// src/engine.ts (suite)
export function moveCost(kind: TileKind){
  if (kind==='forest') return 2;
  if (kind==='hill') return 3;
  return 1; // plain|guard
}

export function inBounds(w: World, x:number, y:number){
  return x>=0 && y>=0 && x<w.W && y<w.H;
}

// renvoie le chemin direct (4 directions) et le coût total
export function pathAndCost(w: World, from: Pos, to: Pos){
  const path: Pos[] = [];
  let cost = 0, x=from.x, y=from.y;
  // Manhattan simple (vertical puis horizontal)
  while (y!==to.y){ y += (to.y>y?1:-1); cost += moveCost(w.tiles[idx(w,x,y)]); path.push({x,y}); }
  while (x!==to.x){ x += (to.x>x?1:-1); cost += moveCost(w.tiles[idx(w,x,y)]); path.push({x,y}); }
  return { path, cost };
}

// Ombre portée = cases atteignables avec A courant (BFS manhattan rapide)
export function reachable(w: World): boolean[] {
  const R = new Array(w.W*w.H).fill(false);
  const q: {x:number;y:number;A:number}[] = [{...w.hero.pos, A: w.hero.A}];
  const seen = new Set<string>([`${w.hero.pos.x},${w.hero.pos.y}`]);
  R[idx(w, w.hero.pos.x, w.hero.pos.y)] = true;
  while(q.length){
    const cur = q.shift()!;
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    for(const [dx,dy] of dirs){
      const nx = cur.x+dx, ny=cur.y+dy;
      if(!inBounds(w,nx,ny)) continue;
      const k = `${nx},${ny}`;
      const c = moveCost(w.tiles[idx(w,nx,ny)]);
      if (cur.A>=c && !seen.has(k)){
        seen.add(k); R[idx(w,nx,ny)] = true;
        q.push({x:nx,y:ny,A:cur.A-c});
      }
    }
  }
  return R;
}
```

---

## 5) Composants UI (Map & HUD)

```tsx
// src/Map.tsx
import React from 'react';
import { World, idx, pathAndCost, reveal, reachable } from './engine';

type Props = { w: World; setWorld: (w:World)=>void; };

export function Map({w,setWorld}:Props){
  const R = reachable(w);
  function onClickTile(x:number,y:number){
    const {path, cost} = pathAndCost(w, w.hero.pos, {x,y});
    if (cost > w.hero.A) return; // pas assez d'A
    const w2 = {...w, tiles:[...w.tiles], fog:[...w.fog], hero:{...w.hero}};
    for(const step of path){
      w2.hero.pos = step;
      w2.hero.A -= moveCost(w2.tiles[idx(w2, step.x, step.y)]);
      reveal(w2, step, 3);
      // rencontre auto si guard
      const t = w2.tiles[idx(w2, step.x, step.y)];
      if (t==='guard'){
        // auto-combat simple
        const ok = autoFight(w2.hero.level, 2); // garde lvl 2
        // résultat: retire la tuile guard quoiqu'il arrive
        w2.tiles[idx(w2, step.x, step.y)] = 'plain';
        // feedback
        console.log('combat', ok?'WIN':'LOSE');
        if (!ok) break;
      }
    }
    setWorld(w2);
  }
  return (
    <div style={{display:'grid', gridTemplateColumns:`repeat(${w.W}, 28px)`, gap:2}}>
      {w.tiles.map((t, i)=>{
        const x = i%w.W, y = (i/w.W)|0;
        const fog = w.fog[i];
        const can = R[i];
        const isHero = (x===w.hero.pos.x && y===w.hero.pos.y);
        const bg = t==='plain'?'#9fd38f': t==='forest'?'#2e7d32': t==='hill'?'#8d6e63':'#b71c1c';
        const overlay = fog ? 'brightness(0.2)' : can ? 'drop-shadow(0 0 6px rgba(0,0,0,.25))' : 'none';
        return (
          <div key={i}
            onClick={()=>onClickTile(x,y)}
            style={{width:28,height:28, background:bg, position:'relative', filter:overlay, cursor:'pointer', border:'1px solid #1b1b1b'}}
            title={`${x},${y}`}>
            {isHero && <div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',fontSize:18}}>🧭</div>}
          </div>
        );
      })}
    </div>
  );
}

function moveCost(tile:'plain'|'forest'|'hill'|'guard'){
  if (tile==='forest') return 2;
  if (tile==='hill') return 3;
  return 1;
}

function autoFight(heroLvl:number, enemyLvl:number){
  const diff = heroLvl - enemyLvl;
  const base = 0.5 + 0.1*diff;
  return Math.random() < Math.max(0.1, Math.min(0.9, base));
}
```

```tsx
// src/Hud.tsx
import React from 'react';
import { World } from './engine';

export function Hud({w, onRest}:{w:World; onRest:()=>void}){
  const pct = Math.round(100*w.hero.A/w.hero.Amax);
  return (
    <div style={{display:'flex', gap:16, alignItems:'center', margin:'8px 0'}}>
      <div>Jour caché <b>{Math.floor(w.clock.te/10)}</b> — t_w:<b>{w.clock.tw}</b> t_e:<b>{w.clock.te}</b></div>
      <div style={{width:160, height:10, background:'#333'}}>
        <div style={{width:`${pct}%`, height:'100%', background:'#00d084'}}/>
      </div>
      <div>A: <b>{w.hero.A}</b> / {w.hero.Amax}</div>
      <button onClick={onRest}>⏳ Repos (regen A)</button>
      <label style={{marginLeft:12}}><input type="checkbox" onChange={e=>localStorage.setItem('auto', e.target.checked?'1':'0')} /> Auto si AFK</label>
    </div>
  );
}
```

```tsx
// src/App.tsx
import React, { useEffect, useState } from 'react';
import { World } from './engine';
import { makeWorld } from './mock';
import { Map } from './Map';
import { Hud } from './Hud';

export default function App(){
  const [w, setW] = useState<World>(()=>makeWorld());

  // Tick mock: regen légère (dérive) + AFK auto
  useEffect(()=>{
    const id = setInterval(()=>{
      setW(prev=>{
        const w2 = {...prev, hero:{...prev.hero}, clock:{...prev.clock}};
        w2.clock.tw += 1; w2.clock.te += 1;
        // dérive = petit +A passif
        if (w2.hero.A < w2.hero.Amax) w2.hero.A = Math.min(w2.hero.Amax, w2.hero.A + w2.settings.drift);
        // auto simple si AFK
        const auto = localStorage.getItem('auto')==='1';
        if (auto && Math.random()<0.1){
          // petit pas opportuniste si possible
          const nx = w2.hero.pos.x + (Math.random()<0.5?1:-1);
          const ny = w2.hero.pos.y + (Math.random()<0.5?1:-1);
          // on laisse Map gérer les coûts au clic manuel dans le slice minimal
        }
        return w2;
      });
    }, 200);
    return ()=>clearInterval(id);
  }, []);

  function onRest(){
    setW(prev=>({...prev, hero:{...prev.hero, A: Math.min(prev.hero.Amax, prev.hero.A + 3)}}));
  }

  return (
    <div style={{padding:12, fontFamily:'ui-sans-serif, system-ui'}}>
      <h1>Heroes of Time — Starter (async, pas de tour par tour)</h1>
      <Hud w={w} onRest={onRest} />
      <Map w={w} setWorld={setW} />
      <p style={{marginTop:8,opacity:.7}}>
        Astuce : vise les cases **brillantes** (ombre portée) — elles sont atteignables avec ton A actuel.
      </p>
    </div>
  );
}
```

---

## 6) Brouillard & Ombre portée : ce qu’on affiche
- **Brouillard (CF)** : on grise les cases non révélées (`fog[i] = true` → *darken*).
- **Ombre portée (OPC)** : on **met un glow** discret sur les cases atteignables **maintenant** (fonction `reachable` déjà fournie).

Schéma vite fait :

```
██████▒▒▒▒▒▒▒
██● → → ▒▒▒▒▒  ← glow clair = atteignable (OPC)
██      ▒▒▒▒▒
```

---

## 7) Rencontres : auto par défaut
- Tuile `guard` : si tu marches dessus → **auto-combat** (fonction `autoFight` simple).
- Si tu veux un “vrai” combat plus tard, tu ouvriras un **modal TCG** au lieu de résoudre instant.

---

## 8) Mode Auto (AFK)
- Une **checkbox** déclenche un petit comportement **opportuniste** (ici, on a juste mis la structure).
- Règle d’or : **si le joueur est inactif** > 60 s en combat, **l’IA prend**.

---

## 9) Roadmap pour brancher le vrai back
1. Remplacer le tick local par le **tick serveur** (`t_w`) via WebSocket.
2. Envoyer intention `move(to)` → recevoir **chemin validé** + coût A (serveur autoritaire).
3. **Logs** min à afficher : `A_delta`, `resolution.kind` (collapse/auto/TCG), `meet.delta_te` (si rencontre).
4. Recevoir **événements** (Anna/Vince/Overload) pour feedback UI.

---

## 10) Checklist “Vertical Slice OK”
- [ ] La map s’affiche et on voit l’icone héros.
- [ ] Cliquer une case déplace le héros **si** A suffisant.
- [ ] La barre **A** baisse quand on bouge; le **repos** remonte A.
- [ ] Le **brouillard** se révèle autour du héros.
- [ ] L’**ombre portée** (cases atteignables) se voit clairement.
- [ ] Marcher sur un **guard** déclenche une **rencontre auto**.
- [ ] Le **mode auto** peut jouer si AFK.
- [ ] Pas de plantage quand A=0 (on peut toujours se reposer).

---

## 11) Bonus (optionnels, si tu as 1–2h de plus)
- **Wrap torique** : quand x<0 → x=W-1 (et inversement).
- **Objets** simples : `Briseur de Voile` (ignore fog 1 tour), `Ampoule d’Éther` (+3 A).
- **Mini-clone** visuel : un “fantôme” qui apparait si tu cliques bouton *Sabliers* (sans mécanique Ψ).

---

## 12) Rappels UX (garder fun & lisible)
- **Lisibilité > réalisme** : feedback immédiat (glow, toasts, barres claires).
- **Jamais bloqué** : même à A=0, le joueur peut “se reposer” et remonter.
- **Pas de spam modals** : auto par défaut, TCG plus tard seulement si l’enjeu est gros.

Bonne intégration. Quand tu veux brancher la version **avancée** (Ψ/Φ, clones complets, régulateurs), passe au `README_DEV.md` + `13_doc_back.md`.
