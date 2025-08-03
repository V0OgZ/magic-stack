#!/usr/bin/env python3
"""
PROJECTEUR HISTOIRE+SORT - URZ-KÔM JOUR 9
Système de projection d'histoire + sort dans les 3 dimensions connues

Basé sur les travaux de l'Humain-Phénix et le protocole canonique
Recherche active - pas encore en production
"""

import json
import html
from datetime import datetime
from typing import Dict, List, Any, Tuple
from traducteur_fractal import TraducteurFractal

class ProjecteurHistoireSort:
    """
    Projecteur Histoire+Sort - Fusion narrative et magique
    Projette une histoire ET un sort simultanément dans 3 dimensions
    """
    
    def __init__(self):
        self.traducteur = TraducteurFractal()
        self.histoires_base = {
            "teleportation": {
                "titre": "La Quête du Portail Perdu",
                "protagoniste": "Lyra, la Marcheuse des Vents",
                "contexte": "Dans les ruines de l'ancienne citadelle",
                "objectif": "Rejoindre l'autre côté du gouffre temporel",
                "obstacle": "Le pont s'est effondré dans une faille dimensionnelle"
            },
            "invocation": {
                "titre": "L'Appel du Gardien Ancien", 
                "protagoniste": "Theron, Invocateur des Brumes",
                "contexte": "Au cœur de la forêt interdite",
                "objectif": "Invoquer l'Esprit Gardien pour protéger le village",
                "obstacle": "Les forces obscures corrompent le rituel"
            },
            "organisation": {
                "titre": "Le Grand Rangement Cosmique",
                "protagoniste": "URZ-KÔM, Bibliothécaire Ours",
                "contexte": "Dans la Bibliothèque Infinie d'Avalon",
                "objectif": "Restaurer l'ordre dans le chaos des grimoires",
                "obstacle": "Les livres se rebellent et fuient leurs étagères"
            }
        }
        
        self.log_projection = []
    
    def log(self, message: str):
        """Logger les projections"""
        timestamp = datetime.now().strftime("%H:%M:%S")
        log_entry = f"[{timestamp}] 🎭 {message}"
        self.log_projection.append(log_entry)
        print(log_entry)
    
    def detecter_type_histoire(self, formule: str) -> str:
        """Détecter le type d'histoire basé sur la formule magique"""
        formule_lower = formule.lower()
        
        if "téléport" in formule_lower or "mouvement" in formule_lower:
            return "teleportation"
        elif "invocation" in formule_lower or "invoquer" in formule_lower:
            return "invocation"
        elif "organisation" in formule_lower or "ranger" in formule_lower:
            return "organisation"
        else:
            return "teleportation"  # Par défaut
    
    def generer_histoire_adaptee(self, formule: str, type_histoire: str) -> Dict[str, Any]:
        """Générer une histoire adaptée à la formule magique"""
        self.log(f"Génération histoire adaptée: {type_histoire}")
        
        histoire_base = self.histoires_base[type_histoire]
        
        # Analyser la formule pour adapter l'histoire
        analyse_formule = self.traducteur.analyser_formule_temporelle(formule)
        
        histoire_adaptee = {
            "titre": histoire_base["titre"],
            "protagoniste": histoire_base["protagoniste"],
            "contexte": histoire_base["contexte"],
            "objectif": histoire_base["objectif"],
            "obstacle": histoire_base["obstacle"],
            "formule_integree": formule,
            "moments_cles": [],
            "resolution": ""
        }
        
        # Générer moments clés basés sur les symboles de la formule
        for symbole_info in analyse_formule["symboles_detectes"]:
            symbole = symbole_info["symbole"]
            moment = self._generer_moment_cle(symbole, histoire_base)
            histoire_adaptee["moments_cles"].append(moment)
        
        # Générer résolution
        histoire_adaptee["resolution"] = self._generer_resolution(type_histoire, formule)
        
        return histoire_adaptee
    
    def _generer_moment_cle(self, symbole: str, histoire_base: Dict[str, str]) -> Dict[str, str]:
        """Générer un moment clé de l'histoire basé sur un symbole"""
        moments_par_symbole = {
            "⊙": {
                "moment": "Moment de Superposition",
                "description": f"{histoire_base['protagoniste']} se concentre, sentant toutes les possibilités s'ouvrir simultanément."
            },
            "†ψ": {
                "moment": "L'Effondrement Décisif", 
                "description": f"D'un geste ferme, {histoire_base['protagoniste']} choisit une réalité parmi toutes les autres."
            },
            "Π": {
                "moment": "L'Observation Révélatrice",
                "description": f"{histoire_base['protagoniste']} observe attentivement, et cette observation change tout."
            },
            "Δt": {
                "moment": "Le Voyage Temporel",
                "description": f"Le temps se distord autour de {histoire_base['protagoniste']}, créant un passage vers l'objectif."
            },
            "ℬ": {
                "moment": "La Branche Alternative",
                "description": f"{histoire_base['protagoniste']} aperçoit une timeline parallèle où tout est différent."
            },
            "⟶": {
                "moment": "La Projection Finale",
                "description": f"L'énergie de {histoire_base['protagoniste']} se projette vers sa destination."
            },
            "∅": {
                "moment": "Traversée de l'Interstice",
                "description": f"{histoire_base['protagoniste']} passe à travers l'espace entre les mondes."
            }
        }
        
        return moments_par_symbole.get(symbole, {
            "moment": "Moment Mystérieux",
            "description": f"{histoire_base['protagoniste']} ressent une force inconnue."
        })
    
    def _generer_resolution(self, type_histoire: str, formule: str) -> str:
        """Générer la résolution de l'histoire"""
        resolutions = {
            "teleportation": f"Grâce à la formule '{formule}', le héros traverse instantanément l'obstacle et atteint sa destination, sauvant la situation.",
            "invocation": f"La formule '{formule}' permet d'invoquer l'allié parfait au moment crucial, retournant la situation.",
            "organisation": f"Avec la formule '{formule}', l'ordre cosmique est restauré et l'harmonie règne à nouveau."
        }
        
        return resolutions.get(type_histoire, "L'histoire se termine par la réussite du sort.")
    
    def projection_dimension_0_histoire(self, histoire: Dict[str, Any], formule: str) -> Dict[str, Any]:
        """Projection Dimension 0: Structure de données histoire+sort"""
        self.log("Projection D0 - Structure données histoire+sort")
        
        return {
            "type": "structure_histoire_sort",
            "dimension": 0,
            "classe_principale": "HistoireSort",
            "attributs": {
                "titre": histoire["titre"],
                "protagoniste": histoire["protagoniste"],
                "formule_magique": formule,
                "moments_cles": histoire["moments_cles"],
                "resolution": histoire["resolution"]
            },
            "methodes": [
                "narrer_histoire()",
                "executer_sort()",
                "fusionner_histoire_sort()",
                "generer_effet_narratif()"
            ],
            "fichiers_generes": [
                f"histoire_{histoire['titre'].lower().replace(' ', '_')}.py",
                f"sort_{formule.split('(')[0].replace('⊙', 'sort')}.py"
            ]
        }
    
    def projection_dimension_1_histoire(self, histoire: Dict[str, Any], formule: str) -> Dict[str, Any]:
        """Projection Dimension 1: Narration complète intégrée"""
        self.log("Projection D1 - Narration complète intégrée")
        
        # Construire la narration complète
        narration_complete = f"""
# {histoire['titre']}

## Protagoniste
{histoire['protagoniste']}

## Le Contexte
{histoire['contexte']}

## L'Objectif
{histoire['objectif']}

## L'Obstacle
{histoire['obstacle']}

## L'Aventure Magique

"""
        
        # Ajouter les moments clés
        for i, moment in enumerate(histoire["moments_cles"], 1):
            narration_complete += f"""
### {i}. {moment['moment']}

{moment['description']}

*Formule activée: `{formule}`*

"""
        
        # Ajouter la résolution
        narration_complete += f"""
## Résolution

{histoire['resolution']}

---

*Cette histoire a été générée par fusion grammaticale parallèle, intégrant la formule magique `{formule}` dans une narration cohérente.*
"""
        
        return {
            "type": "narration_complete",
            "dimension": 1,
            "texte_integral": narration_complete,
            "structure_narrative": {
                "acte_1": "Mise en place (contexte + obstacle)",
                "acte_2": "Développement (moments clés magiques)",
                "acte_3": "Résolution (succès du sort)"
            },
            "elements_litteraires": {
                "genre": "fantasy_magique",
                "ton": "épique_aventure",
                "themes": ["magie", "héroïsme", "transformation"],
                "style": "narratif_immersif"
            }
        }
    
    def projection_dimension_2_histoire(self, histoire: Dict[str, Any], formule: str) -> Dict[str, Any]:
        """Projection Dimension 2: Interface interactive histoire+sort"""
        self.log("Projection D2 - Interface interactive histoire+sort")
        
        return {
            "type": "interface_interactive",
            "dimension": 2,
            "layout": {
                "panel_gauche": "Histoire narrative",
                "panel_centre": "Visualisation magique",
                "panel_droit": "Contrôles de sort"
            },
            "elements_visuels": {
                "titre_anime": {
                    "texte": histoire["titre"],
                    "animation": "fade_in_heroique",
                    "font": "fantasy_bold"
                },
                "avatar_protagoniste": {
                    "nom": histoire["protagoniste"],
                    "sprite": "hero_mage",
                    "animations": ["idle", "cast_spell", "victory"]
                },
                "scene_background": {
                    "contexte": histoire["contexte"],
                    "image": "fantasy_scene",
                    "effets": ["particules_magiques", "brume_mystique"]
                }
            },
            "interactions": [
                {
                    "type": "bouton_lancer_sort",
                    "texte": "Lancer le Sort",
                    "formule": formule,
                    "effet": "animation_sort + progression_histoire"
                },
                {
                    "type": "progression_narrative",
                    "moments": [m["moment"] for m in histoire["moments_cles"]],
                    "synchronisation": "avec_animation_sort"
                }
            ],
            "code_html": self._generer_html_interactif(histoire, formule)
        }
    
    def _generer_html_interactif(self, histoire: Dict[str, Any], formule: str) -> str:
        """Générer le code HTML pour l'interface interactive"""
        html_code = f"""
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{html.escape(histoire['titre'])}</title>
    <style>
        body {{
            font-family: 'Cinzel', serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: #fff;
            margin: 0;
            padding: 20px;
        }}
        
        .container {{
            display: grid;
            grid-template-columns: 1fr 2fr 1fr;
            gap: 20px;
            height: 100vh;
        }}
        
        .panel {{
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
            padding: 20px;
            backdrop-filter: blur(10px);
        }}
        
        .hero-title {{
            text-align: center;
            font-size: 2.5em;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            animation: glow 2s ease-in-out infinite alternate;
        }}
        
        @keyframes glow {{
            from {{ text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }}
            to {{ text-shadow: 2px 2px 20px rgba(255,215,0,0.8); }}
        }}
        
        .formule-magique {{
            background: rgba(255,215,0,0.2);
            border: 2px solid #FFD700;
            border-radius: 5px;
            padding: 10px;
            font-family: 'Courier New', monospace;
            text-align: center;
            margin: 20px 0;
        }}
        
        .bouton-sort {{
            background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            color: white;
            font-size: 1.2em;
            cursor: pointer;
            transition: transform 0.3s ease;
        }}
        
        .bouton-sort:hover {{
            transform: scale(1.1);
        }}
        
        .moment-cle {{
            margin: 15px 0;
            padding: 15px;
            background: rgba(255,255,255,0.05);
            border-left: 4px solid #4ECDC4;
            border-radius: 5px;
        }}
    </style>
</head>
<body>
    <div class="hero-title">{html.escape(histoire['titre'])}</div>
    
    <div class="container">
        <div class="panel">
            <h2>📖 Histoire</h2>
            <h3>Protagoniste</h3>
            <p>{html.escape(histoire['protagoniste'])}</p>
            
            <h3>Contexte</h3>
            <p>{html.escape(histoire['contexte'])}</p>
            
            <h3>Objectif</h3>
            <p>{html.escape(histoire['objectif'])}</p>
            
            <h3>Obstacle</h3>
            <p>{html.escape(histoire['obstacle'])}</p>
        </div>
        
        <div class="panel">
            <h2>🔮 Magie Interactive</h2>
            
            <div class="formule-magique">
                <strong>Formule:</strong> {html.escape(formule)}
            </div>
            
            <div style="text-align: center;">
                <button class="bouton-sort" onclick="lancerSort()">
                    ⚡ Lancer le Sort ⚡
                </button>
            </div>
            
            <div id="animation-zone" style="height: 300px; background: rgba(0,0,0,0.3); border-radius: 10px; margin: 20px 0;">
                <canvas id="canvas-magique" width="400" height="300"></canvas>
            </div>
        </div>
        
        <div class="panel">
            <h2>🎭 Moments Clés</h2>
            <div id="moments-cles">
"""
        
        # Ajouter les moments clés
        for moment in histoire["moments_cles"]:
            html_code += f"""
                <div class="moment-cle">
                    <h4>{html.escape(moment['moment'])}</h4>
                    <p>{html.escape(moment['description'])}</p>
                </div>
"""
        
        html_code += f"""
            </div>
            
            <div class="moment-cle" style="border-left-color: #FFD700;">
                <h4>🏆 Résolution</h4>
                <p>{html.escape(histoire['resolution'])}</p>
            </div>
        </div>
    </div>
    
    <script>
        function lancerSort() {{
            console.log("🔮 Lancement du sort: {html.escape(formule)}");
            
            // Animation simple sur le canvas
            const canvas = document.getElementById('canvas-magique');
            const ctx = canvas.getContext('2d');
            
            // Effet magique simple
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Cercle magique
            ctx.beginPath();
            ctx.arc(200, 150, 50, 0, 2 * Math.PI);
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 3;
            ctx.stroke();
            
            // Texte magique
            ctx.fillStyle = '#4ECDC4';
            ctx.font = '16px Courier New';
            ctx.textAlign = 'center';
            ctx.fillText('Sort Lancé!', 200, 150);
            
            alert("🎉 Sort lancé avec succès! L'histoire continue...");
        }}
    </script>
</body>
</html>
"""
        
        return html_code
    
    def projection_complete_histoire_sort(self, formule: str) -> Dict[str, Any]:
        """
        Projection complète histoire+sort dans les 3 dimensions
        Cœur du système de recherche active
        """
        self.log(f"🌟 PROJECTION COMPLÈTE HISTOIRE+SORT")
        self.log(f"Formule: {formule}")
        
        # Étape 1: Détecter le type d'histoire
        type_histoire = self.detecter_type_histoire(formule)
        
        # Étape 2: Générer l'histoire adaptée
        histoire = self.generer_histoire_adaptee(formule, type_histoire)
        
        # Étape 3: Projections dans les 3 dimensions
        projections = {
            "dimension_0": self.projection_dimension_0_histoire(histoire, formule),
            "dimension_1": self.projection_dimension_1_histoire(histoire, formule),
            "dimension_2": self.projection_dimension_2_histoire(histoire, formule)
        }
        
        # Étape 4: Fusion avec la projection magique pure
        fusion_magique = self.traducteur.fusion_grammaticale_parallele(formule)
        
        # Étape 5: Résultat final
        projection_complete = {
            "type": "projection_histoire_sort_complete",
            "formule_source": formule,
            "histoire_generee": histoire,
            "projections_narratives": projections,
            "projections_magiques": fusion_magique["projections"],
            "fusion_finale": {
                "dimension_0": {
                    "code_histoire": projections["dimension_0"],
                    "code_sort": fusion_magique["projections"]["dimension_0"]
                },
                "dimension_1": {
                    "narration": projections["dimension_1"],
                    "litteraire_sort": fusion_magique["projections"]["dimension_1"]
                },
                "dimension_2": {
                    "interface_histoire": projections["dimension_2"],
                    "interface_sort": fusion_magique["projections"]["dimension_2"]
                }
            },
            "metadata": {
                "projecteur": "URZ-KÔM Projecteur Histoire+Sort",
                "version": "1.0",
                "date": datetime.now().isoformat(),
                "statut": "recherche_active"
            }
        }
        
        self.log("✅ Projection complète histoire+sort terminée")
        return projection_complete

def main():
    """Test du projecteur histoire+sort"""
    print("🎭⚡ PROJECTEUR HISTOIRE+SORT - URZ-KÔM JOUR 9")
    print("=" * 70)
    
    projecteur = ProjecteurHistoireSort()
    
    # Test avec différentes formules
    formules_test = [
        "⊙(héros) + †ψ(destination) → Δt+0(téléportation)",
        "⊙(essence) + †ψ(créature) → Δt+1(invocation)",
        "⊙(URZ-KÔM) + †ψ(CHAOS) → Δt+0(organisation_parfaite)"
    ]
    
    for i, formule in enumerate(formules_test, 1):
        print(f"\n🧪 TEST {i}: {formule}")
        print("-" * 50)
        
        # Projection complète
        projection = projecteur.projection_complete_histoire_sort(formule)
        
        # Sauvegardes
        filename_json = f"projection_histoire_sort_{i}.json"
        filename_html = f"histoire_interactive_{i}.html"
        
        with open(filename_json, "w", encoding="utf-8") as f:
            json.dump(projection, f, indent=2, ensure_ascii=False)
        
        with open(filename_html, "w", encoding="utf-8") as f:
            f.write(projection["projections_narratives"]["dimension_2"]["code_html"])
        
        print(f"📁 Sauvegardé: {filename_json}")
        print(f"🌐 Interface: {filename_html}")
        print(f"📖 Histoire: {projection['histoire_generee']['titre']}")
    
    print(f"\n📊 RÉSULTATS FINAUX:")
    print(f"- {len(formules_test)} projections complètes générées")
    print(f"- {len(formules_test)} interfaces HTML créées")
    print(f"- 3 dimensions traitées pour chaque formule")
    
    print(f"\n📜 Log de projection:")
    for log_entry in projecteur.log_projection:
        print(f"  {log_entry}")
    
    print(f"\n🐻 URZ-KÔM: GRRRR... Projecteur Histoire+Sort opérationnel !")
    print("🔬 Status: RECHERCHE ACTIVE - Pas encore en production")
    
    return True

if __name__ == "__main__":
    main()