# 🚀 DEVOPS SIMPLE - HEROES OF TIME
> Guide clair et direct pour Vincent et l'équipe - Mis à jour 14/08/2025

---

## 🔑 CONNEXION AU VPS (Super Important!)

```bash
ssh -i ~/.ssh/hot_magic_key root@191.101.2.178
```

**Si ça marche pas :**
1. Va sur console Hostinger
2. Connecte-toi en root
3. Colle : `echo "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIBtlP4hW+7uJPXxp2elYTz71mNgKbFlfwXXSHVARJeZs vincent@magic" >> /root/.ssh/authorized_keys`

---

## 🎮 COMMANDES PRINCIPALES

### LANCER LE JEU EN LOCAL
```bash
./go start     # Lance TOUT (backends + frontend)
./go game      # Ouvre direct le jeu dans le navigateur
./go stop      # Arrête tout proprement
```

### DÉPLOYER SUR LE VPS
```bash
./deploy vps    # Deploy rapide (juste les fichiers)
./deploy full   # Build + deploy complet
./deploy health # Vérifier que tout marche
```

---

## 📦 ORGANISATION DES FICHIERS

### CE QUI EST IMPORTANT :
```
magic-stack/
├── 🎮 FRONTPAGE/         → Page d'accueil du jeu
├── 🚀 go                 → Script pour lancer en local
├── 🚀 deploy             → Script pour déployer
├── 📝 DEVOPS.md          → CE FICHIER
├── 📝 CONNECT_111.md     → Doc connexion SSH
└── 🗺️ .sitemap           → Carte de toutes les pages
```

### OÙ SONT LES TRUCS :
- **Jeux HTML** : À la racine (*.html)
- **React Apps** : Dans `apps/`
- **Backends** : Dans `backends/` (Java, Rust, Python)
- **Vieux scripts** : Archivés dans `scripts_old/`
- **Vieux docs** : Archivés dans `docs_archive/`

---

## 🌐 URLS DU SITE

### PRODUCTION (heroesoftime.online)
- **Page d'accueil** : https://heroesoftime.online/FRONTPAGE/
- **Jeu principal** : https://heroesoftime.online/HOT_GAME_UNIFIED.html
- **Combat IA** : https://heroesoftime.online/IA_VS_IA_AUTOPLAY.html
- **Multijoueur** : https://heroesoftime.online/MULTIPLAYER_DEMO_HOMM3.html

### LOCAL (ton Mac)
- **Tout** : http://localhost:8000
- **API Java** : http://localhost:8082
- **Engine Rust** : http://localhost:3001
- **Vector DB** : http://localhost:7500

---

## 🔧 SCRIPTS ESSENTIELS

### Les 3 scripts principaux :
1. **`go`** - Pour bosser en local
2. **`deploy`** - Pour déployer sur le VPS
3. **`h`** - Helper avec plein de commandes

### Scripts de déploiement qui restent :
- `DEPLOY_SIMPLE.sh` - Deploy basique
- `HEALTH_CHECK.sh` - Vérifier santé du site
- `TEST_SSH.sh` - Tester connexion SSH

---

## 🆘 PROBLÈMES FRÉQUENTS

### "Je peux pas me connecter au VPS"
```bash
./TEST_SSH.sh  # Test la connexion
```

### "Le site marche pas"
```bash
./HEALTH_CHECK.sh  # Vérifie toutes les pages
```

### "J'ai cassé la page d'accueil"
```bash
# Restaurer depuis backup
cp backups/2024-08-14/index.html.backup-* FRONTPAGE/index.html
./deploy vps
```

### "Les backends sont morts"
```bash
# Sur le VPS
ssh -i ~/.ssh/hot_magic_key root@191.101.2.178
systemctl restart caddy magic-java magic-rust magic-vector magic-clippy
```

---

## 📊 VÉRIFIER QUE TOUT MARCHE

### Check rapide local :
```bash
./go status
```

### Check complet VPS :
```bash
./deploy health
```

### Voir les logs VPS :
```bash
ssh -i ~/.ssh/hot_magic_key root@191.101.2.178 "journalctl -fu caddy"
```

---

## 🔐 INFOS IMPORTANTES

### Serveur VPS
- **IP** : 191.101.2.178
- **Domaine** : heroesoftime.online
- **User** : root (ou hot)
- **Clé SSH** : ~/.ssh/hot_magic_key

### Ports des services
- **80/443** : Caddy (reverse proxy)
- **8082** : Java API
- **3001** : Rust Engine
- **7500** : Vector DB
- **7777** : Clippy AI

### GitHub
- **Repo** : https://github.com/V0OgZ/magic-stack
- **Branch** : prod (principale)

---

## 💡 TIPS POUR VINCENT

1. **TOUJOURS faire un backup avant de modifier FRONTPAGE**
   ```bash
   ./deploy backup
   ```

2. **Si tu modifies sur le VPS directement**, dis-le à Claude/GPT pour pas écraser

3. **Le script `go` fait TOUT** - Plus besoin des 57 autres scripts

4. **Si Cursor déconnecte**, vérifie que t'es bien sur Opus (pas Sonnet)

5. **Les outils dev sont cachés** dans la page d'accueil (bouton "Outils Développeur")

---

## 📝 COMMANDES RAPIDES À COPIER

```bash
# Connexion VPS
ssh -i ~/.ssh/hot_magic_key root@191.101.2.178

# Lancer local
./go start

# Déployer
./deploy vps

# Vérifier santé
./HEALTH_CHECK.sh

# Git push
git add -A && git commit -m "update" && git push
```

---

**C'EST TOUT !** Si t'as un problème, regarde d'abord ici. 
Si c'est pas là, demande à Claude Opus (pas Sonnet!).

🎮 **Bon dev Vincent !**