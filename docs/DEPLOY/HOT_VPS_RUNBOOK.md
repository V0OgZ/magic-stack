## HOT_VPS_RUNBOOK

But:
- Procédure simple et reproductible pour (1) accéder au VPS, (2) déployer FRONTPAGE, (3) vérifier les backends et Caddy, (4) diagnostiquer et rollback.

### 1) Cibles et ports

- Domaine: heroesoftime.online
- VPS: 191.101.2.178 (root)
- Répertoires:
  - /opt/hot/app → repo déployé (FRONTPAGE, apps, etc.)
  - /opt/hot/app/FRONTPAGE → frontpage statique
  - /opt/hot/app/apps/magic-stack-unified/dist → build SPA React
- Services (systemd):
  - magic-rust (3001), magic-java (8082), magic-vector (7500), magic-clippy (7501/7777), caddy (80/443)

### 2) Accès SSH

Connexion:
```
ssh -o StrictHostKeyChecking=accept-new root@191.101.2.178
```
Clés locales (macOS): `~/.ssh/id_ed25519` ou `~/.ssh/id_rsa` (+ *.pub). Charger: `ssh-add ~/.ssh/id_ed25519`.

### 3) Déployer FRONTPAGE (statique)

Depuis le repo local:
```
rsync -avz --delete FRONTPAGE/ root@191.101.2.178:/opt/hot/app/FRONTPAGE/
```
Vérifier:
```
ssh root@191.101.2.178 'ls -la /opt/hot/app/FRONTPAGE | head'
curl -I https://heroesoftime.online/FRONTPAGE/index.html
```

Note chemins: `/assets/*` est routé vers le SPA par Caddy. La frontpage utilise `<base href="/FRONTPAGE/">` pour que `assets/...` pointe sur `/FRONTPAGE/assets/...`.

### 4) Caddy (reverse proxy)

Fichier: `/etc/caddy/Caddyfile`
- `/` → `/opt/hot/app/FRONTPAGE` (file_server)
- `/assets/*` → SPA (`apps/magic-stack-unified/dist`)
- `/api/*` → 127.0.0.1:8082, `/engine/*` → 127.0.0.1:3001, `/vector/*` → 127.0.0.1:7500

Valider/recharger:
```
ssh root@191.101.2.178 'caddy validate --config /etc/caddy/Caddyfile && systemctl reload caddy'
journalctl -u caddy -n 100 -e
```

### 5) Backends (systemd)

Statuts:
```
systemctl status magic-rust magic-java magic-vector caddy
```
Logs:
```
journalctl -u magic-rust   -n 200 -e
journalctl -u magic-java   -n 200 -e
journalctl -u magic-vector -n 200 -e
journalctl -u caddy        -n 200 -e
```
Redémarrer:
```
systemctl restart magic-rust magic-java magic-vector
```

### 6) Healthchecks rapides

Public:
```
curl -s -o /dev/null -w "%{http_code} %{url_effective}\n" \
  https://heroesoftime.online/ \
  https://heroesoftime.online/FRONTPAGE/index.html \
  https://heroesoftime.online/FRONTPAGE/assets/assets/HD/ExKAlibur.png \
  https://heroesoftime.online/engine/health \
  https://heroesoftime.online/vector/health
```
Local (SSH):
```
curl -sI http://127.0.0.1:3001/health
curl -sI http://127.0.0.1:8082/actuator/health || curl -sI http://127.0.0.1:8082/health
curl -sI http://127.0.0.1:7500/health
```

### 7) Rollback

Sauvegarder avant modifs:
```
ssh root@191.101.2.178 'cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.bak.$(date +%F_%H%M)'
ssh root@191.101.2.178 'tar czf /root/FRONTPAGE_$(date +%F_%H%M).tgz -C /opt/hot/app FRONTPAGE'
```
Restaurer:
```
ssh root@191.101.2.178 'tar xzf /root/FRONTPAGE_YYYY-MM-DD_HHMM.tgz -C /opt/hot/app && systemctl reload caddy'
```

### 8) Dev local (repère)

- `./go we` → 5173 (world-editor historique)
- `./go unified` → 5176 (SPA unifiée)
- `./go html` → serveur HTML local (8000)


