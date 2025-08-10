# Heroes of Time — Playbooks **Multijoueur** (stress & mind-games)

> 24 scénarios concrets pensés pour le **multi**, chacun avec : *Préconditions*, *Étapes*, *Attendus serveur*, *Invariants*, *Agents*, *Logs/Metrics*, et un **schéma ASCII**.

Légende : `A` énergie, `Φ` phase, `|I|` interférence, Régulateurs (**V** Vince, **An** Anna, **O** Overload), `t_w/t_e` temps monde/entité.

---

## MP-01 — **Pinch en sablier** (2v1 avec clone en pincette)
**Préconditions** : J1 (Ventus) à l’Est, J2 (Axis+clone) à l’Ouest, J3 (Terra) au centre chokepoint. `Axis` a `Sabliers Jumeaux` (clone J-2), `|I| cible ≥ 0.6`.
**Étapes** : J1 harass → J2 lance clone → convergence à `X` contre J3.
**Attendu** : si `Δlvl` faible → **TCG** 2v1 (clone affaibli selon `|I|`). Si `Δlvl` fort → **collapse** avec mod 2v1.
**Agents** : **V** ouvre couloir si Terra soft-lock.  
**Schéma**
```
E →   J1 ●──→ X ←── ○ clone (J2)
W →   J2 ●──→/
       (pinch)
```

## MP-02 — **Sandwich temporel** (3 timings)
**Préconditions** : J1/J2 pressent J3 en 3 temps : J2 (passé), J1 (présent), clone J1 (futur proche).
**Étapes** : collisions séquencées sur même node.
**Attendu** : ordre serveur déterministe par `trace_hash`; jamais double-résolution.
**Invariants** : idempotence des loots/flags.
**Logs** : `arbiter.order`, `trace_hash`.

## MP-03 — **Kingmaking furtif**
**Préconditions** : J4 (Nyx) peut décider d’intervenir pour faire gagner J1 contre J2, sous furtivité `Φ` sensible.
**Étapes** : piqûre à `t_w`−ε sur ressource clé.
**Attendu** : pas d’invisibilité absolue; log d’accès; Vince peut lever partiellement CF.
**Invariant** : pas de “free win” par bug de furtivité.

## MP-04 — **Camp de portail** (anti-camp)
**Préconditions** : J2 campe un portail de poche.
**Étapes** : J1 tente passage, J2 réagit au tick.
**Attendu** : *fair window* anti-camp; pas de “telefrag”; coût d’occupation ↑.
**Agent** : **V** peut décaler portail si griefing durable.

## MP-05 — **Course aux reliques sync** (tie-break)
Deux équipes 2v2 capturent 2 reliques en même tick.  
**Attendu** : tie-break global → priorité *Hold > Steal* (ou table config); `trace_hash`.

## MP-06 — **Fuite à travers tore + voile**
**Préconditions** : J1 fuite E→W wrap + `Briseur de Voile`.
**Étapes** : J2 poursuit mais sans voile.
**Attendu** : J1 passe CF, J2 prend friction d’edge; si `Δt_e` < seuil → rencontre collapse.

## MP-07 — **Collusion ψ** (échange de clones)
**Préconditions** : J1/J2 tentent un “échange” : leur clone se superpose pour booster `|I|` de l’autre.
**Attendu** : **interférence inter-joueur = 0** (ψ non compatibles) → pas de buff croisé.
**Invariant** : sécurité identité (pas de fusion cross-ψ).

## MP-08 — **Chute d’éco sous Anna**
**Préconditions** : J3 tortue; J1/J2 engagent ailleurs.
**Étapes** : Anna tape prod de J3.
**Attendu** : decay progressif, jamais instant-kill; télémétrie claire.

## MP-09 — **Surcharge en mêlée** (teamfight 6 entités)
**Préconditions** : 4 joueurs + 2 clones sur node relique.
**Étapes** : TCG déclenchable, mais stack>cap.
**Attendu** : **O** (Overload) → collapse auto; TCG reporté; log survivances canoniques.

## MP-10 — **Corde de causalité** (pull micro)
**Préconditions** : Nyx tire Ventus d’une case pour casser timing.
**Attendu** : shift `t_e` +1 step; vérif pas de “double état”.

## MP-11 — **Double rollback opposé** (anti-paradoxe)
Deux joueurs rollback en sens opposés vers le même node.  
**Attendu** : collisions ordonnées; flags non dupliqués.

## MP-12 — **Sabotage de phase urbaine**
Ville “Bazar Temporel” draine Φ des clones en transit.  
**Attendu** : `|I|` tombe sous `I_mid` → clone rétrogradé (buff only).

## MP-13 — **Choke avec stabilisation**
**Préconditions** : J3 stabilise (dérive=0) sur choke key.
**Attendu** : Δ↑ ⇒ **V** couloir virtuel + **An** decay; pas d’anti-jeu durable.

## MP-14 — **Rush portails en chaîne**
J1 enchaîne 3 portails pour surprise-strike.  
**Attendu** : coût cumulé min; pas de “free teleport”; jitter limité.

## MP-15 — **Split ψ en éventail**
J2 split 3 clones faibles pour reconnaissance.  
**Attendu** : `Σ|ψ|^2≈1`; clones < `I_min` → buff/dissip.

## MP-16 — **Harpon CF** (fenêtre de perçage)
**Préconditions** : J1 déclenche Vince fenêtré; J2 tente recacher.
**Attendu** : visuel “fenêtre” net; pas d’incohérence cache/vision.

## MP-17 — **Sabliers + Ancre** (anti-drain Φ)
**Préconditions** : Axis clone + Ancre quantique.
**Attendu** : drain Φ ralenti; `|I|` maintenu > `I_mid` avant rencontre.

## MP-18 — **Semi-AFK en TCG**
**Préconditions** : duel tendu; J2 répond 1 action / 30s.
**Attendu** : pas d’auto-IA tant que jauge activité > seuil; sinon takeover.

## MP-19 — **King of the Hill** (multi-hold)
3 équipes contestent un node *Hill*.  
**Attendu** : compteur *hold* freeze si stack>cap; Vince réduit CF.

## MP-20 — **Ghost capture** (anti-duplication)
Rollback simultané tenté pour rejouer capture.  
**Attendu** : idempotence par `causal_guard`; pas de double loot.

## MP-21 — **Traque de convoi cross-time**
**Préconditions** : Axis escorte marchandise via timeline offset.
**Étapes** : Ventus tente intercepter via wrap.
**Attendu** : rencontre si `Δt_e` converge dans fenêtre; sinon passé manqué.

## MP-22 — **Demi-carte clone** (seuil tangentiel)
`|I|=0.74` vs `I_strong=0.75`.  
**Attendu** : strict : **clone affaibli**, zéro “demi-carte”.

## MP-23 — **Brouillard tempête + Vince**
Tempête CF ×1.5 + perçage Vince.  
**Attendu** : perçage partiel; coûts trajets ↑; logs météo.

## MP-24 — **Finale simultanée**
Deux conditions de victoire se déclenchent au même tick.  
**Attendu** : règle d’arbitre + `trace_hash` publiés dans log de match.
