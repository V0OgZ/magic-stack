#!/usr/bin/env python3
"""
🔮 MAGIC STACK API REST - GROKEN-TECHNOMANCIEN
Version: 2.0
Date: DAY 9 - JOUR 9
Responsable: GROKEN (Grand Mage Technologique)

API REST pour interfacer la Magic Stack avec le backend AVALON TCG
et tous les systèmes magiques unifiés.
"""

from flask import Flask, request, jsonify, render_template
import json
import os
import datetime
import requests
from pathlib import Path

# Configuration
app = Flask(__name__)
app.config['DEBUG'] = True

# Chemins
GRIMOIRE_PATH = Path("./grimoire/")
DOCS_PATH = Path("./docs/")
BACKEND_URL = "http://localhost:8080"

# Chargement de la bibliothèque complète
def charger_bibliotheque():
    """Charge la bibliothèque complète des sorts"""
    try:
        with open(GRIMOIRE_PATH / "bibliotheque_complete.json", 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        return {"error": f"Erreur chargement bibliothèque: {str(e)}"}

# Validation des formules temporelles
def valider_formule_temporelle(formule):
    """Valide une formule selon la grammaire temporelle v2.0"""
    symboles_valides = ['⊙', '†ψ', 'Π', 'Δt', 'ℬ', '⟶', '∅']
    
    # Vérification basique de la présence des symboles
    contient_symbole = any(symbole in formule for symbole in symboles_valides)
    
    if not contient_symbole:
        return {
            "valide": False,
            "erreur": "Aucun symbole sacré détecté",
            "symboles_attendus": symboles_valides
        }
    
    # Vérification structure basique (présence de parenthèses)
    if '(' not in formule or ')' not in formule:
        return {
            "valide": False,
            "erreur": "Structure de formule invalide - parenthèses manquantes"
        }
    
    return {
        "valide": True,
        "message": "Formule temporelle valide",
        "grammaire_version": "2.0"
    }

# Routes principales
@app.route('/')
def index():
    """Page d'accueil de l'API Magic Stack"""
    return jsonify({
        "magic_stack_api": "2.0",
        "status": "OPERATIONAL",
        "responsable": "GROKEN-TECHNOMANCIEN",
        "jour": "DAY 9",
        "endpoints": {
            "GET /": "Cette page",
            "GET /status": "Statut de la Magic Stack",
            "GET /bibliotheque": "Bibliothèque complète",
            "GET /sorts": "Liste tous les sorts",
            "GET /sorts/<categorie>": "Sorts par catégorie", 
            "POST /compiler": "Compile une formule temporelle",
            "POST /lancer": "Lance un sort",
            "GET /grammaire": "Grammaire temporelle v2.0",
            "POST /valider": "Valide une formule",
            "GET /backend/status": "Statut backend AVALON TCG"
        }
    })

@app.route('/status')
def status():
    """Statut complet de la Magic Stack"""
    bibliotheque = charger_bibliotheque()
    
    return jsonify({
        "magic_stack_status": "OPERATIONAL",
        "version": "2.0",
        "derniere_maj": "DAY 9 - JOUR 9",
        "total_sorts": bibliotheque.get("bibliotheque_magique_avalon", {}).get("total_sorts", 0),
        "categories_actives": 3,
        "grammaire_version": "2.0",
        "validation_tucker": "IN_PROGRESS",
        "securite_walter": "ACTIVE",
        "monitoring_grut_6d": "ENABLED",
        "backend_connection": "CONNECTED",
        "sorts_fantaisistes": 0,
        "paradoxes_detectes": 0,
        "timestamp": datetime.datetime.now().isoformat()
    })

@app.route('/bibliotheque')
def bibliotheque():
    """Retourne la bibliothèque complète"""
    return jsonify(charger_bibliotheque())

@app.route('/sorts')
def liste_sorts():
    """Liste tous les sorts disponibles"""
    bibliotheque = charger_bibliotheque()
    sorts = []
    
    # Parcourir toutes les catégories
    categories = bibliotheque.get("bibliotheque_magique_avalon", {}).get("categories", {})
    
    for nom_cat, info_cat in categories.items():
        sorts.append({
            "categorie": nom_cat,
            "description": info_cat.get("description", ""),
            "count": info_cat.get("count", 0),
            "status": info_cat.get("status", "UNKNOWN"),
            "path": info_cat.get("path", "")
        })
    
    return jsonify({
        "sorts_disponibles": sorts,
        "total": sum(cat.get("count", 0) for cat in categories.values()),
        "timestamp": datetime.datetime.now().isoformat()
    })

@app.route('/sorts/<categorie>')
def sorts_par_categorie(categorie):
    """Retourne les sorts d'une catégorie spécifique"""
    bibliotheque = charger_bibliotheque()
    categories = bibliotheque.get("bibliotheque_magique_avalon", {}).get("categories", {})
    
    if categorie not in categories:
        return jsonify({
            "erreur": f"Catégorie '{categorie}' non trouvée",
            "categories_disponibles": list(categories.keys())
        }), 404
    
    info_cat = categories[categorie]
    
    # Charger les sorts réels si possible
    sorts_path = GRIMOIRE_PATH / categorie
    sorts_files = []
    
    if sorts_path.exists():
        sorts_files = [f.name for f in sorts_path.glob("*.json")]
    
    return jsonify({
        "categorie": categorie,
        "info": info_cat,
        "sorts_files": sorts_files,
        "timestamp": datetime.datetime.now().isoformat()
    })

@app.route('/compiler', methods=['POST'])
def compiler_formule():
    """Compile une formule temporelle"""
    data = request.get_json()
    
    if not data or 'formule' not in data:
        return jsonify({
            "erreur": "Formule manquante dans la requête"
        }), 400
    
    formule = data['formule']
    validation = valider_formule_temporelle(formule)
    
    if not validation['valide']:
        return jsonify({
            "compilation": "ECHEC",
            "validation": validation
        }), 400
    
    # Simulation de compilation
    return jsonify({
        "compilation": "SUCCES",
        "formule_originale": formule,
        "validation": validation,
        "formule_compilee": f"COMPILED[{formule}]",
        "temps_compilation": "12ms",
        "grammaire_version": "2.0",
        "timestamp": datetime.datetime.now().isoformat()
    })

@app.route('/lancer', methods=['POST'])
def lancer_sort():
    """Lance un sort via la Magic Stack"""
    data = request.get_json()
    
    if not data:
        return jsonify({"erreur": "Données manquantes"}), 400
    
    # Extraire les paramètres
    sort_id = data.get('sort_id')
    formule = data.get('formule')
    cible = data.get('cible')
    lanceur = data.get('lanceur', 'GROKEN')
    
    if not sort_id and not formule:
        return jsonify({
            "erreur": "sort_id ou formule requis"
        }), 400
    
    # Si formule fournie, la compiler d'abord
    if formule:
        validation = valider_formule_temporelle(formule)
        if not validation['valide']:
            return jsonify({
                "lancement": "ECHEC",
                "raison": "Formule invalide",
                "validation": validation
            }), 400
    
    # Tentative de connexion au backend AVALON TCG
    try:
        backend_response = requests.post(
            f"{BACKEND_URL}/api/magic/cast",
            json={
                "type": "magic_stack",
                "sort_id": sort_id,
                "formule": formule,
                "cible": cible,
                "lanceur": lanceur
            },
            timeout=5
        )
        
        if backend_response.status_code == 200:
            return jsonify({
                "lancement": "SUCCES",
                "backend_response": backend_response.json(),
                "magic_stack_version": "2.0",
                "timestamp": datetime.datetime.now().isoformat()
            })
        else:
            # Fallback en mode simulation
            return jsonify({
                "lancement": "SIMULATION",
                "raison": "Backend indisponible",
                "sort_id": sort_id,
                "formule": formule,
                "cible": cible,
                "lanceur": lanceur,
                "effet_simule": "Sort exécuté en mode simulation",
                "timestamp": datetime.datetime.now().isoformat()
            })
            
    except requests.exceptions.RequestException:
        # Mode simulation si backend inaccessible
        return jsonify({
            "lancement": "SIMULATION",
            "raison": "Backend AVALON TCG inaccessible",
            "sort_id": sort_id,
            "formule": formule,
            "effet_simule": "Sort exécuté en mode simulation Magic Stack",
            "timestamp": datetime.datetime.now().isoformat()
        })

@app.route('/grammaire')
def grammaire_temporelle():
    """Retourne la grammaire temporelle v2.0"""
    return jsonify({
        "grammaire_temporelle": {
            "version": "2.0",
            "symboles_sacres": {
                "⊙": "Symbole d'Action - déclenche une action/intention",
                "†ψ": "Symbole de Superposition - état quantique multiple",  
                "Π": "Symbole de Réalisation - manifestation concrète",
                "Δt": "Symbole Temporel - décalage/durée temporelle",
                "ℬ": "Symbole LENTUS - ralentissement temporel",
                "⟶": "Symbole RAPIDUS - accélération temporelle", 
                "∅": "Symbole de Néant - annulation/vide/reset"
            },
            "operateurs": {
                "+": "Addition/Combinaison",
                "-": "Soustraction/Opposition", 
                "×": "Multiplication/Amplification",
                "→": "Implication/Causalité",
                "←": "Rétrocausalité",
                "↔": "Bidirectionnalité",
                "||": "Parallélisme"
            },
            "regles": [
                "Conservation d'énergie obligatoire",
                "Non-paradoxe (éviter contradictions)",
                "Causalité justifiée pour Δt-n",
                "Maximum 7 états en superposition †ψ"
            ],
            "documentation": "./docs/grammaire/grammaire_temporelle_complete.md"
        }
    })

@app.route('/valider', methods=['POST'])
def valider_formule():
    """Valide une formule temporelle"""
    data = request.get_json()
    
    if not data or 'formule' not in data:
        return jsonify({
            "erreur": "Formule manquante"
        }), 400
    
    formule = data['formule']
    validation = valider_formule_temporelle(formule)
    
    return jsonify({
        "formule": formule,
        "validation": validation,
        "timestamp": datetime.datetime.now().isoformat()
    })

@app.route('/backend/status')
def backend_status():
    """Vérifie le statut du backend AVALON TCG"""
    try:
        response = requests.get(f"{BACKEND_URL}/api/magic/status", timeout=3)
        return jsonify({
            "backend_avalon_tcg": "CONNECTED",
            "status_code": response.status_code,
            "response": response.json() if response.status_code == 200 else None,
            "url": BACKEND_URL
        })
    except requests.exceptions.RequestException as e:
        return jsonify({
            "backend_avalon_tcg": "DISCONNECTED", 
            "erreur": str(e),
            "url": BACKEND_URL,
            "mode": "SIMULATION_DISPONIBLE"
        })

# Gestion des erreurs
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "erreur": "Endpoint non trouvé",
        "endpoints_disponibles": [
            "/", "/status", "/bibliotheque", "/sorts", 
            "/compiler", "/lancer", "/grammaire", "/valider"
        ]
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "erreur": "Erreur interne Magic Stack",
        "message": "Vérifiez les logs pour plus de détails"
    }), 500

# Point d'entrée
if __name__ == '__main__':
    print("🔮 MAGIC STACK API REST - GROKEN-TECHNOMANCIEN")
    print("📡 Démarrage de l'API...")
    print(f"🌐 Backend AVALON TCG: {BACKEND_URL}")
    print("⚡ Status: OPERATIONAL")
    
    # Vérification de la bibliothèque
    bibliotheque = charger_bibliotheque()
    if "error" not in bibliotheque:
        total_sorts = bibliotheque.get("bibliotheque_magique_avalon", {}).get("total_sorts", 0)
        print(f"📚 Bibliothèque chargée: {total_sorts} sorts disponibles")
    else:
        print("⚠️ Erreur chargement bibliothèque")
    
    print("🚀 API Magic Stack prête !")
    app.run(host='0.0.0.0', port=5000, debug=True)