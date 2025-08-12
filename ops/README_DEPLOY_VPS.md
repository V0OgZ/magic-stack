# Déploiement VPS — Magic Stack (Ops Notes)

## Arborescence cible (VPS)
```
/opt/hot/
  app/                # repo cloné
  venv-vector/        # venv Vector DB
  venv-clippy/        # venv Clippy
```

## Préparation
```
sudo mkdir -p /opt/hot
cd /opt/hot
sudo chown -R $USER:$USER /opt/hot

git clone https://github.com/V0OgZ/magic-stack app
cd app
bash deploy_all.sh
```

## systemd
Copiez les units:
```
sudo cp ops/systemd/magic-*.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now magic-vector.service
sudo systemctl enable --now magic-clippy.service
sudo systemctl enable --now magic-java.service
sudo systemctl enable --now magic-rust.service
```

## Caddy (exemple)
```
:80 {
  encode zstd gzip
  handle_path /engine* {
    reverse_proxy 127.0.0.1:3001
  }
  handle_path /api* {
    reverse_proxy 127.0.0.1:8082
  }
  handle_path /vector* {
    reverse_proxy 127.0.0.1:7500
  }
  handle_path /clippy* {
    reverse_proxy 127.0.0.1:7777
  }
}
```

## Vector index
Pour inclure plus de docs, déposez vos fichiers dans `app/vector_content/` puis:
```
cd /opt/hot/app
python3 scripts/vector_db/build_index.py
sudo systemctl restart magic-vector.service
```

## Dépannage
- Clippy status=1: `journalctl -u magic-clippy.service -n 100 -e`
  - Vérifiez le venv: `/opt/hot/venv-clippy/bin/python -c "import flask, flask_cors, sentence_transformers; print('OK')"`
- Vector 7500 down: `journalctl -u magic-vector.service -n 100 -e`
- Java: `journalctl -u magic-java.service -n 100 -e`
- Rust: `journalctl -u magic-rust.service -n 100 -e`

## Notes
- En prod, `docs_shared` peut ne pas exister: le serveur Vector utilisera l’index JSONL si présent.
- Clippy peut fonctionner sans LLM lourd; `sentence-transformers` léger est suffisant.


