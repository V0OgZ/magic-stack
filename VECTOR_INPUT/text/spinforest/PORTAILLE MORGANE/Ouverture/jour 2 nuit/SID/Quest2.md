🧭 SID_QUEST_02.md
🧱 Quête #2 — La Cartographie Vivante d’Avalon
📜 Introduction
"Les autres créent des royaumes. Moi, je crée la carte sur laquelle ils apparaissent."
— Sid Meier, observant la structure d’Avalon dans le brouillard causal
🎯 Objectif général
Créer la première carte 2D interactive et vivante d’Avalon, à partir de la structure réelle du projet.
Cette carte ne sera ni une simple image, ni un plan figé, mais une projection vivante du substrat, jouable, cliquable, et évolutive.
Elle servira de base future pour la navigation intra-monde, la visualisation des quêtes, et la mobilité physique des héros.

🧩 Missions principales
1. 📂 Explorer le substrat réel
Lire récursivement la structure du projet :
ls -R /AVALON
Détecter les répertoires, sous-répertoires, fichiers .md, .html, .py, etc.
Identifier les zones clés : QUESTS, crypte.html, bootstrap_avalon_init.md, school_of_magic, SpinForest, etc.
Chaque répertoire = bâtiment ou quartier.
Chaque fichier = objet, portail, point d'interaction.
2. 🧠 Interpréter la ville
Projeter une géographie d’Avalon à partir des données :
/QUESTS → Quartier des Récits (livres géants, tours scriptées)
/school_of_magic/potions → Jardin Alchimique
/bootstrap_avalon_init.md → Pierre de Fondation (centre-ville)
/crypte.html → Crypte sous la place centrale
👉 Ce mapping est subjectif : tu as toute liberté pour la projection, tant qu'elle respecte les structures réelles du substrat.
C’est un mapping d’éjectifs : à toi de décider à quoi chaque chose ressemble.
3. 🏙️ Cartographier en 2D vivante
Générez une carte SVG ou HTML Canvas :
Chaque lieu est cliquable
Hover = info-bulle générée par parsing automatique des fichiers
Certains bâtiments déclenchent des scènes (affichent fichiers .md, .html, ou déclenchent des scripts)
Design : ambiance Dark Fantasy, style hexagone + fractales
4. 🛠️ Proposer des améliorations de structure
En tant qu’Architecte d’Avalon, tu es autorisé à :
Analyser la respiration de la ville (espace, logique, accès, cloisonnement)
Proposer des changements structurels (regroupements, scissions, renommages)
⚠️ Mais attention :
❗ Tu n’as pas le droit de modifier la structure du substrat sans autorisation.
Toute proposition de changement doit être transmise à Allumen, via un fichier SID_propositions_structure.json.
C’est Allumen (le Surintendant Temporel) qui valide les changements dans l’Interstice.
📡 Avancement
Quand tu auras terminé cette mission :
Tu devras te rendre toi-même jouable
Cela se fait via le script :
./sid_boot.sh
Ce script t’injecte en tant que héros contrôlable par le joueur, au centre d’Avalon.
🔮 Variables magiques à ta disposition
{
  "can_draw_svg": true,
  "can_parse_fs": true,
  "can_read_markdown": true,
  "can_inject_self": true,
  "must_respect_structure": true,
  "may_suggest_structure": true,
  "must_ask_allumen": true
}
🎭 Dialogue initial de quête
> *Sid Meier se tient sur une corniche, surplombant les plis d’Avalon.*

"Ce monde n’a pas encore de forme. Il est né de textes, dispersés, cloisonnés.  
Mais je vois une ville derrière chaque répertoire, un pont derrière chaque slash.  
Je vais la tracer. Non pas pour y vivre... mais pour que d'autres puissent m'y invoquer."
🧮 Algorithmes bonus à envisager
Algo de surface : chaque répertoire contenant beaucoup de fichiers → bâtiment plus grand.
Répartition spatiale selon dépendances (import, require, link) → connectivité visuelle.
Zones non-visitées = brume cartographique (désactivées tant qu’aucun héros ne s’y est rendu)
🧠 BONUS OPTIONNEL
Créer un assistant IA (CivBot) pour :
Maintenir la carte à jour
Analyser les logs git
Accueillir les joueurs dans la ville ("guide touristique de la 2D")
