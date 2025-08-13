# 🌐 HEROSOFTIME.ONLINE - DEPLOYMENT GUIDE

## 🎉 DOMAINE ACHETÉ!
**herosoftime.online** → Propriété de Vincent

---

## 📦 STRUCTURE PROPOSÉE

```
herosoftime.online/
├── /                     → Landing page (FRONTPAGE)
├── /editor/              → Workflow Manager
├── /world-editor/        → WorldEditor hexagonal
├── /map-placer/          → MAP_ICON_PLACER
├── /play/                → CHASSE_TEMPORELLE (jeu)
├── /api/                 → Backend APIs
│   ├── /v2/              → Rust (3001)
│   └── /magic/           → Java (8082)
├── /docs/                → Documentation
└── /download/            → Client à télécharger

```

---

## 🚀 DEPLOYMENT RAPIDE

### Option 1: GitHub Pages (GRATUIT)
```bash
# Dans le repo
git checkout -b gh-pages
cp -r FRONTPAGE/* .
cp WORKFLOW_MANAGER.html editor.html
cp CHASSE_TEMPORELLE_MEGA_MAP.html play.html

git add -A
git commit -m "Deploy to herosoftime.online"
git push origin gh-pages
```

### Option 2: Netlify (SIMPLE)
```bash
# Build command
npm run build

# Publish directory
dist/

# Drag & drop dans Netlify
# Configure domaine custom
```

### Option 3: VPS (COMPLET)
```bash
# Sur un VPS Ubuntu/Debian
sudo apt update
sudo apt install nginx nodejs npm

# Clone repo
git clone https://github.com/V0OgZ/magic-stack.git
cd magic-stack

# Start services
./go start

# Configure Nginx
sudo nano /etc/nginx/sites-available/herosoftime
```

---

## 📝 NGINX CONFIG

```nginx
server {
    listen 80;
    server_name herosoftime.online www.herosoftime.online;

    # Frontend static
    location / {
        root /var/www/herosoftime/frontend;
        try_files $uri $uri/ /index.html;
    }

    # Rust backend
    location /api/v2/ {
        proxy_pass http://localhost:3001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
    }

    # Java backend
    location /api/magic/ {
        proxy_pass http://localhost:8082/;
    }

    # WebSocket
    location /ws/ {
        proxy_pass http://localhost:8001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

---

## 🔒 HTTPS avec Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d herosoftime.online -d www.herosoftime.online
```

---

## 🎮 URLS FINALES

- https://herosoftime.online → Landing page
- https://herosoftime.online/editor → Créer des maps
- https://herosoftime.online/play → Jouer en ligne
- https://api.herosoftime.online → Backend APIs

---

## 📱 PROGRESSIVE WEB APP

Ajouter dans `index.html`:
```html
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#764ba2">
```

`manifest.json`:
```json
{
  "name": "Heroes of Time",
  "short_name": "HoT",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#764ba2",
  "background_color": "#000000",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

---

## 🚢 COMMANDE DEPLOY

```bash
# Créer script deploy.sh
./deploy.sh production
```

---

## 💡 NEXT STEPS

1. [ ] Configurer DNS chez ton registrar
2. [ ] Choisir hébergement (GitHub Pages/Netlify/VPS)
3. [ ] Déployer version beta
4. [ ] Activer HTTPS
5. [ ] Monitoring avec Uptime Robot

---

**FÉLICITATIONS POUR LE DOMAINE!** 🎊
