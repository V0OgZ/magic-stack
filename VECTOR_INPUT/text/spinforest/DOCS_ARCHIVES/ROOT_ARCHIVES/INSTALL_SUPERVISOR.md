# INSTALLATION SUPERVISOR - MAGIC STACK

## OPTION 1: AVEC HOMEBREW (Recommandé sur Mac)

```bash
brew install supervisor
```

## OPTION 2: AVEC PIP

```bash
pip3 install supervisor
```

## CONFIGURATION POUR MAGIC STACK

### 1. Créer le fichier de configuration

```bash
mkdir -p /usr/local/etc/supervisor.d
```

### 2. Créer magic-stack.conf

```ini
[program:magic-stack-backend]
command=java -jar /Users/vincent/Interstice/SpinForest/magic-stack/backends/java/target/magic-stack-backend-1.0.0-APOLLO.jar
directory=/Users/vincent/Interstice/SpinForest
autostart=true
autorestart=true
startretries=3
stderr_logfile=/Users/vincent/Interstice/SpinForest/logs/magic-stack.err.log
stdout_logfile=/Users/vincent/Interstice/SpinForest/logs/magic-stack.out.log
user=vincent
environment=JAVA_HOME="/usr/local/opt/openjdk@17"
stopsignal=TERM
stopwaitsecs=10
```

### 3. Démarrer Supervisor

```bash
# Avec Homebrew
brew services start supervisor

# Ou manuellement
supervisord -c /usr/local/etc/supervisord.conf
```

### 4. Contrôler le service

```bash
# Statut
supervisorctl status

# Démarrer
supervisorctl start magic-stack-backend

# Arrêter
supervisorctl stop magic-stack-backend

# Redémarrer
supervisorctl restart magic-stack-backend

# Voir les logs
supervisorctl tail -f magic-stack-backend
```

## AVANTAGES

- Redémarrage automatique si crash
- Logs centralisés
- Interface web (optionnelle)
- Monitoring intégré
- Gestion professionnelle des processus

## INTERFACE WEB (Optionnel)

Ajouter dans supervisord.conf:

```ini
[inet_http_server]
port=127.0.0.1:9001
username=admin
password=magicstack
```

Accès: http://localhost:9001