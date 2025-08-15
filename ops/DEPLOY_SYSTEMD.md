# Deploy systemd services (Rust + Java)

This sets up the Magic Stack backends as systemd services on a Linux VPS. It does not affect the front page or SPA routing.

## Prerequisites
- OS: Ubuntu/Debian (systemd)
- Packages: git, curl, lsof, openjdk-21-jre, build-essential, cargo, maven
- Repo cloned to `/opt/magic-stack` (or adjust paths accordingly)

## Layout used
- Rust: `/opt/magic-stack/backends/rust`
- Java: `/opt/magic-stack/backends/java`
- Ops scripts: `/opt/magic-stack/ops`

## One-shot install (run on VPS)
```bash
# Pull latest
cd /opt/magic-stack && git fetch --all && git checkout prod && git pull --ff-only

# Build binaries
cd backends/rust && cargo build --release
cd ../java && mvn -DskipTests package

# Install unit files and scripts
sudo install -d -m 0755 /opt/magic-stack/ops
sudo install -m 0755 /opt/magic-stack/ops/prestart_port_guard.sh /opt/magic-stack/ops/prestart_port_guard.sh
sudo install -m 0755 /opt/magic-stack/ops/healthcheck.sh /opt/magic-stack/ops/healthcheck.sh
sudo install -m 0644 /opt/magic-stack/ops/systemd/magic-rust.service /etc/systemd/system/magic-rust.service
sudo install -m 0644 /opt/magic-stack/ops/systemd/magic-java.service /etc/systemd/system/magic-java.service

# Reload systemd
sudo systemctl daemon-reload

# Start Rust first, then Java
sudo systemctl enable --now magic-rust.service
sleep 2
sudo systemctl enable --now magic-java.service

# Verify
/opt/magic-stack/ops/healthcheck.sh || true
curl -sSf http://localhost:8082/api/magic/health | jq . || curl -sSf http://localhost:8082/api/magic/health
```

## Port guard
- Both services call `ops/prestart_port_guard.sh` to kill any process already bound to their port (3001 for Rust, 8082 for Java) before starting.

## Service management
```bash
sudo systemctl status magic-rust.service
sudo systemctl status magic-java.service

sudo journalctl -u magic-rust.service -f
sudo journalctl -u magic-java.service -f

sudo systemctl restart magic-rust.service
sudo systemctl restart magic-java.service
```

## Rollback
- Stop services:
```bash
sudo systemctl stop magic-java.service
sudo systemctl stop magic-rust.service
```
- Revert git to previous tag/commit, rebuild, restart.

## Notes
- Frontend/FRONTPAGE are static and unaffected by these services. SPA behavior (no URL changes, back button works) remains intact.
- For production, consider running Java with a constrained heap and GC tuning (e.g., `-XX:MaxRAMPercentage=60`).
- If `lsof` is missing: `sudo apt-get install -y lsof`.
