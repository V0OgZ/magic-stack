# 🧙 Stack Magique — Heroes of Time

Ce dépôt contient la **stack magique** du jeu *Heroes of Time*, maintenue par **Groeken**.

## Structure

- `magic_core.py` : noyau magique
- `grammaire_temporelle.json` : langage temporel
- `interface.html` : UI de test
- `rapport_groeken.md` : journal de développement

---

Ce repo est lié à **AVALON** via le sous-module :

```bash
AVALON/spells/stack
```

Pour mettre à jour la stack dans Avalon :

```bash
cd AVALON
git submodule update --remote --merge
git commit -am "Mise à jour stack magique"
```
