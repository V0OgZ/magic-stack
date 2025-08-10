# (26) Topologie & Ontologie du moteur vs. une « théorie du tout » (jeu)

**Auteur·rice in‑game :** *Smallinly, Archiviste Itinérant·e du Temps*  
**Portée :** document d’**exposition sérieuse** (raisonnée, falsifiable) — avec **clins d’œil diegétiques**.  
**Avertissement d’humilité :** nous **n’identifions pas** notre modèle de jeu à une théorie physique réelle. Nous proposons une **correspondance structurée** (analogie) pour guider conceptuellement la conception, les tests et l’optimisation.

---

## Résumé (Abstract)

Nous modélisons le monde de *Heroes of Time* comme un **graphe discret orchestré** (état `S(t_w)`), doté d’**entités** possédant une **énergie complexe** `E = A + iΦ` et d’une **identité** `|ψ⟩` sujette à **interférences**. Nous comparons sa **topologie** (torus, portails, champs) et son **ontologie** (objets, agents régulateurs, résolutions) à une **variété effective à 26 dimensions**. Ce nombre de dimensions est un **clin d’œil** aux 26D de la théorie bosonique des cordes : ici, il sert de **cadre de comptabilité** pour les variables latentes/observables qui gouvernent le gameplay. Nous détaillons : (i) une **décomposition en 26 axes** ; (ii) les **symétries** et **conservations** (Noether‑like) ; (iii) une **structure causale** (OPC ≈ cône d’atteignabilité) ; (iv) un **test empirique** par scénarios et traces `trace_hash`.


---

## 1. Notations & rappel de modèle

- Carte spatiale `Λ = {0..W-1}×{0..H-1}` ; graphes `(V_S, E_S)` (+ arêtes portails `E_P`).  
- Temps monde discret **autoritaire** `t_w ∈ ℕ` ; temps local entité `t_e`.  
- Entité `i` : `h_i = ⟨pos_i, A_i, Φ_i, ψ_i, lvl_i, …⟩`.  
- **Interférence** entre incarnations `a,b` d’un même héros : `I(a,b) = ⟨ψ_a | ψ_b⟩ e^{i(Φ_a−Φ_b)}`.  
- **OPC** (ombre portée causale) : ensemble de cases atteignables compte tenu d’`A` et des coûts.  
- **CF** (brouillard de causalité) : incertitude/masquage de l’état du monde.  
- Régulateurs : **V** (Vince, perçage), **An** (Anna, décroissance), **O** (Overload, nettoyage).

> *Note de Smallinly :* “Tout système sérieux admet une poésie. Ici, elle tient dans `Φ`, la petite chanson d’une action avant qu’elle ne s’effondre en histoire.”


---

## 2. La « variété effective » à **26 dimensions**

Nous regroupons les **variables d’état** et **champs** en **26 axes** représentant l’espace d’état minimal pour prédire la résolution des rencontres et l’évolution locale. Certaines dimensions sont **scalaires locaux** (par tuile), d’autres **paramètres d’entité**.


### 2.1 Cinématique (4)
1. **x** — position spatiale (axe horizontal).  
2. **y** — position spatiale (axe vertical).  
3. **t_w** — temps du monde (tick serveur).  
4. **Δt** = `t_e − t_w` — déphasage local (rythme entité vs monde).

### 2.2 Énergétique (4)
5. **A** — énergie réelle (points d’action).  
6. **Φ** — composante imaginaire/cohérence (décohérence → interférences).  
7. **ρ** — *drift* (taux de régénération passive locale).  
8. **λ** — taux de décohérence (bruit/“température” du milieu).

### 2.3 Identité & Interférence (4)
9. **ρ_ψ** — part de norme affectée à l’incarnation (split).  
10. **θ_ψ** — argument/phase interne de l’identité locale.  
11. **|I|** — magnitude d’interférence avec l’incarnation de référence.  
12. **arg I** — phase relative (constructive vs destructive).

### 2.4 Topologie & Champs (7)
13. **CF** — niveau de brouillard (0..1).  
14. **R_OPC** — rayon/portée atteignable (budget OPC agrégé).  
15. **κ** — courbure/roughness du graphe (Ollivier‑Ricci approx locale).  
16. **τ** — indice topologique (classe de chemin : cycles du tore/portails).  
17. **σ** — salience (priorité/importance de la zone).  
18. **ω** — champ météo/perturbation sur CF et coûts.  
19. **π_p** — potentiel de portail (proximité/charge du réseau `E_P`).

### 2.5 Charges ludiques (4)
20. **r₁** — charge ressource #1 (ex. or).  
21. **r₂** — charge ressource #2 (ex. éther/mana).  
22. **r₃** — charge ressource #3 (ex. clés/sceaux).  
23. **r₄** — charge relique/influence (déforme `σ`, seuils).

### 2.6 Régulateurs (3)
24. **v(x,y)** — intensité de perçage **Vince** (fenêtres/couloirs).  
25. **a(x,y)** — pression de **décroissance** d’**Anna**.  
26. **o(x,y)** — pression d’**Overload** (surcharge/collapse).

> **Remarque** : Nous n’affirmons pas que ces 26 axes “existent” physiquement. Ils constituent une **base utile** pour l’inférence et l’implémentation (UI, seuils, logs, tests).


---

## 3. Topologie : de la carte au feuilleté causal

- **Tore** : `(x,y)` modulo `(W,H)` ⇒ **deux cycles fondamentaux**.  
- **Portails** : arêtes longues `E_P` (raccourcis homotopiques) ; on peut définir un **indice τ** (parité de passage).  
- **Feuilleté causal** : `t_w` discrétise les couches ; **OPC** joue le rôle d’un **cône d’atteignabilité** (analogue à un cône de lumière mais gouverné par **énergie/couts**, pas par c).  
- **CF** : champ scalaire sur `V_S` ; son **gradient** guide UX et IA (reconnaissance).

ASCII — *cône d’atteignabilité (OPC) dans un feuillet* :
```
t_w = k
     y ↑
       │   ░▒▓███ CF
       │    ..........     halo OPC
       │     ....●....
       └──────────────→ x
```

> *Aside (Smallinly)* : “Le monde est plié, mais on ne le casse pas : on tend des cordes (portails) et on accorde la harpe (κ, τ).”


---

## 4. Ontologie : entités, événements, régulateurs

- **Entités** : héros/PNJ/clones avec `E`, `|ψ⟩`, inventaires (rᵢ).  
- **Événements** : `intents` (déplacements, splits, portails, sorts), `meets` (rencontres), `resolutions` (Collapse/TCG/Auto).  
- **Régulateurs** (*garde‑fous dynamiques*) :
  - **Vince** (*v*) : perce CF, ouvre des **couloirs** si soft‑lock.  
  - **Anna** (*a*) : **décroissance** des accumulations passives (anti‑tortue).  
  - **Overload** (*o*) : **collapse** propre en cas de surcharge (stack de clones/événements).

> Ontologiquement, ces régulateurs sont des **champs actifs** qui **restaurent** des invariants (No‑deadlock, pas de duplication, lisibilité).


---

## 5. Symétries & lois de conservation (Noether‑like)

- **Translation spatiale** (tore) : coûts invariants à translation, modulo κ/ω locaux.  
- **Translation temporelle** (ticks) : règles stables ⇒ **déterminisme de trace** (`trace_hash` stable pour même graine).  
- **Conservation d’identité** : `Σ‖ψ‖² ≈ 1` sur toutes incarnations.  
- **Monotonicité** : `A ≥ 0` (dette bornée si activée).  
- **Idempotence** : rollback ne **duplique pas** d’artefacts.  
- **Symétrie de phase** (Φ) : seules les **différences** de phase (arg I) comptent.  

ASCII — *Espace (A,Φ)* : régions d’effet d’interférence
```
      Φ ↑
       │   constructive   |I|↑
       │     ╭───╮
       │  ───┤ + │───
       │     ╰───╯   destructive (Δ≈π)
       └────────────→ A
```


---

## 6. Correspondances « physiques » (analogie guidée)

| Moteur (jeu) | Rôle / maths | Analogie physique (prudente) |
|---|---|---|
| OPC (reach set) | budget énergie + BFS pondéré | cône causal (vitesse ≠ c, contrainte par coûts) |
| CF (brouillard) | champ scalaire d’incertitude | champ d’information (épistémique) |
| `E=A+iΦ` | énergie complexe | amplitude complexe / action imaginaire (formalisme de phase) |
| `|ψ⟩`, interférence `I` | produit scalaire + phase | amplitudes de probabilité / cohérence quantique |
| Vince/Anna/Overload | champs de contrainte | termes de jauge/renormalisation/thermostat |
| `trace_hash` | hachage de trajectoire | intégrale de chemin (réplicabilité du “film”) |

> *Caveat* : ce sont des **métaphores opérationnelles** pour concevoir équilibrages & tests.


---

## 7. Décisions algorithmiques motivées par la « 26D »

1. **Ordonnancement déterministe** `key=(σ,kind,id,seed)` : compatibilité avec *translation temporelle* (trace stable).  
2. **Seuils d’interférence** `{I_min, I_mid, I_strong}` ajustés par `(λ,ρ,ω)` : contrôlent clones **complets/affaiblis/buff/dissip**.  
3. **Couloirs Vince** déclenchés par `(CF, τ, κ, σ)` : la topologie locale motive le perçage.  
4. **Overload** basé sur `(o, κ, σ)` : nettoyage quand la densité d’événements dépasse un cap.  
5. **Anna** module `(a, ρ)` : économie se corrige si accumulation non interactive.


---

## 8. Coupes dimensionnelles (extraits ASCII)

### 8.1 `(x, y)` avec `CF` et halo `OPC`
```
██▒▒▒▒▒▒
█●→→→▒▒▒    ● héros ; → chemin min coût ; halo clair = OPC
█  → →▒▒
```

### 8.2 `(x, Δt)` — rattrapage d’un clone
```
Δt ↑
 +  |   ○ clone (retard) ──╮  X fusion si |I|↑ et arg I≈0
 0  | ● main ──────────────┼──╯
 -  |______________________└────────→ x
```

### 8.3 `(A, Φ)` — régions d’interférence
```
Φ
╭──── constructive
│  ╭───╮
│  │ + │
│  ╰───╯
└───────── A
```

### 8.4 `(τ, π_p)` — portails et classes de chemins
```
classe τ: 0 1 0 1 ...
π_p  ↑      ⭕   ⭕   (potentiel de “saut” ↑ près des portails)
```


---

## 9. Falsifiabilité & protocole de test

- **Hypothèse H1** : `σ` (salience) prédit correctement la **résolution** (Collapse vs TCG) à Δlvl constant.  
- **Hypothèse H2** : `(λ,ρ)` déplacent les seuils `{I_min,I_mid,I_strong}` tel que mesuré par la **taux de clones affaiblis**.  
- **Hypothèse H3** : `κ` (roughness) corrèle avec la **fréquence Overload** à activité équivalente.  
- **Mesure** : logs `resolution.kind`, `|I|`, `overload.applied`, `window.vince` + `trace_hash`.  
- **Critère** : réplicabilité **≥ 0.99** sur seeds identiques (environnement contrôlé).


---

## 10. Limites de l’analogie

- La **26D** ici est **effective** (ingénierie) — rien à voir avec la **consistance quantique** des cordes.  
- Les “champs” régulateurs sont **design‑driven**, pas dérivés d’une Lagrangienne fondamentale.  
- Les “charges” ludiques `rᵢ` sont **sémantiques**, pas des symétries de jauge au sens strict.  
- L’**épistémique** (CF) n’est pas une indétermination ontologique : c’est une **vue** côté joueur.


---

## 11. Annexes

### 11.1 Tableau de comptage (26 axes)

| Groupe | # | Axes |
|---|---:|---|
| Cinématique | 4 | x, y, t_w, Δt |
| Énergétique | 4 | A, Φ, ρ, λ |
| Identité/Interf. | 4 | ρ_ψ, θ_ψ, |I|, arg I |
| Topo/Champs | 7 | CF, R_OPC, κ, τ, σ, ω, π_p |
| Charges ludiques | 4 | r₁, r₂, r₃, r₄ |
| Régulateurs | 3 | v, a, o |
| **Total** | **26** | — |

### 11.2 Pseudocode — cône d’atteignabilité & décision
```python
def reachable_OPC(world, hero):
    return bfs_weighted(origin=hero.pos, budget=hero.A, cost=tile_cost)

def decide_resolution(meet, ctx):
    score = f(Δlvl, σ(ctx.zone), |I|, Δt, ω, κ)
    if score < θ_collapse: return COLLAPSE
    if afk_or_optin(meet): return AUTO
    return TCG
```

> *Note de Smallinly* : “Quand on sait marcher, on mesure la carte en pas ; quand on sait compter, on la mesure en dimensions ; quand on sait jouer, on la mesure en histoires.”


---

## 12. Conclusion

Cette **cartographie 26D** fournit un **vocabulaire commun** pour relier **mécaniques**, **UI**, **équilibrage** et **tests**. Elle n’a pas d’ambition métaphysique : c’est un **outil d’architecture**. Mais comme toutes les bonnes cartes, elle **suggère** des chemins nouveaux : classes de portails topologiques, modulation adaptative de `λ` par météo, ou encore seuils d’interférence **contextuels** `I*(σ,κ,ω)` pour garder la stratégie **ludique et lisible**.
