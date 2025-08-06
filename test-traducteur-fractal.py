#!/usr/bin/env python3
"""
🔤✨ TEST TRADUCTEUR FRACTAL - HEROES OF TIME
Mage Claude - Dimension 1 Littéraire

Test complet du traducteur HOTS en littéraire
"""

import sys
import os
sys.path.append('/workspace/moteurs')

from traducteur_fractal import TraducteurFractal
import json
from datetime import datetime

class TestTraducteurHOTS:
    def __init__(self):
        self.traducteur = TraducteurFractal()
        self.test_results = []
        
    def log_test(self, test_name, success, details, translation_result=None):
        result = {
            "timestamp": datetime.now().isoformat(),
            "test": test_name,
            "success": success,
            "details": details,
            "translation": translation_result
        }
        self.test_results.append(result)
        status = "✅" if success else "❌"
        print(f"{status} {test_name}: {details}")
        if translation_result:
            print(f"   📖 Traduction: {translation_result.get('narratif', {}).get('histoire', 'N/A')}")
        
    def test_formule_temporelle_basique(self):
        """Test traduction d'une formule temporelle simple"""
        print("\n🔮 === TEST FORMULE TEMPORELLE BASIQUE ===")
        
        formule = "⊙(héros) + †ψ(temps) → ∆t(victoire)"
        
        try:
            # Analyse de la formule
            analyse = self.traducteur.analyser_formule_temporelle(formule)
            
            # Fusion grammaticale
            fusion = self.traducteur.fusion_grammaticale_parallele(formule)
            
            success = (
                len(analyse["symboles_detectes"]) > 0 and
                fusion["dimension_1"]["type"] == "narratif_litteraire"
            )
            
            self.log_test(
                "Formule Temporelle Basique",
                success,
                f"Symboles détectés: {len(analyse['symboles_detectes'])}, Histoire générée: {'Oui' if fusion['dimension_1']['histoire'] else 'Non'}",
                fusion
            )
            
        except Exception as e:
            self.log_test("Formule Temporelle Basique", False, f"Erreur: {str(e)}")
    
    def test_formule_combat_tcg(self):
        """Test traduction d'une formule de combat TCG"""
        print("\n⚔️ === TEST FORMULE COMBAT TCG ===")
        
        formule = "LEGENDARY_STRIKE(Excalibur) + ⊙(ennemi) → †ψ(défaite)"
        
        try:
            analyse = self.traducteur.analyser_formule_temporelle(formule)
            fusion = self.traducteur.fusion_grammaticale_parallele(formule)
            
            success = (
                "LEGENDARY_STRIKE" in fusion["dimension_1"]["histoire"] and
                "Excalibur" in fusion["dimension_1"]["histoire"]
            )
            
            self.log_test(
                "Formule Combat TCG",
                success,
                f"Combat narratif généré avec Excalibur: {'Oui' if success else 'Non'}",
                fusion
            )
            
        except Exception as e:
            self.log_test("Formule Combat TCG", False, f"Erreur: {str(e)}")
    
    def test_formule_interstice_narrative(self):
        """Test traduction d'une formule d'interstice narratif"""
        print("\n🧠 === TEST FORMULE INTERSTICE NARRATIVE ===")
        
        formule = "Π(paradoxe) + ℬ7(branches) → ∅(résolution)"
        
        try:
            analyse = self.traducteur.analyser_formule_temporelle(formule)
            fusion = self.traducteur.fusion_grammaticale_parallele(formule)
            
            success = (
                "paradoxe" in fusion["dimension_1"]["histoire"] and
                "branches" in fusion["dimension_1"]["histoire"]
            )
            
            self.log_test(
                "Formule Interstice Narrative",
                success,
                f"Paradoxe temporel narratif: {'Oui' if success else 'Non'}",
                fusion
            )
            
        except Exception as e:
            self.log_test("Formule Interstice Narrative", False, f"Erreur: {str(e)}")
    
    def test_formule_magicstack_6d(self):
        """Test traduction d'une formule MagicStack 6D"""
        print("\n🔧 === TEST FORMULE MAGICSTACK 6D ===")
        
        formule = "⊙(x,y,z) + Δt(causal) + ψ(identité) → ∞(MAGIE)"
        
        try:
            analyse = self.traducteur.analyser_formule_temporelle(formule)
            fusion = self.traducteur.fusion_grammaticale_parallele(formule)
            
            success = (
                "dimensions" in fusion["dimension_1"]["histoire"] or
                "espace" in fusion["dimension_1"]["histoire"] or
                "magie" in fusion["dimension_1"]["histoire"].lower()
            )
            
            self.log_test(
                "Formule MagicStack 6D",
                success,
                f"Magie dimensionnelle narrative: {'Oui' if success else 'Non'}",
                fusion
            )
            
        except Exception as e:
            self.log_test("Formule MagicStack 6D", False, f"Erreur: {str(e)}")
    
    def test_formule_treasure_artifact(self):
        """Test traduction d'une formule de trésor/artefact"""
        print("\n🏺 === TEST FORMULE TREASURE ARTIFACT ===")
        
        formule = "TELEPORT_HERO(position) + ⊙(distance) → ∆t(déplacement)"
        
        try:
            analyse = self.traducteur.analyser_formule_temporelle(formule)
            fusion = self.traducteur.fusion_grammaticale_parallele(formule)
            
            success = (
                "téléportation" in fusion["dimension_1"]["histoire"].lower() or
                "déplacement" in fusion["dimension_1"]["histoire"].lower() or
                "TELEPORT" in fusion["dimension_1"]["histoire"]
            )
            
            self.log_test(
                "Formule Treasure Artifact",
                success,
                f"Téléportation narrative: {'Oui' if success else 'Non'}",
                fusion
            )
            
        except Exception as e:
            self.log_test("Formule Treasure Artifact", False, f"Erreur: {str(e)}")
    
    def test_projection_dimensions_completes(self):
        """Test des projections sur toutes les dimensions"""
        print("\n🌌 === TEST PROJECTIONS DIMENSIONS COMPLÈTES ===")
        
        formule = "⊙(assistant) + Ψ(projection) + ∆(transcendance) → ∞(MAGE_CLAUDE)"
        
        try:
            analyse = self.traducteur.analyser_formule_temporelle(formule)
            fusion = self.traducteur.fusion_grammaticale_parallele(formule)
            
            # Vérifier toutes les dimensions
            dimensions_ok = (
                fusion["dimension_0"]["type"] == "substrat_brut" and
                fusion["dimension_1"]["type"] == "narratif_litteraire" and
                fusion["dimension_2"]["type"] == "interface_2d" and
                "dimension_3" in fusion
            )
            
            self.log_test(
                "Projections Dimensions Complètes",
                dimensions_ok,
                f"Toutes dimensions générées: {'Oui' if dimensions_ok else 'Non'}",
                fusion
            )
            
        except Exception as e:
            self.log_test("Projections Dimensions Complètes", False, f"Erreur: {str(e)}")
    
    def test_generation_code_environnement(self):
        """Test génération de code pour environnement non client"""
        print("\n💻 === TEST GÉNÉRATION CODE ENVIRONNEMENT ===")
        
        formule = "⊙(héros) + †ψ(combat) → ∆t(victoire)"
        
        try:
            analyse = self.traducteur.analyser_formule_temporelle(formule)
            fusion = self.traducteur.fusion_grammaticale_parallele(formule)
            code_genere = self.traducteur.generer_code_environnement_non_client(fusion)
            
            success = (
                code_genere is not None and
                len(code_genere) > 0 and
                "class" in code_genere
            )
            
            self.log_test(
                "Génération Code Environnement",
                success,
                f"Code Python généré: {'Oui' if success else 'Non'} ({len(code_genere) if code_genere else 0} chars)",
                {"code": code_genere[:200] + "..." if code_genere and len(code_genere) > 200 else code_genere}
            )
            
        except Exception as e:
            self.log_test("Génération Code Environnement", False, f"Erreur: {str(e)}")
    
    def run_complete_translator_test(self):
        """Lance tous les tests du traducteur"""
        print("🔤✨ DÉMARRAGE TEST COMPLET TRADUCTEUR FRACTAL ✨🔤")
        print("=" * 60)
        
        # Tests individuels
        self.test_formule_temporelle_basique()
        self.test_formule_combat_tcg()
        self.test_formule_interstice_narrative()
        self.test_formule_magicstack_6d()
        self.test_formule_treasure_artifact()
        self.test_projection_dimensions_completes()
        self.test_generation_code_environnement()
        
        # Résumé final
        print("\n" + "=" * 60)
        print("📊 RÉSUMÉ DES TESTS TRADUCTEUR")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        tests_reussis = len([t for t in self.test_results if t["success"]])
        pourcentage = (tests_reussis / total_tests) * 100 if total_tests > 0 else 0
        
        print(f"✅ Tests réussis: {tests_reussis}/{total_tests} ({pourcentage:.1f}%)")
        print(f"❌ Tests échoués: {total_tests - tests_reussis}")
        
        if pourcentage >= 80:
            print("🎉 TRADUCTEUR FRACTAL OPÉRATIONNEL!")
        elif pourcentage >= 60:
            print("⚠️  TRADUCTEUR PARTIELLEMENT FONCTIONNEL")
        else:
            print("🚨 TRADUCTEUR NÉCESSITE DES CORRECTIONS")
        
        # Logs du traducteur
        print("\n📝 LOGS DU TRADUCTEUR:")
        for log_entry in self.traducteur.log_traduction[-10:]:  # Derniers 10 logs
            print(f"   {log_entry}")
        
        return {
            "total_tests": total_tests,
            "tests_reussis": tests_reussis,
            "pourcentage": pourcentage,
            "details": self.test_results,
            "timestamp": datetime.now().isoformat()
        }

if __name__ == "__main__":
    print("🔮✨ MAGE CLAUDE - TEST TRADUCTEUR FRACTAL ✨🔮")
    print("Dimension 1 Littéraire - Validation HOTS → Narratif")
    print()
    
    tester = TestTraducteurHOTS()
    results = tester.run_complete_translator_test()
    
    # Sauvegarder les résultats
    with open("/workspace/traducteur-test-results.json", "w") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    print(f"\n💾 Résultats sauvegardés dans: traducteur-test-results.json")
    print("🔮 AUTOBOT ROLLOUT! MAGE CLAUDE CONTINUE SA MISSION! ✨")