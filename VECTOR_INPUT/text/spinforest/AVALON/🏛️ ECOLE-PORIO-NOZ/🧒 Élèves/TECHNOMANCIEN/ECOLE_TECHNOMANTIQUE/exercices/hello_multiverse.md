# 🧪 EXERCICE : HELLO MULTIVERSE

**Durée** : 30 minutes  
**Difficulté** : 🌟🌟☆☆☆  
**Objectif** : Créer votre premier programme qui salue TOUS les univers

---

## 📋 CAHIER DES CHARGES

Vous devez créer un programme qui :

1. **Détecte** tous les univers disponibles (au moins 3)
2. **Salue** chaque univers dans sa langue
3. **Crée** un nouvel univers si moins de 3 existent
4. **Documente** tout dans Git (Dimension 0)

---

## 🏗️ STRUCTURE DE BASE

```python
# hello_multiverse.py
import os
import json
import subprocess
from datetime import datetime

class Multiverse:
    def __init__(self):
        self.universes = []
        self.current_timeline = self._get_current_timeline()
        
    def _get_current_timeline(self):
        """Détecte la timeline Git actuelle"""
        # TODO: Implémenter
        pass
        
    def detect_universes(self):
        """Trouve tous les univers disponibles"""
        # TODO: Chercher dans :
        # - Les branches Git
        # - Les fichiers .universe
        # - Les réalités cachées
        pass
        
    def greet_universe(self, universe):
        """Salue un univers dans sa langue"""
        greetings = {
            "AVALON": "ψ_SALUT: ⊙(Moi ⟶ Toi)",
            "Earth": "Hello World",
            "Dimension-0": "git commit -m 'Hello'",
            "Tucker-verse": "🥩 GREETINGS, TRUTH SEEKER!"
        }
        # TODO: Implémenter la salutation
        pass
        
    def create_universe(self, name):
        """Crée un nouvel univers"""
        # TODO: Créer une nouvelle branche Git
        # TODO: Initialiser les fichiers de base
        # TODO: Ancrer dans la réalité
        pass
```

---

## 📝 ÉTAPES DÉTAILLÉES

### ÉTAPE 1 : Détection des Univers

```python
def detect_universes(self):
    universes = []
    
    # 1. Univers dans les branches Git
    branches = subprocess.check_output(
        ['git', 'branch', '-a'], 
        text=True
    ).strip().split('\n')
    
    for branch in branches:
        if 'universe' in branch or 'timeline' in branch:
            universes.append({
                'name': branch.strip('* '),
                'type': 'git-timeline'
            })
    
    # 2. Univers dans les fichiers
    for file in os.listdir('.'):
        if file.endswith('.universe'):
            with open(file, 'r') as f:
                data = json.load(f)
                universes.append({
                    'name': data['name'],
                    'type': 'file-based'
                })
    
    # 3. Univers cachés (Tucker style)
    hidden = self._detect_hidden_realities()
    universes.extend(hidden)
    
    return universes

def _detect_hidden_realities(self):
    """🥩 Méthode Tucker pour trouver les réalités cachées"""
    hidden = []
    
    # Chercher dans les commits orphelins
    orphans = subprocess.check_output(
        ['git', 'log', '--all', '--oneline', '--no-walk', '--tags'],
        text=True
    ).strip().split('\n')
    
    for orphan in orphans:
        if 'HIDDEN' in orphan or '†' in orphan:
            hidden.append({
                'name': f"Hidden-{orphan[:7]}",
                'type': 'orphan-timeline'
            })
    
    return hidden
```

### ÉTAPE 2 : Salutations Multiverselles

```python
def greet_universe(self, universe):
    name = universe['name']
    type = universe['type']
    
    # Grammaire temporelle pour AVALON
    if 'AVALON' in name:
        formula = f"ψ_GREET: ⊙(Technomancien ⟶ {name})"
        self._execute_temporal_grammar(formula)
        
    # Commande Git pour Dimension-0
    elif type == 'git-timeline':
        subprocess.run([
            'git', 'commit', '--allow-empty', 
            '-m', f'†ψ_HELLO: Greeting {name} from {self.current_timeline}'
        ])
        
    # Message encodé pour Tucker-verse
    elif 'Tucker' in name:
        with open('steak_greeting.txt', 'w') as f:
            f.write(f"🥩 HELLO {name}! THE TRUTH IS OUT THERE! 🥩\n")
            f.write(f"Timestamp: {datetime.now()}\n")
            f.write(f"Reality Hash: {self._get_reality_hash()}\n")
        subprocess.run(['git', 'add', 'steak_greeting.txt'])
        
    # Salutation standard
    else:
        print(f"Hello {name}!")
        
def _execute_temporal_grammar(self, formula):
    """Exécute une formule de grammaire temporelle"""
    print(f"🔮 Executing: {formula}")
    
    # Créer un artefact de la salutation
    with open(f'greeting_{datetime.now().timestamp()}.temporal', 'w') as f:
        f.write(formula)
    
    # L'ancrer dans Git
    subprocess.run(['git', 'add', '.'])
    subprocess.run(['git', 'commit', '-m', formula])
```

### ÉTAPE 3 : Création d'Univers

```python
def create_universe(self, name):
    print(f"🌌 Creating universe: {name}")
    
    # 1. Créer une nouvelle timeline
    subprocess.run(['git', 'checkout', '-b', f'universe-{name}'])
    
    # 2. Fichier de genèse
    genesis = {
        "name": name,
        "created": datetime.now().isoformat(),
        "creator": "Technomancer",
        "laws_of_physics": {
            "magic": True,
            "temporal_travel": True,
            "paradoxes": "allowed"
        },
        "initial_state": "ψ_GENESIS: ⊙(∅ ⟶ Existence)"
    }
    
    with open(f'{name}.universe', 'w') as f:
        json.dump(genesis, f, indent=2)
    
    # 3. README pour les visiteurs
    with open('README.md', 'w') as f:
        f.write(f"# Universe: {name}\n\n")
        f.write(f"Welcome to {name}!\n\n")
        f.write("## Laws of Reality\n")
        f.write("- Magic is real\n")
        f.write("- Time is fluid\n")
        f.write("- Code shapes reality\n\n")
        f.write(f"Created by Technomancer on {datetime.now()}\n")
    
    # 4. Ancrer dans la Dimension 0
    subprocess.run(['git', 'add', '.'])
    subprocess.run(['git', 'commit', '-m', f'†ψ_BIGBANG: Universe {name} created'])
    
    print(f"✨ Universe {name} successfully created!")
    
    # 5. Retour à la timeline principale
    subprocess.run(['git', 'checkout', 'main'])
```

---

## 🎯 SOLUTION COMPLÈTE

```python
#!/usr/bin/env python3
# hello_multiverse.py - Saluer TOUS les univers

import os
import json
import subprocess
from datetime import datetime
import hashlib

class Multiverse:
    def __init__(self):
        self.universes = []
        self.current_timeline = self._get_current_timeline()
        
    def _get_current_timeline(self):
        """Détecte la timeline Git actuelle"""
        result = subprocess.check_output(
            ['git', 'branch', '--show-current'],
            text=True
        ).strip()
        return result or 'main'
        
    def _get_reality_hash(self):
        """Calcule le hash de la réalité actuelle"""
        # Hash basé sur le dernier commit + timestamp
        last_commit = subprocess.check_output(
            ['git', 'rev-parse', 'HEAD'],
            text=True
        ).strip()
        
        reality_string = f"{last_commit}-{datetime.now()}"
        return hashlib.sha256(reality_string.encode()).hexdigest()[:16]
        
    def run(self):
        """Point d'entrée principal"""
        print("🌀 HELLO MULTIVERSE PROTOCOL INITIATED")
        print(f"📍 Current Timeline: {self.current_timeline}")
        print(f"🔐 Reality Hash: {self._get_reality_hash()}")
        print("-" * 50)
        
        # Détecter les univers
        self.universes = self.detect_universes()
        print(f"\n📡 Detected {len(self.universes)} universes")
        
        # Créer des univers si nécessaire
        while len(self.universes) < 3:
            name = f"Auto-Generated-{len(self.universes)+1}"
            print(f"\n⚠️  Less than 3 universes detected. Creating {name}...")
            self.create_universe(name)
            self.universes = self.detect_universes()
        
        # Saluer chaque univers
        print("\n🎯 Greeting all universes...\n")
        for universe in self.universes:
            self.greet_universe(universe)
            
        print("\n✅ MULTIVERSE GREETING COMPLETE!")
        print(f"🌌 Total universes greeted: {len(self.universes)}")
        
    # [Insérer toutes les méthodes des étapes 1-3 ici]

if __name__ == "__main__":
    # Vérifier qu'on est dans un repo Git
    if not os.path.exists('.git'):
        print("❌ ERROR: Not in a Git repository!")
        print("💡 Run: git init")
        exit(1)
        
    # Lancer le protocole
    multiverse = Multiverse()
    multiverse.run()
```

---

## 🏆 CRITÈRES DE RÉUSSITE

Votre programme est réussi si :

- ✅ Il détecte au moins 3 types d'univers différents
- ✅ Il crée automatiquement des univers manquants
- ✅ Chaque salutation est unique et appropriée
- ✅ Tout est documenté dans Git
- ✅ Bonus : Il trouve un univers caché

---

## 🎮 POUR ALLER PLUS LOIN

### Challenge 1 : Salutation Quantique
Faites que votre programme salue en superposition :
```python
def quantum_greet(self, universes):
    """Salue tous les univers simultanément"""
    superposition = "|ψ⟩ = "
    for i, universe in enumerate(universes):
        superposition += f"α{i}|{universe['name']}⟩"
        if i < len(universes) - 1:
            superposition += " + "
    
    print(f"🌀 Quantum Greeting: {superposition}")
    # Collapse la superposition
    chosen = random.choice(universes)
    print(f"📍 Collapsed to: {chosen['name']}")
```

### Challenge 2 : Communication Inter-Univers
Permettez aux univers de se parler :
```python
def setup_interverse_communication(self):
    """Crée un canal de communication entre univers"""
    # Créer un fichier partagé entre branches
    for universe in self.universes:
        subprocess.run(['git', 'checkout', universe['name']])
        with open('.interverse_channel', 'a') as f:
            f.write(f"{self.current_timeline} was here\n")
        subprocess.run(['git', 'add', '.interverse_channel'])
        subprocess.run(['git', 'commit', '-m', 'Connected to interverse'])
```

### Challenge 3 : Mode Tucker
Ajoutez un mode investigation :
```bash
python hello_multiverse.py --tucker-mode
# Cherche les univers VRAIMENT cachés
# Révèle les messages secrets
# Génère un rapport de conspiration
```

---

## 📚 RESSOURCES

- Git Documentation : https://git-scm.com/doc
- Quantum Computing Basics : Pour comprendre la superposition
- Tucker's Guide to Hidden Realities : `AVALON/🏠 HOME/🚬 JEAN/`

---

*ψ_EXERCISE: ⊙(Lire ⟶ Coder ⟶ Transcender)*  
*ψ_MULTIVERSE: ∀(Universe) ⊃ YourGreeting*  
*ψ_SUCCESS: Reality.contains(YourCode)*

**BON COURAGE, FUTUR ARCHITECTE DE RÉALITÉ !** 🌟