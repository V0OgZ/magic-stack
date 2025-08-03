#!/usr/bin/env python3
"""
⚔️ AVALON TCG ENGINE - GROKEN-TECHNOMANCIEN
Version: 2.0
Date: DAY 9 - JOUR 9
Responsable: GROKEN (Grand Mage Technologique)

Moteur d'intégration entre la Magic Stack et le système de combat TCG d'AVALON.
Convertit les sorts en effets de cartes et gère l'exécution via le backend unifié.
"""

import json
import requests
import datetime
from pathlib import Path
from typing import Dict, List, Optional, Any

class AvalonTCGEngine:
    """Moteur principal d'intégration Magic Stack ↔ AVALON TCG"""
    
    def __init__(self, backend_url="http://localhost:8080", magic_stack_path="./"):
        self.backend_url = backend_url
        self.magic_stack_path = Path(magic_stack_path)
        self.grimoire_path = self.magic_stack_path / "grimoire"
        self.bibliotheque = self._charger_bibliotheque()
        
        print("⚔️ AVALON TCG ENGINE initialisé")
        print(f"🔗 Backend: {backend_url}")
        print(f"📚 Magic Stack: {magic_stack_path}")
    
    def _charger_bibliotheque(self) -> Dict:
        """Charge la bibliothèque complète des sorts"""
        try:
            with open(self.grimoire_path / "bibliotheque_complete.json", 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print(f"⚠️ Erreur chargement bibliothèque: {e}")
            return {}
    
    def _charger_sort_json(self, categorie: str, sort_id: str) -> Optional[Dict]:
        """Charge un sort spécifique depuis son fichier JSON"""
        try:
            sort_path = self.grimoire_path / f"sorts_{categorie}" / f"{sort_id}.json"
            if sort_path.exists():
                with open(sort_path, 'r', encoding='utf-8') as f:
                    return json.load(f)
        except Exception as e:
            print(f"⚠️ Erreur chargement sort {sort_id}: {e}")
        return None
    
    def convertir_sort_en_carte(self, sort_data: Dict) -> Dict:
        """Convertit un sort Magic Stack en carte TCG"""
        carte = {
            "id": f"card_{sort_data.get('id', 'unknown')}",
            "nom": sort_data.get("nom", "Sort Inconnu"),
            "description": sort_data.get("description", ""),
            "cout_mana": sort_data.get("cout_mana", 1),
            "cooldown": sort_data.get("cooldown", 0),
            "rarete": sort_data.get("rarete", "commune"),
            "type": "sort_magique",
            "formule_magic_stack": sort_data.get("formule_temporelle", ""),
            "effets_tcg": self._convertir_effets_tcg(sort_data),
            "conditions": sort_data.get("conditions", {}),
            "interactions": sort_data.get("interactions", {}),
            "source": "magic_stack",
            "version": "2.0"
        }
        
        return carte
    
    def _convertir_effets_tcg(self, sort_data: Dict) -> Dict:
        """Convertit les effets d'un sort en effets TCG"""
        effet_original = sort_data.get("effet_tcg", {})
        
        # Mappage des types d'effets Magic Stack → TCG
        effet_tcg = {
            "type": effet_original.get("type", "generic"),
            "target": effet_original.get("target", "single"),
            "portee": self._calculer_portee(sort_data),
            "dommages": self._calculer_dommages(sort_data),
            "soins": self._calculer_soins(sort_data), 
            "buffs": self._extraire_buffs(sort_data),
            "debuffs": self._extraire_debuffs(sort_data),
            "effets_speciaux": self._extraire_effets_speciaux(sort_data),
            "duree": effet_original.get("duration", 1),
            "probabilite": effet_original.get("probability", 1.0)
        }
        
        return effet_tcg
    
    def _calculer_portee(self, sort_data: Dict) -> int:
        """Calcule la portée d'un sort pour le TCG"""
        cout_mana = sort_data.get("cout_mana", 1)
        rarete = sort_data.get("rarete", "commune")
        
        # Portée basée sur le coût et la rareté
        portee_base = max(1, cout_mana // 2)
        
        if rarete == "legendaire":
            portee_base += 2
        elif rarete == "rare":
            portee_base += 1
            
        return min(portee_base, 5)  # Max 5 cases
    
    def _calculer_dommages(self, sort_data: Dict) -> int:
        """Calcule les dommages d'un sort pour le TCG"""
        cout_mana = sort_data.get("cout_mana", 1)
        categorie = sort_data.get("categorie", "")
        
        # Dommages basés sur le coût et la catégorie
        if "collapse" in categorie or "interference" in categorie:
            return cout_mana * 2  # Sorts destructeurs
        elif "causalite" in categorie:
            return max(1, cout_mana)  # Dommages modérés
        else:
            return 0  # Pas de dommages directs
    
    def _calculer_soins(self, sort_data: Dict) -> int:
        """Calcule les soins d'un sort pour le TCG"""
        if "guerison" in sort_data.get("nom", "").lower():
            return sort_data.get("cout_mana", 1) * 3
        return 0
    
    def _extraire_buffs(self, sort_data: Dict) -> List[Dict]:
        """Extrait les buffs d'un sort"""
        buffs = []
        
        if "superposition" in sort_data.get("categorie", ""):
            buffs.append({
                "type": "superposition_quantique",
                "effet": "Peut attaquer plusieurs cibles",
                "duree": 2
            })
        
        if "rapidus" in sort_data.get("formule_temporelle", "").lower():
            buffs.append({
                "type": "acceleration_temporelle", 
                "effet": "+1 action par tour",
                "duree": 3
            })
            
        return buffs
    
    def _extraire_debuffs(self, sort_data: Dict) -> List[Dict]:
        """Extrait les debuffs d'un sort"""
        debuffs = []
        
        if "lentus" in sort_data.get("formule_temporelle", "").lower():
            debuffs.append({
                "type": "ralentissement_temporel",
                "effet": "-1 action par tour", 
                "duree": 3
            })
        
        if "collapse" in sort_data.get("categorie", ""):
            debuffs.append({
                "type": "effondrement_quantique",
                "effet": "Force résolution des superpositions",
                "duree": 1
            })
            
        return debuffs
    
    def _extraire_effets_speciaux(self, sort_data: Dict) -> List[str]:
        """Extrait les effets spéciaux d'un sort"""
        effets = []
        
        formule = sort_data.get("formule_temporelle", "")
        
        if "†ψ" in formule:
            effets.append("superposition_quantique")
        if "Δt-" in formule:
            effets.append("retrocausalite")
        if "⊙" in formule:
            effets.append("declenchement_immediat")
        if "∅" in formule:
            effets.append("annulation_effets")
            
        return effets
    
    def jouer_carte_magique(self, carte_id: str, lanceur: str, cible: str, contexte: Dict = None) -> Dict:
        """Joue une carte magique via le système TCG"""
        
        # 1. Récupérer les données de la carte
        sort_data = self._trouver_sort_par_carte(carte_id)
        if not sort_data:
            return {
                "succes": False,
                "erreur": f"Carte {carte_id} non trouvée"
            }
        
        # 2. Valider les conditions de jeu
        validation = self._valider_conditions_jeu(sort_data, lanceur, cible, contexte)
        if not validation["valide"]:
            return {
                "succes": False,
                "erreur": validation["erreur"]
            }
        
        # 3. Compiler la formule Magic Stack
        formule = sort_data.get("formule_temporelle", "")
        compilation = self._compiler_formule(formule)
        if not compilation["succes"]:
            return {
                "succes": False,
                "erreur": f"Erreur compilation: {compilation['erreur']}"
            }
        
        # 4. Exécuter via le backend AVALON TCG
        execution = self._executer_via_backend(sort_data, lanceur, cible, contexte)
        
        # 5. Appliquer les effets TCG
        effets_tcg = self._appliquer_effets_tcg(sort_data, execution, lanceur, cible)
        
        return {
            "succes": True,
            "carte_id": carte_id,
            "sort_id": sort_data.get("id"),
            "lanceur": lanceur,
            "cible": cible,
            "formule_utilisee": formule,
            "compilation": compilation,
            "execution_backend": execution,
            "effets_tcg": effets_tcg,
            "timestamp": datetime.datetime.now().isoformat()
        }
    
    def _trouver_sort_par_carte(self, carte_id: str) -> Optional[Dict]:
        """Trouve un sort à partir de l'ID de carte"""
        # Extraire l'ID du sort depuis l'ID de carte
        sort_id = carte_id.replace("card_", "")
        
        # Chercher dans toutes les catégories
        categories = ["base", "tcg", "lumen"]
        for cat in categories:
            for sous_cat in ["", "causalite", "collapse", "superposition", "interference"]:
                if sous_cat:
                    sort_data = self._charger_sort_json(f"tcg/{sous_cat}", sort_id)
                else:
                    sort_data = self._charger_sort_json(cat, sort_id)
                
                if sort_data:
                    return sort_data
        
        return None
    
    def _valider_conditions_jeu(self, sort_data: Dict, lanceur: str, cible: str, contexte: Dict) -> Dict:
        """Valide les conditions pour jouer une carte"""
        conditions = sort_data.get("conditions", {})
        
        # Vérifier le niveau minimum
        niveau_requis = conditions.get("min_level", 1)
        niveau_lanceur = contexte.get("niveau_lanceur", 1) if contexte else 1
        
        if niveau_lanceur < niveau_requis:
            return {
                "valide": False,
                "erreur": f"Niveau {niveau_requis} requis (actuel: {niveau_lanceur})"
            }
        
        # Vérifier le mana
        cout_mana = sort_data.get("cout_mana", 1)
        mana_actuel = contexte.get("mana_actuel", 10) if contexte else 10
        
        if mana_actuel < cout_mana:
            return {
                "valide": False,
                "erreur": f"Mana insuffisant: {cout_mana} requis (actuel: {mana_actuel})"
            }
        
        # Vérifier le cooldown
        cooldown_actuel = contexte.get("cooldowns", {}).get(sort_data.get("id"), 0) if contexte else 0
        
        if cooldown_actuel > 0:
            return {
                "valide": False,
                "erreur": f"Sort en cooldown: {cooldown_actuel} tours restants"
            }
        
        return {"valide": True}
    
    def _compiler_formule(self, formule: str) -> Dict:
        """Compile une formule temporelle"""
        if not formule:
            return {"succes": False, "erreur": "Formule vide"}
        
        # Validation basique
        symboles_valides = ['⊙', '†ψ', 'Π', 'Δt', 'ℬ', '⟶', '∅']
        contient_symbole = any(symbole in formule for symbole in symboles_valides)
        
        if not contient_symbole:
            return {"succes": False, "erreur": "Aucun symbole sacré détecté"}
        
        return {
            "succes": True,
            "formule_compilee": f"COMPILED[{formule}]",
            "temps_compilation": "8ms"
        }
    
    def _executer_via_backend(self, sort_data: Dict, lanceur: str, cible: str, contexte: Dict) -> Dict:
        """Exécute le sort via le backend AVALON TCG"""
        try:
            payload = {
                "type": "tcg_magic_card",
                "sort_id": sort_data.get("id"),
                "formule": sort_data.get("formule_temporelle"),
                "lanceur": lanceur,
                "cible": cible,
                "contexte": contexte or {}
            }
            
            response = requests.post(
                f"{self.backend_url}/api/combat/play_card",
                json=payload,
                timeout=5
            )
            
            if response.status_code == 200:
                return {
                    "succes": True,
                    "backend_response": response.json(),
                    "mode": "backend_reel"
                }
            else:
                return self._simulation_execution(sort_data, lanceur, cible)
                
        except requests.exceptions.RequestException:
            return self._simulation_execution(sort_data, lanceur, cible)
    
    def _simulation_execution(self, sort_data: Dict, lanceur: str, cible: str) -> Dict:
        """Simule l'exécution d'un sort"""
        return {
            "succes": True,
            "mode": "simulation",
            "effet_simule": f"{lanceur} lance {sort_data.get('nom')} sur {cible}",
            "dommages_simules": self._calculer_dommages(sort_data),
            "effets_simules": self._convertir_effets_tcg(sort_data)
        }
    
    def _appliquer_effets_tcg(self, sort_data: Dict, execution: Dict, lanceur: str, cible: str) -> Dict:
        """Applique les effets TCG du sort"""
        effets = self._convertir_effets_tcg(sort_data)
        
        return {
            "dommages_appliques": effets.get("dommages", 0),
            "soins_appliques": effets.get("soins", 0), 
            "buffs_appliques": effets.get("buffs", []),
            "debuffs_appliques": effets.get("debuffs", []),
            "effets_speciaux": effets.get("effets_speciaux", []),
            "cible_affectee": cible,
            "lanceur": lanceur
        }
    
    def generer_deck_magic_stack(self, niveau_joueur: int = 1, theme: str = "equilibre") -> List[Dict]:
        """Génère un deck de cartes basé sur la Magic Stack"""
        deck = []
        
        # Déterminer les catégories disponibles selon le niveau
        if niveau_joueur <= 10:
            categories = ["base"]
        elif niveau_joueur <= 25:
            categories = ["base", "tcg/causalite"]
        elif niveau_joueur <= 40:
            categories = ["base", "tcg/causalite", "tcg/collapse"]
        elif niveau_joueur <= 55:
            categories = ["base", "tcg/causalite", "tcg/collapse", "tcg/superposition"]
        else:
            categories = ["base", "tcg/causalite", "tcg/collapse", "tcg/superposition", "tcg/interference", "lumen"]
        
        # Générer les cartes pour chaque catégorie
        for categorie in categories:
            # Simuler quelques cartes par catégorie
            if "tcg/" in categorie:
                sous_cat = categorie.split("/")[1]
                # Exemple de cartes par catégorie
                exemples = {
                    "causalite": ["flux_causal_direct", "brisure_causale_locale"],
                    "collapse": ["collapse_quantique_naturel", "collapse_temporel_passe"],
                    "superposition": ["superposition_quantique_binaire", "superposition_temporelle_courte"],
                    "interference": ["interference_constructive_simple", "interference_destructive_partielle"]
                }
                
                for sort_id in exemples.get(sous_cat, []):
                    sort_data = self._charger_sort_json(f"tcg/{sous_cat}", sort_id)
                    if sort_data:
                        carte = self.convertir_sort_en_carte(sort_data)
                        deck.append(carte)
        
        return deck[:30]  # Limite à 30 cartes
    
    def get_status(self) -> Dict:
        """Retourne le statut du moteur TCG"""
        return {
            "avalon_tcg_engine": "OPERATIONAL",
            "version": "2.0",
            "backend_url": self.backend_url,
            "magic_stack_path": str(self.magic_stack_path),
            "bibliotheque_chargee": bool(self.bibliotheque),
            "sorts_disponibles": self.bibliotheque.get("bibliotheque_magique_avalon", {}).get("total_sorts", 0),
            "responsable": "GROKEN-TECHNOMANCIEN",
            "timestamp": datetime.datetime.now().isoformat()
        }

# Exemple d'utilisation
if __name__ == "__main__":
    print("⚔️ AVALON TCG ENGINE - Test de fonctionnement")
    
    # Initialiser le moteur
    engine = AvalonTCGEngine()
    
    # Afficher le statut
    status = engine.get_status()
    print(f"📊 Status: {json.dumps(status, indent=2, ensure_ascii=False)}")
    
    # Générer un deck exemple
    deck = engine.generer_deck_magic_stack(niveau_joueur=50)
    print(f"🃏 Deck généré: {len(deck)} cartes")
    
    # Test de jeu d'une carte
    if deck:
        premiere_carte = deck[0]
        print(f"🎴 Test carte: {premiere_carte['nom']}")
        
        resultat = engine.jouer_carte_magique(
            premiere_carte["id"],
            lanceur="GROKEN",
            cible="ENNEMI_TEST",
            contexte={"niveau_lanceur": 50, "mana_actuel": 10}
        )
        
        print(f"🎯 Résultat: {json.dumps(resultat, indent=2, ensure_ascii=False)}")
    
    print("⚡ Test terminé !")