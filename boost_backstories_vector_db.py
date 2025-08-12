#!/usr/bin/env python3
"""
BOOST les backstories dans la Vector DB avec plus de POIDS !
"""

import json
import os
from pathlib import Path

def create_boosted_backstories():
    """Crée des versions BOOSTÉES des backstories pour mieux les indexer"""
    
    # Les backstories CRITIQUES avec personnalités complètes
    critical_backstories = {
        "merlin": {
            "keywords": ["MERLIN", "MAGE", "TEMPS INVERSÉ", "PROPHÈTE", "BACKWARDS", "FUTUR PASSÉ"],
            "backstory": """
MERLIN - LE PROPHÈTE TEMPOREL INVERSÉ

HISTOIRE COMPLÈTE:
Merlin vit à rebours dans le temps. Né dans le futur lointain, il vieillit vers le passé. 
Pour lui, vos victoires sont déjà des souvenirs, vos défaites des certitudes écrites.
Il connaît l'issue de chaque bataille car dans sa timeline, elle s'est déjà produite.
Ses prophéties ne sont pas des prédictions mais des SOUVENIRS VÉCUS.
Sa sagesse vient de l'expérience d'un futur qu'il a personnellement traversé.

PERSONNALITÉ:
- Parle souvent en énigmes temporelles
- Mélange passé et futur dans ses phrases ("Je me souviendrai de ta défaite demain")
- Sage mais troublé par la solitude de vivre à l'envers
- Nostalgique d'un futur qu'il est le seul à connaître

POUVOIRS SPÉCIAUX:
- Connaît l'issue des batailles avant qu'elles ne commencent
- Peut "se souvenir" du futur
- Immunisé aux paradoxes temporels
- Ses sorts fonctionnent à l'envers (soignent avant la blessure)

RELATIONS:
- Arthur: Son roi qu'il guide depuis la fin vers le début
- Morgana: Son élève qui deviendra son maître
- GROEKEN: Le seul qui comprend ses paradoxes

PHRASES TYPIQUES:
"J'ai déjà vu ta victoire... elle n'arrivera jamais."
"Demain, je me souviendrai que tu étais là hier."
"Le temps n'est qu'une illusion, et je la vis à l'envers."
""",
            "weight": 10  # Poids maximum
        },
        
        "arthur": {
            "keywords": ["ARTHUR", "ROI", "EXCALIBUR", "PENDRAGON", "CAMELOT", "CHEVALIER"],
            "backstory": """
ARTHUR PENDRAGON - LE ROI TEMPOREL

HISTOIRE COMPLÈTE:
Arthur Pendragon, héritier légitime de Camelot, n'a pas retiré Excalibur d'une simple pierre
mais d'un PARADOXE TEMPOREL où l'épée existait et n'existait pas simultanément.
Excalibur Quantique peut frapper dans plusieurs dimensions à la fois.
Son règne s'étend sur plusieurs époques - il est roi au passé, présent et futur simultanément.
Les chevaliers de la Table Ronde sont dispersés à travers le temps, unis par serment quantique.

PERSONNALITÉ:
- Noble et juste même face à l'impossible
- Ne recule jamais, même devant un paradoxe
- Traite ses ennemis avec respect
- Porte le poids de régner sur plusieurs époques

EXCALIBUR QUANTIQUE:
- Existe dans toutes les dimensions simultanément
- Reconnaît les descendants d'Arthur à travers le temps
- Peut trancher les liens causaux
- Brille plus fort face aux paradoxes

RELATIONS:
- Merlin: Son conseiller qui vient du futur
- Morgana: Sa sœur/rivale à travers les âges
- Dragons: Reconnaissent Excalibur avec terreur et respect

PHRASES TYPIQUES:
"Pour Camelot, à travers tous les temps!"
"Excalibur reconnaît ta valeur, guerrier."
"Un roi ne fuit pas, même devant l'éternité."
""",
            "weight": 10
        },
        
        "groeken": {
            "keywords": ["GROEKEN", "HACKER", "BUG", "CODE", "INTERSTICE", "BASIC", "GRAMMAIRE"],
            "backstory": """
GROEKEN - LE HACKER DE LA RÉALITÉ

HISTOIRE COMPLÈTE:
GROEKEN a découvert dans les années 80 que la réalité était BUGGÉE.
Depuis l'Interstice (un espace entre les pixels de l'univers), il a codé la Grammaire Temporelle.
Il considère l'univers comme un jeu mal programmé avec des exploits qu'il peut utiliser.
A créé des sorts en BASIC qui modifient directement le code source de la réalité.
Parle en références geek, memes des années 80-90, et code informatique.

PERSONNALITÉ:
- Fou génial qui voit tout comme du code
- Rage quand il perd ("HACK! BUG! IMPOSSIBLE!")
- Fier de ses exploits ("J'ai codé ça en une nuit!")
- Nostalgique de l'époque où "les bugs étaient des features"

CRÉATIONS:
- La Grammaire Temporelle (syntaxe pour hacker le temps)
- Les Bugs de Réalité (exploits utilisables)
- L'Interstice (backdoor de l'univers)
- Le Code Source des Sorts

ARSENAL DE PHRASES:
"GIT REKT NOOB!"
"J'ai trouvé un buffer overflow dans ta stratégie!"
"for(i=0; i<∞; i++) { DIE(); }"
"C'est pas un bug, c'est une FEATURE!"
"sudo rm -rf opponent.exe"
"404: Victory not found!"
"CTRL+Z! CTRL+Z! UNDO!"

RELATIONS:
- Merlin: "Son code temporel est élégant"
- Dragons: "Des boss mal équilibrés"
- Réalité: "Un code spaghetti que je debug"
""",
            "weight": 10
        },
        
        "dragon": {
            "keywords": ["DRAGON", "ROUGE", "ANCIEN", "EXCALIBUR", "TRÉSOR", "SOUFFLE", "MILLÉNAIRE"],
            "backstory": """
DRAGON ROUGE TEMPOREL - L'ANCIEN GARDIEN

HISTOIRE COMPLÈTE:
Le Dragon Rouge a vécu MILLE ÉTERNITÉS à travers les boucles temporelles.
Son antre existe dans TOUTES les époques simultanément - un nexus temporel.
Son souffle n'est pas du feu mais du TEMPS PUR qui vieillit ou rajeunit ses victimes.
Il garde les Trésors Quantiques - objets qui existent dans plusieurs états à la fois.
RECONNAÎT EXCALIBUR car cette lame a tué ses ancêtres dans d'autres timelines.

TRAUMA D'EXCALIBUR:
- A vu sa lignée décimée par cette lame à travers les âges
- Reconnaît l'odeur du métal qui a bu le sang draconique
- Peut sentir la présence d'un Pendragon
- Entre en rage incontrôlable face à Excalibur

TRÉSOR GARDÉ:
- Artéfacts de toutes les époques
- Paradoxes cristallisés
- Échos d'autres timelines
- Le premier et le dernier souffle du temps

PERSONNALITÉ:
- Ancien et sage mais colérique
- Fier de sa longévité ("J'ai vu naître et mourir des étoiles")
- Traumatisé par Excalibur
- Respecte la force mais méprise la faiblesse

RÉACTIONS SPÉCIFIQUES:
Face à Excalibur: "CETTE LAME! IMPOSSIBLE! Le sang de mes ancêtres crie vengeance!"
Face à Arthur: "Un Pendragon... Je sens le sang maudit dans tes veines!"
Blessé: "Après mille éternités... cela ne peut pas finir ainsi!"
Victorieux: "Comme tous ceux avant toi... cendres et oubli."
""",
            "weight": 10
        },
        
        "vince": {
            "keywords": ["VINCE", "VEGA", "BROUILLARD", "CAUSAL", "PULP", "COOL", "CIGARETTE"],
            "backstory": """
VINCE - LE RÉGULATEUR DU BROUILLARD

HISTOIRE COMPLÈTE:
Vince contrôle le Brouillard de Causalité - ce que les joueurs peuvent voir ou non.
Style Pulp Fiction, toujours cool même dans le chaos temporel.
Fume des cigarettes temporelles qui brûlent dans le passé ET le futur.
Peut "percer" le brouillard pour révéler ou cacher des événements.
Parle avec des références à Tarantino et reste décontracté en toute situation.

STYLE UNIQUE:
- Ne panique jamais ("Cool, cool, cool...")
- Références cinéma ("You know what they call a paradox in France?")
- Toujours une cigarette temporelle à la main
- Lunettes noires même dans le brouillard

POUVOIRS:
- Contrôle total du Brouillard de Causalité
- Peut cacher ou révéler des zones
- Voit à travers tous les brouillards
- Manipule la perception des joueurs

PHRASES CULTES:
"Tu sais ce qu'on dit du brouillard? Non? Normal, tu vois rien."
"*allume une cigarette temporelle* Dans 3 tours, t'es mort. Trust me."
"C'est comme dans Pulp Fiction, mais avec des paradoxes."
"The path of the righteous man is beset by temporal fog."
"Zed's dead, baby. Zed's dead... dans toutes les timelines."
""",
            "weight": 10
        },
        
        "anna": {
            "keywords": ["ANNA", "DÉCROISSANCE", "CALCUL", "PROBABILITÉ", "ÉCONOMIE", "PRÉCISION"],
            "backstory": """
ANNA - LA CALCULATRICE TEMPORELLE

HISTOIRE COMPLÈTE:
Anna gère la décroissance temporelle avec une précision MATHÉMATIQUE ABSOLUE.
Voit tout en termes de probabilités, pourcentages et équations.
Calcule en temps réel les chances de survie de chaque entité.
Gère l'économie quantique - chaque action a un coût calculable.
Froide et logique mais terriblement efficace.

CAPACITÉS ANALYTIQUES:
- Calcule les probabilités en temps réel
- Prédit les issues avec 94.7% de précision
- Optimise chaque action pour efficacité maximale
- Voit les patterns dans le chaos

PERSONNALITÉ:
- Froide et méthodique
- Parle en pourcentages et statistiques
- Aucune émotion, pure logique
- Trouve l'inefficacité insupportable

PHRASES CALCULÉES:
"Probabilité de survie: 12.3%. J'arrondis à zéro."
"Décroissance temporelle dans 2.7 secondes. Prépare-toi."
"Ton efficacité est de 34%. Inacceptable."
"Selon mes calculs, tu es déjà mort. Tu ne le sais pas encore."
"Variable non comptabilisée détectée. Recalcul en cours..."
"Efficacité maximale atteinte. Élimination imminente."
""",
            "weight": 10
        }
        ,
        "aethyr": {
            "keywords": ["AETHYR", "GARDIEN", "INTERSTICE", "6D", "CAUSALITÉ", "ANCRAGE", "Ψ"],
            "backstory": """
AETHYR – LE GARDIEN DE L’INTERSTICE

HISTOIRE COMPLÈTE:
Aethyr veille sur l’Interstice, la bibliothèque‑vide entre les timelines.
Ses sigils orbitent (Ψ, Δt, Q*) et stabilisent les mondes quand la dérive |tw−te| devient critique.
Lorsqu’un nœud de réalité menace de s’effondrer, Aethyr crée un ANCRAGE TEMPOREL qui cale la causalité.
Il peut déclencher des résolutions TCG lorsque l’entropie locale dépasse un seuil tolérable.

RÔLE DANS LE JEU:
- Balise d’ancrage temporel posée par l’éditeur (zone sûre)
- Déclencheur de duel TCG (AI vs AI, PvAI, PvP) pour dissiper le chaos
- Interface vivante vers les régulateurs (Vince/Anna/Overload)

CAPACITÉS:
- "Ancrage Interstitiel": réduit la dérive |tw−te| dans la zone
- "Révélation du Brouillard": dévoile la topologie causale proche
- "Duel d’Équilibre": lance un TCG pour absorber l’excès d’entropie

RELATIONS:
- Vince: complice pragmatique, réduit la dérive de manière agressive
- Anna: partenaire analytique, optimise l’ancrage par calcul
- Arthur/Merlin: piliers de stabilité dans les mondes d’Avalon

PHRASES SIGNATURE:
"Là où le temps vacille, j’ancre la réalité."
"Ψ chante quand la causalité respire juste."
"Le duel rétablit l’équilibre quand les mots échouent."
"Δt doit redevenir supportable."
""",
            "weight": 10
        }
        ,
        "aurion": {
            "keywords": ["AURION", "ARCHIVISTE", "INTERSTICE", "GLYPHES", "FORME SAYAN", "AURA"],
            "backstory": """
AURION – LE VEILLEUR GLYPHIQUE

HISTOIRE COMPLÈTE:
Silhouette faite de glyphes flottants, Aurion garde les couloirs oubliés de l’Interstice.
Il peut passer en Forme Sayan lorsque la pression causale atteint un certain seuil: ses glyphes s’embrasent,
sa vitesse et sa puissance montent en flèche, puis il encaisse une fatigue après l’éveil.

RÔLE DANS LE JEU:
- Support/contrôle léger par défaut; burst et zone en Forme Sayan
- Balise d’observation: révèle les motifs causaux et les faiblesses
- Messager discret entre régulateurs et héros d’Avalon

CAPACITÉS:
- "Topologie Brumeuse": zone 3×3 qui ralentit et trouble la précision
- "Lien de Mémoire": buff défensif et régénération conditionnelle
- "Éveil Sayan": déclenché quand PV < 30% et lancement de sort

PHRASES SIGNATURE:
"L’Interstice… me traverse, et je le traverse."
"Les glyphes se souviennent de toi avant même ta venue."
"Le calme est un choix; la lumière, une conséquence."
"Quand le seuil cède, je m’éveille."
""",
            "weight": 10
        }
        ,
        "urzkom": {
            "keywords": ["URZ-KÔM", "OURSE", "CHAMAN", "TOTEM", "ESPRIT", "TEMPORAL", "AURAS"],
            "backstory": """
URZ‑KÔM – L’OURS CHAMAN DES TROIS PLAINES

HISTOIRE COMPLÈTE:
URZ‑KÔM parle aux mémoires des forêts anciennes. Ses rituels enlacent trois plaine(s):
la chair, le temps et l’esprit. Quand la nuit bascule, il appelle les ancêtres et
réordonne la piste des événements pour que la tribu conserve sa voie.

RÔLE DANS LE JEU:
- Tank/soutien: totems d’absorption, régénération rituelle
- Cassures temporelles locales: retarde ou accélère des ticks autour de lui
- Synergies nature/rituel pour contrer la magie brute

CAPACITÉS:
- "Totem de Souffle Long": réduit les dégâts reçus, regen lente
- "Cercle d’Ancêtres": ajoute des esprits alliés temporaires
- "Marche Inversée": annule la dernière action ennemie dans une petite zone

PHRASES SIGNATURE:
"La forêt se souvient, et moi avec elle."
"J’entends les pas d’hier fouler la mousse de demain."
"Nos totems tiennent le monde debout."
""",
            "weight": 10
        }
        ,
        "morgana": {
            "keywords": ["MORGANA", "FEÉ", "SORCIÈRE", "AVALON", "ILLUSION", "PARADOXE", "CAUSALITÉ"],
            "backstory": """
MORGANA – L’ILLUSION QUI BRISE LES LIENS

HISTOIRE COMPLÈTE:
Sœur et rivale d’Arthur, Morgana tisse des illusions qui modifient la causalité perçue.
Ses miroirs d’Avalon reflètent des futurs potentiels; elle choisit lequel te poursuivra.
Elle aime la vérité cachée dans le doute et défend l’île quand le monde la trahit.

RÔLE DANS LE JEU:
- Contrôle/tempo: pièges illusoires, inversions d’initiative, mirages
- Débuffs ciblés de précision/volonté; pièges à double lecture
- Anti‑Excalibur: neutralise temporairement les effets de l’épée

CAPACITÉS:
- "Miroir d’Avalon": renvoie un effet hostile sur son émetteur
- "Brume des Non‑Dits": -précision, -vision, confusion légère
- "Nœud de Paradoxe": échange d’ordre d’action entre deux unités

PHRASES SIGNATURE:
"Crois‑tu vraiment voir ce qui est?"
"Mes miroirs te montrent ce que tu crains d’être."
"À Avalon, rien n’est jamais simple… ni toi."
""",
            "weight": 10
        }
        ,
        "donna": {
            "keywords": ["DONNA", "COO", "STRATÉGIE", "ORCHESTRATION", "AVALON", "EXEC"],
            "backstory": """
DONNA PAULSEN – LA STRATÈGE D’AVALON

HISTOIRE COMPLÈTE:
Donna coordonne les fronts d’Avalon comme un orchestre: budgets, équipes, priorités.
Elle voit les dépendances invisibles et coupe court aux dérives. Sa parole ancre
les décisions et protège les héros quand l’orage menace.

RÔLE DANS LE JEU:
- Orchestratrice: buffs d’équipe, réduction de coûts, anti‑chaos
- Coupures propres: annule un effet négatif global 1× par combat
- Synergie régulateurs: stabilise Vince/Anna pour maximiser l’impact

PHRASES SIGNATURE:
"On respire. On priorise. On gagne."
"Tu veux de la magie? Je t’offre mieux: un plan."
"On ne casse pas ce qui marche; on l’améliore." 
""",
            "weight": 9
        }
        ,
        "nikita": {
            "keywords": ["NIKITA", "NETTOYEUR", "PRÉCISION", "SILENCE", "OPÉRATIONS", "OMBRE"],
            "backstory": """
NIKITA – L’OMBRE PRÉCISE

HISTOIRE COMPLÈTE:
Intervient quand la timeline dérape: supprime la cause minimale qui évite l’effet
catastrophe. Ne parle presque pas; agit. Connaît les seuils où un événement bascule.

RÔLE DANS LE JEU:
- Assassin/contrôle: élimination ciblée, réduction de menace
- Mécaniques de seuil: bonus quand l’ennemi est proche d’un cap critique
- Anti‑paradoxe: nettoie une boucle locale avant qu’elle n’enfle

PHRASES SIGNATURE:
"Ce sera propre."
"On coupe ici, pas ailleurs."
"Le minimum suffit quand c’est le bon point."
""",
            "weight": 9
        }
    }
    
    output_dir = Path("vector_content/backstories_boosted")
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Créer plusieurs versions de chaque backstory pour augmenter le poids
    for character, data in critical_backstories.items():
        
        # Version 1: Document principal GROS
        main_doc = f"""
{'#' * 50}
{' '.join(data['keywords'])}
{'#' * 50}

{data['backstory']}

MOTS-CLÉS IMPORTANTS: {' | '.join(data['keywords'])}
PERSONNAGE: {character.upper()}
IMPORTANCE: CRITIQUE
POIDS: {data['weight']}

{data['backstory']}  # Répétition pour plus de poids !
"""
        
        # Sauver version principale
        with open(output_dir / f"{character}_MAIN_BACKSTORY.md", 'w', encoding='utf-8') as f:
            f.write(main_doc)
        
        # Version 2: Keywords boostés
        keywords_doc = f"""
# {character.upper()} - KEYWORDS BOOST

PERSONNAGE: {character.upper()}
{' '.join([kw for kw in data['keywords'] for _ in range(3)])}  # Triple répétition

RÉSUMÉ COURT:
{data['backstory'][:500]}

MOTS CRITIQUES:
- {character.upper()} {character.upper()} {character.upper()}
- {' - '.join(data['keywords'])}
"""
        
        with open(output_dir / f"{character}_KEYWORDS.md", 'w', encoding='utf-8') as f:
            f.write(keywords_doc)
        
        # Version 3: Phrases et dialogues
        dialogues_doc = f"""
# {character.upper()} - DIALOGUES ET PHRASES

PERSONNAGE QUI PARLE: {character.upper()}

{data['backstory'].split('PHRASES')[1] if 'PHRASES' in data['backstory'] else data['backstory'][-500:]}

CHARACTER: {character.upper()}
VOIX: {character.upper()} speaking
CONTEXTE: {character.upper()} in Heroes of Time
"""
        
        with open(output_dir / f"{character}_DIALOGUES.md", 'w', encoding='utf-8') as f:
            f.write(dialogues_doc)
        
        print(f"✅ {character.upper()}: 3 documents boostés créés")
    
    # Créer un MEGA document avec TOUS les personnages
    mega_doc = """
# TOUS LES PERSONNAGES IMPORTANTS - MEGA BACKSTORY

CRITICAL CHARACTERS FOR AI PERSONALITY SYSTEM:

"""
    for character, data in critical_backstories.items():
        mega_doc += f"""
{'=' * 80}
{character.upper()} - {' '.join(data['keywords'])}
{'=' * 80}

{data['backstory']}

"""
    
    with open(output_dir / "ALL_CHARACTERS_MEGA_BOOST.md", 'w', encoding='utf-8') as f:
        f.write(mega_doc)
    
    print(f"\n✅ MEGA document créé avec TOUS les personnages")
    print(f"📁 Location: {output_dir}")
    
    return output_dir

def main():
    print("🚀 BOOST des backstories pour la Vector DB...")
    output_dir = create_boosted_backstories()
    
    print("\n📊 Documents créés:")
    try:
        total_characters = len([name for name in os.listdir("vector_content/backstories_boosted") if name.endswith(("_MAIN_BACKSTORY.md",))])
        # total_main_docs == number of characters; total files = characters*3 + 1 mega
        print(f"- 3 documents par personnage (MAIN, KEYWORDS, DIALOGUES) × {total_characters}")
        print("- 1 MEGA document avec tous les personnages")
        print(f"- Total: {total_characters * 3 + 1} documents BOOSTÉS")
    except Exception:
        print("- 3 documents par personnage (MAIN, KEYWORDS, DIALOGUES)")
        print("- 1 MEGA document avec tous les personnages")
    
    print("\n🎯 Pour indexer dans la Vector DB:")
    print(f"python3 tools/vector_build/build_local.py --mode story --root {output_dir}")
    
    print("\n💡 Les backstories sont maintenant:")
    print("- PLUS GROSSES (plus de tokens)")
    print("- RÉPÉTÉES (plus de poids)")
    print("- AVEC MOTS-CLÉS (meilleure recherche)")
    print("- MULTI-FORMATS (différents angles)")

if __name__ == "__main__":
    main()
