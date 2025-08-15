# PWA Deployment for Heroes of Time

## Files Created

✅ **manifest.json** - PWA configuration
✅ **sw.js** - Service Worker for offline support  
✅ **icons/icon-192.png** - App icon (42KB)
✅ **icons/icon-512.png** - App icon HD (363KB)

Icons created from: `/Volumes/HOT_DEV/Main/SpinForest/REALGAME/HeroesOfTime.app/Contents/Resources/HOURGLASS.icns`

## Deploy to VPS

```bash
# Deploy PWA files to root
rsync -avz manifest.json sw.js icons/ hot@heroesoftime.online:/opt/hot/app/

# Or if SSH key works:
rsync -avz -e "ssh -i ~/.ssh/id_ed25519" manifest.json sw.js icons/ hot@heroesoftime.online:/opt/hot/app/
```

## Update Caddy Config on VPS

Add to `/etc/caddy/Caddyfile`:

```
# PWA files at root
handle /manifest.json {
    root * /opt/hot/app
    file_server
    header Content-Type "application/json"
}

handle /sw.js {
    root * /opt/hot/app
    file_server
    header Content-Type "application/javascript"
}

handle /icons/* {
    root * /opt/hot/app
    file_server
}
```

## Update index.html

Add to `<head>` in FRONTPAGE/index.html:

```html
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#000000">

<!-- iOS -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<link rel="apple-touch-icon" href="/icons/icon-192.png">

<!-- Register Service Worker -->
<script>
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}
</script>
```

## Test PWA

1. **Chrome Desktop**: Menu → Install Heroes of Time
2. **iOS Safari**: Share → Add to Home Screen
3. **Android Chrome**: Menu → Add to Home Screen

## Verify URLs

These should work:
- https://heroesoftime.online/manifest.json
- https://heroesoftime.online/sw.js
- https://heroesoftime.online/icons/icon-192.png
- https://heroesoftime.online/icons/icon-512.png
