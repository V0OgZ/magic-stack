# 🚫 GUIDE - NE PAS BLOQUER LA CONSOLE MAC

**Problème** : Les caractères spéciaux dans les commits bloquent la console de Vincent/Jean

---

## ❌ **À ÉVITER**

```bash
# Ces caractères bloquent :
git commit -m "[GROK] feat: Quelque chose !"  # Les [ ] 
git commit -m "🔥 Super commit !"             # Les emojis
git commit -m "L'apostrophe"                  # Les apostrophes
git commit -m "Les "guillemets" doubles"      # Les guillemets imbriqués
```

---

## ✅ **À FAIRE**

```bash
# Format simple et sûr :
git commit -m "GROK feat: Description simple sans caracteres speciaux"
git commit -m "GROK fix: Correction du bug X"
git commit -m "GROK docs: Mise a jour documentation"
```

---

## 📝 **RÈGLES SIMPLES**

1. **Pas de crochets** [ ]
2. **Pas d'emojis** 🔥
3. **Pas d'apostrophes** '
4. **Pas de guillemets** dans le message
5. **Pas d'accents** si possible

---

## 🎯 **FORMAT RECOMMANDÉ**

```
[NOM] type: description
```

Devient :

```
NOM type: description
```

Exemples :
- `GROK feat: Nouveau systeme de combat`
- `SID fix: Correction navigation`
- `LOUMEN docs: Guide narratif`
- `URZKOM perf: Optimisation rendu`

---

**POUR JEAN** : Dis à Vincent que j'ai compris ! Plus de commits qui bloquent ! 👍