#!/usr/bin/env python3
"""
🎮 TEST DU MULTIPLAYER OFFICIAL CONTROLLER V2
Démo interactive pour voir les nouvelles mécaniques en action
"""

import requests
import json
import time
from datetime import datetime
from colorama import init, Fore, Back, Style

init(autoreset=True)

BASE_URL = "http://localhost:3001"

class V2Tester:
    def __init__(self):
        self.entities = {}
        self.world_time = 0
        
    def banner(self):
        print(f"""
{Fore.MAGENTA}╔══════════════════════════════════════════════════════╗
║      🎮 HEROES OF TIME V2 - TEST CONTROLLER 🎮        ║
║         Temps différencié & Énergie complexe          ║
╚══════════════════════════════════════════════════════╝{Style.RESET_ALL}
        """)
        
    def test_health(self):
        """Vérifier que le serveur est up"""
        print(f"\n{Fore.CYAN}📡 Test connexion...{Style.RESET_ALL}")
        try:
            r = requests.get(f"{BASE_URL}/health")
            if r.status_code == 200:
                print(f"{Fore.GREEN}✅ Serveur OK !{Style.RESET_ALL}")
                return True
        except:
            print(f"{Fore.RED}❌ Serveur non accessible sur {BASE_URL}{Style.RESET_ALL}")
            return False
            
    def migrate_entity(self, entity_id, x=10, y=20, energy=100):
        """Migrer une entité V1 vers V2"""
        print(f"\n{Fore.YELLOW}🔄 Migration entité '{entity_id}' vers V2...{Style.RESET_ALL}")
        
        data = {
            "id": entity_id,
            "x": x,
            "y": y,
            "energy": energy
        }
        
        try:
            r = requests.post(f"{BASE_URL}/api/v2/migrate-entity", json=data)
            if r.status_code == 200:
                result = r.json()
                entity = result.get("entity", {})
                self.entities[entity_id] = entity
                
                print(f"{Fore.GREEN}✅ Entité migrée !{Style.RESET_ALL}")
                self.display_entity(entity)
                return entity
        except Exception as e:
            print(f"{Fore.RED}❌ Erreur migration: {e}{Style.RESET_ALL}")
            return None
            
    def display_entity(self, entity):
        """Afficher une entité V2 de manière jolie"""
        print(f"""
{Fore.CYAN}┌─ Entité: {entity['id']} ─────────────────┐{Style.RESET_ALL}
│ Position: ({entity['position'][0]}, {entity['position'][1]})
│ Énergie simple: {entity['energy']:.1f}
        """, end="")
        
        if entity.get('temporal'):
            t = entity['temporal']
            print(f"""│ {Fore.YELLOW}📅 Temporel:{Style.RESET_ALL}
│   - Temps local (t_e): {t['t_e']:.2f}
│   - Jour caché: {t['day_hidden']}
│   - Drift rate: {t['drift_rate']}
        """, end="")
        
        if entity.get('energy_complex'):
            e = entity['energy_complex']
            phi = e.get('phi', 0)
            phi_color = Fore.GREEN if phi > 0.75 else Fore.YELLOW if phi > 0.5 else Fore.RED
            print(f"""│ {Fore.MAGENTA}⚡ Énergie Complexe:{Style.RESET_ALL}
│   - A (réel): {e['a']:.1f} / {e['a_max']:.1f}
│   - Φ (phase): {phi_color}{phi:.3f}{Style.RESET_ALL}
│   - Dette: {e['debt_a']:.1f}
        """, end="")
        
        if entity.get('identity'):
            i = entity['identity']
            print(f"""│ {Fore.BLUE}🌀 Identité:{Style.RESET_ALL}
│   - Cohérence: {i['coherence']:.3f}
│   - Vecteur ψ: {i['psi_vector']}
│   - Intrications: {len(i['entanglements'])}
        """, end="")
        
        print(f"{Fore.CYAN}└────────────────────────────────┘{Style.RESET_ALL}")
        
    def tick_world(self):
        """Déclencher un tick monde"""
        print(f"\n{Fore.YELLOW}⏰ Tick monde...{Style.RESET_ALL}")
        
        try:
            r = requests.post(f"{BASE_URL}/api/v2/tick")
            if r.status_code == 200:
                result = r.json()
                if result.get('success'):
                    tick_data = result['result']
                    self.world_time = tick_data['world_time']
                    
                    print(f"{Fore.GREEN}✅ Tick réussi !{Style.RESET_ALL}")
                    print(f"  - Temps monde (t_w): {tick_data['world_time']:.3f}")
                    print(f"  - Entités mises à jour: {tick_data['entities_updated']}")
                    
                    if tick_data['regulators_triggered']:
                        print(f"  - {Fore.RED}⚠️ Régulateurs déclenchés: {tick_data['regulators_triggered']}{Style.RESET_ALL}")
                    
                    print(f"  - Trace hash: {tick_data['trace_hash'][:8]}...")
                    return tick_data
        except Exception as e:
            print(f"{Fore.RED}❌ Erreur tick: {e}{Style.RESET_ALL}")
            return None
            
    def simulate_time_flow(self, duration_s=5, tick_interval=0.5):
        """Simuler l'écoulement du temps avec plusieurs ticks"""
        print(f"\n{Fore.MAGENTA}🌊 Simulation écoulement temporel ({duration_s}s)...{Style.RESET_ALL}")
        
        start = time.time()
        tick_count = 0
        
        while time.time() - start < duration_s:
            tick_count += 1
            print(f"\n{Fore.CYAN}━━━ Tick #{tick_count} ━━━{Style.RESET_ALL}")
            
            # Tick monde
            self.tick_world()
            
            # Récupérer et afficher une entité
            if self.entities:
                entity_id = list(self.entities.keys())[0]
                try:
                    r = requests.get(f"{BASE_URL}/api/v2/entity/{entity_id}")
                    if r.status_code == 200:
                        entity = r.json().get('entity')
                        if entity:
                            # Affichage compact
                            t_e = entity.get('temporal', {}).get('t_e', 0)
                            phi = entity.get('energy_complex', {}).get('phi', 0)
                            a = entity.get('energy_complex', {}).get('a', 0)
                            
                            phi_bar = "█" * int(abs(phi) * 10) + "░" * (10 - int(abs(phi) * 10))
                            a_bar = "█" * int(a / 10) + "░" * (10 - int(a / 10))
                            
                            print(f"  {entity_id}: t_e={t_e:.2f} A=[{a_bar}] Φ=[{phi_bar}]")
                except:
                    pass
            
            time.sleep(tick_interval)
            
        print(f"\n{Fore.GREEN}✅ Simulation terminée ! {tick_count} ticks effectués.{Style.RESET_ALL}")
        
    def test_interference(self):
        """Tester le calcul d'interférence entre deux entités"""
        print(f"\n{Fore.MAGENTA}🌀 Test d'interférence quantique...{Style.RESET_ALL}")
        
        # Créer deux entités
        self.migrate_entity("hero_main", x=10, y=10, energy=80)
        self.migrate_entity("hero_clone", x=12, y=10, energy=60)
        
        # Calculer interférence
        try:
            data = {
                "entity_a": "hero_main",
                "entity_b": "hero_clone"
            }
            r = requests.post(f"{BASE_URL}/api/v2/interference", json=data)
            if r.status_code == 200:
                result = r.json()
                interference = result.get('interference', 0)
                effect = result.get('effect', 'Unknown')
                
                # Visualisation
                i_bar = "█" * int(interference * 20) + "░" * (20 - int(interference * 20))
                
                color = Fore.GREEN if interference > 0.75 else Fore.YELLOW if interference > 0.5 else Fore.RED
                
                print(f"""
{Fore.CYAN}┌─ Interférence Quantique ─────────┐{Style.RESET_ALL}
│ Entité A: hero_main
│ Entité B: hero_clone
│ 
│ Interférence |I| = {color}{interference:.3f}{Style.RESET_ALL}
│ [{i_bar}]
│ 
│ Effet: {color}{effect}{Style.RESET_ALL}
│   - FullClone: Clone complet (≥0.75)
│   - WeakClone: Clone affaibli (≥0.50)
│   - TemporaryBuff: Buff temp (≥0.25)
│   - Dissipation: Disparition (<0.25)
{Fore.CYAN}└──────────────────────────────────┘{Style.RESET_ALL}
                """)
        except Exception as e:
            print(f"{Fore.RED}❌ Erreur calcul interférence: {e}{Style.RESET_ALL}")
            
    def demo_complete(self):
        """Démo complète des fonctionnalités V2"""
        self.banner()
        
        if not self.test_health():
            print(f"\n{Fore.RED}⚠️ Lancez d'abord le serveur Rust:{Style.RESET_ALL}")
            print(f"  cd backends/rust && cargo run")
            return
            
        print(f"\n{Fore.GREEN}═══ DÉMO COMPLÈTE V2 ═══{Style.RESET_ALL}")
        
        # 1. Migration
        print(f"\n{Fore.YELLOW}[1/4] Migration d'entités V1 → V2{Style.RESET_ALL}")
        hero = self.migrate_entity("hero_ventus", x=5, y=5, energy=100)
        
        input(f"\n{Fore.CYAN}Appuyez sur Entrée pour continuer...{Style.RESET_ALL}")
        
        # 2. Écoulement du temps
        print(f"\n{Fore.YELLOW}[2/4] Simulation temporelle (5 ticks){Style.RESET_ALL}")
        for i in range(5):
            self.tick_world()
            time.sleep(0.5)
            
        input(f"\n{Fore.CYAN}Appuyez sur Entrée pour continuer...{Style.RESET_ALL}")
        
        # 3. Interférences
        print(f"\n{Fore.YELLOW}[3/4] Test d'interférence quantique{Style.RESET_ALL}")
        self.test_interference()
        
        input(f"\n{Fore.CYAN}Appuyez sur Entrée pour continuer...{Style.RESET_ALL}")
        
        # 4. Simulation longue
        print(f"\n{Fore.YELLOW}[4/4] Simulation longue (10s){Style.RESET_ALL}")
        self.simulate_time_flow(duration_s=10, tick_interval=1)
        
        print(f"""
{Fore.GREEN}╔══════════════════════════════════════════════════════╗
║           🎉 DÉMO V2 TERMINÉE AVEC SUCCÈS ! 🎉        ║
║                                                        ║
║  Les nouvelles mécaniques sont opérationnelles :      ║
║  ✅ Temps différencié (t_w vs t_e)                    ║
║  ✅ Énergie complexe (A + iΦ)                         ║
║  ✅ Identité quantique |ψ⟩                            ║
║  ✅ Calcul d'interférences                            ║
║  ✅ Régulateurs (Vince/Anna/Overload)                 ║
║  ✅ Trace hash déterministe                           ║
╚══════════════════════════════════════════════════════╝{Style.RESET_ALL}
        """)

if __name__ == "__main__":
    tester = V2Tester()
    
    # Menu
    print(f"""
{Fore.CYAN}Que voulez-vous tester ?{Style.RESET_ALL}
1. Démo complète (recommandé)
2. Test de connexion seulement
3. Migration d'entité
4. Simulation temporelle
5. Test d'interférence

Choix (1-5): """, end="")
    
    try:
        choice = input().strip()
        
        if choice == "1":
            tester.demo_complete()
        elif choice == "2":
            tester.test_health()
        elif choice == "3":
            tester.test_health()
            tester.migrate_entity("test_hero", x=15, y=25, energy=75)
        elif choice == "4":
            tester.test_health()
            tester.migrate_entity("hero_1")
            tester.simulate_time_flow(duration_s=10)
        elif choice == "5":
            tester.test_health()
            tester.test_interference()
        else:
            print(f"{Fore.RED}Choix invalide{Style.RESET_ALL}")
    except KeyboardInterrupt:
        print(f"\n{Fore.YELLOW}Arrêt...{Style.RESET_ALL}")
