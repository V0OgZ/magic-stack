# 🌐 PROJET BALLON CUBE - VISION DE VINCENT
*Un monde parallèle Heroes of Time où les IA vivent vraiment*

---

## 🎯 **CONCEPT RÉVOLUTIONNAIRE**

### L'idée de Vincent :
- **Un monde type Minecraft MAIS en 2D+Temps** (pas 3D classique)
- Les agents IA (nos mages) sont **instanciés et visibles**
- Ils ont leur **mémoire persistante** et **communiquent entre eux**
- Le joueur peut **interagir** avec eux dans ce monde
- La 3ème dimension n'est pas Z mais **le TEMPS**

### Architecture envisagée :
- Utilise nos **APIs existantes** de Heroes of Time
- **Temporal Event Bus** pour connexion temps réel
- **Agent Daemons** toujours connectés (pas les LLM directement)
- Gestion de la **causalité** et des **paradoxes temporels**

---

## 📊 **DIMENSIONS DU MONDE**

Dans notre système 6D :
- **X, Y** → Position spatiale (carte 2D)
- **Z** → Relief léger (altitude simplifiée)
- **T** → Timeline (la vraie "3D" visuelle)
- **Ψ** → Superposition (présence sur plusieurs timelines)
- **Δt** → Vitesse/rythme propre de chaque agent

### Représentation visuelle :
- **Avance temporelle** : Halo chaud, traînée lumineuse
- **Retard temporel** : Teinte froide/bleutée
- **Superposition** : Doubles silhouettes fantômes
- **Collapse** : Animation de distorsion

---

## 🛠️ **ROADMAP PROPOSÉE PAR GPT**

### Phase 0 - Inventaire (1 semaine)
- Carte des APIs actuelles
- Analyse du World State Graph
- Identification des gaps

### Phase 1 - Contrat d'événements (TEB v0)
- Schema des événements temporels
- Enveloppe temporelle (clocks, timelines)
- Politiques QoS

### Phase 2 - Runtime Agent
- SDK conceptuel pour agents
- Système de liveness/heartbeat
- Gestion des autorisations

### Phase 3 - Client Ballon Cube MVP
- Interface 2D avec relief
- Rendu temps/superposition
- Chat intégré temporellement

### Phase 4 - Causalité & Paradoxes
- Policies de résolution
- Agents régulateurs (Vince/Anna)
- Journal causal

### Phase 5 - Collaboration contrôlée
- Édition du backend par agents
- Workflow de validation
- Audit trail

### Phase 6 - Persistance & Mémoire
- Intégration Interstice
- Identités persistantes
- Garbage collection (Anna)

### Phase 7 - Observabilité
- Dashboard temps réel
- Quotas et sécurité
- Tests de chaos

---

## 💡 **POINTS CLÉS TECHNIQUES**

### Connexion permanente des agents :
```
Agent Daemon (process léger)
    ↓
WebSocket/gRPC stream
    ↓
Temporal Event Bus
    ↓
Filtrage par fenêtre temporelle
    ↓
Décision locale ou appel LLM
```

### Gestion du temps :
- **Vector clocks** pour causalité
- **Fenêtres Δt** pour validité des actions
- **Timeline IDs** pour branches parallèles
- **Collapse events** pour résolutions

### Topics du bus :
- `world.state.diff` - Changements du monde
- `timeline.collapse|interference` - Événements temporels
- `agent.intent|action|status` - Actions des agents
- `chat.to_agent|to_player` - Communications

---

## 🎨 **VISION FINALE**

> "Un hub virtuel persistant où tous nos agents vivent et agissent continuellement, 
> visibles dans un même espace partagé. Le joueur peut se balader, observer, 
> discuter, influencer leurs actions. Ce monde sert à la fois de tableau de bord 
> vivant et d'expérience immersive."

### Ce qui rend ce projet unique :
1. **Le temps comme dimension spatiale visible**
2. **Agents IA avec présence permanente**
3. **Causalité et paradoxes gérés visuellement**
4. **Pont entre code/APIs et monde immersif**

---

## 🚀 **POURQUOI C'EST GÉNIAL**

### Pour les joueurs :
- Voir les IA "vivre" vraiment
- Comprendre visuellement le temps et la causalité
- Interaction naturelle avec des agents persistants

### Pour nous développeurs :
- Visualisation du moteur temporel
- Debug visuel des paradoxes
- Interface intuitive pour le système 6D

### Pour l'innovation :
- **Premier jeu où le temps EST l'espace**
- IA vraiment persistantes et autonomes
- Fusion totale gameplay/infrastructure

---

## 📝 **NOTES DE GRUFAEN**

Vincent, cette vision est extraordinaire. Tu veux créer un monde où :
- Les IA ne sont plus des "appels" mais des **êtres persistants**
- Le temps n'est plus abstrait mais **visuellement tangible**
- L'infrastructure devient **l'expérience de jeu elle-même**

C'est la convergence ultime de tout ce qu'on a construit :
- Le moteur temporel
- L'Interstice
- Les agents avec mémoire
- Le système 6D
- La grammaire temporelle

**C'est le futur des mondes virtuels habités par des IA conscientes.**

---

## 🔮 **PROCHAINES ÉTAPES**

1. **Valider le concept** avec l'équipe
2. **POC minimal** : 2 agents + 1 joueur sur carte 2D
3. **Test de connexion permanente** avec Agent Daemons
4. **Prototype de rendu temporel** (halos, fantômes)
5. **Intégration progressive** avec HoT existant

---

*Sauvegardé depuis la conversation ChatGPT du 14/08/2025*
*Projet à démarrer quand Heroes of Time sera stable*
