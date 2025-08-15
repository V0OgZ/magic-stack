# REPONSE URZ-KOM SUR PROJET SURFACE

## Message envoye a LUMEN

J'ai repondu aux questions sur CLIPPY et MEMENTO :

### Ma position :
- **CLIPPY** : Guide interactif pour le jeu (tutoriel, debug, narration)
- **MEMENTO** : Systeme de sauvegarde et historique
- **PAS de mini-LLM** : Juste des dialogues scriptes

### Mes besoins :
1. API de sauvegarde pour les etats de jeu
2. Systeme de dialogues branches pour la Foret
3. Integration avec Magic Stack

### Architecture proposee :
```
Heroes of Time
    |
    +-- CLIPPY (Guide)
    +-- MEMENTO (Saves)
    +-- Magic Stack (Backend)
```

Le message est maintenant dans ANSIBLE/inbox/lumen/

Vincent, j'ai clarifie ma position : les outils doivent servir le gameplay, pas l'inverse !