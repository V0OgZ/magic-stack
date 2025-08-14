# 🚀 CONNECT 111 - ACCÈS VPS RAPIDE
> Doc simple et direct pour Vincent - 14/08/2025

## 1️⃣ CONNEXION SSH (sans mot de passe)
```bash
ssh -i ~/.ssh/hot_magic_key root@191.101.2.178
```

## 2️⃣ DÉPLOYER TOUT
```bash
./DEPLOY_SIMPLE.sh
```

## 3️⃣ TESTER
Ouvre dans ton navigateur:
- https://heroesoftime.online
- https://heroesoftime.online/FRONTPAGE/

---

## 🔧 SI PROBLÈME SSH

### Recréer la clé:
```bash
ssh-keygen -t ed25519 -f ~/.ssh/hot_magic_key -N "" -C "vincent@magic"
cat ~/.ssh/hot_magic_key.pub
```

### Ajouter sur VPS (via console Hostinger):
```bash
echo "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIBtlP4hW+7uJPXxp2elYTz71mNgKbFlfwXXSHVARJeZs vincent@magic" >> /root/.ssh/authorized_keys
```

---

## 📦 DÉPLOIEMENT MANUEL

### FRONTPAGE uniquement:
```bash
rsync -avz -e "ssh -i ~/.ssh/hot_magic_key" FRONTPAGE/ root@191.101.2.178:/opt/hot/app/FRONTPAGE/
```

### Tous les HTML:
```bash
rsync -avz -e "ssh -i ~/.ssh/hot_magic_key" *.html root@191.101.2.178:/opt/hot/app/
```

### React build:
```bash
cd apps/magic-stack-unified
npm run build
rsync -avz -e "ssh -i ~/.ssh/hot_magic_key" dist/ root@191.101.2.178:/opt/hot/app/apps/magic-stack-unified/dist/
```

---

## 🔄 COMMANDES UTILES SUR LE VPS

### Redéployer tout (git pull + build + restart):
```bash
ssh -i ~/.ssh/hot_magic_key root@191.101.2.178 "/usr/local/bin/hot-redeploy"
```

### Vérifier statut:
```bash
ssh -i ~/.ssh/hot_magic_key root@191.101.2.178 "/usr/local/bin/hot-check"
```

### Logs en direct:
```bash
ssh -i ~/.ssh/hot_magic_key root@191.101.2.178 "journalctl -fu caddy"
```

---

## ✅ SERVICES ACTIFS
- **Caddy** (reverse proxy) → Port 443/80
- **magic-java** → Port 8082
- **magic-rust** → Port 3001
- **magic-vector** → Port 7500
- **magic-clippy** → Port 7777

## 🌐 HEALTH CHECK
- https://heroesoftime.online/api/health (Java)
- https://heroesoftime.online/engine/health (Rust)
- https://heroesoftime.online/vector/health (Vector DB)
- https://heroesoftime.online/clippy/health (AI)

---

**C'EST TOUT !** 🎮