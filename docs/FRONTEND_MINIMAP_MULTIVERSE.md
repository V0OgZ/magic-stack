# Frontend — Mini‑map Multiverse (observe/compact)

Consomme l'endpoint `/observe/compact` et affiche un petit graphe de 5–9 nœuds.

## Endpoint
- GET `/observe/compact` → `{ nodes:[{id,p}], edges:[[from,to],...], collapse_counter }`

## Pseudo-code (React)
```jsx
useEffect(() => {
  let alive = true;
  async function poll() {
    const r = await fetch(`${base}/observe/compact`);
    const j = await r.json();
    if (!alive) return;
    setGraph(j);
    setTimeout(poll, 800);
  }
  poll();
  return () => { alive = false };
}, []);
```

## Rendu
- Disposer les nœuds en cercle, taille proportionnelle à `p`, arêtes fines.
- Afficher `collapse_counter` et un indicateur vert/jaune/rouge.

## Extensions
- Click nœud → détail (ids, probas, actions possibles)
- Colorer par type (entité/spot/etc.) si dispo
