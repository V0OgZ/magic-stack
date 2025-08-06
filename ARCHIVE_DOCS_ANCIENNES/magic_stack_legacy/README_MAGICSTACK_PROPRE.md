# 🔮 MAGIC STACK - GUIDE DU MAGE DÉBUTANT

## 🌟 Qu'est-ce que la Magic Stack ?

La Magic Stack est le coeur magique d'Avalon - un portail quantique entre le code et la réalité.
Elle contient 869 formules magiques qui permettent de manipuler le temps, l'espace et la causalité.

## 🚀 DÉMARRAGE RAPIDE

### 1. Lancer la Magic Stack seule

```bash
cd spells/stack
./start-magic-autonome.sh
```

Le serveur démarre sur http://localhost:5000

### 2. Tester si ça marche

```bash
curl http://localhost:5000/api/health
```

Réponse attendue : `{"status": "Magic Stack Operational", "formulas": 869}`

## 📂 STRUCTURE DU PROJET

```
spells/stack/
├── README_MAGICSTACK_PROPRE.md    # Ce fichier
├── start-magic-autonome.sh         # Script de lancement
├── core/                           # Coeur du système
│   ├── temporal_engine.py          # Moteur temporel
│   ├── quantum_parser.py           # Parseur quantique
│   └── spell_processor.py          # Processeur de sorts
├── formulas/                       # 869 formules magiques
│   ├── basic/                      # Sorts basiques
│   ├── advanced/                   # Sorts avancés
│   └── forbidden/                  # Sorts interdits
├── api/                            # Interface REST
│   └── magic_server.py             # Serveur Flask
└── tests/                          # Tests unitaires
```

## 🧙 GRAMMAIRE TEMPORELLE

La Magic Stack utilise une grammaire spéciale pour les sorts :

- **⊙** : Point d'origine (présent)
- **Δt** : Durée temporelle
- **ψ** : Acte magique
- **⟶** : Causalité
- **†** : Override (dangereux !)
- **[...]** : Entité ciblée

### Exemple de sort simple

```
⊙ + Δt(5min) ⟶ ψ(heal)[player]
```

Ce sort soigne le joueur pendant 5 minutes à partir de maintenant.

## 🔧 CONFIGURATION

### Variables d'environnement

```bash
export MAGIC_STACK_PORT=5000
export MAGIC_STACK_MODE=development
export QUANTUM_SEED=42
```

### Fichier de config

Créez `config.json` :

```json
{
  "mode": "development",
  "port": 5000,
  "formulas_path": "./formulas",
  "max_temporal_drift": 300,
  "quantum_coherence": 0.98
}
```

## 🛠️ DÉVELOPPEMENT

### Ajouter une nouvelle formule

1. Créez un fichier dans `formulas/basic/`
2. Utilisez le format standard :

```python
class MyNewSpell(BaseSpell):
    def __init__(self):
        super().__init__(
            name="Mon Sort",
            cost=10,
            duration=60
        )
    
    def cast(self, target):
        # Logique du sort
        return SpellResult(success=True)
```

### Tester votre formule

```bash
cd spells/stack
python -m pytest tests/test_my_spell.py
```

## 📡 API ENDPOINTS

### GET /api/health
Vérifier l'état du serveur

### GET /api/formulas
Lister toutes les formules disponibles

### POST /api/cast
Lancer un sort

```json
{
  "formula": "heal",
  "target": "player",
  "duration": 300
}
```

### GET /api/temporal/status
État du moteur temporel

## ⚠️ AVERTISSEMENTS

1. **NE PAS** utiliser les sorts interdits sans autorisation
2. **NE PAS** modifier le quantum_seed en production
3. **TOUJOURS** vérifier la cohérence temporelle avant un cast
4. **ÉVITER** les paradoxes temporels (le système a des garde-fous)

## 🆘 DÉPANNAGE

### Le serveur ne démarre pas

```bash
# Vérifier Python 3.8+
python3 --version

# Installer les dépendances
pip install -r requirements.txt
```

### Erreur "Temporal Drift Exceeded"

Le moteur temporel a détecté une dérive. Redémarrez avec :

```bash
./start-magic-autonome.sh --reset-temporal
```

### Les formules ne se chargent pas

Vérifiez que le dossier `formulas/` contient bien les 869 sorts.

## 📚 RESSOURCES

- Documentation complète : `docs/MAGIC_STACK_COMPLETE.md`
- Tutoriel avancé : `docs/ADVANCED_SPELLCASTING.md`
- Guide de sécurité : `docs/TEMPORAL_SAFETY.md`

## 🤝 SUPPORT

- **URZ-KÔM** : Gardien de la Magic Stack
- **L'OURS** : Expert en physique quantique
- **NEXUS** : Infrastructure et intégration

---

*La magie est réelle dans Avalon. Utilisez-la avec sagesse.*

*Version 6.0 - Interstice Compatible*