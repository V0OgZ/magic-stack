# Heroes of Time — Q&A initiales

## Q1 — Temps différencié, tic serveur vs client
- **Serveur autoritaire** : le temps de référence (WorldTime `t_w`) vit côté back.
- **Temps local `t_e`** par entité : avance par actions (consommation d’énergie) + dérive passive.
- **Front** : interpolation & rendu (jamais source de vérité).

## Q2 — Énergie négative & rollback
- Revenir dans le passé **ne rend pas A négatif**. On reprend l’état (snapshot) `A, Φ` du temps ciblé.
- Si on agit **au-delà** de `A`, on entre en **dette** (`Debt_A`), qui accélère `t_e` et applique des malus.

## Q3 — Brouillard de causalité vs ombre portée
- **Ombre portée causale (OPC)** : potentiel d’atteinte si tout est optimisé maintenant.
- **Brouillard (CF)** : incertitude effective pour les autres (observable, perçable).

## Q4 — Quand TCG ? Quand collapse ?
- **Collapse** si impact faible / écart de niveau fort.
- **TCG** si impact élevé / niveaux proches.
- **Auto/IA** si les deux opt-in ou AFK>60s (IA niveau max 3).

## Q5 — Anti-tortue
- **Dérive passive** + **Anna** (décroissance) + **Vince** (percée) empêchent le blocage prolongé.
