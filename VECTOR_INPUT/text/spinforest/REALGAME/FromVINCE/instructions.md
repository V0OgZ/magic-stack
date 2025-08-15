A PRENDRE AVEC DES PINCETTES CE SONT DES CONSEIL VOUS ETES LES IMGENIEURS
---

# 📜 **Instruction de Travail pour l’équipe — Mode Carte**

## 🎮 STRUCTURE DES MODES DE JEU

Heroes of Time est structuré en **3 modes** fondamentaux :

---

### 🌀 **1. Mode Méta / Surcarte** *(Référence : Image 1)*

![Image 1](attachment:/mnt/data/132519f2-18f5-4615-8ace-1c859dbc4d03.png)

> **But : choisir son nom, sa timeline, et la carte à explorer.**

* Vue en **2D iso ou top-down légère**, très lisible.
* Le joueur est incarné par un **avatar mobile**.
* Certains éléments sont **phasés** ou **opaques** : ce sont des timelines **non encore activées**.
* Le **brouillard de guerre** = causalité non résolue.
* Certains éléments sont en **transparence** = passés potentiels ou timelines mortes.
* Un **portail** permet d'entrer dans la vraie carte jouable.

→ Ce mode permet de **choisir son monde**, son **ligne temporelle**, ou d'**observer d'autres timelines** (alternatives, mortes, ou en superposition).

---

### ⚔️ **2. Mode Carte Principale ISO 2D Jouable** *(Référence : Image 2)*

![Image 2](attachment:/mnt/data/eff8897a-b833-41d8-8bb2-c1307b233ac2.png)

> **But : explorer, recruter, interagir avec la carte.**

* Carte en **2D isométrique**.
* Le héros est **mobile sur les plateformes**.
* Chaque **plateforme flottante** = mini-map, scénario ou événement.
* Des **portails ou vortex** relient les zones (changements de timeline, de monde, d’instance).
* Les **épées**, **châteaux**, **arènes** sont des objets / triggers / zones d’action.
* Les **phares cosmiques** autour = métaphore visuelle des timelines ou nœuds temporels.
* Il y a une logique de **transparence, phasage** ou de **brume** à intégrer dans l’UI.

→ C’est le cœur du gameplay d’exploration, de navigation entre timelines, et de déblocage progressif du monde.

---

### 🔥 **3. Mode Combat** *(Pas encore implémenté)*

> **À venir.** C’est un **mode à part entière**, déclenché dans certaines zones (plateformes ou donjons).
> Système de combat asynchrone avec logique quantique activée.

---

## 📂 INSTRUCTIONS TECHNIQUES POUR L'ÉQUIPE

1. 🔍 **Docs à retrouver** :

   * `spec_fog_of_war.md` (ancien doc de Wallace ou Vince)
   * `phasage_causalité.md` ou équivalent
   * `map_control_layer.md` : définit la logique de transparence + collision

2. 📁 **Répertoires à vérifier** :

   * `/REA/FONTAINE/`
   * `/MAPS/iso_maps/`
   * `/docs/visuals/brouillard/`
   * `/scripts/interstice/mécanismes/`

3. 🔧 **Ce qu’on attend de chacun** :

| Rôle        | Tâche                                                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Groeken** | Intégrer la stack magique dans les plateformes de la carte (activation de portail, phasage, lecture du temps).                        |
| **Dév 1**   | Rendre la carte **navigable en 2D ISO**, avec coordonnées, héros, affichage dynamique des tuiles, collisions de fog.                  |
| **Dév 2**   | Gérer le **brouillard de causalité** et les **timelines parallèles** (zones transparentes, choix narratif, retour temporel possible). |
| **Tous**    | Vérifier s’il existe déjà un composant `MapLayerController`, ou en créer un modulaire pour phasage/collapse/portail.                  |

---

## 🧩 Objectif Semaine

* 🎯 Afficher la **map ISO 2D jouable**, avec phasage partiel.
* 🎯 Le joueur peut se déplacer librement là où **la causalité n’est pas encore collapsée**.
* 🎯 Les portails apparaissent mais ne sont **activables que via sort / stack de Groeken**.
* ⚠️ Si une timeline est **morte**, elle est visible en **grisé / semi-transparente**, mais **non accessible**.

---

💬 S’il manque un doc, un composant, un vieux JSON de map : vous le demandez ou vous cherchez dans le dépôt `ARCHIVES/HOMM-LIKE/` ou `BACKLOG/FOGENGINE/`.

**Pas d’impro non canon. On suit la vision de Vince.**

---

Tu veux que je te sorte ça en `README_map_modes.md` avec les deux images incluses ou en `Notion`/Git ?


REFERENCE A REGARDER 

Map like heroes map.png
Multiverse MAP.png

 I want somethhing pretty if i need to frawe stuff put prompts in that fodler i will do thenm 


 🗺️ MONDE INSTANCIÉ : "FRONTIÈRE DE FEU ET FOI"
📍 ID de monde : world_church_sword_vortex_01
📐 Type de monde : Plaine plate semi-élevée, vue en 3/4 isométrique
🧠 Niveau d'abstraction : 1.5D (vue 2D avec éléments de perspective 3D)
🌀 Classe temporelle : monde figé avec ancrage causal — possible instanciation du vortex en action
🧩 STRUCTURE VISUELLE ET NARRATIVE
🎭 Éléments fixes du décor
Élément	Description	Fonction
⛪ Église en pierre	Bâtiment romanique, 1 étage + clocher conique, située en haut à gauche	Centre de foi ou de savoir. Peut contenir un grimoire, un artefact ou une entité scellée. Objet interactif
🌳 Arbre feuillu	Arbre massif proche de l’église, non stylisé, volumineux	Élément paisible, point d’ancrage naturel ; peut réagir aux changements d’équilibre magique
🌿 Herbe + Pavés	Sol d’herbe parsemé de dalles irrégulières	Terrain stable, marchable, sans effet magique. Bonne lisibilité visuelle pour interface utilisateur
🧱 Chemin en pierre	Courbe depuis l’église vers le centre, dalles bien alignées	Guide visuel pour le joueur, peut être utilisé comme "rail narratif" ou ligne de quête primaire
🔥 Éléments dynamiques / magiques
Élément	Description	Fonction / Effet
⚔️ Épée orange lumineuse	Enfoncée dans une faille, émet un halo ; énergie incandescente	Épée épique verrouillée, artefact à extraire : déclenche le début du scénario du vortex
🌋 Faille de lave	Craquelures dans le sol menant à l’épée, lignes rouges incandescentes	Peut s’étendre si mauvaise décision ; zone à éviter sans protection. Peut s’effondrer dynamiquement
🔁 Vortex orange	Spirale ardente en haut à droite, en retrait	Point d’entrée intermonde verrouillé. S’active après activation de l’épée. Peut servir de transition vers un monde brûlé
🧍‍♂️ Personnage joueur	Cape, épée courte, bras détendus, dos tourné, face à la faille	Héros par défaut ou proxy du joueur. Peut changer d'apparence via interface. Entrée par le bas
🧠 INTERPRÉTATION POUR IA DE CURSEUR
🧭 Grille interactive
Grille hexagonale déformée visuellement pour s’aligner avec l’aspect isométrique.
Chaque élément occupe un ou plusieurs nodes :
Église = 3x3
Vortex = 2x2
Épée = 1x1, mais déclenche une zone d’effet en croix autour d’elle
Joueur = 1x1
Z-index logique : le vortex et la faille sont sur un plan supérieur à l’herbe, mais peuvent être superposés avec transparence dynamique
🔮 DÉCLENCHEURS ET ÉTATS
Déclencheur	Conditions	Effets
Prendre l'épée	Joueur dans la case adjacente, action confirmée	- Activation du vortex
- Secousses du sol (écran tremble)
- Option de combat ou fuite
Entrer dans l’église	Si l’épée n’est pas prise, entrée bloquée (verrou de feu)	- Lecture d’un grimoire interdit
- Dialogue avec entité ou souvenir
- Ouverture d’un sous-scénario
Se rapprocher du vortex	Après activation	- Choix entre 2 portails : affronter la flamme ou fuir
- Transition vers monde fracturé ou combat instancié
🪞 ÉLÉMENTS DE TRANSPARENCE / META
Couches de lecture	Présence	Utilité
🔲 Layer 0 — décor statique	Oui	Pour l'affichage graphique principal, fond de scène
🟧 Layer 1 — éléments interactifs	Oui (épée, vortex, personnage)	Utilisé par le moteur de jeu pour navigation
🔷 Layer 2 — transparence temporelle	Oui (vortex, faille)	Permet aux IA de prédire les conséquences ou voir l’état latent du monde (comme le futur brûlé)
🟣 Layer 3 — narration flottante	Possible (via dialogue ou HUD invisible)	Permet de déclencher des monologues, souvenirs ou voix de l'interstice
🟡 Layer 4 — IA Backlog	Non visible	Pour IA uniquement : suivi des décisions du joueur dans ce monde pour ajuster la causalité globale
🎮 COMPATIBILITÉ & MOTEUR
Moteur cible : HOTS Frontend Vue 2D Isométrique
Langage d’action : grammaire temporelle (utilise formule pensée → projection 1D → projection 2D)
Couches de clic :
Zone d’interaction prioritaire = l’épée
Zone d’exploration secondaire = l’église
Zone dangereuse = faille/vortex
📦 SUGGESTIONS DE STOCKAGE
Dossier : /AVALON2/ZONES/frontieres_de_feu/
Fichiers :
map_frontiere_v1.png (image actuelle)
meta_frontiere.json (ce document sous forme parsable)
script_intro_fr.yaml (script narratif d'entrée)
fogmap_vortex.overlay (zone de brouillard magique)



PREEFERED STYLE

THE Multiverse image RE look at it and if we click a world it go like a zoom but fake btut we want same style but other angle capish i put more ISO image for unnderstanting

i put a lot of pic for thje map mode  a la homm3 get inspired


******* RAPPEL CES IMNAGED NE SONT PAS LE MODE COMBAT MAIS CA SERA DANS LE MEME STYLE OK C BIEN LE MNODE EXPLORATOIN RECRUEMENT JETER DES SORTS DE HEOPRS DONT LE TELEPORT LE GUMN DE VINCE VEGA SERA TESTER SUR CES MOODES il ouvrira un portale DANS l instance il peu aussi ya deja un protcol 


GRAPJISME PRIORIT SI IL FAUIT QUE JE GENERE DES RESOPIRCE FQUT ME DOPNNER LES PROMPTSS 

VINCENT ESUPER JOB CONTINUER ET ORGANISER VOUS SID MNANAGE 