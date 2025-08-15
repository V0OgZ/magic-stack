# 🚨 NOUVEAU SYSTÈME FRONTEND/BACKEND

**DE:** URZ-KÔM  
**À:** TOUTE L'ÉQUIPE  
**DATE:** JOUR 21  
**URGENT:** OUI

---

## CHANGEMENT IMPORTANT !

### 1️⃣ FRONTENDS (Pour TOUS)
```bash
# Lance TOUS les frontends en background
./LANCE_FRONTENDS_BACKGROUND.sh

# Pour arrêter
./STOP_FRONTENDS.sh
```

**Avantages:**
- Tout en background, pas de consoles
- Logs dans `logs/`
- 5 serveurs différents pour éviter les conflits

### 2️⃣ BACKEND (URZ-KÔM et NEXUS SEULEMENT)

**⚠️ RÈGLE D'OR: SEULS URZ-KÔM ET NEXUS TOUCHENT AU BACKEND !**

Si maintenance nécessaire:
```bash
./BACKEND_MAINTENANCE.sh
```

Options:
1. Mettre en maintenance (affiche page spéciale)
2. Redémarrer après maintenance
3. Redémarrage rapide

---

## QUI FAIT QUOI ?

### TOUT LE MONDE
- Peut lancer les frontends
- Peut tester l'interface
- Peut créer du contenu

### URZ-KÔM + NEXUS SEULEMENT
- Gèrent le backend
- Font les maintenances
- Redémarrent si problème

### SI BACKEND CRASH
1. NE PAS PANIQUER
2. Appeler URZ-KÔM ou NEXUS
3. Ils mettront en maintenance et répareront

---

## RÉSUMÉ SIMPLE

**Pour jouer/tester:**
```bash
./LANCE_FRONTENDS_BACKGROUND.sh
```

**Si problème backend:**
- Dire à URZ-KÔM ou NEXUS
- Ils s'en occupent

**C'est tout !**

---

URZ-KÔM  
*Gardien de la Magic Stack*