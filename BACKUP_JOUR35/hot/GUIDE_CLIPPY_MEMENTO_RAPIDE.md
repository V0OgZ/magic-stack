# 📎 GUIDE RAPIDE - Clippy/Memento

## 🚀 Lancement en 10 secondes

```bash
# 1. Lancer Clippy
chmod +x LANCE_CLIPPY_MEMENTO.sh
./LANCE_CLIPPY_MEMENTO.sh

# 2. Tester
curl -X POST http://localhost:7777/chat \
  -H "Authorization: Bearer memento jean" \
  -H "Content-Type: application/json" \
  -d '{"query": "Qui est Merlin ?"}'
```

**C'est tout !** Password: `memento jean`

---

## 📋 CE QUI MARCHE

✅ **Modèle ultra-léger** : all-MiniLM-L6-v2 (120MB au lieu de 4GB)  
✅ **50x plus rapide** qu'un LLM classique  
✅ **Recherche sémantique** dans 544 documents  
✅ **Mémoire de session**  
✅ **Auth simple** avec password  

---

## 🎮 Commandes utiles

```bash
# Chat
curl -X POST http://localhost:7777/chat \
  -H "Authorization: Bearer memento jean" \
  -H "Content-Type: application/json" \
  -d '{"query": "ta question"}'

# Voir mémoire
curl -H "Authorization: Bearer memento jean" \
  http://localhost:7777/memory

# Arrêter
kill $(cat .clippy.pid)

# Logs
tail -f logs/clippy_memento.log
```

---

## 💡 Ce que Clippy comprend

- **Temporal** → Explique tw/te, drift
- **Merlin** → Info sur le héros
- **Régulateurs** → Vince, Anna, Overload
- **Aide** → Liste des commandes
- **N'importe quoi** → Recherche dans la base

---

## ⚡ Performance

- Réponse en **<100ms**
- Tourne sur **CPU** (pas besoin de GPU)
- **120MB** de RAM seulement
- **100% local** et offline

**C'est prêt !** Lance et teste 🚀
