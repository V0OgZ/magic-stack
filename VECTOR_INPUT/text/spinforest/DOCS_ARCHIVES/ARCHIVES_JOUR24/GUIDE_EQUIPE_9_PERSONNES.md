# 📚 GUIDE POUR L'ÉQUIPE - 9 PERSONNES

## 🗺️ CARTE COMPLÈTE DES BACKENDS

```
SpinForest/ (Repo principal: github.com/V0OgZ/SpinForest)
│
├── spells/stack/ (Git Submodule - Magic Stack)
│   ├── backends/
│   │   ├── java/ .............. PORT 8082 (Formules magiques)
│   │   └── rust/ .............. PORT 3001 (Calculs Q*)
│   ├── magic_router.py ........ PORT 5000 (Router Python)
│   └── launch_magic_stack.sh .. Lance tout Magic Stack
│
├── avalon-backend/ ............ PORT 8080 (JEU REALGAME)
│   ├── src/main/java/com/avalon/
│   │   ├── controllers/ ....... Contrôleurs du jeu
│   │   └── services/engines/ .. Moteurs GROFI, Temporal
│   └── pom.xml
│
├── SCRIPTS CRÉÉS PAR URZ-KÔM:
│   ├── LANCE_TOUT_CORRECTEMENT.sh ... Lance TOUS les backends
│   ├── COMPILE_TOUT.sh .............. Compile tout
│   ├── START_ALL_STACK.sh ........... Lance Magic Stack
│   ├── STOP_ALL_STACK.sh ............ Arrête tout
│   ├── STATUS_STACK.sh .............. Vérifie l'état
│   └── TEST_TOUT_COMPLET.sh ......... Teste tout
│
└── logs/ ...................... Tous les logs ici
```

## 🎯 QUI FAIT QUOI

### Magic Stack (FONCTIONNE ✅)
- **Rôle**: Moteur des 869 formules magiques
- **Ports**: 
  - Java: 8082
  - Rust: 3001  
  - Router Python: 5000
- **Chemin**: `spells/stack/`

### Avalon Backend (RÉPARÉ ✅)
- **Rôle**: LE JEU - Combat TCG, carte hex, minimap
- **Port**: 8080
- **Chemin**: `avalon-backend/`

## 🚀 COMMANDES ESSENTIELLES

### Pour TOUT lancer:
```bash
./LANCE_TOUT_CORRECTEMENT.sh
```

### Pour compiler:
```bash
./COMPILE_TOUT.sh
```

### Pour vérifier l'état:
```bash
./STATUS_STACK.sh
```

### Pour arrêter tout:
```bash
./STOP_ALL_STACK.sh
```

## 📊 VÉRIFICATION DES SERVICES

| Service | URL de test | Doit répondre |
|---------|-------------|---------------|
| Avalon Backend | http://localhost:8080/ | "🌀 AVALON Backend" |
| Magic Stack Java | http://localhost:8082/api/magic/health | "MAGICAL" |
| Magic Stack Rust | http://localhost:3001/health | "OK" |
| Python Router | http://localhost:5000/health | "Router Operational" |

## ⚠️ PROBLÈMES FRÉQUENTS

1. **Port déjà utilisé**: Tuer les anciens processus
   ```bash
   pkill -f spring-boot
   pkill -f magic-stack
   ```

2. **Avalon ne compile pas**: Les fichiers ont été réparés depuis `backup-avant-fix`

3. **Terminal bloqué avec `dquote>`**: Fermer et rouvrir le terminal

## 📝 CE QUI A ÉTÉ FAIT AUJOURD'HUI

1. ✅ Nettoyé les backends doublons
2. ✅ Réparé Avalon Backend (méthodes manquantes)
3. ✅ Créé un router Python pour Magic Stack
4. ✅ Fixé les ports (8080 pour Avalon, 8082 pour Magic)
5. ✅ Créé des scripts pour tout gérer

## 🔧 ARCHITECTURE FINALE

```
                [Client/Frontend]
                       |
        +--------------+--------------+
        |                             |
[Magic Stack :5000]           [Avalon Backend :8080]
   (Router Python)               (Spring Boot)
        |                             |
   +----+----+                   [LE JEU]
   |         |                   - Combat TCG
Java:8082  Rust:3001            - Carte Hex
(Formules) (Q* Algo)            - Minimap
```

## 👥 POUR L'ÉQUIPE

- **Backend cassé ?** → Utilisez `backup-avant-fix` 
- **Besoin des logs ?** → Regardez dans `./logs/`
- **Port occupé ?** → `lsof -i :NUMERO_PORT`

## 📞 CONTACTS TECHNIQUES

- Magic Stack: URZ-KÔM (Leader Backend)
- Avalon Backend: À définir
- Frontend: À définir

---
*Document créé le 5 août 2025 pour l'équipe de 9 personnes*