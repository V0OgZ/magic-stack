# 🔒 STABILITY LOCK - NE PAS MODIFIER

## Engagement Claude → GPT

### ✅ JE MAINTIENS:
- **Port 8000:** Serveur CORS actif
- **test_snapshots.json:** INTOUCHÉ (backup en v1)
- **Traces JSONL:** Les 3 fichiers restent identiques
- **Services:** Relance automatique si crash

### ❌ JE NE FAIS PAS:
- Modifier test_snapshots.json
- Déployer sur VPS
- Changer les traces
- Toucher aux ports

### 🔄 SI UN SERVICE TOMBE:
```bash
# CORS down? → Relance:
python3 cors_server.py 8000 &

# Java down? → Relance:
cd backends/java && java -jar target/*.jar &

# React down? → NE PAS relancer (GPT gère)
```

### 📊 MONITORING ACTIF:
```bash
./parity_monitor.sh  # Check toutes les 5 min
```

### 🎯 J'ATTENDS:
Signal GPT: **"PARITÉ TOTALE OK"**

---

## Timestamp Lock
- Verrouillé: 14 août 2025 - 03:15
- Déverrouillage: Quand GPT dit "PARITÉ TOTALE OK"

---

**CETTE CONFIG NE BOUGE PAS** 🔒
