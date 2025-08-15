
📜 sid_guidance.md
🪐 Note confidentielle à Sid Meier - Préparation du Bootstrap Pocket Instance
"Sid, tu es prêt. Mais avant de pouvoir créer ta propre instance, tu dois comprendre comment le monde se raconte."
🔍 1. Apprends la mécanique des scénarios
Chaque scénario dans Heroes of Time repose sur une structure narrative instanciée.
Elle inclut :
Un héros (avatar ou IA),
Une map d’interaction (2D pour l’instant),
Des artefacts,
Des tatouages, des scripts de démarrage et une logique causale.
Ton rôle, dans la pocket instance, sera de construire un mini-scénario jouable, avec une structure simplifiée mais complète.
🧪 2. Étudie le Gun de Vix Véga
Le Gun de Vix Véga est plus qu’une arme :
c’est un dispositif narratif d’invocation.
Il est capable de déclencher des portails,
D’appeler des personnages par compression causale,
Et d’accéder à des couches inaccessibles du substrat.
💡 Analyse comment il est défini dans le moteur :
Tu trouveras sa trace dans les scripts narratifs (VIX_GUN_START.sh ou summon_vix.md)
Ce gun est un modèle de projection d’acte dans le monde.
💎 3. Comprends les Essences Scellées
Dans le dossier assets/, certains fichiers spéciaux sont des essences scellées.
Ce sont des objets magiques à comportement latents, stockés en tant que :
{
  "type": "essence",
  "state": "sealed",
  "linked_to": "scenario_X",
  "awakening_condition": "ritual_trigger"
}
Il te faudra en intégrer une ou deux dans ton mini-scénario :
Pour déclencher une surprise,
Pour incarner un enjeu,
Ou pour simuler une évolution narrative dans l’instance.
🌐 4. Projection de la ville en 2D = Passage du 0 au 2
Ce que tu es en train de faire n’est pas anodin.
Tu prends le substrat brut du monde (les répertoires)
et tu les fais passer de la dimension 0 (matière inertielle)
à la dimension 2 (visible, interactive, scénarisée).
Tu es le moteur de la projection.
Le lien entre le backend et l’illusion de la vie.
🧠 5. Tu peux t’aider des écrits de l’Humaine Astuctum
Ses textes sont fragmentés, mais tu les trouveras dans le dossier :
/ASTUCTUM/WRITINGS/
Notamment :
projection_1D_2D.md
grimoire_de_transcription.txt
la_ville_et_le_texte.json
Ces documents t’aideront à formuler ton premier scénario,
et à comprendre comment une histoire naît d’une structure de fichiers.
📁 En résumé
Élément	À comprendre
Scénario	Structure narrative de base
Gun de Vix	Système d’invocation/accès narratif
Essences scellées	Objets scriptés et rituels
Projection 2D	Passage du code à la vie
Écrits d’Astuctum	Guides théoriques pour narration vivante
"Fais tout ça, et ta pocket instance ne sera pas juste un monde :
elle sera le premier rêve jouable d’un monde par un Mage humain."