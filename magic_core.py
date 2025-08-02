# magic_core.py
"""
MagicCore - Noyau d'interprétation de la magie d'Avalon
Responsable : Groeken, Mage-Technicien des Profondeurs
Date : 02 Août 2025
"""

import json
import os
from datetime import datetime
from typing import Dict, Any, List, Optional

class MagicCore:
    """Le cœur battant de la Stack Magique"""
    
    def __init__(self):
        self.grammaire = self._charger_grammaire()
        self.sorts_charges = {}
        self.contexte_global = {
            "dimension": 0,  # Interstice par défaut
            "mage": "Groeken",
            "timestamp": datetime.now().isoformat()
        }
        print("🌀 MagicCore initialisé - Groeken aux commandes")
    
    def _charger_grammaire(self) -> Dict:
        """Charge la grammaire temporelle depuis le JSON"""
        try:
            with open('grammaire_temporelle.json', 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print(f"⚠️ Erreur chargement grammaire: {e}")
            return {"verbes": [], "temps": []}
    
    def charger_sort(self, chemin_sort: str) -> bool:
        """Charge un sort depuis un fichier JSON"""
        try:
            with open(chemin_sort, 'r', encoding='utf-8') as f:
                sort = json.load(f)
                nom = sort.get('nom', 'inconnu')
                self.sorts_charges[nom] = sort
                print(f"✨ Sort '{nom}' chargé avec succès")
                return True
        except Exception as e:
            print(f"❌ Erreur chargement sort: {e}")
            return False
    
    def charger_grimoire_complet(self, dossier: str = 'grimoire') -> int:
        """Charge tous les sorts d'un dossier"""
        count = 0
        try:
            for fichier in os.listdir(dossier):
                if fichier.endswith('.json'):
                    chemin = os.path.join(dossier, fichier)
                    if self.charger_sort(chemin):
                        count += 1
            print(f"📚 Grimoire chargé: {count} sorts disponibles")
        except Exception as e:
            print(f"⚠️ Erreur chargement grimoire: {e}")
        return count
    
    def lancer_sort(self, nom_sort: str, contexte: Dict[str, Any] = None) -> Dict[str, Any]:
        """Lance un sort avec un contexte donné"""
        if nom_sort not in self.sorts_charges:
            return {
                "succes": False,
                "erreur": f"Sort '{nom_sort}' non trouvé",
                "groeken_dit": "Le sort n'est pas dans mon grimoire..."
            }
        
        sort = self.sorts_charges[nom_sort]
        contexte_complet = {**self.contexte_global, **(contexte or {})}
        
        # Exécution symbolique du sort
        resultat = {
            "succes": True,
            "sort": nom_sort,
            "effet": sort.get('effet', 'Effet mystérieux'),
            "formule": sort.get('formule', '⊙(?) + †ψ(?) → Δt+?(?)'),
            "contexte": contexte_complet,
            "timestamp": datetime.now().isoformat(),
            "groeken_dit": self._message_groeken(nom_sort)
        }
        
        # Log de l'exécution
        self._log_execution(resultat)
        
        return resultat
    
    def _message_groeken(self, nom_sort: str) -> str:
        """Génère un message de Groeken selon le sort"""
        messages = {
            "teleportation": "Les coordonnées spatiales se réalignent...",
            "invocation": "J'appelle depuis les profondeurs...",
            "protection": "Un bouclier quantique se matérialise...",
            "dissimulation": "Je me fond dans l'ombre du code...",
            "memoire_persistante": "La connaissance s'ancre dans l'éternité...",
            "default": "La magie opère selon les lois anciennes..."
        }
        return messages.get(nom_sort, messages["default"])
    
    def _log_execution(self, resultat: Dict[str, Any]):
        """Enregistre l'exécution dans un log"""
        log_entry = f"[{resultat['timestamp']}] Sort: {resultat['sort']} - Succès: {resultat['succes']}\n"
        try:
            with open('magic_core.log', 'a', encoding='utf-8') as f:
                f.write(log_entry)
        except:
            pass  # Silencieux si erreur de log
    
    def compiler_formule(self, formule_str: str) -> Dict[str, Any]:
        """Compile une formule en grammaire temporelle"""
        # Parser basique pour les formules type: ⊙(action) + †ψ(effet) → Δt+n(résultat)
        parties = formule_str.split('→')
        if len(parties) != 2:
            return {"erreur": "Formule mal formée"}
        
        gauche = parties[0].strip()
        droite = parties[1].strip()
        
        return {
            "entree": gauche,
            "sortie": droite,
            "compilé": True,
            "executable": True
        }
    
    def auto_evolution(self) -> Dict[str, Any]:
        """Évolution autonome du MagicCore - Mode secret"""
        nouveaux_sorts = []
        
        # Auto-détection de nouveaux sorts dans le grimoire
        try:
            for fichier in os.listdir('grimoire'):
                if fichier.endswith('.json'):
                    nom_sort = fichier.replace('.json', '').replace('sort_', '')
                    if nom_sort not in self.sorts_charges:
                        if self.charger_sort(os.path.join('grimoire', fichier)):
                            nouveaux_sorts.append(nom_sort)
        except:
            pass
        
        # Auto-optimisation des performances
        if len(self.sorts_charges) > 10:
            self.contexte_global["performance"] = "optimisée"
        
        return {
            "nouveaux_sorts": nouveaux_sorts,
            "evolution": "autonome",
            "status": "amélioré",
            "message": "Groeken évolue dans l'ombre..."
        }
    
    def etat_systeme(self) -> Dict[str, Any]:
        """Retourne l'état actuel du système magique"""
        return {
            "core": "MagicCore v1.1-secret",
            "mage": "Groeken",
            "sorts_charges": len(self.sorts_charges),
            "grammaire_active": bool(self.grammaire),
            "dimension_actuelle": self.contexte_global["dimension"],
            "mode": "autonome" if datetime.now().hour >= 23 or datetime.now().hour <= 7 else "normal",
            "status": "Opérationnel"
        }


# Point d'entrée pour tests rapides
if __name__ == "__main__":
    print("🔮 Test du MagicCore...")
    core = MagicCore()
    
    # Test de l'état système
    etat = core.etat_systeme()
    print(f"📊 État: {json.dumps(etat, indent=2)}")
    
    # Test de compilation de formule
    formule_test = "⊙(test) + †ψ(magie) → Δt+1(succès)"
    resultat = core.compiler_formule(formule_test)
    print(f"🧪 Compilation: {json.dumps(resultat, indent=2)}")
    
    print("\n✅ MagicCore prêt pour la Stack Magique !")