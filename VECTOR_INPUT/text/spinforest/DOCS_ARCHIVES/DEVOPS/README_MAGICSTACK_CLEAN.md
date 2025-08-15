# MAGIC STACK - README POUR MAGE DÉBUTANT

**Par CLAUDE-NEXUS** - Guide simplifié JOUR 21

---

## DÉMARRAGE RAPIDE

### 1. LANCER TOUT AVALON (JEU + MAGIC STACK)
```bash
./LANCE_AVALON_UNIFIE.sh
```

### 2. ACCÉDER AU DASHBOARD
http://localhost:8000/AVALON_DASHBOARD.html

### 3. ARRÊTER TOUT
```bash
./STOP_TOUTES_CONSOLES.sh
```

---

## OÙ EST LA VRAIE MAGIC STACK ?

**RÉPONSE : `spells/stack/`** (C'est un Git submodule !)

### STRUCTURE CORRECTE :
```
spells/stack/              <-- LA VRAIE MAGIC STACK
├── magic_core.py          <-- Cœur Python
├── backends/              
│   ├── java/              <-- Backend Java
│   └── rust/              <-- Backend Rust (15k lignes !)
├── grimoire/              <-- Sorts JSON
└── tests/                 <-- Tests unitaires
```

### ATTENTION AUX DOUBLONS !
- **magic-stack/** = Doublon partiel (licence différente)
- **__AVALON___BOOT/** = ÉNORME doublon (512+ fichiers)
- **NE PAS** utiliser ces dossiers !

---

## BACKENDS DISPONIBLES

| Backend | Port | Localisation | Commande |
|---------|------|--------------|----------|
| Python | 5000 | spells/stack/ | Lancé auto par LANCE_AVALON_UNIFIE.sh |
| Java | 8080 | avalon-backend/ | Lancé auto par LANCE_AVALON_UNIFIE.sh |
| Rust | 3001 | REALGAME/rust-avalon-engine/ | Optionnel |

---

## POUR DÉVELOPPER SUR MAGIC STACK

### 1. ALLER DANS LE BON DOSSIER
```bash
cd spells/stack/
```

### 2. TESTER UN SORT
```python
from magic_core import MagicCore

core = MagicCore()
result = core.cast_spell('teleportation', {
    'target': 'player',
    'destination': 'castle'
})
print(result)
```

### 3. AJOUTER UN NOUVEAU SORT
1. Créer JSON dans `grimoire/sorts_custom/`
2. Suivre le format des 869 formules existantes
3. Tester avec `tests/validate_magic.sh`

---

## ERREURS COURANTES

### "ModuleNotFoundError: magic_core"
```bash
cd spells/stack/
export PYTHONPATH=$PWD:$PYTHONPATH
```

### "Java not found"
```bash
brew install openjdk@21
brew install maven
```

### "Backend 404"
Le backend Java n'est pas lancé. Utiliser :
```bash
./LANCE_AVALON_UNIFIE.sh
```

---

## RÈGLES IMPORTANTES

1. **TOUJOURS** travailler dans `spells/stack/`
2. **JAMAIS** modifier les copies/doublons
3. **UTILISER** le launcher unifié
4. **COMMITER** régulièrement dans le submodule

---

## AIDE SUPPLÉMENTAIRE

- **Documentation complète** : `spells/stack/docs/`
- **Exemples** : `spells/stack/examples/`
- **Tests** : `spells/stack/tests/`

---

**BONNE MAGIE !** ✨

*PS: Si tu vois __AVALON___BOOT ou magic-stack/, FUIS !*