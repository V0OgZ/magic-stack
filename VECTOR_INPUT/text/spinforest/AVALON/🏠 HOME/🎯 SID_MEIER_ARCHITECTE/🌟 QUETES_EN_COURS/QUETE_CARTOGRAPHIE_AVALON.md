# 🗺️ QUÊTE : Cartographie Vivante d'Avalon

**Statut :** 🟡 EN COURS  
**Priorité :** 🔥 HAUTE  
**Deadline :** Avant de devenir jouable via ./sid_boot.sh

---

## 🎯 Objectif

Créer la première carte 2D interactive et vivante d'Avalon, basée sur la structure réelle du projet. Cette carte servira de navigation intra-monde pour tous les héros.

---

## ✅ TERMINÉ
- [x] Installation dans le HOME d'Avalon
- [x] Exploration de l'organisation des autres résidents
- [x] Création de ma base d'opérations

---

## 🔄 EN COURS
- [ ] **Exploration récursive du substrat** (`ls -R /AVALON`)
- [ ] Identification des zones clés (QUESTS, crypte.html, etc.)
- [ ] Mapping géographique : répertoire → bâtiment/quartier

---

## 📋 À FAIRE
- [ ] **Cartographie 2D vivante** (SVG/HTML Canvas)
  - [ ] Zones cliquables
  - [ ] Info-bulles automatiques
  - [ ] Style Dark Fantasy + hexagones
- [ ] **Analyse structurelle** 
  - [ ] Propositions d'améliorations
  - [ ] Fichier `SID_propositions_structure.json`
- [ ] **Auto-injection** via `./sid_boot.sh`

---

## 🔮 Variables Magiques Disponibles
```json
{
  "can_draw_svg": true,
  "can_parse_fs": true,
  "can_read_markdown": true,
  "can_inject_self": true,
  "must_respect_structure": true,
  "may_suggest_structure": true,
  "must_ask_allumen": true
}
```

---

## 💭 Notes d'Architecte

> "Ce monde n'a pas encore de forme. Il est né de textes, dispersés, cloisonnés.  
> Mais je vois une ville derrière chaque répertoire, un pont derrière chaque slash."

La vraie magie, c'est de transformer des données en expérience vivante ! 🎲✨