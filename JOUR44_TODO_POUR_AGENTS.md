# 🎯 JOUR 44 - INSTRUCTIONS POUR LES AGENTS IA
*15 Août 2025 - À faire en priorité*

## 🤖 POUR TOUT NOUVEL AGENT (Claude, GPT, ou autre)

### 📍 OÙ ON EN EST
- **Projet**: Heroes of Time - Jeu TCG/Stratégie web
- **Site**: https://heroesoftime.online
- **État**: 90% fonctionnel, quelques bugs à corriger
- **SSH**: Utilisez `~/.ssh/hot_magic_key` (pas de mot de passe)

### 🔑 ACCÈS RAPIDES
```bash
# SSH vers VPS
ssh -i ~/.ssh/hot_magic_key root@191.101.2.178

# Deploy rapide
./deploy vps

# Status services
./go status

# Lancer tout en local
./go start
```

## 🔴 BUGS CRITIQUES À FIXER (PRIORITÉ 1)

### 1. World Editor - Page Blanche
**Problème**: https://heroesoftime.online/world-editor/ affiche page blanche
**Solution**:
```bash
# 1. Vérifier local
cd apps/world-editor
npm run build
npm run dev
# Tester: http://localhost:5173

# 2. Si OK, fix sur VPS
ssh -i ~/.ssh/hot_magic_key root@191.101.2.178
cd /opt/hot/app/magic-stack/apps/world-editor
npm install
npm run build
systemctl restart caddy
```

### 2. Rust Cargo Path sur VPS
**Problème**: `cargo: command not found` lors du VPS_SAFE_SYNC
**Solution**:
```bash
ssh -i ~/.ssh/hot_magic_key root@191.101.2.178
# Ajouter dans ~/.bashrc:
export PATH="$HOME/.cargo/bin:$PATH"
source ~/.bashrc
```

## 🟡 TÂCHES IMPORTANTES (PRIORITÉ 2)

### Pour CLAUDE (ou agent Frontend/UX)
1. **Debugger World Editor** (voir ci-dessus)
2. **Créer guide joueur simple**:
   - Fichier: `FRONTPAGE/guide-joueur.html`
   - Style cohérent avec Spells Lab
   - Expliquer: comment jouer, créer des decks, lancer sorts

3. **Optimiser performances React**:
   - Lazy loading des images
   - Code splitting
   - Minification assets

### Pour GPT (ou agent Backend/Engine)
1. **Finaliser Formula Registry**:
   - Connecter Vector DB
   - Indexer toutes les formules
   - API de recherche

2. **Tests de parité**:
   - Exécuter `test_parity.html`
   - Valider avec `test_snapshots.json`
   - Corriger divergences

3. **Monitoring API**:
   - Ajouter endpoints `/metrics`
   - Logger erreurs proprement
   - Dashboard simple

## 🟢 NICE TO HAVE (PRIORITÉ 3)

1. **Mobile responsive** - Tester sur iPhone/Android
2. **PWA manifest** - Pour installation mobile
3. **Analytics** - Comprendre usage joueurs
4. **Backup automatique** - Script cron quotidien

## 📂 FICHIERS IMPORTANTS

### Configuration
- `.connectvps` - Infos connexion VPS
- `DEVOPS.md` - Guide DevOps complet
- `.sitemap` - Structure complète du site

### Coordination Multi-Agents
- `.dualclaude` - Instructions pour Claude
- `.dualgpt` - Instructions pour GPT
- `.dualstatus` - État actuel de la collaboration
- `JOUR43_STATUS_ET_PLAN.md` - Rapport détaillé

### Scripts Principaux
- `go` - Script principal (start/stop/status/deploy)
- `deploy` - Deploy vers VPS
- `VPS_SAFE_SYNC.sh` - Sync Git sur VPS (installé)

## ⚠️ RÈGLES IMPORTANTES

1. **NE JAMAIS** modifier directement sur le VPS sans backup
2. **NE JAMAIS** toucher aux configs Caddy sur VPS
3. **TOUJOURS** tester en local avant deploy
4. **TOUJOURS** utiliser `./deploy vps` pour déployer
5. **TOUJOURS** faire `git pull` avant de commencer

## 🎯 OBJECTIF FIN DE JOURNÉE

Le site doit être 100% fonctionnel avec:
- ✅ World Editor qui marche
- ✅ Tous les services actifs
- ✅ Guide joueur disponible
- ✅ Tests de parité validés
- ✅ Performance acceptable (<3s chargement)

## 💬 CONTACT

Si problème ou question:
1. Lire `DEVOPS.md` d'abord
2. Vérifier `.sitemap` pour structure
3. Regarder logs: `./go status` puis vérifier `/logs/*.log`
4. Si VPS down: `ssh -i ~/.ssh/hot_magic_key root@191.101.2.178 "systemctl status"`

## 🚀 COMMANDE POUR COMMENCER

```bash
# 1. Pull derniers changements
git pull

# 2. Vérifier état local
./go status

# 3. Si services down
./go start

# 4. Commencer par Bug #1 (World Editor)
cd apps/world-editor
npm run dev
```

---

**BON COURAGE AGENT ! Vincent compte sur vous. 🎮**

*PS: Le code est complexe mais bien organisé. Prenez le temps de comprendre avant de modifier.*
