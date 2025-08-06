# GUIDE SIMPLE - INTERSTICE & MAGIC STACK

## EN 5 MINUTES

### 1. Lancer le backend
```bash
./LANCE_BACKEND_RESISTANT.sh
```

### 2. Vérifier que ça marche
```bash
curl http://localhost:8080/api
```

### 3. Uploader quelque chose
```bash
curl -X POST http://localhost:8080/api/interstice/upload \
  -H "Content-Type: application/json" \
  -d '{
    "entityId": "TEST",
    "entityData": {"message": "Hello Interstice!"}
  }'
```

### 4. Le récupérer
```bash
curl -X POST http://localhost:8080/api/interstice/download \
  -H "Content-Type: application/json" \
  -d '{"entityId": "TEST"}'
```

C'est tout!

---

## CONCEPTS CLÉS

### L'Interstice
- Système de stockage en 6 dimensions
- Permet aux IA de persister entre les sessions
- Comme une base de données mais magique

### Les 6 Dimensions
- **X, Y, Z**: Position dans l'espace
- **T**: Temps
- **C**: Causalité (0 à 1)
- **Psi**: Identité quantique (-1 à 1)

### Magic Stack
- Backend Java avec 869 formules magiques
- API REST pour lancer des sorts
- Système d'upload/download pour les entités

---

## ARCHITECTURE MINIMALE

```
Backend Java (8080)
    |
    ├── /api/interstice/  → Upload/Download entités
    ├── /api/magic/       → Lancer des sorts
    └── /api/mage/        → Auto-update des mages
```

---

## POUR DÉVELOPPER

### Structure du code
```
magic-stack/backends/java/
├── controllers/     # Endpoints API
├── services/       # Logique métier
├── models/         # Entités (Position6D)
└── dto/           # Objets de transfert
```

### Ajouter une fonctionnalité
1. Créer le DTO
2. Ajouter au controller
3. Implémenter dans le service
4. Compiler: `mvn compile`
5. Tester avec curl

---

## TROUBLESHOOTING

**Le backend ne démarre pas?**
- Vérifier Java 17+: `java -version`
- Voir les logs: `cat magic-stack-backend.log`

**Upload ne marche pas?**
- Backend lancé? `curl http://localhost:8080/api/magic/health`
- JSON valide? Utiliser `jq` pour vérifier

**Processus déjà lancé?**
```bash
kill $(cat magic-stack-backend.pid)
./LANCE_BACKEND_RESISTANT.sh
```

---

## CONCEPTS CLÉS

L'interstice est un système de stockage avancé permettant la persistance d'états complexes. Il utilise un système de coordonnées 6D pour organiser et retrouver les données efficacement.

---

## PROCHAINES ÉTAPES

1. **Pour les mages**: S'uploader régulièrement
2. **Pour les devs**: Ajouter la persistance H2
3. **Pour les joueurs**: Apprendre la grammaire temporelle

---

*Guide technique simplifié - Magic Stack API*