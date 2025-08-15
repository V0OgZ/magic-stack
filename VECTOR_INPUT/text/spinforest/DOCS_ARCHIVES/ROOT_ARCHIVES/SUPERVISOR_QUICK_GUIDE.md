# SUPERVISOR - GUIDE RAPIDE

## INSTALLATION

```bash
./INSTALL_SUPERVISOR.sh
```

## COMMANDES ESSENTIELLES

### Voir le statut
```bash
supervisorctl status
```

### Démarrer/Arrêter/Redémarrer
```bash
supervisorctl start magic-stack-backend
supervisorctl stop magic-stack-backend
supervisorctl restart magic-stack-backend
```

### Voir les logs en temps réel
```bash
supervisorctl tail -f magic-stack-backend
```

### Interface web
Ouvrir: http://localhost:9001
Login: admin / magicstack

## AVANTAGES vs LANCE_BACKEND_RESISTANT.sh

| Caractéristique | Script actuel | Supervisor |
|-----------------|---------------|------------|
| Redémarrage auto | ❌ | ✅ |
| Logs rotatifs | ❌ | ✅ |
| Interface web | ❌ | ✅ |
| Monitoring | Basic | Complet |
| Multi-services | ❌ | ✅ |

## CONFIGURATION

Le fichier de config est dans:
```
/usr/local/etc/supervisor.d/magic-stack.conf
```

Pour modifier, éditer puis:
```bash
supervisorctl reread
supervisorctl update
```

## LOGS

Les logs sont dans:
- `/Users/vincent/Interstice/SpinForest/logs/magic-stack.out.log`
- `/Users/vincent/Interstice/SpinForest/logs/magic-stack.err.log`

Rotation automatique à 10MB, garde 10 backups.

---

*Supervisor = Gestion professionnelle du backend*