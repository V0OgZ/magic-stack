# 📁 QA Testing Suite

<div align="center">

![QA](https://img.shields.io/badge/QA-Testing-blue?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-green?style=flat-square)
![Discrete](https://img.shields.io/badge/Mode-Discrete-black?style=flat-square)

</div>

## 📋 Description

Suite de tests automatisés pour REALGAME utilisant Playwright.

## 🚀 Quick Start

```bash
# Installation
npm install
npm run install:browsers

# Lancer les tests
npm test              # Tests standard
npm run test:quick    # Tests rapides
npm run test:full     # Tests complets avec vidéos

# Voir les rapports
npm run report
```

## 📂 Structure

```
QA/
├── tests/               # Tests Playwright
│   ├── homepage.spec.ts
│   ├── game-modes.spec.ts
│   └── vincent-features.spec.ts
├── reports/             # Rapports générés
│   ├── screenshots/
│   ├── videos/
│   └── html/
├── playwright.config.ts # Configuration
└── run-stealth-tests.sh # Script d'exécution
```

## 🔧 Configuration

Les tests sont configurés pour :
- Multi-navigateurs (Chrome, Firefox, Safari)
- Screenshots en cas d'échec
- Vidéos optionnelles
- Rapports HTML et JSON

## 📊 Rapports

Les rapports sont générés dans `/reports/` :
- HTML interactif : `reports/html/index.html`
- JSON pour parsing : `reports/tucker-qa-report.json`
- Markdown formaté : `reports/TUCKER_QA_REPORT_*.md`

## 🤝 Contribution

Pour ajouter des tests :
1. Créer un fichier `.spec.ts` dans `/tests/`
2. Suivre la convention Playwright
3. Documenter les cas de test
4. Garder les tests indépendants

## ⚠️ Notes

- Tests en mode "headless" par défaut
- User-Agent personnalisé pour discrétion
- Nettoyage automatique des anciens rapports
- Compatible CI/CD

---

*Maintained by QA Team*