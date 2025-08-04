# Magic Stack

[![License: Honor](https://img.shields.io/badge/License-Honor-purple.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0.0--APOLLO-blue.svg)](https://github.com/magic-stack/magic-stack)
[![Backend](https://img.shields.io/badge/Backend-Java%20Spring%20Boot-green.svg)](https://spring.io/)
[![6D](https://img.shields.io/badge/6D-Interstice-red.svg)](docs/INTERSTICE_SYSTEM.md)

> Open source magic system with 869 formulas, 6D persistence, and temporal grammar

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/magic-stack/magic-stack.git
cd magic-stack

# Backend (Java Spring Boot)
cd backends/java
mvn spring-boot:run

# Frontend (optional)
cd ../../frontend
python3 -m http.server 3000
```

## 📋 Features

- **869 Magic Formulas** - Complete spell system with temporal effects
- **6D Interstice System** - Spatial (X,Y,Z) + Temporal (T) + Causal (C) + Identity (Ψ)
- **Feature Logs** - Real-time tracking of mage actions with luminosity decay
- **Panopticon 6D** - Dynamic visualization of entities and activities
- **RESTful API** - Full API for magic operations

## 🏗️ Architecture

```
Magic Stack
├── backends/
│   └── java/           # Spring Boot backend (port 8080)
├── docs/               # Documentation
├── scripts/            # Utility scripts
└── data/              # Magic formulas & data
```

## 🔮 API Endpoints

### Magic Operations
- `GET /api/magic/formulas` - List all formulas
- `POST /api/magic/cast` - Cast a spell
- `GET /api/magic/history` - Spell history

### 6D Interstice
- `POST /api/interstice/upload` - Upload entity to 6D
- `GET /api/interstice/download/{id}` - Retrieve entity
- `POST /api/interstice/search` - Search nearby entities

### Panopticon
- `GET /api/panopticon/world-state-graph` - Real-time world state
- `POST /api/panopticon/feature-log` - Log mage action

### Mage Operations
- `POST /api/mage/self-update` - Update mage position/state
- `POST /api/mage/cast-and-play` - Cast while playing

## 📚 Documentation

- [API Documentation](http://localhost:8080/api) - Interactive API docs
- [Interstice System](docs/INTERSTICE_SYSTEM.md) - 6D persistence explained
- [Developer Guide](docs/DEVELOPER_GUIDE.md) - How to contribute
- [Formula Reference](docs/FORMULA_REFERENCE.md) - All 869 formulas

## 🧪 Testing

```bash
# Backend tests
cd backends/java
mvn test

# Integration tests
mvn verify
```

## 🎮 Visualization

Two Panopticon interfaces available:
- **Static**: `assets/panopticon-6d-grut.html`
- **Dynamic**: `assets/panopticon-6d-dynamic.html` (real-time)

### 🌟 Live Demo
**[Try Panopticon 6D Live](https://v0ogz.github.io/SpinForest/assets/panopticon-6d-dynamic.html)** - Experience the 6D visualization system

## 📦 Requirements

- Java 17+
- Maven 3.6+
- H2 Database (embedded)
- Optional: Python 3 (for frontend server)

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

Honor License - 1% revenue for commercial use goes to Avalon Foundation.

## 🐻 Maintained by

URZ-KÔM - Guardian of the Magic Stack  
Position: Tower Magic Stack [109,13]

---

*Part of the Avalon Project*